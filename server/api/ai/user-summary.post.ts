import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { uid, onboarding } = body;

    if (!uid || !onboarding) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing uid or onboarding data',
        });
    }

    // Check for API Key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.warn('GROQ_API_KEY is not set. Returning mock data.');
        // Fallback to mock data if no key (for dev safety)
        return getMockSummary(onboarding);
    }

    try {
        const prompt = constructPrompt(onboarding);

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "Ты — опытный психолог-консультант. Твоя задача — проанализировать ответы пользователя и составить краткий психологический портрет и рекомендации. Отвечай ТОЛЬКО в формате JSON."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500,
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API Error:', response.status, errorText);
            throw new Error(`Groq API returned ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        let parsedContent;
        try {
            parsedContent = JSON.parse(content);
        } catch (e) {
            console.error('Failed to parse AI response:', content);
            return getMockSummary(onboarding);
        }

        return {
            summary: parsedContent.summary || "Не удалось сгенерировать резюме.",
            recommendations: parsedContent.recommendations || [],
            strengths: parsedContent.strengths || [],
            risks: parsedContent.risks || [],
            createdAt: new Date().toISOString()
        };

    } catch (error) {
        console.error('Error in user-summary API:', error);
        // Fallback on error
        return getMockSummary(onboarding);
    }
});

function constructPrompt(data) {
    return `
    Проанализируй профиль пользователя на основе его ответов:

    1. Цели: ${data.goals?.join(', ') || 'Не указаны'}
    2. Предпочитаемые форматы: ${data.modalities?.join(', ') || 'Не указаны'}
    3. Эмоциональное состояние (0-10):
       - Стресс: ${data.emotionalBaseline?.stress}
       - Энергия: ${data.emotionalBaseline?.energy}
       - Стабильность: ${data.emotionalBaseline?.stability}
    4. Сферы жизни для проработки: ${data.domains?.join(', ') || 'Не указаны'}
    5. Поведенческий портрет:
       - Мышление: ${data.persona?.thinking}
       - Обработка эмоций: ${data.persona?.processing}
       - Структура: ${data.persona?.structure}
       - Тон: ${data.persona?.tone}
    6. Ценности: ${data.values?.join(', ') || 'Не указаны'}
    7. Желаемый формат работы: ${data.guidanceLevel}

    Верни JSON объект со следующими полями:
    {
      "summary": "Краткое описание психологического профиля пользователя (3-4 предложения). Обращайся к пользователю на 'вы'. Учти его уровень стресса и энергии.",
      "strengths": ["Сильная сторона 1", "Сильная сторона 2", "Сильная сторона 3"],
      "risks": ["Риск 1 (на что обратить внимание)", "Риск 2"],
      "recommendations": ["Конкретная рекомендация 1", "Конкретная рекомендация 2", "Конкретная рекомендация 3"]
    }
    
    Рекомендации должны быть конкретными и опираться на выбранные пользователем форматы (modalities).
  `;
}

function getMockSummary(onboarding) {
    const goals = onboarding.goals || [];
    const modalities = onboarding.modalities || [];

    return {
        summary: `(MOCK) На основе ваших целей (${goals.join(', ')}) мы составили этот профиль. Мы учли ваш интерес к ${modalities.join(', ')}.`,
        recommendations: [
            `Попробуйте практику: ${modalities[0] || 'Дыхание'}`,
            `Фокус на цели: ${goals[0] || 'Спокойствие'}`,
            'Регулярно отмечайте свое состояние'
        ],
        strengths: ['Осознанность', 'Мотивация'],
        risks: ['Высокая нагрузка'],
        createdAt: new Date().toISOString()
    };
}
