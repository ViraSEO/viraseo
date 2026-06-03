"use client";

import { useState } from "react";
import { checkAILimit } from "@/lib/aiLimit";

export default function ShortsViralPredictor({
  lightMode,
}: {
  lightMode: boolean;
}) {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
  if (!idea.trim()) return;

  const limit = checkAILimit(5);

  if (!limit.allowed) {
    setResult({
  viralChance: "LIMIT",
  shortsPotential: 0,
  bestLength: "-",
  hookStyle: "-",
  retentionPrediction: "Daily AI limit reached.",
  swipeRisk: "-",
  firstSentence: "Try again tomorrow.",
  improvement: "Upgrade plan for more AI credits.",
});
return;
  }

  setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/shorts-predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();
      if (res.ok) setResult(data);
    } catch {
      console.error("Shorts predictor failed");
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
        boxShadow: "0 10px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(20px)",
      }}
    >
      <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
        Shorts Viral Predictor
      </h2>

      <p
        style={{
          marginTop: "10px",
          color: lightMode ? "#475569" : "#94a3b8",
        }}
      >
        Predict Shorts potential before creating the video.
      </p>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "14px",
          alignItems: "center",
        }}
      >
        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Write your Shorts idea..."
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
          onClick={predict}
          disabled={loading}
          style={{
            background: "linear-gradient(to right,#7c3aed,#06b6d4)",
            border: "none",
            color: "white",
            padding: "16px 24px",
            borderRadius: "18px",
            cursor: "pointer",
            fontWeight: "800",
            whiteSpace: "nowrap",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Predicting..." : "🔥 Predict"}
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "24px",
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.22)",
            padding: "24px",
            borderRadius: "22px",
          }}
        >
          <h3 style={{ fontSize: "28px", fontWeight: "900" }}>
            🔥 {result.viralChance} — {result.shortsPotential}/100
          </h3>

          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "14px",
            }}
          >
            <Mini label="Best Length" value={result.bestLength} />
            <Mini label="Hook Style" value={result.hookStyle} />
            <Mini label="Retention" value={result.retentionPrediction} />
            <Mini label="Swipe Risk" value={result.swipeRisk} />
          </div>

          <div
            style={{
              marginTop: "18px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "18px",
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: "13px" }}>
              Best First Sentence
            </p>

            <h4
              style={{
                marginTop: "8px",
                fontSize: "22px",
                fontWeight: "900",
              }}
            >
              “{result.firstSentence}”
            </h4>

            <p style={{ marginTop: "10px", color: "#94a3b8" }}>
              Improve: {result.improvement}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "14px",
      }}
    >
      <p style={{ color: "#94a3b8", fontSize: "13px" }}>
        {label}
      </p>

      <h4
        style={{
          marginTop: "6px",
          fontSize: "17px",
          fontWeight: "900",
        }}
      >
        {value}
      </h4>
    </div>
  );
}