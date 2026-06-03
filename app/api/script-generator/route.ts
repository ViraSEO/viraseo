import { NextResponse } from "next/server";
import { geminiChat } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const idea = body.idea || "";

    if (!idea.trim()) {
      return NextResponse.json(
        { error: "Idea is required" },
        { status: 400 }
      );
    }

    const text = await geminiChat(`
You are a YouTube Shorts script expert.

Create a short YouTube Shorts script for this idea:

${idea}

Return in the same language as the idea.

Return ONLY valid JSON:

{
  "hook": "",
  "scene1": "",
  "scene2": "",
  "scene3": "",
  "cta": "",
  "caption": "",
  "hashtags": ["", "", ""]
}
`);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return NextResponse.json(JSON.parse(cleanText));
  } catch (error) {
    console.error("Script generator error:", error);

    return NextResponse.json(
      { error: "Script generation failed" },
      { status: 500 }
    );
  }
}