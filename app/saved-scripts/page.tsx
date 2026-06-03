"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSavedItems } from "@/lib/saveHistory";
import { supabase } from "@/lib/supabase";

export default function SavedScriptsPage() {
  const { data: session } = useSession();
  const [scripts, setScripts] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadScripts = async () => {
    if (!session?.user?.email) return;

    const data = await getSavedItems(session.user.email);
    setScripts(data.filter((item: any) => item.type === "script"));
  };

  useEffect(() => {
    loadScripts();
  }, [session]);

  const copyScript = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const deleteScript = async (id: string) => {
    const confirmDelete = confirm("Bu script silinsin mi?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("saved_items")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Silme işlemi başarısız oldu.");
      return;
    }

    setScripts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <button
        onClick={() => (window.location.href = "/dashboard")}
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          padding: "12px 18px",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "800",
          marginBottom: "28px",
        }}
      >
        ← Back to Dashboard
      </button>

      <h1
        style={{
          fontSize: "46px",
          fontWeight: "900",
          marginBottom: "12px",
        }}
      >
        Saved Scripts
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "17px",
          marginBottom: "35px",
        }}
      >
        Your saved Shorts script library.
      </p>

      {scripts.length === 0 && (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.92))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "26px",
            padding: "40px",
            color: "#94a3b8",
          }}
        >
          Henüz kayıtlı script yok.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "24px",
        }}
      >
        {scripts.map((script) => (
          <div
            key={script.id}
            style={{
              background:
                "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.92))",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "26px",
              boxShadow: "0 10px 50px rgba(0,0,0,0.35)",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "900",
                marginBottom: "8px",
              }}
            >
              📜 {script.title || "Saved Script"}
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginBottom: "18px",
              }}
            >
              {script.created_at
                ? new Date(script.created_at).toLocaleString("tr-TR")
                : ""}
            </p>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.65,
                color: "#e5e7eb",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                padding: "20px",
                maxHeight: "360px",
                overflowY: "auto",
                fontSize: "14px",
              }}
            >
              {script.content}
            </pre>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  }}
>
  <button
    onClick={() => {
      navigator.clipboard.writeText(script.content);
      alert("Copied!");
    }}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "700",
    }}
  >
    📋 Copy
  </button>

  <button
    onClick={async () => {
      const { error } = await supabase
        .from("saved_items")
        .delete()
        .eq("id", script.id);

      if (!error) {
        setScripts((prev) =>
          prev.filter((x) => x.id !== script.id)
        );
      }
    }}
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "700",
    }}
  >
    🗑 Delete
  </button>
</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}