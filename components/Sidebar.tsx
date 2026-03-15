"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Database, Home, Key, Plus, Server, Settings, TerminalSquare } from "lucide-react";
import { cn } from "../lib/helpers";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Create API", href: "/create-api", icon: Plus },
  { label: "APIs", href: "/dashboard", icon: Server },
  { label: "Console", href: "/console", icon: TerminalSquare },
  { label: "Docs", href: "/docs", icon: BookOpen },
  { label: "Auth", href: "/auth", icon: Key },
  { label: "Settings", href: "/settings", icon: Settings }
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open ? <button type="button" className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} aria-label="Close sidebar" /> : null}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950/90 backdrop-blur transition-transform",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
      <Link href="/" className="flex items-center gap-2 border-b border-slate-800 px-5 py-5">
        <div className="rounded-lg bg-gradient-to-r from-sky-500 to-violet-500 p-2 text-white">
          <Database size={16} />
        </div>
        <span className="text-lg font-bold gradient-text">APIForge</span>
      </Link>

      <nav className="space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition",
                active || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  ? "bg-violet-500/20 text-violet-300"
                  : "hover:bg-slate-800/70 hover:text-white"
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-800 p-4">
        <Link href="/settings" onClick={onClose} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3 transition hover:border-violet-500/40">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-violet-500/30 text-xs font-semibold text-violet-200">
            A
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-slate-400">Profile Settings</p>
          </div>
        </Link>
      </div>
    </aside>
    </>
  );
}
