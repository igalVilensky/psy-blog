<template>
    <div
        class="audio-persona-card bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <!-- Decorative background -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

        <div class="relative z-10">
            <h3 class="text-sm font-bold uppercase tracking-wider opacity-80 mb-2">Ваша Триггер-Персона</h3>
            <h2 class="text-3xl font-bold mb-4">{{ personaName }}</h2>

            <p class="text-indigo-100 mb-6 text-sm leading-relaxed">
                {{ personaDescription }}
            </p>

            <div class="flex items-center space-x-2 bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <i class="fas fa-lightbulb text-yellow-300"></i>
                <span class="text-xs font-medium">Рекомендация: {{ recommendation }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    scanData: {
        type: Object,
        default: () => ({})
    }
});

// Simple logic to determine persona from scan data (highest trigger)
const personaName = computed(() => {
    if (!props.scanData) return "Исследователь";

    const entries = Object.entries(props.scanData);
    if (entries.length === 0) return "Исследователь";

    // Find key with max value
    const maxEntry = entries.reduce((a, b) => a[1] > b[1] ? a : b);
    const type = maxEntry[0];

    const names = {
        stress: "Ответчик на Стресс",
        boredom: "Искатель Стимуляции",
        emotional: "Хранитель Сердца",
        wait: "Нетерпеливый Спринтер",
        social: "Социальное Зеркало"
    };

    return names[type] || "Исследователь";
});

const personaDescription = computed(() => {
    const map = {
        "Ответчик на Стресс": "Вы используете привычки как клапан сброса давления, когда перегружены.",
        "Искатель Стимуляции": "Ваш мозг жаждет ввода и новизны, что приводит к привычкам от скуки.",
        "Хранитель Сердца": "Вы используете привычки, чтобы успокоить сложные эмоции или одиночество.",
        "Нетерпеливый Спринтер": "Ожидание запускает вашу тягу к немедленному действию или отвлечению.",
        "Социальное Зеркало": "Ваше окружение и сверстники являются сильнейшими триггерами для ваших привычек."
    };
    return map[personaName.value] || "Пройдите сканирование триггеров, чтобы узнать свою персону.";
});

const recommendation = computed(() => {
    const map = {
        "Ответчик на Стресс": "Квадратное Дыхание & Звуковой Сброс",
        "Искатель Стимуляции": "Игры на Контроль Импульсов",
        "Хранитель Сердца": "Эмоциональный Дневник",
        "Нетерпеливый Спринтер": "Тренировка Задержки Реакции",
        "Социальное Зеркало": "Дизайн Окружения"
    };
    return map[personaName.value] || "Начать Сканирование";
});
</script>

