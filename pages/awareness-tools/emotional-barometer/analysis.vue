<template>
  <div
    class="bg-gradient-to-br from-pink-50 via-rose-50 to-white min-h-screen py-6 sm:py-12"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1">
        <!-- Analysis Section -->
        <EmotionalAnalysis :patterns="emotionPatterns" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import EmotionalAnalysis from "~/components/emotional-barometer/EmotionalAnalysis.vue";

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
      };
    }
    acc[entry.emotion].count++;
    acc[entry.emotion].avgIntensity += entry.intensity;
    entry.tags.forEach((tag) => {
      acc[entry.emotion].commonSpheres[tag] =
        (acc[entry.emotion].commonSpheres[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // Calculate averages
  Object.keys(patterns).forEach((emotion) => {
    patterns[emotion].avgIntensity /= patterns[emotion].count;
  });

  return patterns;
});

// Listen for auth state changes
onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    loadDataFromFirebase(currentUser.uid);
  }
});

// Load entries from Firebase
const loadDataFromFirebase = async (userId) => {
  const userRef = doc(db, "emotion_barometer", userId);

  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      entries.value = data.entries || [];
    } else {
      console.log("No entries found for user");
      entries.value = [];
    }
  } catch (error) {
    console.error("Error loading data from Firebase:", error);
  }
};

// Trigger loading data when the component mounts
loadDataFromFirebase(user.value ? user.value.uid : null);
</script>
