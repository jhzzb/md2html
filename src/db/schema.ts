import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  url: text("url").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: text("author"),
  siteName: text("site_name"),
  createdAt: integer("created_at").notNull(),
});

export const summaries = sqliteTable("summaries", {
  id: text("id").primaryKey(),
  articleId: text("article_id")
    .notNull()
    .references(() => articles.id),
  sessionId: text("session_id").notNull(),
  oneSentence: text("one_sentence").notNull(),
  shortSummary: text("short_summary").notNull(),
  detailedSummary: text("detailed_summary").notNull(),
  createdAt: integer("created_at").notNull(),
});
