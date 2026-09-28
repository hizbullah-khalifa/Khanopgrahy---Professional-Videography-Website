import { ImageResponse } from "next/og";

export const alt = "Khanography — cinematic film, photography and aerial work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Rendered at build time (statically optimised).
 * Uses system-safe fonts so no network fetch is required at build.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #05070b 0%, #0b101a 45%, #131a26 100%)",
          padding: "72px 80px",
          color: "#eef2f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              border: "2px solid #e9a23b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e9a23b",
              fontSize: 22,
            }}
          >
            ▶
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            Khanography
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: -2.6,
              maxWidth: 940,
            }}
          >
            I Capture Stories From Every Perspective.
          </div>
          <div style={{ fontSize: 26, color: "#aeb8c9", maxWidth: 880 }}>
            Videography · Photography · Video Editing · Drone Operator
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 26,
            fontSize: 22,
            color: "#7f8a9d",
          }}
        >
          <span>Asim Khan — Islamabad, Pakistan</span>
          <span style={{ color: "#e9a23b" }}>khanography.com</span>
        </div>
      </div>
    ),
    size,
  );
}
