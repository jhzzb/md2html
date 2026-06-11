import { db } from "../src/db";
import { summaries } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("=== DB Test Script ===");
  console.log("Database URL:", process.env.TURSO_DB_URL || "file:./data/local.db (default)");

  // 1. Insert a record
  console.log("\n1. Inserting a test summary...");
  const inserted = await db.insert(summaries).values({
    url: "https://example.com/test",
    title: "Test Article",
    content: "This is the full article content for testing purposes.",
    oneSentence: "This is a one-line summary.",
    shortSummary: "This is a short summary for testing.",
    detailedSummary: "This is a detailed summary with more information for testing purposes.",
    sessionId: "test-session-123",
  }).returning();
  console.log("   Inserted:", { id: inserted[0].id, url: inserted[0].url, title: inserted[0].title });

  // 2. Query all records
  console.log("\n2. Querying all summaries...");
  const all = await db.select().from(summaries).orderBy(summaries.createdAt);
  console.log(`   Found ${all.length} record(s):`);
  all.forEach((s) => console.log(`   - ${s.id.slice(0, 8)}... | ${s.title} | ${s.oneSentence}`));

  // 3. Query by ID
  console.log("\n3. Querying by ID...");
  const byId = await db.select().from(summaries).where(eq(summaries.id, inserted[0].id)).limit(1);
  console.log("   Found:", byId.length > 0 ? `yes (${byId[0].title})` : "no");

  // 4. Delete the record
  console.log("\n4. Deleting the test record...");
  const deleted = await db.delete(summaries).where(eq(summaries.id, inserted[0].id));
  console.log("   Deleted successfully:", deleted.rowsAffected > 0);

  // 5. Verify deletion
  console.log("\n5. Verifying deletion...");
  const verify = await db.select().from(summaries).where(eq(summaries.id, inserted[0].id)).limit(1);
  console.log("   Record still exists:", verify.length > 0 ? "yes" : "no");

  console.log("\n=== All tests passed! ===");
  process.exit(0);
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
