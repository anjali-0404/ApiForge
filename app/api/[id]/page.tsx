"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Key, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../../layout/DashboardLayout";
import EndpointTable from "../../../components/EndpointTable";
import ApiTester from "../../../components/ApiTester";
import Tabs from "../../../components/Tabs";
import { createApiBaseUrl } from "../../../lib/helpers";
import { useApiStore } from "../../../lib/api-store";
import { Endpoint, HttpMethod } from "../../../lib/types";

export default function ApiDetailPage() {
  const params = useParams<{ id: string }>();
  const { getApiById, addEndpoint, updateEndpoint, deleteEndpoint } = useApiStore();
  const api = getApiById(params.id);
  const [testerState, setTesterState] = useState<{ path: string; method: HttpMethod; key: number }>({
    path: "/",
    method: "GET",
    key: 1
  });
  const [apiKeyValue, setApiKeyValue] = useState("sk-forge-8f4a34e2b4f6");

  const tabs = useMemo(
    () => [
      { label: "Endpoints", href: `/api/${params.id}` },
      { label: "Documentation", href: `/api/${params.id}/docs` },
      { label: "Settings", href: `/api/${params.id}/settings` },
      { label: "Authentication", href: `/api/${params.id}#auth` }
    ],
    [params.id]
  );

  if (!api) {
    return (
      <DashboardLayout title="API not found">
        <div className="card p-6 text-sm text-slate-300">
          API does not exist. <Link href="/dashboard" className="text-sky-300">Go to dashboard</Link>
        </div>
      </DashboardLayout>
    );
  }

  const baseUrl = createApiBaseUrl(api);

  return (
    <DashboardLayout title={api.name} subtitle={api.description}>
      <Tabs tabs={tabs} activeHref={`/api/${params.id}`} />

      <div className="mb-4 card p-4">
        <p className="mb-1 text-xs uppercase text-slate-500">Base URL</p>
        <p className="font-mono text-sm text-sky-300">{baseUrl}</p>
      </div>

      <EndpointTable
        endpoints={api.endpoints}
        onAdd={(payload) => addEndpoint(api.id, payload)}
        onEdit={(endpointId, payload) => updateEndpoint(api.id, endpointId, payload)}
        onDelete={(endpointId) => deleteEndpoint(api.id, endpointId)}
        onTest={(endpoint: Endpoint) => {
          const testPath = endpoint.path.replace(/:[^/]+/g, "1");
          setTesterState({ path: testPath, method: endpoint.method, key: Date.now() });
        }}
      />

      <div className="mt-4">
        <ApiTester
          key={testerState.key}
          baseUrl={baseUrl}
          endpoints={api.endpoints}
          initialPath={testerState.path}
          initialMethod={testerState.method}
        />
      </div>

      <section id="auth" className="mt-4 card p-4">
        <h3 className="mb-3 inline-flex items-center gap-2 text-base font-semibold"><Key size={16} className="text-violet-300" />Authentication Settings</h3>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            readOnly
            value={apiKeyValue}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-mono"
          />
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(apiKeyValue)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
          >
            <Copy size={14} />
            Copy
          </button>
          <button
            type="button"
            onClick={() => setApiKeyValue(`sk-forge-${Math.random().toString(16).slice(2, 14)}`)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500/30 px-4 py-2 text-sm text-violet-100"
          >
            <RefreshCw size={14} />
            Regenerate
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}
