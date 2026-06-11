import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import crypto from "node:crypto";

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  url: text("url").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: text("author"),
  siteName: text("site_name"),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  urlIdx: index("articles_url_idx").on(table.url),
  createdAtIdx: index("articles_created_at_idx").on(table.createdAt),
}));

export const summaries = sqliteTable("summaries", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  url: text("url").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  oneSentence: text("one_sentence").notNull(),
  shortSummary: text("short_summary").notNull(),
  detailedSummary: text("detailed_summary").notNull(),
  sessionId: text("session_id").notNull(),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
}, (table) => ({
  urlIdx: index("summaries_url_idx").on(table.url),
  sessionIdIdx: index("summaries_session_id_idx").on(table.sessionId),
  createdAtIdx: index("summaries_created_at_idx").on(table.createdAt),
}));