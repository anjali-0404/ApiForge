"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../layout/DashboardLayout";
import { useApiStore } from "../../lib/api-store";
import { AuthType } from "../../lib/types";

export default function CreateApiPage() {
  const router = useRouter();
  const { createApi } = useApiStore();
  const [name, setName] = useState("");
  const [version, setVersion] = useState("1.0");
  const [description, setDescription] = useState("");
  const [authType, setAuthType] = useState<AuthType>("none");

  return (
    <DashboardLayout title="Create API" subtitle="Define a new mock API project">
      <form
        className="card mx-auto max-w-2xl space-y-4 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          const created = createApi({ name, version, description, authType });
          router.push(`/api/${created.id}`);
        }}
      >
        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">API Name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Version</span>
          <input value={version} onChange={(event) => setVersion(event.target.value)} required className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Description</span>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} required className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Authentication Type</span>
          <select value={authType} onChange={(event) => setAuthType(event.target.value as AuthType)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5">
            <option value="none">None</option>
            <option value="apikey">API Key</option>
            <option value="jwt">JWT</option>
          </select>
        </label>

        <button type="submit" className="rounded-xl bg-gradient-to-r from-sky-400 to-violet-400 px-5 py-2.5 text-sm font-semibold text-white">
          Create API
        </button>
      </form>
    </DashboardLayout>
  );
}
