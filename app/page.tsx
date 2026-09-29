import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShortenDemo from "@/components/ShortenDemo";
import Link from "next/link";


export default function LandingPage() {
  return (
<div className="flex min-h-screen flex-col">
  <Navbar />

  <main className="flex-1">
    <section className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Long links,
          <br />
          tied short.
        </h1>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-muted">
          Knot takes a messy URL and gives you back something short enough
          to say out loud, print on a poster, or paste in a bio — and
          tracks who clicked it along the way.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-8">
          <Link
            href="/signup"
            className="rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-knot-dark"
          >
            Create your first link
          </Link>
          <span className="text-sm text-muted">
            Free to start
          </span>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
          <div>
            <dt className="text-2xl font-semibold text-ink">&lt;1s</dt>
            <dd className="mt-1 text-sm text-muted">to shorten a link</dd>
          </div>
          <div>
            <dt className="text-2xl font-semibold text-ink">100%</dt>
            <dd className="mt-1 text-sm text-muted">click tracking</dd>
          </div>
          <div>
            <dt className="text-2xl font-semibold text-ink">Free</dt>
            <dd className="mt-1 text-sm text-muted">to get started</dd>
          </div>
        </dl>
      </div>

      <ShortenDemo />
    </section>

    <section className="border-t border-line bg-panel">
      <div className="container-page flex flex-col items-start gap-5 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl">
            Ready to stop sharing ugly links?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Set up your first link in under a minute.
          </p>
        </div>
        <Link
          href="/signup"
          className="shrink-0 rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-knot-dark"
        >
          Get started — it&apos;s free
        </Link>
      </div>
    </section>
  </main>

  <Footer />
</div>
  );
}
