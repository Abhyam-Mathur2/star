"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Starfield } from "@/components/cosmic/Starfield";
import { BackLink, PageShell, months } from "@/components/page-shell";
import { Constellation } from "@/components/identity/Constellation";
import { ShareCard } from "@/components/share/ShareCard";
import type { IdentityResult } from "@/lib/identity/types";

function Screen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur">
      <p className="font-accent text-[9px] uppercase tracking-[0.28em] text-moon/55">{label}</p>
      <p className="mt-3 font-display text-3xl">{value}</p>
    </div>
  );
}

export default function IdentityPage() {
  const [firstName, setFirstName] = useState("");
  const [birthMonth, setBirthMonth] = useState("4");
  const [birthYear, setBirthYear] = useState("1998");
  const [result, setResult] = useState<IdentityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch("/api/identity/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          birthMonth: Number(birthMonth),
          birthYear: Number(birthYear)
        })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Generation failed.");
      setResult(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  const quote = useMemo(() => result?.cosmicQuote.replace(/^"|"$/g, "") ?? "", [result]);

  return (
    <PageShell>
      <Starfield />
      <div className="relative z-10">
        {!result ? (
          <Screen className="justify-center py-10">
            <div className="mx-auto w-full max-w-2xl rounded-[28px] border border-white/15 bg-white/[0.07] p-6 shadow-glow backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <BackLink />
                <p className="font-accent text-[10px] uppercase tracking-[0.36em] text-stellar">Identity page</p>
              </div>
              <p className="font-accent text-[10px] uppercase tracking-[0.36em] text-stellar">Begin the reveal</p>
              <h2 className="mt-4 font-display text-5xl leading-none">Tell the sky your name.</h2>
              <form onSubmit={submit} className="mt-8 grid gap-4">
                <label className="grid gap-2 text-sm text-moon/70">
                  First name
                  <input value={firstName} onChange={(event) => setFirstName(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-lg text-white outline-none focus:border-stellar" placeholder="Olive" required />
                </label>
                <label className="grid gap-2 text-sm text-moon/70">
                  Birth month
                  <select value={birthMonth} onChange={(event) => setBirthMonth(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-lg text-white outline-none focus:border-stellar">
                    {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-moon/70">
                  Birth year
                  <input value={birthYear} onChange={(event) => setBirthYear(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-lg text-white outline-none focus:border-stellar" inputMode="numeric" placeholder="1998" required />
                </label>
                {error && <p className="mt-1 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm text-red-100">{error}</p>}
                <button disabled={loading} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-stellar px-5 py-4 font-bold text-void disabled:opacity-60">
                  <Sparkles size={18} /> {loading ? "Drawing the sky..." : "Reveal My Cosmos"}
                </button>
              </form>
            </div>
          </Screen>
        ) : (
          <>
            <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-16 text-center">
              <div className="mb-6 flex items-center justify-between text-left">
                <BackLink label="Back to home" />
                <button onClick={() => setResult(null)} className="text-sm text-moon/65 transition hover:text-white">
                  Edit details
                </button>
              </div>
              <p className="font-accent text-[10px] uppercase tracking-[0.42em] text-stellar">{firstName}, your celestial name is</p>
              <motion.h1 initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mt-5 font-display text-7xl font-semibold leading-none sm:text-8xl">
                {result.celestialName}
              </motion.h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-moon/75">{result.cosmicTitle}</p>
              <div className="mx-auto mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                <Stat label="Guiding star" value={result.guidingStar} />
                <Stat label="Constellation" value={result.constellation} />
                <Stat label="Rarity" value={`Top ${result.rarityScore.toFixed(1)}%`} />
              </div>
            </section>
            <section className="mx-auto max-w-5xl px-5 py-14">
              <Constellation name={result.constellation} accent={result.theme.accent} />
              <div className="mt-10 rounded-[28px] border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:p-10">
                <p className="font-accent text-[10px] uppercase tracking-[0.34em] text-stellar">Cosmic quote</p>
                <h2 className="mt-4 font-display text-4xl leading-tight">&ldquo;{quote}&rdquo;</h2>
                <p className="mt-8 text-lg leading-8 text-moon/78">{result.cosmicStory}</p>
                <p className="mt-8 text-sm text-moon/55">Only Top {result.rarityScore.toFixed(1)}% of users share this celestial path.</p>
              </div>
            </section>
            <ShareCard result={result} firstName={firstName} />
          </>
        )}
      </div>
    </PageShell>
  );
}