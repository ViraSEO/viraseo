import { NextResponse } from "next/server";

function extractVideoId(input: string) {
  const shorts = input.match(/shorts\/([^/?]+)/);
  if (shorts?.[1]) return shorts[1];

  const watch = input.match(/[?&]v=([^&]+)/);
  if (watch?.[1]) return watch[1];

  const youtu = input.match(/youtu\.be\/([^/?]+)/);
  if (youtu?.[1]) return youtu[1];

  return null;
}

function cleanHandle(input: string) {
  let clean = input.trim();

  try {
    const url = new URL(clean);

    if (url.pathname.includes("@")) {
      return url.pathname.split("@")[1].split("/")[0];
    }

    if (url.pathname.includes("/channel/")) {
      return url.pathname.split("/channel/")[1].split("/")[0];
    }

    if (url.pathname.includes("/c/")) {
      return url.pathname.split("/c/")[1].split("/")[0];
    }

    if (url.pathname.includes("/user/")) {
      return url.pathname.split("/user/")[1].split("/")[0];
    }
  } catch {}

  const handleMatch = clean.match(/@([a-zA-Z0-9._-]+)/);
  if (handleMatch?.[1]) return handleMatch[1];

  return clean.replace("@", "").trim();
}

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input?.trim()) {
      return NextResponse.json({ error: "Input is required" });
    }

    const cleanInput = input.trim();
    const videoId = extractVideoId(cleanInput);

    if (videoId) {
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
      );

      const videoData = await videoRes.json();
      const channelId = videoData?.items?.[0]?.snippet?.channelId;

      if (!channelId) {
        return NextResponse.json({ error: "Channel not found from video" });
      }

      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=8&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
      );

      const videosData = await videosRes.json();

      return NextResponse.json({
        channel: videoData.items[0].snippet,
        videos: videosData.items || [],
      });
    }

    const handle = cleanHandle(cleanInput);

    let channelData: any = null;

    const handleRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${encodeURIComponent(
        handle
      )}&key=${process.env.YOUTUBE_API_KEY}`
    );

    channelData = await handleRes.json();

    let channelId = channelData?.items?.[0]?.id;

    if (!channelId && handle.startsWith("UC")) {
      channelId = handle;
      const byIdRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
      );
      channelData = await byIdRes.json();
    }

    if (!channelId) {
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(
          handle
        )}&key=${process.env.YOUTUBE_API_KEY}`
      );

      const searchData = await searchRes.json();
      channelId = searchData?.items?.[0]?.snippet?.channelId;

      if (channelId) {
        const byIdRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
        );
        channelData = await byIdRes.json();
      }
    }

    if (!channelId) {
      return NextResponse.json({ error: "Channel not found" });
    }

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=8&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
    );

    const videosData = await videosRes.json();

    return NextResponse.json({
      channel: channelData?.items?.[0]?.snippet || {},
      videos: videosData.items || [],
    });
  } catch (error: any) {
    console.error("Competitor route error:", error);

    return NextResponse.json({
      error: error?.message || "Competitor fetch failed",
    });
  }
}