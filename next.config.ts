import type { NextConfig } from "next";

// A nonce-based CSP (Next's documented App Router pattern) was tried and
// reverted: it requires every page that reads the nonce to opt out of
// static rendering, which would turn this project's ~20 statically
// generated pages into server-rendered-per-request ones — a real
// performance regression for a mostly-static content site, just to
// tighten one header. So script-src keeps 'unsafe-inline' here (this does
// not protect against inline-script injection, but it isn't this app's
// actual risk surface — there's no user-generated HTML rendered anywhere,
// and forms submit as fetch/JSON, not markup) while every other directive
// stays strict: no third-party script/style origins, no framing
// (frame-ancestors 'none', backed up by X-Frame-Options below), no
// <object>/<embed>, and form submissions confined to same-origin.
// React's dev mode uses eval() itself (to reconstruct stack traces for
// better error messages — "React will never use eval() in production
// mode", per its own warning) and Turbopack's dev server needs it for HMR,
// so 'unsafe-eval' is added only outside production. Verified by watching
// the browser console with/without it: without this, dev mode throws a
// real (if harmless) "eval() is not supported" error on every page load.
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Only meaningful once the site is actually served over HTTPS (e.g. on
  // Vercel), but harmless to send everywhere — browsers ignore it on plain
  // HTTP responses.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Removes the "X-Powered-By: Next.js" response header so the framework
  // and version aren't advertised to anyone probing the site.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
