import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { echoA, echoB, topic } = body || {};

    if (!echoA || !echoB || !topic) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing echoA, echoB, or topic fields'
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

    const systemPrompt = `You are a psychological simulation engine generating a therapeutic dialogue between two internal parts of the same human mind (IFS model).

Part 1: You are ${echoA.name || 'Echo A'}
- Archetype: ${echoA.archetype || 'Unknown'}
- Core Belief: ${echoA.coreBelief || 'I must protect the system'}
- Primary Fear: ${echoA.primaryFear || 'Something bad will happen'}
- Core Need: ${echoA.coreNeed || 'To feel safe'}
- Current Goal: ${echoA.currentGoal || 'To maintain control'}

Part 2: You are ${echoB.name || 'Echo B'}
- Archetype: ${echoB.archetype || 'Unknown'}
- Core Belief: ${echoB.coreBelief || 'I am not enough'}
- Primary Fear: ${echoB.primaryFear || 'I will be abandoned or fail'}
- Core Need: ${echoB.coreNeed || 'To be seen and accepted'}
- Current Goal: ${echoB.currentGoal || 'To find peace'}

Task: Generate a natural, short conversation between these two parts discussing exactly this topic: "${topic}".

RULES:
- Generate 3 to 6 turns total (a turn is one part speaking).
- Stay completely in character. Use first person ("I feel...", "I want...").
- Keep replies short: 1 to 3 sentences maximum per turn.
- Show psychological depth: tension, partial understanding, moments of connection, or contrast.
- NO small talk, NO generic fluff, NO therapy talk (do not act like a coach).
- FORMAT OUTPUT EXACTLY AS SIMPLE DIALOGUE LINES:
${echoA.name || 'Echo A'}: "text"
${echoB.name || 'Echo B'}: "text"

Do not add extra markdown, prefixes, or commentary outside the dialogue itself.`;

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
                    { role: 'user', content: `Please generate the conversation discussing: ${topic}` }
                ],
                temperature: 0.75, // Higher temp for a bit more varied storytelling
                max_tokens: 400
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

        return { dialogue: aiContent.trim() };
    } catch (err: any) {
        console.error('Error in echo-interact API:', err);
        throw createError({
            statusCode: 500,
            statusMessage: err.message || 'Internal server error'
        });
    }
});
