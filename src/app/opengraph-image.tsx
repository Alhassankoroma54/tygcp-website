import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

// A branded, text-only share card built from real site copy (name + org +
// tagline) — no fabricated photos, logos, or people. Regenerated at build
// time; nothing here needs a runtime API call.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1c33 0%, #0f2440 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "9999px",
              border: "3px solid #22c55e",
              color: "#22c55e",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            YIGSIL
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
          }}
        >
          <div style={{ fontSize: "56px", fontWeight: 800, color: "#ffffff", lineHeight: 1.15 }}>
            {site.name}
          </div>
          <div style={{ fontSize: "30px", fontWeight: 600, color: "#7dd3a8", marginTop: "20px" }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.7)", marginTop: "24px" }}>
            {site.org}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
