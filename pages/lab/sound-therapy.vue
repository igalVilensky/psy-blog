<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-slate-50 to-slate-50 dark:from-indigo-500/10 dark:via-slate-950 dark:to-slate-950 pb-8 transition-colors duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <Breadcrumbs />
            <!-- Header -->
            <div class="mb-8">
                <div class="flex-1">
                    <h1
                        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-montserrat mb-3 tracking-tight">
                        ЗВУКОТЕРАПИЯ
                    </h1>
                    <p class="text-slate-600 dark:text-slate-400 mt-2 text-sm md:text-base">
                        Исцеляющие звуковые ландшафты, бинауральные ритмы и музыка для глубокой релаксации
                    </p>
                </div>
            </div>

            <!-- Placeholder Content Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Placeholder Card 1 -->
                <div
                    class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div
                        class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-music text-indigo-600 dark:text-indigo-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Бинауральные ритмы
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">
                        Синхронизация полушарий мозга для улучшения концентрации и сна.
                    </p>
                    <div
                        class="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
                        <span class="text-slate-400 text-xs">Скоро</span>
                    </div>
                </div>

                <!-- Placeholder Card 2 -->
                <div
                    class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div
                        class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-water text-cyan-600 dark:text-cyan-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Звуки природы
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">
                        Успокаивающие звуки леса, дождя и океана для снятия стресса.
                    </p>
                    <div
                        class="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
                        <span class="text-slate-400 text-xs">Скоро</span>
                    </div>
                </div>

                <!-- Placeholder Card 3 -->
                <div
                    class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div
                        class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-om text-purple-600 dark:text-purple-400 text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Поющие чаши
                    </h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">
                        Вибрационная терапия тибетскими чашами для гармонизации энергии.
                    </p>
                    <div
                        class="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
                        <span class="text-slate-400 text-xs">Скоро</span>
                    </div>
                </div>
            </div>

            <!-- Coming Soon Banner -->
            <div
                class="mt-12 p-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center">
                <i class="fas fa-headphones-alt text-4xl text-indigo-500 mb-4"></i>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Раздел в разработке</h2>
                <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Мы готовим для вас коллекцию терапевтических аудио-сессий. Скоро здесь появятся профессионально
                    записанные треки для медитации, сна и концентрации.
                </p>
            </div>

        </div>
    </div>
</template>

<script setup>
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
    layout: "laboratory",
});

useHead({
    title: "Звукотерапия | MindQ Lab",
    meta: [
        {
            name: "description",
            content: "Исцеляющие звуковые ландшафты, бинауральные ритмы и музыка для глубокой релаксации.",
        },
    ],
});
</script>
