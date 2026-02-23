<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-500 font-sans selection:bg-purple-500/30">
    <div class="container mx-auto px-6 py-12 max-w-6xl">
      <Breadcrumbs />

      <!-- Page Header -->
      <div class="mb-16 mt-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div class="max-w-2xl">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-purple-500/10">
              <i class="fas fa-microchip"></i>
              Микро-практика
            </div>
            <h1 class="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight uppercase mb-6">
              Дневник Состояния
            </h1>
            <p class="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg font-medium leading-relaxed">
              Отслеживайте свои привычки и настроение одним касанием. Маленькие шаги ведут к большим изменениям в
              качестве жизни и ясности ума.
            </p>
          </div>
          <div v-if="authStore.user" class="flex flex-col items-end">
            <div class="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-2">Синхронизация</div>
            <div
              class="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-900 dark:text-white shadow-sm">
              <i class="fas fa-clock mr-2 text-zinc-400"></i>{{ lastSyncTime }}
            </div>
          </div>
        </div>
      </div>

      <!-- Guest State -->
      <div v-if="!authStore.user"
        class="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-12 text-center border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-500/5 overflow-hidden relative group">
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        </div>
        <div class="relative z-10 max-w-md mx-auto">
          <div
            class="w-24 h-24 bg-purple-50 dark:bg-purple-900/20 rounded-3xl flex items-center justify-center mx-auto mb-10 text-purple-600 dark:text-purple-400 text-4xl transform -rotate-6 group-hover:rotate-0 transition-all duration-500 shadow-lg shadow-purple-500/10">
            <i class="fas fa-lock"></i>
          </div>
          <h2 class="text-2xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">Начните свой путь
          </h2>
          <p class="text-zinc-500 dark:text-zinc-400 mb-10 font-medium leading-relaxed">
            Для сохранения прогресса, отслеживания серий и доступа к аналитике, пожалуйста, авторизуйтесь в системе.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/auth/login"
              class="px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-purple-500/25 active:scale-95">
              Войти
            </NuxtLink>
            <NuxtLink to="/auth/register"
              class="px-10 py-5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm">
              Регистрация
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Dashboard (Authorized Only) -->
      <div v-else class="space-y-12">
        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 p-1.5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-2xl w-fit">
          <button @click="activeTab = 'today'"
            class="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="activeTab === 'today' ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-lg' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'">
            Сегодня
          </button>
          <button @click="activeTab = 'history'"
            class="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="activeTab === 'history' ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 shadow-lg' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400'">
            Прогресс
          </button>
        </div>

        <!-- Today Tab -->
        <div v-if="activeTab === 'today'" class="space-y-12">
          <!-- CTA Card -->
          <div
            class="bg-white dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-500/5 relative overflow-hidden group">
            <div
              class="absolute -top-12 -right-12 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] group-hover:bg-purple-500/10 transition-colors duration-1000">
            </div>

            <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div class="flex-1 text-center md:text-left">
                <h2 class="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Готовы к
                  обновлению?</h2>
                <p class="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-md font-medium leading-relaxed">
                  Маленькая запись сегодня — это большая ясность завтра. Зафиксируйте свои успехи и состояние.
                </p>
                <button @click="isEntryModalOpen = true"
                  class="px-12 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs transition-all shadow-2xl shadow-purple-500/30 flex items-center gap-4 mx-auto md:mx-0 active:scale-95">
                  <i class="fas fa-plus-circle text-lg"></i>
                  Сделать запись
                </button>
              </div>
              <div class="w-64 h-64 flex items-center justify-center">
                <div class="relative group-hover:scale-110 transition-transform duration-700">
                  <div class="absolute inset-0 bg-purple-500/20 blur-3xl animate-pulse rounded-full"></div>
                  <div
                    class="w-48 h-48 rounded-3xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-2xl border border-zinc-100 dark:border-zinc-700 relative z-10">
                    <i class="fas fa-calendar-check text-7xl text-purple-600 dark:text-purple-500"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Recap (if any entries today) -->
          <div v-if="hasEntryToday" class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            <div
              class="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-8 flex items-center gap-6 shadow-sm">
              <div
                class="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/20">
                <i class="fas fa-check"></i>
              </div>
              <div>
                <div class="font-black text-zinc-900 dark:text-white uppercase tracking-tight text-lg mb-1">Чек-ин
                  выполнен!</div>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Ваша осознанность на высоком уровне. Так
                  держать!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- History & Analytics Tab -->
        <div v-else class="space-y-12 animate-fadeIn">
          <div v-if="loading" class="flex flex-col items-center justify-center p-32 gap-6">
            <div class="w-16 h-16 border-4 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
            <p class="text-[10px] font-black uppercase tracking-widest text-zinc-400 animate-pulse">Анализ данных...</p>
          </div>
          <template v-else>
            <HabitMoodAnalytics :entries="entries" />

            <!-- Recent List -->
            <div
              class="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-10 shadow-sm">
              <h3 class="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-12 flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                  <i class="fas fa-history text-sm"></i>
                </div>
                История состояний
              </h3>
              <div class="space-y-6">
                <div v-for="(entry, index) in entries" :key="index"
                  class="flex items-start gap-8 p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/40 hover:bg-white dark:hover:bg-zinc-800 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 shadow-sm hover:shadow-xl">
                  <div class="text-5xl transform hover:scale-110 transition-transform cursor-default">{{
                    getMoodEmoji(entry.mood) }}</div>
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <span class="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest">{{
                        formatDate(entry.timestamp) }}</span>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="(val, key) in entry.habits" :key="key" v-show="val"
                          class="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-tighter border border-emerald-500/10">{{
                          habitLabels[key] }}</span>
                      </div>
                    </div>
                    <p v-if="entry.note"
                      class="text-zinc-600 dark:text-zinc-400 text-base font-medium leading-relaxed italic border-l-4 border-zinc-200 dark:border-zinc-700 pl-4 py-1">
                      "{{ entry.note }}"</p>
                  </div>
                </div>
                <div v-if="entries.length === 0" class="text-center py-24">
                  <div
                    class="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-8 text-zinc-200 dark:text-zinc-700 text-4xl">
                    <i class="fas fa-feather-alt"></i>
                  </div>
                  <h4 class="text-xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">Ваша
                    история пока пуста</h4>
                  <p class="text-zinc-500 dark:text-zinc-400 font-medium">Начните с первой записи на вкладке «Сегодня».
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Entry Modal -->
      <Transition name="modal">
        <div v-if="isEntryModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl" @click="isEntryModalOpen = false"></div>
          <div
            class="relative z-10 w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-500">
            <button @click="isEntryModalOpen = false"
              class="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all shadow-sm">
              <i class="fas fa-times text-lg"></i>
            </button>
            <div class="p-8 sm:p-12 overflow-y-auto max-h-[90vh]">
              <HabitMoodEntry @save="saveEntry" />
            </div>
          </div>
        </div>
      </Transition>

      <!-- Related Tools -->
      <div class="mt-32">
        <h2 class="text-2xl font-black text-zinc-900 dark:text-white mb-10 uppercase tracking-tight">Другие инструменты
          роста
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink v-for="tool in otherTools" :key="tool.id" :to="tool.path"
            class="p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div
              class="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white shadow-inner">
              <i :class="tool.icon" class="text-xl"></i>
            </div>
            <h3
              class="text-base font-black text-zinc-900 dark:text-white uppercase tracking-tight group-hover:text-purple-600 transition-colors">
              {{ tool.name }}</h3>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { collection, addDoc, query, where, getDocs, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue';
import HabitMoodEntry from '~/components/space/growth/HabitMoodEntry.vue';
import HabitMoodAnalytics from '~/components/space/growth/HabitMoodAnalytics.vue';

definePageMeta({
  layout: "laboratory",
});

const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

const entries = ref([]);
const loading = ref(true);
const lastSyncTime = ref('--:--');
const activeTab = ref('today');
const isEntryModalOpen = ref(false);

const habitLabels = {
  meditation: 'Медитация',
  exercise: 'Спорт',
  reading: 'Чтение',
  water: 'Вода',
  early_rise: 'Подъем',
  healthy_food: 'Питание'
};

const hasEntryToday = computed(() => {
  if (entries.value.length === 0) return false;
  const today = new Date().toDateString();
  return entries.value.some(e => {
    const d = e.timestamp?.toDate ? e.timestamp.toDate() : new Date(e.timestamp);
    return d.toDateString() === today;
  });
});

const otherTools = [
  { id: 'compass', name: 'Эмоциональный компас', path: '/space/growth/emotional-compass', icon: 'fas fa-compass' },
  { id: 'wheel', name: 'Колесо баланса', path: '/space/growth/wheel-of-life', icon: 'fas fa-yin-yang' },
  { id: 'deep', name: 'Глубокий разговор', path: '/space/growth/deep-conversation', icon: 'fas fa-layer-group' },
  { id: 'spark', name: 'Искра роста', path: '/space/growth/daily-growth-spark', icon: 'fas fa-bolt' }
];

const fetchEntries = async () => {
  if (!authStore.user) {
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    // We remove orderBy('timestamp') to avoid the requirement for a composite index
    // We will sort in-memory for now to ensure it works immediately
    const q = query(
      collection($firestore, 'habit_mood_journal'),
      where('userId', '==', authStore.user.uid),
      limit(50)
    );

    const snapshot = await getDocs(q);
    const fetchedEntries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Sort in-memory: latest first
    entries.value = fetchedEntries.sort((a, b) => {
      const timeA = a.timestamp?.seconds || 0;
      const timeB = b.timestamp?.seconds || 0;
      return timeB - timeA;
    });

    lastSyncTime.value = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    console.error('Error fetching entries:', error);
  } finally {
    loading.value = false;
  }
};

const saveEntry = async (entry) => {
  if (!authStore.user) return;

  try {
    const docRef = await addDoc(collection($firestore, 'habit_mood_journal'), {
      ...entry,
      userId: authStore.user.uid,
      timestamp: serverTimestamp()
    });

    // Wait a bit for the user to see the success state in the modal
    setTimeout(() => {
      isEntryModalOpen.value = false;
    }, 1500);

    await fetchEntries();
  } catch (error) {
    console.error('Error saving entry:', error);
  }
};

const getMoodEmoji = (mood) => {
  const emojis = ['😫', '😔', '😐', '🙂', '🤩'];
  return emojis[mood - 1] || '😐';
};

const formatDate = (ts) => {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  if (authStore.user) {
    fetchEntries();
  } else {
    // If not loaded yet, wait for it
    const unwatch = watch(() => authStore.user, (newVal) => {
      if (newVal) {
        fetchEntries();
        unwatch();
      }
    });
  }
});

// AI & SEO Metadata
useHead({
  title: 'Дневник Состояния | Психология и осознанность',
  meta: [
    { name: 'description', content: 'Микро-дневник для отслеживания настроения и привычек. Улучшайте свою жизнь через ежедневную осознанность и маленькие шаги.' },
    { property: 'og:title', content: 'Дневник Состояния - Трекер привычек и настроения' },
    { name: 'keywords', content: 'трекер настроения, трекер привычек, осознанность, саморазвитие, психология' },
    // AI SEO (Schema.org / JSON-LD should be here but useHead is enough for basic meta)
  ]
});
</script>
