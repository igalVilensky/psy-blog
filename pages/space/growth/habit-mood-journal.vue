<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />

      <!-- Page Header -->
      <div class="mb-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-4 border border-purple-500/20">
              <i class="fas fa-microchip"></i>
              Микро-практика
            </div>
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-montserrat tracking-tight mb-4">
              Дневник Состояния
            </h1>
            <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Отслеживайте свои привычки и настроение одним касанием. Маленькие шаги ведут к большим изменениям в качестве жизни и ясности ума.
            </p>
          </div>
          <div v-if="authStore.user" class="flex flex-col items-end">
            <div class="text-[10px] text-slate-400 uppercase font-mono mb-1">Последнее обновление</div>
            <div class="text-sm font-bold text-slate-900 dark:text-white">{{ lastSyncTime }}</div>
          </div>
        </div>
      </div>

      <!-- Guest State -->
      <div v-if="!authStore.user" class="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative z-10 max-w-md mx-auto">
          <div class="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-purple-600 dark:text-purple-400 text-4xl transform -rotate-6 group-hover:rotate-0 transition-transform">
            <i class="fas fa-lock"></i>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Начните свой путь к осознанности</h2>
          <p class="text-slate-500 dark:text-slate-400 mb-8">
            Для сохранения прогресса, отслеживания серий и доступа к аналитике, пожалуйста, войдите в свой аккаунт.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/auth/login" class="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-500/25">
              Войти
            </NuxtLink>
            <NuxtLink to="/auth/register" class="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              Регистрация
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Dashboard (Authorized Only) -->
      <div v-else class="space-y-8">
        <!-- Navigation Tabs -->
        <div class="flex items-center gap-1 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl w-fit">
          <button 
            @click="activeTab = 'today'"
            class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
            :class="activeTab === 'today' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
          >
            Сегодня
          </button>
          <button 
            @click="activeTab = 'history'"
            class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
            :class="activeTab === 'history' ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
          >
            Прогресс
          </button>
        </div>

        <!-- Today Tab -->
        <div v-if="activeTab === 'today'" class="space-y-8">
          <!-- CTA Card -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
            
            <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 text-center md:text-left">
                <h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Готовы к обновлению?</h2>
                <p class="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md">
                  Маленькая запись сегодня — это большая ясность завтра. Зафиксируйте свои успехи и состояние.
                </p>
                <button 
                  @click="isEntryModalOpen = true"
                  class="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-purple-500/25 flex items-center gap-3 mx-auto md:mx-0"
                >
                  <i class="fas fa-plus-circle"></i>
                  Сделать запись
                </button>
              </div>
              <div class="w-48 h-48 flex items-center justify-center">
                <div class="relative">
                  <div class="absolute inset-0 bg-purple-500 blur-2xl opacity-20 animate-pulse"></div>
                  <i class="fas fa-calendar-check text-8xl text-purple-500 relative z-10"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Recap (if any entries today) -->
          <div v-if="hasEntryToday" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl">
                 <i class="fas fa-check"></i>
              </div>
              <div>
                <div class="font-bold text-slate-900 dark:text-white">Чек-ин выполнен!</div>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">Отличная работа по поддержанию осознанности!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- History & Analytics Tab -->
        <div v-else class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div v-if="loading" class="flex items-center justify-center p-20">
            <i class="fas fa-circle-notch fa-spin text-purple-500 text-4xl"></i>
          </div>
          <template v-else>
            <HabitMoodAnalytics :entries="entries" />
            
            <!-- Recent List -->
            <div class="bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-8 shadow-sm">
              <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-8">История состояний</h3>
              <div class="space-y-4">
                <div v-for="(entry, index) in entries" :key="index" class="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div class="text-4xl">{{ getMoodEmoji(entry.mood) }}</div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-2">
                       <span class="text-sm font-black text-slate-900 dark:text-white">{{ formatDate(entry.timestamp) }}</span>
                       <div class="flex gap-1.5">
                         <span v-for="(val, key) in entry.habits" :key="key" v-show="val" class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[8px] font-bold uppercase">{{ habitLabels[key] }}</span>
                       </div>
                    </div>
                    <p v-if="entry.note" class="text-slate-600 dark:text-slate-400 text-sm italic leading-relaxed">"{{ entry.note }}"</p>
                  </div>
                </div>
                <div v-if="entries.length === 0" class="text-center py-20 text-slate-400">
                   <div class="text-6xl mb-6 opacity-10"><i class="fas fa-feather"></i></div>
                   <p>Ваша история пока пуста. <br> Начните с первой записи на главной вкладке.</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Entry Modal -->
      <Transition name="modal">
        <div v-if="isEntryModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-md" @click="isEntryModalOpen = false"></div>
          <div class="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <button @click="isEntryModalOpen = false" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
               <i class="fas fa-times"></i>
            </button>
            <div class="p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
              <HabitMoodEntry @save="saveEntry" />
            </div>
          </div>
        </div>
      </Transition>

      <!-- Related Tools -->
      <div class="mt-20">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-montserrat">Другие инструменты роста</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink 
            v-for="tool in otherTools" 
            :key="tool.id"
            :to="tool.path"
            class="p-6 rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-purple-500/50 transition-all group shadow-sm"
          >
            <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 transition-all group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:text-purple-600">
              <i :class="tool.icon"></i>
            </div>
            <h3 class="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">{{ tool.name }}</h3>
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
