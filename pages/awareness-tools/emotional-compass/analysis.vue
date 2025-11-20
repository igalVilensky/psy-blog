<template>
  <div class="relative min-h-screen text-slate-200">
    <div class="container mx-auto max-w-6xl relative z-10 py-12 px-4 xl:px-0">
      <div class="grid grid-cols-1 gap-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-mono font-bold text-cyan-300">
            <i class="fas fa-chart-network mr-3"></i>АНАЛИЗ ДАННЫХ
          </h1>
          <NuxtLink
            to="/awareness-tools/emotional-compass"
            class="px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors font-mono flex items-center gap-2 text-sm"
          >
            <i class="fas fa-arrow-left"></i> НАЗАД
          </NuxtLink>
        </div>

        <!-- Analysis Section -->
        <div class="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div v-if="entries.length > 0">
             <EmotionalAnalysis :patterns="emotionPatterns" :entries="entries" />
          </div>
          <div v-else class="text-center py-12">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
              <i class="fas fa-database text-slate-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-mono text-slate-400 mb-2">НЕТ ДАННЫХ</h3>
            <p class="text-slate-500 max-w-md mx-auto">
              База данных пуста. Создайте первую запись в Эмоциональном Компасе для активации аналитических модулей.
            </p>
            <NuxtLink
              to="/awareness-tools/emotional-compass"
              class="inline-block mt-6 px-6 py-2 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 transition-all font-mono"
            >
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
