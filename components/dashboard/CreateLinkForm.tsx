"use client";

import { useState } from "react";

export default function CreateLinkForm({ onCreate, }: { onCreate: (original: string, alias: string) => Promise<string | null>; }) {

  const [original, setOriginal] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!original.trim()) return;

    setLoading(true);
    setError(null);
    const message = await onCreate(original, alias);
    setLoading(false);

    if (message) {
      setError(message);
      return;
    }
    setOriginal("");
    setAlias("");
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-panel p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="original-url" className="text-sm text-ink">
            Long URL
          </label>
          <input
            id="original-url"
            type="text"
            required
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="https://example.com/a/very/long/path"
            className="rounded-sm border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-knot"
          />
        </div>
        <div className="flex w-full flex-col gap-1.5 sm:w-44">
          <label htmlFor="alias" className="text-sm text-ink">
            Custom alias
            <span className="text-muted"> (optional)</span>
          </label>
          <input
            id="alias"
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="my-link"
            className="rounded-sm border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-knot"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-knot-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create link"}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-rust">
          {error}
        </p>
      )}
    </form>
  );
}