<template>
  <div
    class="relative min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E1B4B] py-6 sm:py-12"
  >
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#0F172A]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-float"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-float-delay"
        ></div>
        <!-- Animated Grid -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]/80"
        >
          <div class="absolute inset-0 bg-grid-white/[0.02] animate-grid"></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      <div class="grid grid-cols-1">
        <!-- Journal History Section -->
        <div
          class="bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-6"
        >
          <JournalHistory
            :emotions="emotions"
            :lifeSpheres="lifeSpheres"
            :entries="entries"
          />
        </div>

        <!-- Emotion Chart -->
        <div
          class="mt-8 bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-6"
        >
          <EmotionChart :entries="entries" :emotions="emotions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getEmotionBarometerData } from "~/api/firebase/emotionBarometer";
import JournalHistory from "~/components/emotional-barometer/JournalHistory.vue";
import EmotionChart from "~/components/emotional-barometer/EmotionChart.vue";

// Assuming these are defined in a separate file or passed from a store
const emotions = [
  {
    id: 1,
    name: "Радость",
    color: "bg-yellow-100",
    activeColor: "bg-yellow-500",
  },
  { id: 2, name: "Грусть", color: "bg-blue-100", activeColor: "bg-blue-500" },
  {
    id: 3,
    name: "Страх",
    color: "bg-purple-100",
    activeColor: "bg-purple-500",
  },
  { id: 4, name: "Гнев", color: "bg-red-100", activeColor: "bg-red-500" },
  {
    id: 5,
    name: "Удивление",
    color: "bg-green-100",
    activeColor: "bg-green-500",
  },
];

const lifeSpheres = [
  { name: "Работа", color: "bg-blue-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Семья", color: "bg-green-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Здоровье", color: "bg-purple-100", activeColor: "bg-[#FF6B6B]" },
  {
    name: "Личностный рост",
    color: "bg-yellow-100",
    activeColor: "bg-[#FF6B6B]",
  },
  { name: "Отношения", color: "bg-pink-100", activeColor: "bg-[#FF6B6B]" },
  { name: "Хобби", color: "bg-orange-100", activeColor: "bg-[#FF6B6B]" },
];

const user = ref(null);
const auth = getAuth();
const db = getFirestore();
const entries = ref([]);

// Fetch entries using API method
const fetchEntries = async (userId) => {
  const result = await getEmotionBarometerData(db, userId);
  console.log(result);

  if (result.success) {
    entries.value = result.data;
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
<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-grid {
  animation: grid 20s linear infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1b4b;
}

::-webkit-scrollbar-thumb {
  background: #4f46e5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6366f1;
}
</style>
