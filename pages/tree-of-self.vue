<template>
  <div class="min-h-screen">
    <!-- Header Section -->
    <header
      class="pt-8 md:pt-12 pb-10 md:pb-16 px-4 sm:px-6 bg-gradient-to-br from-background to-background/95"
    >
      <div class="container mx-auto max-w-6xl">
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3 md:mb-4">
          Древо Себя
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl">
          Исследуйте свой внутренний мир через 10 Сефирот, отражая прогресс в
          самопознании, эмоциях и действиях
        </p>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="px-4 sm:px-6 pb-20">
      <div class="container mx-auto max-w-6xl">
        <!-- Tree Visualization -->
        <section
          class="my-8 md:my-16 bg-white/5 backdrop-blur rounded-xl shadow-xl p-4 md:p-8 border border-white/10"
        >
          <h2
            class="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 flex items-center"
          >
            <i class="fas fa-tree mr-2 text-gradient-blue-end"></i>
            Ваше Древо Себя
          </h2>

          <div class="relative flex flex-col items-center mb-6">
            <!-- SVG Tree for Medium+ Screens -->
            <div class="relative mb-4">
              <!-- Decorative background elements -->

              <svg
                class="w-full max-w-xl h-[28rem] lg:h-[32rem]"
                viewBox="0 0 300 450"
                preserveAspectRatio="xMidYMid meet"
              >
                <!-- Definitions for effects -->
                <defs>
                  <!-- Glow filter with variable color input -->
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

                <!-- Dynamic connections between nodes with gradient -->
                <g class="connections">
                  <!-- Vertical light beam from top to bottom -->
                  <line
                    x1="150"
                    y1="40"
                    x2="150"
                    y2="410"
                    stroke="url(#vertical-beam)"
                    stroke-width="1"
                    stroke-opacity="0.2"
                  />

                  <!-- Paths (Connections between Sefirot) -->
                  <g v-for="(conn, idx) in connections" :key="`conn-${idx}`">
                    <path
                      :d="conn.path"
                      stroke-width="1.5"
                      class="path-line"
                      :class="{ 'active-path': conn.active }"
                      :stroke-dasharray="conn.active ? '5,5' : '2,3'"
                    />

                    <!-- Animated particle on path (when both nodes have progress) -->
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
                  <!-- Outer glow ring (always visible for active nodes) -->
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
                    <title>{{ sefirah.name }}: {{ sefirah.progress }}%</title>
                    <!-- Subtle pulsing animation for active nodes -->
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
                    fill="gray"
                    :stroke-dasharray="`${sefirah.progress * 0.94}, 100`"
                    :transform="`rotate(-90 ${sefirah.x} ${sefirah.y})`"
                  >
                    <!-- Subtle shimmer animation for progress ring -->
                    <animate
                      attributeName="stroke-opacity"
                      values="0.8;1;0.8"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <!-- Node inner icon based on category -->
                  <text
                    :x="sefirah.x"
                    :y="sefirah.y"
                    text-anchor="middle"
                    dominant-baseline="central"
                    class="fill-white text-opacity-80 text-xs"
                    style="pointer-events: none"
                  >
                    <tspan v-if="sefirah.category === 'wisdom'" class="fa">
                      &#xf0eb;
                    </tspan>
                    <tspan
                      v-else-if="sefirah.category === 'emotions'"
                      class="fa"
                    >
                      &#xf004;
                    </tspan>
                    <tspan v-else-if="sefirah.category === 'action'" class="fa">
                      &#xf554;
                    </tspan>
                    <tspan
                      v-else-if="sefirah.category === 'integration'"
                      class="fa"
                    >
                      &#xf5fd;
                    </tspan>
                  </text>

                  <!-- Label with better contrast -->
                  <g class="node-label transition-opacity duration-300">
                    <!-- Label background for better readability -->
                    <rect
                      :x="getLabelX(sefirah) - 30"
                      :y="sefirah.y + 20"
                      width="60"
                      height="20"
                      rx="10"
                      fill="rgba(0,0,0,0.9)"
                      class="node-label-bg"
                    />

                    <!-- Label text -->
                    <text
                      :x="getLabelX(sefirah)"
                      :y="sefirah.y + 30"
                      class="text-xs font-medium text-white"
                      text-anchor="middle"
                      dominant-baseline="middle"
                    >
                      {{ sefirah.name }}
                    </text>
                  </g>
                </g>

                <!-- Interactive tooltip -->
                <foreignObject
                  v-if="activeTooltip"
                  :x="activeTooltip.x - 70"
                  :y="activeTooltip.y - 80"
                  width="140"
                  height="70"
                  class="tooltip-container"
                >
                  <div
                    class="bg-black/80 backdrop-blur-sm p-2 rounded text-white text-xs border border-white/20"
                  >
                    <p class="font-medium">{{ activeTooltip.name }}</p>
                    <p class="text-gray-300">{{ activeTooltip.function }}</p>
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
            <!-- Mobile Tree Summary for Small Screens -->
            <div class="w-full">
              <div
                class="bg-background/50 rounded-lg p-4 mb-4 border border-white/10"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-white">Общий прогресс</span>
                  <span class="text-gradient-mint-end font-medium"
                    >{{ overallProgress }}%</span
                  >
                </div>
                <div class="w-full bg-gray-800/50 rounded-full h-2.5">
                  <div
                    class="bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end h-2.5 rounded-full"
                    :style="{ width: `${overallProgress}%` }"
                  ></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="sefirah in sefirot"
                  :key="`mobile-${sefirah.id}`"
                  class="p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sefirah-glow"
                  :class="[
                    getNodeBorderClass(sefirah.progress),
                    {
                      'hover:shadow-blue-400/30': sefirah.category === 'wisdom',
                    },
                    {
                      'hover:shadow-purple-400/30':
                        sefirah.category === 'emotions',
                    },
                    {
                      'hover:shadow-orange-400/30':
                        sefirah.category === 'action',
                    },
                    {
                      'hover:shadow-green-400/30':
                        sefirah.category === 'integration',
                    },
                  ]"
                  @click="scrollToSefirah(sefirah.id)"
                >
                  <p class="text-white text-sm font-medium mb-1">
                    {{ sefirah.name }}
                  </p>
                  <div class="w-full bg-gray-800/50 rounded-full h-1.5 mb-1">
                    <div
                      class="h-1.5 rounded-full"
                      :class="getProgressBarClass(sefirah.id)"
                      :style="{ width: `${sefirah.progress}%` }"
                    ></div>
                  </div>
                  <p class="text-xs text-gray-300">{{ sefirah.progress }}%</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Legend with hover effects -->
          <div class="flex flex-wrap justify-center gap-4 text-sm">
            <div
              class="flex items-center p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span
                class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end mr-1"
              ></span>
              <span class="text-gray-200">Мудрость</span>
            </div>
            <div
              class="flex items-center p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span
                class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end mr-1"
              ></span>
              <span class="text-gray-200">Чувства</span>
            </div>
            <div
              class="flex items-center p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span
                class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-orange-start to-gradient-orange-end mr-1"
              ></span>
              <span class="text-gray-200">Действия</span>
            </div>
            <div
              class="flex items-center p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span
                class="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end mr-1"
              ></span>
              <span class="text-gray-200">Интеграция</span>
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
                {{ sefirah.name }}
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

        <!-- CTA Section -->
        <section
          class="bg-gradient-to-br from-gradient-blue-start/30 to-gradient-blue-end/30 backdrop-blur text-white rounded-xl shadow-lg p-6 md:p-8 text-center border border-white/10"
        >
          <h2 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
            Продолжайте Расти с Древом Себя
          </h2>
          <p class="text-gray-300 mb-6">
            Каждый шаг укрепляет ваше Древо. Запишите эмоции, завершите тест или
            поделитесь инсайтом уже сегодня!
          </p>
          <div class="flex flex-wrap gap-3 justify-center">
            <nuxt-link
              to="/awareness-tools"
              class="inline-flex items-center bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end text-background px-5 py-3 rounded-lg font-medium hover:shadow-lg transition"
            >
              <i class="fas fa-compass mr-2"></i>
              Исследовать Инструменты
            </nuxt-link>
            <nuxt-link
              to="/emotional-compass"
              class="inline-flex items-center bg-white/10 text-white px-5 py-3 rounded-lg font-medium hover:bg-white/15 transition"
            >
              <i class="fas fa-heart mr-2"></i>
              Записать Эмоции
            </nuxt-link>
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

// Connection data
const connections = computed(() => {
  return [
    {
      path: "M150 50 L100 120",
      active:
        sefirot.value.find((s) => s.id === "keter").progress > 0 &&
        sefirot.value.find((s) => s.id === "chokhmah").progress > 0,
      category: "wisdom",
    },
    {
      path: "M150 50 L200 120",
      active:
        sefirot.value.find((s) => s.id === "keter").progress > 0 &&
        sefirot.value.find((s) => s.id === "binah").progress > 0,
      category: "emotions",
    },
    {
      path: "M100 120 L80 200",
      active:
        sefirot.value.find((s) => s.id === "chokhmah").progress > 0 &&
        sefirot.value.find((s) => s.id === "chesed").progress > 0,
      category: "emotions",
    },
    {
      path: "M200 120 L220 200",
      active:
        sefirot.value.find((s) => s.id === "binah").progress > 0 &&
        sefirot.value.find((s) => s.id === "gevurah").progress > 0,
      category: "action",
    },
    {
      path: "M80 200 L150 260",
      active:
        sefirot.value.find((s) => s.id === "chesed").progress > 0 &&
        sefirot.value.find((s) => s.id === "tiferet").progress > 0,
      category: "integration",
    },
    {
      path: "M220 200 L150 260",
      active:
        sefirot.value.find((s) => s.id === "gevurah").progress > 0 &&
        sefirot.value.find((s) => s.id === "tiferet").progress > 0,
      category: "integration",
    },
    {
      path: "M80 200 L100 280",
      active:
        sefirot.value.find((s) => s.id === "chesed").progress > 0 &&
        sefirot.value.find((s) => s.id === "netzach").progress > 0,
      category: "action",
    },
    {
      path: "M220 200 L200 280",
      active:
        sefirot.value.find((s) => s.id === "gevurah").progress > 0 &&
        sefirot.value.find((s) => s.id === "hod").progress > 0,
      category: "wisdom",
    },
    {
      path: "M100 280 L150 340",
      active:
        sefirot.value.find((s) => s.id === "netzach").progress > 0 &&
        sefirot.value.find((s) => s.id === "yesod").progress > 0,
      category: "integration",
    },
    {
      path: "M200 280 L150 340",
      active:
        sefirot.value.find((s) => s.id === "hod").progress > 0 &&
        sefirot.value.find((s) => s.id === "yesod").progress > 0,
      category: "integration",
    },
    {
      path: "M150 340 L150 400",
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
    y: sefirah.y,
  };
};

// Hide node tooltip
const hideNodeTooltip = () => {
  activeTooltip.value = null;
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

// Set active card and scroll to it
const setActiveCard = (id) => {
  activeCard.value = id;
};

// Scroll to Sefirah Card
const scrollToSefirah = (id) => {
  activeCard.value = id;
  const element = document.getElementById(`sefirah-${id}`);
  if (element) {
    // Add a small timeout to ensure the DOM is ready
    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      // Add a temporary highlight class
      element.classList.add("ring-2");
      setTimeout(() => element.classList.remove("ring-2"), 2000);
    }, 50);
  }
};

// Sefirot Data Structure with category info for styling
const sefirot = ref([
  {
    id: "keter",
    name: "Кетер",
    function: "Высшее Я",
    description: "Ваша истинная сущность и потенциал души.",
    features: ["Профиль", "Открытие Архетипов"],
    x: 150,
    y: 50,
    progress: 0,
    category: "integration",
    cta: {
      text: "Пройти тест архетипов",
      link: "/awareness-tools/archetype-discovery",
    },
  },
  {
    id: "chokhmah",
    name: "Хохма",
    function: "Ясность",
    description: "Интуиция и интеллектуальное прозрение.",
    features: ["Тест Большой Пятёрки", "Блог"],
    x: 100,
    y: 120,
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
    function: "Эмоциональная осознанность",
    description: "Глубина чувств и понимание эмоций.",
    features: ["Эмоциональный Компас"],
    x: 200,
    y: 120,
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
    function: "Связь",
    description: "Милосердие и поддержка сообщества.",
    features: ["Центр сообщества"],
    x: 80,
    y: 200,
    progress: 0,
    category: "emotions",
    cta: { text: "Поделиться инсайтом", link: "/community" },
  },
  {
    id: "gevurah",
    name: "Гвура",
    function: "Структура",
    description: "Дисциплина и конкретные действия.",
    features: ["Курсы"],
    x: 220,
    y: 200,
    progress: 0,
    category: "action",
    cta: { text: "Начать курс", link: "/courses" },
  },
  {
    id: "tiferet",
    name: "Тиферет",
    function: "Интеграция",
    description: "Баланс и целостность вашего пути.",
    features: ["Внутренний Ландшафт"],
    x: 150,
    y: 260,
    progress: 0,
    category: "integration",
    cta: null,
  },
  {
    id: "netzach",
    name: "Нецах",
    function: "Мотивация",
    description: "Стойкость и ежедневный рост.",
    features: ["Ежедневная Искра Роста"],
    x: 100,
    y: 280,
    progress: 0,
    category: "action",
    cta: { text: "Записать искру", link: "/home" },
  },
  {
    id: "hod",
    name: "Ход",
    function: "Перспектива",
    description: "Рефлексия через контент и знания.",
    features: ["Гайды", "Подкасты"],
    x: 200,
    y: 280,
    progress: 0,
    category: "wisdom",
    cta: null,
  },
  {
    id: "yesod",
    name: "Йесод",
    function: "Рутина",
    description: "Фундамент ваших привычек и прогресса.",
    features: ["Личный кабинет"],
    x: 150,
    y: 340,
    progress: 0,
    category: "integration",
    cta: { text: "Посмотреть прогресс", link: "/personal-cabinet" },
  },
  {
    id: "malkhut",
    name: "Малхут",
    function: "Воплощение",
    description: "Реальные действия в мире.",
    features: ["Выполненные задачи"],
    x: 150,
    y: 400,
    progress: 0,
    category: "action",
    cta: { text: "Завершить задачу", link: "/awareness-tools" },
  },
]);

// Calculate overall progress
const overallProgress = computed(() => {
  const total = sefirot.value.reduce((sum, s) => sum + s.progress, 0);
  return Math.round(total / 10);
});

// Fetch User Progress
const fetchSefirotProgress = async (userId) => {
  try {
    // Keter: Profile completion and archetypes
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

    // Chokhmah: Big Five test completion
    if (
      assessmentResponse?.success &&
      assessmentResponse.assessment.type === "big-5"
    ) {
      sefirot.value.find((s) => s.id === "chokhmah").progress = 100;
    }

    // Binah: Emotional Compass entries
    const emotionResponse = await getEmotionBarometerData(firestore, userId);
    if (emotionResponse?.success) {
      const entryCount = emotionResponse.data.entries.length;
      sefirot.value.find((s) => s.id === "binah").progress = Math.min(
        Math.round((entryCount / 10) * 100),
        100
      );
    }

    // Chesed: Community posts
    sefirot.value.find((s) => s.id === "chesed").progress = 10; // Mock: 1 post = 10%

    // Gevurah: Course progress
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

    // Tiferet: Overall Inner Landscape progress
    // Calculate after other Sefirot updates
    setTimeout(() => {
      const totalProgress = sefirot.value
        .filter((s) => s.id !== "tiferet")
        .reduce((sum, s) => sum + s.progress, 0);
      sefirot.value.find((s) => s.id === "tiferet").progress = Math.round(
        totalProgress / 9
      );
    }, 100);

    // Netzach: Daily Growth Spark entries
    const sparkResponse = await getDailyGrowthSparkData(firestore, userId);
    if (sparkResponse?.success) {
      const sparkCount = sparkResponse.data.entries?.length || 1;
      sefirot.value.find((s) => s.id === "netzach").progress = Math.min(
        Math.round((sparkCount / 10) * 100),
        100
      );
    }

    // Hod: Guides/Podcasts engagement
    sefirot.value.find((s) => s.id === "hod").progress = 0;

    // Yesod: Personal cabinet activity
    sefirot.value.find((s) => s.id === "yesod").progress =
      coursesResponse?.success ? 50 : 0;

    // Malkhut: Task completions
    sefirot.value.find((s) => s.id === "malkhut").progress = 20;
  } catch (error) {
    console.error("Error fetching Sefirot progress:", error);
    // Ensure UI doesn't break on error
    sefirot.value.forEach((s) => {
      if (typeof s.progress !== "number") s.progress = 0;
    });
  }
};

// Get ring color for active card
const getRingColor = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "75, 85, 99"; // RGB for gray-600

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

// Styling functions based on category and progress
const getNodeClass = (id, progress) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "fill-gray-800";

  if (progress === 0) return "fill-gray-800";

  switch (sefirah.category) {
    case "wisdom":
      return "fill-gradient-to-r from-gradient-blue-start to-gradient-blue-end";
    case "emotions":
      return "fill-gradient-to-r from-gradient-purple-start to-gradient-purple-end";
    case "action":
      return "fill-gradient-to-r from-gradient-orange-start to-gradient-orange-end";
    case "integration":
      return "fill-gradient-to-r from-gradient-mint-start to-gradient-mint-end";
    default:
      return "fill-gray-800";
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

// Label positioning helper
const getLabelX = (sefirah) => {
  // Adjust label positioning based on node position
  if (sefirah.x < 120) return sefirah.x - 25;
  if (sefirah.x > 180) return sefirah.x + 25;
  return sefirah.x;
};

// Open Daily Growth Spark dialog
const openDailyGrowthSpark = () => {
  // Navigate to daily growth spark or open modal
  navigateTo("/daily-growth-spark");
};

// Initialize Data
onMounted(async () => {
  if (isLoggedIn.value) {
    const userId = authStore.user.uid;
    await fetchSefirotProgress(userId);
  } else {
    // Non-logged-in: Show sample progress for demo purposes
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

/* Make sure SVG text is visible and appropriately sized */
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

.node-label:hover {
  opacity: 1;
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

/* Background radial gradient */
.bg-gradient-radial {
  background: radial-gradient(
    circle,
    var(--tw-gradient-from) 0%,
    var(--tw-gradient-to) 70%
  );
}

/* FontAwesome in SVG */
.fa {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

/* Mobile card hover effect */
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

/* Vertical beam gradient */
@keyframes shimmer {
  from {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
  to {
    opacity: 0.1;
  }
}

/* Ensure SVG elements can receive pointer events */
svg {
  pointer-events: bounding-box;
}

/* Make sure the cards are not covered by other elements */
section {
  position: relative;
  z-index: 1;
}
</style>
