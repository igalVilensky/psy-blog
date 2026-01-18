<template>
    <aside class="flex flex-col h-full overflow-hidden">
        <!-- Brand -->
        <div class="h-16 flex items-center gap-3 px-6 border-b border-slate-200 dark:border-slate-800">
            <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <i class="fas fa-brain text-xl"></i>
            </div>
            <div class="flex flex-col">
                <span class="text-sm font-black tracking-tighter text-slate-900 dark:text-white leading-none">MIND Q
                    <span class="text-indigo-600">LAB</span></span>
                <span class="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">Coach Portal</span>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <div v-for="section in navSections" :key="section.title" class="space-y-1 pb-4">
                <h5 v-if="section.title"
                    class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">{{ section.title
                    }}</h5>

                <template v-for="item in section.items" :key="item.path">
                    <!-- Standard Link -->
                    <NuxtLink v-if="!item.comingSoon" :to="item.path" @click="$emit('close')" :class="[
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all group relative',
                        isActive(item.path)
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    ]">
                        <i :class="[
                            item.icon,
                            'text-lg transition-transform group-hover:scale-110',
                            isActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'
                        ]"></i>
                        <span>{{ item.label }}</span>
                        <div v-if="isActive(item.path)" class="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm">
                        </div>
                    </NuxtLink>

                    <!-- Coming Soon Item -->
                    <div v-else
                        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold opacity-40 cursor-not-allowed grayscale-[0.5] text-slate-500 dark:text-slate-400">
                        <i :class="[item.icon, 'text-lg text-slate-400']"></i>
                        <span>{{ item.label }}</span>
                        <div
                            class="ml-auto px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[8px] font-black text-slate-400 uppercase tracking-tighter border border-slate-200 dark:border-slate-700">
                            SOON</div>
                    </div>
                </template>
            </div>
        </nav>

        <!-- Bottom Actions -->
        <div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button @click="logout"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:text-rose-600 transition-all group">
                <i class="fas fa-sign-out-alt text-lg text-slate-400 group-hover:text-rose-600"></i>
                <span>Выйти</span>
            </button>

            <div
                class="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Help Center</span>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">Нужна помощь в управлении
                    клиентами?</p>
                <button
                    class="w-full py-2 rounded-lg bg-white dark:bg-slate-800 text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 shadow-sm hover:shadow-md transition-all">
                    Документация
                </button>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

defineEmits(['close']);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const navSections = [
    {
        title: 'Основное',
        items: [
            { label: 'Панель', path: '/coach', icon: 'fas fa-th-large' },
            { label: 'Клиенты', path: '/coach', icon: 'fas fa-user-friends' },
        ]
    },
    {
        title: 'Аналитика',
        items: [
            { label: 'Результаты', path: '/coach/analytics', icon: 'fas fa-chart-line', comingSoon: true },
            { label: 'Отчеты', path: '/coach/reports', icon: 'fas fa-file-alt', comingSoon: true },
        ]
    },
    {
        title: 'Настройки',
        items: [
            { label: 'Профиль', path: '/profile', icon: 'fas fa-user-cog' },
        ]
    }
];

const isActive = (path) => {
    // Exact match for the dashboard/clients list
    if (path === '/coach') return route.path === '/coach' || route.path.startsWith('/coach/clients');
    return route.path.startsWith(path);
};

const logout = async () => {
    await authStore.signOut();
    router.push('/auth/login');
};
</script>
