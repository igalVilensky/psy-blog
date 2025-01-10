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
      <div
        class="bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-3 sm:p-6"
      >
        <!-- Back Navigation -->
        <nuxt-link
          to="/awareness-tools/emotional-barometer"
          class="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-4 sm:mb-8 group text-sm sm:text-base"
        >
          <i
            class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
          ></i>
          Вернуться
        </nuxt-link>

        <!-- Header with Icon -->
        <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          <div
            class="w-9 h-9 sm:w-11 sm:h-11 p-2 sm:p-3 bg-indigo-500/10 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-book text-indigo-500 text-sm sm:text-base"></i>
          </div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
            История эмоций
          </h2>
        </div>

        <!-- Filters -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
          <select
            v-model="emotionFilter"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-indigo-500/20 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-[#1E1B4B]/40 text-indigo-200/80"
          >
            <option value="">Все эмоции</option>
            <option
              v-for="emotion in emotions"
              :key="emotion.id"
              :value="emotion.name"
            >
              {{ emotion.name }}
            </option>
          </select>
          <select
            v-model="sphereFilter"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-indigo-500/20 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-[#1E1B4B]/40 text-indigo-200/80"
          >
            <option value="">Все сферы</option>
            <option
              v-for="sphere in lifeSpheres"
              :key="sphere.name"
              :value="sphere.name"
            >
              {{ sphere.name }}
            </option>
          </select>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center gap-3 sm:gap-4">
          <i class="fas fa-spinner fa-spin fa-lg sm:fa-2x text-indigo-400"></i>
          <p class="text-indigo-200/80 text-base sm:text-lg font-medium">
            Пожалуйста, подождите...
          </p>
        </div>

        <!-- Journal Entries List -->
        <div
          class="space-y-3 sm:space-y-4 max-h-[calc(100vh-230px)] sm:max-h-[calc(100vh-250px)] overflow-y-auto pr-1 sm:pr-2"
        >
          <div
            v-for="(entry, index) in filteredEntries"
            :key="index"
            class="p-3 sm:p-4 rounded-xl bg-[#1E1B4B]/40 backdrop-blur-xl border border-indigo-500/20 hover:shadow-md transition-all"
          >
            <!-- Entry Header -->
            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2 sm:mb-3"
            >
              <!-- Emotion Info -->
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-bold text-sm sm:text-base text-white/90">
                  {{ entry.emotion }}
                  <span
                    class="text-indigo-200/80 text-xs sm:text-sm font-semibold"
                    >({{ entry.subEmotion }})</span
                  >
                </span>
                <span
                  class="px-2 py-0.5 bg-[#1E1B4B]/40 rounded-full text-xs sm:text-sm font-medium text-indigo-200/80 shadow-sm whitespace-nowrap"
                >
                  {{ entry.intensity }}/10
                </span>
              </div>
              <!-- Date -->
              <span class="text-xs sm:text-sm text-indigo-200/80">
                {{ formatDate(entry.timestamp) }}
              </span>
            </div>

            <!-- Journal Entry -->
            <div class="mb-2 sm:mb-3">
              <p class="font-semibold text-xs sm:text-sm text-indigo-200/80">
                Описание:
              </p>
              <p class="text-xs sm:text-sm text-indigo-200/80">
                {{ entry.entry }}
              </p>
            </div>

            <!-- Perception Entry -->
            <div class="mb-2 sm:mb-3">
              <p class="font-semibold text-xs sm:text-sm text-indigo-200/80">
                Восприятие:
              </p>
              <p class="text-xs sm:text-sm text-indigo-200/80">
                {{ entry.perception }}
              </p>
            </div>

            <!-- Coping Entry -->
            <div class="mb-2 sm:mb-3">
              <p class="font-semibold text-xs sm:text-sm text-indigo-200/80">
                Стратегии совладания:
              </p>
              <p class="text-xs sm:text-sm text-indigo-200/80">
                {{ entry.coping }}
              </p>
            </div>

            <div class="flex flex-wrap gap-1.5 sm:gap-2">
              <span
                v-for="tag in entry.tags"
                :key="tag"
                :class="[
                  'px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium',
                  getTagColor(tag),
                ]"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  emotions: { type: Array, required: true },
  lifeSpheres: { type: Array, required: true },
  entries: { type: Array, required: true },
});

const emotionFilter = ref("");
const sphereFilter = ref("");

const filteredEntries = computed(() => {
  return props.entries.filter(
    (entry) =>
      (!emotionFilter.value || entry.emotion === emotionFilter.value) &&
      (!sphereFilter.value || entry.tags.includes(sphereFilter.value))
  );
});

const loading = computed(() => {
  return (
    !props.emotions ||
    props.emotions.length === 0 ||
    !props.lifeSpheres ||
    props.lifeSpheres.length === 0 ||
    !props.entries ||
    props.entries.length === 0
  );
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTagColor = (tagName) => {
  const sphere = props.lifeSpheres.find((s) => s.name === tagName);
  return sphere ? sphere.color : "bg-[#1E1B4B]/40";
};
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
