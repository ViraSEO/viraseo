"use client";

import { useState } from "react";
import { checkAILimit } from "@/lib/aiLimit";

type Props = {
  lightMode: boolean;
};

export default function AIChannelAudit({ lightMode }: Props) {
  const [channelInput, setChannelInput] = useState("");
  const [audit, setAudit] = useState("");

  return (
    <div
      style={{
        height: "100%",
        minHeight: "360px",
        display: "flex",
        flexDirection: "column",
        background: lightMode
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "22px",
        padding: "26px",
      }}
    >
      <div>
        <h2 style={{ fontSize: "28px", fontWeight: "900" }}>
          AI Channel Audit
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: lightMode ? "#475569" : "#94a3b8",
          }}
        >
          Analyze any YouTube channel and get recommendations.
        </p>
      </div>

      <div style={{ marginTop: "auto" }}>
        <input
          value={channelInput}
          onChange={(e) => setChannelInput(e.target.value)}
          placeholder="Channel name, @handle or Shorts link..."
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
          onClick={async () => {

const limit = checkAILimit(5);

if (!limit.allowed) {
  setAudit("Daily AI limit reached.");
  return;
}

            if (!channelInput) return;

            setAudit("AI auditing channel...");

            try {
              const competitorRes = await fetch("/api/youtube/competitor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: channelInput }),
              });

              const competitorData = await competitorRes.json();

              if (competitorData.error) {
                setAudit("Channel not found.");
                return;
              }

              const titles = competitorData.videos
                .map((video: any) => video?.snippet?.title)
                .filter(Boolean)
                .join("\n");

              const aiRes = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  question: `
ONLY output bullet points.
Maximum 6 bullet points.
Each bullet maximum 10 words.
Reply in the same language as the user input.

Audit this YouTube channel based on recent titles.
Focus on SEO, CTR, thumbnails, viral hooks and consistency.

Channel:
${competitorData.channel?.title}

Recent titles:
${titles}
`,
                }),
              });

              const aiData = await aiRes.json();
              setAudit(aiData.answer);
            } catch {
              setAudit("AI audit failed.");
            }
          }}
          style={{
            marginTop: "16px",
            background: "linear-gradient(to right,#22c55e,#06b6d4)",
            border: "none",
            color: "white",
            padding: "16px 24px",
            borderRadius: "18px",
            cursor: "pointer",
            fontWeight: "800",
            width: "100%",
          }}
        >
          Audit Channel
        </button>
      </div>

      {audit && (
        <div
          style={{
            marginTop: "18px",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.22)",
            padding: "20px",
            borderRadius: "18px",
            lineHeight: 1.7,
            fontWeight: "700",
          }}
        >
          📊 {audit}
        </div>
      )}
    </div>
  );
}