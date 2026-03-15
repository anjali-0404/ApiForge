"use client";

import Link from "next/link";
import DashboardLayout from "../../layout/DashboardLayout";
import { useApiStore } from "../../lib/api-store";

export default function AuthHomePage() {
  const { apis } = useApiStore();

  return (
    <DashboardLayout title="Authentication" subtitle="Manage API keys and token flows">
      <div className="space-y-4">
        {apis.map((api) => (
          <Link key={api.id} href={`/api/${api.id}#auth`} className="card block p-5 transition hover:border-violet-500/40">
            <h3 className="mb-2 text-base font-semibold text-slate-100">{api.name}</h3>
            <p className="text-sm text-slate-400">Open auth settings for this API</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
