"use client";

import GlassCard from "./GlassCard";

type Props = {
  lightMode: boolean;
  getTopKeywords: any;
};

export default function TopKeywords({
  lightMode,
  getTopKeywords,
}: Props) {
  const keywords = getTopKeywords();

  return (
    <GlassCard lightMode={lightMode}>
      <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
        Top Keywords
      </h2>

      <p
        style={{
          marginTop: "10px",
          color: lightMode ? "#475569" : "#94a3b8",
        }}
      >
        Most repeated keywords from your recent videos.
      </p>

      <div
        style={{
          marginTop: "26px",
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        {keywords.length ? (
          keywords.map(([word, count]: [string, number], i: number) => (
            <div
              key={word}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(6,182,212,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 16px",
                borderRadius: "999px",
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.12))",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "0.3s",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#7c3aed,#06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "900",
                }}
              >
                {i + 1}
              </span>

              <strong style={{ fontSize: "15px" }}>
                #{word}
              </strong>

              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  fontWeight: "800",
                }}
              >
                {count}x
              </span>
            </div>
          ))
        ) : (
          <p style={{ color: "#94a3b8" }}>
            No keywords found yet.
          </p>
        )}
      </div>
    </GlassCard>
  );
}