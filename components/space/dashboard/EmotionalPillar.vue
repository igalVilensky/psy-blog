<!-- components/space/dashboard/EmotionalPillar.vue -->
<template>
    <div class="space-y-6">
        <div class="flex flex-row items-center gap-4 mb-4">
            <div
                class="w-12 h-12 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-rose-500/10 to-pink-600/10 rounded-xl">
                <i class="fas fa-heart text-rose-600 dark:text-rose-400 text-xl"></i>
            </div>
            <div>
                <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                    Психоэмоциональный Баланс</h2>
                <p class="text-xs font-bold text-zinc-500 uppercase tracking-wide mt-1">Status Emotio</p>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <!-- Emotion Barometer -->
            <div
                class="bg-white dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-rose-500 relative overflow-hidden rounded-2xl">
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="font-bold uppercase tracking-wide text-zinc-900 dark:text-white">Барометр состояний
                        </h3>
                        <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Последние 30
                            дней</span>
                    </div>

                    <div class="grid grid-cols-2 gap-8 mb-8">
                        <div class="relative w-32 h-32 mx-auto">
                            <!-- Ring Chart -->
                            <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor"
                                    class="text-zinc-100 dark:text-zinc-800" stroke-width="6" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#roseGradient)" stroke-width="6"
                                    stroke-dasharray="282.7" :stroke-dashoffset="282.7 * (1 - intensity / 10)"
                                    stroke-linecap="round" />
                                <defs>
                                    <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="#f43f5e" />
                                        <stop offset="100%" stop-color="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <div class="text-3xl font-bold text-zinc-900 dark:text-white">{{ intensity }}</div>
                                <div class="text-[8px] text-zinc-400 uppercase font-bold tracking-wider">Интенсивность
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center gap-4">
                            <div
                                class="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center border-l-4 border-l-rose-400 rounded-xl">
                                <div
                                    class="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1 leading-none">
                                    Доминирующая эмоция</div>
                                <div class="text-lg font-bold text-zinc-900 dark:text-white truncate uppercase">{{
                                    commonEmotion || 'Спокойствие'
                                }}</div>
                            </div>
                            <div
                                class="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center border-l-4 border-l-zinc-400 rounded-xl">
                                <div
                                    class="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1 leading-none">
                                    Всего
                                    записей</div>
                                <div class="text-lg font-bold text-zinc-900 dark:text-white">{{ totalEntries }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Insight -->
                    <div
                        class="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 p-4 border-l-4 border-l-rose-500 rounded-xl">
                        <div class="flex items-start gap-3">
                            <div class="text-rose-600 dark:text-rose-400 mt-0.5"><i class="fas fa-lightbulb"></i></div>
                            <div class="text-xs font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                                «Ваше состояние часто коррелирует с утренними тренировками. Сохраняйте ритм для
                                эмоциональной стабильности.»
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions / Links -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NuxtLink to="/space/growth/emotional-compass"
                    class="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500 dark:hover:border-rose-500 border-l-4 border-l-transparent hover:border-l-rose-500 transition-all group rounded-2xl flex flex-col justify-between">
                    <div
                        class="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-rose-500/10 to-pink-600/10 mb-6 group-hover:scale-110 transition-transform rounded-xl">
                        <i class="fas fa-compass text-xl text-rose-600"></i>
                    </div>
                    <div>
                        <div class="font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wide text-sm">
                            Компас эмоций</div>
                        <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Детальный анализ чувств
                            и
                            потребностей</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/space/growth/habit-mood-journal"
                    class="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 border-l-4 border-l-transparent hover:border-l-purple-500 transition-all group rounded-2xl flex flex-col justify-between">
                    <div
                        class="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-indigo-600/10 mb-6 group-hover:scale-110 transition-transform rounded-xl">
                        <i class="fas fa-feather text-xl text-purple-600"></i>
                    </div>
                    <div>
                        <div class="font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wide text-sm">
                            Дневник привычек</div>
                        <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Связь ваших действий с
                            вашим
                            состоянием</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    intensity: Number,
    commonEmotion: String,
    totalEntries: Number
});
</script>
