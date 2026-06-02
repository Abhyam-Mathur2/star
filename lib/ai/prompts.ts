import type { CompatibilityInput, IdentityInput } from "@/lib/identity/types";
import { selectIngredients } from "@/lib/identity/ingredients";

export const identitySystemPrompt = `
You generate symbolic celestial identities.
This is not astrology, a horoscope, fortune telling, or personality prediction.
Create a poetic, premium, emotionally resonant identity inspired by the user's first name, birth month, birth year, astronomy, mythology, and symbolic storytelling.
Always return valid JSON only. No markdown. No commentary.
Avoid clichés, generic self-help language, zodiac claims, predictions, and phrases like "believe in yourself".
Every result must feel handcrafted and specific.
`;

export function buildIdentityPrompt(input: IdentityInput) {
  const ingredients = selectIngredients(input);

  return JSON.stringify({
    task: "Generate one unique celestial identity.",
    input,
    ingredients,
    style: {
      tone: "luxury, mythic, intimate, cinematic, emotionally precise",
      cardReady: true
    },
    requiredJsonShape: {
      celestialName: "Two or three words, not the user's literal name.",
      guidingStar: "One star selected or inspired by provided star candidates.",
      constellation: "One constellation selected or inspired by candidates.",
      cosmicTitle: "A collectible title, specific and elegant.",
      cosmicQuote: "One original quote under 22 words. Avoid clichés.",
      cosmicStory: "120-170 words. Second person. Feels like a reveal, not a prediction.",
      rarityScore: "number from 1.1 to 14.9 with one decimal",
      archetype: "short symbolic archetype",
      mythologyThread: "short source of mythic inspiration",
      astronomyThread: "short source of astronomy inspiration",
      theme: {
        id: "lowercase-kebab-theme-name",
        primary: "#RRGGBB",
        secondary: "#RRGGBB",
        accent: "#RRGGBB",
        mood: "brief visual mood"
      }
    }
  });
}

export const compatibilitySystemPrompt = `
You generate symbolic celestial compatibility stories.
You receive two people with names and birth data. Use the data to create a grounded compatibility story and a non-random compatibility score.
This is playful mythology and astronomy-inspired storytelling, not relationship prediction, fate, or advice.
Always return valid JSON only. No markdown. No commentary.
Avoid deterministic claims like "meant to be" or "will last forever".
`;

export function buildCompatibilityPrompt(input: CompatibilityInput) {
  const ingredientsA = selectIngredients({
    firstName: input.personA.firstName,
    birthMonth: input.personA.birthMonth,
    birthYear: input.personA.birthYear
  });
  const ingredientsB = selectIngredients({
    firstName: input.personB.firstName,
    birthMonth: input.personB.birthMonth,
    birthYear: input.personB.birthYear
  });

  const seasonA = Math.floor((input.personA.birthMonth - 1) / 3);
  const seasonB = Math.floor((input.personB.birthMonth - 1) / 3);
  const seasonNames = ["winter", "spring", "summer", "autumn"];
  const seasonalNote =
    seasonA === seasonB
      ? `Both born in ${seasonNames[seasonA]} — a familiar resonance.`
      : `Born in ${seasonNames[seasonA]} and ${seasonNames[seasonB]} — different seasonal energies that can complement each other.`;

  return JSON.stringify({
    task: "Generate one symbolic pair identity.",
    personA: {
      ...input.personA,
      ingredients: ingredientsA
    },
    personB: {
      ...input.personB,
      ingredients: ingredientsB
    },
    seasonalNote,
    relationshipType: input.relationshipType,
    style: {
      tone: "emotional, cinematic, warm, premium, never childish"
    },
    requiredJsonShape: {
      compatibilityScore: "integer from 41 to 99, influenced by the two profiles provided",
      sharedConstellation: "constellation name",
      celestialPairName: "collectible pair name",
      bondType: "short poetic bond type",
      pairQuote: "one original quote under 22 words",
      pairStory: "100-150 words. Symbolic, not predictive.",
      theme: {
        id: "lowercase-kebab-theme-name",
        primary: "#RRGGBB",
        secondary: "#RRGGBB",
        accent: "#RRGGBB",
        mood: "brief visual mood"
      }
    }
  });
}
