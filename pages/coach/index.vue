<template>
  <div class="p-6 lg:p-10 space-y-10">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Statistics</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Панель <span class="text-indigo-600">Коуча</span>
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-md leading-relaxed">
          Добро пожаловать обратно! Вот краткий обзор активности ваших клиентов и ключевых показателей прогресса.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button @click="isInviteModalOpen = true"
          class="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/25 active:scale-95">
          <i class="fas fa-plus"></i>
          ПРИГЛАСИТЬ КЛИЕНТА
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <CoachDashboardStats :stats="dashboardStats" />

    <!-- Clients Grid -->
    <div class="space-y-8">
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
            <i class="fas fa-user-friends"></i>
          </div>
          <h2 class="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Список клиентов
          </h2>
        </div>

        <div class="relative group">
          <input v-model="searchQuery" type="text" placeholder="Поиск клиента..."
            class="w-full sm:w-72 pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm">
          <i
            class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-colors group-focus-within:text-indigo-500"></i>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i"
          class="h-56 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse">
        </div>
      </div>

      <div v-else-if="filteredClients.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClientCard v-for="client in filteredClients" :key="client.id" :client="client"
          @click="navigateToClient(client.id)" />
      </div>

      <div v-else
        class="text-center py-24 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800/50">
        <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-user-slash text-3xl text-slate-300 dark:text-slate-600"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Клиенты не найдены</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto mt-2">
          Попробуйте изменить поисковый запрос или пригласите нового клиента.
        </p>
      </div>
    </div>

    <!-- Invite Modal -->
    <div v-if="isInviteModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" @click="isInviteModalOpen = false"></div>
      <div
        class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl animate-content">
        <div
          class="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
          <i class="fas fa-user-plus text-2xl"></i>
        </div>
        <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Пригласить клиента
        </h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">Отправьте эту ссылку клиенту. После
          регистрации он автоматически появится в вашей панели.</p>

        <div class="space-y-6">
          <div
            class="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative group overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ваша
              ссылка</label>
            <div
              class="font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all pr-12 relative z-10 leading-relaxed">
              {{ inviteLink }}</div>
            <button @click="copyInviteLink"
              class="absolute right-4 bottom-4 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-all shadow-sm border border-slate-100 dark:border-slate-700 z-10">
              <i class="fas" :class="copied ? 'fa-check text-emerald-500' : 'fa-copy'"></i>
            </button>
          </div>

          <button @click="isInviteModalOpen = false"
            class="w-full py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all uppercase tracking-widest">
            ЗАКРЫТЬ
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
import ClientCard from '~/components/coach/ClientCard.vue';

definePageMeta({
  layout: 'coach',
  middleware: ['coach']
});

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(true);
const clients = ref([]);
const searchQuery = ref('');
const isInviteModalOpen = ref(false);
const copied = ref(false);

const dashboardStats = computed(() => [
  {
    label: 'Всего клиентов',
    value: clients.value.length,
    icon: 'fas fa-users',
    bgClass: 'bg-blue-500/10',
    textClass: 'text-blue-500'
  },
  {
    label: 'Активные (7д)',
    value: clients.value.filter(c => c.status === 'active').length,
    icon: 'fas fa-bolt',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-500',
    trend: '+2',
    trendColor: 'text-emerald-500',
    trendIcon: 'fas fa-caret-up'
  },
  {
    label: 'В зоне риска',
    value: clients.value.filter(c => c.status === 'at-risk').length,
    icon: 'fas fa-exclamation-triangle',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-500'
  },
  {
    label: 'Средний прогресс',
    value: Math.round(clients.value.reduce((acc, c) => acc + (c.progress || 0), 0) / (clients.value.length || 1)) + '%',
    icon: 'fas fa-chart-line',
    bgClass: 'bg-purple-500/10',
    textClass: 'text-purple-500'
  }
]);

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value;
  return clients.value.filter(c =>
    c.displayName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const inviteLink = computed(() => {
  const baseUrl = process.client ? window.location.origin : 'https://mindqlab.com';
  return `${baseUrl}/register?coach=${authStore.user?.uid}`;
});

const navigateToClient = (id) => {
  router.push(`/coach/clients/${id}`);
};

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

<style scoped>
.experiment-area {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
