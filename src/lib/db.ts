import { db } from "@/db";
import { articles, summaries } from "@/db/schema";
import { eq, desc, count } from "drizzle-orm";

export async function insertSummary(params: {
  url: string;
  title: string;
  content: string;
  excerpt: string | null;
  siteName: string | null;
  sessionId: string;
  oneSentence: string;
  shortSummary: string;
  detailedSummary: string;
}) {
  // Upsert article: find existing or create new
  const existing = await db
    .select({ id: articles.id })
    .from(articles)
    .where(eq(articles.url, params.url))
    .limit(1);

  let articleId: string;

  if (existing.length > 0) {
    articleId = existing[0].id;
  } else {
    const inserted = await db
      .insert(articles)
      .values({
        id: crypto.randomUUID(),
        url: params.url,
        title: params.title,
        content: params.content,
        excerpt: params.excerpt,
        author: null,
        siteName: params.siteName,
        createdAt: Date.now(),
      })
      .returning();
    articleId = inserted[0].id;
  }

  const summary = await db
    .insert(summaries)
    .values({
      id: crypto.randomUUID(),
      articleId,
      sessionId: params.sessionId,
      oneSentence: params.oneSentence,
      shortSummary: params.shortSummary,
      detailedSummary: params.detailedSummary,
      createdAt: Date.now(),
    })
    .returning();

  return summary[0];
}

export async function getSummaries(params: {
  page: number;
  limit: number;
  sessionId?: string;
}) {
  const { page, limit, sessionId } = params;
  const offset = (page - 1) * limit;

  const conditions = sessionId ? eq(summaries.sessionId, sessionId) : undefined;

  const totalResult = await db
    .select({ count: count() })
    .from(summaries)
    .where(conditions);

  const total = totalResult[0].count;

  const data = await db
    .select({
      id: summaries.id,
      articleId: summaries.articleId,
      sessionId: summaries.sessionId,
      oneSentence: summaries.oneSentence,
      shortSummary: summaries.shortSummary,
      detailedSummary: summaries.detailedSummary,
      createdAt: summaries.createdAt,
      articleTitle: articles.title,
      articleUrl: articles.url,
      articleExcerpt: articles.excerpt,
      siteName: articles.siteName,
    })
    .from(summaries)
    .leftJoin(articles, eq(summaries.articleId, articles.id))
    .where(conditions)
    .orderBy(desc(summaries.createdAt))
    .limit(limit)
    .offset(offset);

  return { data, total, page };
}

export async function getSummaryById(id: string) {
  const result = await db
    .select({
      id: summaries.id,
      articleId: summaries.articleId,
      sessionId: summaries.sessionId,
      oneSentence: summaries.oneSentence,
      shortSummary: summaries.shortSummary,
      detailedSummary: summaries.detailedSummary,
      createdAt: summaries.createdAt,
      articleTitle: articles.title,
      articleUrl: articles.url,
      articleExcerpt: articles.excerpt,
      articleContent: articles.content,
      siteName: articles.siteName,
    })
    .from(summaries)
    .leftJoin(articles, eq(summaries.articleId, articles.id))
    .where(eq(summaries.id, id))
    .limit(1);

  return result[0] || null;
}
