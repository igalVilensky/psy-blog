<template>
    <div
        class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white flex items-center justify-center p-6">
        <div class="max-w-md w-full text-center">
            <!-- Error Number -->
            <div class="mb-8">
                <div class="text-8xl font-bold text-stone-900 dark:text-white">
                    {{ errorCode }}
                </div>
                <div class="h-0.5 w-24 bg-stone-900 dark:bg-white mx-auto mt-4"></div>
            </div>

            <!-- Error Message -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-stone-900 dark:text-white mb-4">
                    Страница не найдена
                </h1>
                <p class="text-stone-600 dark:text-stone-400 text-sm">
                    Похоже, эта страница отправилась в параллельное измерение. Но не волнуйтесь — наша лаборатория
                    всегда готова
                    помочь вам найти нужный путь.
                </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <NuxtLink to="/"
                    class="px-6 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
                    <i class="fas fa-home mr-2"></i>
                    Вернуться на главную
                </NuxtLink>
                <NuxtLink to="/space"
                    class="px-6 py-3 border-2 border-stone-900 dark:border-white text-stone-900 dark:text-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 text-sm font-semibold transition-all">
                    <i class="fas fa-flask mr-2"></i>
                    В лабораторию
                </NuxtLink>
            </div>

            <!-- Quick Links -->
            <div class="mb-8">
                <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-4">
                    Популярные разделы
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <NuxtLink v-for="link in quickLinks" :key="link.path" :to="link.path"
                        class="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white text-sm font-semibold text-stone-900 dark:text-white transition-colors">
                        <i :class="link.icon" class="mr-2"></i>
                        {{ link.label }}
                    </NuxtLink>
                </div>
            </div>

            <!-- Help Section -->
            <div class="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div class="flex items-center gap-4 mb-3">
                    <div class="w-10 h-10 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                        <i class="fas fa-question-circle text-stone-900 dark:text-white"></i>
                    </div>
                    <div class="text-left">
                        <h3 class="text-sm font-semibold text-stone-900 dark:text-white">Нужна помощь?</h3>
                        <p class="text-xs text-stone-600 dark:text-stone-400">
                            Если вы считаете, что эта страница должна существовать,
                            <NuxtLink to="/contact"
                                class="text-stone-900 dark:text-white hover:text-stone-600 dark:hover:text-stone-400 font-semibold">
                                свяжитесь с нами
                            </NuxtLink>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Error Details -->
            <div class="mt-6 text-xs font-mono text-stone-500 dark:text-stone-400">
                ERROR: {{ errorCode }} • {{ currentTime }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Props from Nuxt error
const props = defineProps({
    error: Object,
});

// SEO Meta
useHead({
    title: `Ошибка ${props.error?.statusCode || "404"} - Страница не найдена`,
    meta: [
        {
            name: "description",
            content: "Страница не найдена. Вернитесь на главную страницу или перейдите в лабораторию.",
        },
        {
            name: "robots",
            content: "noindex, nofollow, noarchive, nosnippet",
        },
    ],
    link: [
        {
            rel: "canonical",
            href: "https://www.mindqlab.com/",
        },
    ],
});

// Error code
const errorCode = computed(() => props.error?.statusCode || 404);

// Current time
const currentTime = ref("");

const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    currentTime.value = `${hours}:${minutes}:${seconds}`;
};

let timeInterval;
onMounted(() => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    if (timeInterval) clearInterval(timeInterval);
});

// Quick links
const quickLinks = [
    {
        path: "/space/brain-training",
        icon: "fas fa-gamepad",
        label: "Игры",
    },
    {
        path: "/space/tests",
        icon: "fas fa-brain",
        label: "Тесты",
    },
    {
        path: "/space/growth",
        icon: "fas fa-flask",
        label: "Развитие",
    },
    {
        path: "/space/dashboard",
        icon: "fas fa-chart-line",
        label: "Статистика",
    },
];
</script>