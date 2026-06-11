import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "url2obsidian — AI Article Summarizer",
  description: "Fetch any web article and turn it into AI-powered summaries for Obsidian.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
