"use client";

import { useState } from "react";
import { Code, Pencil, Play, Plus, Trash2 } from "lucide-react";
import EndpointModal from "./EndpointModal";
import { methodClass } from "../lib/helpers";
import { Endpoint } from "../lib/types";

type EndpointTableProps = {
  endpoints: Endpoint[];
  onAdd: (payload: Omit<Endpoint, "id">) => void;
  onEdit: (endpointId: string, payload: Partial<Endpoint>) => void;
  onDelete: (endpointId: string) => void;
  onTest: (endpoint: Endpoint) => void;
};

export default function EndpointTable({ endpoints, onAdd, onEdit, onDelete, onTest }: EndpointTableProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Endpoint | null>(null);

  return (
    <section className="card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Endpoints</h3>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-3 py-2 text-sm font-semibold text-slate-950"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus size={14} />
          Add Endpoint
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Path</th>
              <th className="px-3 py-2">Status Code</th>
              <th className="px-3 py-2">Delay</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint) => (
              <tr key={endpoint.id} className="border-t border-slate-800">
                <td className="px-3 py-2">
                  <span className={`${methodClass(endpoint.method)} rounded-md px-2 py-1 text-xs font-semibold`}>
                    {endpoint.method}
                  </span>
                </td>
                <td className="px-3 py-2 font-mono text-sky-300">{endpoint.path}</td>
                <td className="px-3 py-2">{endpoint.statusCode}</td>
                <td className="px-3 py-2">{endpoint.delay}ms</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <button type="button" title="Test" onClick={() => onTest(endpoint)} className="rounded p-1.5 hover:bg-slate-800">
                      <Play size={14} />
                    </button>
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => {
                        setEditing(endpoint);
                        setOpen(true);
                      }}
                      className="rounded p-1.5 hover:bg-slate-800"
                    >
                      <Pencil size={14} />
                    </button>
                    <button type="button" title="Delete" onClick={() => onDelete(endpoint.id)} className="rounded p-1.5 hover:bg-slate-800">
                      <Trash2 size={14} />
                    </button>
                    <button type="button" title="Code" className="rounded p-1.5 hover:bg-slate-800">
                      <Code size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {endpoints.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-slate-500">
                  No endpoints yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <EndpointModal
        open={open}
        initialValue={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={(payload) => {
          if (editing) onEdit(editing.id, payload);
          else onAdd(payload);
        }}
      />
    </section>
  );
}
