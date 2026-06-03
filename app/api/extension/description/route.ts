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
        { error: "Title is required", description: "" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing", description: "" },
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
        max_tokens: 600,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a YouTube SEO expert. Detect the language of the input and write the description in the same language. Return only valid JSON.",
          },
          {
            role: "user",
            content: `
Create a YouTube video description for this title:

"${title}"

Rules:
- Do not mention the detected language
- Do not say "here is" or "here's"
- Output only the final description text
- Detect the language of the title
- Use the same language as the title
- 2 short paragraphs
- Add a natural call to action
- Add 5 relevant hashtags at the end
- No fake claims
- No excessive emojis
- No markdown

Return ONLY valid JSON:
{
  "description": "description text here"
}
`,
          },
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("GROQ DESCRIPTION ERROR:", data);

      return NextResponse.json(
        { error: data?.error?.message || "Groq description failed", description: "" },
        { status: 500, headers: corsHeaders }
      );
    }

    const text = data?.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(text);

    return NextResponse.json(
      { description: parsed.description || "" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("DESCRIPTION API ERROR:", error);

    return NextResponse.json(
      { error: "Server error", description: "" },
      { status: 500, headers: corsHeaders }
    );
  }
}