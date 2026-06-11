"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import HistoryList from "../components/history-list";
import { mockGetHistory, mockGetHistoryById, type SummaryResult, type HistoryItem } from "../lib/mock";

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<SummaryResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<HistoryItem[]>([]);

  const loadHistory = useCallback(async (p: number) => {
    setIsLoading(true);
    try {
      const data = await mockGetHistory(p);
      setItems((prev) => (p === 1 ? data.items : [...prev, ...data.items]));
      setTotal(data.total);
      setPage(p);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory(1);
  }, [loadHistory]);

  const handleSelect = useCallback(async (id: string) => {
    if (selectedDetail?.id === id) {
      setSelectedDetail(null);
      return;
    }
    const detail = await mockGetHistoryById(id);
    setSelectedDetail(detail);
  }, [selectedDetail]);

  // Client-side search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(items);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredItems(items.filter((h) => h.title.toLowerCase().includes(q) || h.url.toLowerCase().includes(q)));
  }, [searchQuery, items]);

  const hasMore = items.length < total;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-slate-800">History</h1>
        {total > 0 && <span className="text-xs text-slate-400">{total} items</span>}
      </div>

      {/* Search filter */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or URL..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* History list */}
      <HistoryList
        items={searchQuery.trim() ? filteredItems : items}
        onSelect={handleSelect}
        selectedDetail={selectedDetail}
        isLoading={isLoading && items.length === 0}
      />

      {/* Load more */}
      {hasMore && !searchQuery.trim() && (
        <button
          onClick={() => loadHistory(page + 1)}
          disabled={isLoading}
          className="mx-auto rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
