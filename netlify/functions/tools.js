// netlify/functions/tools.js

export const tools = [
    // RED ZONE (High Energy / Unpleasant) - Down-regulation
    {
        id: "box_breathing",
        title: "Квадратное дыхание",
        type: "breathing",
        tags: ["Anxiety", "Stress", "Panic", "High Arousal"],
        targetQuadrants: ["red"],
        mechanism: "Parasympathetic Activation",
        description: "Классическая техника спецназа для быстрого снижения уровня стресса.",
        duration: "2 мин",
        steps: [
            "Вдох на 4 счета",
            "Задержка на 4 счета",
            "Выдох на 4 счета",
            "Задержка на 4 счета"
        ]
    },
    {
        id: "54321_grounding",
        title: "Техника 5-4-3-2-1",
        type: "grounding",
        tags: ["Anxiety", "Dissociation", "Overwhelm"],
        targetQuadrants: ["red", "blue"],
        mechanism: "Sensory Grounding",
        description: "Вернитесь в 'здесь и сейчас', используя свои органы чувств.",
        duration: "3 мин",
        steps: [
            "Найдите 5 вещей, которые можно увидеть",
            "4 вещи, которые можно потрогать",
            "3 вещи, которые можно услышать",
            "2 вещи, которые можно понюхать",
            "1 вещь, которую можно попробовать на вкус"
        ]
    },
    {
        id: "progressive_muscle_relaxation",
        title: "Прогрессивная релаксация",
        type: "somatic",
        tags: ["Tension", "Anger", "Stress", "Body"],
        targetQuadrants: ["red"],
        mechanism: "Somatic Release",
        description: "Поочередное напряжение и расслабление мышц для снятия физических зажимов.",
        duration: "5 мин"
    },

    // BLUE ZONE (Low Energy / Unpleasant) - Up-regulation / Gentle Activation
    {
        id: "behavioral_activation_walk",
        title: "Осознанная прогулка",
        type: "movement",
        tags: ["Sadness", "Depression", "Lethargy"],
        targetQuadrants: ["blue"],
        mechanism: "Behavioral Activation",
        description: "Простое движение для мягкого повышения уровня энергии.",
        duration: "10 мин"
    },
    {
        id: "self_compassion_break",
        title: "Пауза самосострадания",
        type: "cognitive",
        tags: ["Shame", "Guilt", "Sadness"],
        targetQuadrants: ["blue"],
        mechanism: "Cognitive Reframing",
        description: "Техника Кристин Нефф для работы с тяжелыми чувствами.",
        duration: "3 мин"
    },
    {
        id: "gratitude_journal",
        title: "Дневник благодарности",
        type: "journaling",
        tags: ["Sadness", "Apathy"],
        targetQuadrants: ["blue", "green"],
        mechanism: "Positive Psychology",
        description: "Смещение фокуса внимания на позитивные аспекты.",
        duration: "5 мин"
    },

    // GREEN ZONE (Low Energy / Pleasant) - Savoring
    {
        id: "body_scan",
        title: "Сканирование тела",
        type: "meditation",
        tags: ["Calm", "Rest", "Sleep"],
        targetQuadrants: ["green"],
        mechanism: "Interoception",
        description: "Глубокое расслабление и контакт с телом.",
        duration: "10 мин"
    },
    {
        id: "savoring_moment",
        title: "Смакование момента",
        type: "mindfulness",
        tags: ["Joy", "Contentment"],
        targetQuadrants: ["green", "yellow"],
        mechanism: "Savoring",
        description: "Усиление положительных эмоций через концентрацию на них.",
        duration: "2 мин"
    },

    // YELLOW ZONE (High Energy / Pleasant) - Channeling
    {
        id: "creative_freewrite",
        title: "Потоковое письмо",
        type: "journaling",
        tags: ["Excitement", "Creativity", "Ideas"],
        targetQuadrants: ["yellow"],
        mechanism: "Flow State",
        description: "Выплесните энергию и идеи на бумагу без цензуры.",
        duration: "5 мин"
    },
    {
        id: "vision_boarding",
        title: "Визуализация целей",
        type: "cognitive",
        tags: ["Motivation", "Pride", "Ambition"],
        targetQuadrants: ["yellow"],
        mechanism: "Goal Setting",
        description: "Направьте энергию на планирование будущего.",
        duration: "10 мин"
    }
];
