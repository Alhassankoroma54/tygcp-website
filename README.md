# The Youth Governance Circle Podcast — Website

A dynamic, mobile-first website for **The Youth Governance Circle Podcast (TYGCP)** by
**Youth in Governance Advocacy Organisation SL (YIGSIL)** — built with Next.js, TypeScript
and Tailwind CSS, and designed to deploy on [Vercel](https://vercel.com) for free.

Built from the two planning documents in the `youth` folder (the podcast project proposal
and the website framework & budget proposal) and the homepage mockup image.

## What's included

- 17 pages: Home, About, Episodes (with filterable archive + detail pages), Governance
  Topics, Policy Made Simple, Youth Voices, Ask the Minister, Fact or Fiction, Young
  Changemakers, Events & Dialogues (with RSVP), District Voices, Impact, Resources,
  Partners & Sponsors, Get Involved, News (with detail pages), Contact, Policies.
- Animated impact counters, episode/news cards, event RSVP, contact/question/newsletter
  forms — all matching the dark navy + green brand from the homepage mockup.
- All working forms post to serverless API routes (`/api/contact`, `/api/question`,
  `/api/newsletter`, `/api/rsvp`). See **Receiving form submissions** below.
- All content (episodes, news, events, partners, impact stats, etc.) lives in plain
  TypeScript/JSON-like files under `src/data/` — no database required. Sample/placeholder
  data is included so the site looks complete immediately; replace it with real content
  whenever it's ready.

## Running it locally

You'll need [Node.js](https://nodejs.org) 20 or newer installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Deploying to Vercel (step by step)

Vercel is made by the team behind Next.js, so deployment is effectively zero-config.
Hosting on Vercel's free "Hobby" tier costs nothing — you only pay if you outgrow the free
tier or want a custom domain through Vercel itself (you can also point a domain you buy
elsewhere at your free Vercel site).

1. **Create a GitHub repository.** Go to [github.com/new](https://github.com/new), create
   a new **empty** repository (don't add a README/gitignore), and note its URL — it'll look
   like `https://github.com/<your-username>/tygcp-website.git`.
2. **Push this project to it.** In a terminal, inside this project folder:
   ```bash
   git remote add origin https://github.com/<your-username>/tygcp-website.git
   git branch -M main
   git add -A
   git commit -m "Initial TYGCP website"
   git push -u origin main
   ```
   (If `git` isn't installed, download it from [git-scm.com](https://git-scm.com), or use
   GitHub Desktop as a point-and-click alternative.)
3. **Create a Vercel account** at [vercel.com/signup](https://vercel.com/signup) — the
   fastest way is "Continue with GitHub", which also connects the two accounts.
4. **Import the project.** From the Vercel dashboard, click **Add New → Project**, select
   the `tygcp-website` repository, and click **Import**. Vercel auto-detects Next.js — leave
   the build settings as-is and click **Deploy**.
5. **That's it.** In about a minute you'll get a live URL like
   `tygcp-website.vercel.app`. Every time you push new commits to `main`, Vercel
   automatically redeploys.
6. **(Optional) Connect a custom domain.** In the Vercel project → Settings → Domains, add
   your domain (e.g. `tygcp.org`) and follow the DNS instructions shown. This works whether
   you bought the domain through Vercel or elsewhere (Namecheap, GoDaddy, etc).

## Receiving form submissions

Vercel's serverless functions don't have a persistent filesystem or database, so out of the
box, form submissions (contact, questions, newsletter sign-ups, event RSVPs) are only logged
to the function's console (visible under your Vercel project → the deployment → Functions →
Logs) — nobody gets notified automatically yet.

To have them emailed to you, the easiest option is a free [Resend](https://resend.com)
account:

1. Sign up at resend.com (free tier covers small volumes easily).
2. Get an API key from the Resend dashboard.
3. In your Vercel project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` — the key from step 2
   - `NOTIFY_TO_EMAIL` — the inbox that should receive submissions (e.g.
     `yigsil38@gmail.com`)
4. Redeploy (Vercel → Deployments → ⋯ → Redeploy).

All four form handlers already call a shared `notify()` helper in `src/lib/notify.ts` that
picks this up automatically — no code changes needed. See the comments in that file for
alternatives (Formspree, a Google Sheet, a database).

## Updating content

Everything editable lives under `src/data/`, in plain readable files:

| File | Controls |
|---|---|
| `episodes.ts` | Episode archive |
| `news.ts` | News posts |
| `events.ts` | Events & Dialogues, RSVP |
| `partners.ts` | Partner logos/list and sponsorship packages |
| `impact.ts` | Homepage/impact stat counters and results framework |
| `topics.ts` | Governance topics and signature series |
| `voices.ts` | Youth Voices, District Voices, Young Changemakers, Fact or Fiction, Policy Made Simple |
| `about.ts` | About page content, team roles |
| `resources.ts` | Downloadable resources, editorial/safeguarding/privacy policy text |
| `site.ts` | Site name, nav menus, contact details, social links |

Edit a file, save, then either run `npm run dev` to preview locally, or commit and push to
`main` — Vercel redeploys automatically. No developer is strictly required for this kind of
change, though editing TypeScript files is more technical than a CMS dashboard would be
(see below).

**About the placeholder content:** episode guests, sample quotes, partner names and similar
details are realistic placeholders, not real people or organisations — swap them for the
real thing before launch.

### Adding a content dashboard later (optional)

The original proposal recommended WordPress specifically so non-technical staff could
publish episodes and news without a developer. This site uses simple data files instead
(faster and free to build, but updates currently need a small code edit). If YIGSIL later
wants a real login-based dashboard for staff, the cleanest upgrade path is a free headless
CMS such as [Sanity](https://sanity.io) — it can be added without rebuilding the site, since
each page already reads its content from one central place (`src/data/`).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- Zero external runtime dependencies beyond React/Next — no database, no paid services
  required to run

## Project structure

```
src/
  app/            Pages (one folder per route) and API routes under app/api/
  components/     Shared UI (Header, Footer, cards, forms, etc.)
  data/           All editable content
  lib/            Small helpers (notify.ts, utils.ts)
```
