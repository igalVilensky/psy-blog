<!-- components/space/dashboard/EmotionalPillar.vue -->
<template>
    <div class="space-y-6">
        <div class="flex flex-row items-center gap-4 mb-4">
            <div
                class="w-12 h-12 flex items-center justify-center shrink-0 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
                <i class="fas fa-heart text-stone-900 dark:text-white text-xl"></i>
            </div>
            <div>
                <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
                    Психоэмоциональный Баланс</h2>
                <p class="text-xs font-bold text-stone-500 uppercase tracking-wide mt-1">Status Emotio</p>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <!-- Emotion Barometer -->
            <div
                class="bg-white dark:bg-stone-900 p-6 border border-stone-200 dark:border-stone-800 border-l-4 border-l-rose-500 relative overflow-hidden">
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="font-bold uppercase tracking-wide text-stone-900 dark:text-white">Барометр состояний
                        </h3>
                        <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Последние 30
                            дней</span>
                    </div>

                    <div class="grid grid-cols-2 gap-8 mb-8">
                        <div class="relative w-32 h-32 mx-auto">
                            <!-- Ring Chart -->
                            <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor"
                                    class="text-stone-100 dark:text-stone-800" stroke-width="6" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" class="text-rose-500"
                                    stroke-width="6" stroke-dasharray="282.7"
                                    :stroke-dashoffset="282.7 * (1 - intensity / 10)" />
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <div class="text-3xl font-bold text-stone-900 dark:text-white">{{ intensity }}</div>
                                <div class="text-[8px] text-stone-400 uppercase font-bold tracking-wider">Интенсивность
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col justify-center gap-4">
                            <div
                                class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center border-l-4 border-l-rose-400">
                                <div
                                    class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1 leading-none">
                                    Доминирующая эмоция</div>
                                <div class="text-lg font-bold text-stone-900 dark:text-white truncate uppercase">{{
                                    commonEmotion || 'Спокойствие'
                                    }}</div>
                            </div>
                            <div
                                class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center border-l-4 border-l-stone-400">
                                <div
                                    class="text-[10px] text-stone-400 uppercase font-bold tracking-wider mb-1 leading-none">
                                    Всего
                                    записей</div>
                                <div class="text-lg font-bold text-stone-900 dark:text-white">{{ totalEntries }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Insight -->
                    <div
                        class="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 p-4 border-l-4 border-l-rose-500">
                        <div class="flex items-start gap-3">
                            <div class="text-rose-600 dark:text-rose-400 mt-0.5"><i class="fas fa-lightbulb"></i></div>
                            <div class="text-xs font-medium text-stone-600 dark:text-stone-300 leading-relaxed italic">
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
                    class="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-500 dark:hover:border-rose-500 border-l-4 border-l-transparent hover:border-l-rose-500 transition-all group shadow-sm flex flex-col justify-between">
                    <div
                        class="w-10 h-10 flex items-center justify-center bg-stone-100 dark:bg-stone-800 mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-compass text-xl text-rose-600"></i>
                    </div>
                    <div>
                        <div class="font-bold text-stone-900 dark:text-white mb-2 uppercase tracking-wide text-sm">
                            Компас эмоций</div>
                        <p class="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Детальный анализ чувств
                            и
                            потребностей</p>
                    </div>
                </NuxtLink>

                <NuxtLink to="/space/growth/habit-mood-journal"
                    class="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-purple-500 dark:hover:border-purple-500 border-l-4 border-l-transparent hover:border-l-purple-500 transition-all group shadow-sm flex flex-col justify-between">
                    <div
                        class="w-10 h-10 flex items-center justify-center bg-stone-100 dark:bg-stone-800 mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-feather text-xl text-purple-600"></i>
                    </div>
                    <div>
                        <div class="font-bold text-stone-900 dark:text-white mb-2 uppercase tracking-wide text-sm">
                            Дневник привычек</div>
                        <p class="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Связь ваших действий с
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
