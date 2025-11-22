<template>
  <div
    class="bg-gradient-to-b from-white to-slate-50 dark:from-[#1A1F35]/40 dark:to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 py-4 sm:p-8 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] min-h-screen"
  >
    <!-- Back Navigation with Enhanced Accessibility -->
    <nuxt-link
      to="/lab/experiments/emotional-compass"
      class="pl-4 sm:pl-0 inline-flex items-center text-[#0EA5E9] hover:text-[#22D3EE] transition-all mb-4 sm:mb-8 group"
      aria-label="Вернуться назад"
    >
      <i
        class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
      ></i>
      <span class="text-sm font-medium">Вернуться</span>
    </nuxt-link>

    <!-- Header with Enhanced Layout -->
    <div class="px-4 xl:px-0 flex items-center gap-4 mb-4 sm:mb-10">
      <div
        class="w-12 h-12 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm shadow-md transition-all"
      >
        <i class="far fa-face-smile text-xl text-[#0EA5E9]"></i>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white/90 tracking-tight">
        Анализ Эмоций
      </h2>
    </div>

    <!-- Loading State with Improved Animation -->
    <div
      v-if="loading"
      class="flex flex-col items-center gap-4 py-12 animate-pulse"
      aria-live="polite"
    >
      <i class="fas fa-spinner fa-spin fa-2x text-[#0EA5E9] animate-spin"></i>
      <p class="text-slate-600 dark:text-slate-300 text-base font-medium">
        Пожалуйста, подождите...
      </p>
    </div>

    <!-- Content Grid with Responsive and Animated Layout -->
    <TransitionGroup
      v-else
      tag="div"
      name="emotion-grid"
      class="grid grid-cols-1 sm:grid-cols-2 gap-6"
    >
      <div
        v-for="(pattern, emotion) in patterns"
        :key="emotion"
        class="bg-gradient-to-b from-white to-slate-50 dark:from-[#1A1F35]/40 dark:to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <!-- Emotion Header with Enhanced Interactivity -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <i
              :class="getEmotionIcon(emotion)"
              class="text-xl mr-2"
              :style="{ color: getEmotionColor(emotion) }"
            ></i>
            <h3 class="font-bold text-lg text-slate-900 dark:text-white/90">{{ emotion }}</h3>
          </div>
          <span
            class="px-3 py-1.5 bg-slate-100 dark:bg-[#1A1F35]/40 text-[#0EA5E9] text-sm font-medium rounded-full border border-[#0EA5E9]/20"
          >
            {{
              pattern.count === 1
                ? `${pattern.count} раз`
                : pattern.count >= 2 && pattern.count <= 4
                ? `${pattern.count} раза`
                : `${pattern.count} раз`
            }}
          </span>
        </div>

        <!-- Sub-emotions with Improved Readability -->
        <div
          v-if="pattern.subEmotions && Object.keys(pattern.subEmotions).length"
        >
          <p class="text-sm font-medium text-slate-700 dark:text-white/90 mb-3">Подэмоции:</p>
          <ul class="space-y-2">
            <li
              v-for="(subPattern, subEmotion) in pattern.subEmotions"
              :key="subEmotion"
              class="text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#1A1F35]/20 rounded-lg p-2 flex justify-between items-center"
            >
              <span>
                <span class="font-semibold mr-2">{{ subEmotion }}</span
                >—
                {{
                  subPattern.count === 1
                    ? `${subPattern.count} раз`
                    : subPattern.count >= 2 && subPattern.count <= 4
                    ? `${subPattern.count} раза`
                    : `${subPattern.count} раз`
                }}
              </span>
              <span class="text-[#0EA5E9] font-bold">
                {{ subPattern.avgIntensity.toFixed(1) }}/10
              </span>
            </li>
          </ul>
        </div>

        <!-- Intensity Meter with Enhanced Visualization -->
        <div class="mt-6">
          <div class="flex justify-between items-center mb-2.5">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300"
              >Средняя интенсивность</span
            >
            <span class="font-semibold text-slate-900 dark:text-white/90">
              {{ pattern.avgIntensity.toFixed(1) }}/10
            </span>
          </div>
          <div class="h-2 bg-slate-200 dark:bg-[#1A1F35]/40 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              :class="getEmotionActiveColor(emotion)"
              :style="{ width: `${pattern.avgIntensity * 10}%` }"
            ></div>
          </div>
        </div>

        <!-- Common Spheres with Hover Effects -->
        <div v-if="Object.keys(pattern.commonSpheres).length" class="mt-6">
          <p class="text-sm font-medium text-slate-700 dark:text-white/90 mb-3">
            Чаще всего в сферах:
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(count, sphere) in pattern.commonSpheres"
              :key="sphere"
              :class="getSphereColor(sphere)"
              class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-white backdrop-blur-sm hover:scale-105 transition-transform"
            >
              {{ sphere }} ({{ count }})
            </span>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from "vue";

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
            "commonSpheres" in pattern &&
            (!pattern.subEmotions ||
              Object.values(pattern.subEmotions).every(
                (subPattern) =>
                  "count" in subPattern && "avgIntensity" in subPattern
              ))
        )
      );
    },
  },
});

// Comprehensive Emotion and Sphere Definitions
const emotions = [
  {
    id: 1,
    name: "Радость",
    color: "#F97316", // Warm orange
    icon: "fas fa-laugh-beam",
  },
  {
    id: 2,
    name: "Грусть",
    color: "#0EA5E9", // Soft blue
    icon: "fas fa-sad-cry",
  },
  {
    id: 3,
    name: "Страх",
    color: "#C084FC", // Lavender purple
    icon: "fas fa-ghost",
  },
  {
    id: 4,
    name: "Гнев",
    color: "#EF4444", // Vivid red
    icon: "fas fa-angry",
  },
  {
    id: 5,
    name: "Удивление",
    color: "#10B981", // Emerald green
    icon: "fas fa-surprise",
  },
];

const lifeSpheres = [
  {
    name: "Работа",
    color: "bg-gradient-to-r from-[#0EA5E9]/60 to-[#22D3EE]/60",
  },
  {
    name: "Семья",
    color: "bg-gradient-to-r from-[#E879F9]/60 to-[#C084FC]/60",
  },
  {
    name: "Здоровье",
    color: "bg-gradient-to-r from-[#F59E0B]/60 to-[#F97316]/60",
  },
  {
    name: "Личностный рост",
    color: "bg-gradient-to-r from-[#10B981]/60 to-[#34D399]/60",
  },
  {
    name: "Отношения",
    color: "bg-gradient-to-r from-[#EF4444]/60 to-[#F87171]/60",
  },
  {
    name: "Хобби",
    color: "bg-gradient-to-r from-[#14B8A6]/60 to-[#2DD4BF]/60",
  },
];

const getEmotionColor = (emotionName) => {
  const emotion = emotions.find((e) => e.name === emotionName);
  return emotion?.color || "#0EA5E9";
};

const getEmotionIcon = (emotionName) => {
  const emotion = emotions.find((e) => e.name === emotionName);
  return emotion?.icon || "fas fa-smile";
};

const getEmotionActiveColor = (emotionName) => {
  const emotion = emotions.find((e) => e.name === emotionName);
  return emotion?.color ? `bg-[${emotion.color}]` : "bg-[#0EA5E9]";
};

const getSphereColor = (sphereName) => {
  const sphere = lifeSpheres.find((s) => s.name === sphereName);
  return sphere?.color || "bg-[#0EA5E9]/60";
};

const loading = computed(
  () => !props.patterns || Object.keys(props.patterns).length === 0
);
</script>
