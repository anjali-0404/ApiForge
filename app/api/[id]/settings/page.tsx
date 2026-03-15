"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "../../../../layout/DashboardLayout";
import Tabs from "../../../../components/Tabs";
import { useApiStore } from "../../../../lib/api-store";
import { createApiBaseUrl } from "../../../../lib/helpers";

export default function ApiSettingsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getApiById, deleteApi, updateApi } = useApiStore();
  const api = getApiById(params.id);
  const [proxyEnabled, setProxyEnabled] = useState(false);

  if (!api) {
    return (
      <DashboardLayout title="API not found">
        <div className="card p-6 text-sm">API missing. <Link href="/dashboard" className="text-sky-300">Go back</Link></div>
      </DashboardLayout>
    );
  }

  const baseUrl = createApiBaseUrl(api);

  return (
    <DashboardLayout title={`${api.name} Settings`} subtitle="Configure routing and behavior">
      <Tabs
        tabs={[
          { label: "Endpoints", href: `/api/${params.id}` },
          { label: "Documentation", href: `/api/${params.id}/docs` },
          { label: "Settings", href: `/api/${params.id}/settings` },
          { label: "Authentication", href: `/api/${params.id}#auth` }
        ]}
        activeHref={`/api/${params.id}/settings`}
      />

      <div className="space-y-4">
        <section className="card p-5">
          <p className="mb-2 text-sm text-slate-300">Base URL</p>
          <code className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-sky-300">{baseUrl}</code>
        </section>

        <section className="card p-5">
          <p className="mb-2 text-sm text-slate-300">Enable Real API Proxy</p>
          <button
            type="button"
            onClick={() => {
              setProxyEnabled((value) => !value);
              updateApi(api.id, { status: api.status });
            }}
            className={`rounded-full px-4 py-2 text-sm ${proxyEnabled ? "bg-emerald-500/30 text-emerald-200" : "bg-slate-700 text-slate-300"}`}
          >
            {proxyEnabled ? "Enabled" : "Disabled"}
          </button>
        </section>

        <section className="card border-red-500/30 bg-red-950/20 p-5">
          <p className="mb-2 font-semibold text-red-200">Danger Zone</p>
          <p className="mb-3 text-sm text-red-300/80">Delete this API project and all its endpoints permanently.</p>
          <button
            type="button"
            onClick={() => {
              deleteApi(api.id);
              router.push("/dashboard");
            }}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-red-950"
          >
            Delete API
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}
