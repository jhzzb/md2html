import { NextRequest, NextResponse } from "next/server";
import { getSummaries } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));

    const result = await getSummaries(page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/history error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch history";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}