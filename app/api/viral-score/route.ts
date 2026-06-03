import { NextResponse } from "next/server";

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function daysSince(date: string) {
  const published = new Date(date).getTime();
  const now = Date.now();
  return Math.max(1, Math.floor((now - published) / (1000 * 60 * 60 * 24)));
}

function avg(numbers: number[]) {
  if (!numbers.length) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function ratioScore(ratio: number) {
  if (ratio >= 5) return 100;
  if (ratio >= 3) return 90;
  if (ratio >= 2) return 80;
  if (ratio >= 1.5) return 70;
  if (ratio >= 1) return 60;
  if (ratio >= 0.7) return 45;
  if (ratio >= 0.4) return 30;
  return 15;
}

function textScore(title: string, description: string) {
  const text = `${title} ${description}`.toLowerCase();

  let ctrScore = 40;
  let seoScore = 35;
  let hookScore = 35;

  if (title.length >= 35 && title.length <= 70) ctrScore += 20;
  if (title.length >= 20 && title.length < 35) ctrScore += 10;
  if (/\d/.test(title)) ctrScore += 10;
  if (/[!?]/.test(title)) ctrScore += 8;

  const hookWords = [
    "nasıl",
    "neden",
    "şok",
    "gizli",
    "hızlı",
    "kolay",
    "en iyi",
    "sakın",
    "bunu",
    "gerçek",
    "viral",
    "shorts",
    "how",
    "why",
    "best",
    "secret",
    "easy",
  ];

  hookWords.forEach((word) => {
    if (text.includes(word)) hookScore += 6;
  });

  if (description.length > 80) seoScore += 15;
  if (description.length > 200) seoScore += 15;
  if (title.split(" ").length >= 5) seoScore += 10;

  return {
    ctrScore: clamp(ctrScore),
    seoScore: clamp(seoScore),
    hookScore: clamp(hookScore),
    thumbnailScore: clamp((ctrScore + hookScore) / 2),
  };
}

function getLevel(score: number) {
  if (score >= 85) return "EXTREME";
  if (score >= 70) return "HIGH";
  if (score >= 50) return "MEDIUM";
  return "LOW";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const videoId = body.videoId;

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const videoData = await videoRes.json();
    const video = videoData.items?.[0];

    if (!video) {
      return NextResponse.json(
        { error: "Video data not found" },
        { status: 404 }
      );
    }

    const title = video.snippet?.title || "";
    const description = video.snippet?.description || "";
    const publishedAt = video.snippet?.publishedAt;
    const channelId = video.snippet?.channelId;

    const viewCount = Number(video.statistics?.viewCount || 0);
    const likeCount = Number(video.statistics?.likeCount || 0);
    const commentCount = Number(video.statistics?.commentCount || 0);

    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&maxResults=20&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
    );

    const channelData = await channelRes.json();

    const recentVideoIds = channelData.items
      ?.map((item: any) => item.id?.videoId)
      .filter(Boolean)
      .join(",");

    if (!recentVideoIds) {
      return NextResponse.json(
        { error: "Channel benchmark videos not found" },
        { status: 404 }
      );
    }

    const recentRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${recentVideoIds}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const recentData = await recentRes.json();

    const benchmarkVideos = (recentData.items || []).filter(
      (item: any) => item.id !== videoId
    );

    const viewRates = benchmarkVideos.map((item: any) => {
      const views = Number(item.statistics?.viewCount || 0);
      const days = daysSince(item.snippet?.publishedAt);
      return views / days;
    });

    const likeRates = benchmarkVideos.map((item: any) => {
      const views = Number(item.statistics?.viewCount || 0);
      const likes = Number(item.statistics?.likeCount || 0);
      return views > 0 ? likes / views : 0;
    });

    const commentRates = benchmarkVideos.map((item: any) => {
      const views = Number(item.statistics?.viewCount || 0);
      const comments = Number(item.statistics?.commentCount || 0);
      return views > 0 ? comments / views : 0;
    });

    const currentViewsPerDay = viewCount / daysSince(publishedAt);
    const currentLikeRate = viewCount > 0 ? likeCount / viewCount : 0;
    const currentCommentRate = viewCount > 0 ? commentCount / viewCount : 0;

    const avgViewsPerDay = avg(viewRates) || 1;
    const avgLikeRate = avg(likeRates) || 0.01;
    const avgCommentRate = avg(commentRates) || 0.001;

    const momentumScore = ratioScore(currentViewsPerDay / avgViewsPerDay);
    const engagementScore = clamp(
      ratioScore(currentLikeRate / avgLikeRate) * 0.6 +
        ratioScore(currentCommentRate / avgCommentRate) * 0.4
    );

    const titleScores = textScore(title, description);

    const viralScore = clamp(
      momentumScore * 0.4 +
        engagementScore * 0.3 +
        titleScores.hookScore * 0.15 +
        titleScores.ctrScore * 0.1 +
        titleScores.seoScore * 0.05
    );

    return NextResponse.json({
      viralScore,
      ctrScore: titleScores.ctrScore,
      seoScore: titleScores.seoScore,
      hookScore: titleScores.hookScore,
      thumbnailScore: titleScores.thumbnailScore,
      engagementScore,
      momentumScore,
      level: getLevel(viralScore),
      summary:
        viralScore >= 70
          ? "Above channel average"
          : viralScore >= 50
          ? "Near channel average"
          : "Below channel average",
      improvement:
        momentumScore < 60
          ? "Needs more views than usual"
          : engagementScore < 60
          ? "Needs more likes/comments"
          : titleScores.hookScore < 60
          ? "Improve title hook"
          : "Keep this format",
      stats: {
        viewCount,
        likeCount,
        commentCount,
        publishedAt,
        currentViewsPerDay: Math.round(currentViewsPerDay),
        channelAvgViewsPerDay: Math.round(avgViewsPerDay),
        currentLikeRate: Number((currentLikeRate * 100).toFixed(2)),
        channelAvgLikeRate: Number((avgLikeRate * 100).toFixed(2)),
        currentCommentRate: Number((currentCommentRate * 100).toFixed(2)),
        channelAvgCommentRate: Number((avgCommentRate * 100).toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Benchmark viral score error:", error);

    return NextResponse.json(
      { error: "Benchmark viral score failed" },
      { status: 500 }
    );
  }
}