"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export default function DashboardNav() {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setName(user.user_metadata?.name ?? user.email ?? "");
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
<header className="border-b border-line bg-paper">
  <div className="container-page flex h-16 items-center justify-between">
    <Logo />

    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2.5">
        <div
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-knot-light text-xs font-medium uppercase text-knot-dark"
        >
          {name.charAt(0)}
        </div>
        <span className="hidden text-sm text-ink sm:inline">{name}</span>
      </div>

      <div className="h-6 w-px bg-line" />

      <button
        onClick={handleLogout}
        className="rounded-sm px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-panel hover:text-ink"
      >
        Log out
      </button>
    </div>
  </div>
</header>
  );
}