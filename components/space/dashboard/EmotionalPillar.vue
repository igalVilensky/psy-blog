<!-- components/space/dashboard/EmotionalPillar.vue -->
<template>
    <div class="space-y-6">
        <div class="flex flex-row items-center gap-4 mb-2">
            <div class="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                <i class="fas fa-heart text-rose-600 dark:text-rose-400 text-xl"></i>
            </div>
            <div>
                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-montserrat leading-tight">
                    Психоэмоциональный Баланс</h2>
                <p class="text-xs text-slate-500 mt-1">Мониторинг настроения, стресса и ментального благополучия</p>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <!-- Emotion Barometer -->
            <div
                class="bg-white dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="font-bold text-slate-900 dark:text-white">Барометр состояний</h3>
                        <span class="text-xs font-mono text-slate-500 uppercase">Последние 30 дней</span>
                    </div>

                    <div class="grid grid-cols-2 gap-8 mb-8">
                        <div class="relative w-32 h-32 mx-auto">
                            <!-- Ring Chart -->
                            <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor"
                                    class="text-slate-100 dark:text-slate-700" stroke-width="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" class="text-rose-500"
                                    stroke-width="8" stroke-dasharray="282.7"
                                    :stroke-dashoffset="282.7 * (1 - intensity / 10)" />
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <div class="text-2xl font-black text-slate-900 dark:text-white">{{ intensity }}</div>
                                <div class="text-[8px] text-slate-500 uppercase font-mono">Интенсивность</div>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center gap-4">
                            <div
                                class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 text-center">
                                <div class="text-[10px] text-slate-500 uppercase font-mono mb-1 leading-none">
                                    Доминирующая эмоция</div>
                                <div class="text-xl font-bold text-rose-600 truncate">{{ commonEmotion || 'Спокойствие'
                                }}</div>
                            </div>
                            <div
                                class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 text-center">
                                <div class="text-[10px] text-slate-500 uppercase font-mono mb-1 leading-none">Всего
                                    записей</div>
                                <div class="text-xl font-bold text-slate-900 dark:text-white">{{ totalEntries }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Insight -->
                    <div class="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4">
                        <div class="flex items-start gap-3">
                            <div class="text-rose-500 mt-1"><i class="fas fa-lightbulb"></i></div>
                            <div class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
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
                    class="p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700/50 hover:border-rose-500/50 transition-all group shadow-sm flex flex-col justify-between">
                    <div
                        class="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-compass text-2xl text-rose-600"></i>
                    </div>
                    <div>
                        <div class="font-bold text-slate-900 dark:text-white mb-2">Компас эмоций</div>
                        <p class="text-[10px] text-slate-500 uppercase tracking-wider">Детальный анализ чувств и
                            потребностей</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/space/growth/habit-mood-journal"
                    class="p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700/50 hover:border-purple-500/50 transition-all group shadow-sm flex flex-col justify-between">
                    <div
                        class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-feather text-2xl text-purple-600"></i>
                    </div>
                    <div>
                        <div class="font-bold text-slate-900 dark:text-white mb-2">Дневник привычек</div>
                        <p class="text-[10px] text-slate-500 uppercase tracking-wider">Связь ваших действий с вашим
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
