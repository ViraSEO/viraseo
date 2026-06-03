import { NextResponse } from "next/server";
import { geminiChat } from "@/lib/gemini";

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("No JSON found in Gemini response");
  }

  return JSON.parse(match[0]);
}

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
You are a YouTube Shorts viral prediction expert.

Analyze this YouTube Shorts idea:

${idea}

Return ONLY raw JSON. No markdown. No explanation.

{
  "viralChance": "LOW",
  "shortsPotential": 50,
  "bestLength": "22 seconds",
  "hookStyle": "curiosity",
  "retentionPrediction": "Strong opening, medium retention",
  "swipeRisk": "MEDIUM",
  "firstSentence": "This changes everything about Shorts.",
  "improvement": "Make hook more specific"
}
`);

    const parsed = extractJson(text);

    return NextResponse.json({
      viralChance: parsed.viralChance || "MEDIUM",
      shortsPotential: Number(parsed.shortsPotential) || 50,
      bestLength: parsed.bestLength || "22 seconds",
      hookStyle: parsed.hookStyle || "curiosity",
      retentionPrediction:
        parsed.retentionPrediction || "Medium retention expected",
      swipeRisk: parsed.swipeRisk || "MEDIUM",
      firstSentence:
        parsed.firstSentence || "This could change your next Short.",
      improvement: parsed.improvement || "Improve the first 3 seconds",
    });
  } catch (error: any) {
    console.error("Shorts predictor error:", error?.message);

    return NextResponse.json(
      { error: "Shorts prediction failed" },
      { status: 500 }
    );
  }
}