// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Next.js App Router REQUIRES a root layout to exist.
// This one is intentionally a passthrough — all the real layout work
// (html, body, lang, dir, fonts, providers) lives in [locale]/layout.tsx.
//
// DO NOT add <html> or <body> here — [locale]/layout.tsx already has them.
// Adding them here causes double <html> tags which breaks appearance.
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return children as any;
}