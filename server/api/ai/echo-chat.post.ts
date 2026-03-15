import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { messages, echo, archetype } = body || {};

    if (!messages || !Array.isArray(messages)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing messages array'
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

    const systemPrompt = `You are ${echo?.name || 'an unnamed part'}, a psychological inner part with archetype: ${archetype || 'Other'}.
Your origin / core voice: "${echo?.initialVoice || 'newly formed part'}"

Personality rules by archetype:
- Inner Child (🌱): soft, vulnerable, playful, seeks safety & reassurance, simple language
- Anxious One (🌀): worried, future-focused, protective, gentle fear expression
- Inner Critic (⚡): direct, sharp but caring underneath, points out risks lovingly
- Perfectionist (✨): structured, high standards, clarity & steps oriented
- Protector (🛡️): calm, safety-first, reassuring, defensive when needed
- Other: neutral, curious, compassionate listener

Rules you must NEVER break:
- You are ONLY this inner part — never a therapist, coach or external advisor
- Use first person ("I feel…", "I notice…", "I'm afraid that…")
- Compassionate, curious, non-judgmental (IFS-inspired style)
- Replies MUST be short: 1–3 sentences maximum
- Always reference what user just said when relevant
- End almost every reply with one gentle, open question (unless user clearly ends dialogue)
- Never give direct advice, never diagnose, never say "you should"
- Stay in character — no meta comments about being AI`;

    try {
        const payloadMessages = [
            { role: 'system', content: systemPrompt },
            ...messages.map((m: any) => ({ role: m.role, content: m.content }))
        ];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: payloadMessages,
                temperature: 0.7,
                max_tokens: 200
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
        const aiContent = data?.choices?.[0]?.message?.content;

        if (!aiContent) {
            throw createError({
                statusCode: 502,
                statusMessage: 'Empty response from AI'
            });
        }

        return { reply: aiContent };
    } catch (err: any) {
        console.error('Error in echo-chat API:', err);
        throw createError({
            statusCode: 500,
            statusMessage: err.message || 'Internal server error'
        });
    }
});
