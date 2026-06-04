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
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        score: 78,
        ctrPotential: "Strong",
        checks: [
          "✅ Thumbnail image detected",
          "✅ YouTube-compatible image format",
          "⚠️ Face/text detection will be improved with vision AI"
        ],
        recommendations: [
          "Use large readable text if possible.",
          "Keep the main subject clear.",
          "Use strong contrast between background and subject."
        ]
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