"use client";

import { useState } from "react";
import { checkAILimit } from "@/lib/aiLimit";

export default function ViralTopicHunter({
  lightMode,
}: {
  lightMode: boolean;
}) {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);

  const generateIdeas = async () => {
  if (!niche.trim()) return;

  const limit = checkAILimit(5);

  if (!limit.allowed) {
    setIdeas([
  {
    title: "Daily AI limit reached.",
    trendScore: 0,
    competition: "Limit",
    hook: "Try again tomorrow.",
  },
]);
return;
  }

  setLoading(true);
    setIdeas([]);

    try {
      const res = await fetch("/api/topic-hunter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche }),
      });

      const data = await res.json();

      if (data?.ideas) {
        setIdeas(data.ideas);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        background:
          "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.9))",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "30px",
        padding: "40px",
      }}
    >
      <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
        Viral Topic Hunter
      </h2>

      <p
        style={{
          marginTop: "10px",
          color: lightMode ? "#475569" : "#94a3b8",
        }}
      >
        Discover viral YouTube topics with AI.
      </p>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "14px",
        }}
      >
        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Enter niche..."
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: lightMode
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.05)",
            color: lightMode ? "#0f172a" : "white",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={generateIdeas}
          disabled={loading}
          style={{
            background:
              "linear-gradient(to right,#22c55e,#06b6d4)",
            border: "none",
            color: "white",
            padding: "16px 24px",
            borderRadius: "18px",
            cursor: "pointer",
            fontWeight: "800",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Generating..." : "🔥 Find Topics"}
        </button>
      </div>

      {ideas.length > 0 && (
        <div
          style={{
            marginTop: "26px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "18px",
          }}
        >
          {ideas.map((idea, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "22px",
                padding: "22px",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "900",
                }}
              >
                🔥 {idea.title}
              </h3>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    background:
                      "rgba(34,197,94,0.15)",
                    color: "#22c55e",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    fontWeight: "800",
                    fontSize: "13px",
                  }}
                >
                  Trend {idea.trendScore}/100
                </div>

                <div
                  style={{
                    background:
                      "rgba(124,58,237,0.15)",
                    color: "#a78bfa",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    fontWeight: "800",
                    fontSize: "13px",
                  }}
                >
                  {idea.competition}
                </div>
              </div>

              <p
                style={{
                  marginTop: "18px",
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                }}
              >
                🎯 {idea.hook}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}