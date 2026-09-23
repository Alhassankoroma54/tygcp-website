/**
 * Prisma ORM 7 config file — replaces the `url` / `directUrl` fields that
 * used to live directly in prisma/schema.prisma's `datasource` block
 * (removed in Prisma 7; see the comment above that block for the full
 * history of this change).
 *
 * This file is read by the Prisma CLI only — `prisma generate`, `prisma
 * migrate`, `prisma validate`, `prisma studio`, etc. It has no effect on
 * the running application; the app never imports this file. See
 * src/lib/db.ts for how the running app connects at runtime instead (a
 * driver adapter constructed from DATABASE_URL, the pooled connection).
 *
 * CLI operations — most importantly `prisma migrate` — deliberately use
 * DIRECT_URL (the unpooled connection string), not DATABASE_URL, because
 * Neon's pooled endpoint (like most PgBouncer-style poolers) does not
 * support the session-level protocol migrations need. This mirrors the
 * pooled-vs-direct reasoning already documented in schema.prisma and
 * .env.example — nothing about *why* two connection strings exist has
 * changed, only *where Prisma reads them from*.
 *
 * dotenv is loaded explicitly (and twice, deliberately) because Prisma 7's
 * CLI no longer auto-loads any .env file the way earlier versions did, and
 * this project follows Next.js's own env-file convention: `.env` for
 * defaults, `.env.local` (gitignored, real values) taking priority over it.
 * A plain `import "dotenv/config"` only loads `.env`, which would silently
 * miss every value developers actually put in `.env.local`.
 */
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

loadEnv({ path: path.resolve(__dirname, ".env") });
loadEnv({ path: path.resolve(__dirname, ".env.local"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
