import type { IdentityInput } from "./types";

export const stars = [
  "Vega", "Sirius", "Polaris", "Antares", "Altair", "Rigel", "Bellatrix", "Deneb",
  "Aldebaran", "Mira", "Spica", "Capella", "Arcturus", "Alcyone", "Electra", "Castor"
];

export const constellations = [
  "Lyra", "Orion", "Cygnus", "Cassiopeia", "Andromeda", "Aquila", "Perseus", "Carina",
  "Draco", "Auriga", "Corona Borealis", "Delphinus", "Vela", "Phoenix", "Lacerta", "Cepheus"
];

export const monthSymbols = [
  "thresholds and winter silence",
  "silver rain and hidden vows",
  "first thaw and soft courage",
  "blooming fields and patient light",
  "green fire and open windows",
  "long evenings and golden signals",
  "heat shimmer and bright defiance",
  "meteor trails and loyal flame",
  "harvest moons and careful craft",
  "velvet dusk and ancestral doors",
  "frosted glass and remembered names",
  "deep night and lantern songs"
];

export function hashSeed(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

export function selectIngredients(input: IdentityInput) {
  const seed = hashSeed(`${input.firstName.toLowerCase()}-${input.birthMonth}-${input.birthYear}`);
  const pick = <T>(items: T[], offset: number) => items[(seed + offset) % items.length];

  return {
    seed,
    nameInitial: input.firstName[0].toUpperCase(),
    monthSymbolism: monthSymbols[input.birthMonth - 1],
    starCandidates: [pick(stars, 1), pick(stars, 5), pick(stars, 9), pick(stars, 13)],
    constellationCandidates: [
      pick(constellations, 2),
      pick(constellations, 6),
      pick(constellations, 10),
      pick(constellations, 14)
    ]
  };
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);
}
