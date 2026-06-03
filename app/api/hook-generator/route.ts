import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body.title || "";

    if (!title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a YouTube hook expert. Return short, high CTR YouTube hooks only.",
          },
          {
            role: "user",
            content: `
Original title:
${title}

Generate 5 stronger YouTube hook titles.

Rules:
- Same language as title
- No explanation
- No markdown
- Each hook max 10 words
- Make them curiosity-driven
- Return JSON only:
{
  "hooks": ["hook 1", "hook 2", "hook 3", "hook 4", "hook 5"]
}
`,
          },
        ],
        temperature: 0.7,
        response_format: {
          type: "json_object",
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "AI hook request failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(text);

    return NextResponse.json({
      hooks: Array.isArray(parsed.hooks) ? parsed.hooks : [],
    });
  } catch (error) {
    console.error("Hook generator error:", error);

    return NextResponse.json(
      { error: "Hook generation failed" },
      { status: 500 }
    );
  }
}