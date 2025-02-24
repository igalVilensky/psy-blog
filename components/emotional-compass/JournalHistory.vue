<template>
  <div class="relative min-h-screen">
    <!-- Header with Icon -->
    <div class="flex items-center gap-4 my-8 px-4 sm:px-0">
      <div
        class="w-12 h-12 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
      >
        <i class="fas fa-book text-xl text-[#0EA5E9]"></i>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-white/90">
        История эмоций
      </h2>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 px-4 sm:px-0">
      <select
        v-model="emotionFilter"
        class="w-full px-4 py-2.5 rounded-lg border border-[#0EA5E9]/20 text-sm focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all bg-[#1A1F35]/40 text-slate-300"
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
        class="w-full px-4 py-2.5 rounded-lg border border-[#0EA5E9]/20 text-sm focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition-all bg-[#1A1F35]/40 text-slate-300"
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
    <div v-if="loading" class="flex flex-col items-center gap-4 py-12">
      <i class="fas fa-spinner fa-spin fa-2x text-[#0EA5E9]"></i>
      <p class="text-slate-300 text-base font-medium">
        Пожалуйста, подождите...
      </p>
    </div>

    <!-- Journal Entries List -->
    <div
      class="space-y-4 max-h-[calc(100vh-230px)] sm:max-h-[calc(100vh-250px)] overflow-y-auto pr-2"
    >
      <div
        v-for="(entry, index) in filteredEntries"
        :key="index"
        class="p-6 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <!-- Entry Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
          <!-- Emotion Info -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-lg text-white/90">
              {{ entry.emotion }}
              <span class="text-slate-300 text-sm font-semibold"
                >({{ entry.subEmotion }})</span
              >
            </span>
            <span
              class="px-3 py-1 bg-[#1A1F35]/40 text-[#0EA5E9] text-sm font-medium rounded-full border border-[#0EA5E9]/20"
            >
              {{ entry.intensity }}/10
            </span>
          </div>
          <!-- Date -->
          <span class="text-sm text-slate-300">
            {{ formatDate(entry.timestamp) }}
          </span>
        </div>

        <!-- Journal Entry -->
        <div class="mb-4">
          <p class="font-semibold text-sm text-slate-300">Описание:</p>
          <p class="text-sm text-slate-300">{{ entry.entry }}</p>
        </div>

        <!-- Perception Entry -->
        <div class="mb-4">
          <p class="font-semibold text-sm text-slate-300">Восприятие:</p>
          <p class="text-sm text-slate-300">{{ entry.perception }}</p>
        </div>

        <!-- Coping Entry -->
        <div class="mb-4">
          <p class="font-semibold text-sm text-slate-300">
            Стратегии совладания:
          </p>
          <p class="text-sm text-slate-300">{{ entry.coping }}</p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in entry.tags"
            :key="tag"
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium text-white backdrop-blur-sm',
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
  return sphere
    ? sphere.color
    : "bg-gradient-to-r from-[#0EA5E9]/60 to-[#22D3EE]/60"; // Fallback gradient
};
</script>
