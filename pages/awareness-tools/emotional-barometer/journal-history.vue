<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Enhanced Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift opacity-60"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse opacity-40"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float opacity-50"
        ></div>
      </div>
    </div>

    <div class="container mx-auto sm:px-4 max-w-6xl relative z-10 py-12">
      <div class="grid grid-cols-1 gap-8">
        <!-- Journal History Section -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 sm:p-8 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <JournalHistory
            :emotions="emotions"
            :lifeSpheres="lifeSpheres"
            :entries="entries"
          />
        </div>

        <!-- Emotion Chart -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 sm:p-8 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
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
];
const lifeSpheres = [
  {
    name: "Работа",
    color: "bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]",
  },
  {
    name: "Семья",
    color: "bg-gradient-to-r from-[#E879F9] to-[#C084FC]",
  },
  {
    name: "Здоровье",
    color: "bg-gradient-to-r from-[#F59E0B] to-[#F97316]",
  },
  {
    name: "Личностный рост",
    color: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
  },
  {
    name: "Отношения",
    color: "bg-gradient-to-r from-[#EF4444] to-[#F87171]",
  },
  {
    name: "Хобби",
    color: "bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]",
  },
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
