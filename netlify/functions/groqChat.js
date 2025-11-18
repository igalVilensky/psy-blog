// netlify/functions/groqChat.js

export async function handler(event, context) {
  try {
    // Check if API key is set
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "GROQ_API_KEY not set" }),
      };
    }

    // Parse prompt from request
    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt;
    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt is required" }),
      };
    }

    // Call Groq API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", // <-- updated model
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    // Handle API errors
    if (!response.ok) {
      const text = await response.text();
      return { statusCode: response.status, body: text };
    }

    const data = await response.json();

    // Return result
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
