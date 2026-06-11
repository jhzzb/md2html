"use client";

import { useState } from "react";
import type { SummaryResult } from "../lib/mock";

interface SummaryCardProps {
  result: SummaryResult;
}

function CollapsibleSection({
  title,
  content,
  defaultOpen,
  accent,
}: {
  title: string;
  content: string;
  defaultOpen: boolean;
  accent: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-slate-50 ${accent}`}
      >
        <span>{title}</span>
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700">
          {content}
        </div>
      )}
    </div>
  );
}

export default function SummaryCard({ result }: SummaryCardProps) {
  return (
    <div className="w-full max-w-2xl space-y-3">
      {/* Article info */}
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800">{result.title}</h2>
        <p className="mt-0.5 truncate text-xs text-slate-400">{result.url}</p>
      </div>

      <CollapsibleSection
        title="One-Sentence Summary"
        content={result.oneSentence}
        defaultOpen={true}
        accent="text-blue-700"
      />
      <CollapsibleSection
        title="Short Summary"
        content={result.shortSummary}
        defaultOpen={false}
        accent="text-emerald-700"
      />
      <CollapsibleSection
        title="Detailed Summary"
        content={result.detailedSummary}
        defaultOpen={false}
        accent="text-amber-700"
      />
    </div>
  );
}
