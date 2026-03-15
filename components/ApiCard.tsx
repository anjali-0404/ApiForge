"use client";

import Link from "next/link";
import { Server } from "lucide-react";
import { ApiProject } from "../lib/types";

type ApiCardProps = {
  api: ApiProject;
};

export default function ApiCard({ api }: ApiCardProps) {
  return (
    <Link
      href={`/api/${api.id}`}
      className="card block p-5 transition duration-200 hover:-translate-y-0.5 hover:border-violet-500/40"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server size={16} className="text-sky-300" />
          <h3 className="font-semibold text-slate-100">{api.name}</h3>
        </div>
        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs text-violet-200">v{api.version}</span>
      </div>
      <p className="mb-4 line-clamp-2 text-sm text-slate-400">{api.description}</p>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${api.status === "active" ? "bg-emerald-400" : "bg-amber-400"}`} />
          {api.status}
        </span>
        <span>{api.endpoints.length} endpoints</span>
      </div>
    </Link>
  );
}
