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

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required", titles: [] },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing", titles: [] },
        { status: 500, headers: corsHeaders }
      );
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.9,
        max_tokens: 500,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
  "You are an elite YouTube SEO expert. Detect the language of the input and generate titles in the same language. Return only valid JSON.",
          },
          {
            role: "user",
            content: `
Generate 5 high quality YouTube titles for this topic.

IMPORTANT:
- Detect the language of the user's title.
- If the title is Turkish, generate Turkish titles.
- If the title is English, generate English titles.
- Keep the output in the same language as the input title.

"${title}"

Rules:
- Titles must be written in the SAME LANGUAGE as the input title
- Maximum 95 characters
- Natural human style
- No clickbait spam
- No ALL CAPS
- No excessive exclamation marks
- Use curiosity naturally
- Use numbers only when useful
- Optimized for high CTR
- Suitable for YouTube recommendations
- Make every title different

Return ONLY valid JSON:

{
  "titles": [
    "title 1",
    "title 2",
    "title 3",
    "title 4",
    "title 5"
  ]
}
`,
          },
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("GROQ ERROR:", data);

      return NextResponse.json(
        {
          error: data?.error?.message || "Groq request failed",
          titles: [],
        },
        { status: 500, headers: corsHeaders }
      );
    }

    const text = data?.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(text);

    const titles = (parsed.titles || [])
      .filter((t: unknown) => typeof t === "string")
      .map((t: string) => t.trim())
      .filter(Boolean)
      .slice(0, 5);

    return NextResponse.json(
      { titles },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("API ROUTE ERROR:", error);

    return NextResponse.json(
      { error: "Server error", titles: [] },
      { status: 500, headers: corsHeaders }
    );
  }
}