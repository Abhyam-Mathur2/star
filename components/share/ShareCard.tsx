"use client";

import { Download, Link2, MessageCircle } from "lucide-react";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import type { IdentityResult } from "@/lib/identity/types";

export function ShareCard({ result }: { result: IdentityResult }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function download() {
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, { pixelRatio: 2, cacheBust: true });
    const link = document.createElement("a");
    link.download = `${result.celestialName.replace(/\s+/g, "-").toLowerCase()}-card.png`;
    link.href = dataUrl;
    link.click();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function whatsapp() {
    const text = encodeURIComponent(`I discovered my celestial identity: ${result.celestialName}. ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-[0.3em] text-stellar">Share card</p>
          <h2 className="font-display text-4xl">Made to keep</h2>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div
          ref={ref}
          className="card-border relative min-h-[980px] w-full overflow-hidden rounded-[28px] p-8 lg:min-h-[1120px]"
          style={{
            background: `radial-gradient(circle at 50% 18%, ${result.theme.primary}55, transparent 34%), radial-gradient(circle at 20% 76%, ${result.theme.accent}40, transparent 28%), linear-gradient(180deg, ${result.theme.secondary}, #02030B)`
          }}
        >
          <div className="starfield absolute inset-0 opacity-45" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex justify-between font-accent text-[10px] uppercase tracking-[0.25em] text-white/70">
              <span>{result.guidingStar}</span>
              <span>{result.rarityScore}%</span>
            </div>
            <div className="text-center">
              <p className="mb-3 font-accent text-[10px] uppercase tracking-[0.32em] text-stellar">Celestial Identity</p>
              <h3 className="font-display text-6xl leading-none text-white">{result.celestialName}</h3>
              <p className="mt-5 text-sm uppercase tracking-[0.18em] text-white/70">{result.cosmicTitle}</p>
            </div>
            <div className="space-y-5">
              <p className="font-display text-[1.65rem] leading-[1.35] text-white break-words">&ldquo;{result.cosmicQuote.replace(/^"|"$/g, "")}&rdquo;</p>
              <div className="mt-8 flex justify-between text-xs uppercase tracking-[0.18em] text-white/60">
                <span>{result.constellation}</span>
                <span>Celestial Identity</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <button onClick={download} className="flex items-center justify-center gap-2 rounded-full bg-stellar px-5 py-4 font-bold text-void">
            <Download size={18} /> Download PNG
          </button>
          <button onClick={whatsapp} className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-4 text-white">
            <MessageCircle size={18} /> Share to WhatsApp
          </button>
          <button onClick={copyLink} className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-4 text-white">
            <Link2 size={18} /> {copied ? "Copied" : "Copy link"}
          </button>
          <p className="mt-4 text-sm leading-6 text-moon/65">For Instagram, download the PNG and post it as a story. Native Instagram web sharing is limited by platform rules.</p>
        </div>
      </div>
    </section>
  );
}
