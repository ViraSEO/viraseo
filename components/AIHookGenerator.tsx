"use client";

import { useState } from "react";
import { checkAILimit } from "@/lib/aiLimit";

type Props = {
  title: string;
  setCopied: any;
};

export default function AIHookGenerator({ title, setCopied }: Props) {
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateHooks = async () => {

    if (!title.trim()) return;

const limit = checkAILimit(5);

if (!limit.allowed) {
  setHooks(["Daily AI limit reached. Try again tomorrow."]);
return;
}
    
    try {
      setLoading(true);

      

      const res = await fetch("/api/hook-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (res.ok) {
        setHooks(data.hooks || []);
      }
    } catch (error) {
      console.error("Hook error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "14px" }}>
      <button
        onClick={generateHooks}
        disabled={loading}
        style={{
          background: "linear-gradient(to right,#8b5cf6,#06b6d4)",
          border: "none",
          color: "white",
          padding: "10px 14px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "800",
        }}
      >
        {loading ? "Generating..." : "⚡ Generate Hooks"}
      </button>

      {hooks.length > 0 && (
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {hooks.map((hook, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "10px 12px",
                borderRadius: "14px",
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <span>{hook}</span>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(hook);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  borderRadius: "10px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}