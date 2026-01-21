<template>
  <div class="p-6 lg:p-8 space-y-8">
    <div v-if="loading" class="flex items-center justify-center py-32">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
    </div>

    <div v-else-if="client" class="space-y-8">
      <!-- Back Button + Client Header -->
      <div class="space-y-6">
        <button @click="router.push('/coach')"
          class="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
          <i class="fas fa-arrow-left"></i>
          <span>Назад</span>
        </button>

        <div
          class="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b-2 border-stone-900 dark:border-white">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
              <img v-if="client.avatarUrl" :src="client.avatarUrl" class="w-full h-full object-cover" />
              <i v-else class="fas fa-user text-2xl text-stone-400 dark:text-stone-600"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-stone-900 dark:text-white">{{ client.displayName || 'Без имени' }}</h1>
              <p class="text-sm text-stone-500 dark:text-stone-400 mt-1">{{ client.email }}</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button @click="activeTab = 'notes'"
              class="px-6 py-2 border border-stone-300 dark:border-stone-700 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
              Заметки
            </button>
            <button
              class="px-6 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors">
              Написать
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div
        class="flex border-b border-stone-300 dark:border-stone-700 gap-8 overflow-x-auto no-scrollbar scroll-smooth">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="pb-3 text-sm font-semibold transition-all relative whitespace-nowrap flex-shrink-0"
          :class="activeTab === tab.id ? 'text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-600 hover:text-stone-700 dark:hover:text-stone-400'">
          {{ tab.label }}
          <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-white">
          </div>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="min-h-[400px]">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <!-- Activity Chart -->
            <div class="bg-white dark:bg-stone-900 border-l-4 border-stone-900 dark:border-white p-6">
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-6">Активность (7 дней)</h3>
              <div class="h-48 flex items-end gap-2">
                <div v-for="(val, i) in [40, 70, 45, 90, 65, 30, 85]" :key="i"
                  class="flex-1 bg-stone-200 dark:bg-stone-800 transition-all hover:bg-stone-900 dark:hover:bg-white cursor-pointer"
                  :style="`height: ${val}%`"></div>
              </div>
              <div class="flex justify-between mt-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5">
                <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                  Сессий</div>
                <div class="text-3xl font-bold text-stone-900 dark:text-white">42</div>
              </div>
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5">
                <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                  Тестов</div>
                <div class="text-3xl font-bold text-stone-900 dark:text-white">5</div>
              </div>
            </div>
          </div>

          <!-- Progress Sidebar -->
          <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-6">Общий прогресс</h3>
            <div class="flex flex-col items-center mb-6">
              <div class="text-5xl font-bold text-stone-900 dark:text-white">65%</div>
              <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mt-2">Курс
              </div>
            </div>
            <div class="w-full h-2 bg-stone-200 dark:bg-stone-800 mb-6">
              <div class="h-full bg-stone-900 dark:bg-white" style="width: 65%"></div>
            </div>
          </div>
        </div>

        <!-- Personality Tab -->
        <div v-if="activeTab === 'personality'" class="space-y-6">
          <div v-if="big5Loading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
          </div>
          <div v-else-if="big5Data"
            class="bg-white dark:bg-stone-900 border-l-4 border-stone-900 dark:border-white p-6">
            <h3 class="text-xl font-bold text-stone-900 dark:text-white mb-6">Big 5 Черты личности</h3>
            <div class="space-y-6">
              <div v-for="(score, trait) in big5Data.traitScores" :key="trait" class="space-y-2">
                <div class="flex justify-between items-baseline">
                  <h4 class="text-sm font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-300">{{ trait
                  }}</h4>
                  <span class="text-base font-bold text-stone-900 dark:text-white">{{ Math.round(score) }}/120</span>
                </div>
                <div class="w-full h-2 bg-stone-200 dark:bg-stone-800">
                  <div class="h-full bg-stone-900 dark:bg-white transition-all"
                    :style="`width: ${(score / 120) * 100}%`"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-20 border-2 border-dashed border-stone-300 dark:border-stone-700">
            <h3 class="text-stone-400 dark:text-stone-600 font-semibold">Данные тестирования отсутствуют</h3>
          </div>
        </div>

        <!-- Emotions Tab -->
        <div v-if="activeTab === 'emotions'" class="space-y-6">
          <h3 class="text-xl font-bold text-stone-900 dark:text-white">История состояний</h3>
          <div v-if="emotionsLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
          </div>
          <div v-else-if="emotionsData && emotionsData.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(entry, idx) in emotionsData" :key="idx"
              class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-1">{{
                    entry.emotion }}</div>
                  <h4 class="text-base font-bold text-stone-900 dark:text-white">{{ entry.subEmotion }}</h4>
                </div>
                <div class="text-xs text-stone-500 dark:text-stone-400">{{ formatDate(entry.timestamp) }}</div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between text-xs">
                  <span class="text-stone-500 dark:text-stone-400">Интенсивность</span>
                  <span class="font-bold text-stone-900 dark:text-white">{{ entry.intensity }}/10</span>
                </div>
                <div class="w-full h-1.5 bg-stone-200 dark:bg-stone-800">
                  <div class="h-full bg-stone-900 dark:bg-white" :style="`width: ${entry.intensity * 10}%`"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-20 border-2 border-dashed border-stone-300 dark:border-stone-700">
            <h3 class="text-stone-400 dark:text-stone-600 font-semibold">Данных об эмоциях пока нет</h3>
          </div>
        </div>

        <!-- Training Tab -->
        <div v-if="activeTab === 'training'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-stone-900 dark:text-white">Журнал занятий</h3>
            <button
              class="px-4 py-2 border border-stone-300 dark:border-stone-700 text-xs font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800">
              Экспорт
            </button>
          </div>
          <div v-if="trainingLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
          </div>
          <div v-else-if="trainingData && trainingData.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(result, idx) in trainingData" :key="idx"
              class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 hover:border-stone-900 dark:hover:border-white transition-colors">
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 bg-stone-900 dark:bg-white flex items-center justify-center">
                  <i class="fas fa-gamepad text-white dark:text-stone-900"></i>
                </div>
                <div class="text-xs text-stone-500 dark:text-stone-400">{{ formatDate(result.timestamp) }}</div>
              </div>
              <h4 class="text-base font-bold text-stone-900 dark:text-white mb-4">{{ EXERCISE_NAMES[result.exerciseType]
                || result.exerciseType }}</h4>
              <div class="flex items-baseline justify-between mb-3">
                <span
                  class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Результат</span>
                <span class="text-2xl font-bold text-stone-900 dark:text-white">{{ result.score }}</span>
              </div>
              <!-- Additional Metrics -->
              <div v-if="result.accuracy !== undefined || result.avgReactionTime"
                class="flex items-center gap-4 pt-3 border-t border-stone-200 dark:border-stone-800">
                <div v-if="result.accuracy !== undefined" class="flex flex-col">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Точность</span>
                  <span class="text-sm font-bold text-stone-900 dark:text-white">{{ result.accuracy }}%</span>
                </div>
                <div v-if="result.avgReactionTime"
                  class="flex flex-col border-l border-stone-200 dark:border-stone-800 pl-4">
                  <span
                    class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Реакция</span>
                  <span class="text-sm font-bold text-stone-900 dark:text-white">{{ result.avgReactionTime }}ms</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-20 border-2 border-dashed border-stone-300 dark:border-stone-700">
            <h3 class="text-stone-400 dark:text-stone-600 font-semibold">Тренировки еще не проводились</h3>
          </div>
        </div>

        <!-- Notes Tab -->
        <div v-if="activeTab === 'notes'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-stone-900 border-l-4 border-stone-900 dark:border-white p-6">
            <h3 class="text-xl font-bold text-stone-900 dark:text-white mb-4">Новая заметка</h3>
            <div class="relative group">
              <textarea v-model="newNote" placeholder="Введите текст заметки..."
                class="w-full h-32 p-3 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none resize-none mb-4 transition-all focus:border-stone-900 dark:focus:border-white"
                :class="[isListening ? 'ring-1 ring-red-500/50' : '']"></textarea>
              
              <!-- Interim Script Overlay (Mobile friendly feedback) -->
              <div v-if="isListening && interimTranscript" class="absolute inset-x-3 bottom-14 pointer-events-none">
                <p class="text-[10px] text-stone-400 dark:text-stone-500 italic bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm px-2 py-1 border border-stone-100 dark:border-stone-800 line-clamp-1">
                  {{ interimTranscript }}...
                </p>
              </div>

              <!-- Voice Toggle Button -->
              <div class="absolute right-3 bottom-7 flex items-center gap-2">
                <div v-if="isListening"
                  class="flex items-center gap-2 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest animate-pulse border border-red-200 dark:border-red-800/50">
                  <span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  Слушаю...
                </div>

                <div v-if="isSupported"
                  class="flex border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm overflow-hidden">
                  <button @click="dictationLang = 'ru-RU'"
                    class="px-2 py-1 text-[9px] font-bold border-r border-stone-200 dark:border-stone-800 transition-colors"
                    :class="dictationLang === 'ru-RU' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'text-stone-400 hover:text-stone-600'">
                    RU
                  </button>
                  <button @click="dictationLang = 'en-US'" class="px-2 py-1 text-[9px] font-bold transition-colors"
                    :class="dictationLang === 'en-US' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'text-stone-400 hover:text-stone-600'">
                    EN
                  </button>
                  <button @click="toggleSpeech"
                    class="px-3 py-1 flex items-center justify-center transition-all border-l border-stone-200 dark:border-stone-800"
                    :class="[
                      isListening ? 'bg-red-600 text-white hover:bg-red-700' : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                    ]" :title="isListening ? 'Остановить' : 'Начать диктовку'">
                    <i class="fas" :class="isListening ? 'fa-stop text-xs' : 'fa-microphone'"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="speechError" class="mb-4 text-[10px] font-bold text-red-500 uppercase flex items-center gap-1.5">
              <i class="fas fa-exclamation-circle"></i>
              Ошибка: {{ speechError }}
            </div>

            <button @click="saveNote" :disabled="!newNote || noteSaving || isListening"
              class="w-full py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-stone-800 dark:hover:bg-stone-100 disabled:opacity-50 transition-all active:scale-[0.98]">
              {{ noteSaving ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>

          <div class="lg:col-span-2">
            <div v-if="notesLoading" class="flex justify-center py-20">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
            </div>
            <div v-else-if="notes.length > 0" class="space-y-4">
              <div v-for="note in notes" :key="note.id"
                class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col">

                <!-- Note Header (Actions & Timestamp) -->
                <div
                  class="px-5 py-3 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-stone-50/50 dark:bg-stone-800/20">
                  <span class="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    {{ formatDate(note.timestamp || note.createdAt) }}
                  </span>
                  <div class="flex items-center gap-4">
                    <button v-if="!note.normalization" @click="normalizeNote(note)"
                      :disabled="normalizingNotes.has(note.id)"
                      class="text-[10px] font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1.5">
                      <i class="fas"
                        :class="normalizingNotes.has(note.id) ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'"></i>
                      {{ normalizingNotes.has(note.id) ? 'Обработка...' : 'Структурировать' }}
                    </button>
                    <button @click="handleNoteDelete(note.id)"
                      class="text-stone-300 hover:text-red-600 transition-colors">
                      <i class="fas fa-trash-alt text-[10px]"></i>
                    </button>
                  </div>
                </div>

                <!-- Main Content Area -->
                <div class="p-5 space-y-6">
                  <!-- Structured Analysis (Primary if exists) -->
                  <div v-if="note.normalization" class="space-y-4">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="h-px flex-1 bg-stone-100 dark:bg-stone-800"></div>
                      <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Аналитический
                        разрез</span>
                      <div class="h-px flex-1 bg-stone-100 dark:bg-stone-800"></div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div v-if="note.normalization.session_focus" class="space-y-1">
                        <span class="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Фокус
                          сессии</span>
                        <p class="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">{{
                          note.normalization.session_focus }}</p>
                      </div>
                      <div v-if="note.normalization.client_state" class="space-y-1">
                        <span class="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Состояние
                          клиента</span>
                        <p class="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">{{
                          note.normalization.client_state }}</p>
                      </div>
                      <div v-if="note.normalization.core_tension" class="space-y-1">
                        <span class="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Ключевое
                          напряжение</span>
                        <p class="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">{{
                          note.normalization.core_tension }}</p>
                      </div>
                      <div v-if="note.normalization.coach_intention" class="space-y-1">
                        <span class="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Намерение
                          коуча</span>
                        <p class="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">{{
                          note.normalization.coach_intention }}</p>
                      </div>
                      <div v-if="note.normalization.unresolved_thread"
                        class="md:col-span-2 space-y-1 pt-2 border-t border-stone-50 dark:border-stone-800/50">
                        <span class="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Неразрешенная
                          нить</span>
                        <p class="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">{{
                          note.normalization.unresolved_thread }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Raw Content (Secondary if structured exists, Primary otherwise) -->
                  <div :class="[
                    'space-y-3',
                    note.normalization ? 'pt-4 border-t border-stone-100 dark:border-stone-800 opacity-60 hover:opacity-100 transition-opacity' : ''
                  ]">
                    <div v-if="note.normalization" class="flex items-center gap-2 mb-1">
                      <span class="text-[9px] font-bold uppercase tracking-widest text-stone-400">Исходная
                        заметка</span>
                    </div>
                    <p class="text-sm leading-relaxed"
                      :class="note.normalization ? 'text-stone-500 dark:text-stone-400' : 'text-stone-800 dark:text-stone-200'">
                      {{ note.content }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-20 border-2 border-dashed border-stone-300 dark:border-stone-700">
              <h3 class="text-stone-400 dark:text-stone-600 font-semibold">История заметок пуста</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-32 border border-stone-200 dark:border-stone-800">
      <i class="fas fa-exclamation-triangle text-4xl text-stone-300 dark:text-stone-700 mb-4"></i>
      <h2 class="text-2xl font-bold text-stone-900 dark:text-white mb-4">Клиент не найден</h2>
      <NuxtLink to="/coach"
        class="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-stone-800 dark:hover:bg-stone-100">
        <i class="fas fa-arrow-left"></i> Вернуться
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getCoachClientDetails, addCoachNote, getCoachNotes, getClientTrainingResults, getClientEmotionHistory, updateCoachNoteNormalization, deleteCoachNote } from '~/api/firebase/coach';
import { useSpeechRecognition } from '~/composables/useSpeechRecognition';

definePageMeta({
  layout: 'coach',
  middleware: ['coach']
});

const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();
const db = getFirestore();

const loading = ref(true);
const client = ref(null);
const activeTab = ref('overview');
const tabs = [
  { id: 'overview', label: 'Обзор' },
  { id: 'personality', label: 'Личность' },
  { id: 'emotions', label: 'Эмоции' },
  { id: 'training', label: 'Тренировки' },
  { id: 'notes', label: 'Заметки' }
];

const big5Data = ref(null);
const big5Loading = ref(false);
const notes = ref([]);
const newNote = ref('');
const notesLoading = ref(false);
const noteSaving = ref(false);
const emotionsLoading = ref(false);
const trainingData = ref(null);
const trainingLoading = ref(false);
const normalizingNotes = ref(new Set());

// Speech Recognition setup
const {
  isSupported,
  isListening,
  transcript,
  interimTranscript,
  error: speechError,
  start: startSpeech,
  stop: stopSpeech,
  language: speechLang
} = useSpeechRecognition();

const dictationLang = ref('ru-RU');

watch(transcript, (newObj) => {
  if (newObj?.text) {
    const text = newObj.text;
    if (newNote.value) {
      newNote.value += ' ' + text;
    } else {
      newNote.value = text;
    }
  }
});

const toggleSpeech = () => {
  if (isListening.value) {
    stopSpeech();
  } else {
    startSpeech(dictationLang.value);
  }
};

const EXERCISE_NAMES = {
  targetTracking: 'Отслеживание целей',
  mentalShift: 'Ментальное переключение',
  patternDetection: 'Детекция паттернов',
  stroop: 'Тест Струпа',
  reaction: 'Время реакции',
  anagram: 'Анаграммы',
  nback: 'N-Back Lite',
  double: 'Дабл',
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
  } catch (err) {
    console.error('Error fetching Big 5:', err);
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
  if (!newNote.value || !client.value || !authStore.user) return;

  noteSaving.value = true;
  const res = await addCoachNote(authStore.user.uid, client.value.id, newNote.value);
  if (res.success) {
    newNote.value = '';
    await loadNotes();
  }
  noteSaving.value = false;
};

const normalizeNote = async (note) => {
  if (normalizingNotes.value.has(note.id)) return;

  normalizingNotes.value.add(note.id);
  try {
    const response = await fetch('/api/ai/normalize-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ noteContent: note.content })
    });

    if (!response.ok) throw new Error('Normalization failed');

    const normalizedData = await response.json();
    const res = await updateCoachNoteNormalization(note.id, normalizedData);

    if (res.success) {
      // Update local state
      const noteIndex = notes.value.findIndex(n => n.id === note.id);
      if (noteIndex !== -1) {
        notes.value[noteIndex].normalization = normalizedData;
        notes.value[noteIndex].normalizedAt = new Date();
      }
    }
  } catch (err) {
    console.error('Error normalizing note:', err);
  } finally {
    normalizingNotes.value.delete(note.id);
  }
};

const handleNoteDelete = async (noteId) => {
  if (!confirm('Вы уверены, что хотите удалить эту заметку?')) return;

  try {
    const res = await deleteCoachNote(noteId);
    if (res.success) {
      notes.value = notes.value.filter(n => n.id !== noteId);
    } else {
      alert('Ошибка при удалении заметки');
    }
  } catch (err) {
    console.error('Error deleting note:', err);
    alert('Произошла ошибка при удалении');
  }
};

const loadEmotions = async () => {
  if (!client.value || emotionsData.value) return;
  emotionsLoading.value = true;
  emotionsData.value = await getClientEmotionHistory(client.value.id);
  emotionsLoading.value = false;
};

const loadTraining = async () => {
  if (!client.value || trainingData.value) return;
  trainingLoading.value = true;
  trainingData.value = await getClientTrainingResults(client.value.id);
  trainingLoading.value = false;
};

const formatDate = (ts) => {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

watch(activeTab, (newTab) => {
  if (newTab === 'personality') loadBig5Data();
  if (newTab === 'emotions') loadEmotions();
  if (newTab === 'training') loadTraining();
  if (newTab === 'notes') loadNotes();
}, { immediate: true });

onMounted(fetchData);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
