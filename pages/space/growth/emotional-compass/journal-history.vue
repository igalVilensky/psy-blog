<template>
  <div class="relative min-h-screen text-slate-800 dark:text-slate-200">
    <div class="container mx-auto px-4 xl:px-0 max-w-6xl relative z-10 py-12">
      <div class="grid grid-cols-1 gap-8">
        <!-- Breadcrumbs -->
        <Breadcrumbs />

        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-mono font-bold text-purple-600 dark:text-purple-300">
            <i class="fas fa-history mr-3"></i>ИСТОРИЯ ЖУРНАЛА
          </h1>
        </div>

        <div v-if="entries.length > 0" class="grid grid-cols-1 gap-8">
           <!-- Journal History Section -->
          <div
            class="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
          >
            <JournalHistory
              :emotions="emotions"
              :life-spheres="lifeSpheres"
              :entries="entries"
            />
          </div>

          <!-- Emotion Chart -->
          <div
            class="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
          >
            <h3 class="text-xl font-mono font-bold text-cyan-600 dark:text-cyan-300 mb-6">ГРАФИК ЭМОЦИЙ</h3>
            <EmotionChart :entries="entries" :emotions="emotions" />
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
           <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <i class="fas fa-book-open text-slate-400 dark:text-slate-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-mono text-slate-500 dark:text-slate-400 mb-2">ЖУРНАЛ ПУСТ</h3>
            <p class="text-slate-600 dark:text-slate-500 max-w-md mx-auto">
              Записи отсутствуют. Начните вести дневник эмоций, чтобы отслеживать свое состояние во времени.
            </p>
            <NuxtLink
              to="/space/growth/emotional-compass"
              class="inline-block mt-6 px-6 py-2 rounded-lg bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-all font-mono"
            >
              СОЗДАТЬ ЗАПИСЬ
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

// Fetch entries using service
const fetchEntries = async (currentUser) => {
  const result = await emotionBarometerService.getHistory(db, currentUser);
  
  if (result.success) {
    entries.value = result.data.entries.map((entry) => ({
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
};

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  user.value = currentUser;
  // Fetch entries regardless of auth state (supports guest mode)
  await fetchEntries(currentUser);
});
</script>

