<template>
    <aside
        class="flex flex-col min-h-screen h-full bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto">
        <!-- Brand -->
        <div
            class="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0 sticky top-0 bg-white dark:bg-black z-10">
            <NuxtLink to="/" class="flex items-center gap-3 group">
                <div class="relative w-8 h-8">
                    <img src="/mindqlab-logo.png" alt="MindQLab Logo"
                        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                    <span
                        class="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">MindQLab</span>
                    <div class="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                        Лаборатория</div>
                </div>
            </NuxtLink>

            <!-- Dark Mode Toggle -->
            <button @click="toggleDarkMode"
                class="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:scale-110 transition-transform">
                <span v-if="isDark" class="text-sm">☀️</span>
                <span v-else class="text-sm">🌙</span>
            </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 py-6 px-4">
            <div v-for="section in navSections" :key="section.title" class="mb-6">
                <h5 v-if="section.title"
                    class="px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                    {{ section.title }}
                </h5>

                <div class="space-y-1">
                    <template v-for="item in section.items" :key="item.path">
                        <!-- Highlighted Coach Link -->
                        <NuxtLink v-if="item.isHighlight" :to="item.path" @click="$emit('close')" :class="[
                            'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative group bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-cyan-600 dark:text-cyan-400 hover:from-cyan-500/20 hover:to-blue-600/20 border border-cyan-500/20 dark:border-cyan-500/30 rounded-lg mt-2'
                        ]">
                            <i :class="[item.icon, 'text-sm']"></i>
                            <span>{{ item.label }}</span>
                        </NuxtLink>

                        <!-- Standard Link -->
                        <NuxtLink v-else-if="!item.comingSoon" :to="item.path" @click="$emit('close')" :class="[
                            'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative group rounded-lg',
                            isActive(item.path)
                                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 dark:border-cyan-500/30'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10'
                        ]">
                            <i :class="[item.icon, 'text-sm']"></i>
                            <span>{{ item.label }}</span>
                            <div v-if="isActive(item.path)"
                                class="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-r">
                            </div>
                        </NuxtLink>

                        <!-- Coming Soon Item -->
                        <div v-else
                            class="flex items-center gap-3 px-4 py-3 text-sm font-medium opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600 rounded-lg">
                            <i :class="[item.icon, 'text-sm']"></i>
                            <span>{{ item.label }}</span>
                            <div
                                class="ml-auto px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-tight border border-zinc-200 dark:border-zinc-700 rounded">
                                Soon
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Logout as a nav item -->
            <div class="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button @click="logout"
                    class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-500/10 transition-all rounded-lg">
                    <i class="fas fa-sign-out-alt text-sm"></i>
                    <span>Выйти</span>
                </button>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

defineEmits(['close']);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isDark = ref(false);

const navSections = computed(() => {
    const sections = [
        {
            title: 'Центр управления',
            items: [
                { label: 'Дашборд', path: '/space/dashboard', icon: 'fas fa-microchip' },
                { label: 'Тесты', path: '/space/tests', icon: 'fas fa-brain' },
                { label: 'Тренировка', path: '/space/brain-training', icon: 'fas fa-dumbbell' },
            ]
        },
        {
            title: 'Развитие',
            items: [
                { label: 'Саморазвитие', path: '/space/growth', icon: 'fas fa-seedling' },
                { label: 'Голос → Структура', path: '/space/experiments/voice-structure', icon: 'fas fa-microphone-alt' },
                { label: 'Психология', path: '/space/psychology', icon: 'fas fa-book-open' },
                { label: 'Медитация', path: '/space/mindfulness', icon: 'fas fa-spa' },
            ]
        },
        {
            title: 'Социум',
            items: [
                { label: 'Сообщество', path: '/space/community', icon: 'fas fa-users' },
                { label: 'Профиль', path: '/profile', icon: 'fas fa-user-circle' },
            ]
        }
    ];

    if (authStore.user?.isCoach) {
        sections.push({
            title: 'Коучинг',
            items: [
                { label: 'Панель Коуча', path: '/coach', icon: 'fas fa-th-large', isHighlight: true },
            ]
        });
    }

    return sections;
});

const isActive = (path) => {
    if (path === '/space/dashboard') return route.path === '/space/dashboard';
    // Handle exact matches for dashboard, but prefix matches for others to keep active state on subpages
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
    await authStore.logout();
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