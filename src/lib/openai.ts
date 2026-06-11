import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateSummaries(content: string): Promise<{
  oneSentence: string;
  shortSummary: string;
  detailedSummary: string;
}> {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a professional summarizer. Given the article content, generate three levels of summary in Chinese. Return JSON with keys: oneSentence (less than 50 characters), shortSummary (100-200 characters), detailedSummary (300-500 characters).",
      },
      {
        role: "user",
        content: content.slice(0, 30_000),
      },
    ],
    response_format: { type: "json_object" },
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error("OpenAI returned empty response");
  }

  let parsed: { oneSentence: string; shortSummary: string; detailedSummary: string };
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Failed to parse OpenAI response as JSON");
  }

  if (!parsed.oneSentence || !parsed.shortSummary || !parsed.detailedSummary) {
    throw new Error("OpenAI response missing required summary fields");
  }

  return {
    oneSentence: parsed.oneSentence,
    shortSummary: parsed.shortSummary,
    detailedSummary: parsed.detailedSummary,
  };
}
