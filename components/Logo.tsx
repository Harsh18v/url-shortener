import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-ink">
      <svg
        width="30"
        height="30"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="11" r="5.5" stroke="#1F6F5C" strokeWidth="1.6" />
        <circle cx="14" cy="11" r="5.5" stroke="#16150F" strokeWidth="1.6" />
      </svg>
      <span className="font-display text-2xl font-semibold">Knot</span>
    </Link>
  );
}
