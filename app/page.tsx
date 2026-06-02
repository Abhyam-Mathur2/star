"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Starfield } from "@/components/cosmic/Starfield";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-white">
      <Starfield />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-8 pt-6">
        <nav className="flex items-center justify-between">
          <div className="font-accent text-xs uppercase tracking-[0.32em] text-moon/80">Celestial Identity</div>
          <div className="flex items-center gap-3">
            <Link href="/identity" className="flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] px-4 text-sm text-white backdrop-blur">
              Identity
            </Link>
            <Link href="/compatibility" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.08]" aria-label="Open compatibility">
              <Users size={17} />
            </Link>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_.72fr]">
          <div>
            <motion.p className="mb-5 font-accent text-[10px] uppercase tracking-[0.42em] text-stellar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              This is not astrology
            </motion.p>
            <h1 className="max-w-4xl font-display text-6xl font-semibold leading-[0.88] text-white sm:text-7xl lg:text-8xl">
              YOUR NAME HOLDS A STAR
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-moon/75">
              Discover the celestial identity hidden in your birth sky, shaped by your name, mythology, astronomy, and AI storytelling.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/identity" className="group flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-bold text-void">
                Reveal My Cosmos <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </Link>
              <Link href="/compatibility" className="flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.08] px-6 py-4 text-white backdrop-blur">
                <Users size={18} /> Compatibility
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[32px] card-border bg-white/5 p-5">
            <div className="starfield absolute inset-0 opacity-50" />
            <motion.div
              className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(248,216,121,.38),transparent_58%)]"
              animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.55, 0.9, 0.55] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative flex h-full flex-col justify-between border border-white/15 p-6">
              <div className="flex justify-between font-accent text-[10px] uppercase tracking-[0.24em] text-white/70">
                <span>Vega</span>
                <span>2.7%</span>
              </div>
              <div className="text-center">
                <Sparkles className="mx-auto mb-5 text-stellar" />
                <p className="font-accent text-[10px] uppercase tracking-[0.34em] text-stellar">Preview</p>
                <p className="mt-4 font-display text-5xl leading-none">Aster Bloom</p>
              </div>
              <p className="font-display text-2xl leading-tight text-white/88">&ldquo;Some lights guide not by brightness, but by consistency.&rdquo;</p>
            </div>
          </div>
        </div>

        <div className="h-16 border-t border-white/10 pt-5 text-sm text-moon/50">AI-generated symbolic identities. No predictions. No horoscopes.</div>
      </div>
    </main>
  );
}