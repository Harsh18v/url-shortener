"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import Input from "@/components/Input";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
    const router = useRouter();
    const supabase = createClient();

    const [status, setStatus] = useState<"checking" | "ready" | "invalid">("checking");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        const { data: listener } = supabase.auth.onAuthStateChange((event) => {
            if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
                setStatus("ready");
            }
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setStatus("ready");
        });

        const timer = setTimeout(() => {
            setStatus((s) => (s === "checking" ? "invalid" : s));
        }, 4000);

        return () => {
            listener.subscription.unsubscribe();
            clearTimeout(timer);
        };
    }, []);




    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const form = new FormData(e.currentTarget);
        const password = form.get("password") as string;
        const confirm = form.get("confirm") as string;

        if (password !== confirm) {
            setError("Passwords don't match.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    return (
        <AuthShell
            title="Choose a new password"
            subtitle="Enter a new password for your account."
            footer={
                <>
                    Back to{" "}
                    <Link href="/login" className="text-knot-dark hover:underline">
                        log in
                    </Link>
                </>
            }
        >
            {status === "checking" && (
                <p className="text-sm text-muted">Verifying your link…</p>
            )}

            {status === "invalid" && (
                <div className="border border-line bg-panel p-4 text-sm text-ink">
                    This reset link is invalid or has expired.{" "}
                    <Link href="/forgot-password" className="text-knot-dark hover:underline">
                        Request a new one
                    </Link>
                    .
                </div>
            )}

            {status === "ready" && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input
                        label="New password"
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        hint="At least 8 characters."
                    />
                    <Input
                        label="Confirm password"
                        type="password"
                        name="confirm"
                        required
                        minLength={8}
                        autoComplete="new-password"
                    />

                    {error && (
                        <p role="alert" className="text-sm text-rust">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-knot-dark disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Saving…" : "Update password"}
                    </button>
                </form>
            )}
        </AuthShell>
    );
}