"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import Input from "@/components/Input";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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
      title="Log in"
      subtitle="Welcome back. Enter your details to continue."
      footer={
        <>
          New to Knot?{" "}
          <Link href="/signup" className="text-knot-dark hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input label="Email" type="email" name="email" required autoComplete="email" />
        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
          />
          <Link
            href="/forgot-password"
            className="mt-2 inline-block text-xs text-muted hover:text-ink"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-knot-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}