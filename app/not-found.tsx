import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl">This link came untied.</h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-knot-dark"
      >
        Back to home
      </Link>
    </div>
  );
}
