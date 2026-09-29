import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request, { params }: { params: Promise<{ shortcode: string }> }) {

    const { shortcode } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("resolve_and_log", {
        p_code: shortcode,
    });

    if (error || !data) {
        return NextResponse.redirect(new URL("/link-not-found", request.url));
    }

    return NextResponse.redirect(data);
}