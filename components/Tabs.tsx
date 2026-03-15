import Link from "next/link";
import { cn } from "../lib/helpers";

type TabItem = {
  label: string;
  href: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeHref: string;
};

export default function Tabs({ tabs, activeHref }: TabsProps) {
  return (
    <div className="mb-5 inline-flex rounded-xl border border-slate-800 bg-slate-900/70 p-1">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "rounded-lg px-4 py-2 text-sm transition",
            activeHref === tab.href
              ? "bg-violet-500/25 font-medium text-violet-200"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
