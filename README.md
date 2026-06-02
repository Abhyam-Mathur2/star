# Celestial Identity

A premium AI-powered celestial identity experience built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Groq.

## Setup

```bash
npm install
```

Create `.env.local`:

```env
GROQ_API_KEY=your_groq_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Run locally:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Included

- Cinematic landing page
- Mobile-first identity input flow
- Suspenseful reveal sequence
- Groq-backed JSON generation
- Dynamic celestial result screen
- Animated constellation moment
- Luxury share card with PNG download
- WhatsApp sharing and copy-link actions
- Compatibility mode with two-star reveal

## Notes

The app intentionally does not hardcode generated identities. The `/api/identity/generate` and `/api/compatibility/generate` routes call Groq server-side and validate responses with Zod.

If `GROQ_API_KEY` is missing, generation returns a clear error instead of using fake static results.
