<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Breadcrumbs -->
      <Breadcrumbs />

      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-montserrat mb-3 tracking-tight">
              <i class="fas fa-chart-network mr-3 text-cyan-600 dark:text-cyan-400"></i>Анализ Данных
            </h1>
            <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Детальная статистика и паттерны вашего эмоционального состояния
            </p>
          </div>
        </div>
      </div>

      <!-- Analysis Section -->
      <div v-if="entries.length > 0">
         <EmotionalAnalysis :patterns="emotionPatterns" :entries="entries" />
      </div>
      <div v-else class="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <i class="fas fa-database text-slate-400 dark:text-slate-600 text-2xl"></i>
          </div>
          <h3 class="text-xl font-mono text-slate-500 dark:text-slate-400 mb-2">НЕТ ДАННЫХ</h3>
          <p class="text-slate-600 dark:text-slate-500 max-w-md mx-auto">
            База данных пуста. Создайте первую запись в Эмоциональном Компасе для активации аналитических модулей.
          </p>
          <NuxtLink
            to="/lab/growth/emotional-compass"
            class="inline-block mt-6 px-6 py-2 rounded-lg bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 transition-all font-mono"
          >
            СОЗДАТЬ ЗАПИСЬ
          </NuxtLink>
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
    const intensity = parseFloat(entry.intensity) || 0;
    acc[entry.emotion].avgIntensity += intensity;

    (entry.tags || []).forEach((tag) => {
      acc[entry.emotion].commonSpheres[tag] =
        (acc[entry.emotion].commonSpheres[tag] || 0) + 1;
    });

    if (entry.subEmotion) {
      if (!acc[entry.emotion].subEmotions[entry.subEmotion]) {
        acc[entry.emotion].subEmotions[entry.subEmotion] = {
          count: 0,
          avgIntensity: 0,
        };
      }
      acc[entry.emotion].subEmotions[entry.subEmotion].count++;
      acc[entry.emotion].subEmotions[entry.subEmotion].avgIntensity +=
        parseFloat(entry.intensity) || 0;
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
  const result = await emotionBarometerService.getHistory(db, currentUser);
  
  if (result.success) {
    entries.value = result.data.entries;
  } else {
    console.error(result.message);
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
