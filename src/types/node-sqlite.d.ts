/**
 * Minimal ambient typings for Node's built-in `node:sqlite` module.
 *
 * `node:sqlite` shipped as experimental in Node 22.5 and is used by
 * src/lib/db.ts as a zero-dependency local persistence layer (see that
 * file's header comment for the full rationale). The project's installed
 * `@types/node` major version (^20, matching Next.js' own baseline) predates
 * this module, so TypeScript can't resolve it without a declaration here.
 * This covers only the surface area src/lib/db.ts actually calls — it is
 * not a complete typing of the module.
 */
declare module "node:sqlite" {
  export interface StatementResultingChanges {
    changes: number | bigint;
    lastInsertRowid: number | bigint;
  }

  export class StatementSync {
    run(params?: Record<string, unknown>): StatementResultingChanges;
    get(params?: Record<string, unknown>): Record<string, unknown> | undefined;
    all(params?: Record<string, unknown>): Record<string, unknown>[];
  }

  export class DatabaseSync {
    constructor(path: string, options?: Record<string, unknown>);
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
