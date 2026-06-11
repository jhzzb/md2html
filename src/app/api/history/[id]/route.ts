import { NextRequest, NextResponse } from "next/server";
import { getSummaryById } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const summary = await getSummaryById(id);

    if (!summary) {
      return NextResponse.json(
        { error: "Summary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(summary);
  } catch (error) {
    console.error("GET /api/history/[id] error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch summary";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
