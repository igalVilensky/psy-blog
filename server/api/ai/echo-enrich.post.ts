import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, archetype, coreVoice, intent } = body || {};

    if (!coreVoice) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing coreVoice for enrichment'
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

    const systemPrompt = `You are a psychological analyst extracting deep structural meaning from an "inner part" (IFS model).
Analyze the following internal voice: "${coreVoice}"
Intent: "${intent}"
Archetype: "${archetype}"

Return EXACTLY a JSON object with the following deeply insightful keys (each 1 sentence max):
- "coreBelief": The fundamental belief this part holds about themselves or the world.
- "primaryFear": What this part is most afraid will happen if it doesn't intervene.
- "coreNeed": What this part desperately wants to feel safe or resolved.
- "currentGoal": The immediate objective this part is trying to achieve right now.

RULES:
- NO markdown formatting other than the JSON block.
- MUST be strictly valid JSON.
- Compassionate, analytical tone.`;

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
                    { role: 'user', content: 'Generate the exact JSON for this part.' }
                ],
                temperature: 0.2, // Low temperature for consistent JSON
                max_tokens: 300,
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
        const aiContent = data?.choices?.[0]?.message?.content;

        if (!aiContent) {
            throw createError({
                statusCode: 502,
                statusMessage: 'Empty response from AI'
            });
        }

        let parsed = {};
        try {
            parsed = JSON.parse(aiContent);
        } catch (e) {
            console.error('Failed to parse AI response as JSON:', aiContent);
            throw createError({
                statusCode: 502,
                statusMessage: 'Invalid JSON from AI'
            });
        }

        return parsed;
    } catch (err: any) {
        console.error('Error in echo-enrich API:', err);
        throw createError({
            statusCode: 500,
            statusMessage: err.message || 'Internal server error'
        });
    }
});
