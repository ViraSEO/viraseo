export async function openrouterChat(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY missing");
  }

  const models = [
    "qwen/qwen3-235b-a22b:free",
    "deepseek/deepseek-r1:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "nousresearch/hermes-3-llama-3.1-405b:free",
  ];

  for (const model of models) {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "ViraSEO",
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data?.choices?.[0]?.message?.content || "";
      }

      console.log("OpenRouter model failed:", model);
      console.log("Status:", response.status);
      console.log("Data:", data);
    } catch (error) {
      console.log("OpenRouter model crashed:", model, error);
    }
  }

  throw new Error("All OpenRouter free models failed");
}