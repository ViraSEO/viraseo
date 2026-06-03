"use client";
import { checkAILimit } from "@/lib/aiLimit";
type Props = {
  lightMode: boolean;
  aiQuestion: string;
  setAiQuestion: any;
  aiAnswer: string;
  setAiAnswer: any;
};

export default function AIAssistant({
  lightMode,
  aiQuestion,
  setAiQuestion,
  aiAnswer,
  setAiAnswer,
}: Props) {
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
          AI Creator Assistant
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: lightMode ? "#475569" : "#94a3b8",
          }}
        >
          Ask AI anything about YouTube growth.
        </p>
      </div>

      <div style={{ marginTop: "auto" }}>
        <input
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          placeholder="Ask AI..."
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
  setAiAnswer("Daily AI limit reached.");
  return;
}

            if (!aiQuestion) return;

            setAiAnswer("AI düşünüyor...");

            try {
              const res = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  question: aiQuestion,
                }),
              });

              const data = await res.json();
              setAiAnswer(data.answer);
            } catch {
              setAiAnswer("AI bağlantı hatası.");
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
          Ask AI
        </button>
      </div>

      {aiAnswer && (
        <div
          style={{
            marginTop: "18px",
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.22)",
            padding: "20px",
            borderRadius: "18px",
            lineHeight: 1.7,
          }}
        >
          🤖 {aiAnswer}
        </div>
      )}
    </div>
  );
}