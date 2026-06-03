export async function geminiChat(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();

      if (response.status === 429) {
        throw new Error("AI quota limit reached. Please try again later.");
      }

      throw new Error(text);
    }

    const data = await response.json();

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error: any) {
    console.error("Gemini fetch error:", error);

    if (
      error?.message?.includes("fetch failed") ||
      error?.cause?.code === "UND_ERR_CONNECT_TIMEOUT"
    ) {
      throw new Error("AI connection timed out. Please try again.");
    }

    throw error;
  }
}