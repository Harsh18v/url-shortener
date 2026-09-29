"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import Input from "@/components/Input";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setCheckEmail(true);
  }

  return (
    <AuthShell
      title="Create an account"
      subtitle="Start shortening links in under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-knot-dark hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {checkEmail ? (
        <div className="border border-line bg-panel p-4 text-sm text-ink">
          Check your email for a confirmation link, then log in.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input label="Name" type="text" name="name" required autoComplete="name" />
          <Input label="Email" type="email" name="email" required autoComplete="email" />
          <Input
            label="Password"
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            hint="At least 8 characters."
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
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}