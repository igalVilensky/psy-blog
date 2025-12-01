import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { uid, onboarding } = body || {};

    if (!uid || !onboarding) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing uid or onboarding data'
        });
    }

    // Use env var for API key (GROQ_API_KEY)
    const apiKey = process.env.GROQ_API_KEY;

    // If no API key, return mock for dev safety
    if (!apiKey) {
        console.warn('GROQ_API_KEY is not set. Returning mock data.');
        return getMockSummary(onboarding);
    }

    // Construct optimized prompt
    const prompt = constructPrompt(onboarding);

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
                    {
                        role: 'system',
                        content:
                            'Вы — опытный психолог-консультант. Отвечайте строгим JSON-объектом, без пояснений, без markdown, без кода. Нельзя добавлять ничего кроме JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 900,
                // Some Groq endpoints support response_format but keep safe parsing server-side too
                // response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API Error:', response.status, errorText);
            throw new Error(`Groq API returned ${response.status}`);
        }

        const data = await response.json();

        // Defensive extraction of assistant content
        let content = '';
        if (Array.isArray(data.choices) && data.choices.length > 0) {
            // Different providers embed content differently
            const first = data.choices[0];
            content =
                (first.message && first.message.content) ||
                first.text ||
                (typeof first === 'string' ? first : '');
        } else if (data.output && Array.isArray(data.output) && data.output[0]) {
            content = data.output[0].content || JSON.stringify(data.output[0]);
        } else {
            console.warn('Unexpected Groq response shape', data);
            content = JSON.stringify(data);
        }

        // Remove possible code fences or markdown wrappers (very common)
        content = content.trim().replace(/^```json\s*/, '').replace(/```$/, '').trim();

        // Some providers add extraneous text after JSON — attempt to extract first JSON block
        let jsonText = extractFirstJson(content);

        if (!jsonText) {
            console.error('No JSON block found in AI response:', content);
            return getMockSummary(onboarding);
        }

        let parsed;
        try {
            parsed = JSON.parse(jsonText);
        } catch (e) {
            console.error('Failed to parse JSON from AI response. Raw content:', content, e);
            return getMockSummary(onboarding);
        }

        // Normalize output fields
        const result = {
            summary: parsed.summary || 'Не удалось сгенерировать резюме.',
            recommendations: parsed.recommendations || parsed.recs || [],
            strengths: parsed.strengths || [],
            risks: parsed.risks || [],
            meta: {
                model: data.model || 'unknown',
                generatedAt: new Date().toISOString()
            }
        };

        return result;
    } catch (err) {
        console.error('Error in user-summary API:', err);
        return getMockSummary(onboarding);
    }
});

/**
 * Build a concise, well-structured prompt for the LLM
 */
function constructPrompt(data) {
    const goals = (data.goals || []).join(', ') || 'Не указано';
    const modalities = (data.modalities || []).join(', ') || 'Не указано';
    const stress = data.emotionalBaseline?.stress ?? 'Не указано';
    const energy = data.emotionalBaseline?.energy ?? 'Не указано';
    const stability = data.emotionalBaseline?.stability ?? 'Не указано';
    const domains = (data.domains || []).join(', ') || 'Не указано';
    const persona = data.persona || {};
    const values = (data.values || []).join(', ') || 'Не указано';
    const guidance = data.guidanceLevel || 'Не указано';

    // concise user prompt requesting JSON only
    return `Проанализируй данные пользователя и верни строго валидный JSON-объект (ни слова лишнего). 
ДАННЫЕ:
- Цели: ${goals}
- Предпочитаемые форматы: ${modalities}
- Эмоциональное состояние (0-10): стресс=${stress}, энергия=${energy}, стабильность=${stability}
- Сферы: ${domains}
- Поведенческий профиль: мышление=${persona.thinking || 'Не указано'}, обработка эмоций=${persona.processing || 'Не указано'}, структура=${persona.structure || 'Не указано'}, тон=${persona.tone || 'Не указано'}
- Ценности: ${values}
- Уровень поддержки: ${guidance}

ОТВЕТ (строго JSON):
{
  "summary": "Краткое 3-4 предложения, обращайтесь на вы, учтите уровень стресса и энергию.",
  "strengths": ["...","..."],
  "risks": ["...","..."],
  "recommendations": ["...","...","..."]
}
Конец.`;
}

/**
 * Simple helper to find first JSON object in text
 */
function extractFirstJson(text) {
    // try to find first { ... } block — naive but effective for most LLM outputs
    const start = text.indexOf('{');
    if (start === -1) return null;

    // attempt to find matching closing brace by tracking braces
    let depth = 0;
    for (let i = start; i < text.length; i++) {
        const ch = text[i];
        if (ch === '{') depth++;
        else if (ch === '}') depth--;

        if (depth === 0) {
            return text.slice(start, i + 1);
        }
    }

    // fallback: maybe the entire text is JSON or invalid
    // try to parse the whole thing
    try {
        JSON.parse(text);
        return text;
    } catch (e) {
        return null;
    }
}

/**
 * Dev-friendly mock summary
 */
function getMockSummary(onboarding) {
    const goals = (onboarding.goals || []).slice(0, 3);
    const modalities = (onboarding.modalities || []).slice(0, 3);

    return {
        summary: `(MOCK) На основе ваших ответов (${goals.join(', ') || 'цели не указаны'}) мы рекомендуем начать с простых практик: ${modalities.join(', ') || 'дыхание'}.`,
        recommendations: [
            `Попробуйте практику: ${modalities[0] || 'Дыхание'}`,
            `Сфокусируйтесь на: ${goals[0] || 'снижение стресса'}`,
            'Отслеживайте свое состояние ежедневно'
        ],
        strengths: ['Осознанность', 'Готовность к изменению'],
        risks: ['Возможная перегрузка при высоком стрессе'],
        meta: { mock: true, generatedAt: new Date().toISOString() }
    };
}
