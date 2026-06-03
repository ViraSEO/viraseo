"use client";
import { checkAILimit } from "@/lib/aiLimit";
import { useState } from "react";

type Props = {
  lightMode: boolean;
};

export default function AITitleRewrite({ lightMode }: Props) {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");

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
          AI Title Rewrite
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: lightMode ? "#475569" : "#94a3b8",
          }}
        >
          Rewrite your titles with AI for higher CTR and SEO.
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
  setResult("Daily AI limit reached. Try again tomorrow.");
  return;
}
            if (!title) return;

            setResult("AI rewriting...");

            try {
              const res = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  question:
                    "Rewrite this YouTube title to make it more viral and SEO optimized: " +
                    title,
                }),
              });

              const data = await res.json();
              setResult(data.answer);
            } catch {
              setResult("AI rewrite failed.");
            }
          }}
          style={{
            marginTop: "16px",
            background: "linear-gradient(to right,#7c3aed,#06b6d4)",
            border: "none",
            color: "white",
            padding: "16px 24px",
            borderRadius: "18px",
            cursor: "pointer",
            fontWeight: "800",
            width: "100%",
          }}
        >
          Rewrite Title
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "18px",
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.22)",
            padding: "20px",
            borderRadius: "18px",
            lineHeight: 1.7,
            fontWeight: "700",
          }}
        >
          ✨ {result}
        </div>
      )}
    </div>
  );
}