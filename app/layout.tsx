import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celestial Identity",
  description: "Discover the celestial identity hidden in your birth sky.",
  openGraph: {
    title: "Celestial Identity",
    description: "Your name holds a star.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
