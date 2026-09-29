import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
<header className="border-b border-line bg-paper">
  <div className="container-page flex h-16 items-center justify-between">
    <Logo />
    <nav className="flex items-center gap-3">
      <Link
        href="/login"
        className="rounded-sm px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-panel hover:text-ink"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="rounded-sm bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-knot-dark"
      >
        Sign up
      </Link>
    </nav>
  </div>
</header>
  );
}
