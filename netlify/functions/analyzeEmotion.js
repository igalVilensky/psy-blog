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
        const { affect, labeling, somatic, context, triggers, intensity, needs, onboarding, mode } = body;

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
            somatic: somatic?.locations || [],
            tags: [...(triggers || []), ...(context?.triggers || [])],
            needs: needs || [],
            mode: mode || 'standard'
        };

        // 2. Prepare LLM Prompt
        const prompt = `
    Ты - мудрый психотерапевт и поддерживающий коуч Mind Lab.
    Твоя задача - дать пользователю глубокую, бережную обратную связь на основе его чекина.
    
    ДАННЫЕ СОСТОЯНИЯ:
    - Квадрант: ${quadrant.toUpperCase()} Zone (Валентность: ${valence.toFixed(2)}, Энергия: ${arousal.toFixed(2)})
    - Названная эмоция: ${state.emotion} (${state.nuance})
    - Интенсивность: ${state.intensity}/10
    - Ощущения в теле: ${state.somatic.join(", ") || "не указаны"}
    - Контекст/Триггеры: ${state.tags.join(", ") || "не указаны"}
    ${state.mode === 'deep' ? `- Что сейчас хочется (потребности): ${state.needs.join(", ") || "не указаны"}` : ''}

    ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ:
    - Цели: ${(onboarding?.goals || []).join(", ") || "Самопознание"}
    - Ценности: ${(onboarding?.values || []).join(", ") || "Развитие"}
    - Стиль общения: ${onboarding?.persona?.tone || "Эмпатичный, профессиональный"}

    ТРЕБОВАНИЯ К ОТВЕТУ:
    1. Напиши около 15-20 строк текста (примерно 200-300 слов).
    2. Говори как профессиональный, но очень теплый терапевт. Используй "Вы".
    3. Структура ответа:
       - Валидация и нормализация текущего состояния (признание чувств).
       - Отражение связи между телом, эмоцией и контекстом.
       - Если это режим 'deep', удели особое внимание тому, "чего хочется", предложив как это можно реализовать бережно.
       - Предложи 2-3 очень простых, "безопасных" шага для самопомощи прямо сейчас.
       - В конце мягко напомни, что регулярное возвращение к Эмоциональному Компасу помогает лучше откалибровать свою "внутреннюю навигацию".
    4. Тон должен быть очень деликатным, без директивных советов.

    Верни ответ ТОЛЬКО в формате JSON:
    {
      "reflection": "Весь твой текст здесь с переносами строк \n\n...",
      "shortSummary": "Краткое резюме одной фразой"
    }
    `;

        // 3. Call Groq AI
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Отвечай на русском языке. Используй только валидный JSON." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.7,
                max_tokens: 1000
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
                reflection: "Ваше состояние важно. Сейчас вы чувствуете " + state.emotion + ". Постарайтесь уделить себе немного внимания и вернуться к практике позже.",
                shortSummary: "Бережная поддержка вашего состояния."
            };
        }

        // 4. Construct Final Response
        const responsePayload = {
            analysis: {
                state: `${quadrant.toUpperCase()} ZONE`,
                emotion: state.emotion,
                intensity: state.intensity
            },
            reflection: aiContent.reflection,
            shortSummary: aiContent.shortSummary,
            mode: state.mode
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
