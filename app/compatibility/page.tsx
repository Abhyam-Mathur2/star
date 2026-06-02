"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Starfield } from "@/components/cosmic/Starfield";
import { BackLink, PageShell, months } from "@/components/page-shell";
import type { CompatibilityResult } from "@/lib/identity/types";

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

export default function CompatibilityPage() {
  const [personAName, setPersonAName] = useState("");
  const [personAMonth, setPersonAMonth] = useState("1");
  const [personAYear, setPersonAYear] = useState("1995");
  const [personBName, setPersonBName] = useState("");
  const [personBMonth, setPersonBMonth] = useState("1");
  const [personBYear, setPersonBYear] = useState("1995");
  const [relationshipType, setRelationshipType] = useState("Best Friend");
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/compatibility/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personA: {
            firstName: personAName,
            birthMonth: Number(personAMonth),
            birthYear: Number(personAYear)
          },
          personB: {
            firstName: personBName,
            birthMonth: Number(personBMonth),
            birthYear: Number(personBYear)
          },
          relationshipType
        })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Compatibility failed.");
      setResult(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Compatibility failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <Starfield />
      <div className="relative z-10">
        <Screen className="justify-center py-10">
          <div className="mx-auto w-full max-w-3xl rounded-[28px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <BackLink />
              <p className="font-accent text-[10px] uppercase tracking-[0.36em] text-stellar">Compatibility page</p>
            </div>
            <p className="font-accent text-[10px] uppercase tracking-[0.36em] text-stellar">Compatibility mode</p>
            <h2 className="mt-4 font-display text-5xl leading-none">Two stars, one orbit.</h2>
            <form onSubmit={submit} className="mt-8 grid gap-4">
              <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-2">
                <div className="grid gap-3">
                  <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-stellar/70">Person A</p>
                  <input value={personAName} onChange={(event) => setPersonAName(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-stellar" placeholder="First name" required />
                  <div className="grid grid-cols-2 gap-3">
                    <select value={personAMonth} onChange={(event) => setPersonAMonth(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-stellar">
                      {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                    </select>
                    <input value={personAYear} onChange={(event) => setPersonAYear(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-stellar" placeholder="Birth year" inputMode="numeric" required />
                  </div>
                </div>
                <div className="grid gap-3">
                  <p className="font-accent text-[10px] uppercase tracking-[0.28em] text-aurora/70">Person B</p>
                  <input value={personBName} onChange={(event) => setPersonBName(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-aurora" placeholder="First name" required />
                  <div className="grid grid-cols-2 gap-3">
                    <select value={personBMonth} onChange={(event) => setPersonBMonth(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-aurora">
                      {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                    </select>
                    <input value={personBYear} onChange={(event) => setPersonBYear(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-aurora" placeholder="Birth year" inputMode="numeric" required />
                  </div>
                </div>
              </div>
              <select value={relationshipType} onChange={(event) => setRelationshipType(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-stellar">
                {["Friend", "Best Friend", "Crush", "Couple", "Sibling", "Family"].map((type) => <option key={type}>{type}</option>)}
              </select>
              {error && <p className="mt-1 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm text-red-100">{error}</p>}
              <button disabled={loading} className="rounded-full bg-stellar px-5 py-4 font-bold text-void disabled:opacity-60">
                {loading ? "Drawing the orbit..." : "Reveal the Bond"}
              </button>
            </form>
          </div>
        </Screen>

        {result && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-8 w-full max-w-3xl rounded-3xl border border-white/12 bg-black/25 p-6 text-center">
            <p className="font-display text-7xl">{result.compatibilityScore}%</p>
            <h3 className="mt-3 font-display text-4xl">{result.celestialPairName}</h3>
            <p className="mt-2 text-stellar">{result.bondType} of {result.sharedConstellation}</p>
            <p className="mx-auto mt-6 max-w-xl font-display text-3xl leading-tight">&ldquo;{result.pairQuote.replace(/^"|"$/g, "")}&rdquo;</p>
            <p className="mt-6 text-left leading-7 text-moon/75">{result.pairStory}</p>
            <div className="mt-8 flex justify-center">
              <BackLink label="Back to home" />
            </div>
          </motion.div>
        )}
      </div>
    </PageShell>
  );
}