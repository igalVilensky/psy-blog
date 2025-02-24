<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto px-4 sm:px-0 max-w-6xl relative z-10 py-8">
      <div class="grid grid-cols-1 gap-4 sm:gap-8">
        <!-- Back Navigation -->
        <nuxt-link
          to="/awareness-tools/emotional-compass"
          class="inline-flex items-center text-[#0EA5E9] hover:text-[#22D3EE] transition-colors group"
        >
          <i
            class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
          ></i>
          <span class="text-sm font-medium">Вернуться</span>
        </nuxt-link>
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
import JournalHistory from "~/components/emotional-compass/JournalHistory.vue";
import EmotionChart from "~/components/emotional-compass/EmotionChart.vue";

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
