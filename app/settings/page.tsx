"use client";

import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";

export default function ProfileSettingsPage() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@apiforge.dev");

  return (
    <DashboardLayout title="Profile Settings" subtitle="Manage account preferences">
      <div className="card mx-auto max-w-2xl space-y-4 p-6">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Display Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-slate-400">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5"
          />
        </label>

        <button
          type="button"
          onClick={() => alert("Profile settings saved")}
          className="rounded-xl bg-gradient-to-r from-sky-400 to-violet-400 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Save Settings
        </button>
      </div>
    </DashboardLayout>
  );
}
