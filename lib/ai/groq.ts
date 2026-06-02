import { z } from "zod";

type GenerateJsonArgs<T extends z.ZodTypeAny> = {
  systemPrompt: string;
  userPrompt: string;
  schema: T;
};

export async function generateGroqJson<T extends z.ZodTypeAny>({
  systemPrompt,
  userPrompt,
  schema
}: GenerateJsonArgs<T>): Promise<z.infer<T>> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY. Add it to .env.local and restart the dev server.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.92,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq request failed: ${response.status} ${text.slice(0, 220)}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned an empty response.");
  }

  const parsed = JSON.parse(content);
  return schema.parse(parsed);
}
