<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm">
        <div
            class="relative flex h-full w-full flex-col bg-white md:h-[90vh] md:w-[90vw] md:max-w-5xl md:rounded-2xl dark:bg-slate-900">
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-slate-200 p-4 md:p-6 dark:border-slate-800">
                <div class="flex items-center gap-4">
                    <button @click="confirmExit"
                        class="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    <div>
                        <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ flow.name }}</h2>
                        <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span>{{ currentModuleIndex + 1 }} из {{ flow.modules.length }}</span>
                            <span class="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            <span>{{ currentModule.name }}</span>
                        </div>
                    </div>
                </div>

                <!-- Timer (Optional) -->
                <div
                    class="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm font-medium text-slate-700 md:flex dark:bg-slate-800 dark:text-slate-300">
                    <i class="fas fa-clock text-slate-400"></i>
                    <span>{{ formattedTime }}</span>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="h-1 w-full bg-slate-100 dark:bg-slate-800">
                <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                    :style="{ width: `${progressPercentage}%` }"></div>
            </div>

            <!-- Main Content -->
            <div class="flex flex-1 flex-col items-center justify-center overflow-y-auto p-6 text-center md:p-12">
                <div
                    class="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 text-6xl">
                    {{ currentModule.icon }}
                </div>

                <h1 class="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                    {{ currentModule.name }}
                </h1>

                <p class="mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                    {{ currentModule.description }}
                </p>

                <!-- Module Content Placeholder / Interactive Element -->
                <div
                    class="mb-8 w-full max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-800/50">
                    <div v-if="currentModule.type === 'game'" class="flex flex-col items-center gap-4">
                        <i class="fas fa-gamepad text-4xl text-purple-500"></i>
                        <p class="text-sm text-slate-500">Интерактивный модуль</p>
                        <button class="rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700">
                            Запустить игру
                        </button>
                    </div>
                    <div v-else-if="currentModule.type === 'experiment'" class="flex flex-col items-center gap-4">
                        <i class="fas fa-flask text-4xl text-cyan-500"></i>
                        <p class="text-sm text-slate-500">Экспериментальный модуль</p>
                        <button class="rounded-lg bg-cyan-600 px-6 py-2 text-white hover:bg-cyan-700">
                            Начать эксперимент
                        </button>
                    </div>
                    <div v-else class="flex flex-col items-center gap-4">
                        <i class="fas fa-check-circle text-4xl text-green-500"></i>
                        <p class="text-sm text-slate-500">Выполните задание и нажмите "Далее"</p>
                    </div>
                </div>
            </div>

            <!-- Footer Controls -->
            <div class="flex items-center justify-between border-t border-slate-200 p-4 md:p-6 dark:border-slate-800">
                <button @click="prevModule" :disabled="currentModuleIndex === 0"
                    class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-slate-400 dark:hover:bg-slate-800">
                    <i class="fas fa-arrow-left"></i>
                    <span>Назад</span>
                </button>

                <div class="flex gap-4">
                    <button @click="togglePause"
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                        <i class="fas" :class="isPaused ? 'fa-play' : 'fa-pause'"></i>
                    </button>
                </div>

                <button v-if="isLastModule" @click="completeFlow"
                    class="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:bg-green-700 hover:shadow-green-500/30">
                    <span>Завершить</span>
                    <i class="fas fa-check"></i>
                </button>
                <button v-else @click="nextModule"
                    class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30">
                    <span>Далее</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
    flow: any
}>()

const emit = defineEmits<{
    close: []
    complete: [sessionData: any]
}>()

const currentModuleIndex = ref(0)
const isPaused = ref(false)
const startTime = ref<number>(Date.now())
const elapsedTime = ref(0)
const timerInterval = ref<any>(null)

const currentModule = computed(() => props.flow.modules[currentModuleIndex.value])
const isLastModule = computed(() => currentModuleIndex.value === props.flow.modules.length - 1)
const progressPercentage = computed(() => ((currentModuleIndex.value + 1) / props.flow.modules.length) * 100)

const formattedTime = computed(() => {
    const minutes = Math.floor(elapsedTime.value / 60)
    const seconds = elapsedTime.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const startTimer = () => {
    timerInterval.value = setInterval(() => {
        if (!isPaused.value) {
            elapsedTime.value++
        }
    }, 1000)
}

const stopTimer = () => {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
    }
}

const togglePause = () => {
    isPaused.value = !isPaused.value
}

const nextModule = () => {
    if (currentModuleIndex.value < props.flow.modules.length - 1) {
        currentModuleIndex.value++
    }
}

const prevModule = () => {
    if (currentModuleIndex.value > 0) {
        currentModuleIndex.value--
    }
}

const confirmExit = () => {
    if (confirm('Вы уверены, что хотите прервать выполнение потока? Прогресс будет потерян.')) {
        emit('close')
    }
}

const completeFlow = () => {
    stopTimer()
    emit('complete', {
        duration: elapsedTime.value,
        completedAt: new Date()
    })
}

onMounted(() => {
    startTimer()
})

onUnmounted(() => {
    stopTimer()
})
</script>
