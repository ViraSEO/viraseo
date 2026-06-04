"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const login = () => signIn("google", { callbackUrl: "/dashboard" });

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,0.25), transparent 35%), radial-gradient(circle at top right, rgba(6,182,212,0.18), transparent 35%), #020617",
        color: "white",
        fontFamily: "Arial",
        overflowX: "hidden",
width: "100%",
      }}
    >
      <header
        style={{
          padding: "24px 56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
              boxShadow: "0 0 35px rgba(124,58,237,0.45)",
            }}
          >
            ✦
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: "900" }}>ViraSEO</h1>
        </div>

        <nav
  style={{
    display: "flex",
    gap: "26px",
    color: "#cbd5e1",
    fontWeight: "700",
  }}
>
  <span
    onClick={() =>
      document
        .getElementById("features")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    style={{ cursor: "pointer" }}
  >
    Features
  </span>

  <span
    onClick={() =>
      document
        .getElementById("workflow")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    style={{ cursor: "pointer" }}
  >
    Tools
  </span>

  <span
    onClick={() =>
      document
        .getElementById("preview")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    style={{ cursor: "pointer" }}
  >
    Insights
  </span>
</nav>
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="desktop-menu-button"
  style={{
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "white",
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "900",
    fontSize: "22px",
  }}
>
  ☰
</button>
        <button
          onClick={login}
          style={{
            background: "linear-gradient(to right,#7c3aed,#06b6d4)",
            border: "none",
            color: "white",
            padding: "13px 22px",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: "900",
          }}
        >
          Continue with Google
        </button>
      </header>

      {menuOpen && (
  <div
    style={{
      position: "absolute",
      top: "86px",
      right: "56px",
      zIndex: 50,
      background: "rgba(15,23,42,0.96)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "22px",
      padding: "16px",
      width: "230px",
      boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
      backdropFilter: "blur(16px)",
    }}
  >
    {[
      ["Features", "features"],
      ["Tools", "workflow"],
      ["Insights", "preview"],
      ["Install Guide", "install-guide"],
    ].map(([label, id]) => (
      <div
        key={id}
        onClick={() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          setMenuOpen(false);
        }}
        style={{
          padding: "13px 14px",
          borderRadius: "14px",
          color: "#cbd5e1",
          fontWeight: "900",
          cursor: "pointer",
        }}
      >
        {label}
      </div>
    ))}
  </div>
)}

      <section
        style={{
          padding: "90px 56px 50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "60px",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderRadius: "999px",
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#ddd6fe",
              fontWeight: "900",
              marginBottom: "24px",
            }}
          >
            ⚡ AI Chrome Extension For Creators
          </div>

          <h2
            style={{
              fontSize: "clamp(36px, 8vw, 60px)",
              lineHeight: 1,
              fontWeight: "900",
              letterSpacing: "-3px",
              maxWidth: "850px",
            }}
          >
            AI-Powered YouTube Growth Tools
          </h2>

          <p
            style={{
              marginTop: "26px",
              color: "#94a3b8",
              fontSize: "21px",
              lineHeight: 1.75,
              maxWidth: "680px",
            }}
          >
            Generate AI Titles, AI Descriptions, AI Tags and A/B Tests directly inside YouTube Studio with ViraSEO.
          </p>

          <div
            style={{
              marginTop: "34px",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >

            
<a
  href="/viraseo-assistant-v1.zip"
  download
  style={{
    background: "rgba(124,58,237,0.15)",
    border: "1px solid rgba(124,58,237,0.35)",
    color: "white",
    padding: "18px 28px",
    borderRadius: "18px",
    cursor: "pointer",
    fontWeight: "900",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
  }}
>
  🧩 Install Extension
</a>

<div className="mt-4">
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold">
    🚀 FREE BETA ACCESS
  </div>

  <p className="text-gray-400 text-sm mt-2">
    No Chrome Store required. Download the extension and install it in Chrome in less than 1 minute.
  </p>
</div>

            <button
              onClick={login}
              style={{
                background: "linear-gradient(to right,#7c3aed,#06b6d4)",
                border: "none",
                color: "white",
                padding: "18px 30px",
                borderRadius: "18px",
                cursor: "pointer",
                fontWeight: "900",
                fontSize: "16px",
                boxShadow: "0 0 55px rgba(124,58,237,0.45)",
              }}
            >
              🚀 Start Free with Google
            </button>

            
          </div>

<div
  style={{
    marginTop: "24px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    color: "#cbd5e1",
    fontWeight: "800",
  }}
>
  <span>✓ AI Titles</span>
  <span>✓ AI Descriptions</span>
  <span>✓ AI Tags</span>
  <span>✓ A/B Testing</span>
</div>

          <div
            style={{
              marginTop: "34px",
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
              color: "#cbd5e1",
              fontWeight: "800",
            }}
          >
            <span>✓ Google Login</span>
            <span>✓ No setup headache</span>
            <span>✓ Built for creators</span>
          </div>
        </div>

        <div
  id="preview"
  style={{
    position: "relative",
  }}
>
  <div
    style={{
      position: "absolute",
      inset: "-30px",
      background:
        "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.18))",
      filter: "blur(45px)",
      borderRadius: "40px",
      zIndex: 0,
    }}
  />

  <div
    style={{
      position: "relative",
      zIndex: 1,
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "34px",
      padding: "26px",
      boxShadow: "0 30px 100px rgba(0,0,0,0.55)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "22px",
      }}
    >
      <div>
        <p style={{ color: "#94a3b8", fontWeight: "800" }}>
          ViraSEO Chrome Extension
        </p>

        <h3 style={{ fontSize: "30px", fontWeight: "900" }}>
          Live Extension Preview
        </h3>
      </div>

      <div
        style={{
          background: "rgba(34,197,94,0.12)",
          color: "#86efac",
          border: "1px solid rgba(34,197,94,0.28)",
          borderRadius: "999px",
          padding: "9px 14px",
          fontWeight: "900",
        }}
      >
        Live Demo
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "12px",
      }}
    >
      {[
        ["👥", "Subscribers", "10.2K", "+8.4%"],
        ["👁", "Views", "1.2M", "+14%"],
        ["📜", "Scripts", "24", "+6"],
        ["♙", "Competitors", "8", "+2"],
      ].map(([icon, title, value, growth]) => (
        <div
          key={title}
          style={{
            background: "rgba(255,255,255,0.055)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            padding: "16px",
          }}
        >
          <div style={{ fontSize: "22px" }}>{icon}</div>

          <p
            style={{
              marginTop: "10px",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: "800",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "900",
            }}
          >
            {value}
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#22c55e",
              fontWeight: "900",
              fontSize: "13px",
            }}
          >
            ↗ {growth}
          </p>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: "18px",
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "16px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "24px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#94a3b8", fontWeight: "800" }}>
            Subscriber Growth
          </p>

          <span
            style={{
              color: "#22c55e",
              fontWeight: "900",
              fontSize: "13px",
            }}
          >
            +14.6%
          </span>
        </div>

        <div
          style={{
            marginTop: "22px",
            height: "170px",
            display: "flex",
            alignItems: "end",
            gap: "12px",
          }}
        >
          {[45, 70, 55, 95, 110, 82, 130, 155, 145, 175].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}px`,
                  borderRadius: "12px 12px 0 0",
                  background:
                    "linear-gradient(to top,#7c3aed,#06b6d4)",
                  boxShadow: "0 0 22px rgba(124,58,237,0.35)",
                }}
              />
            )
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div
          style={{
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "20px",
            padding: "18px",
          }}
        >
          <strong>Top Keywords</strong>

          <div
            style={{
              marginTop: "12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {["youtube growth", "shorts", "seo tips", "viral"].map(
              (item) => (
                <span
                  key={item}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "999px",
                    padding: "7px 10px",
                    color: "#ddd6fe",
                    fontSize: "12px",
                    fontWeight: "800",
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div
          style={{
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.22)",
            borderRadius: "20px",
            padding: "18px",
          }}
        >
          <strong>Competitor Spy</strong>

          <div
            style={{
              marginTop: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "#bae6fd",
              fontWeight: "800",
            }}
          >
            <span>♙ MrBeast style hooks</span>
            <span>♙ Shorts trend patterns</span>
            <span>♙ Viral title structure</span>
          </div>
        </div>

        <div
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: "20px",
            padding: "18px",
          }}
        >
          <strong>Best Upload Time</strong>

          <p
            style={{
              marginTop: "10px",
              color: "#bbf7d0",
              fontWeight: "900",
            }}
          >
            18:00 - 21:00
          </p>
        </div>
      </div>
    </div>

    <div
      style={{
        marginTop: "18px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "22px",
        padding: "18px",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "12px",
      }}
    >
      {[
        ["🎯 SEO Score", "87/100"],
        ["🧠 Script Ready", "Generated"],
        ["📊 Insights", "Updated"],
      ].map(([title, value]) => (
        <div
          key={title}
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "16px",
            padding: "14px",
          }}
        >
          <p style={{ color: "#94a3b8", fontSize: "13px" }}>{title}</p>
          <h3 style={{ marginTop: "7px", fontWeight: "900" }}>{value}</h3>
        </div>
      ))}
    </div>
  </div>
</div>
        
      </section>
      <section
  id="install-guide"
  style={{
    padding: "80px 48px",
    background: "linear-gradient(180deg, #050816 0%, #020617 100%)",
    color: "white",
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "32px",
      alignItems: "center",
    }}
  >
    <div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          borderRadius: "999px",
          background: "rgba(34,197,94,0.12)",
          border: "1px solid rgba(34,197,94,0.35)",
          color: "#4ade80",
          fontWeight: "900",
          fontSize: "14px",
          marginBottom: "18px",
        }}
      >
        🚀 FREE BETA INSTALLATION
      </div>

      <h2
        style={{
          fontSize: "clamp(32px, 5vw, 54px)",
          lineHeight: "1.05",
          margin: "0 0 18px",
          fontWeight: "950",
          letterSpacing: "-1.5px",
        }}
      >
        Install ViraSEO in less than 1 minute
      </h2>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "18px",
          lineHeight: "1.7",
          maxWidth: "560px",
          marginBottom: "28px",
        }}
      >
        ViraSEO is currently available as a free beta extension. Download it,
        enable Developer Mode in Chrome, and start using AI SEO tools directly
        inside YouTube Studio.
      </p>

      <div
        style={{
          display: "grid",
          gap: "14px",
        }}
      >
        {[
          "Download the ViraSEO extension ZIP file",
          "Extract the ZIP file to a folder",
          "Open chrome://extensions in Google Chrome",
          "Enable Developer Mode from the top right",
          "Click Load Unpacked and select the extracted folder",
        ].map((step, index) => (
          <div
            key={step}
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
              background: "rgba(15,23,42,0.7)",
              border: "1px solid rgba(148,163,184,0.16)",
              borderRadius: "18px",
              padding: "16px",
            }}
          >
            <span
              style={{
                minWidth: "34px",
                height: "34px",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                color: "white",
                fontWeight: "900",
              }}
            >
              {index + 1}
            </span>

            <span
              style={{
                color: "#e2e8f0",
                fontWeight: "800",
                lineHeight: "1.5",
              }}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        background: "rgba(15,23,42,0.78)",
        border: "1px solid rgba(148,163,184,0.18)",
        borderRadius: "28px",
        padding: "24px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          background: "#020617",
          border: "1px solid rgba(148,163,184,0.15)",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(148,163,184,0.12)",
            display: "flex",
            gap: "8px",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ef4444" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#f59e0b" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#22c55e" }} />
        </div>

        <div style={{ padding: "22px" }}>
          <div
            style={{
              color: "#94a3b8",
              fontWeight: "900",
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            chrome://extensions
          </div>

          <div
            style={{
              background: "rgba(30,41,59,0.9)",
              border: "1px solid rgba(148,163,184,0.16)",
              borderRadius: "18px",
              padding: "18px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <strong style={{ fontSize: "18px" }}>Extensions</strong>
              <span
                style={{
                  background: "rgba(34,197,94,0.15)",
                  color: "#4ade80",
                  border: "1px solid rgba(34,197,94,0.35)",
                  borderRadius: "999px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: "900",
                }}
              >
                Developer Mode ON
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  borderRadius: "14px",
                  padding: "14px",
                  fontWeight: "900",
                }}
              >
                Load Unpacked
              </div>

              <div
                style={{
                  background: "rgba(2,6,23,0.8)",
                  border: "1px solid rgba(148,163,184,0.12)",
                  borderRadius: "14px",
                  padding: "14px",
                  color: "#cbd5e1",
                  fontWeight: "800",
                }}
              >
                ViraSEO Assistant installed ✅
              </div>
            </div>
          </div>

          <a
            href="/viraseo-assistant-v1.zip"
            download
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "white",
              padding: "16px",
              borderRadius: "16px",
              textDecoration: "none",
              fontWeight: "950",
            }}
          >
            Download Free Beta Extension
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      <section
        style={{
          padding: "35px 56px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
          gap: "18px",
        }}
      >
        {[
          ["50M+", "Views Analyzed"],
          ["100K+", "Keywords Processed"],
          ["10K+", "Channels Studied"],
          ["24/7", "Growth Insights"],
        ].map(([value, label]) => (
          <div
            key={label}
            style={{
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "38px", fontWeight: "900" }}>{value}</h2>
            <p style={{ color: "#94a3b8", marginTop: "8px" }}>{label}</p>
          </div>
        ))}
      </section>

      <section id="features" style={{ padding: "85px 56px" }}>
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "50px", fontWeight: "900" }}>
            Tools that help creators move faster
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: 1.7 }}>
            ViraSEO combines channel analytics, competitor tracking, saved
            research and script generation in one clean creator workspace.
          </p>
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "22px",
          }}
        >
          {[
            [
              "🎯 SEO Analysis",
              "Score your videos, improve titles and find keyword opportunities.",
            ],
            [
              "♙ Competitor Spy",
              "Analyze competitor channels and save useful competitors.",
            ],
            [
              "🧠 Script Generator",
              "Generate ready-to-record Shorts scripts without AI API costs.",
            ],
            [
              "📊 Channel Insights",
              "Track subscribers, views, history and growth over time.",
            ],
            [
              "💾 Saved Library",
              "Save scripts and competitors so your research never disappears.",
            ],
            [
              "👤 Creator Profile",
              "Keep your account, saved data and channel overview in one place.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                background: "linear-gradient(135deg,#0f172a,#1e293b)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "28px",
                padding: "30px",
                minHeight: "170px",
              }}
            >
              <h3 style={{ fontSize: "24px", fontWeight: "900" }}>{title}</h3>
              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "12px",
                  lineHeight: 1.65,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
  id="workflow"
  style={{
    padding: "70px 56px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "22px",
        }}
      >
        {[
          ["1", "Connect your channel", "Sign in with Google and load your YouTube data."],
          ["2", "Analyze performance", "See videos, keywords, growth and insights."],
          ["3", "Save your research", "Keep scripts and competitors in your library."],
          ["4", "Grow with clarity", "Use your dashboard to plan better uploads."],
        ].map(([num, title, desc]) => (
          <div
            key={num}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "26px",
              padding: "28px",
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "16px",
                background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "900",
                marginBottom: "18px",
              }}
            >
              {num}
            </div>

            <h3 style={{ fontSize: "24px", fontWeight: "900" }}>{title}</h3>
            <p style={{ color: "#94a3b8", marginTop: "10px", lineHeight: 1.6 }}>
              {desc}
            </p>
          </div>
        ))}
      </section>

      <section
        style={{
          padding: "80px 56px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.24), rgba(6,182,212,0.14))",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "36px",
            padding: "55px",
            boxShadow: "0 0 80px rgba(124,58,237,0.22)",
          }}
        >
          <h2 style={{ fontSize: "46px", fontWeight: "900" }}>
            Ready to understand your YouTube growth?
          </h2>
          <p style={{ color: "#cbd5e1", marginTop: "16px", fontSize: "18px" }}>
            Start with your Google account and open your Live Extension Preview.
          </p>

          <button
            onClick={login}
            style={{
              marginTop: "28px",
              background: "white",
              border: "none",
              color: "#020617",
              padding: "18px 32px",
              borderRadius: "18px",
              cursor: "pointer",
              fontWeight: "900",
              fontSize: "16px",
            }}
          >
            Continue with Google →
          </button>
        </div>
      </section>

      <footer
        style={{
          padding: "36px 56px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "#94a3b8",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <strong style={{ color: "white" }}>✦ ViraSEO</strong>
        <span>© 2026 ViraSEO. All rights reserved.</span>
      </footer>
      <style jsx global>{`
  @media (max-width: 768px) {
    main {
      overflow-x: hidden !important;
    }

    header {
      padding: 18px 18px !important;
      flex-direction: column !important;
      gap: 16px !important;
      align-items: flex-start !important;
    }

    nav {
  display: flex !important;
  width: 100%;
  justify-content: center !important;
  gap: 18px !important;
  font-size: 14px !important;
  flex-wrap: wrap !important;
}

    section {
      padding-left: 18px !important;
      padding-right: 18px !important;
    }

    h1 {
      font-size: 26px !important;
    }

    h2 {
      font-size: 36px !important;
      line-height: 1.1 !important;
      letter-spacing: -1px !important;
    }

    button {
      width: 100%;
    }

    div {
      max-width: 100%;
      box-sizing: border-box;
    }
  }
`}</style>
    </main>
  );
}