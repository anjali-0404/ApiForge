"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Send, Terminal } from "lucide-react";
import axiosInstance from "../lib/axios";
import JsonEditor from "./JsonEditor";
import { Endpoint, HttpMethod } from "../lib/types";

type ApiTesterProps = {
  baseUrl: string;
  endpoints: Endpoint[];
  initialPath?: string;
  initialMethod?: HttpMethod;
};

export default function ApiTester({ baseUrl, endpoints, initialPath = "/", initialMethod = "GET" }: ApiTesterProps) {
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [url, setUrl] = useState(`${baseUrl.replace(/\/$/, "")}${initialPath}`);
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState("{}");
  const [status, setStatus] = useState<string>("-");
  const [loading, setLoading] = useState(false);

  const normalizedBase = useMemo(() => baseUrl.replace(/\/$/, ""), [baseUrl]);

  const runRequest = async () => {
    setLoading(true);
    try {
      const parsedHeaders = JSON.parse(headers || "{}");
      const payload = body ? JSON.parse(body) : undefined;

      const result = await axiosInstance.request({
        method,
        url,
        headers: parsedHeaders,
        data: payload
      });

      setStatus(String(result.status));
      setResponse(JSON.stringify(result.data, null, 2));
    } catch {
      const mockPath = url.replace(normalizedBase, "") || "/";
      const matched = endpoints.find((endpoint) => {
        const regex = new RegExp(`^${endpoint.path.replace(/:[^/]+/g, "[^/]+")}$`);
        return endpoint.method === method && regex.test(mockPath);
      });

      if (matched) {
        setStatus(String(matched.statusCode));
        setResponse(matched.response);
      } else {
        setStatus("404");
        setResponse(JSON.stringify({ error: "Endpoint not found", path: mockPath, method }, null, 2));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="inline-flex items-center gap-2 text-base font-semibold">
          <Terminal size={16} className="text-sky-300" />
          API Testing Console
        </h3>
        <button type="button" onClick={() => setResponse("{}")}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs hover:bg-slate-800">
          <RefreshCw size={13} />
          Clear
        </button>
      </div>

      <div className="mb-3 flex flex-col gap-2 md:flex-row">
        <select value={method} onChange={(event) => setMethod(event.target.value as HttpMethod)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm md:w-28">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input value={url} onChange={(event) => setUrl(event.target.value)}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-mono" />
        <button
          type="button"
          onClick={runRequest}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-violet-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
        >
          <Send size={14} />
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-1 text-xs uppercase text-slate-400">Headers</p>
          <JsonEditor value={headers} onChange={setHeaders} rows={6} />
          <p className="mb-1 mt-3 text-xs uppercase text-slate-400">Body</p>
          <JsonEditor value={body} onChange={setBody} rows={8} />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs uppercase text-slate-400">Response</p>
            <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">Status: {status}</span>
          </div>
          <JsonEditor value={response} onChange={setResponse} rows={18} />
        </div>
      </div>
    </section>
  );
}
