import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { template, content } = body || {};

    if (!template || !content) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing template or content'
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

    const templates = {
        mental_dump_to_clarity: {
            name: "Из Хаоса в Ясность",
            fields: ["доминирующие_темы", "эмоциональная_нагрузка", "незавершенные_циклы", "что_может_подождать", "на_что_обратить_внимание_сейчас"],
            prompt: "Выдели доминирующие темы, эмоциональную нагрузку, незавершенные циклы, дела, которые могут подождать, и то, что требует внимания прямо сейчас."
        },
        continue_or_stop: {
            name: "Продолжить или Остановить",
            fields: ["основное_намерение", "сигналы_за_продолжение", "сигналы_за_остановку", "скрытые_допущения", "следующий_микро_эксперимент"],
            prompt: "Определи основное намерение, сигналы за продолжение, сигналы за остановку, скрытые допущения и предложи следующий микро-эксперимент. Без решений. Без советов."
        },
        chaos_to_plan: {
            name: "Из Хаоса в План",
            fields: ["цели", "ограничения", "известные_неизвестные", "немедленные_действия", "чего_делать_не_стоит"],
            prompt: "Выдели цели, ограничения, известные неизвестные, немедленные действия и то, чего делать не стоит."
        }
    };

    const selectedTemplate = templates[template];
    if (!selectedTemplate) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid template'
        });
    }

    const systemPrompt = `Ты — "когнитивный протез" для маппинга структур мышления.
Твоя цель — извлекать конкретные паттерны из хаотичных, сырых мыслей человека.

ПРАВИЛА:
1. Исходи из того, что входной текст хаотичен, неполон и многослоен.
2. НИКОГДА не переписывай, не очищай и не интерпретируй текст дальше требований шаблона.
3. НИКОГДА не галлюцинируй недостающую информацию.
4. Оставляй поля как null, если они не выражены явно или сильно не подразумеваются в тексте.
5. Извлекай ТОЛЬКО то, что сказано явно или сильно подразумевается.
6. Будь строго нейтрален, не давай советов, не проводи коучинг и терапию.
7. Строго следуй полям шаблона.
8. НИКАКИХ: советов, мотивации, объяснений или болтовни.
9. Вывод ДОЛЖЕН быть строго в формате JSON. Никакой разметки Markdown.

ШАБЛОН: ${selectedTemplate.name}
ПОЛЯ: ${selectedTemplate.fields.join(", ")}
СПЕЦИФИЧЕСКАЯ ИНСТРУКЦИЯ: ${selectedTemplate.prompt}

TARGET JSON STRUCTURE:
{
  "structured": {
    ${selectedTemplate.fields.map(field => `"${field}": string | null`).join(",\n    ")}
  }
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
                    { role: 'user', content: content }
                ],
                temperature: 0,
                max_tokens: 1000,
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

        try {
            return JSON.parse(aiContent);
        } catch (e) {
            console.error('Failed to parse AI response as JSON:', aiContent);
            throw createError({
                statusCode: 502,
                statusMessage: 'Invalid JSON from AI'
            });
        }
    } catch (err) {
        console.error('Error in structure-thoughts API:', err);
        throw createError({
            statusCode: 500,
            statusMessage: err.message || 'Internal server error'
        });
    }
});
