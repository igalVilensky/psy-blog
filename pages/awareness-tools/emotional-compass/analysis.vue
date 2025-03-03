<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-6xl relative z-10 py-12 px-4 sm:px-0">
      <div class="grid grid-cols-1">
        <!-- Analysis Section -->
        <EmotionalAnalysis :patterns="emotionPatterns" :entries="entries" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getEmotionBarometerData } from "~/api/firebase/emotionBarometer";
import EmotionalAnalysis from "~/components/emotional-compass/EmotionalAnalysis.vue";

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

// Fetch entries using API method
const fetchEntries = async (userId) => {
  const result = await getEmotionBarometerData(db, userId);
  console.log(result);

  if (result.success) {
    entries.value = result.data.entries; // Fix: Use result.data.entries
  } else {
    console.error(result.message);
    entries.value = [];
  }
};

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    await fetchEntries(currentUser.uid);
  }
});
</script>
