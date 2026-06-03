"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSavedItems } from "@/lib/saveHistory";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [savedScripts, setSavedScripts] = useState(0);
  const [savedCompetitors, setSavedCompetitors] = useState(0);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.email) return;

      if (session?.accessToken) {
        const res = await fetch(
          `/api/youtube/channel?token=${session.accessToken}`
        );

        const data = await res.json();

        if (data?.items?.[0]) {
          setChannel(data.items[0]);
        }
      }

      const items = await getSavedItems(session.user.email);

      setSavedScripts(
        items.filter((x: any) => x.type === "script").length
      );

      setSavedCompetitors(
        items.filter((x: any) => x.type === "competitor").length
      );
    };

    load();
  }, [session]);

  const StatCard = ({
    title,
    value,
    big = true,
  }: {
    title: string;
    value: any;
    big?: boolean;
  }) => (
    <div
      style={{
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "28px",
        boxShadow: "0 0 40px rgba(0,0,0,0.22)",
      }}
    >
      <p style={{ color: "#94a3b8", fontWeight: "700" }}>{title}</p>

      <h2
        style={{
          marginTop: "12px",
          fontSize: big ? "42px" : "28px",
          fontWeight: "900",
          background: big
            ? "linear-gradient(to right,#7c3aed,#06b6d4)"
            : "none",
          WebkitBackgroundClip: big ? "text" : "initial",
          WebkitTextFillColor: big ? "transparent" : "white",
          color: big ? undefined : "white",
          wordBreak: "break-word",
        }}
      >
        {value}
      </h2>
    </div>
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#020617 0%,#030b1f 100%)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
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

      <h1 style={{ fontSize: "56px", fontWeight: "900", marginBottom: "12px" }}>
        Profile
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "40px" }}>
        Your ViraSEO account overview.
      </p>

      <div
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "32px",
          boxShadow: "0 0 40px rgba(0,0,0,0.25)",
          display: "flex",
          gap: "24px",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={
            session?.user?.image ||
            "https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff"
          }
          alt="Profile"
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 0 40px rgba(124,58,237,0.45)",
          }}
        />

        <div>
          <h2 style={{ fontSize: "32px", fontWeight: "900" }}>
            {session?.user?.name || "User"}
          </h2>

          <p style={{ color: "#94a3b8", marginTop: "8px", fontSize: "16px" }}>
            {session?.user?.email || "No email"}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <StatCard title="👥 Subscribers" value={channel?.statistics?.subscriberCount || "0"} />
        <StatCard title="👁 Views" value={channel?.statistics?.viewCount || "0"} />
        <StatCard title="🎬 Videos" value={channel?.statistics?.videoCount || "0"} />
        <StatCard title="📺 Channel" value={channel?.snippet?.title || "-"} big={false} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
        }}
      >
        <StatCard title="📜 Saved Scripts" value={savedScripts} />
        <StatCard title="👥 Saved Competitors" value={savedCompetitors} />
        <StatCard title="🧠 Plan" value="Free" />
        <StatCard title="🚀 Status" value="Active" />
      </div>
    </main>
  );
}