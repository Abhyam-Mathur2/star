"use client";

import { motion } from "framer-motion";

const points = [
  [18, 62], [32, 34], [49, 47], [63, 20], [76, 52], [58, 72], [38, 76]
] as const;

export function Constellation({ name, accent = "#F8D879" }: { name: string; accent?: string }) {
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
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={index === 3 ? 1.8 : 1.25}
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.18, duration: 0.45 }}
            style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-2 text-center font-accent text-[10px] uppercase tracking-[0.32em] text-moon/70">
        Guided by {name}
      </div>
    </div>
  );
}
