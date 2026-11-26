import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoldScalper | Trading Intelligence",
  description: "A risk-first gold trading analysis and signal workspace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
