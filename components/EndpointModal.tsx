"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import JsonEditor from "./JsonEditor";
import { Endpoint, HttpMethod } from "../lib/types";

type EndpointModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: Omit<Endpoint, "id">) => void;
  initialValue?: Endpoint | null;
};

const defaultJson = `{
  "users": [
    {
      "id": 1,
      "name": "John"
    }
  ]
}`;

export default function EndpointModal({ open, onClose, onSubmit, initialValue }: EndpointModalProps) {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [path, setPath] = useState("/users");
  const [statusCode, setStatusCode] = useState(200);
  const [delay, setDelay] = useState(100);
  const [response, setResponse] = useState(defaultJson);

  useEffect(() => {
    if (!initialValue) return;
    setMethod(initialValue.method);
    setPath(initialValue.path);
    setStatusCode(initialValue.statusCode);
    setDelay(initialValue.delay);
    setResponse(initialValue.response);
  }, [initialValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 md:items-center" onClick={onClose}>
      <div className="card w-full max-w-2xl p-6" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">{initialValue ? "Edit Endpoint" : "Create Endpoint"}</h3>
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-700 p-1.5 text-slate-300 hover:bg-slate-800">
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block text-slate-400">Method</span>
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value as HttpMethod)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-slate-400">Path</span>
            <input
              value={path}
              onChange={(event) => setPath(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-slate-400">Status Code</span>
            <input
              type="number"
              value={statusCode}
              onChange={(event) => setStatusCode(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-slate-400">Delay (ms)</span>
            <input
              type="number"
              value={delay}
              onChange={(event) => setDelay(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5"
            />
          </label>
        </div>

        <div className="mt-4">
          <p className="mb-1 text-sm text-slate-400">Response JSON</p>
          <JsonEditor value={response} onChange={setResponse} rows={12} />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit({
                method,
                path,
                statusCode,
                delay,
                response,
                description: initialValue?.description || `${method} ${path}`
              });
              onClose();
            }}
            className="rounded-lg bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            {initialValue ? "Update" : "Add Endpoint"}
          </button>
        </div>
      </div>
    </div>
  );
}
