import { NextRequest, NextResponse } from "next/server";
import { fetchArticle } from "@/lib/article";
import { generateSummaries } from "@/lib/openai";
import { getSessionId } from "@/lib/session";
import { insertSummary } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const article = await fetchArticle(url);
    const { oneSentence, shortSummary, detailedSummary } = await generateSummaries(article.content);
    const sessionId = await getSessionId();

    const result = await insertSummary({
      url,
      title: article.title,
      content: article.content,
      oneLine: oneSentence,
      shortSummary,
      detailedSummary,
      sessionId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/summarize error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate summary";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}