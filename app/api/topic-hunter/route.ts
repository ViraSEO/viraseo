import { NextResponse } from "next/server";
import { geminiChat } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const niche = body.niche || "";

    if (!niche.trim()) {
      return NextResponse.json(
        { error: "Niche is required" },
        { status: 400 }
      );
    }

    const text = await geminiChat(`
You are a YouTube viral strategist.

Generate 4 viral YouTube video ideas for this niche:

${niche}

Return ONLY valid JSON:

{
  "ideas": [
    {
      "title": "",
      "trendScore": 0,
      "competition": "",
      "hook": ""
    }
  ]
}
`);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return NextResponse.json(JSON.parse(cleanText));
  } catch (error) {
    console.error("Topic hunter error:", error);

    return NextResponse.json(
      { error: "Topic hunter failed" },
      { status: 500 }
    );
  }
}