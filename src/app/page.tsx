"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UrlInput from "./components/url-input";
import SummaryCard from "./components/summary-card";
import SummarySkeleton from "./components/summary-skeleton";
import { mockSummarize } from "./lib/mock";
import type { SummaryResult } from "./lib/mock";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await mockSummarize(url);
      setResult(data);
    } catch {
      setError("Failed to generate summary. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">url2obsidian</h1>
        <p className="mt-3 text-lg text-slate-500">Paste any article URL to generate an AI summary.</p>
      </div>
      <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
      {error && (
        <div className="w-full max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}
      {isLoading && <SummarySkeleton />}
      {result && !isLoading && <SummaryCard result={result} />}
      <div className="pt-8">
        <Link href="/history"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          View History
        </Link>
      </div>
    </div>
  );
}