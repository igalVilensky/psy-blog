<!-- components/space/dashboard/IdentityPillar.vue -->
<template>
  <div class="space-y-6">
    <div class="flex flex-row items-center gap-4 mb-4">
      <div
        class="w-12 h-12 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl">
        <i class="fas fa-fingerprint text-cyan-600 dark:text-cyan-400 text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
          Идентичность</h2>
        <p class="text-xs font-bold text-zinc-500 uppercase tracking-wide mt-1">Stuctura Personalis</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Personality Radar -->
      <div
        class="bg-white dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-purple-500 rounded-2xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold uppercase tracking-wide text-zinc-900 dark:text-white">Профиль (Big Five)</h3>
          <NuxtLink to="/space/tests/big-5-model"
            class="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            Перепройти
          </NuxtLink>
        </div>

        <!-- Insights -->
        <div v-if="dominantInsight" class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            class="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/20 border-l-4 border-l-purple-400 rounded-xl">
            <div class="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider mb-1">
              Сильная сторона</div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white mb-1 uppercase">{{
              dominantInsight.strength.trait
            }}</div>
            <div class="text-[10px] text-zinc-500 font-medium leading-tight">{{ dominantInsight.strength.text }}</div>
          </div>
          <div
            class="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-zinc-400 rounded-xl">
            <div class="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Зона роста</div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white mb-1 uppercase">{{ dominantInsight.growth.trait
            }}
            </div>
            <div class="text-[10px] text-zinc-500 font-medium leading-tight">{{ dominantInsight.growth.text }}</div>
          </div>
        </div>

        <div class="relative h-72 flex items-center justify-center">
          <svg viewBox="0 0 500 500" class="w-full h-full max-w-[360px]">
            <!-- Grid Circles -->
            <circle v-for="i in 5" :key="`circle-${i}`" cx="250" cy="250" :r="i * 32" fill="none" stroke="currentColor"
              class="stroke-zinc-200 dark:stroke-zinc-700" stroke-width="1" />

            <!-- Links for axes -->
            <line v-for="i in 5" :key="`line-${i}`" x1="250" y1="250" :x2="getDataPoint(i - 1, 100).x"
              :y2="getDataPoint(i - 1, 100).y" stroke="currentColor" class="stroke-zinc-200 dark:stroke-zinc-700"
              stroke-width="1" />

            <!-- Polygon -->
            <polygon :points="radarPolygonPoints"
              class="fill-purple-500/20 dark:fill-purple-400/10 stroke-purple-500 dark:stroke-purple-400 transition-all duration-700"
              stroke-width="2" />

            <!-- Dots -->
            <g v-for="(point, idx) in radarDataPoints" :key="`dot-group-${idx}`" class="group cursor-pointer">
              <circle :cx="point.x" :cy="point.y" r="4"
                class="fill-white dark:fill-zinc-900 stroke-purple-600 dark:stroke-purple-400 transition-all duration-300 group-hover:r-6"
                stroke-width="2" />
            </g>

            <!-- Labels -->
            <g v-for="(trait, index) in traits" :key="`label-${trait.name}`">
              <rect :x="getLabelPosition(index).x - 60" :y="getLabelPosition(index).y - 14" width="120" height="28"
                class="fill-white/80 dark:fill-zinc-900/80" rx="4" />
              <text :x="getLabelPosition(index).x" :y="getLabelPosition(index).y + 5" text-anchor="middle"
                class="text-[12px] font-bold fill-zinc-900 dark:fill-white uppercase tracking-wider pointer-events-none">
                {{ trait.name }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Achievements & Archetypes -->
      <div class="flex flex-col gap-6">
        <!-- Archetypes Summary -->
        <div
          class="bg-zinc-50 dark:bg-zinc-800/30 p-6 border border-zinc-200 dark:border-zinc-700 border-l-4 border-l-amber-500 rounded-2xl">
          <h3 class="font-bold uppercase tracking-wide text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fas fa-masks-theater text-amber-500"></i>
            Ваши Архетипы
          </h3>
          <div class="flex flex-wrap gap-2">
            <div v-for="arc in topArchetypes" :key="arc.name"
              class="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-2 rounded-lg">
              <span>{{ arc.name }}</span>
              <span class="text-amber-500">{{ arc.level }}%</span>
            </div>
            <div v-if="!topArchetypes.length" class="text-xs font-bold text-zinc-400 uppercase tracking-wider">Тест на
              архетипы еще не пройден
            </div>
          </div>
        </div>

        <!-- Recent Achievements -->
        <div
          class="bg-white dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-emerald-500 rounded-2xl flex-1">
          <h3 class="font-bold uppercase tracking-wide text-zinc-900 dark:text-white mb-4">Вехи роста</h3>
          <div class="space-y-4">
            <div v-for="ach in achievements.slice(0, 3)" :key="ach.id" class="flex items-start gap-4 group">
              <div
                class="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg group-hover:border-cyan-500/50 transition-colors">
                <i :class="[ach.icon, 'text-sm']"></i>
              </div>
              <div class="flex-1">
                <div class="text-xs font-bold uppercase tracking-wide text-zinc-900 dark:text-white mb-0.5">{{ ach.name
                }}</div>
                <div class="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{{ ach.description }}</div>
              </div>
            </div>
            <div v-if="!achievements.length"
              class="text-center py-4 text-zinc-400 text-xs font-bold uppercase tracking-wider">Начните тренировки
            </div>
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
      text: traitInsights[lowest.name]?.low || "Область для балансировки."
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
  const maxRadius = 160;
  const radius = (value / 100) * maxRadius;
  return {
    x: 250 + radius * Math.cos((angle * Math.PI) / 180),
    y: 250 + radius * Math.sin((angle * Math.PI) / 180)
  };
};

const getLabelPosition = (index) => {
  const angle = (360 / props.traits.length) * index - 90;
  const radius = 200;
  return {
    x: 250 + radius * Math.cos((angle * Math.PI) / 180),
    y: 250 + radius * Math.sin((angle * Math.PI) / 180)
  };
};
</script>
