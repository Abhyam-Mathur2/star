"use client";

import { motion } from "framer-motion";

const CONSTELLATION_POINTS: Record<string, readonly [number, number][]> = {
  Lyra: [[50, 15], [50, 32], [40, 52], [60, 52], [50, 32], [38, 70], [62, 70]],
  Orion: [[28, 20], [72, 20], [22, 38], [50, 42], [78, 38], [30, 62], [50, 68], [70, 62], [40, 82], [60, 82]],
  Cygnus: [[50, 10], [50, 30], [50, 55], [50, 80], [20, 42], [80, 42]],
  Cassiopeia: [[10, 50], [28, 28], [50, 45], [72, 28], [90, 50]],
  Andromeda: [[20, 72], [38, 58], [55, 45], [68, 32], [75, 20], [62, 38]],
  Aquila: [[50, 15], [50, 35], [30, 55], [50, 35], [70, 55], [50, 65], [50, 85]],
  Perseus: [[50, 12], [42, 28], [35, 45], [48, 60], [58, 72], [35, 45], [22, 58], [42, 28], [60, 35]],
  Carina: [[15, 60], [30, 45], [48, 38], [62, 45], [75, 55], [85, 42], [72, 30]],
  Draco: [[50, 10], [65, 22], [72, 38], [62, 52], [48, 60], [35, 68], [28, 80], [38, 72], [52, 65]],
  Auriga: [[50, 12], [72, 28], [78, 52], [62, 70], [38, 70], [22, 52], [28, 28], [50, 12]],
  "Corona Borealis": [[28, 55], [38, 32], [50, 22], [62, 32], [72, 55]],
  Delphinus: [[50, 20], [62, 35], [55, 52], [45, 52], [38, 35], [50, 20]],
  Vela: [[20, 50], [35, 30], [55, 22], [72, 35], [80, 55], [65, 72], [45, 78]],
  Phoenix: [[50, 15], [65, 32], [72, 52], [55, 65], [38, 72], [28, 55], [35, 35], [50, 15]],
  Lacerta: [[30, 25], [42, 38], [35, 52], [48, 62], [58, 50], [65, 65], [72, 52]],
  Cepheus: [[50, 12], [72, 30], [68, 58], [50, 70], [32, 58], [28, 30], [50, 12]]
};

const FALLBACK_POINTS: readonly [number, number][] = [[50, 12], [68, 28], [75, 50], [62, 70], [40, 75], [25, 58], [30, 35], [50, 12]];

const GUIDING_STAR_INDEX: Record<string, number> = {
  Lyra: 0,
  Orion: 3,
  Cygnus: 0,
  Cassiopeia: 2,
  Andromeda: 0,
  Aquila: 0,
  Perseus: 0,
  Carina: 6,
  Draco: 0,
  Auriga: 0,
  "Corona Borealis": 2,
  Delphinus: 0,
  Vela: 2,
  Phoenix: 0,
  Lacerta: 0,
  Cepheus: 0
};

export function Constellation({ name, accent = "#F8D879" }: { name: string; accent?: string }) {
  const points = CONSTELLATION_POINTS[name] ?? FALLBACK_POINTS;
  const brightIndex = GUIDING_STAR_INDEX[name] ?? 0;
  const path = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

  return (
    <div className="relative mx-auto aspect-[1.35] w-full max-w-md">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <motion.path
          d={path}
          fill="none"
          stroke={accent}
          strokeWidth="0.45"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        {points.map(([x, y], index) => (
          <motion.circle
            key={`${name}-${index}-${x}-${y}`}
            cx={x}
            cy={y}
            r={index === brightIndex ? 1.8 : index % 3 === 0 ? 1.25 : 1.05}
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.18, duration: 0.45 }}
            style={{
              filter: index === brightIndex
                ? `drop-shadow(0 0 8px ${accent}) drop-shadow(0 0 2px white)`
                : `drop-shadow(0 0 4px ${accent})`
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-2 text-center font-accent text-[10px] uppercase tracking-[0.32em] text-moon/70">
        Guided by {name}
      </div>
    </div>
  );
}
