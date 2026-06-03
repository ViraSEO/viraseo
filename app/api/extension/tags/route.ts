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
        { error: "Title is required", tags: [] },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing", tags: [] },
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
        temperature: 0.7,
        max_tokens: 400,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a YouTube SEO expert. Detect the language of the input and generate tags in the same language. Return only valid JSON.",
          },
          {
            role: "user",
            content: `
Generate 15 YouTube SEO tags for this video title:

"${title}"

Rules:
- Detect the title language
- If the title is Turkish, generate Turkish tags
- If the title is English, generate English tags
- Use short searchable tags
- No hashtags
- No duplicate tags
- No explanations

Return ONLY valid JSON:
{
  "tags": [
    "tag 1",
    "tag 2",
    "tag 3"
  ]
}
`,
          },
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("GROQ TAG ERROR:", data);

      return NextResponse.json(
        { error: data?.error?.message || "Groq tag request failed", tags: [] },
        { status: 500, headers: corsHeaders }
      );
    }

    const text = data?.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(text);

    const tags = (parsed.tags || [])
      .filter((t: unknown) => typeof t === "string")
      .map((t: string) => t.trim())
      .filter(Boolean)
      .slice(0, 15);

    return NextResponse.json(
      { tags },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("TAG API ROUTE ERROR:", error);

    return NextResponse.json(
      { error: "Server error", tags: [] },
      { status: 500, headers: corsHeaders }
    );
  }
}