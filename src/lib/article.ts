import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
export async function fetchArticle(
  url: string
): Promise<{
  title: string;
  content: string;
  excerpt: string | null;
  siteName: string | null;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch URL: " + response.status + " " + response.statusText);
    }
    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const doc = dom.window.document;
    const siteName =
      doc.querySelector("meta[property=\"og:site_name\"]")?.getAttribute("content") || null;
    const reader = new Readability(doc);
    const article = reader.parse();
    if (article) {
      return {
        title: article.title || "",
        content: article.textContent || "",
        excerpt: article.excerpt || null,
        siteName,
      };
    }
    // Fallback: extract all visible text from <body>
    const bodyText = (doc.body?.textContent || "").replace(/\s+/g, " ").trim();
    const cleaned = bodyText.slice(0, 30_000);
    if (cleaned.length > 200) {
      return {
        title: doc.title || "",
        content: cleaned,
        excerpt: cleaned.slice(0, 300),
        siteName,
      };
    }
    throw new Error(
      "Could not extract article content from this page. Try a news article or blog post URL."
    );
  } finally {
    clearTimeout(timeout);
  }
}
