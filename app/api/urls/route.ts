import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

const RESERVED = [
    "login", "signup", "dashboard", "forgot-password",
    "reset-password", "api", "admin", "_next",
];

function generateCode(length = 6) {
    const chars = "abcdefghijkmnpqrstuvwxyz23456789";
    let out = "";
    for (let i = 0; i < length; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
}

function normalizeUrl(input: string) {
    const withScheme = /^https?:\/\//i.test(input) ? input : `https://${input}`;
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("invalid protocol");
    }
    return url.toString();
}

function fail(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

export async function GET() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return fail("You need to be logged in.", 401);

    const { data, error } = await supabase
        .from("urls")
        .select("id, original_url, code, created_at, clicks(count)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) return fail(error.message, 500);

    return NextResponse.json(
        (data ?? []).map((row: any) => ({
            id: row.id,
            original: row.original_url,
            code: row.code,
            clicks: row.clicks?.[0]?.count ?? 0,
            createdAt: row.created_at.slice(0, 10),
        }))
    );
}

export async function POST(request: Request) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return fail("You need to be logged in.", 401);

    // Rate limit: max 5 links per minute per user
    const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
    const { count } = await supabase
        .from("urls")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", oneMinuteAgo);

    if ((count ?? 0) >= 5) {
        return fail("You're creating links too quickly. Wait a moment and try again.", 429);
    }

    let body: { original?: unknown; alias?: unknown };
    try {
        body = await request.json();
    } catch {
        return fail("Invalid request.", 400);
    }

    const originalInput = String(body.original ?? "").trim();
    const alias = String(body.alias ?? "").trim().toLowerCase();

    if (!originalInput || originalInput.length > 2048) {
        return fail("That doesn't look like a valid URL.", 400);
    }
    let original: string;
    try {
        original = normalizeUrl(originalInput);
    } catch {
        return fail("That doesn't look like a valid URL.", 400);
    }

    if (alias) {
        if (!/^[a-z0-9-]{3,30}$/.test(alias)) {
            return fail("Alias must be 3-30 characters: letters, numbers, dashes.", 400);
        }
        if (RESERVED.includes(alias)) {
            return fail("That alias is reserved. Try another.", 400);
        }
    }

    const serviceClient = createServiceClient();

    for (let attempt = 0; attempt < 5; attempt++) {
        const code = alias || generateCode();

        const { data, error } = await serviceClient
            .from("urls")
            .insert({ user_id: user.id, original_url: original, code })
            .select("id, original_url, code, created_at")
            .single();

        if (!error) {
            return NextResponse.json(
                {
                    id: data.id,
                    original: data.original_url,
                    code: data.code,
                    clicks: 0,
                    createdAt: data.created_at.slice(0, 10),
                },
                { status: 201 }
            );
        }

        if (error.code !== "23505") return fail(error.message, 500);
        if (alias) return fail("That alias is already taken.", 409);
    }

    return fail("Couldn't generate a unique code. Please try again.", 500);
}