<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Breadcrumbs -->
      <Breadcrumbs />

      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2 px-4 xl:px-0">
          <h1 class="text-3xl font-mono font-bold text-cyan-600 dark:text-cyan-300">
            <i class="fas fa-chart-line mr-3"></i>АНАЛИЗ СОСТОЯНИЙ
          </h1>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base px-4 xl:px-0">
          Детальная статистика и паттерны вашего эмоционального состояния
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading"
        class="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-24 text-center mt-8">
        <div class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4">
        </div>
        <p class="text-slate-500 animate-pulse font-mono uppercase tracking-widest">Анализируем ваши данные...</p>
      </div>

      <div v-else>
        <!-- Emotional Analysis Component -->
        <EmotionalAnalysis v-if="Object.keys(emotionPatterns).length > 0" :patterns="emotionPatterns"
          :emotions="emotions" class="my-8" />

        <!-- Empty State -->
        <div v-else
          class="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center my-8">
          <div class="text-center py-12">
            <div
              class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <i class="fas fa-database text-slate-400 dark:text-slate-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-mono text-slate-500 dark:text-slate-400 mb-2">НЕТ ДАННЫХ</h3>
            <p class="text-slate-600 dark:text-slate-500 max-w-md mx-auto">
              База данных пуста. Создайте первую запись в Эмоциональном Компасе для активации аналитических модулей.
            </p>
            <NuxtLink to="/space/growth/emotional-compass"
              class="inline-block mt-6 px-6 py-2 rounded-lg bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 transition-all font-mono">
              СОЗДАТЬ ЗАПИСЬ
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
