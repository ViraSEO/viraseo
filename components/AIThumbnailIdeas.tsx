"use client";

import { useState } from "react";
import { checkAILimit } from "@/lib/aiLimit";

type Props = {
  lightMode: boolean;
};

export default function AIThumbnailIdeas({ lightMode }: Props) {
  const [title, setTitle] = useState("");
  const [ideas, setIdeas] = useState("");

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
          AI Thumbnail Ideas
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: lightMode ? "#475569" : "#94a3b8",
          }}
        >
          Generate high-CTR thumbnail ideas for your video.
        </p>
      </div>

      <div style={{ marginTop: "auto" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your video title..."
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
  setIdeas("Daily AI limit reached.");
  return;
}
            
            if (!title) return;

            setIdeas("AI generating thumbnail ideas...");

            try {
              const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  question: `
IMPORTANT:
- Reply ONLY in the SAME language as the title.
- Maximum 3 short bullet points.
- Each bullet maximum 8 words.
- No intro.
- No explanation.
- No long text.

Video title:
${title}
`,
                }),
              });

              const data = await res.json();
              setIdeas(data.answer);
            } catch {
              setIdeas("AI thumbnail idea failed.");
            }
          }}
          style={{
            marginTop: "16px",
            background: "linear-gradient(to right,#ef4444,#f97316)",
            border: "none",
            color: "white",
            padding: "16px 24px",
            borderRadius: "18px",
            cursor: "pointer",
            fontWeight: "800",
            width: "100%",
          }}
        >
          Generate Ideas
        </button>
      </div>

      {ideas && (
        <div
          style={{
            marginTop: "18px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.22)",
            padding: "20px",
            borderRadius: "18px",
            lineHeight: 1.7,
            fontWeight: "700",
          }}
        >
          🎨 {ideas}
        </div>
      )}
    </div>
  );
}