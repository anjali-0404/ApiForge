"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

type DashboardLayoutProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardLayout({ title, subtitle, actions, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen md:pl-64">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar title={title} subtitle={subtitle} actions={actions} onMenuClick={() => setSidebarOpen(true)} />
      <main className="px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
