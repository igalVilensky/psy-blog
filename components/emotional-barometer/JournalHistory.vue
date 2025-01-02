<template>
  <div class="bg-white shadow-xl rounded-2xl p-3 sm:p-6 border border-gray-100">
    <!-- Back Navigation -->
    <nuxt-link
      to="/awareness-tools/emotional-barometer"
      class="inline-flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-4 sm:mb-8 group text-sm sm:text-base"
    >
      <i
        class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
      ></i>
      Вернуться
    </nuxt-link>

    <!-- Header with Icon -->
    <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
      <div
        class="w-9 h-9 sm:w-11 sm:h-11 p-2 sm:p-3 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center flex-shrink-0"
      >
        <i class="fas fa-book text-[#FF6B6B] text-sm sm:text-base"></i>
      </div>
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#4A4238]">
        История эмоций
      </h2>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
      <select
        v-model="emotionFilter"
        class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
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
        class="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
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
      <i class="fas fa-spinner fa-spin fa-lg sm:fa-2x text-[#FF6B6B]"></i>
      <p class="text-gray-600 text-base sm:text-lg font-medium">
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
        class="p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all"
      >
        <!-- Entry Header -->
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2 sm:mb-3"
        >
          <!-- Emotion Info -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-sm sm:text-base text-[#4A4238]">
              {{ entry.emotion }}
              <span class="text-gray-500 text-xs sm:text-sm font-semibold"
                >({{ entry.subEmotion }})</span
              >
            </span>
            <span
              class="px-2 py-0.5 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-600 shadow-sm whitespace-nowrap"
            >
              {{ entry.intensity }}/10
            </span>
          </div>
          <!-- Date -->
          <span class="text-xs sm:text-sm text-gray-500">
            {{ formatDate(entry.timestamp) }}
          </span>
        </div>

        <!-- Journal Entry -->
        <div class="mb-2 sm:mb-3">
          <p class="font-semibold text-xs sm:text-sm text-[#6B5B4C]">
            Описание:
          </p>
          <p class="text-xs sm:text-sm text-[#6B5B4C]">{{ entry.entry }}</p>
        </div>

        <!-- Perception Entry -->
        <div class="mb-2 sm:mb-3">
          <p class="font-semibold text-xs sm:text-sm text-[#6B5B4C]">
            Восприятие:
          </p>
          <p class="text-xs sm:text-sm text-[#6B5B4C]">
            {{ entry.perception }}
          </p>
        </div>

        <!-- Coping Entry -->
        <div class="mb-2 sm:mb-3">
          <p class="font-semibold text-xs sm:text-sm text-[#6B5B4C]">
            Стратегии совладания:
          </p>
          <p class="text-xs sm:text-sm text-[#6B5B4C]">{{ entry.coping }}</p>
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
  return sphere ? sphere.color : "bg-gray-100";
};
</script>
