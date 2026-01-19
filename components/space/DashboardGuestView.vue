<template>
    <div
        class="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-900 border border-stone-800 border-l-4 border-l-stone-100 mx-4 sm:mx-0">
        <!-- Cursor Neural Visualizer Effect -->
        <div class="absolute inset-0 z-0 opacity-50">
            <ClientOnly>
                <CursorNeuralVisualizer />
            </ClientOnly>
        </div>

        <!-- Content Card -->
        <div class="relative z-10 max-w-2xl w-full px-8 py-12 text-center">
            <div
                class="mb-8 inline-flex items-center justify-center w-20 h-20 bg-stone-800 border border-stone-700 shadow-md">
                <i class="fas fa-lock text-3xl text-stone-100 animate-pulse"></i>
            </div>

            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">
                Центр Управления Заблокирован
            </h2>

            <p class="text-stone-400 text-lg mb-10 leading-relaxed font-medium">
                Для того чтобы отслеживать свой прогресс и просматривать результаты тренировок, необходимо
                авторизоваться
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <NuxtLink to="/login"
                    class="w-full sm:w-auto px-8 py-4 bg-white text-stone-900 border border-white font-bold uppercase tracking-widest hover:bg-stone-200 transition-all duration-300 flex items-center justify-center gap-2">
                    <i class="fas fa-sign-in-alt"></i>
                    Войти в аккаунт
                </NuxtLink>

                <NuxtLink to="/register"
                    class="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-stone-600 font-bold uppercase tracking-widest hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2">
                    <i class="fas fa-user-plus"></i>
                    Регистрация
                </NuxtLink>
            </div>

            <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div
                    class="bg-stone-800/50 backdrop-blur-sm p-5 border border-stone-700/50 hover:border-stone-500 transition-colors">
                    <i class="fas fa-chart-line text-stone-100 mb-3 text-lg"></i>
                    <p class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Трекинг прогресса</p>
                </div>
                <div
                    class="bg-stone-800/50 backdrop-blur-sm p-5 border border-stone-700/50 hover:border-stone-500 transition-colors">
                    <i class="fas fa-brain text-stone-100 mb-3 text-lg"></i>
                    <p class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Когнитивные тесты</p>
                </div>
                <div
                    class="bg-stone-800/50 backdrop-blur-sm p-5 border border-stone-700/50 hover:border-stone-500 transition-colors">
                    <i class="fas fa-gem text-stone-100 mb-3 text-lg"></i>
                    <p class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Персональные инсайты</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CursorNeuralVisualizer from "~/components/space/CursorNeuralVisualizer.vue";
</script>

<style scoped>
/* Scoped styles if needed, mainly relying on Tailwind */
</style>
