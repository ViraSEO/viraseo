"use client";

import GlassCard from "./GlassCard";
import ViralScoreCard from "./ViralScoreCard";
type Props = {
  videosList: any[];
  visibleVideos: number;
  setVisibleVideos: any;
  lightMode: boolean;
  setCopied: any;
  calculateSEOScore: any;
  calculateViralScore: any;
  analyzeThumbnail: any;
  getTrendOpportunity: any;
  getAISuggestion: any;
  generateAITitle: any;
  getThumbnailVerdict: any;
};

export default function RecentVideos({
  videosList,
  visibleVideos,
  setVisibleVideos,
  lightMode,
  setCopied,
  calculateSEOScore,
  calculateViralScore,
  analyzeThumbnail,
  getTrendOpportunity,
  getAISuggestion,
  generateAITitle,
  getThumbnailVerdict,
}: Props) {
  return (
  <GlassCard lightMode={lightMode}>
      <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
        Recent Videos
      </h2>

      {videosList.slice(0, visibleVideos).map((video) => (
        <div
  key={video.id?.videoId || video.etag}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow =
      "0 0 40px rgba(124,58,237,0.22)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow =
      "0 10px 40px rgba(0,0,0,0.25)";
  }}
  style={{
          
  background:
    "linear-gradient(135deg, rgba(17,24,39,0.96), rgba(30,41,59,0.92))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "28px",
  padding: "24px",
  transition: "0.3s",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
}}
        >
          <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: "20px",
}}
>
            <img
              src={video?.snippet?.thumbnails?.medium?.url}
              alt=""
              style={{
                width: "160px",
height: "220px",
maxWidth: "160px",
objectFit: "cover",
                borderRadius: "14px",
              }}
            />

            <div>
              <h3 style={{ fontSize: "20px", fontWeight: "800" }}>
                {video?.snippet?.title}
              </h3>

              

              <p style={{ color: "#94a3b8" }}>
                AI Suggestion: {getAISuggestion(video?.snippet?.title || "")}

                
              </p>

              <p
  style={{
    color: "#06b6d4",
    marginTop: "8px",
    fontWeight: "700",
  }}
>
  AI Titles:
</p>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
  }}
>
  {generateAITitle(
    video?.snippet?.title || ""
  ).map((title: string, i: number) => (
    <div
      key={i}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "16px",
        background: "rgba(255,255,255,0.04)",
        padding: "10px 14px",
        borderRadius: "14px",
      }}
    >
      <span>{title}</span>

      <button
        onClick={() => {
          navigator.clipboard.writeText(title);
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        style={{
          background:
            "linear-gradient(to right,#7c3aed,#06b6d4)",
          border: "none",
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

              

              <p style={{ color: "#cbd5e1" }}>
                AI Verdict: {getThumbnailVerdict(video?.snippet?.title || "")}
              </p>

              <div style={{ marginTop: "16px" }}>
  <ViralScoreCard
  videoId={
    video?.snippet?.resourceId?.videoId ||
    video?.id?.videoId ||
    video?.id ||
    ""
  }
  title={video?.snippet?.title || ""}
  description={video?.snippet?.description || ""}
/>
</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <strong>
              {new Date(video?.snippet?.publishedAt).toLocaleDateString()}
            </strong>

            <button
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`,
                  "_blank"
                )
              }
              style={{
                background: "linear-gradient(to right,#ef4444,#f97316)",
                border: "none",
                color: "white",
                padding: "10px 14px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "800",
              }}
            >
              Open YouTube
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`
                );
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
                padding: "10px 14px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "800",
              }}
            >
              Copy Link
            </button>
          </div>
        </div>
      ))}

      {videosList.length > visibleVideos && (
        <button
          onClick={() => setVisibleVideos(visibleVideos + 5)}
          style={{
            marginTop: "24px",
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            cursor: "pointer",
            fontWeight: "800",
            fontSize: "16px",
            color: "white",
            background: "linear-gradient(to right,#7c3aed,#06b6d4)",
          }}
        >
          Load More Videos
        </button>
      )}
        </GlassCard>
  );
}