<template>
    <aside class="flex flex-col h-full bg-white dark:bg-stone-900 border-r-2 border-stone-900 dark:border-white">
        <!-- Brand - Bold and editorial -->
        <div class="h-16 flex items-center px-6 border-b-2 border-stone-900 dark:border-white">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-stone-900 dark:bg-white flex items-center justify-center">
                    <i class="fas fa-brain text-white dark:text-stone-900 text-sm"></i>
                </div>
                <div>
                    <span class="text-sm font-bold text-stone-900 dark:text-white">MindQLab</span>
                    <div class="text-[9px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                        Коуч</div>
                </div>
            </div>
        </div>

        <!-- Navigation - Clean editorial style -->
        <nav class="flex-1 overflow-y-auto py-4 px-4">
            <div v-for="section in navSections" :key="section.title" class="mb-6">
                <h5 v-if="section.title"
                    class="px-3 text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest mb-2 border-l-2 border-stone-900 dark:border-white pl-2">
                    {{ section.title }}
                </h5>

                <div class="space-y-1">
                    <template v-for="item in section.items" :key="item.path">
                        <!-- Standard Link -->
                        <NuxtLink v-if="!item.comingSoon" :to="item.path" @click="$emit('close')" :class="[
                            'flex items-center gap-3 px-3 py-2 text-sm font-semibold transition-all relative group',
                            isActive(item.path)
                                ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                        ]">
                            <i :class="[item.icon, 'text-sm']"></i>
                            <span>{{ item.label }}</span>
                            <div v-if="isActive(item.path)"
                                class="absolute left-0 top-0 bottom-0 w-1 bg-stone-900 dark:bg-white"></div>
                        </NuxtLink>

                        <!-- Coming Soon Item -->
                        <div v-else
                            class="flex items-center gap-3 px-3 py-2 text-sm font-semibold opacity-30 cursor-not-allowed text-stone-500 dark:text-stone-600">
                            <i :class="[item.icon, 'text-sm']"></i>
                            <span>{{ item.label }}</span>
                            <div
                                class="ml-auto px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 text-[8px] font-bold text-stone-500 uppercase tracking-tight border border-stone-300 dark:border-stone-700">
                                SOON
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </nav>

        <!-- Bottom Actions - Sharp and clean -->
        <div class="p-4 border-t-2 border-stone-900 dark:border-white space-y-2">
            <!-- Dark Mode Toggle -->
            <button @click="toggleDarkMode"
                class="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
                <i :class="[isDark ? 'fas fa-sun' : 'fas fa-moon', 'text-sm']"></i>
                <span>{{ isDark ? 'Светлая' : 'Тёмная' }}</span>
            </button>

            <button @click="logout"
                class="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
                <i class="fas fa-sign-out-alt text-sm"></i>
                <span>Выйти</span>
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

defineEmits(['close']);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isDark = ref(false);

const navSections = [
    {
        title: 'Основное',
        items: [
            { label: 'Панель', path: '/coach', icon: 'fas fa-th-large' },
            { label: 'Клиенты', path: '/coach/clients', icon: 'fas fa-user-friends' },
            { label: 'Лаборатория', path: '/space', icon: 'fas fa-flask' },
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
    if (path === '/coach') return route.path === '/coach';
    return route.path.startsWith(path);
};

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};

const logout = async () => {
    await authStore.signOut();
    router.push('/login');
};

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    isDark.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark.value) {
        document.documentElement.classList.add('dark');
    }
});
</script>
