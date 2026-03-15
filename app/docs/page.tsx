"use client";

import Link from "next/link";
import DashboardLayout from "../../layout/DashboardLayout";
import { useApiStore } from "../../lib/api-store";

export default function DocsHomePage() {
  const { apis } = useApiStore();

  return (
    <DashboardLayout title="Documentation" subtitle="Auto-generated API docs">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {apis.map((api) => (
          <Link key={api.id} href={`/api/${api.id}/docs`} className="card p-5 transition hover:border-violet-500/40">
            <h3 className="mb-2 text-base font-semibold text-slate-100">{api.name}</h3>
            <p className="text-sm text-slate-400">{api.endpoints.length} endpoints documented</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
