import Link from "next/link";
import { ArrowRight, Blocks, FlaskConical, Rocket, Shield, Sparkles, TerminalSquare } from "lucide-react";

const featureItems = [
  {
    title: "Realistic Mock Behavior",
    description: "Configure latency, status codes, and JSON payloads to mimic production APIs.",
    icon: FlaskConical
  },
  {
    title: "Built-in Test Console",
    description: "Debug requests with headers and body payloads directly in your dashboard.",
    icon: TerminalSquare
  },
  {
    title: "Instant Collaboration",
    description: "Share mock API environments with teammates and frontend apps in minutes.",
    icon: Rocket
  },
  {
    title: "Auth Simulation",
    description: "Test API Key and JWT flows before backend implementation is complete.",
    icon: Shield
  }
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-8">
      <header className="mb-14 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm">
          <Sparkles size={14} className="text-sky-300" />
          <span className="text-slate-300">Modern Mock API Platform</span>
        </div>
        <Link href="/dashboard" className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
          Open Dashboard
        </Link>
      </header>

      <section className="mb-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-slate-50 md:text-6xl">
            Build and test <span className="gradient-text">Mock APIs</span> like real production services.
          </h1>
          <p className="mb-7 max-w-2xl text-base text-slate-300 md:text-lg">
            APIForge helps frontend and backend teams design, version, and validate APIs before deployment. It feels like Postman + Supabase dashboard, purpose-built for mock infrastructure.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/create-api"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-violet-400 px-5 py-3 text-sm font-semibold text-white"
            >
              Create Mock API
              <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="rounded-xl border border-slate-700 px-5 py-3 text-sm hover:bg-slate-800">
              Explore Dashboard
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-4 inline-flex items-center gap-2 text-slate-200">
            <Blocks size={16} className="text-violet-300" />
            Feature Preview
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">Mock endpoint versioning</p>
            <p className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">JSON response editor</p>
            <p className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">Request/response console</p>
            <p className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">Auth key generation</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureItems.map((item) => (
          <article key={item.title} className="card p-5">
            <div className="mb-3 inline-flex rounded-lg bg-sky-500/15 p-2 text-sky-300">
              <item.icon size={16} />
            </div>
            <h3 className="mb-2 text-base font-semibold text-slate-100">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
