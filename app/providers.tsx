"use client";

import { ReactNode } from "react";
import { ApiStoreProvider } from "../lib/api-store";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <ApiStoreProvider>{children}</ApiStoreProvider>;
}
