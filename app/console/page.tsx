"use client";

import Link from "next/link";
import DashboardLayout from "../../layout/DashboardLayout";
import ApiTester from "../../components/ApiTester";
import { useApiStore } from "../../lib/api-store";
import { createApiBaseUrl } from "../../lib/helpers";

export default function ConsolePage() {
  const { apis } = useApiStore();
  const firstApi = apis[0];

  if (!firstApi) {
    return (
      <DashboardLayout title="Console" subtitle="Test requests against your mocks">
        <div className="card p-6 text-sm text-slate-300">
          No APIs available. <Link href="/create-api" className="text-sky-300">Create one first</Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Console" subtitle="Postman-style in-app API testing">
      <ApiTester baseUrl={createApiBaseUrl(firstApi)} endpoints={firstApi.endpoints} initialPath="/" initialMethod="GET" />
    </DashboardLayout>
  );
}
