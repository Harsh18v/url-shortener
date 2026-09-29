"use client";

import { useState } from "react";

export function generateCode(length = 6): string {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}


export default function ShortenDemo() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleShorten(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setResult(`knot-url/${generateCode()}`);
    setCopied(false);
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard?.writeText(`https://${result}`).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="border border-line bg-panel p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-knot" />
        <p className="text-sm text-muted">Try it — nothing is saved</p>
      </div>

      <form onSubmit={handleShorten} className="flex flex-col gap-3">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a long URL"
          className="rounded-sm border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-muted transition-colors focus:border-knot focus:outline-none focus:ring-1 focus:ring-knot"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-knot-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Shorten it
        </button>
      </form>

      {result && (
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="truncate font-mono text-sm text-knot-dark">
            {result}
          </span>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-sm px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-paper hover:text-ink"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
