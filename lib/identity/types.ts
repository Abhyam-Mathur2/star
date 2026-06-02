import { z } from "zod";

export const IdentityInputSchema = z.object({
  firstName: z.string().trim().min(2).max(32).regex(/^[a-zA-Z][a-zA-Z\s'-]*$/),
  birthMonth: z.coerce.number().int().min(1).max(12),
  birthYear: z.coerce.number().int().min(1900).max(new Date().getFullYear())
});

export const ThemeSchema = z.object({
  id: z.string().min(2).max(48),
  primary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  mood: z.string().min(2).max(80)
});

export const IdentityResultSchema = z.object({
  celestialName: z.string().min(3).max(56),
  guidingStar: z.string().min(2).max(36),
  constellation: z.string().min(2).max(36),
  cosmicTitle: z.string().min(5).max(72),
  cosmicQuote: z.string().min(16).max(160),
  cosmicStory: z.string().min(160).max(900),
  rarityScore: z.coerce.number().min(1.1).max(14.9),
  archetype: z.string().min(3).max(56),
  mythologyThread: z.string().min(8).max(160),
  astronomyThread: z.string().min(8).max(160),
  theme: ThemeSchema
});

export const CompatibilityInputSchema = z.object({
  personA: z.string().trim().min(2).max(32).regex(/^[a-zA-Z][a-zA-Z\s'-]*$/),
  personB: z.string().trim().min(2).max(32).regex(/^[a-zA-Z][a-zA-Z\s'-]*$/),
  relationshipType: z.enum(["Friend", "Best Friend", "Crush", "Couple", "Sibling", "Family"])
});

export const CompatibilityResultSchema = z.object({
  compatibilityScore: z.coerce.number().int().min(41).max(99),
  sharedConstellation: z.string().min(2).max(36),
  celestialPairName: z.string().min(4).max(64),
  bondType: z.string().min(4).max(72),
  pairQuote: z.string().min(16).max(160),
  pairStory: z.string().min(140).max(800),
  theme: ThemeSchema
});

export type IdentityInput = z.infer<typeof IdentityInputSchema>;
export type IdentityResult = z.infer<typeof IdentityResultSchema> & { slug?: string };
export type CompatibilityInput = z.infer<typeof CompatibilityInputSchema>;
export type CompatibilityResult = z.infer<typeof CompatibilityResultSchema>;
