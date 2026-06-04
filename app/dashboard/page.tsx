  "use client";
  
  import { supabase } from "@/lib/supabase";
  import { saveItemToSupabase } from "@/lib/saveHistory";
  import AIScriptGenerator from "@/components/AIScriptGenerator";
  import GlassCard from "@/components/GlassCard";
  import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
    CartesianGrid,
} from "recharts";
  
 
 
  
import Sidebar from "@/components/Sidebar";
  import TopKeywords from "@/components/TopKeywords";
import RecentVideos from "@/components/RecentVideos";
import ChannelGrowth from "@/components/ChannelGrowth";
  import { useSession } from "next-auth/react";
  import {
  useEffect,
  useState,
  useRef,
} from "react";


  export default function DashboardPage() {
    const { data: session } = useSession();

    const [channel, setChannel] = useState<any>(null);
    const [videosList, setVideosList] = useState<any[]>([]);
    const [channelHistory, setChannelHistory] = useState<any[]>([]);
    const chartData = channelHistory.slice(-30);
  const [copied, setCopied] = useState(false);
  const overviewRef = useRef<any>(null);
const videosRef = useRef<any>(null);
const seoRef = useRef<any>(null);
const competitorRef = useRef<any>(null);
  const lightMode = false;
  const isMobile =
  typeof window !== "undefined" &&
  window.innerWidth < 768;

  useEffect(() => {
  if (typeof window !== "undefined") {
    if (window.innerWidth > 900) {
      setSidebarOpen(true);
    }
  }
}, []);
  useEffect(() => {

  console.log("SESSION:", session);
console.log("ACCESS TOKEN:", session?.accessToken);
    
    if (!session?.accessToken) return;

    fetch(`/api/youtube/channel?token=${session.accessToken}`)

      .then((res) => res.json())
      .then(async (data) => {
        if (data?.items?.[0]) {
  const channelData = data.items[0];
  setChannel(channelData);

  if (session?.user?.email) {
    const today = new Date().toISOString().slice(0, 10);

    const { data: existingHistory } = await supabase
  .from("channel_history")
  .select("id")
  .eq("user_email", session.user.email)
  .eq("channel_id", channelData.id)
  .gte("created_at", `${today}T00:00:00`)
  .order("created_at", { ascending: false })
  .limit(1);

    if (!existingHistory || existingHistory.length === 0) {
      const { data: insertedData, error } = await supabase
  .from("channel_history")
  .insert({
    user_email: session.user.email,
    channel_id: channelData.id,
    channel_title: channelData?.snippet?.title || "",
    subscriber_count: Number(channelData?.statistics?.subscriberCount || 0),
    view_count: Number(channelData?.statistics?.viewCount || 0),
    video_count: Number(channelData?.statistics?.videoCount || 0),
  });

console.log("SUPABASE INSERT:", insertedData);
console.log("SUPABASE ERROR:", error);
}
const { data: historyData, error: historyError } = await supabase
  .from("channel_history")
  .select("*")
  .eq("user_email", session.user.email)
  .order("created_at", { ascending: true });

console.log("CHANNEL HISTORY DATA:", historyData);
console.log("CHANNEL HISTORY ERROR:", historyError);

setChannelHistory(historyData || []);
    }
  }

        console.log(data);
      });

  fetch(`/api/youtube/videos?token=${session.accessToken}`)
    .then((res) => res.json())
    .then((data) => {
      if (data?.items?.length) {
    setVideosList(data.items);
  }
      console.log("videos", data);
    });

  }, [session]);
  const subs =
    channel?.statistics?.subscriberCount || "0";

  const views =
    channel?.statistics?.viewCount || "0";

  const videos =
    channel?.statistics?.videoCount || "0";

  const channelName =
    channel?.snippet?.title || "No Channel";

   
  

  const [competitorName, setCompetitorName] = useState("");
  const [competitorResult, setCompetitorResult] = useState("");
  const [contentIdea, setContentIdea] = useState("");
  const [contentNiche, setContentNiche] = useState("");
  const [visibleVideos, setVisibleVideos] = useState(5);
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
    

    const calculateSEOScore = (title: string) => {
    let score = 50;

    if (title.length > 20) score += 10;

    if (title.length > 40) score += 10;

    if (/\d/.test(title)) score += 10;

    if (title.includes("?")) score += 10;

    if (
      title.includes("BEST") ||
      title.includes("TOP") ||
      title.includes("HOW")
    ) {
      score += 10;
    }

    if (score > 100) score = 100;

    return score;
  };
  const calculateViralScore = (title: string) => {
    let score = 40;

    if (title.length > 25) score += 10;
    if (/\d/.test(title)) score += 15;
    if (title.includes("?")) score += 10;

    

    const powerWords = [
      "secret",
      "best",
      "top",
      "how",
      "why",
      "viral",
      "easy",
      "fast",
    ];

    if (
      powerWords.some((word) =>
        title.toLowerCase().includes(word)
      )
    ) {
      score += 20;
    }

    if (score > 100) score = 100;

    return score;
  };
  const calculateChannelHealth = () => {
    if (!videosList.length) return 0;

    let total = 0;

    videosList.forEach((video) => {
      total += calculateSEOScore(video?.snippet?.title || "");
      total += calculateViralScore(video?.snippet?.title || "");
    });

    return Math.min(
      100,
      Math.floor(total / (videosList.length * 2))
    );
  };

  const getBestVideo = () => {
    if (!videosList.length) return null;

    return videosList.reduce((best, video) => {
      const currentScore =
        calculateSEOScore(video?.snippet?.title || "") +
        calculateViralScore(video?.snippet?.title || "");

      const bestScore =
        calculateSEOScore(best?.snippet?.title || "") +
        calculateViralScore(best?.snippet?.title || "");

      return currentScore > bestScore ? video : best;
    }, videosList[0]);
  };



  const getAISuggestion = (title: string) => {
    const lower = title.toLowerCase();

    if (!/\d/.test(title)) {
      return "Add a number to increase CTR.";
    }

    if (
      !lower.includes("how") &&
      !lower.includes("best") &&
      !lower.includes("top")
    ) {
      return "Use stronger power words.";
    }

    if (title.length < 30) {
      return "Title could be longer for SEO.";
    }

    return "Title structure looks strong.";
  };

  const generateAITitle = (title: string) => {
    const clean = title
      .replace("|", "")
      .replace("-", "")
      .trim();

    return [
      `TOP 10 ${clean} Secrets You Need to Know`,
      `How ${clean} Became Viral`,
      `${clean} - Ultimate Guide`,
    ];
  };

    const pulse = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.3);
      opacity: 0.6;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  `;

    const progressGlow = `
  @keyframes progressGlow {
    0% {
      opacity: 0.7;
      box-shadow: 0 0 10px rgba(124,58,237,0.3);
    }

    100% {
      opacity: 1;
      box-shadow: 0 0 30px rgba(124,58,237,0.7);
    }
  }
  `;

  const fillBar = `
  @keyframes fillBar {
    0% {
      transform: scaleX(0);
    }

    100% {
      transform: scaleX(1);
    }
  }
  `;

  const analyzeThumbnail = (title: string) => {
    let score = 60;

    if (title.includes("!")) score += 10;

    if (/\d/.test(title)) score += 10;

    if (
      title.toLowerCase().includes("how") ||
      title.toLowerCase().includes("best") ||
      title.toLowerCase().includes("secret")
    ) {
      score += 20;
    }

    if (score > 100) score = 100;

    return score;
  };

  const getThumbnailVerdict = (title: string) => {
    const score = analyzeThumbnail(title);

    if (score > 85) {
      return "Excellent CTR potential";
    }

    if (score > 70) {
      return "Good visual performance";
    }

    return "Thumbnail could be improved";
  };

  const getAverageAIScore = () => {
    if (!videosList.length) return 0;

    let total = 0;

    videosList.forEach((video) => {
      total += calculateSEOScore(video?.snippet?.title || "");
      total += calculateViralScore(video?.snippet?.title || "");
      total += analyzeThumbnail(video?.snippet?.title || "");
    });

    

    return Math.floor(total / (videosList.length * 3));

    
  };

  const getTopKeywords = () => {
    const words: Record<string, number> = {};
    const bannedWords = [
    "video",
    "videos",
    "shorts",
    "short",
    "nasıl",
    "gerçek",
    "bir",
    "ve",
    "için",
    "with",
    "from",
    "this",
    "that",
  ];

    videosList.forEach((video) => {
      const title = video?.snippet?.title || "";

      title
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .split(" ")
        .forEach((word: string) => {
          if (
    word.length < 4 ||
    bannedWords.includes(word)
  )
    return;

          words[word] = (words[word] || 0) + 1;
        });
    });

    return Object.entries(words)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  };

  const getTrendOpportunity = (title: string) => {
    let score = 50;

    const lower = title.toLowerCase();

    const trendingWords = [
      "ai",
      "money",
      "secret",
      "viral",
      "fast",
      "best",
      "top",
      "how",
      "future",
      "truth",
    ];

    trendingWords.forEach((word) => {
      if (lower.includes(word)) {
        score += 5;
      }
    });

    if (title.length > 45) score += 10;

    if (/\d/.test(title)) score += 10;

    if (score > 100) score = 100;

    return score;
  };
const getHistoryGrowth = (days: number, field: "subscriber_count" | "view_count") => {
  if (!channelHistory.length) return 0;

  const now = new Date();
  const targetDate = new Date();
  targetDate.setDate(now.getDate() - days);

  const latest = channelHistory[channelHistory.length - 1];

  const oldRecord =
    channelHistory.find((item) => new Date(item.created_at) >= targetDate) ||
    channelHistory[0];

  return Number(latest?.[field] || 0) - Number(oldRecord?.[field] || 0);
};
  const getBestUploadTime = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Best upload time today: 18:00 - 21:00";
    }

    if (hour < 18) {
      return "Best upload time today: 20:00 - 22:00";
    }

    return "Best upload time tomorrow: 12:00 - 15:00";
  };

  if (isMobile) {
  return (

    
    <main
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        fontFamily: "Arial",
        padding: "18px",
        overflowX: "hidden",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "900" }}>
        🚀 ViraSEO
      </h1>

      <p style={{ color: "#94a3b8", marginTop: "8px" }}>
        Welcome back, {session?.user?.name || "User"}
      </p>

      <div
        style={{
          marginTop: "22px",
          background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
          borderRadius: "22px",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "900" }}>
          Install Chrome Extension
        </h2>

        <p style={{ marginTop: "10px", lineHeight: 1.5 }}>
          Use ViraSEO inside YouTube Studio on desktop Chrome.
        </p>
      </div>

      <div
        style={{
          marginTop: "22px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "14px",
        }}
      >
        {[
          ["Views", views],
          ["Subscribers", subs],
          ["Videos", videos],
          ["AI Score", getAverageAIScore()],
        ].map(([title, value]) => (
          <div
            key={String(title)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <p style={{ color: "#94a3b8" }}>{title}</p>
            <h2 style={{ fontSize: "30px", fontWeight: "900" }}>
              {value}
            </h2>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "22px",
          background: "rgba(124,58,237,0.12)",
          border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: "22px",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "900" }}>
          Channel Insights
        </h2>

        <p style={{ marginTop: "12px", color: "#cbd5e1" }}>
          👥 7 Day Growth: +{getHistoryGrowth(7, "subscriber_count")} Subs
        </p>

        <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
          👁 30 Day Views: +{getHistoryGrowth(30, "view_count")}
        </p>

        <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
          🕒 {getBestUploadTime()}
        </p>
      </div>
    </main>
  
);
}

    return (
  <>
    <Sidebar sidebarOpen={sidebarOpen} />

    <main
          style={{
          minHeight: "100vh",
          background: lightMode ? "#f8fafc" : "#050816",
  color: lightMode ? "#0f172a" : "white",
          display: "flex",
          fontFamily: "Arial",
        
        }}
      >

  {copied && (
    <div
      style={{
        position: "fixed",
        top: "30px",
        right: "30px",
        background:
          "linear-gradient(to right,#7c3aed,#06b6d4)",
        padding: "16px 22px",
        borderRadius: "16px",
        color: "white",
        fontWeight: "700",
        zIndex: 9999,
        boxShadow:
          "0 0 40px rgba(124,58,237,0.45)",
        animation: "pulse 0.5s",
      }}
    >
      ✨ Title copied successfully
    </div>
  )}


        <style>{pulse + progressGlow + fillBar}</style>

        
 



        <div
  style={{
    flex: 1,
    padding:
  typeof window !== "undefined" && window.innerWidth < 768
    ? "18px"
    : "40px",
    marginLeft: sidebarOpen ? "280px" : "0px",
    transition: "0.3s",
  }}
>
          <div
            style={{
              display: "flex",
flexDirection:
  typeof window !== "undefined" && window.innerWidth < 768
    ? "column"
    : "row",
justifyContent: "space-between",
gap: "20px",
alignItems:
  typeof window !== "undefined" && window.innerWidth < 768
    ? "flex-start"
    : "center",
              marginBottom: "40px",
            }}
          >
            <div>
              <p
  style={{
    color: "#94a3b8",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "6px",
  }}
>
  Welcome Back
</p>

              <h2
  style={{
    fontSize:
  typeof window !== "undefined" && window.innerWidth < 768
    ? "28px"
    : "42px",
    fontWeight: "900",
    background:
      "linear-gradient(to right,#ffffff,#a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
                {session?.user?.name || "User"}
              </h2>

              <p
                style={{
                  color: lightMode ? "#475569" : "#999",
                  fontSize: "18px",
                }}
              >
                Your channel analytics and AI optimization
                tools.
              </p>
            </div>

            <div
              style={{
                display: "flex",
flexDirection:
  typeof window !== "undefined" && window.innerWidth < 768
    ? "column"
    : "row",
alignItems: "center",
gap: "16px",
              }}
            >
              



  <button

    onClick={() => window.location.reload()}
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "white",
      padding: "14px 18px",
      borderRadius: "16px",
      cursor: "pointer",
      fontWeight: "700",
    }}
  >
    Refresh
  </button>




              <img
                src={
                  session?.user?.image ||
                  "https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff"
                }
                alt=""
                style={{
                  width: "70px",
height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow:
                    "0 0 30px rgba(124,58,237,0.5)",
                }}
              />
            </div>
          </div>

          <div
  style={{
    marginBottom: "30px",
    background:
      "linear-gradient(135deg,#7c3aed,#06b6d4)",
    borderRadius: "28px",
    padding:
  typeof window !== "undefined" && window.innerWidth < 768
    ? "18px"
    : "28px",
    color: "white",
    boxShadow:
      "0 0 40px rgba(124,58,237,0.35)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div>
      <h2
        style={{
          fontSize: "30px",
          fontWeight: "900",
          marginBottom: "10px",
        }}
      >
        🚀 Install Free Chrome Extension
      </h2>

      <p
        style={{
          maxWidth: "700px",
          lineHeight: 1.6,
          opacity: 0.95,
        }}
      >
        Generate AI Titles, Descriptions, Tags and A/B Tests
        directly inside YouTube Studio with the ViraSEO Chrome
        Extension.
      </p>
    </div>

    <a
  href="/viraseo-assistant-v1.zip"
  download
  style={{
    background: "white",
    color: "#7c3aed",
    border: "none",
    padding: "16px 28px",
    borderRadius: "18px",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
  }}
>
  🧩 Install Extension
</a>
  </div>
</div>

          <div
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 0 80px rgba(124,58,237,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px)";
              e.currentTarget.style.boxShadow = `
                0 10px 60px rgba(0,0,0,0.45),
                0 0 40px rgba(124,58,237,0.12)
              `;
            }}
            style={{
              marginTop: "30px",
              background:
                "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.92))",
              backdropFilter: "blur(20px)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "32px",
              padding: "40px",
              boxShadow: `
                0 10px 60px rgba(0,0,0,0.45),
                0 0 40px rgba(124,58,237,0.12)
              `,
              transition: "0.35s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "30px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  flex: 1,
                  
                }}
              >
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "30px",
                    background:
                      "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.92))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
  "0 0 60px rgba(124,58,237,0.35)",
                  }}
                >
                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "20px",
                      background:
  "linear-gradient(135deg,#7c3aed,#06b6d4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "0 0 30px rgba(255,0,0,0.45)",
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop:
                          "12px solid transparent",
                        borderBottom:
                          "12px solid transparent",
                        borderLeft:
                          "18px solid white",
                        marginLeft: "4px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: "42px",
                      fontWeight: "900",
                      lineHeight: 1.1,
                    }}
                  >
                    Your AI YouTube Growth Dashboard
                  </h2>

                  <p
                    style={{
                      marginTop: "14px",
                      color: lightMode ? "#475569" : "#cbd5e1",
                      fontSize: "18px",
                      maxWidth: "600px",
                      lineHeight: 1.6,
                    }}
                  >
                    Optimize YouTube titles, tags and descriptions directly inside YouTube Studio with the ViraSEO Chrome Extension.
                  </p>

                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#ef4444",
                        animation:
                          "pulse 1.5s infinite",
                        boxShadow:
                          "0 0 15px #ef4444",
                      }}
                    />

                    <span
                      style={{
                        color: "#aaa",
                        fontSize: "15px",
                      }}
                    >
                      {channelName}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {[
  "Chrome Extension",
  "AI Titles",
  "YouTube Studio",
].map((item) => (
                      
                      <div
                        key={item}
                        style={{
                          background:
                            "rgba(255,255,255,0.06)",
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          padding: "8px 14px",
                          borderRadius: "999px",
                          fontSize: "13px",
                          color: lightMode ? "#334155" : "#ddd"
                        }}
                      >
                        {item}
                      </div>
                    ))}


                    
                  </div>
                </div>
              </div>

              <button
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1)";
                }}
                style={{
                  background:
                    "linear-gradient(to right,#7c3aed,#06b6d4)",
                  color: "white",
                  border: "none",
                  padding: "20px 38px",
                  borderRadius: "22px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: `
                    0 10px 40px rgba(124,58,237,0.45),
                    0 0 20px rgba(6,182,212,0.25)
                  `,
                  transition: "0.3s",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Analyze Channel
                  <span style={{ fontSize: "20px" }}>
                    ↗
                  </span>
                </span>
              </button>
            </div>

            

            <div
              style={{
                display: "flex",
                gap: "18px",
                marginTop: "35px",
                flexWrap: "wrap",
              }}
            >
              {[
  ["👁 Views", views, "#7c3aed"],
  ["👥 Subscribers", subs, "#06b6d4"],
  ["📈 7 Day Subs", `+${getHistoryGrowth(7, "subscriber_count")}`, "#22c55e"],
  ["📊 30 Day Views", `+${getHistoryGrowth(30, "view_count")}`, "#f59e0b"],
  ["🎬 Videos", videos, "#ef4444"],
].map(([title, value, color]) => (
  <div
    key={String(title)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        "translateY(-8px)";
      e.currentTarget.style.boxShadow =
        `0 0 40px ${color}55`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "translateY(0px)";
      e.currentTarget.style.boxShadow =
        "none";
    }}
    style={{
      position: "relative",
      overflow: "hidden",
      background:
        "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.92))",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "30px",
      padding: "30px",
      transition: "0.3s",
      cursor: "pointer",
      minHeight: "180px",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "-30px",
        right: "-30px",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: `${color}22`,
        filter: "blur(20px)",
      }}
    />

    <div
      style={{
        width: "58px",
        height: "58px",
        borderRadius: "18px",
        background: `${color}22`,
        border: `1px solid ${color}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        boxShadow: `0 0 30px ${color}33`,
      }}
    >
      {String(title).split(" ")[0]}
    </div>

    <p
      style={{
        marginTop: "20px",
        color: "#94a3b8",
        fontSize: "15px",
        fontWeight: "600",
      }}
    >
      {String(title).replace(/^.\s/, "")}
    </p>

    <h2
      style={{
        marginTop: "10px",
        fontSize: "42px",
        fontWeight: "900",
        color: "white",
      }}
    >
      {value}
    </h2>

    <div
      style={{
        marginTop: "18px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: `${color}15`,
        border: `1px solid ${color}33`,
        color,
        padding: "8px 14px",
        borderRadius: "999px",
        fontWeight: "800",
        fontSize: "13px",
      }}
    >
      ↗ +12.6%
    </div>
  </div>
))}
            </div>

            <div
              style={{
                marginTop: "35px",
              }}
            >
              <div
                style={{
                  height: "12px",
                  width: "100%",
                  background:
                    "rgba(255,255,255,0.06)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${calculateChannelHealth()}%`,
                    animation:
                      "progressGlow 2s infinite alternate",
                    height: "100%",
                    background:
                      "linear-gradient(to right,#7c3aed,#06b6d4)",
                    borderRadius: "999px",
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: "14px",
                  color: "#888",
                  fontSize: "15px",
                }}
              >
                Channel health score: {calculateChannelHealth()}%
              </p>

              <p
                style={{
                  marginTop: "8px",
                  color: "#666",
                  fontSize: "13px",
                }}
              >
                Last sync: Never
              </p>

              <div
                style={{
                  marginTop: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#8b5cf6",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#8b5cf6",
                    boxShadow:
                      "0 0 12px #8b5cf6",
                  }}
                />

                AI ready to analyze your YouTube
                channel
              </div>
            </div>

  {getBestVideo() && (
    <div
      style={{
        marginTop: "40px",
        background: lightMode
    ? "rgba(255,255,255,0.9)"
    : "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "30px",
        padding: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <div>
        <p style={{ color: lightMode ? "#475569" : "#999" }}>
          Best Performing Video
        </p>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: "900",
          }}
        >
          {getBestVideo()?.snippet?.title}
        </h2>
      </div>

      <strong
        style={{
          color: "#22c55e",
          fontSize: "24px",
        }}
      >
        Top Score
      </strong>
    </div>
  )}

  {/* STATS */}
  <div
    style={{
      marginTop: "30px",
      background:
        "linear-gradient(to right,#7c3aed,#06b6d4)",
      borderRadius: "24px",
      padding: "24px",
      color: "white",
      boxShadow:
        "0 0 40px rgba(124,58,237,0.35)",
        
    }}
  >
    <p
      style={{
        fontSize: "14px",
        opacity: 0.8,
      }}
    >
      AI Upload Recommendation
    </p>

    <h2
      style={{
        marginTop: "10px",
        fontSize: "32px",
        fontWeight: "900",
      }}
    >
      {getBestUploadTime()}
    </h2>

    <p
      style={{
        marginTop: "12px",
        maxWidth: "700px",
        lineHeight: 1.6,
        opacity: 0.9,
      }}
    >
      Based on audience activity, Shorts engagement
      and viral timing patterns.
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginTop: "40px",
    }}
  >
    {[
    ["Views", views],
    ["Subscribers", subs],
    ["AI Score", getAverageAIScore()],
    ["Videos", videos],
  ].map(([title, value]) => (
      <div
        key={title}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px)";
          e.currentTarget.style.background =
            "rgba(124,58,237,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0px)";
          e.currentTarget.style.background =
            "rgba(255,255,255,0.05)";
        }}
        style={{
          background: lightMode
    ? "rgba(255,255,255,0.9)"
    : "rgba(255,255,255,0.05)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "30px",
          transition: "0.3s",
          cursor: "pointer",
        }}
      >
        <p style={{ color: lightMode ? "#475569" : "#999" }}>{title}</p>

        

        <h2
          style={{
            fontSize: "42px",
            fontWeight: "900",
            background:
              "linear-gradient(to right,#7c3aed,#06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {value}
        </h2>
      </div>
    ))}
  </div>
{!isMobile && (
  <ChannelGrowth
  lightMode={lightMode}
  videosList={videosList}
  hoveredScore={hoveredScore}
  setHoveredScore={setHoveredScore}
  calculateSEOScore={calculateSEOScore}
  getAverageAIScore={getAverageAIScore}
/>
)}
  <TopKeywords
  lightMode={lightMode}
  getTopKeywords={getTopKeywords}
/>

<GlassCard
  lightMode={lightMode}
  style={{
    marginTop: "40px",
  }}
>
  <h2
    style={{
      fontSize: "36px",
      fontWeight: "900",
      marginBottom: "25px",
    }}
  >
    Subscriber Growth
  </h2>

  <div
  style={{
    width: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
  }}
>
    <LineChart
  width={1400}
  height={400}
      data={channelHistory}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="created_at"
        tickFormatter={(value) =>
          new Date(value).toLocaleDateString("tr-TR")
        }
      />

      <YAxis domain={["dataMin - 5", "dataMax + 5"]} />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="subscriber_count"
        stroke="#7c3aed"
        strokeWidth={4}
        dot={{ r: 6 }}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </div>
</GlassCard>
  <GlassCard
  lightMode={lightMode}
  style={{
    marginTop: "40px",
  }}
>
  <div id="competitors">
    <h2
      style={{
        fontSize: "36px",
        fontWeight: "900",
      }}
    >
      Competitor Spy
    </h2>

    <p
      style={{
        marginTop: "10px",
        color: lightMode ? "#475569" : "#94a3b8",
      }}
    >
      Analyze competitor channels with AI.
    </p>

    <div
      style={{
        display: "flex",
        gap: "14px",
        marginTop: "24px",
      }}
    >
      <input
        value={competitorName}
        onChange={(e) =>
          setCompetitorName(e.target.value)
        }
        placeholder="Enter competitor channel"
        style={{
          flex: 1,
          padding: "18px",
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
  if (competitorName.length < 3) {
    setCompetitorResult("Please enter a valid competitor channel.");
    return;
  }

  

  

  setCompetitorResult("Analyzing competitor...");

  try {
    const competitorRes = await fetch(
      "/api/youtube/competitor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: competitorName,
        }),
      }
    );

    const competitorData = await competitorRes.json();

    if (competitorData.error) {
      setCompetitorResult(
        "Competitor channel not found."
      );
      return;
    }

    const titles = competitorData.videos
      .map((video: any) => video?.snippet?.title)
      .filter(Boolean)
      .join("\n");

    setCompetitorResult(`
Channel: ${competitorData.channel?.title}

Videos Found: ${competitorData.videos?.length || 0}

Latest videos loaded successfully.
`);
  } catch {
    setCompetitorResult(
      "Competitor AI analysis failed."
    );
  }
}}

        style={{
          background:
            "linear-gradient(to right,#ef4444,#f97316)",
          border: "none",
          color: "white",
          padding: "18px 26px",
          borderRadius: "18px",
          cursor: "pointer",
          fontWeight: "800",
        }}
      >
        Analyze
      </button>
    </div>


{competitorResult &&
  competitorResult !== "Analyzing competitor..." && (
    <button
      onClick={async () => {
        if (!session?.user?.email) return;

        const ok = await saveItemToSupabase({
          userEmail: session.user.email,
          type: "competitor",
          title: competitorName || "Saved Competitor",
          content: competitorResult,
        });

        if (ok) {
          alert("Competitor saved!");
        }
      }}
      style={{
        marginTop: "16px",
        background: "linear-gradient(to right,#22c55e,#06b6d4)",
        border: "none",
        color: "white",
        padding: "16px 22px",
        borderRadius: "16px",
        cursor: "pointer",
        fontWeight: "800",
      }}
    >
      💾 Save Competitor
    </button>
  )}
    {competitorResult && (
      <div
        style={{
          marginTop: "24px",
          background: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.2)",
          padding: "24px",
          borderRadius: "22px",
          color: lightMode ? "#0f172a" : "white",
          lineHeight: 1.7,
        }}
      >
        🕵️ {competitorResult}
      </div>
    )}
  
  </div>
</GlassCard>

  


<AIScriptGenerator lightMode={lightMode} />
  <GlassCard lightMode={lightMode}>
<div
  id="seo-tools"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    alignItems: "stretch",
    gap: "20px",
  }}
>
  

  
  
 
</div>
    <h2
  style={{
    fontSize: "36px",
    fontWeight: "900",
  }}
>
  📊 Channel Insights
</h2>

    <div
      style={{
        marginTop: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {[
  `👥 7 Day Growth: +${getHistoryGrowth(7, "subscriber_count")} Subs`,
  `👁 30 Day Views: +${getHistoryGrowth(30, "view_count")}`,
  `🎬 Total Videos: ${videos}`,
  `🕒 ${getBestUploadTime()}`,
].map((item, i) => (
        <div
          key={i}
          style={{
            background:
              "rgba(124,58,237,0.08)",
            border:
              "1px solid rgba(124,58,237,0.16)",
            padding: "18px 22px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow:
                "0 0 12px #8b5cf6",
            }}
          />

          <span
            style={{
              fontWeight: "700",
              color: lightMode
                ? "#0f172a"
                : "white",
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>

    
  </GlassCard>
<div id="videos">
  <RecentVideos
    videosList={videosList}
    visibleVideos={visibleVideos}
    setVisibleVideos={setVisibleVideos}
    lightMode={lightMode}
    setCopied={setCopied}
    calculateSEOScore={calculateSEOScore}
    calculateViralScore={calculateViralScore}
    analyzeThumbnail={analyzeThumbnail}
    getTrendOpportunity={getTrendOpportunity}
    getAISuggestion={getAISuggestion}
    generateAITitle={generateAITitle}
    getThumbnailVerdict={getThumbnailVerdict}
  />
</div>
  
</div>

          </div>
        
      </main>
  </>
);
}