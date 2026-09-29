import Logo from "./Logo";
import Link from "next/link";

export default function Footer() {
  return (
<footer className="border-t border-line">
  <div className="container-page py-12">
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-xs">
        <Logo />
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Short links that stay short — with click tracking built in from
          the start.
        </p>
      </div>

      <div className="flex gap-12 text-sm">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-muted">
            Product
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/signup" className="text-ink hover:text-knot-dark">
              Sign up
            </Link>
            <Link href="/login" className="text-ink hover:text-knot-dark">
              Log in
            </Link>
          </div>
        </div>

      </div>
    </div>

    <div className="mt-10 border-t border-line pt-6 text-sm text-muted">
      <p>&copy; {new Date().getFullYear()} Knot. All rights reserved.</p>
    </div>
  </div>
</footer>
  );
}
