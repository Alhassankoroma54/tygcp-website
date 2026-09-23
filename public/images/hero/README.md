# Hero slideshow images — replace these five files

The homepage hero background is a 5-image crossfade slideshow (see
`src/components/HeroSlideshow.tsx` and `src/data/heroSlideshow.ts`). The five
files in this folder right now are **placeholders only** — original,
clearly-labelled graphics generated for this repository, not photographs, and
not depictions of any real TYGCP/YIGSIL person, event, or session. No genuine
organizational photographs existed in the repository at the time this
slideshow was built, so these placeholders exist specifically so the
architecture works end to end without anyone mistaking a random stock photo
for a real TYGCP guest, minister, staff member, partner, or event.

## What to do

Replace each file below **in place, keeping the exact same filename** — no
code changes are needed when you do this, since `src/data/heroSlideshow.ts`
references these five paths by name:

| File | Suggested real-world theme |
| --- | --- |
| `hero-1.jpg` | Young Sierra Leoneans participating in a civic/governance discussion |
| `hero-2.jpg` | A professional podcast/studio conversation |
| `hero-3.jpg` | Youth leadership and public dialogue |
| `hero-4.jpg` | Community or youth engagement |
| `hero-5.jpg` | Governance, civic participation, or institutional dialogue in Sierra Leone |

These themes are suggestions to guide which five photos you pick — they are
not a requirement that each slide depict something specific, and the theme
labels shown in the placeholder images themselves are not committed anywhere
else in the codebase (no caption, name, or claim about any of them appears on
the live site).

## Image specs

- **Format:** `.jpg` (or replace with `.webp`/`.avif` and update the `src`
  extensions in `src/data/heroSlideshow.ts` — the slideshow component itself
  doesn't care which raster format you use).
- **Dimensions:** 1920×1080 (16:9) works well for a full-bleed hero
  background at any viewport width. A different aspect ratio will still
  render correctly (the component uses `object-fit: cover`), but very tall
  or very narrow source images may crop awkwardly on some screens — 16:9 or
  wider is safest.
- **File size:** keep each under ~300KB if you can (compress/export at
  ~80% JPEG quality, or use WebP). These are hero background images loaded
  by every visitor; the current placeholders are all under 100KB.
- **Content-integrity reminder** (carried over from the rest of this
  project's content rules): only use photographs your organization has the
  rights to publish, and only ones that genuinely show what you're
  presenting them as. Don't caption or imply a specific real event, guest,
  minister, or partner unless that's genuinely who/what is pictured.

## Adding more, or fewer, than five

`src/data/heroSlideshow.ts` is a plain array — add or remove entries and the
slideshow adjusts automatically (it doesn't assume exactly 5 anywhere in the
component logic, even though 5 is what's configured today).
