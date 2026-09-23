# Hero slideshow images

The homepage hero background is a 5-image crossfade slideshow (see
`src/components/HeroSlideshow.tsx` and `src/data/heroSlideshow.ts`).

## ⚠️ Licensing status: unverified — do not deploy without checking

The five files currently in this folder (`hero-1.jpg` – `hero-5.jpg`) were supplied
directly by the site owner, who confirmed their **source and license are not known**
(found online, origin not tracked). They are **not** confirmed to be licensed for
reuse on this website, and they are **not** photographs of Sierra Leone, TYGCP, or
YIGSIL specifically — they are generic podcast/broadcast-studio stock-style imagery
used as atmospheric imagery at the site owner's request.

**Before this site is deployed publicly, each image's rights holder and license
should be confirmed** (or the image replaced with one that is). Using a photograph
without confirming reuse permission risks copyright infringement. See the table
below for exactly what is — and isn't — known about each file.

## Provenance

| Image | Original source | Photographer/organization | Source page | Licence/permission basis | Attribution required? | Date accessed |
| --- | --- | --- | --- | --- | --- | --- |
| `hero-1.jpg` | Unknown — supplied by site owner, found online | Unknown | Not provided | **Not verified** — owner confirmed license/source unknown | Unknown (assume yes until confirmed otherwise) | 2026-09-23 |
| `hero-2.jpg` | Unknown — supplied by site owner, found online | Unknown | Not provided | **Not verified** — owner confirmed license/source unknown | Unknown (assume yes until confirmed otherwise) | 2026-09-23 |
| `hero-3.jpg` | Unknown — supplied by site owner, found online | Unknown | Not provided | **Not verified** — owner confirmed license/source unknown | Unknown (assume yes until confirmed otherwise) | 2026-09-23 |
| `hero-4.jpg` | Unknown — supplied by site owner, found online | Unknown | Not provided | **Not verified** — owner confirmed license/source unknown | Unknown (assume yes until confirmed otherwise) | 2026-09-23 |
| `hero-5.jpg` | Unknown — supplied by site owner, found online | Unknown | Not provided | **Not verified** — owner confirmed license/source unknown | Unknown (assume yes until confirmed otherwise) | 2026-09-23 |

"Date accessed" is the date these files were placed in this repository, not the date
they were originally found online — that date is unknown.

## Content-integrity note

These photos do not depict any real TYGCP/YIGSIL person, guest, minister, staff
member, partner, or event, and nothing on the live site should imply otherwise (no
caption, name, or claim about any of them appears anywhere in the codebase — see the
deliberately empty `alt` text in `src/data/heroSlideshow.ts`).

## Replacing these files

Replace each file below **in place, keeping the exact same filename** — no code
changes are needed, since `src/data/heroSlideshow.ts` references these five paths by
name:

| File | Suggested real-world theme |
| --- | --- |
| `hero-1.jpg` | Young Sierra Leoneans participating in a civic/governance discussion |
| `hero-2.jpg` | A professional podcast/studio conversation |
| `hero-3.jpg` | Youth leadership and public dialogue |
| `hero-4.jpg` | Community or youth engagement |
| `hero-5.jpg` | Governance, civic participation, or institutional dialogue in Sierra Leone |

When you do replace a file, please fill in its row in the provenance table above with
real, verifiable information (original source URL, photographer/organization, the
page you found it on, and the specific license or permission it's used under) rather
than leaving it as "unknown."

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
  by every visitor.
- **Content-integrity reminder** (carried over from the rest of this
  project's content rules): only use photographs your organization has the
  rights to publish, and only ones that genuinely show what you're
  presenting them as. Don't caption or imply a specific real event, guest,
  minister, or partner unless that's genuinely who/what is pictured.

## Adding more, or fewer, than five

`src/data/heroSlideshow.ts` is a plain array — add or remove entries and the
slideshow adjusts automatically (it doesn't assume exactly 5 anywhere in the
component logic, even though 5 is what's configured today).
