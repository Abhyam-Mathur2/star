"use client";

import { motion } from "framer-motion";

export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="starfield absolute inset-[-10%] opacity-60"
        animate={{ backgroundPosition: ["0px 0px", "120px 80px"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(123,77,255,.35),transparent_36%),radial-gradient(circle_at_80%_70%,rgba(73,198,255,.22),transparent_30%),linear-gradient(180deg,rgba(1,2,10,.2),#01020A_86%)]" />
      <div className="noise absolute inset-0 opacity-40" />
      <motion.div
        className="absolute left-[-20%] top-[18%] h-px w-40 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
        animate={{ x: ["0vw", "145vw"], y: ["0vh", "42vh"], opacity: [0, 1, 0] }}
        transition={{ duration: 3.7, repeat: Infinity, repeatDelay: 6 }}
      />
      <motion.div
        className="absolute left-[70%] top-[-10%] h-px w-28 bg-gradient-to-r from-transparent via-stellar to-transparent opacity-70"
        animate={{ x: ["0vw", "-110vw"], y: ["0vh", "72vh"], opacity: [0, 1, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, repeatDelay: 8 }}
      />
    </div>
  );
}
