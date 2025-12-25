<template>
    <div class="habit-analytics-dashboard grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Cravings Line Chart -->
        <div
            class="card bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
            <h4 class="text-sm font-bold text-slate-500 uppercase mb-4">Тренд Тяги</h4>
            <div class="h-48 flex items-end justify-between space-x-2">
                <!-- Mock Bars for now, simpler than full Chart.js setup for this snippet, but could use Chart.js if needed -->
                <div v-for="i in 7" :key="i" class="w-full bg-cyan-100 dark:bg-cyan-900/30 rounded-t-lg relative group">
                    <div class="absolute bottom-0 left-0 right-0 bg-cyan-500 rounded-t-lg transition-all hover:bg-cyan-400"
                        :style="{ height: `${Math.random() * 100}%` }"></div>
                </div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-slate-400">
                <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
            </div>
        </div>

        <!-- Success Rate Donut -->
        <div
            class="card bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <h4 class="text-sm font-bold text-slate-500 uppercase mb-4 w-full text-left">Успех Вмешательства</h4>
            <div class="relative w-32 h-32">
                <svg class="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" stroke-width="8" fill="transparent"
                        class="text-slate-100 dark:text-slate-800" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" stroke-width="8" fill="transparent"
                        class="text-emerald-500" stroke-dasharray="377" stroke-dashoffset="94" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center flex-col">
                    <span class="text-3xl font-bold text-slate-800 dark:text-white">75%</span>
                    <span class="text-xs text-slate-500">Успех</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Props would receive real data in production
</script>

