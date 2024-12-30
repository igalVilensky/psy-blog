<template>
  <div class="bg-white shadow-xl rounded-2xl p-4 sm:p-6 border border-gray-100">
    <!-- Back Navigation -->
    <nuxt-link
      to="/awareness-tools/emotional-barometer"
      class="inline-flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-8 group"
    >
      <i
        class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
      ></i>
      Вернуться
    </nuxt-link>

    <!-- Header with Icon -->
    <div class="flex items-center gap-3 mb-8">
      <div
        class="w-11 h-11 p-3 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center flex-shrink-0"
      >
        <i class="far fa-face-smile text-[#FF6B6B]"></i>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-[#4A4238]">
        Анализ Эмоций
      </h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center gap-4">
      <i class="fas fa-spinner fa-spin fa-2x text-[#FF6B6B]"></i>
      <p class="text-gray-600 text-lg font-medium">Пожалуйста, подождите...</p>
    </div>

    <!-- Emotion Patterns Grid -->
    <div v-else class="grid sm:grid-cols-2 gap-4">
      <div
        v-for="(pattern, emotion) in patterns"
        :key="emotion"
        class="p-5 rounded-xl border transition-all hover:shadow-md bg-gray-50"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg text-[#4A4238]">{{ emotion }}</h3>
          <span
            class="text-sm font-medium px-3 py-1 bg-white rounded-full shadow-sm"
          >
            {{ pattern.count }} раз
          </span>
        </div>

        <!-- Intensity Meter -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-600">Средняя интенсивность</span>
            <span class="font-medium"
              >{{ pattern.avgIntensity.toFixed(1) }}/10</span
            >
          </div>
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              :class="getEmotionActiveColor(emotion)"
              :style="{ width: `${pattern.avgIntensity * 10}%` }"
            ></div>
          </div>
        </div>

        <!-- Common Spheres -->
        <div v-if="Object.keys(pattern.commonSpheres).length">
          <p class="text-sm font-medium text-gray-700 mb-2">
            Чаще всего в сферах:
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(count, sphere) in pattern.commonSpheres"
              :key="sphere"
              :class="getSphereColor(sphere)"
              class="text-xs px-3 py-1.5 rounded-full shadow-sm font-medium"
            >
              {{ sphere }} ({{ count }})
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emotions = [
  {
    id: 1,
    name: "Радость",
    color: "bg-yellow-100",
    activeColor: "bg-yellow-500",
  },
  {
    id: 2,
    name: "Тревога",
    color: "bg-purple-100",
    activeColor: "bg-purple-500",
  },
  { id: 3, name: "Злость", color: "bg-red-100", activeColor: "bg-red-500" },
  { id: 4, name: "Грусть", color: "bg-blue-100", activeColor: "bg-blue-500" },
  {
    id: 5,
    name: "Вдохновение",
    color: "bg-green-100",
    activeColor: "bg-green-500",
  },
  {
    id: 6,
    name: "Спокойствие",
    color: "bg-teal-100",
    activeColor: "bg-teal-500",
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

const props = defineProps({
  patterns: {
    type: Object,
    required: false,
    validator(value) {
      return (
        value &&
        Object.values(value).every(
          (pattern) =>
            "count" in pattern &&
            "avgIntensity" in pattern &&
            "commonSpheres" in pattern
        )
      );
    },
  },
});

const loading = computed(
  () => !props.patterns || Object.keys(props.patterns).length === 0
);

const getEmotionActiveColor = (emotionName) => {
  const emotion = emotions.find((e) => e.name === emotionName);
  return emotion?.activeColor || "bg-gray-500";
};

const getSphereColor = (sphereName) => {
  const sphere = lifeSpheres.find((s) => s.name === sphereName);
  return sphere?.color || "bg-gray-100";
};
</script>
