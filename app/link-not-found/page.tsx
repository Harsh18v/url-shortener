import Link from "next/link";
import Logo from "@/components/Logo";

export default function LinkNotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <Logo />

            <h1 className="mt-8 text-3xl">This link came untied.</h1>
            <p className="mt-3 max-w-sm text-sm text-muted">
                The short link you followed doesn&apos;t exist, or it may have been
                deleted by its owner.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                    href="/"
                    className="rounded-sm bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-knot-dark"
                >
                    Go to homepage
                </Link>
                <Link
                    href="/signup"
                    className="text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                    Create your own short links
                </Link>
            </div>
        </div>
    );
}