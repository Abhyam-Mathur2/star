"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function PageShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative min-h-screen overflow-hidden bg-void text-white ${className}`}
    >
      {children}
    </motion.main>
  );
}

export function BackLink({ href = "/", label = "Back" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className="text-sm text-moon/65 transition hover:text-white">
      {label}
    </Link>
  );
}