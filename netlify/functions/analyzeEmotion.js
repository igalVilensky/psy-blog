import fetch from "node-fetch";
import { tools } from "./tools";

// Helper: Calculate Quadrant based on Valence/Arousal
function getQuadrant(valence, arousal) {
    if (valence >= 0 && arousal >= 0) return "yellow"; // High Energy / Pleasant
    if (valence < 0 && arousal >= 0) return "red";     // High Energy / Unpleasant
    if (valence < 0 && arousal < 0) return "blue";     // Low Energy / Unpleasant
    if (valence >= 0 && arousal < 0) return "green";   // Low Energy / Pleasant
    return "yellow"; // Default
}

// Helper: Calculate Score for a Tool
function calculateScore(tool, state) {
    let score = 0;
    const { valence, arousal, intensity, tags, somatic } = state;
    const quadrant = getQuadrant(valence, arousal);

    // 1. State Match (40%)
    if (tool.targetQuadrants.includes(quadrant)) {
        score += 40;
    }

    // 2. Goal/Tag Match (30%)
    // Check overlap between tool.tags and user's context tags + triggers
    const userTags = (tags || []).map(t => t.toLowerCase());
    const toolTags = (tool.tags || []).map(t => t.toLowerCase());
    const matchCount = toolTags.filter(t => userTags.includes(t)).length;

    if (matchCount > 0) {
        score += Math.min(30, matchCount * 10); // Cap at 30
    }

    // 3. Somatic Match (20%)
    // Check overlap between tool.type/tags and somatic locations
    // Heuristic: if tool mentions "breathing" or "body" and user has somatic markers
    const somaticLocations = somatic?.locations || [];
    if (somaticLocations.length > 0) {
        if (tool.type === 'somatic' || tool.type === 'breathing' || tool.type === 'movement') {
            score += 20;
        }
    }

    // 4. Intensity Adjustment (10%)
    // High intensity needs stronger tools (breathing, grounding)
    if (intensity > 7) {
        if (tool.type === 'grounding' || tool.type === 'breathing') {
            score += 10;
        }
    } else {
        // Low intensity might prefer cognitive/journaling
        if (tool.type === 'cognitive' || tool.type === 'journaling') {
            score += 5;
        }
    }

    return score;
}

export async function handler(event, context) {
    // CORS headers
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    try {
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY missing");
        }

        const body = JSON.parse(event.body);
        const { affect, labeling, somatic, context, triggers, intensity, cognition, onboarding } = body;

        // 1. Analyze State
        const valence = affect?.valence || 0;
        const arousal = affect?.arousal || 0;
        const quadrant = getQuadrant(valence, arousal);

        const state = {
            valence,
            arousal,
            intensity: intensity || affect?.intensity || 5,
            emotion: labeling?.primary || "Unknown",
            nuance: labeling?.secondary || "",
            somatic: somatic || { locations: [] },
            tags: [...(triggers || []), ...(context?.tags || [])],
            narrative: cognition?.narrative || "",
            facts: cognition?.facts || ""
        };

        // 2. Score Tools
        const scoredTools = tools.map(tool => ({
            ...tool,
            score: calculateScore(tool, state)
        })).sort((a, b) => b.score - a.score);

        // Select Top Tools
        const primaryTool = scoredTools[0];
        const secondaryTools = scoredTools.slice(1, 4);

        // 3. Prepare LLM Prompt
        const prompt = `
    Ты - эксперт-психолог Mind Lab.
    Пользователь находится в состоянии:
    - Квадрант: ${quadrant} (Валентность: ${valence.toFixed(2)}, Энергия: ${arousal.toFixed(2)})
    - Эмоция: ${state.emotion} (${state.nuance})
    - Интенсивность: ${state.intensity}/10
    - Ощущения в теле: ${state.somatic.locations.join(", ") || "нет"}
    - Контекст: ${state.tags.join(", ")}
    - Мысли (Нарратив): "${state.narrative}"
    - Факты: "${state.facts}"

    ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ (Учитывай это при рекомендации):
    - Цели: ${(onboarding?.goals || []).join(", ") || "Не указаны"}
    - Ценности: ${(onboarding?.values || []).join(", ") || "Не указаны"}
    - Базовый уровень стресса: ${onboarding?.emotionalBaseline?.stress || "?"}/10
    - Стиль общения (Persona): ${onboarding?.persona?.tone || "Эмпатичный, профессиональный"}

    Мы подобрали инструмент: "${primaryTool.title}" (${primaryTool.description}).

    Твоя задача:
    1. Написать "reasoning" (почему это подходит) - 2-3 предложения, обращайся к пользователю на "вы".
       - Начни с фразы "Мы рекомендуем этот инструмент, потому что..." или похожей.
       - ОБЯЗАТЕЛЬНО свяжи рекомендацию с целями или ценностями пользователя, если они указаны.
       - Используй стиль общения: ${onboarding?.persona?.tone || "Поддерживающий"}.
    2. Написать "routine" (мини-рутина из 3 шагов) для этого момента.

    Верни ответ ТОЛЬКО в формате JSON:
    {
      "reasoning": "...",
      "routine": [
        { "step": 1, "action": "..." },
        { "step": 2, "action": "..." },
        { "step": 3, "action": "..." }
      ]
    }
    `;

        // 4. Call Groq AI
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Отвечай только валидным JSON." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.5,
                max_tokens: 500
            })
        });

        if (!groqRes.ok) {
            throw new Error(`Groq API error: ${groqRes.status}`);
        }

        const groqData = await groqRes.json();
        let aiContent = {};
        try {
            aiContent = JSON.parse(groqData.choices[0].message.content);
        } catch (e) {
            console.error("Failed to parse AI JSON", e);
            aiContent = {
                reasoning: "Этот инструмент поможет вам сбалансировать состояние.",
                routine: []
            };
        }

        // 5. Construct Final Response
        const responsePayload = {
            analysis: {
                state: `${quadrant.toUpperCase()} ZONE`,
                emotion: state.emotion,
                intensity: state.intensity
            },
            primary: {
                ...primaryTool,
                reasoning: aiContent.reasoning,
                matchScore: primaryTool.score
            },
            secondary: secondaryTools.map(t => ({
                id: t.id,
                title: t.title,
                matchScore: t.score
            })),
            routine: aiContent.routine
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(responsePayload)
        };

    } catch (error) {
        console.error("Error in analyzeEmotion:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
}
