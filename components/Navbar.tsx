"use client";

import { Bell, Menu } from "lucide-react";

type NavbarProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onMenuClick?: () => void;
};

export default function Navbar({ title, subtitle, actions, onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/75 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenuClick} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 md:hidden" aria-label="Open menu">
          <Menu size={16} />
        </button>
        <div>
        <h1 className="text-base font-semibold text-slate-100 md:text-lg">{title}</h1>
        {subtitle ? <p className="text-xs text-slate-400">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button type="button" onClick={() => alert("No new notifications")} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}
