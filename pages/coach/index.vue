<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div>
        <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-montserrat uppercase">
          Панель Коуча <span class="text-cyan-500">.</span>
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1 font-mono text-xs uppercase tracking-widest">
          Управление клиентами и аналитика прогресса
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button @click="isInviteModalOpen = true"
          class="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-cyan-500/25">
          <i class="fas fa-user-plus"></i>
          ПРИГЛАСИТЬ КЛИЕНТА
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <CoachDashboardStats :stats="dashboardStats" />

    <!-- Clients Grid -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i class="fas fa-users text-cyan-500"></i>
          Активные Клиенты
        </h2>
        <div class="flex items-center gap-2">
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Поиск по имени..."
              class="w-64 pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-cyan-500 transition-all outline-none">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          </div>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="h-48 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse"></div>
      </div>

      <div v-else-if="filteredClients.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClientCard v-for="client in filteredClients" :key="client.id" :client="client"
          @click="navigateToClient(client.id)" />
      </div>

      <div v-else class="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
        <i class="fas fa-user-friends text-4xl text-slate-300 dark:text-slate-700 mb-4"></i>
        <h3 class="text-slate-900 dark:text-white font-bold">Клиентов пока нет</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto mt-2">
          Воспользуйтесь кнопкой «Пригласить клиента», чтобы начать работу.
        </p>
      </div>
    </div>

    <!-- Invite Modal -->
    <div v-if="isInviteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="isInviteModalOpen = false"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase">Пригласить клиента</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">Отправьте эту ссылку клиенту, чтобы связать аккаунты.</p>
        
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative group">
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ваша персональная ссылка</label>
            <div class="font-mono text-xs text-cyan-600 dark:text-cyan-400 break-all pr-12">{{ inviteLink }}</div>
            <button @click="copyInviteLink" 
              class="absolute right-3 top-1/2 -translate-y-1/3 w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-cyan-500 transition-colors shadow-sm">
              <i class="fas" :class="copied ? 'fa-check text-emerald-500' : 'fa-copy'"></i>
            </button>
          </div>
          
          <div class="flex justify-end gap-3 mt-8">
            <button @click="isInviteModalOpen = false"
              class="px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              ЗАКРЫТЬ
            </button>
          </div>
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
  layout: 'laboratory',
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
