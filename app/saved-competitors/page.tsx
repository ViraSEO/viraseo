"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSavedItems, deleteSavedItem } from "@/lib/saveHistory";

export default function SavedCompetitorsPage() {
  const { data: session } = useSession();
  const [competitors, setCompetitors] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.email) return;

      const data = await getSavedItems(session.user.email);

      setCompetitors(
        data.filter((item: any) => item.type === "competitor")
      );
    };

    load();
  }, [session]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617 0%,#030b1f 100%)",
        color: "white",
        padding: "40px",
      }}
    >
      <a
        href="/dashboard"
        style={{
          display: "inline-block",
          marginBottom: "30px",
          padding: "12px 18px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        ← Back to Dashboard
      </a>

      <h1
        style={{
          fontSize: "56px",
          fontWeight: "900",
          marginBottom: "12px",
        }}
      >
        Saved Competitors
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "40px",
        }}
      >
        Your saved competitor library.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(550px,1fr))",
          gap: "20px",
        }}
      >
        {competitors.map((item) => (
          <div
            key={item.id}
            style={{
              background:
                "linear-gradient(135deg,#0f172a,#1e293b)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "24px",
              boxShadow:
                "0 0 40px rgba(0,0,0,0.25)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "900",
                marginBottom: "10px",
              }}
            >
              👥 {item.title}
            </h2>

            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                padding: "18px",
                maxHeight: "260px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
              }}
            >
              {item.content}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "18px",
              }}
            >
              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.content);
                  alert("Copied!");
                }}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "800",
                }}
              >
                📋 Copy
              </button>

              <button
                onClick={async () => {
                  const ok = await deleteSavedItem(item.id);

                  if (ok) {
                    setCompetitors((prev) =>
                      prev.filter(
                        (x) => x.id !== item.id
                      )
                    );
                  }
                }}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "800",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}