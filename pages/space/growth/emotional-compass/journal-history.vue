<template>
  <div
    class="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-500 font-sans">
    <div class="container mx-auto px-6 max-w-6xl relative z-10 py-12">
      <div class="grid grid-cols-1 gap-12">
        <!-- Breadcrumbs -->
        <Breadcrumbs />

        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-3">
              История Журнала
            </h1>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-2xl">
              Просмотр и анализ ваших прошлых записей для отслеживания динамики изменений.
            </p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <i class="fas fa-history text-purple-600 dark:text-purple-400 text-xl"></i>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading"
          class="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-24 text-center shadow-sm">
          <div
            class="w-20 h-20 border-[6px] border-purple-500/10 border-t-purple-500 rounded-full animate-spin mx-auto mb-8">
          </div>
          <p class="text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px] animate-pulse">Загрузка архива...
          </p>
        </div>

        <div v-else-if="entries.length > 0" class="grid grid-cols-1 gap-12">
          <!-- Journal History Section -->
          <div
            class="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <JournalHistory :emotions="emotions" :life-spheres="lifeSpheres" :entries="entries" />
          </div>

          <!-- Emotion Chart -->
          <div
            class="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm overflow-hidden">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                <i class="fas fa-chart-area text-sm"></i>
              </div>
              График Эмоций
            </h3>
            <EmotionChart :entries="entries" :emotions="emotions" />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else
          class="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-16 text-center shadow-sm">
          <div
            class="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shadow-inner">
            <i class="fas fa-book-open text-zinc-300 dark:text-zinc-600 text-3xl"></i>
          </div>
          <h3 class="text-xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">Журнал пуст</h3>
          <p class="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-medium leading-relaxed text-sm">
            Записи отсутствуют. Начните вести дневник эмоций, чтобы отслеживать свое состояние во времени.
          </p>
          <NuxtLink to="/space/growth/emotional-compass"
            class="inline-flex mt-10 px-8 py-4 rounded-2xl bg-purple-600 text-white font-black uppercase tracking-widest text-xs hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/25 active:scale-95">
            Создать запись
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { emotionBarometerService } from "~/services/emotionBarometerService";
import JournalHistory from "~/components/emotional-compass/JournalHistory.vue";
import EmotionChart from "~/components/emotional-compass/EmotionChart.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

// Static data for emotions and life spheres (kept for chart colors/mapping)
const emotions = ref([
  {
    id: 1,
    name: "Радость",
    color: "bg-yellow-100",
    activeColor: "bg-gradient-to-r from-[#F59E0B] to-[#F97316]",
  },
  {
    id: 2,
    name: "Грусть",
    color: "bg-blue-100",
    activeColor: "bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]",
  },
  {
    id: 3,
    name: "Страх",
    color: "bg-purple-100",
    activeColor: "bg-gradient-to-r from-[#E879F9] to-[#C084FC]",
  },
  {
    id: 4,
    name: "Гнев",
    color: "bg-red-100",
    activeColor: "bg-gradient-to-r from-[#EF4444] to-[#F87171]",
  },
  {
    id: 5,
    name: "Удивление",
    color: "bg-green-100",
    activeColor: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
  },
]);

const lifeSpheres = ref([
  { name: "Работа", color: "bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]" },
  { name: "Семья", color: "bg-gradient-to-r from-[#E879F9] to-[#C084FC]" },
  { name: "Здоровье", color: "bg-gradient-to-r from-[#F59E0B] to-[#F97316]" },
  {
    name: "Личностный рост",
    color: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
  },
  { name: "Отношения", color: "bg-gradient-to-r from-[#EF4444] to-[#F87171]" },
  { name: "Хобби", color: "bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]" },
]);

const user = ref(null);
const auth = getAuth();
const db = getFirestore();
const entries = ref([]);
const isLoading = ref(true);

// Fetch entries using service
const fetchEntries = async (currentUser) => {
  isLoading.value = true;
  const result = await emotionBarometerService.getHistory(db, currentUser);

  if (result.success) {
    // Sort descending by timestamp (newest first)
    const sortedEntries = (result.data.entries || []).sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    entries.value = sortedEntries.map((entry) => ({
      ...entry,
      entry: entry.entry || "",
      perception: entry.perception || "",
      coping: entry.coping || "",
      action: entry.action || "",
      emotion: entry.emotion || "",
      subEmotion: entry.subEmotion || "",
      intensity: entry.intensity || 0,
      timestamp: entry.timestamp || "",
      tags: entry.tags || [],
    }));
  } else {
    console.error("Failed to fetch entries:", result.message);
    entries.value = [];
  }
  isLoading.value = false;
};

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  user.value = currentUser;
  // Fetch entries regardless of auth state (supports guest mode)
  await fetchEntries(currentUser);
});
</script>
