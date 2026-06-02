import { NextResponse } from "next/server";
import { buildCompatibilityPrompt, compatibilitySystemPrompt } from "@/lib/ai/prompts";
import { generateGroqJson } from "@/lib/ai/groq";
import { CompatibilityInputSchema, CompatibilityResultSchema } from "@/lib/identity/types";

function hashText(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function deriveCompatibilityScore(input: {
  personA: { firstName: string; birthMonth: number; birthYear: number };
  personB: { firstName: string; birthMonth: number; birthYear: number };
  relationshipType: string;
}) {
  const nameSeed = hashText(`${input.personA.firstName}|${input.personB.firstName}`);
  const monthGap = Math.abs(input.personA.birthMonth - input.personB.birthMonth);
  const yearGap = Math.abs(input.personA.birthYear - input.personB.birthYear);
  const relationshipBonus: Record<string, number> = {
    Friend: 6,
    "Best Friend": 11,
    Crush: 8,
    Couple: 13,
    Sibling: 10,
    Family: 9
  };

  const nameHarmony = 12 - (nameSeed % 13);
  const seasonalHarmony = monthGap <= 1 ? 14 : monthGap <= 3 ? 11 : monthGap <= 6 ? 8 : 4;
  const ageHarmony = yearGap <= 1 ? 12 : yearGap <= 3 ? 10 : yearGap <= 7 ? 7 : 5;
  const relationshipHarmony = relationshipBonus[input.relationshipType] ?? 7;

  const total = 41 + nameHarmony + seasonalHarmony + ageHarmony + relationshipHarmony;
  return Math.max(41, Math.min(99, total));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CompatibilityInputSchema.parse(body);
    const result = await generateGroqJson({
      systemPrompt: compatibilitySystemPrompt,
      userPrompt: buildCompatibilityPrompt(input),
      schema: CompatibilityResultSchema
    });

    return NextResponse.json({
      ...result,
      compatibilityScore: deriveCompatibilityScore(input)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not generate compatibility.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
