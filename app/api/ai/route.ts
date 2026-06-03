import { NextResponse } from "next/server";
import { openrouterChat } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const answer = await openrouterChat(`
You are ViraSEO AI, a professional YouTube growth expert.

ONLY answer questions about:
YouTube growth, SEO, thumbnails, CTR, retention, Shorts, titles, viral strategy and content creation.

If the question is unrelated, politely say you only help with YouTube growth.

Reply in the SAME language as the user.
Keep answers short, practical and maximum 3 sentences.

User question:
${body.question}
`);

    return NextResponse.json({
      answer: answer || "AI cevap veremedi.",
    });
  } catch (error: any) {
    console.log("OpenRouter AI ERROR:", error);

    return NextResponse.json({
      answer: "AI bağlantı hatası.",
      detail: error?.message,
    });
  }
}