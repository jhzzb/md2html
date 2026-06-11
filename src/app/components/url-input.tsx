"use client";

import { useState, useRef, useEffect } from "react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-trigger on paste
  useEffect(() => {
    const handlePaste = () => {
      setTimeout(() => {
        if (inputRef.current) {
          const val = inputRef.current.value.trim();
          if (val && isValidUrl(val)) {
            onSubmit(val);
          }
        }
      }, 0);
    };
    const el = inputRef.current;
    el?.addEventListener("paste", handlePaste);
    return () => el?.removeEventListener("paste", handlePaste);
  }, [onSubmit]);

  function isValidUrl(s: string): boolean {
    try {
      const u = new URL(s);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  function handleSubmit() {
    const trimmed = url.trim();
    if (trimmed && isValidUrl(trimmed)) {
      onSubmit(trimmed);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste article URL here..."
          disabled={isLoading}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !url.trim()}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </span>
          ) : (
            "Summarize"
          )}
        </button>
      </div>
      {url.trim() && !isValidUrl(url) && (
        <p className="px-1 text-xs text-red-500">Please enter a valid URL (http:// or https://)</p>
      )}
    </div>
  );
}
