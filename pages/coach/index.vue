<template>
  <div class="relative p-6 lg:p-8 space-y-8">
    <!-- Header Section - Clean and editorial -->
    <div class="relative z-10 border-b border-stone-200 dark:border-stone-800 pb-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <div class="w-1 h-4 bg-mindqlab-calm-accent"></div>
            <span class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Панель
              Коуча</span>
          </div>
          <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
            Панель управления
          </h1>
          <p class="text-stone-600 dark:text-stone-400 mt-2 text-sm max-w-md">
            Обзор активности клиентов и ключевых показателей
          </p>
        </div>

        <button @click="isInviteModalOpen = true"
          class="flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-semibold text-sm transition-all">
          <i class="fas fa-plus text-xs"></i>
          Пригласить клиента
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="relative z-10">
      <CoachDashboardStats :stats="dashboardStats" />
    </div>

    <!-- Quick Actions / Mini Client Preview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Activity (Placeholder for now, can be real later) -->
      <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
        <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Активность</h3>
        <p class="text-stone-500 dark:text-stone-400 text-sm">Здесь будет отображаться лента последних событий ваших
          клиентов.</p>
      </div>

      <!-- Quick Links -->
      <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
        <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Быстрые действия</h3>
        <div class="space-y-4">
          <NuxtLink to="/coach/clients"
            class="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors cursor-pointer border border-stone-100 dark:border-stone-700">
            <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Перейти к списку клиентов</span>
            <i class="fas fa-arrow-right text-stone-400"></i>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <div v-if="isInviteModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-stone-900/50" @click="isInviteModalOpen = false"></div>
      <div
        class="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-2xl">
        <div class="mb-6">
          <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
            <i class="fas fa-user-plus text-xl text-stone-600 dark:text-stone-400"></i>
          </div>
          <h3 class="text-2xl font-bold text-stone-900 dark:text-white mb-2">Пригласить клиента</h3>
          <p class="text-stone-600 dark:text-stone-400 text-sm">
            Отправьте эту ссылку клиенту для регистрации
          </p>
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 relative">
            <label
              class="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">Ссылка
              приглашения</label>
            <div class="font-mono text-xs text-stone-700 dark:text-stone-300 break-all pr-10">
              {{ inviteLink }}
            </div>
            <button @click="copyInviteLink"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
              <i class="fas text-xs" :class="copied ? 'fa-check text-emerald-600' : 'fa-copy text-stone-500'"></i>
            </button>
          </div>

          <button @click="isInviteModalOpen = false"
            class="w-full py-3 border border-stone-300 dark:border-stone-700 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { getCoachClients } from '~/api/firebase/coach';
import CoachDashboardStats from '~/components/coach/CoachDashboardStats.vue';

definePageMeta({
  layout: 'coach',
  middleware: ['coach']
});

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(true);
const clients = ref([]);
const isInviteModalOpen = ref(false);
const copied = ref(false);

const dashboardStats = computed(() => [
  {
    label: 'Всего клиентов',
    value: clients.value.length,
    icon: 'fas fa-users',
  },
  {
    label: 'Активные (7д)',
    value: clients.value.filter(c => c.status === 'active').length,
    icon: 'fas fa-bolt',
    trend: '+2',
    trendColor: 'text-emerald-600'
  },
  {
    label: 'В зоне риска',
    value: clients.value.filter(c => c.status === 'at-risk').length,
    icon: 'fas fa-exclamation-triangle',
  },
  {
    label: 'Средний прогресс',
    value: Math.round(clients.value.reduce((acc, c) => acc + (c.progress || 0), 0) / (clients.value.length || 1)) + '%',
    icon: 'fas fa-chart-line',
  }
]);

const inviteLink = computed(() => {
  const baseUrl = process.client ? window.location.origin : 'https://mindqlab.com';
  return `${baseUrl}/register?coach=${authStore.user?.uid}`;
});

const copyInviteLink = async () => {
  try {
    await navigator.clipboard.writeText(inviteLink.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  } catch (err) {
    console.error('Failed to copy link:', err);
  }
};

onMounted(async () => {
  if (authStore.user) {
    clients.value = await getCoachClients(authStore.user.uid);
  }
  loading.value = false;
});
</script>
