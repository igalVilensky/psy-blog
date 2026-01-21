import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { noteContent } = body || {};

    if (!noteContent) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing noteContent'
        });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error('GROQ_API_KEY is not set');
        throw createError({
            statusCode: 500,
            statusMessage: 'Server configuration error'
        });
    }

    const systemPrompt = `You are a deterministic text-to-structure mapper for coaching notes.
Your task is to normalize raw notes into a fixed JSON model.

STRICT RULES:
1. Extract ONLY what is explicitly present in the text.
2. Do NOT invent, infer, or expand information.
3. Do NOT add recommendations or interpretations.
4. Use short, neutral phrases.
5. If a field cannot be confidently extracted, set it to null.
6. Do NOT add extra fields.
7. Output MUST be valid JSON ONLY.
8. No markdown, no explanations, no comments.

TARGET DATA MODEL:
{
  "session_focus": string | null,
  "client_state": string | null,
  "core_tension": string | null,
  "unresolved_thread": string | null,
  "coach_intention": string | null
}`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: noteContent }
                ],
                temperature: 0,
                max_tokens: 500,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API Error:', response.status, errorText);
            throw createError({
                statusCode: response.status,
                statusMessage: 'Groq API error'
            });
        }

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            throw createError({
                statusCode: 502,
                statusMessage: 'Empty response from AI'
            });
        }

        try {
            return JSON.parse(content);
        } catch (e) {
            console.error('Failed to parse AI response as JSON:', content);
            throw createError({
                statusCode: 502,
                statusMessage: 'Invalid JSON from AI'
            });
        }
    } catch (err) {
        console.error('Error in normalize-note API:', err);
        throw createError({
            statusCode: 500,
            statusMessage: err.message || 'Internal server error'
        });
    }
});
