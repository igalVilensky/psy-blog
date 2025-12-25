<template>
    <div
        class="reward-map-card bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <span
                class="w-8 h-8 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center mr-3 text-sm">4</span>
            Карта Искажения Награды
        </h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6 text-sm">
            Сравните то, что вы <em>ожидаете</em> получить от привычки, с тем, что вы <em>реально</em> получаете.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Ожидаемая Польза
                        (Облегчение)</label>
                    <input type="range" min="0" max="10" v-model.number="perceived" class="w-full accent-pink-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Реальный Результат
                        (Вина/Усталость)</label>
                    <input type="range" min="0" max="10" v-model.number="actual" class="w-full accent-slate-500">
                </div>
            </div>

            <div
                class="viz flex items-end justify-center space-x-8 h-32 border-b border-slate-200 dark:border-slate-700 pb-2">
                <div class="flex flex-col items-center w-16 group">
                    <div class="w-full bg-pink-500 rounded-t-lg transition-all duration-500 relative"
                        :style="{ height: `${perceived * 10}%` }">
                        <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-pink-500 font-bold">{{ perceived
                        }}</span>
                    </div>
                    <span class="text-xs mt-2 text-slate-500">Ожидание</span>
                </div>

                <div class="flex flex-col items-center w-16 group">
                    <div class="w-full bg-slate-400 dark:bg-slate-600 rounded-t-lg transition-all duration-500 relative"
                        :style="{ height: `${actual * 10}%` }">
                        <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-slate-500 font-bold">{{ actual
                        }}</span>
                    </div>
                    <span class="text-xs mt-2 text-slate-500">Реальность</span>
                </div>
            </div>
        </div>

        <div class="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
            <p class="text-sm font-medium" :class="distortionScore > 3 ? 'text-red-500' : 'text-emerald-500'">
                {{ distortionMessage }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const perceived = ref(8);
const actual = ref(3);

const distortionScore = computed(() => perceived.value - actual.value);

const distortionMessage = computed(() => {
    if (distortionScore.value > 5) return "Высокое Искажение: Ваш мозг значительно переоценивает награду.";
    if (distortionScore.value > 2) return "Среднее Искажение: Привычка обещает больше, чем дает.";
    return "Низкое Искажение: У вас реалистичный взгляд на эту привычку.";
});
</script>

