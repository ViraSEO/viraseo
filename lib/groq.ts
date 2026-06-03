export async function groqChat(messages: any) {
  const keys = [
    process.env.GROQ_API_KEY_1,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY_3,
    process.env.GROQ_API_KEY_4,
    process.env.GROQ_API_KEY_5,
  ].filter(Boolean);

  if (!keys.length) {
    throw new Error("No Groq API keys found in .env.local");
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages,
            temperature: 0.7,
            response_format: {
              type: "json_object",
            },
          }),
        }
      );

      if (response.ok) {
        return await response.json();
      }

      const errorText = await response.text();

      console.log(`Groq key ${i + 1} failed`);
      console.log("Status:", response.status);
      console.log("Error:", errorText);
    } catch (error) {
      console.log(`Groq key ${i + 1} crashed`);
      console.log(error);
    }
  }

  throw new Error("All Groq API keys failed");
}