"use client";

import { signOut } from "next-auth/react";

type Props = {
  sidebarOpen: boolean;
};

export default function Sidebar({ sidebarOpen }: Props) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const items = [
  { label: "Overview", icon: "▣", id: "overview", active: true },
  { label: "Videos", icon: "▶", id: "videos" },
  { label: "SEO Tools", icon: "⌘", id: "seo-tools" },
  { label: "Saved Scripts", icon: "💾", id: "saved-scripts" },
  { label: "Saved Competitors", icon: "👥", id: "saved-competitors" },
    { label: "Competitors", icon: "♙", id: "competitors" },
  { label: "Profile", icon: "👤", id: "profile" },
];

  return (
    <aside
      style={{
        width:
  typeof window !== "undefined" && window.innerWidth < 768
    ? sidebarOpen
      ? "100%"
      : "0px"
    : sidebarOpen
    ? "280px"
    : "0px",
        overflow: "hidden",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(6,10,24,0.98), rgba(9,13,30,0.96))",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: sidebarOpen ? "24px" : "0px",
        transition: "0.3s",
        position: "fixed",
top: 0,
left: 0,
height: "100vh",
zIndex: 9998,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "900",
            boxShadow: "0 0 30px rgba(124,58,237,0.45)",
          }}
        >
          ✦
        </div>

        <h1 style={{ fontSize: "26px", fontWeight: "900" }}>
          ViraSEO
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => {
  if (item.id === "saved-scripts") {
    window.location.href = "/saved-scripts";
    return;
  }

  if (item.id === "saved-competitors") {
    window.location.href = "/saved-competitors";
    return;
  }

  

  scrollToSection(item.id);
}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 16px",
              borderRadius: "16px",
              background: item.active
                ? "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.45))"
                : "rgba(255,255,255,0.035)",
              border: item.active
                ? "1px solid rgba(255,255,255,0.16)"
                : "1px solid rgba(255,255,255,0.05)",
              cursor: "pointer",
              fontWeight: "800",
              color: "white",
              boxShadow: item.active
                ? "0 0 28px rgba(124,58,237,0.25)"
                : "none",
              transition: "0.25s",
            }}
          >
            <span
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              {item.icon}
            </span>

            {item.label}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          position: "absolute",
          bottom: "24px",
          left: "24px",
          right: "24px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "16px",
        }}
      >
        <p style={{ color: "#94a3b8", fontSize: "13px" }}>
          Usage
        </p>

        <div
          style={{
            marginTop: "10px",
            height: "8px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "68%",
              height: "100%",
              background: "linear-gradient(to right,#7c3aed,#06b6d4)",
              borderRadius: "999px",
            }}
          />
        </div>

        <p
          style={{
            marginTop: "12px",
            color: "#cbd5e1",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          ✦ Pro AI Dashboard
          <button
  onClick={() => signOut({ callbackUrl: "/" })}
  style={{
    marginTop: "14px",
    width: "100%",
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.35)",
    color: "#fecaca",
    padding: "12px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "900",
  }}
>
  🚪 Logout
</button>
        </p>
      </div>
    </aside>
  );
}