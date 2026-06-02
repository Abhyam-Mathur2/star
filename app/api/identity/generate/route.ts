import { NextResponse } from "next/server";
import { buildIdentityPrompt, identitySystemPrompt } from "@/lib/ai/prompts";
import { generateGroqJson } from "@/lib/ai/groq";
import { IdentityInputSchema, IdentityResultSchema } from "@/lib/identity/types";
import { slugify } from "@/lib/identity/ingredients";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = IdentityInputSchema.parse(body);
    const result = await generateGroqJson({
      systemPrompt: identitySystemPrompt,
      userPrompt: buildIdentityPrompt(input),
      schema: IdentityResultSchema
    });

    return NextResponse.json({
      ...result,
      rarityScore: Number(result.rarityScore.toFixed(1)),
      slug: slugify(`${result.celestialName}-${input.firstName}-${Date.now().toString(36)}`)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not generate identity.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
