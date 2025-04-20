<template>
  <div class="min-h-screen">
    <!-- Main Content Area -->
    <main class="px-6 xl:px-0 pb-20 mt-12">
      <div class="container mx-auto max-w-6xl">
        <!-- Tree Visualization -->
        <h2
          class="text-xl md:text-2xl font-semibold text-white flex items-center mb-4 md:hidden"
        >
          <i class="fas fa-tree mr-2 text-gradient-blue-end"></i>
          Ваше Древо Себя
        </h2>
        <section
          class="mb-8 bg-white/5 backdrop-blur rounded-xl shadow-xl border border-white/10"
        >
          <div class="relative flex flex-col items-center">
            <!-- SVG Tree for Medium+ Screens -->
            <div class="relative mb-4">
              <svg
                class="w-full max-w-3xl h-[32rem] lg:max-w-4xl lg:h-[40rem] xl:max-w-5xl xl:h-[48rem]"
                viewBox="0 0 400 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <rect
                  x="0"
                  y="0"
                  width="400"
                  height="600"
                  fill="url(#svg-bg)"
                />

                <!-- Title inside SVG (desktop only) -->
                <g class="hidden md:block">
                  <text
                    x="140"
                    y="30"
                    class="text-3xl font-semibold text-white"
                  >
                    Ваше Древо Себя
                  </text>
                </g>

                <!-- Definitions for effects -->
                <defs>
                  <!-- Glow filter -->
                  <filter
                    id="glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>

                  <!-- Pulse animation for hover -->
                  <filter
                    id="pulse-blue"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.7 0"
                      result="glow"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="glow"
                      operator="over"
                    />
                  </filter>

                  <filter
                    id="pulse-purple"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0.8 0 0 0 0 0 0 0 0 0 0.8 0 0 0 1 0 0 0 0.7 0"
                      result="glow"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="glow"
                      operator="over"
                    />
                  </filter>

                  <filter
                    id="pulse-orange"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0 0.6 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"
                      result="glow"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="glow"
                      operator="over"
                    />
                  </filter>

                  <filter
                    id="pulse-mint"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0.8 0 0 0 0 1 0 0 0 0 0.5 0 0 0 0 0 0 0.7 0"
                      result="glow"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="glow"
                      operator="over"
                    />
                  </filter>

                  <!-- Vertical beam gradient -->
                  <linearGradient
                    id="vertical-beam"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                    <stop offset="50%" stop-color="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>

                <!-- Dynamic connections between nodes -->
                <g class="connections">
                  <!-- Vertical light beam -->
                  <line
                    x1="200"
                    y1="67"
                    x2="200"
                    y2="533"
                    stroke="url(#vertical-beam)"
                    stroke-width="1"
                    stroke-opacity="0.2"
                  />

                  <!-- Paths -->
                  <g v-for="(conn, idx) in connections" :key="`conn-${idx}`">
                    <path
                      :d="conn.path"
                      stroke-width="1.5"
                      class="path-line"
                      :class="{ 'active-path': conn.active }"
                      :stroke-dasharray="conn.active ? '5,5' : '2,3'"
                    />
                    <circle
                      v-if="conn.active"
                      :class="getConnectionParticleClass(conn.category)"
                      r="2"
                      opacity="0.8"
                    >
                      <animateMotion
                        :path="conn.path"
                        dur="3s"
                        repeatCount="indefinite"
                        rotate="auto"
                      />
                    </circle>
                  </g>
                </g>

                <!-- Sefirot Nodes -->
                <g
                  v-for="sefirah in sefirot"
                  :key="sefirah.id"
                  :class="`sefirah-${sefirah.id}`"
                >
                  <!-- Outer glow ring -->
                  <circle
                    v-if="sefirah.progress > 0"
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    r="18"
                    :class="getNodeGlowClass(sefirah.id)"
                    opacity="0.4"
                    filter="url(#glow)"
                  />

                  <!-- Pulse effect on hover -->
                  <circle
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    r="18"
                    class="node-pulse"
                    :class="getNodePulseClass(sefirah.category)"
                    opacity="0"
                  >
                    <animate
                      attributeName="opacity"
                      values="0;0.6;0"
                      dur="1.5s"
                      begin="mouseover"
                      repeatCount="indefinite"
                      restart="whenNotActive"
                    />
                    <animate
                      attributeName="r"
                      values="15;25;15"
                      dur="1.5s"
                      begin="mouseover"
                      repeatCount="indefinite"
                      restart="whenNotActive"
                    />
                  </circle>

                  <!-- Base node circle -->
                  <circle
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    :r="hoveredNode === sefirah.id ? 18 : 15"
                    :class="[
                      getNodeClass(sefirah.id, sefirah.progress),
                      'node-circle',
                      {
                        'highlight-node':
                          highlightedCategory === sefirah.category,
                      },
                    ]"
                    class="cursor-pointer transition-all duration-300"
                    @click="scrollToSefirah(sefirah.id)"
                    @mouseover="
                      showNodeTooltip(sefirah);
                      hoveredNode = sefirah.id;
                    "
                    @mouseleave="
                      hideNodeTooltip();
                      hoveredNode = null;
                    "
                  >
                    <title>
                      {{ sefirah.function }}: {{ sefirah.progress }}%
                    </title>
                    <animate
                      v-if="sefirah.progress > 0"
                      attributeName="opacity"
                      values="0.9;1;0.9"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <!-- Progress ring -->
                  <circle
                    v-if="sefirah.progress > 0"
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    r="15"
                    :stroke="getNodeStrokeColor(sefirah.id)"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                    :stroke-dasharray="`${sefirah.progress * 0.94}, 100`"
                    :transform="`rotate(-90 ${sefirah.x} ${sefirah.y})`"
                    style="pointer-events: none; filter: url(#progress-shadow)"
                  >
                    <animate
                      attributeName="stroke-opacity"
                      values="0.8;1;0.8"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <!-- Node inner icon -->
                  <text
                    :x="sefirah.x"
                    :y="sefirah.y"
                    text-anchor="middle"
                    dominant-baseline="central"
                    :class="[
                      'text-xs font-bold',
                      getIconClass(sefirah.category, sefirah.progress),
                    ]"
                    style="pointer-events: none"
                  >
                    <tspan v-if="sefirah.category === 'wisdom'" class="fa">
                      
                    </tspan>
                    <tspan
                      v-else-if="sefirah.category === 'emotions'"
                      class="fa"
                    >
                      
                    </tspan>
                    <tspan v-else-if="sefirah.category === 'action'" class="fa">
                      
                    </tspan>
                    <tspan
                      v-else-if="sefirah.category === 'integration'"
                      class="fa"
                    >
                      
                    </tspan>
                  </text>

                  <!-- Label with psychological term and Hebrew name -->
                  <g class="node-label transition-opacity duration-300">
                    <text
                      :x="getLabelX(sefirah)"
                      :y="sefirah.y + 30"
                      class="font-medium text-white"
                      text-anchor="middle"
                      dominant-baseline="middle"
                    >
                      {{ sefirah.function }}
                    </text>
                    <text
                      :x="getLabelX(sefirah)"
                      :y="sefirah.y + 45"
                      class="text-[0.6rem] font-light text-gray-300"
                      text-anchor="middle"
                      dominant-baseline="middle"
                    >
                      ({{ sefirah.name }})
                    </text>
                  </g>
                </g>

                <!-- Interactive tooltip -->
                <foreignObject
                  v-if="activeTooltip"
                  :x="activeTooltip.x - 70"
                  :y="activeTooltip.y"
                  width="140"
                  height="70"
                  class="tooltip-container"
                >
                  <div
                    class="bg-black/80 backdrop-blur-sm p-2 rounded text-white text-xs border border-white/20"
                  >
                    <p class="font-medium">{{ activeTooltip.function }}</p>
                    <p class="text-gray-300">{{ activeTooltip.name }}</p>
                    <div class="w-full bg-gray-800/50 rounded-full h-1 mt-1">
                      <div
                        class="h-1 rounded-full"
                        :class="getProgressBarClass(activeTooltip.id)"
                        :style="{ width: `${activeTooltip.progress}%` }"
                      ></div>
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </div>
          </div>

          <!-- Desktop Side Legend -->
          <div
            class="hidden md:block absolute right-16 top-1/3 transform -translate-y-1/2"
          >
            <div
              class="flex flex-col space-y-2 bg-black/40 rounded-lg p-1 border border-white/10"
            >
              <div
                class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
                :class="{ 'bg-white/10': highlightedCategory === 'wisdom' }"
                @click="toggleHighlight('wisdom')"
                role="button"
                aria-label="Highlight Wisdom Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Мудрость</span>
              </div>
              <div
                class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
                :class="{ 'bg-white/10': highlightedCategory === 'emotions' }"
                @click="toggleHighlight('emotions')"
                role="button"
                aria-label="Highlight Emotions Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Чувства</span>
              </div>
              <div
                class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
                :class="{ 'bg-white/10': highlightedCategory === 'action' }"
                @click="toggleHighlight('action')"
                role="button"
                aria-label="Highlight Action Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-orange-start to-gradient-orange-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Действия</span>
              </div>
              <div
                class="flex items-center px-3 py-2 hover:bg-white/5 transition-colors cursor-pointer rounded"
                :class="{
                  'bg-white/10': highlightedCategory === 'integration',
                }"
                @click="toggleHighlight('integration')"
                role="button"
                aria-label="Highlight Integration Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Интеграция</span>
              </div>
            </div>
          </div>

          <!-- Mobile/Tablet Legend -->
          <div class="flex justify-center md:hidden">
            <div
              class="inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10"
            >
              <div
                class="flex items-center px-4 py-2 bg-black/40 hover:bg-white/5 transition-colors cursor-pointer"
                :class="{ 'bg-white/10': highlightedCategory === 'wisdom' }"
                @click="toggleHighlight('wisdom')"
                role="button"
                aria-label="Highlight Wisdom Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Мудрость</span>
              </div>
              <div
                class="flex items-center px-4 py-2 bg-black/40 hover:bg-white/5 transition-colors cursor-pointer"
                :class="{ 'bg-white/10': highlightedCategory === 'emotions' }"
                @click="toggleHighlight('emotions')"
                role="button"
                aria-label="Highlight Emotions Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Чувства</span>
              </div>
              <div
                class="flex items-center px-4 py-2 bg-black/40 hover:bg-white/5 transition-colors cursor-pointer"
                :class="{ 'bg-white/10': highlightedCategory === 'action' }"
                @click="toggleHighlight('action')"
                role="button"
                aria-label="Highlight Action Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-orange-start to-gradient-orange-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Действия</span>
              </div>
              <div
                class="flex items-center px-4 py-2 bg-black/40 hover:bg-white/5 transition-colors cursor-pointer"
                :class="{
                  'bg-white/10': highlightedCategory === 'integration',
                }"
                @click="toggleHighlight('integration')"
                role="button"
                aria-label="Highlight Integration Sefirot"
              >
                <span
                  class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end mr-2"
                ></span>
                <span class="text-gray-200 whitespace-nowrap">Интеграция</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Sefirot Progress Cards -->
        <section
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16"
        >
          <div
            v-for="sefirah in sefirot"
            :key="sefirah.id"
            :id="`sefirah-${sefirah.id}`"
            class="bg-white/5 backdrop-blur rounded-xl shadow-md p-5 border border-white/10 transition-all hover:shadow-xl"
            :class="{
              'ring-2 ring-offset-2 ring-offset-background':
                activeCard === sefirah.id,
            }"
            :style="{ '--ring-color': getRingColor(sefirah.id) }"
            @click="setActiveCard(sefirah.id)"
          >
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-lg md:text-xl font-semibold text-white">
                {{ sefirah.psychName }}
                <span class="text-sm text-gray-300">({{ sefirah.name }})</span>
              </h3>
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium"
                :class="getCardProgressClass(sefirah.id)"
              >
                {{ sefirah.progress }}%
              </div>
            </div>

            <p class="text-gray-300 text-sm mb-2">{{ sefirah.function }}</p>
            <p class="text-gray-400 text-sm mb-4">{{ sefirah.description }}</p>

            <div class="mb-4">
              <div class="w-full bg-gray-800/50 rounded-full h-1.5 mb-1">
                <div
                  class="h-1.5 rounded-full"
                  :class="getProgressBarClass(sefirah.id)"
                  :style="{ width: `${sefirah.progress}%` }"
                ></div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="(feature, idx) in sefirah.features"
                :key="`feature-${sefirah.id}-${idx}`"
                class="inline-block text-xs py-1 px-2 rounded-full bg-white/10 text-gray-300"
              >
                {{ feature }}
              </span>
            </div>

            <nuxt-link
              v-if="sefirah.cta"
              :to="sefirah.cta.link"
              class="inline-flex items-center text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-all text-white"
            >
              <i class="fas fa-arrow-right mr-2"></i>
              {{ sefirah.cta.text }}
            </nuxt-link>
            <p v-else class="text-xs text-gray-500">
              <i class="fas fa-clock mr-1"></i> Скоро появятся новые способы
              роста!
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useFirestore } from "~/plugins/firebase";
import { getEmotionBarometerData } from "~/api/firebase/emotionBarometer";
import { getDailyGrowthSparkData } from "~/api/firebase/dailyGrowthSpark";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { getPurchasedCourses } from "~/api/firebase/coursesApi";

// Auth and Firestore setup
const authStore = useAuthStore();
const firestore = useFirestore();
const isLoggedIn = computed(() => !!authStore.user);
const activeCard = ref(null);
const activeTooltip = ref(null);
const hoveredNode = ref(null);
const highlightedCategory = ref(null);

// Sefirot Data Structure
const sefirot = ref([
  {
    id: "keter",
    name: "Кетер",
    psychName: "Высшее Я",
    function: "Высшее Я",
    description: "Ваша истинная сущность и потенциал души.",
    features: ["Профиль", "Открытие Архетипов"],
    x: 200,
    y: 67,
    progress: 0,
    category: "integration",
    cta: {
      text: "Пройти тест архетипов",
      link: "/awareness-tools/life-purpose-archetype",
    },
  },
  {
    id: "chokhmah",
    name: "Хохма",
    psychName: "Clarity",
    function: "Ясность",
    description: "Интуиция и интеллектуальное прозрение.",
    features: ["Тест Большой Пятёрки", "Блог"],
    x: 133,
    y: 160,
    progress: 0,
    category: "wisdom",
    cta: {
      text: "Пройти Большую Пятёрку",
      link: "/awareness-tools/big-5-model",
    },
  },
  {
    id: "binah",
    name: "Бина",
    psychName: "Emotional Awareness",
    function: "Эм. осознанность",
    description: "Глубина чувств и понимание эмоций.",
    features: ["Эмоциональный Компас"],
    x: 267,
    y: 160,
    progress: 0,
    category: "emotions",
    cta: {
      text: "Записать эмоции",
      link: "/awareness-tools/emotional-compass",
    },
  },
  {
    id: "chesed",
    name: "Хесед",
    psychName: "Connection",
    function: "Связь",
    description: "Милосердие и поддержка сообщества.",
    features: ["Центр сообщества"],
    x: 107,
    y: 267,
    progress: 0,
    category: "emotions",
    cta: {
      text: "Поделиться инсайтом",
      link: "/awareness-tools/inspiration-wall",
    },
  },
  {
    id: "gevurah",
    name: "Гвура",
    psychName: "Structure",
    function: "Структура",
    description: "Дисциплина и конкретные действия.",
    features: ["Курсы"],
    x: 293,
    y: 267,
    progress: 0,
    category: "action",
    cta: { text: "Начать курс", link: "/courses/courses" },
  },
  {
    id: "tiferet",
    name: "Тиферет",
    psychName: "Integration",
    function: "Интеграция",
    description: "Баланс и целостность вашего пути.",
    features: ["Внутренний Ландшафт"],
    x: 200,
    y: 347,
    progress: 0,
    category: "integration",
    cta: null,
  },
  {
    id: "netzach",
    name: "Нецах",
    psychName: "Motivation",
    function: "Мотивация",
    description: "Стойкость и ежедневный рост.",
    features: ["Ежедневная Искра Роста"],
    x: 133,
    y: 373,
    progress: 0,
    category: "action",
    cta: { text: "Записать искру", link: "/home" },
  },
  {
    id: "hod",
    name: "Ход",
    psychName: "Perspective",
    function: "Перспектива",
    description: "Рефлексия через контент и знания.",
    features: ["Гайды", "Подкасты"],
    x: 267,
    y: 373,
    progress: 0,
    category: "wisdom",
    cta: null,
  },
  {
    id: "yesod",
    name: "Йесод",
    psychName: "Routine",
    function: "Рутина",
    description: "Фундамент ваших привычек и прогресса.",
    features: ["Личный кабинет"],
    x: 200,
    y: 453,
    progress: 0,
    category: "integration",
    cta: { text: "Посмотреть прогресс", link: "/personal-cabinet" },
  },
  {
    id: "malkhut",
    name: "Малхут",
    psychName: "Manifestation",
    function: "Воплощение",
    description: "Реальные действия в мире.",
    features: ["Выполненные задачи"],
    x: 200,
    y: 533,
    progress: 0,
    category: "action",
    cta: { text: "Завершить задачу", link: "/awareness-tools" },
  },
]);

// Connection data
const connections = computed(() => {
  return [
    {
      path: "M200 67 L133 160",
      active:
        sefirot.value.find((s) => s.id === "keter").progress > 0 &&
        sefirot.value.find((s) => s.id === "chokhmah").progress > 0,
      category: "wisdom",
    },
    {
      path: "M200 67 L267 160",
      active:
        sefirot.value.find((s) => s.id === "keter").progress > 0 &&
        sefirot.value.find((s) => s.id === "binah").progress > 0,
      category: "emotions",
    },
    {
      path: "M133 160 L107 267",
      active:
        sefirot.value.find((s) => s.id === "chokhmah").progress > 0 &&
        sefirot.value.find((s) => s.id === "chesed").progress > 0,
      category: "emotions",
    },
    {
      path: "M267 160 L293 267",
      active:
        sefirot.value.find((s) => s.id === "binah").progress > 0 &&
        sefirot.value.find((s) => s.id === "gevurah").progress > 0,
      category: "action",
    },
    {
      path: "M107 267 L200 347",
      active:
        sefirot.value.find((s) => s.id === "chesed").progress > 0 &&
        sefirot.value.find((s) => s.id === "tiferet").progress > 0,
      category: "integration",
    },
    {
      path: "M293 267 L200 347",
      active:
        sefirot.value.find((s) => s.id === "gevurah").progress > 0 &&
        sefirot.value.find((s) => s.id === "tiferet").progress > 0,
      category: "integration",
    },
    {
      path: "M107 267 L133 373",
      active:
        sefirot.value.find((s) => s.id === "chesed").progress > 0 &&
        sefirot.value.find((s) => s.id === "netzach").progress > 0,
      category: "action",
    },
    {
      path: "M293 267 L267 373",
      active:
        sefirot.value.find((s) => s.id === "gevurah").progress > 0 &&
        sefirot.value.find((s) => s.id === "hod").progress > 0,
      category: "wisdom",
    },
    {
      path: "M133 373 L200 453",
      active:
        sefirot.value.find((s) => s.id === "netzach").progress > 0 &&
        sefirot.value.find((s) => s.id === "yesod").progress > 0,
      category: "integration",
    },
    {
      path: "M267 373 L200 453",
      active:
        sefirot.value.find((s) => s.id === "hod").progress > 0 &&
        sefirot.value.find((s) => s.id === "yesod").progress > 0,
      category: "integration",
    },
    {
      path: "M200 453 L200 533",
      active:
        sefirot.value.find((s) => s.id === "yesod").progress > 0 &&
        sefirot.value.find((s) => s.id === "malkhut").progress > 0,
      category: "action",
    },
  ];
});

// Show node tooltip
const showNodeTooltip = (sefirah) => {
  activeTooltip.value = {
    ...sefirah,
    x: sefirah.x,
    y: sefirah.id === "keter" ? sefirah.y + 80 : sefirah.y - 80,
  };
};

// Hide node tooltip
const hideNodeTooltip = () => {
  activeTooltip.value = null;
};

// Toggle highlight for legend
const toggleHighlight = (category) => {
  highlightedCategory.value =
    highlightedCategory.value === category ? null : category;
};

// Get node pulse class
const getNodePulseClass = (category) => {
  switch (category) {
    case "wisdom":
      return "pulse-blue";
    case "emotions":
      return "pulse-purple";
    case "action":
      return "pulse-orange";
    case "integration":
      return "pulse-mint";
    default:
      return "";
  }
};

// Get connection particle class
const getConnectionParticleClass = (category) => {
  switch (category) {
    case "wisdom":
      return "fill-gradient-blue-end";
    case "emotions":
      return "fill-gradient-purple-end";
    case "action":
      return "fill-gradient-orange-end";
    case "integration":
      return "fill-gradient-mint-end";
    default:
      return "fill-white";
  }
};

// Set active card
const setActiveCard = (id) => {
  activeCard.value = id;
};

// Scroll to Sefirah Card
const scrollToSefirah = (id) => {
  activeCard.value = id;
  const element = document.getElementById(`sefirah-${id}`);
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      element.classList.add("ring-2");
      setTimeout(() => element.classList.remove("ring-2"), 2000);
    }, 50);
  }
};

// Calculate overall progress
const overallProgress = computed(() => {
  const total = sefirot.value.reduce((sum, s) => sum + s.progress, 0);
  return Math.round(total / 10);
});

// Fetch User Progress
const fetchSefirotProgress = async (userId) => {
  try {
    const assessmentResponse = await getLatestUserAssessment(firestore, userId);
    if (assessmentResponse?.success) {
      const archetypeCount = Object.keys(
        assessmentResponse.assessment.scores
      ).length;
      sefirot.value.find((s) => s.id === "keter").progress = Math.min(
        Math.round((archetypeCount / 12) * 100),
        100
      );
    }

    if (
      assessmentResponse?.success &&
      assessmentResponse.assessment.type === "big-5"
    ) {
      sefirot.value.find((s) => s.id === "chokhmah").progress = 100;
    }

    const emotionResponse = await getEmotionBarometerData(firestore, userId);
    if (emotionResponse?.success) {
      const entryCount = emotionResponse.data.entries.length;
      sefirot.value.find((s) => s.id === "binah").progress = Math.min(
        Math.round((entryCount / 10) * 100),
        100
      );
    }

    sefirot.value.find((s) => s.id === "chesed").progress = 10;

    const coursesResponse = await getPurchasedCourses(userId);
    if (coursesResponse?.success && coursesResponse.data.length > 0) {
      const avgProgress =
        coursesResponse.data.reduce(
          (sum, course) => sum + (course.progress?.progressPercentage || 0),
          0
        ) / coursesResponse.data.length;
      sefirot.value.find((s) => s.id === "gevurah").progress =
        Math.round(avgProgress);
    }

    setTimeout(() => {
      const totalProgress = sefirot.value
        .filter((s) => s.id !== "tiferet")
        .reduce((sum, s) => sum + s.progress, 0);
      sefirot.value.find((s) => s.id === "tiferet").progress = Math.round(
        totalProgress / 9
      );
    }, 100);

    const sparkResponse = await getDailyGrowthSparkData(firestore, userId);
    if (sparkResponse?.success) {
      const sparkCount = sparkResponse.data.entries?.length || 1;
      sefirot.value.find((s) => s.id === "netzach").progress = Math.min(
        Math.round((sparkCount / 10) * 100),
        100
      );
    }

    sefirot.value.find((s) => s.id === "hod").progress = 0;

    sefirot.value.find((s) => s.id === "yesod").progress =
      coursesResponse?.success ? 50 : 0;

    sefirot.value.find((s) => s.id === "malkhut").progress = 20;
  } catch (error) {
    console.error("Error fetching Sefirot progress:", error);
    sefirot.value.forEach((s) => {
      if (typeof s.progress !== "number") s.progress = 0;
    });
  }
};

// Get ring color for active card
const getRingColor = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "75, 85, 99";

  switch (sefirah.category) {
    case "wisdom":
      return "0, 230, 255";
    case "emotions":
      return "255, 77, 255";
    case "action":
      return "255, 158, 0";
    case "integration":
      return "112, 255, 148";
    default:
      return "75, 85, 99";
  }
};

const getIconClass = (category, progress) => {
  if (progress === 0) return "fill-gray-400";

  switch (category) {
    case "wisdom":
      return "fill-blue-200";
    case "emotions":
      return "fill-purple-200";
    case "action":
      return "fill-orange-200";
    case "integration":
      return "fill-green-200";
    default:
      return "fill-gray-400";
  }
};

// Styling functions
const getNodeClass = (id, progress) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "fill-gray-700";

  if (progress === 0) return "fill-gray-700 stroke-gray-500";

  switch (sefirah.category) {
    case "wisdom":
      return "fill-blue-600 stroke-blue-400";
    case "emotions":
      return "fill-purple-600 stroke-purple-400";
    case "action":
      return "fill-orange-600 stroke-orange-400";
    case "integration":
      return "fill-green-600 stroke-green-400";
    default:
      return "fill-gray-700 stroke-gray-500";
  }
};

const getNodeGlowClass = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "";

  switch (sefirah.category) {
    case "wisdom":
      return "fill-gradient-blue-end";
    case "emotions":
      return "fill-gradient-purple-end";
    case "action":
      return "fill-gradient-orange-end";
    case "integration":
      return "fill-gradient-mint-end";
    default:
      return "fill-white";
  }
};

const getNodeStrokeColor = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "#4B5563";

  switch (sefirah.category) {
    case "wisdom":
      return "#00E6FF";
    case "emotions":
      return "#FF4DFF";
    case "action":
      return "#FF9E00";
    case "integration":
      return "#70FF94";
    default:
      return "#4B5563";
  }
};

const getProgressBarClass = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "bg-gray-600";

  switch (sefirah.category) {
    case "wisdom":
      return "bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end";
    case "emotions":
      return "bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end";
    case "action":
      return "bg-gradient-to-r from-gradient-orange-start to-gradient-orange-end";
    case "integration":
      return "bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end";
    default:
      return "bg-gray-600";
  }
};

const getCardProgressClass = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "bg-gray-800/50 text-gray-400";

  if (sefirah.progress === 0) return "bg-gray-800/50 text-gray-400";

  switch (sefirah.category) {
    case "wisdom":
      return "bg-gradient-blue-end/20 text-gradient-blue-end";
    case "emotions":
      return "bg-gradient-purple-end/20 text-gradient-purple-end";
    case "action":
      return "bg-gradient-orange-end/20 text-gradient-orange-end";
    case "integration":
      return "bg-gradient-mint-end/20 text-gradient-mint-end";
    default:
      return "bg-gray-800/50 text-gray-400";
  }
};

const getNodeBorderClass = (progress) => {
  if (progress === 0) return "border-gray-800";
  if (progress < 33) return "border-white/20";
  if (progress < 66) return "border-white/30";
  return "border-white/40";
};

// Label positioning
const getLabelX = (sefirah) => {
  if (sefirah.x < 160) return sefirah.x - 35;
  if (sefirah.x > 240) return sefirah.x + 35;
  return sefirah.x;
};

// Open Daily Growth Spark dialog
const openDailyGrowthSpark = () => {
  navigateTo("/daily-growth-spark");
};

// Initialize Data
onMounted(async () => {
  if (isLoggedIn.value) {
    const userId = authStore.user.uid;
    await fetchSefirotProgress(userId);
  } else {
    const demoData = [40, 70, 30, 10, 50, 35, 20, 5, 60, 15];
    sefirot.value.forEach((s, index) => {
      s.progress = demoData[index];
    });
  }
});

// Watch for auth changes
watch(
  () => authStore.user,
  async (newUser) => {
    if (newUser) {
      await fetchSefirotProgress(newUser.uid);
    }
  }
);
</script>

<style scoped>
.path-line {
  stroke: rgba(255, 255, 255, 0.15);
  stroke-dasharray: 2, 2;
}

.active-path {
  stroke: rgba(255, 255, 255, 0.3);
  stroke-dasharray: 5, 5;
  stroke-width: 2;
}

.fill-blue-200 {
  fill: #bfdbfe;
}
.fill-purple-200 {
  fill: #e9d5ff;
}
.fill-orange-200 {
  fill: #fed7aa;
}
.fill-green-200 {
  fill: #bbf7d0;
}
.fill-gray-400 {
  fill: #9ca3af;
}

.fill-blue-600 {
  fill: #2563eb;
}
.stroke-blue-400 {
  stroke: #60a5fa;
}
.fill-purple-600 {
  fill: #9333ea;
}
.stroke-purple-400 {
  stroke: #c084fc;
}
.fill-orange-600 {
  fill: #f97316;
}
.stroke-orange-400 {
  stroke: #fb923c;
}
.fill-green-600 {
  fill: #16a34a;
}
.stroke-green-400 {
  stroke: #4ade80;
}
.fill-gray-700 {
  fill: #4b5563;
}
.stroke-gray-500 {
  stroke: #6b7280;
}

/* Gradients for text */
.text-gradient-blue-end {
  color: #00e6ff;
}

.text-gradient-purple-end {
  color: #ff4dff;
}

.text-gradient-orange-end {
  color: #ff9e00;
}

.text-gradient-mint-end {
  color: #70ff94;
}

/* Animation for hover on cards */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* SVG text */
svg text {
  fill: currentColor;
  font-size: 10px;
}

@media (min-width: 768px) {
  svg text {
    font-size: 12px;
  }
}

/* Active card styling */
[class*="ring-"] {
  --tw-ring-color: rgb(var(--ring-color));
  animation: pulseHighlight 2s ease;
}

@keyframes pulseHighlight {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--ring-color), 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(var(--ring-color), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--ring-color), 0);
  }
}

/* Node hover effects */
.node-circle {
  transition: r 0.3s ease, filter 0.3s ease;
}

.node-circle:hover {
  filter: brightness(1.2);
}

/* Highlight effect for legend click */
.highlight-node {
  filter: brightness(1.5);
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 2;
  animation: glowPulse 1.5s ease-in-out infinite;
}

/* Pulse effects */
.pulse-blue {
  filter: url(#pulse-blue);
}

.pulse-purple {
  filter: url(#pulse-purple);
}

.pulse-orange {
  filter: url(#pulse-orange);
}

.pulse-mint {
  filter: url(#pulse-mint);
}

/* Tooltip animation */
.tooltip-container {
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glow pulse for highlight */
@keyframes glowPulse {
  0% {
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.2);
  }
  100% {
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.1);
  }
}

/* FontAwesome in SVG */
.fa {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

/* SVG pointer events */
svg {
  pointer-events: bounding-box;
}

/* Ensure cards are not covered */
section {
  position: relative;
  z-index: 1;
}
</style>
