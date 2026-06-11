"use client";

import { useState } from "react";
import type { HistoryItem, SummaryResult } from "../lib/mock";

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (id: string) => void;
  selectedDetail: SummaryResult | null;
  isLoading: boolean;
}

export default function HistoryList({ items, onSelect, selectedDetail, isLoading }: HistoryListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-4 w-3/4 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-full rounded bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center shadow-sm">
        <p className="text-sm text-slate-400">No history yet. Try summarizing an article!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => onSelect(item.id)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
          >
            <h3 className="truncate text-sm font-medium text-slate-800">{item.title}</h3>
            <p className="mt-1 truncate text-xs text-slate-400">{item.oneSentence}</p>
            <p className="mt-1 text-xs text-slate-300">
              {new Date(item.createdAt).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </button>

          {/* Detail panel */}
          {selectedDetail?.id === item.id && (
            <div className="mt-1 rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 shadow-sm">
              <p className="text-xs font-medium text-blue-600">One-Sentence</p>
              <p className="mt-1 text-sm text-slate-700">{selectedDetail.oneSentence}</p>
              <p className="mt-3 text-xs font-medium text-blue-600">Short Summary</p>
              <p className="mt-1 text-sm text-slate-700">{selectedDetail.shortSummary}</p>
              <p className="mt-3 text-xs font-medium text-blue-600">Detailed Summary</p>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{selectedDetail.detailedSummary}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
