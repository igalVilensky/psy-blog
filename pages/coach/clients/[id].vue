<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
    </div>

    <div v-else-if="client" class="space-y-8 animate-fadeIn">
      <!-- Profile Header -->
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>

        <div class="flex items-center gap-6 relative z-10">
          <div
            class="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-800 shadow-md">
            <img v-if="client.avatarUrl" :src="client.avatarUrl" class="w-full h-full object-cover">
            <i v-else class="fas fa-user text-3xl text-slate-300"></i>
          </div>
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h1 class="text-2xl font-black text-slate-900 dark:text-white uppercase">{{ client.displayName ||
                'Безимени' }}</h1>
              <span
                class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter bg-emerald-500/10 text-emerald-500">
                ACTIVE
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
              <i class="far fa-envelope"></i> {{ client.email }}
            </p>
          </div>
        </div>

        <div class="flex gap-3 relative z-10">
          <button @click="activeTab = 'notes'"
            class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            ЗАМЕТКИ
          </button>
          <button
            class="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs uppercase shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-all">
            ОТПРАВИТЬ СООБЩЕНИЕ
          </button>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-8 no-scrollbar">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="pb-4 text-xs font-bold uppercase tracking-widest transition-all relative"
          :class="activeTab === tab.id ? 'text-cyan-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'">
          {{ tab.label }}
          <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full">
          </div>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="min-h-[400px]">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <!-- Weekly Activity Mockup -->
            <div
              class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3
                class="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
                <i class="fas fa-chart-bar text-cyan-500"></i> Активность за неделю
              </h3>
              <div class="h-48 flex items-end gap-2 px-4">
                <div v-for="(val, i) in [40, 70, 45, 90, 65, 30, 85]" :key="i"
                  class="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg relative group transition-all hover:bg-cyan-500/20"
                  :style="`height: ${val}%`">
                  <div
                    class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {{ Math.round(val / 10) }} сессий
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-4 px-4 text-[10px] font-mono text-slate-400 uppercase">
                <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
              </div>
            </div>

            <!-- Recent Achievements -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="i in 2" :key="i"
                class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <i class="fas fa-award"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase">Первая неделя</h4>
                  <p class="text-[10px] text-slate-500">7 дней активных тренировок</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <div
              class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Статус курса
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-end">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Прогресс</span>
                  <span class="text-lg font-black text-cyan-500">65%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full bg-cyan-500" style="width: 65%"></div>
                </div>
                <div class="pt-4 space-y-2">
                  <div class="flex items-center justify-between text-[10px] font-mono">
                    <span class="text-slate-500">ВСЕГО СЕССИЙ:</span>
                    <span class="text-slate-900 dark:text-white">42</span>
                  </div>
                  <div class="flex items-center justify-between text-[10px] font-mono">
                    <span class="text-slate-500">ПРОЙДЕНО ТЕСТОВ:</span>
                    <span class="text-slate-900 dark:text-white">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Big 5 Personality Tab -->
        <div v-if="activeTab === 'personality'" class="space-y-8 animate-fadeIn">
          <div v-if="big5Loading" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
          <div v-else-if="big5Data" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-wide">Черты личности
                (Big 5)</h3>
              <div class="space-y-6">
                <div v-for="(score, trait) in big5Data.traitScores" :key="trait" class="space-y-2">
                  <div class="flex justify-between items-end">
                    <h4 class="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">{{ trait }}</h4>
                    <span class="text-sm font-black text-cyan-500">{{ Math.round(score) }}/120</span>
                  </div>
                  <div class="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-cyan-600 to-blue-500"
                      :style="`width: ${(score / 120) * 100}%`"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-slate-50 dark:bg-slate-900/30 p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Анализ коуча
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "Высокий показатель Нейротизма в сочетании с высокой Открытостью может указывать на творческую
                чувствительность, но также на склонность к тревожности в неопределенных ситуациях. Рекомендуется
                фокусироваться на техниках заземления..."
              </p>
            </div>
          </div>
          <div v-else
            class="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <i class="fas fa-brain text-4xl text-slate-300 dark:text-slate-700 mb-4"></i>
            <h3 class="text-slate-900 dark:text-white font-bold uppercase tracking-tight">Тест личности не пройден</h3>
            <p
              class="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono max-w-xs mx-auto mt-2 tracking-widest">
              Ожидание завершения оценки Big 5 Personality
            </p>
          </div>
        </div>

        <!-- Emotions Tab -->
        <div v-if="activeTab === 'emotions'" class="space-y-8 animate-fadeIn">
          <div v-if="emotionsLoading" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
          <div v-else-if="emotionsData && emotionsData.length > 0" class="space-y-4">
            <div v-for="(entry, idx) in emotionsData" :key="idx"
              class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <span
                    class="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 mb-2 inline-block">
                    {{ entry.emotion }}
                  </span>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase">{{ entry.subEmotion }}</h4>
                </div>
                <div class="text-[10px] font-mono text-slate-400 capitalize">
                  {{ formatDate(entry.timestamp) }}
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="space-y-1">
                  <span class="text-[10px] text-slate-400 uppercase font-bold">Интенсивность</span>
                  <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-cyan-500" :style="`width: ${entry.intensity * 10}%`"></div>
                  </div>
                </div>
                <div v-if="entry.entry"
                  class="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                  <p class="text-xs text-slate-600 dark:text-slate-400 italic">"{{ entry.entry }}"</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else
            class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div class="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-chart-line text-2xl text-cyan-500"></i>
            </div>
            <h3 class="text-slate-900 dark:text-white font-bold uppercase tracking-tight">Эмоциональный компас</h3>
            <p
              class="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono max-w-xs mx-auto mt-2 tracking-widest">
              История настроений и эмоционального состояния клиента появится здесь
            </p>
          </div>
        </div>

        <!-- Training Tab -->
        <div v-if="activeTab === 'training'" class="space-y-8 animate-fadeIn">
          <div v-if="trainingLoading" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
          <div v-else-if="trainingData && trainingData.length > 0" class="space-y-4">
            <div v-for="res in trainingData" :key="res.id"
              class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <i class="fas fa-brain"></i>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase">{{
                    EXERCISE_NAMES[res.exerciseType] || res.exerciseType }}</h4>
                  <p class="text-[10px] font-mono text-slate-400">{{ formatDate(res.createdAt) }}</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div v-if="res.accuracy !== undefined" class="text-right">
                  <div class="text-[10px] text-slate-400 uppercase font-bold mb-1">Accuracy</div>
                  <div class="text-sm font-black text-cyan-500">{{ res.accuracy }}%</div>
                </div>
                <div v-if="res.avgReactionTime" class="text-right">
                  <div class="text-[10px] text-slate-400 uppercase font-bold mb-1">Time</div>
                  <div class="text-sm font-black text-slate-700 dark:text-slate-300">{{ res.avgReactionTime }}ms</div>
                </div>
                <div v-if="res.score !== undefined" class="text-right">
                  <div class="text-[10px] text-slate-400 uppercase font-bold mb-1">Score</div>
                  <div class="text-sm font-black text-emerald-500">{{ res.score }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else
            class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-dumbbell text-2xl text-blue-500"></i>
            </div>
            <h3 class="text-slate-900 dark:text-white font-bold uppercase tracking-tight">Когнитивные тренировки</h3>
            <p
              class="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono max-w-xs mx-auto mt-2 tracking-widest">
              Результаты упражнений и динамика прогресса в обучении
            </p>
          </div>
        </div>

        <!-- Notes Tab -->
        <div v-if="activeTab === 'notes'" class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <div class="lg:col-span-1 space-y-6">
            <div
              class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Добавить заметку
              </h3>
              <textarea v-model="newNote" rows="5"
                class="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-cyan-500 transition-all outline-none resize-none mb-4"
                placeholder="Опишите свои наблюдения..."></textarea>
              <button @click="saveNote" :disabled="!newNote.trim() || noteSaving"
                class="w-full py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-sm uppercase shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 disabled:opacity-50 transition-all">
                <span v-if="noteSaving">СОХРАНЕНИЕ...</span>
                <span v-else>СОХРАНИТЬ ЗАМЕТКУ</span>
              </button>
            </div>
          </div>
          <div class="lg:col-span-2">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wide">История заметок
            </h3>
            <div v-if="notesLoading" class="flex justify-center py-10">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            </div>
            <div v-else-if="notes.length > 0" class="space-y-4">
              <div v-for="note in notes" :key="note.id"
                class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div class="flex justify-between mb-4">
                  <div class="text-[10px] font-black font-mono text-cyan-500 uppercase">{{ formatDate(note.createdAt) }}
                  </div>
                  <button class="text-slate-400 hover:text-red-500 transition-colors"><i
                      class="far fa-trash-alt"></i></button>
                </div>
                <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{{ note.content }}</p>
              </div>
            </div>
            <div v-else
              class="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl font-mono text-xs">
              НЕТ ЗАПИСЕЙ
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white uppercase">Клиент не найден</h2>
      <NuxtLink to="/coach" class="mt-4 inline-block text-cyan-500 hover:underline">Вернуться к списку</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { getCoachClientDetails, addCoachNote, getCoachNotes, getClientTrainingResults, getClientEmotionHistory } from '~/api/firebase/coach';

definePageMeta({
  layout: 'laboratory',
  middleware: ['coach']
});

const route = useRoute();
const authStore = useAuthStore();
const db = getFirestore();

const loading = ref(true);
const client = ref(null);
const activeTab = ref('overview');
const tabs = [
  { id: 'overview', label: 'ОБЗОР' },
  { id: 'personality', label: 'ЛИЧНОСТЬ' },
  { id: 'emotions', label: 'ЭМОЦИИ' },
  { id: 'training', label: 'ТРЕНИРОВКИ' },
  { id: 'notes', label: 'ЗАМЕТКИ' }
];

// Big 5 Data
const big5Data = ref(null);
const big5Loading = ref(false);

// Notes Data
const notes = ref([]);
const newNote = ref('');
const notesLoading = ref(false);
const noteSaving = ref(false);

// Emotions & Training Data
const emotionsData = ref(null);
const emotionsLoading = ref(false);
const trainingData = ref(null);
const trainingLoading = ref(false);

const EXERCISE_NAMES = {
  targetTracking: 'Отслеживание целей',
  mentalShift: 'Ментальное переключение',
  patternDetection: 'Детекция паттернов',
  stroop: 'Тест Струпа',
  reaction: 'Время реакции',
  anagram: 'Анаграммы',
  nback: 'N-Back Lite',
  double: 'Дабл (Внимание)',
  digitSpan: 'Цифровой охват',
  trailMaking: 'Тест связи путей',
  logicPairs: 'Логические пары',
  raven: 'Тест Равена'
};

const fetchData = async () => {
  const clientId = route.params.id;
  if (!clientId) return;

  loading.value = true;
  client.value = await getCoachClientDetails(clientId);
  loading.value = false;

  if (client.value) {
    loadNotes();
  }
};

const loadBig5Data = async () => {
  if (!client.value || big5Data.value) return;

  big5Loading.value = true;
  try {
    const q = query(
      collection(db, `users/${client.value.id}/big5Results`),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      big5Data.value = snap.docs[0].data();
    }
  } catch (e) {
    console.error("Error loading Big 5:", e);
  } finally {
    big5Loading.value = false;
  }
};

const loadNotes = async () => {
  if (!client.value || !authStore.user) return;
  notesLoading.value = true;
  notes.value = await getCoachNotes(authStore.user.uid, client.value.id);
  notesLoading.value = false;
};

const saveNote = async () => {
  if (!newNote.value.trim() || !client.value || !authStore.user) return;

  noteSaving.value = true;
  const res = await addCoachNote(authStore.user.uid, client.value.id, newNote.value);
  if (res.success) {
    newNote.value = '';
    await loadNotes();
  }
  noteSaving.value = false;
};

const formatDate = (ts) => {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

watch(activeTab, (newTab) => {
  if (newTab === 'personality') loadBig5Data();
  if (newTab === 'notes') loadNotes();
  if (newTab === 'emotions') loadEmotionsData();
  if (newTab === 'training') loadTrainingData();
});

const loadEmotionsData = async () => {
  if (!client.value || emotionsData.value) return;
  emotionsLoading.value = true;
  try {
    const rawData = await getClientEmotionHistory(client.value.id);
    // Sort by timestamp descending
    emotionsData.value = [...rawData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } catch (e) {
    console.error("Error loading emotions:", e);
  } finally {
    emotionsLoading.value = false;
  }
};

const loadTrainingData = async () => {
  if (!client.value || trainingData.value) return;
  trainingLoading.value = true;
  try {
    trainingData.value = await getClientTrainingResults(client.value.id);
  } catch (e) {
    console.error("Error loading training:", e);
  } finally {
    trainingLoading.value = false;
  }
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
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

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
