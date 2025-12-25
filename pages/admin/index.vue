<template>
    <div
        class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 p-6 font-sans">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 reveal-on-scroll">
                <div>
                    <h1
                        class="text-3xl md:text-4xl font-light tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">
                        Панель управления <span class="font-medium text-cyan-600 dark:text-cyan-400">Admin</span>
                    </h1>
                    <p class="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
                        Управление пользователями и системная аналитика MindQLab
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <button @click="fetchUsers"
                        class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 flex items-center gap-3">
                        <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i>
                        <span>Обновить данные</span>
                    </button>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <!-- Total Users -->
                <div
                    class="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group">
                    <div class="flex justify-between items-start mb-6">
                        <div
                            class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                            <i class="fas fa-users text-xl"></i>
                        </div>
                        <span class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Total</span>
                    </div>
                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-tight">
                        Всего пользователей</h3>
                    <div class="text-4xl font-light tabular-nums text-slate-900 dark:text-white">{{ users.length }}
                    </div>
                </div>

                <!-- Admins -->
                <div
                    class="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 group">
                    <div class="flex justify-between items-start mb-6">
                        <div
                            class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
                            <i class="fas fa-user-shield text-xl"></i>
                        </div>
                        <span class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Admins</span>
                    </div>
                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-tight">
                        Администраторы</h3>
                    <div class="text-4xl font-light tabular-nums text-purple-600 dark:text-purple-400">{{ adminCount }}
                    </div>
                </div>

                <!-- New Users -->
                <div
                    class="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 group">
                    <div class="flex justify-between items-start mb-6">
                        <div
                            class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500">
                            <i class="fas fa-user-plus text-xl"></i>
                        </div>
                        <span class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Recent</span>
                    </div>
                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-tight">
                        Новых (30 дней)</h3>
                    <div class="text-4xl font-light tabular-nums text-teal-600 dark:text-teal-400">{{ newUsersCount }}
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div v-if="users.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div
                    class="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h3 class="text-lg font-light text-slate-700 dark:text-slate-300 mb-8 flex items-center gap-3">
                        <i class="fas fa-chart-pie text-indigo-500 opacity-50"></i>
                        Распределение ролей
                    </h3>
                    <div class="h-[300px] relative">
                        <canvas id="rolesChart"></canvas>
                    </div>
                </div>
                <div
                    class="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h3 class="text-lg font-light text-slate-700 dark:text-slate-300 mb-8 flex items-center gap-3">
                        <i class="fas fa-chart-line text-blue-500 opacity-50"></i>
                        Динамика регистраций
                    </h3>
                    <div class="h-[300px] relative">
                        <canvas id="growthChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Users Table Section -->
            <div
                class="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <!-- Table Toolbar -->
                <div
                    class="p-8 border-b border-slate-100 dark:border-slate-800/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-900/20">
                    <div class="relative flex-grow max-w-2xl">
                        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input v-model="searchQuery" type="text" placeholder="Поиск по email или ID пользователя..."
                            class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all duration-300 placeholder:text-slate-400 font-light" />
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Фильтр:</span>
                        <select v-model="roleFilter"
                            class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-cyan-500 transition-all cursor-pointer">
                            <option value="all">Все пользователи</option>
                            <option value="superAdmin">Администраторы</option>
                            <option value="user">Обычные пользователи</option>
                        </select>
                    </div>
                </div>

                <!-- Table Content -->
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr
                                class="bg-slate-50 dark:bg-slate-900/30 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                <th class="px-8 py-5">Пользователь</th>
                                <th class="px-8 py-5">Идентификатор (UID)</th>
                                <th class="px-8 py-5 text-center">Статус/Роль</th>
                                <th class="px-8 py-5 text-right">Дата регистрации</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/50">
                            <tr v-for="user in filteredUsers" :key="user.id"
                                class="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all duration-300 group">
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-4">
                                        <div
                                            class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500 uppercase">
                                            {{ user.email?.[0] || '?' }}
                                        </div>
                                        <div>
                                            <div class="font-medium text-slate-900 dark:text-slate-100">{{ user.email }}
                                            </div>
                                            <div class="text-[11px] text-slate-400 font-light">{{ user.displayName ||
                                                'Без имени' }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <div
                                        class="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors duration-300">
                                        <span
                                            class="font-mono text-[10px] text-slate-500 dark:text-slate-400 tracking-wider">{{
                                                user.id }}</span>
                                    </div>
                                </td>
                                <td class="px-8 py-6 text-center">
                                    <span v-if="user.role === 'superAdmin'"
                                        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm">
                                        <i class="fas fa-crown text-[8px]"></i>
                                        SuperAdmin
                                    </span>
                                    <span v-else
                                        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm">
                                        User
                                    </span>
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <div class="text-sm font-light text-slate-600 dark:text-slate-400">
                                        {{ formatDate(user.createdAt) }}
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredUsers.length === 0">
                                <td colspan="4" class="px-8 py-24 text-center">
                                    <div class="text-slate-300 dark:text-slate-600 mb-4 items-center flex flex-col">
                                        <i class="fas fa-search-minus text-5xl mb-6 opacity-20"></i>
                                        <span class="text-lg font-light">Пользователи не обнаружены</span>
                                        <p class="text-sm text-slate-400 mt-2">Попробуйте изменить параметры поиска или
                                            фильтрации</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import Chart from 'chart.js/auto';

definePageMeta({
    middleware: ['admin'],
    layout: 'default'
});

useHead({
    title: 'Панель управления Admin',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
});

const authStore = useAuthStore();
const users = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const roleFilter = ref('all');

// Charts references
let rolesChart = null;
let growthChart = null;

const fetchUsers = async () => {
    loading.value = true;
    try {
        const response = await $fetch('/api/admin/users', {
            headers: {
                Authorization: `Bearer ${authStore.user?.token}`
            }
        });
        if (response.success) {
            users.value = response.users;
            initCharts();
        }
    } catch (err) {
        console.error('Failed to fetch users:', err);
    } finally {
        loading.value = false;
    }
};

const adminCount = computed(() => users.value.filter(u => u.role === 'superAdmin').length);
const newUsersCount = computed(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return users.value.filter(u => u.createdAt && new Date(u.createdAt) > thirtyDaysAgo).length;
});

const filteredUsers = computed(() => {
    return users.value.filter(user => {
        const matchesSearch = user.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.id.includes(searchQuery.value);
        const matchesRole = roleFilter.value === 'all' || user.role === roleFilter.value;
        return matchesSearch && matchesRole;
    });
});

const formatDate = (dateString) => {
    if (!dateString || dateString === 'Invalid Date') return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch (e) {
        return 'N/A';
    }
};

const initCharts = () => {
    // Determine colors based on dark mode preference
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    setTimeout(() => {
        // Roles Chart
        const rolesCtx = document.getElementById('rolesChart');
        if (rolesCtx) {
            if (rolesChart) rolesChart.destroy();
            rolesChart = new Chart(rolesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Users', 'Admins'],
                    datasets: [{
                        data: [
                            users.value.filter(u => u.role !== 'superAdmin').length,
                            users.value.filter(u => u.role === 'superAdmin').length
                        ],
                        backgroundColor: [
                            isDark ? '#334155' : '#e2e8f0',
                            isDark ? '#818cf8' : '#6366f1'
                        ],
                        borderColor: isDark ? '#0f172a' : '#ffffff',
                        borderWidth: 4,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: textColor,
                                padding: 25,
                                font: { size: 12, weight: '400' },
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            titleColor: isDark ? '#ffffff' : '#0f172a',
                            bodyColor: textColor,
                            padding: 12,
                            borderColor: gridColor,
                            borderWidth: 1,
                            usePointStyle: true
                        }
                    }
                }
            });
        }

        // Growth Chart
        const growthCtx = document.getElementById('growthChart');
        if (growthCtx) {
            if (growthChart) growthChart.destroy();

            const monthlyData = {};
            users.value.forEach(u => {
                if (!u.createdAt) return;
                const d = new Date(u.createdAt);
                if (isNaN(d.getTime())) return;
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                monthlyData[key] = (monthlyData[key] || 0) + 1;
            });

            const sortedKeys = Object.keys(monthlyData).sort();
            const displayLabels = sortedKeys.map(k => {
                const [year, month] = k.split('-');
                const d = new Date(parseInt(year), parseInt(month) - 1);
                return d.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' });
            });

            const gradient = growthCtx.getContext('2d').createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
            gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');

            growthChart = new Chart(growthCtx, {
                type: 'line',
                data: {
                    labels: displayLabels,
                    datasets: [{
                        label: 'Регистрации',
                        data: sortedKeys.map(k => monthlyData[k]),
                        borderColor: '#0ea5e9',
                        borderWidth: 3,
                        backgroundColor: gradient,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#0ea5e9',
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: gridColor },
                            ticks: { color: textColor, stepSize: 1 }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: textColor }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            titleColor: isDark ? '#ffffff' : '#0f172a',
                            bodyColor: textColor,
                            padding: 12,
                            borderColor: gridColor,
                            borderWidth: 1
                        }
                    }
                }
            });
        }
    }, 100);
};

onMounted(() => {
    if (authStore.user) {
        fetchUsers();
    }
});

watch(() => authStore.user, (newVal) => {
    if (newVal) fetchUsers();
});
</script>

<style scoped>
.font-sans {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.reveal-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom Select styling to hide default arrow in some browsers and ensure consistency */
select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.25rem;
    padding-right: 2.5rem;
}
</style>
