"use client";

import GlassCard from "./GlassCard";

type Props = {
  lightMode: boolean;
  videosList: any[];
  hoveredScore: number | null;
  setHoveredScore: any;
  calculateSEOScore: any;
  getAverageAIScore: any;
};

export default function ChannelGrowth({
  lightMode,
  videosList,
  hoveredScore,
  setHoveredScore,
  calculateSEOScore,
  getAverageAIScore,
}: Props) {
  return (
    <GlassCard lightMode={lightMode}>
      <h2 style={{ fontSize: "42px", fontWeight: "900" }}>
        Channel Growth
      </h2>

      <p
        style={{
          marginTop: "10px",
          color: "#c4b5fd",
          fontWeight: "800",
          minHeight: "24px",
        }}
      >
        {hoveredScore !== null
          ? `AI Score: ${hoveredScore}`
          : "Hover chart bars to see AI score"}
      </p>

      <div
        style={{
          height: "260px",
          display: "flex",
          alignItems: "end",
          gap: "16px",
          marginTop: "30px",
        }}
      >
        {(videosList.length
          ? videosList.map(
              (video) =>
                calculateSEOScore(video?.snippet?.title || "") * 2
            )
          : [40, 80, 120, 90, 150]
        ).map((height, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              onMouseEnter={(e) => {
                setHoveredScore(Math.floor(height / 2));
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                setHoveredScore(null);
                e.currentTarget.style.transform = "translateY(0px)";
              }}
              style={{
  width: "100%",
  height: `${height}px`,
  borderRadius: "18px",
  background:
    "linear-gradient(180deg,#06b6d4 0%,#7c3aed 100%)",
  transition: "0.3s",
  cursor: "pointer",
  boxShadow: "0 0 24px rgba(124,58,237,0.35)",
  border: "1px solid rgba(255,255,255,0.12)",
}}
            />

            <p
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#94a3b8",
                fontWeight: "700",
              }}
            >
              {videosList[i]?.snippet?.title?.slice(0, 12) || `V${i + 1}`}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "14px",
          marginTop: "24px",
        }}
      >
        {[
          ["Best AI Score", getAverageAIScore()],
          ["Videos Analyzed", videosList.length],
          ["Growth Signal", "Strong"],
        ].map(([title, value]) => (
          <div
            key={String(title)}
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.22)",
              borderRadius: "18px",
              padding: "18px",
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: "13px" }}>
              {title}
            </p>

            <h3
              style={{
                marginTop: "8px",
                fontSize: "24px",
                fontWeight: "900",
              }}
            >
              {value}
            </h3>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}