<template>
  <div
    class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 py-4 sm:p-8 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
  >
    <!-- Back Navigation -->
    <nuxt-link
      to="/awareness-tools/emotional-barometer"
      class="pl-4 sm:pl-0 inline-flex items-center text-[#0EA5E9] hover:text-[#22D3EE] transition-all mb-8 group"
    >
      <i
        class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
      ></i>
      <span class="text-sm font-medium">Вернуться</span>
    </nuxt-link>

    <!-- Header -->
    <div class="px-4 sm:px-0 flex items-center gap-4 mb-10">
      <div
        class="w-12 h-12 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
      >
        <i class="far fa-face-smile text-xl text-[#0EA5E9]"></i>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-white/90">
        Анализ Эмоций
      </h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center gap-4 py-12">
      <i class="fas fa-spinner fa-spin fa-2x text-[#0EA5E9]"></i>
      <p class="text-slate-300 text-base font-medium">
        Пожалуйста, подождите...
      </p>
    </div>

    <!-- Content Grid -->
    <div v-else class="grid sm:grid-cols-2 gap-6">
      <div
        v-for="(pattern, emotion) in patterns"
        :key="emotion"
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <!-- Emotion Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-bold text-lg text-white/90">{{ emotion }}</h3>
          </div>
          <span
            class="px-3 py-1.5 bg-[#1A1F35]/40 text-[#0EA5E9] text-sm font-medium rounded-full border border-[#0EA5E9]/20"
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
              class="text-sm text-slate-300 mb-2"
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
            <span class="text-sm font-medium text-slate-300"
              >Средняя интенсивность</span
            >
            <span class="font-semibold text-white/90"
              >{{ pattern.avgIntensity.toFixed(1) }}/10</span
            >
          </div>
          <div class="h-2 bg-[#1A1F35]/40 rounded-full overflow-hidden">
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
              class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-white backdrop-blur-sm"
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
    activeColor: "bg-gradient-to-r from-[#F59E0B] to-[#F97316]",
  },
  {
    id: 2,
    name: "Тревога",
    color: "bg-purple-100",
    activeColor: "bg-gradient-to-r from-[#E879F9] to-[#C084FC]",
  },
  {
    id: 3,
    name: "Злость",
    color: "bg-red-100",
    activeColor: "bg-gradient-to-r from-[#EF4444] to-[#F87171]",
  },
  {
    id: 4,
    name: "Грусть",
    color: "bg-blue-100",
    activeColor: "bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]",
  },
  {
    id: 5,
    name: "Вдохновение",
    color: "bg-green-100",
    activeColor: "bg-gradient-to-r from-[#10B981] to-[#34D399]",
  },
  {
    id: 6,
    name: "Спокойствие",
    color: "bg-teal-100",
    activeColor: "bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]",
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
  return emotion?.activeColor || "bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE]";
};

const getSphereColor = (sphereName) => {
  const sphere = lifeSpheres.find((s) => s.name === sphereName);
  return sphere?.color || "bg-gradient-to-r from-[#0EA5E9]/60 to-[#22D3EE]/60";
};
</script>
