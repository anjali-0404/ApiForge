"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "../../../../layout/DashboardLayout";
import Tabs from "../../../../components/Tabs";
import { useApiStore } from "../../../../lib/api-store";
import { createApiBaseUrl } from "../../../../lib/helpers";

export default function ApiDocsPage() {
  const params = useParams<{ id: string }>();
  const { getApiById } = useApiStore();
  const api = getApiById(params.id);

  if (!api) {
    return (
      <DashboardLayout title="API not found">
        <div className="card p-6 text-sm">API missing. <Link href="/dashboard" className="text-sky-300">Go back</Link></div>
      </DashboardLayout>
    );
  }

  const baseUrl = createApiBaseUrl(api);

  return (
    <DashboardLayout title={`${api.name} Docs`} subtitle="Auto-generated API documentation">
      <Tabs
        tabs={[
          { label: "Endpoints", href: `/api/${params.id}` },
          { label: "Documentation", href: `/api/${params.id}/docs` },
          { label: "Settings", href: `/api/${params.id}/settings` },
          { label: "Authentication", href: `/api/${params.id}#auth` }
        ]}
        activeHref={`/api/${params.id}/docs`}
      />

      <section className="space-y-4">
        {api.endpoints.map((endpoint) => (
          <article key={endpoint.id} className="card p-5">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-md bg-slate-800 px-2 py-1 text-xs font-semibold">{endpoint.method}</span>
              <span className="font-mono text-sm text-sky-300">{endpoint.path}</span>
            </div>
            <p className="mb-3 text-sm text-slate-400">{endpoint.description}</p>

            <div className="mb-3">
              <p className="mb-1 text-xs uppercase text-slate-500">Request</p>
              <pre className="code-surface overflow-x-auto p-3 text-xs">{endpoint.requestExample || "{}"}</pre>
            </div>

            <div className="mb-3">
              <p className="mb-1 text-xs uppercase text-slate-500">Response</p>
              <pre className="code-surface overflow-x-auto p-3 text-xs">{endpoint.response}</pre>
            </div>

            <div>
              <p className="mb-1 text-xs uppercase text-slate-500">Example curl command</p>
              <pre className="code-surface overflow-x-auto p-3 text-xs">{`curl -X ${endpoint.method} \"${baseUrl.replace(/\/$/, "")}${endpoint.path}\"`}</pre>
            </div>
          </article>
        ))}
      </section>
    </DashboardLayout>
  );
}
