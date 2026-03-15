"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Database, Plus, Search, Server } from "lucide-react";
import DashboardLayout from "../../layout/DashboardLayout";
import ApiCard from "../../components/ApiCard";
import { useApiStore } from "../../lib/api-store";

export default function DashboardPage() {
  const { apis } = useApiStore();
  const [searchText, setSearchText] = useState("");

  const filtered = useMemo(() => {
    return apis.filter((api) => api.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [apis, searchText]);

  const totalEndpoints = useMemo(() => apis.reduce((sum, api) => sum + api.endpoints.length, 0), [apis]);
  const draftCount = useMemo(() => apis.filter((api) => api.status === "draft").length, [apis]);

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Manage and test your mock APIs"
      actions={
        <Link
          href="/create-api"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-violet-400 px-3 py-2 text-sm font-semibold text-slate-950"
        >
          <Plus size={14} />
          New API
        </Link>
      }
    >
      <div className="mb-5 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card p-4">
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase text-slate-400"><Database size={14} /> Total APIs</p>
          <p className="text-2xl font-bold text-slate-100">{apis.length}</p>
        </div>
        <div className="card p-4">
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase text-slate-400"><Server size={14} /> Active APIs</p>
          <p className="text-2xl font-bold text-slate-100">{apis.filter((api) => api.status === "active").length}</p>
        </div>
        <div className="card p-4">
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase text-slate-400"><Server size={14} /> Total Endpoints</p>
          <p className="text-2xl font-bold text-slate-100">{totalEndpoints}</p>
        </div>
        <div className="card p-4">
          <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase text-slate-400"><Database size={14} /> Draft APIs</p>
          <p className="text-2xl font-bold text-slate-100">{draftCount}</p>
        </div>
      </div>

      <div className="card mb-5 p-3">
        <label className="relative block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            placeholder="Search APIs"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-3 text-sm"
          />
        </label>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((api) => (
          <ApiCard key={api.id} api={api} />
        ))}
        {filtered.length === 0 ? <div className="card p-6 text-sm text-slate-400">No APIs found.</div> : null}
      </section>
    </DashboardLayout>
  );
}
