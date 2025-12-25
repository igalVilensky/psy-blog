<template>
    <div
        class="relative min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-slate-900 mx-4 sm:mx-0">
        <!-- Cursor Neural Visualizer Effect -->
        <div class="absolute inset-0 z-0 opacity-70 dark:opacity-50">
            <ClientOnly>
                <CursorNeuralVisualizer />
            </ClientOnly>
        </div>

        <!-- Content Card -->
        <div class="relative z-10 max-w-2xl w-full px-6 py-12 text-center">
            <div
                class="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20">
                <i class="fas fa-lock text-3xl text-white animate-bounce-slow"></i>
            </div>

            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 font-montserrat tracking-tight">
                Центр Управления Заблокирован
            </h2>

            <p class="text-slate-300 text-lg mb-10 leading-relaxed">
                Для того чтобы отслеживать свой прогресс и просматривать результаты тренировок, необходимо
                авторизоваться
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <NuxtLink to="/login"
                    class="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-cyan-600/20 flex items-center justify-center gap-2">
                    <i class="fas fa-sign-in-alt"></i>
                    Войти в аккаунт
                </NuxtLink>

                <NuxtLink to="/register"
                    class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all duration-300 backdrop-blur-md border border-white/10 transform hover:scale-105 flex items-center justify-center gap-2">
                    <i class="fas fa-user-plus"></i>
                    Регистрация
                </NuxtLink>
            </div>

            <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                    <i class="fas fa-chart-line text-cyan-400 mb-2"></i>
                    <p class="text-xs text-slate-400">Трекинг прогресса</p>
                </div>
                <div class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                    <i class="fas fa-brain text-purple-400 mb-2"></i>
                    <p class="text-xs text-slate-400">Когнитивные тесты</p>
                </div>
                <div class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                    <i class="fas fa-gem text-amber-400 mb-2"></i>
                    <p class="text-xs text-slate-400">Персональные инсайты</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CursorNeuralVisualizer from "~/components/space/CursorNeuralVisualizer.vue";
</script>

<style scoped>
.animate-bounce-slow {
    animation: bounce-slow 3s infinite ease-in-out;
}

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(-5%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}
</style>
