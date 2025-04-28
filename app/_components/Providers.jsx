"use client";

import { MonthProvider } from "@/app/_context/dateContext";

export function Providers({ children }) {
  return <MonthProvider>{children}</MonthProvider>;
}
