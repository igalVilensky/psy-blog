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
        class="bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-6"
      >
        <!-- Back Navigation -->
        <nuxt-link
          to="/awareness-tools/emotional-barometer"
          class="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-all mb-8 group"
        >
          <i
            class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
          ></i>
          <span class="text-sm font-medium">Вернуться</span>
        </nuxt-link>

        <!-- Header -->
        <div class="flex items-center gap-4 mb-10">
          <div
            class="w-12 h-12 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <i class="far fa-face-smile text-xl text-[#FF6B6B]"></i>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white/90">
            Анализ Эмоций
          </h2>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center gap-4 py-12">
          <i class="fas fa-spinner fa-spin fa-2x text-[#FF6B6B]"></i>
          <p class="text-indigo-200/80 text-base font-medium">
            Пожалуйста, подождите...
          </p>
        </div>

        <!-- Content Grid -->
        <div v-else class="grid sm:grid-cols-2 gap-5">
          <div
            v-for="(pattern, emotion) in patterns"
            :key="emotion"
            class="bg-[#1E1B4B]/40 backdrop-blur-xl rounded-xl border border-indigo-500/20 p-6 transition-all hover:shadow-md"
          >
            <!-- Emotion Header -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="font-bold text-lg text-white/90">{{ emotion }}</h3>
              </div>
              <span
                class="px-3 py-1.5 bg-[#1E1B4B]/40 text-indigo-200/80 text-sm font-medium rounded-full border border-indigo-500/20"
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

            <!-- Sub-emotions -->
            <div v-if="Object.keys(pattern.subEmotions || {}).length">
              <p class="text-sm font-medium text-white/90 mb-3">Подэмоции:</p>
              <ul>
                <li
                  v-for="(subPattern, subEmotion) in pattern.subEmotions"
                  :key="subEmotion"
                  class="text-sm text-indigo-200/80 mb-2"
                >
                  <span class="font-semibold">{{ subEmotion }}</span> —
                  {{
                    subPattern.count === 1
                      ? `${subPattern.count} раз`
                      : subPattern.count >= 2 && subPattern.count <= 4
                      ? `${subPattern.count} раза`
                      : `${subPattern.count} раз`
                  }}, средняя интенсивность:
                  {{ subPattern.avgIntensity.toFixed(1) }}/10
                </li>
              </ul>
            </div>

            <!-- Intensity Meter -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2.5">
                <span class="text-sm font-medium text-indigo-200/80"
                  >Средняя интенсивность</span
                >
                <span class="font-semibold text-white/90"
                  >{{ pattern.avgIntensity.toFixed(1) }}/10</span
                >
              </div>
              <div class="h-2 bg-[#1E1B4B]/40 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :class="getEmotionActiveColor(emotion)"
                  :style="{ width: `${pattern.avgIntensity * 10}%` }"
                ></div>
              </div>
            </div>

            <!-- Common Spheres -->
            <div v-if="Object.keys(pattern.commonSpheres).length">
              <p class="text-sm font-medium text-white/90 mb-3">
                Чаще всего в сферах:
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(count, sphere) in pattern.commonSpheres"
                  :key="sphere"
                  :class="getSphereColor(sphere)"
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm border border-indigo-500/20"
                >
                  {{ sphere }} ({{ count }})
                </span>
              </div>
            </div>
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
