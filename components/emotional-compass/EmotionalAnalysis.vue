<template>
  <div
    class="bg-gradient-to-b from-white to-slate-50 dark:from-[#1A1F35]/40 dark:to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 py-4 sm:p-8 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] min-h-screen">
    <!-- Back Navigation with Enhanced Accessibility -->
    <nuxt-link to="/space/growth/emotional-compass"
      class="pl-4 sm:pl-0 inline-flex items-center text-[#0EA5E9] hover:text-[#22D3EE] transition-all mb-4 sm:mb-8 group"
      aria-label="Вернуться назад">
      <i class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"></i>
      <span class="text-sm font-medium">Вернуться</span>
    </nuxt-link>

    <!-- Header with Enhanced Layout -->
    <div class="px-4 xl:px-0 flex items-center gap-4 mb-4 sm:mb-10">
      <div
        class="w-12 h-12 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm shadow-md transition-all">
        <i class="far fa-face-smile text-xl text-[#0EA5E9]"></i>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white/90 tracking-tight">
        Анализ Эмоций
      </h2>
    </div>

    <!-- Loading State with Improved Animation -->
    <div v-if="loading" class="flex flex-col items-center gap-4 py-12 animate-pulse" aria-live="polite">
      <i class="fas fa-spinner fa-spin fa-2x text-[#0EA5E9] animate-spin"></i>
      <p class="text-slate-600 dark:text-slate-300 text-base font-medium">
        Пожалуйста, подождите...
      </p>
    </div>

    <!-- Deep Insights Banner (New) -->
    <div v-if="Object.keys(patterns).length > 0" class="px-4 xl:px-0 mb-10">
      <div
        class="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-md">
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
          <i class="fas fa-lightbulb text-yellow-400"></i>
          Глубокие инсайты
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(insight, index) in deepInsights" :key="index"
            class="flex items-start gap-3 bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-white/20">
            <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <i :class="insight.icon" class="text-purple-500 text-sm"></i>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-800 dark:text-slate-100 mb-1">{{ insight.title }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ insight.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid with Responsive and Animated Layout -->
    <TransitionGroup v-else tag="div" name="emotion-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div v-for="(pattern, emotion) in patterns" :key="emotion"
        class="bg-gradient-to-b from-white to-slate-50 dark:from-[#1A1F35]/40 dark:to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]">
        <!-- Emotion Header with Enhanced Interactivity -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <i :class="getEmotionIcon(emotion)" class="text-xl mr-2" :style="{ color: getEmotionColor(emotion) }"></i>
            <h3 class="font-bold text-lg text-slate-900 dark:text-white/90">{{ emotion }}</h3>
          </div>
          <span
            class="px-3 py-1.5 bg-slate-100 dark:bg-[#1A1F35]/40 text-[#0EA5E9] text-sm font-medium rounded-full border border-[#0EA5E9]/20">
            {{
              pattern.count === 1
                ? `${pattern.count} раз`
                : pattern.count >= 2 && pattern.count <= 4 ? `${pattern.count} раза` : `${pattern.count} раз` }} </span>
        </div>

        <!-- Sub-emotions with Improved Readability -->
        <div v-if="pattern.subEmotions && Object.keys(pattern.subEmotions).length">
          <p class="text-sm font-medium text-slate-700 dark:text-white/90 mb-3">Подэмоции:</p>
          <ul class="space-y-2">
            <li v-for="(subPattern, subEmotion) in pattern.subEmotions" :key="subEmotion"
              class="text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#1A1F35]/20 rounded-lg p-2 flex justify-between items-center">
              <span>
                <span class="font-semibold mr-2">{{ subEmotion }}</span>—
                {{
                  subPattern.count === 1
                    ? `${subPattern.count} раз`
                    : subPattern.count >= 2 && subPattern.count <= 4 ? `${subPattern.count} раза` : `${subPattern.count}
                  раз` }} </span>
                  <span class="text-[#0EA5E9] font-bold">
                    {{ subPattern.avgIntensity.toFixed(1) }}/10
                  </span>
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- Common Needs -->
          <div v-if="pattern.commonNeeds && Object.keys(pattern.commonNeeds).length">
            <p class="text-sm font-medium text-slate-700 dark:text-white/90 mb-3 flex items-center gap-2">
              <i class="fas fa-heart text-purple-500 text-xs"></i>
              Потребности:
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="(count, need) in pattern.commonNeeds" :key="need"
                class="px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-600 dark:text-purple-400 font-medium">
                {{ need }}
              </span>
            </div>
          </div>

          <!-- Common Spheres -->
          <div v-if="Object.keys(pattern.commonSpheres).length">
            <p class="text-sm font-medium text-slate-700 dark:text-white/90 mb-3 flex items-center gap-2">
              <i class="fas fa-bolt text-cyan-500 text-xs"></i>
              Контекст:
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="(count, sphere) in pattern.commonSpheres" :key="sphere" :class="getSphereColor(sphere)"
                class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium text-white backdrop-blur-sm">
                {{ sphere }}
              </span>
            </div>
          </div>
        </div>

        <!-- Intensity Meter -->
        <div class="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div class="flex justify-between items-center mb-2.5">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Средняя интенсивность</span>
            <span class="font-bold text-slate-900 dark:text-white/90">
              {{ pattern.avgIntensity.toFixed(1) }}/10
            </span>
          </div>
          <div class="h-2 bg-slate-200 dark:bg-[#1A1F35]/40 rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all" :class="getEmotionActiveColor(emotion)"
              :style="{ width: `${pattern.avgIntensity * 10}%` }"></div>
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

const deepInsights = computed(() => {
  if (loading.value) return [];

  const insights = [];
  const entries = Object.entries(props.patterns);

  // 1. Dominant State Insight
  const dominant = [...entries].sort((a, b) => b[1].count - a[1].count)[0];
  if (dominant) {
    insights.push({
      title: `Доминирующее состояние: ${dominant[0]}`,
      description: `Вы чаще всего отмечаете это состояние (${dominant[1].count} раз). Это важный сигнал вашей нервной системы.`,
      icon: getEmotionIcon(dominant[0])
    });
  }

  // 2. Needs Correlation Insight
  let topCorrelation = null;
  entries.forEach(([emotion, pattern]) => {
    if (pattern.commonNeeds && Object.keys(pattern.commonNeeds).length > 0) {
      const topNeed = Object.entries(pattern.commonNeeds).sort((a, b) => b[1] - a[1])[0];
      if (!topCorrelation || topNeed[1] > topCorrelation.count) {
        topCorrelation = { emotion, need: topNeed[0], count: topNeed[1] };
      }
    }
  });

  if (topCorrelation) {
    insights.push({
      title: "Связь эмоций и потребностей",
      description: `Когда вы чувствуете "${topCorrelation.emotion}", ваше тело чаще всего просит "${topCorrelation.need}". Обратите на это внимание.`,
      icon: "fas fa-link"
    });
  }

  // 3. Intensity Insight
  const avgIntensity = entries.reduce((acc, curr) => acc + curr[1].avgIntensity, 0) / entries.length;
  if (avgIntensity > 7) {
    insights.push({
      title: "Высокая интенсивность",
      description: "Ваши эмоции сейчас очень яркие. Возможно, стоит уделить больше времени практикам заземления.",
      icon: "fas fa-exclamation-triangle"
    });
  } else if (avgIntensity < 4) {
    insights.push({
      title: "Спокойный фон",
      description: "Ваше общее эмоциональное состояние сейчас достаточно ровное и стабильное.",
      icon: "fas fa-check"
    });
  }

  return insights;
});
</script>
