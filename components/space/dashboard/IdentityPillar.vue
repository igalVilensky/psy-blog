<!-- components/space/dashboard/IdentityPillar.vue -->
<template>
  <div class="space-y-6">
    <div class="flex flex-row items-center gap-4 mb-2">
      <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
        <i class="fas fa-fingerprint text-purple-600 dark:text-purple-400 text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-montserrat leading-tight">
          Идентичность</h2>
        <p class="text-xs text-slate-500 mt-1">Ваша уникальная структура личности и достижения</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Personality Radar -->
      <div
        class="bg-white dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-900 dark:text-white">Профиль (Big Five)</h3>
          <NuxtLink to="/space/tests/big-5-model" class="text-xs text-purple-600 hover:underline">Перепройти тест
          </NuxtLink>
        </div>

        <!-- Insights -->
        <div v-if="dominantInsight" class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            class="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
            <div class="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase mb-1">Сильная сторона</div>
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">{{ dominantInsight.strength.trait
            }}</div>
            <div class="text-[10px] text-slate-500 leading-tight">{{ dominantInsight.strength.text }}</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
            <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Зона роста</div>
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">{{ dominantInsight.growth.trait }}
            </div>
            <div class="text-[10px] text-slate-500 leading-tight">{{ dominantInsight.growth.text }}</div>
          </div>
        </div>

        <div class="relative h-72 flex items-center justify-center">
          <svg viewBox="0 0 500 500" class="w-full h-full max-w-[360px]">
            <!-- Grid Circles -->
            <circle v-for="i in 5" :key="`circle-${i}`" cx="250" cy="250" :r="i * 32" fill="none" stroke="currentColor"
              class="stroke-slate-200 dark:stroke-slate-700/30" stroke-width="1" />

            <!-- Links for axes -->
            <line v-for="i in 5" :key="`line-${i}`" x1="250" y1="250" :x2="getDataPoint(i - 1, 100).x"
              :y2="getDataPoint(i - 1, 100).y" stroke="currentColor" class="stroke-slate-200 dark:stroke-slate-700/30"
              stroke-width="1" />

            <!-- Polygon -->
            <polygon :points="radarPolygonPoints"
              class="fill-purple-500/20 dark:fill-purple-400/10 stroke-purple-500 dark:stroke-purple-400 transition-all duration-700"
              stroke-width="3" />

            <!-- Dots with Tooltips -->
            <g v-for="(point, idx) in radarDataPoints" :key="`dot-group-${idx}`" class="group cursor-pointer">
              <!-- Animated Pulse for visual interest -->
              <circle :cx="point.x" :cy="point.y" r="8"
                class="fill-transparent stroke-transparent group-hover:fill-purple-500/20 transition-all duration-300" />

              <circle :cx="point.x" :cy="point.y" r="5"
                class="fill-white dark:fill-slate-900 stroke-purple-600 dark:stroke-purple-400 transition-all duration-300 group-hover:r-7 group-hover:stroke-width-4"
                stroke-width="2.5" />

              <!-- Hover Label (Percentage) -->
              <g class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <rect :x="point.x - 20" :y="point.y - 35" width="40" height="24" rx="6"
                  class="fill-slate-900 dark:fill-white" />
                <text :x="point.x" :y="point.y - 19" text-anchor="middle"
                  class="text-[12px] font-bold fill-white dark:fill-slate-900">{{ traits[idx].value }}%</text>
                <!-- Arrow -->
                <path :d="`M${point.x - 4},${point.y - 12} L${point.x},${point.y - 8} L${point.x + 4},${point.y - 12}`"
                  class="fill-slate-900 dark:fill-white" />
              </g>
            </g>

            <!-- Labels -->
            <g v-for="(trait, index) in traits" :key="`label-${trait.name}`">
              <!-- Background for text readability -->
              <rect :x="getLabelPosition(index).x - 60" :y="getLabelPosition(index).y - 14" width="120" height="28"
                rx="6" class="fill-white/80 dark:fill-slate-900/80" />
              <text :x="getLabelPosition(index).x" :y="getLabelPosition(index).y + 5" text-anchor="middle"
                class="text-[14px] sm:text-[16px] font-black fill-slate-800 dark:fill-slate-100 uppercase tracking-tight pointer-events-none drop-shadow-sm">
                {{ trait.name }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Achievements & Archetypes -->
      <div class="flex flex-col gap-6">
        <!-- Archetypes Summary -->
        <div class="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-6">
          <h3 class="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fas fa-masks-theater text-amber-600"></i>
            Ваши Архетипы
          </h3>
          <div class="flex flex-wrap gap-2">
            <div v-for="arc in topArchetypes" :key="arc.name"
              class="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-500/30 text-xs font-bold text-amber-700 dark:text-amber-400 shadow-sm flex items-center gap-2">
              <span>{{ arc.name }}</span>
              <span class="opacity-50 text-[10px]">{{ arc.level }}%</span>
            </div>
            <div v-if="!topArchetypes.length" class="text-sm text-slate-500 italic">Тест на архетипы еще не пройден
            </div>
          </div>
        </div>

        <!-- Recent Achievements -->
        <div
          class="bg-white dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm flex-1">
          <h3 class="font-bold text-slate-900 dark:text-white mb-4">Вехи роста</h3>
          <div class="space-y-4">
            <div v-for="ach in achievements.slice(0, 3)" :key="ach.id" class="flex items-center gap-4 group">
              <div
                :class="[ach.bgClass, 'w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform']">
                <i :class="[ach.icon, 'text-lg']"></i>
              </div>
              <div class="flex-1">
                <div class="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{{ ach.name }}</div>
                <div class="text-[10px] text-slate-500 leading-tight">{{ ach.description }}</div>
              </div>
            </div>
            <div v-if="!achievements.length" class="text-center py-4 text-slate-500 text-sm">Начните тренировки, чтобы
              разблокировать достижения</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  traits: Array,
  archetypes: Array,
  achievements: Array
});

// Insight Logic
const traitInsights = {
  'Открытость': {
    high: "Вы обладаете живым воображением и открыты к новым идеям.",
    low: "Вы предпочитаете проверенные методы и конкретные факты."
  },
  'Добросовестность': {
    high: "Вы организованы, дисциплинированы и всегда доводите дело до конца.",
    low: "Вы спонтанны и гибки, но иногда можете отвлекаться от целей."
  },
  'Экстраверсия': {
    high: "Вы заряжаетесь энергией от общения и любите быть в центре внимания.",
    low: "Вы цените уединение и глубокие, содержательные разговоры."
  },
  'Доброжелательность': {
    high: "Вы сострадательны, заботливы и легко ладите с людьми.",
    low: "Вы прямолинейны, конкурентны и скептически относитесь к мотивам других."
  },
  'Нейротизм': {
    high: "Вы чувствительны к стрессу и глубоко переживаете эмоции.",
    low: "Вы эмоционально устойчивы и сохраняете спокойствие в трудных ситуациях."
  }
};

const dominantInsight = computed(() => {
  if (!props.traits || props.traits.length === 0) return null;

  // Sort traits by deviation from 50 (to find most extreme) or just max value?
  // Let's find the highest score for positive reinforcement using max value.
  const sorted = [...props.traits].sort((a, b) => b.value - a.value);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  return {
    strength: {
      trait: highest.name,
      text: traitInsights[highest.name]?.high || "Ваша ведущая черта."
    },
    growth: {
      trait: lowest.name,
      text: traitInsights[lowest.name]?.low || "Область для балансировки." // Low score implication
    }
  };
});

const topArchetypes = computed(() => {
  if (!props.archetypes) return [];
  return [...props.archetypes]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);
});

// Chart Logic
const radarPolygonPoints = computed(() => {
  return props.traits.map((trait, index) => {
    const point = getDataPoint(index, trait.value);
    return `${point.x},${point.y}`;
  }).join(' ');
});

const radarDataPoints = computed(() => {
  return props.traits.map((trait, index) => getDataPoint(index, trait.value));
});

const getDataPoint = (index, value) => {
  const angle = (360 / props.traits.length) * index - 90;
  const maxRadius = 160; // Reduced radius to fit labels better
  const radius = (value / 100) * maxRadius;
  return {
    x: 250 + radius * Math.cos((angle * Math.PI) / 180),
    y: 250 + radius * Math.sin((angle * Math.PI) / 180)
  };
};

const getLabelPosition = (index) => {
  const angle = (360 / props.traits.length) * index - 90;
  const radius = 200; // Increased padding from chart
  return {
    x: 250 + radius * Math.cos((angle * Math.PI) / 180),
    y: 250 + radius * Math.sin((angle * Math.PI) / 180)
  };
};
</script>
