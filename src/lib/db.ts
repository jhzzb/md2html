import { eq, count, desc } from "drizzle-orm";
import { db } from "@/db";
import { summaries } from "@/db/schema";
import type { InsertSummary, Summary } from "@/types";

export async function insertSummary(data: InsertSummary): Promise<Summary> {
  const [result] = await db.insert(summaries).values(data).returning();
  return result;
}

export async function getSummaries(page: number, limit: number, sessionId?: string): Promise<{ data: Summary[]; total: number }> {
  const offset = (page - 1) * limit;
  const conditions = sessionId ? eq(summaries.sessionId, sessionId) : undefined;

  const [data, totalResult] = await Promise.all([
    db.select()
      .from(summaries)
      .where(conditions)
      .orderBy(desc(summaries.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ value: count() }).from(summaries).where(conditions),
  ]);
  return { data, total: totalResult[0].value };
}

export async function getSummaryById(id: string): Promise<Summary | null> {
  const [result] = await db.select().from(summaries).where(eq(summaries.id, id)).limit(1);
  return result ?? null;
}

export async function deleteSummary(id: string): Promise<boolean> {
  const result = await db.delete(summaries).where(eq(summaries.id, id)).returning({ id: summaries.id });
  return result.length > 0;
}