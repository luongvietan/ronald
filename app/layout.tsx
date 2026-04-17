import type { ReactNode } from "react";

/** Root passes through; `<html>` / `<body>` live in `[locale]/layout.tsx` (next-intl). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
