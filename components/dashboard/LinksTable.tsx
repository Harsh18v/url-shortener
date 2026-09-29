"use client";

import { useState } from "react";
import Image from "next/image";

export interface LinkRecord {
  id: string;
  original: string;
  code: string;
  clicks: number;
  createdAt: string;
}

export default function LinksTable({ links, onDelete, }: { links: LinkRecord[]; onDelete: (id: string) => void; }) {

  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCopy(link: LinkRecord) {
    navigator.clipboard?.writeText(`https://knot.link/${link.code}`).catch(() => { });
    setCopiedId(link.id);
    setTimeout(() => setCopiedId((id) => (id === link.id ? null : id)), 1500);
  }

  if (links.length === 0) {
    return (
      <div className="border border-dashed border-line p-10 text-center text-sm text-muted">
        No links yet. Create your first one above.
      </div>
    );
  }

  return (
<div className="overflow-hidden border border-line">
  <div className="sm:hidden">
    <div className="divide-y divide-line">
      {links.map((link) => (
        <div key={link.id} className="space-y-3 bg-white p-4">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
              Short link
            </p>
            <p className="break-all font-mono text-sm text-knot-dark">
              knot.link/{link.code}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                Clicks
              </p>
              <p className="text-ink">{link.clicks}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                Created
              </p>
              <p className="text-muted">{link.createdAt}</p>
            </div>
          </div>

          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
              Original
            </p>
            <p className="break-words text-sm text-muted">{link.original}</p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleCopy(link)}
              className="inline-flex w-16 items-center justify-center rounded-sm bg-knot-dark px-2 py-1.5 text-xs font-medium text-white hover:bg-knot"
            >
              {copiedId === link.id ? "Copied" : "Copy"}
            </button>
            <button
              onClick={() => onDelete(link.id)}
              className="rounded-sm bg-knot-dark px-2 py-1.5 text-xs font-medium text-white hover:bg-knot"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  <table className="hidden w-full table-fixed border-collapse text-left text-sm sm:table">
    <colgroup>
      <col className="w-auto" />
      <col className="w-44" />
      <col className="w-20" />
      <col className="w-28" />
      <col className="w-36" />
    </colgroup>
    <thead>
      <tr className="bg-panel text-xs text-muted">
        <th className="border border-line px-4 py-3 font-normal">
          Original
        </th>
        <th className="border border-line px-4 py-3 font-normal">
          Short link
        </th>
        <th className="border border-line px-4 py-3 font-normal">
          Clicks
        </th>
        <th className="border border-line px-4 py-3 font-normal">
          Created
        </th>
        <th className="border border-line px-4 py-3 font-normal" />
      </tr>
    </thead>
    <tbody>
      {links.map((link) => (
        <tr key={link.id}>
          <td className="max-w-[16rem] truncate border border-line px-4 py-3 text-muted">
            {link.original}
          </td>
          <td className="truncate border border-line px-4 py-3 font-mono text-knot-dark">
            knot.link/{link.code}
          </td>
          <td className="border border-line px-4 py-3 text-ink">
            {link.clicks}
          </td>
          <td className="border border-line px-4 py-3 text-muted">
            {link.createdAt}
          </td>
          <td className="border border-line px-3 py-3">
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => handleCopy(link)}
                className="inline-flex w-16 items-center justify-center rounded-sm bg-knot-dark px-2 py-1 font-medium text-white hover:bg-knot"
              >
                {copiedId === link.id ? "Copied" : "Copy"}
              </button>
              <button
                onClick={() => onDelete(link.id)}
                className="rounded-sm bg-knot-dark p-1 px-2 font-medium text-white hover:bg-knot"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}
