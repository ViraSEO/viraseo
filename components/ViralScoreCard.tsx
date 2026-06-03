"use client";

import { useEffect, useState } from "react";

type Props = {
  videoId: string;
  title: string;
  description?: string;
};

type Score = {
  viralScore: number;
  ctrScore: number;
  seoScore: number;
  hookScore: number;
  thumbnailScore: number;
  engagementScore?: number;
  momentumScore?: number;
  level: string;
  summary: string;
  improvement: string;
};

export default function ViralScoreCard({
  videoId,
  title,
  description = "",
}: Props) {
  const [score, setScore] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    const cached = localStorage.getItem(`viral-score-${videoId}`);

    if (cached) {
      setScore(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const analyze = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/viral-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId,
            title,
            description,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setScore(data);
          localStorage.setItem(
            `viral-score-${videoId}`,
            JSON.stringify(data)
          );
        }
      } catch (err) {
        console.error("Viral badge error:", err);
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [videoId, title, description]);

  const color =
    !score ? "#64748b" :
    score.viralScore >= 85 ? "#22c55e" :
    score.viralScore >= 70 ? "#84cc16" :
    score.viralScore >= 50 ? "#f59e0b" :
    "#ef4444";

  if (loading) {
    return (
      <div
        style={{
          marginTop: "12px",
          display: "inline-flex",
          padding: "8px 12px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.06)",
          color: "#94a3b8",
          fontWeight: "800",
          fontSize: "13px",
        }}
      >
        🔥 Calculating...
      </div>
    );
  }

  if (!score) {
    return null;
  }

  return (
    <div style={{ marginTop: "12px" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 14px",
          borderRadius: "999px",
          background: `${color}22`,
          border: `1px solid ${color}55`,
          color,
          fontWeight: "900",
          fontSize: "14px",
          cursor: "pointer",
          boxShadow: `0 0 22px ${color}33`,
        }}
      >
        🔥 {score.viralScore} Viral
        <span style={{ color: "#cbd5e1", fontSize: "12px" }}>
          {score.level}
        </span>
      </div>

      {open && (
        <div
          style={{
            marginTop: "12px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            padding: "16px",
            maxWidth: "340px",
          }}
        >
          <ScoreLine label="CTR" value={score.ctrScore} />
          <ScoreLine label="SEO" value={score.seoScore} />
          <ScoreLine label="Hook" value={score.hookScore} />
          <ScoreLine label="Thumbnail" value={score.thumbnailScore} />

          {score.momentumScore !== undefined && (
            <ScoreLine label="Momentum" value={score.momentumScore} />
          )}

          {score.engagementScore !== undefined && (
            <ScoreLine label="Engagement" value={score.engagementScore} />
          )}

          <p style={{ marginTop: "12px", color: "#cbd5e1", fontSize: "13px" }}>
            <b>Summary:</b> {score.summary}
          </p>

          <p style={{ marginTop: "6px", color: "#94a3b8", fontSize: "13px" }}>
            <b>Improve:</b> {score.improvement}
          </p>

          <button
            onClick={() => {
              localStorage.removeItem(`viral-score-${videoId}`);
              window.location.reload();
            }}
            style={{
              marginTop: "12px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "800",
            }}
          >
            Recalculate
          </button>
        </div>
      )}
    </div>
  );
}

function ScoreLine({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#cbd5e1",
          fontSize: "13px",
          marginBottom: "5px",
        }}
      >
        <span>{label}</span>
        <b>{value}</b>
      </div>

      <div
        style={{
          height: "7px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: "linear-gradient(to right,#7c3aed,#06b6d4)",
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  );
}