import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num || 0);
}

function getDaysAgo(dateString: string) {
  const published = new Date(dateString).getTime();
  const now = Date.now();
  return Math.max(1, Math.floor((now - published) / (1000 * 60 * 60 * 24)));
}

export async function POST(req: Request) {
  try {
    const { videoId } = await req.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "YOUTUBE_API_KEY missing" },
        { status: 500, headers: corsHeaders }
      );
    }

    const url =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet,statistics,contentDetails` +
      `&id=${videoId}` +
      `&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !data.items || !data.items.length) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const video = data.items[0];
    const snippet = video.snippet || {};
    const stats = video.statistics || {};

    const views = Number(stats.viewCount || 0);
    const likes = Number(stats.likeCount || 0);
    const comments = Number(stats.commentCount || 0);
    const daysAgo = getDaysAgo(snippet.publishedAt);

    const engagementRate =
      views > 0 ? Number((((likes + comments) / views) * 100).toFixed(2)) : 0;

    const viewsPerDay = Math.round(views / daysAgo);

    let performance = "Average";
    if (views >= 100000 || viewsPerDay >= 5000) performance = "High Performing";
    if (views >= 500000 || viewsPerDay >= 20000) performance = "Viral Level";

    return NextResponse.json(
      {
        title: snippet.title || "",
        channelTitle: snippet.channelTitle || "",
        thumbnail:
          snippet.thumbnails?.maxres?.url ||
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          "",
        publishedAt: snippet.publishedAt || "",
        daysAgo,
        views,
        likes,
        comments,
        engagementRate,
        viewsPerDay,
        performance,
        formatted: {
          views: formatNumber(views),
          likes: formatNumber(likes),
          comments: formatNumber(comments),
          viewsPerDay: formatNumber(viewsPerDay),
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}