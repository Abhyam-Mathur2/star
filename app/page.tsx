"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Starfield } from "@/components/cosmic/Starfield";
import { Constellation } from "@/components/identity/Constellation";
import { ShareCard } from "@/components/share/ShareCard";
import type { CompatibilityResult, IdentityResult } from "@/lib/identity/types";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const revealSteps = [
  "Connecting to the night sky...",
  "Searching ancient constellations...",
  "Listening for the star that answers...",
  "A celestial name is forming..."
];

type Stage = "landing" | "input" | "reveal" | "result" | "compatibility";

export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [firstName, setFirstName] = useState("");
  const [birthMonth, setBirthMonth] = useState("4");
  const [birthYear, setBirthYear] = useState("1998");
  const [result, setResult] = useState<IdentityResult | null>(null);
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const [error, setError] = useState("");

  async function submitIdentity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setStage("reveal");
    setRevealIndex(0);

    const ticker = window.setInterval(() => {
      setRevealIndex((current) => Math.min(current + 1, revealSteps.length - 1));
    }, 1450);

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
      window.clearInterval(ticker);
      setRevealIndex(revealSteps.length - 1);
      window.setTimeout(() => {
        setResult(payload);
        setStage("result");
      }, 1200);
    } catch (caught) {
      window.clearInterval(ticker);
      setError(caught instanceof Error ? caught.message : "Generation failed.");
      setStage("input");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-white">
      <Starfield />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === "landing" && <Landing key="landing" onBegin={() => setStage("input")} onCompatibility={() => setStage("compatibility")} />}
          {stage === "input" && (
            <InputScreen
              key="input"
              firstName={firstName}
              setFirstName={setFirstName}
              birthMonth={birthMonth}
              setBirthMonth={setBirthMonth}
              birthYear={birthYear}
              setBirthYear={setBirthYear}
              onSubmit={submitIdentity}
              error={error}
              onBack={() => setStage("landing")}
            />
          )}
          {stage === "reveal" && <Reveal key="reveal" step={revealSteps[revealIndex]} />}
          {stage === "result" && result && <Result key="result" result={result} firstName={firstName} onCompatibility={() => setStage("compatibility")} />}
          {stage === "compatibility" && (
            <CompatibilityScreen
              key="compat"
              result={compatibility}
              setResult={setCompatibility}
              onBack={() => setStage(result ? "result" : "landing")}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

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

function Landing({ onBegin, onCompatibility }: { onBegin: () => void; onCompatibility: () => void }) {
  return (
    <Screen className="justify-between pb-8 pt-6">
      <nav className="flex items-center justify-between">
        <div className="font-accent text-xs uppercase tracking-[0.32em] text-moon/80">Celestial Identity</div>
        <button onClick={onCompatibility} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8" aria-label="Open compatibility">
          <Users size={17} />
        </button>
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
            <button onClick={onBegin} className="group flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-bold text-void">
              Reveal My Cosmos <ArrowRight className="transition group-hover:translate-x-1" size={18} />
            </button>
            <button onClick={onCompatibility} className="flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/8 px-6 py-4 text-white backdrop-blur">
              <Users size={18} /> Compatibility
            </button>
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
    </Screen>
  );
}

function InputScreen(props: {
  firstName: string;
  setFirstName: (value: string) => void;
  birthMonth: string;
  setBirthMonth: (value: string) => void;
  birthYear: string;
  setBirthYear: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error: string;
  onBack: () => void;
}) {
  return (
    <Screen className="justify-center py-10">
      <form onSubmit={props.onSubmit} className="mx-auto w-full max-w-xl rounded-[28px] border border-white/15 bg-white/[0.07] p-6 shadow-glow backdrop-blur-xl sm:p-8">
        <p className="font-accent text-[10px] uppercase tracking-[0.36em] text-stellar">Begin the reveal</p>
        <h2 className="mt-4 font-display text-5xl leading-none">Tell the sky your name.</h2>
        <div className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-moon/70">
            First name
            <input value={props.firstName} onChange={(event) => props.setFirstName(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-lg text-white outline-none focus:border-stellar" placeholder="Olive" required />
          </label>
          <label className="grid gap-2 text-sm text-moon/70">
            Birth month
            <select value={props.birthMonth} onChange={(event) => props.setBirthMonth(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-lg text-white outline-none focus:border-stellar">
              {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-moon/70">
            Birth year
            <input value={props.birthYear} onChange={(event) => props.setBirthYear(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-lg text-white outline-none focus:border-stellar" inputMode="numeric" placeholder="1998" required />
          </label>
        </div>
        {props.error && <p className="mt-5 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm text-red-100">{props.error}</p>}
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={props.onBack} className="rounded-full border border-white/15 px-5 py-4 text-moon">Back</button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-stellar px-5 py-4 font-bold text-void">
            Reveal My Cosmos <Sparkles size={18} />
          </button>
        </div>
      </form>
    </Screen>
  );
}

function Reveal({ step }: { step: string }) {
  return (
    <Screen className="items-center justify-center text-center">
      <motion.div
        className="mb-10 h-52 w-52 rounded-full border border-stellar/30 bg-[radial-gradient(circle,rgba(248,216,121,.26),transparent_62%)]"
        animate={{ scale: [0.88, 1.08, 0.88], rotate: 360 }}
        transition={{ scale: { duration: 2.8, repeat: Infinity }, rotate: { duration: 18, repeat: Infinity, ease: "linear" } }}
      />
      <AnimatePresence mode="wait">
        <motion.p key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="font-display text-4xl text-white">
          {step}
        </motion.p>
      </AnimatePresence>
    </Screen>
  );
}

function Result({ result, firstName, onCompatibility }: { result: IdentityResult; firstName: string; onCompatibility: () => void }) {
  const quote = useMemo(() => result.cosmicQuote.replace(/^"|"$/g, ""), [result.cosmicQuote]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-16 text-center">
        <p className="font-accent text-[10px] uppercase tracking-[0.42em] text-stellar">{firstName}, your celestial name is</p>
        <motion.h1 initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mt-5 font-display text-7xl font-semibold leading-none sm:text-8xl">
          {result.celestialName}
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-moon/75">{result.cosmicTitle}</p>
        <div className="mx-auto mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          <Stat label="Guiding star" value={result.guidingStar} />
          <Stat label="Constellation" value={result.constellation} />
          <Stat label="Rarity" value={`${result.rarityScore}%`} />
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-14">
        <Constellation name={result.constellation} accent={result.theme.accent} />
        <div className="mt-10 rounded-[28px] border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:p-10">
          <p className="font-accent text-[10px] uppercase tracking-[0.34em] text-stellar">Cosmic quote</p>
          <h2 className="mt-4 font-display text-4xl leading-tight">&ldquo;{quote}&rdquo;</h2>
          <p className="mt-8 text-lg leading-8 text-moon/78">{result.cosmicStory}</p>
          <p className="mt-8 text-sm text-moon/55">Only {result.rarityScore}% of users share this celestial path.</p>
        </div>
      </section>
      <ShareCard result={result} />
      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <button onClick={onCompatibility} className="rounded-full border border-white/15 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur">
          Try Compatibility Mode
        </button>
      </section>
    </motion.div>
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

function CompatibilityScreen({ result, setResult, onBack }: { result: CompatibilityResult | null; setResult: (value: CompatibilityResult | null) => void; onBack: () => void }) {
  const [personA, setPersonA] = useState("");
  const [personB, setPersonB] = useState("");
  const [relationshipType, setRelationshipType] = useState("Best Friend");
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
        body: JSON.stringify({ personA, personB, relationshipType })
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
    <Screen className="justify-center py-10">
      <div className="mx-auto w-full max-w-3xl rounded-[28px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl sm:p-8">
        <button onClick={onBack} className="mb-7 text-sm text-moon/65">Back</button>
        <p className="font-accent text-[10px] uppercase tracking-[0.36em] text-stellar">Compatibility mode</p>
        <h2 className="mt-4 font-display text-5xl leading-none">Two stars, one orbit.</h2>
        <form onSubmit={submit} className="mt-8 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={personA} onChange={(event) => setPersonA(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-stellar" placeholder="Person A" required />
            <input value={personB} onChange={(event) => setPersonB(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-stellar" placeholder="Person B" required />
          </div>
          <select value={relationshipType} onChange={(event) => setRelationshipType(event.target.value)} className="rounded-2xl border border-white/12 bg-black/30 px-4 py-4 text-white outline-none focus:border-stellar">
            {["Friend", "Best Friend", "Crush", "Couple", "Sibling", "Family"].map((type) => <option key={type}>{type}</option>)}
          </select>
          <button disabled={loading} className="rounded-full bg-stellar px-5 py-4 font-bold text-void disabled:opacity-60">
            {loading ? "Drawing the orbit..." : "Reveal the Bond"}
          </button>
        </form>
        {loading && <OrbitReveal />}
        {error && <p className="mt-5 rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-sm text-red-100">{error}</p>}
        {result && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-3xl border border-white/12 bg-black/25 p-6 text-center">
            <p className="font-display text-7xl">{result.compatibilityScore}%</p>
            <h3 className="mt-3 font-display text-4xl">{result.celestialPairName}</h3>
            <p className="mt-2 text-stellar">{result.bondType} of {result.sharedConstellation}</p>
            <p className="mx-auto mt-6 max-w-xl font-display text-3xl leading-tight">&ldquo;{result.pairQuote.replace(/^"|"$/g, "")}&rdquo;</p>
            <p className="mt-6 text-left leading-7 text-moon/75">{result.pairStory}</p>
          </motion.div>
        )}
      </div>
    </Screen>
  );
}

function OrbitReveal() {
  return (
    <div className="relative mx-auto mt-8 h-44 max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/20">
      <motion.div className="absolute left-10 top-20 h-4 w-4 rounded-full bg-aurora shadow-[0_0_24px_#49C6FF]" animate={{ x: [0, 128, 168], y: [0, -32, 0] }} transition={{ duration: 2.4, repeat: Infinity }} />
      <motion.div className="absolute right-10 top-20 h-4 w-4 rounded-full bg-stellar shadow-[0_0_24px_#F8D879]" animate={{ x: [0, -128, -168], y: [0, 32, 0] }} transition={{ duration: 2.4, repeat: Infinity }} />
      <motion.div className="absolute left-1/2 top-1/2 h-px w-40 origin-left bg-gradient-to-r from-aurora to-stellar" animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity }} />
    </div>
  );
}
