<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 font-sans">
    <div class="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <!-- Breadcrumbs -->
      <Breadcrumbs />

      <!-- Header -->
      <div class="mb-12">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-4 xl:px-0">
          <div>
            <h1 class="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-3">
              Анализ Состояний
            </h1>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
              Детальная статистика и паттерны вашего эмоционального ландшафта на основе зафиксированных данных.
            </p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <i class="fas fa-chart-line text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading"
        class="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-24 text-center mt-8 shadow-sm">
        <div class="w-20 h-20 border-[6px] border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mx-auto mb-8">
        </div>
        <p class="text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px] animate-pulse">Синхронизация данных...
        </p>
      </div>

      <div v-else>
        <!-- Emotional Analysis Component -->
        <EmotionalAnalysis v-if="Object.keys(emotionPatterns).length > 0" :patterns="emotionPatterns"
          :emotions="emotions" class="my-8" />

        <!-- Empty State -->
        <div v-else
          class="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-16 text-center my-8 shadow-sm">
          <div class="text-center py-12">
            <div
              class="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shadow-inner">
              <i class="fas fa-database text-zinc-300 dark:text-zinc-600 text-3xl"></i>
            </div>
            <h3 class="text-xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">База данных пуста
            </h3>
            <p class="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-medium leading-relaxed text-sm">
              Для активации аналитических модулей необходимо зафиксировать хотя бы одно состояние в Эмоциональном
              Компасе.
            </p>
            <NuxtLink to="/space/growth/emotional-compass"
              class="inline-flex mt-10 px-8 py-4 rounded-2xl bg-cyan-600 text-white font-black uppercase tracking-widest text-xs hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-500/25 active:scale-95">
              Начать практику
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { emotionBarometerService } from "~/services/emotionBarometerService";
import EmotionalAnalysis from "~/components/emotional-compass/EmotionalAnalysis.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const user = ref(null);
const auth = getAuth();
const db = getFirestore();
const entries = ref([]);
const isLoading = ref(true);

const emotions = ref([
  {
    id: 1,
    name: "Радость",
    color: "bg-yellow-100",
    activeColor: "bg-gradient-to-r from-[#FACC15] to-[#FDE047]",
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

// Emotion pattern analysis
const emotionPatterns = computed(() => {
  const patterns = entries.value.reduce((acc, entry) => {
    if (!acc[entry.emotion]) {
      acc[entry.emotion] = {
        count: 0,
        avgIntensity: 0,
        commonSpheres: {},
        subEmotions: {},
      };
    }

    acc[entry.emotion].count++;
    const intensity = parseFloat(entry.intensity || entry.affect?.intensity) || 0;
    acc[entry.emotion].avgIntensity += intensity;

    (entry.tags || []).forEach((tag) => {
      acc[entry.emotion].commonSpheres[tag] =
        (acc[entry.emotion].commonSpheres[tag] || 0) + 1;
    });

    if (entry.context?.triggers) {
      entry.context.triggers.forEach(tag => {
        acc[entry.emotion].commonSpheres[tag] = (acc[entry.emotion].commonSpheres[tag] || 0) + 1;
      });
    }

    if (entry.needs) {
      if (!acc[entry.emotion].commonNeeds) acc[entry.emotion].commonNeeds = {};
      entry.needs.forEach(need => {
        acc[entry.emotion].commonNeeds[need] = (acc[entry.emotion].commonNeeds[need] || 0) + 1;
      });
    }

    const subEmotion = entry.subEmotion || entry.labeling?.secondary;
    if (subEmotion) {
      if (!acc[entry.emotion].subEmotions[subEmotion]) {
        acc[entry.emotion].subEmotions[subEmotion] = {
          count: 0,
          avgIntensity: 0,
        };
      }
      acc[entry.emotion].subEmotions[subEmotion].count++;
      acc[entry.emotion].subEmotions[subEmotion].avgIntensity += intensity;
    }

    return acc;
  }, {});

  Object.keys(patterns).forEach((emotion) => {
    if (patterns[emotion].count > 0) {
      patterns[emotion].avgIntensity /= patterns[emotion].count;
    }

    if (patterns[emotion].subEmotions) {
      Object.keys(patterns[emotion].subEmotions).forEach((subEmotion) => {
        const subEmotionPattern = patterns[emotion].subEmotions[subEmotion];
        if (subEmotionPattern.count > 0) {
          subEmotionPattern.avgIntensity /= subEmotionPattern.count;
        }
      });
    }
  });

  return patterns;
});

// Fetch entries using service
const fetchEntries = async (currentUser) => {
  isLoading.value = true;
  const result = await emotionBarometerService.getHistory(db, currentUser);

  if (result.success) {
    entries.value = result.data.entries || [];
  } else {
    console.error(result.message);
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
