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
   the build settings as-is.
5. **Set environment variables** (before clicking Deploy, in the same import screen, or
   later under Settings → Environment Variables — see `.env.example` for the full list with
   explanations). None are required for the site to build and deploy, but without them
   certain features silently degrade rather than break:
   - `DATABASE_URL` — without it, form submissions aren't durably saved (see "Database"
     below).
   - `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` — without both, `/admin` stays disabled (see
     "Admin dashboard" below).
   - `RESEND_API_KEY` + `NOTIFY_TO_EMAIL` — without them, nobody is emailed on a new
     submission (see "Receiving form submissions" below).
   - `NEXT_PUBLIC_SITE_URL` — without it, metadata/sitemap/structured data fall back to a
     placeholder domain instead of your real one. Set it to your Vercel URL now; update it
     if you attach a custom domain later (step 6).
   Click **Deploy**.
6. **That's it.** In about a minute you'll get a live URL like
   `tygcp-website.vercel.app`. Every time you push new commits to `main`, Vercel
   automatically redeploys.
7. **(Optional) Connect a custom domain.** In the Vercel project → Settings → Domains, add
   your domain (e.g. `tygcp.org`) and follow the DNS instructions shown. This works whether
   you bought the domain through Vercel or elsewhere (Namecheap, GoDaddy, etc). Remember to
   update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

## Receiving form submissions

The four public forms (contact, ask-the-minister questions, newsletter sign-ups, event RSVPs)
go through two independent channels, and either can be skipped without breaking the other:

1. **Saved to a database** — every valid submission is written to a real table (see
   "Database" below) and viewable at [`/admin`](#admin-dashboard). This works with zero
   configuration in local development; in production it needs `DATABASE_URL` set (see
   below), otherwise submissions are validated and logged to the function console but not
   durably stored.
2. **Emailed to you** (optional) — the easiest option is a free [Resend](https://resend.com)
   account:
   1. Sign up at resend.com (free tier covers small volumes easily).
   2. Get an API key from the Resend dashboard.
   3. In your Vercel project → Settings → Environment Variables, add:
      - `RESEND_API_KEY` — the key from step 2
      - `NOTIFY_TO_EMAIL` — the inbox that should receive submissions (e.g.
        `yigsil38@gmail.com`)
   4. Redeploy (Vercel → Deployments → ⋯ → Redeploy).

All four form handlers already call a shared `notify()` helper in `src/lib/notify.ts` for
email, and save via `src/lib/db.ts` for storage — no code changes needed for either. Without
`RESEND_API_KEY` set, email is silently skipped (not an error) and submissions still save to
the database and appear in `/admin`.

## Database

Local development needs no setup: submissions are stored in a SQLite file created
automatically at `prisma/dev.db` the first time you save one (via Node's built-in
`node:sqlite`, so there's nothing to install).

**Production (Vercel) needs a real `DATABASE_URL`.** Vercel's serverless filesystem is
ephemeral and mostly read-only, so the SQLite file approach does not work there — without a
`DATABASE_URL` pointed at a real database, submissions are still validated and (if Resend is
configured) emailed, but not durably saved, and `/admin` will always show empty lists. Any
Postgres works — Vercel Postgres, [Neon](https://neon.tech) and
[Supabase](https://supabase.com) all have generous free tiers. `prisma/schema.prisma` already
documents the four tables (`ContactSubmission`, `MinisterQuestion`, `NewsletterSubscriber`,
`RsvpSubmission`) as the authoritative schema for this — switching its `provider` line from
`sqlite` to `postgresql` and running `npx prisma generate && npx prisma migrate deploy`, then
swapping `src/lib/db.ts`'s internals for `@prisma/client` calls, is a same-shaped, mechanical
change (every function it exports keeps the same signature either way). See the comment at
the top of `src/lib/db.ts` for why this project ships a hand-written SQLite version of that
same schema rather than a generated Prisma client: the sandbox this was built in had no
network access to Prisma's binary host, so this was the only way to genuinely build and test
the whole submission pipeline end to end rather than claim an integration that was never run.

## Admin dashboard

A password-gated internal page at `/admin` lists every saved submission (contact messages,
minister questions, newsletter subscribers, event RSVPs) — read-only, newest first. It is not
linked from anywhere on the public site, is excluded from search indexing (`robots.txt` and a
`noindex` meta tag), and is server-rendered per request rather than statically built, so
nothing about it — or the data in it — can end up baked into a public HTML file.

**Setup:** set two environment variables (see `.env.example`):

- `ADMIN_PASSWORD` — the shared sign-in password. Generate one with `openssl rand -base64 24`.
- `ADMIN_SESSION_SECRET` — used to sign the session cookie. Generate one with
  `openssl rand -hex 32`.

Without both set, `/admin` shows a plain "not configured" message instead of a login form —
it fails closed, never open. Once configured, sign in at `/admin/login`; the session is a
signed cookie (HMAC over an expiry timestamp, `httpOnly`, `secure` in production) valid for
12 hours, and the login endpoint is rate-limited (5 attempts/minute/IP) against password
guessing.

**Deliberate scope decision:** this is one shared password for the whole team, not
per-person accounts, roles or permissions, and it's read-only (no editing or deleting
submissions from the UI yet — use a database client against the same table for that). That's
enough to keep submission data private while a small team needs to see it, not a substitute
for real auth. If YIGSIL grows past "everyone shares one password," the natural next step is
swapping this for [NextAuth.js](https://authjs.dev) (or Vercel's own Postgres + Auth stack)
with per-user accounts and roles — `src/lib/adminAuth.ts` is the one file that would change;
nothing else references it directly except the two API routes and `/admin`'s own page.

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

This is about editing *content* (episodes, news, events…) — a separate concern from the
`/admin` submissions dashboard described above, which shows form responses and can't edit
content. The original proposal recommended WordPress specifically so non-technical staff
could publish episodes and news without a developer. This site uses simple data files
instead (faster and free to build, but updates currently need a small code edit). If YIGSIL
later wants a real login-based dashboard for staff to edit content, the cleanest upgrade path
is a free headless CMS such as [Sanity](https://sanity.io) — it can be added without
rebuilding the site, since each page already reads its content from one central place
(`src/data/`).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- SQLite locally (Node's built-in `node:sqlite`, zero install) / Postgres in production — see
  "Database" above. No paid services are required to run the site locally; email (Resend) and
  a production database are both optional-but-recommended for a real deployment.

## Project structure

```
src/
  app/            Pages (one folder per route) and API routes under app/api/
                    admin/        Password-gated submissions dashboard (see "Admin dashboard")
  components/     Shared UI (Header, Footer, cards, forms, PodcastPlayer, etc.)
  data/           All editable content
  lib/            Small helpers — notify.ts (email), db.ts (submission storage),
                    adminAuth.ts (admin session/login), validation.ts, rateLimit.ts, utils.ts
prisma/
  schema.prisma   Authoritative DB schema (see "Database" above)
```
