"use client";

import { useEffect, useState, } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import CreateLinkForm from "@/components/dashboard/CreateLinkForm";
import LinksTable from "@/components/dashboard/LinksTable";
import axios from "axios";

export interface LinkRecord {
  id: string;
  original: string;
  code: string;
  clicks: number;
  createdAt: string;
}

export default function DashboardPage() {
  const [links, setLinks] = useState<LinkRecord[]>([]);

  useEffect(() => {
    axios.get("/api/urls")
      .then((res) => setLinks(res.data))
      .catch(() => { });
  }, []);

  async function handleCreate(original: string, alias: string) {
    try {
      const res = await axios.post("/api/urls", { original, alias });
      setLinks((prev) => [res.data, ...prev]);
      return null; // no error
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data?.error ?? "Something went wrong.";
      }
      return "Something went wrong.";
    }
  }

  async function handleDelete(id: string) {
    try {
      await axios.delete(`/api/urls/${id}`);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch { }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />

      <main className="flex-1">
        <div className="container-page py-10">
          <div className="mb-8 flex items-baseline justify-between">
            <h1 className="text-2xl">Your links</h1>
            <span className="text-sm text-muted">
              {links.length} link{links.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <CreateLinkForm onCreate={handleCreate} />
            <LinksTable links={links} onDelete={handleDelete} />
          </div>
        </div>
      </main>
    </div>
  );
}
