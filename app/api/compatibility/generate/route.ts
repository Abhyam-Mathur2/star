import { NextResponse } from "next/server";
import { buildCompatibilityPrompt, compatibilitySystemPrompt } from "@/lib/ai/prompts";
import { generateGroqJson } from "@/lib/ai/groq";
import { CompatibilityInputSchema, CompatibilityResultSchema } from "@/lib/identity/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CompatibilityInputSchema.parse(body);
    const result = await generateGroqJson({
      systemPrompt: compatibilitySystemPrompt,
      userPrompt: buildCompatibilityPrompt(input),
      schema: CompatibilityResultSchema
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not generate compatibility.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
