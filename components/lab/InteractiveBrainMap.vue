<!-- components/lab/InteractiveBrainMap.vue -->
<template>
  <div class="interactive-brain-map">
    <!-- Control Panel -->
    <div
      class="control-panel mb-6 p-4 rounded-2xl bg-slate-900/50 border border-cyan-500/10 backdrop-blur-sm"
    >
      <div
        class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
      >
        <!-- View Selector -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="view in viewModes"
            :key="view.id"
            @click="activeView = view.id"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            :class="
              activeView === view.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            "
          >
            {{ view.label }}
          </button>
        </div>

        <!-- Filter -->
        <div class="flex items-center gap-3">
          <span
            class="text-xs text-slate-400 uppercase tracking-wide hidden sm:inline"
            >Фильтр:</span
          >
          <select
            v-model="activeFilter"
            class="bg-slate-800/80 border border-cyan-500/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/40 cursor-pointer"
          >
            <option value="all">Все области</option>
            <option value="cognitive">Когнитивные</option>
            <option value="sensory">Сенсорные</option>
            <option value="motor">Моторные</option>
            <option value="emotional">Эмоциональные</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Brain Visualization -->
    <div
      class="brain-container relative bg-slate-900/30 rounded-2xl border border-cyan-500/10 p-4 sm:p-8 overflow-hidden"
    >
      <!-- Background Grid -->
      <div class="absolute inset-0 opacity-5">
        <div class="grid-pattern"></div>
      </div>

      <!-- SVG Brain -->
      <div
        class="relative w-full"
        style="padding-bottom: 60%; min-height: 400px"
      >
        <svg
          class="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          @mousemove="handleMouseMove"
          @mouseleave="hoveredRegion = null"
        >
          <!-- Defs for gradients -->
          <defs>
            <linearGradient
              id="brainGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#a855f7" stop-opacity="0.1" />
            </linearGradient>

            <!-- Arrow markers for orientation -->
            <marker
              id="arrowFront"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <polygon points="0,0 10,5 0,10" fill="rgba(6, 182, 212, 0.8)" />
            </marker>
            <marker
              id="arrowBack"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <polygon points="0,0 10,5 0,10" fill="rgba(168, 85, 247, 0.8)" />
            </marker>
            <marker
              id="arrowTop"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <polygon points="0,0 10,5 0,10" fill="rgba(34, 197, 94, 0.8)" />
            </marker>
            <marker
              id="arrowBottom"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <polygon points="0,0 10,5 0,10" fill="rgba(249, 115, 22, 0.8)" />
            </marker>
          </defs>

          <!-- Brain Outline -->
          <path
            :d="brainOutline"
            fill="none"
            stroke="rgba(6, 182, 212, 0.2)"
            stroke-width="2"
            class="brain-outline"
          />

          <!-- Orientation Markers -->
          <!-- Front marker -->
          <g class="orientation-marker">
            <line
              x1="180"
              y1="250"
              x2="120"
              y2="250"
              stroke="rgba(6, 182, 212, 0.6)"
              stroke-width="2"
              marker-end="url(#arrowFront)"
            />
            <text x="50" y="245" class="text-xs fill-cyan-400 font-medium">
              ПЕРЕДНЯЯ
            </text>
            <text x="65" y="260" class="text-[10px] fill-slate-400">(Лоб)</text>
          </g>

          <!-- Back marker -->
          <g class="orientation-marker">
            <line
              x1="830"
              y1="280"
              x2="890"
              y2="280"
              stroke="rgba(168, 85, 247, 0.6)"
              stroke-width="2"
              marker-end="url(#arrowBack)"
            />
            <text x="900" y="285" class="text-xs fill-purple-400 font-medium">
              ЗАДНЯЯ
            </text>
            <text x="905" y="300" class="text-[10px] fill-slate-400">
              (Затылок)
            </text>
          </g>

          <!-- Top marker -->
          <g class="orientation-marker">
            <line
              x1="500"
              y1="60"
              x2="500"
              y2="20"
              stroke="rgba(34, 197, 94, 0.6)"
              stroke-width="2"
              marker-end="url(#arrowTop)"
            />
            <text x="510" y="35" class="text-xs fill-emerald-400 font-medium">
              ВЕРХ
            </text>
          </g>

          <!-- Bottom marker -->
          <g class="orientation-marker">
            <line
              x1="500"
              y1="510"
              x2="500"
              y2="550"
              stroke="rgba(249, 115, 22, 0.6)"
              stroke-width="2"
              marker-end="url(#arrowBottom)"
            />
            <text x="510" y="545" class="text-xs fill-orange-400 font-medium">
              НИЗ
            </text>
          </g>

          <!-- Brain Regions -->
          <g v-for="region in filteredRegions" :key="region.id">
            <path
              :d="region.path"
              :fill="getRegionFill(region)"
              :stroke="getRegionStroke(region)"
              :stroke-width="region.id === selectedRegion?.id ? 3 : 1.5"
              class="brain-region cursor-pointer transition-all duration-300"
              :class="{ 'region-active': region.id === selectedRegion?.id }"
              @mouseenter="hoveredRegion = region"
              @mouseleave="hoveredRegion = null"
              @click="selectRegion(region)"
            />

            <!-- Region Labels (only in detailed view) -->
            <text
              v-if="activeView === 'detailed'"
              :x="region.labelPos.x"
              :y="region.labelPos.y"
              class="region-label text-xs font-medium pointer-events-none"
              :class="
                region.id === selectedRegion?.id
                  ? 'fill-cyan-300'
                  : 'fill-slate-400'
              "
              text-anchor="middle"
            >
              {{ region.name }}
            </text>
          </g>

          <!-- Connection Lines (only in functional view) -->
          <g v-if="activeView === 'functional'">
            <!-- Glow effect for connections -->
            <line
              v-for="connection in connections"
              :key="`${connection.from}-${connection.to}-glow`"
              :x1="getRegionCenter(connection.from).x"
              :y1="getRegionCenter(connection.from).y"
              :x2="getRegionCenter(connection.to).x"
              :y2="getRegionCenter(connection.to).y"
              stroke="rgba(6, 182, 212, 0.3)"
              stroke-width="4"
              class="connection-glow"
            />
            <!-- Main connection lines -->
            <line
              v-for="connection in connections"
              :key="`${connection.from}-${connection.to}`"
              :x1="getRegionCenter(connection.from).x"
              :y1="getRegionCenter(connection.from).y"
              :x2="getRegionCenter(connection.to).x"
              :y2="getRegionCenter(connection.to).y"
              stroke="rgba(6, 182, 212, 0.8)"
              stroke-width="2.5"
              stroke-dasharray="8,4"
              class="connection-line"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="12"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </line>
            <!-- Connection dots at endpoints -->
            <circle
              v-for="connection in connections"
              :key="`${connection.from}-dot`"
              :cx="getRegionCenter(connection.from).x"
              :cy="getRegionCenter(connection.from).y"
              r="4"
              fill="rgba(6, 182, 212, 0.9)"
              class="connection-dot"
            />
          </g>

          <!-- Hover Tooltip -->
          <g
            v-if="hoveredRegion && !selectedRegion"
            class="pointer-events-none"
          >
            <rect
              :x="tooltipPos.x"
              :y="tooltipPos.y"
              width="220"
              height="90"
              rx="8"
              fill="rgba(15, 23, 42, 0.95)"
              stroke="rgba(6, 182, 212, 0.5)"
              stroke-width="1"
            />
            <text
              :x="tooltipPos.x + 12"
              :y="tooltipPos.y + 25"
              class="text-sm font-semibold fill-white"
            >
              {{ hoveredRegion.name }}
            </text>
            <text
              :x="tooltipPos.x + 12"
              :y="tooltipPos.y + 45"
              class="text-xs fill-slate-300"
            >
              {{ hoveredRegion.function }}
            </text>
            <text
              :x="tooltipPos.x + 12"
              :y="tooltipPos.y + 65"
              class="text-xs fill-cyan-400"
            >
              Нажмите для подробностей
            </text>
          </g>
        </svg>
      </div>

      <!-- Selected Region Details -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-4"
      >
        <div
          v-if="selectedRegion"
          class="region-details mt-6 p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div>
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-white">
                  {{ selectedRegion.name }}
                </h3>
                <button
                  @click="selectedRegion = null"
                  class="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700/50"
                  aria-label="Закрыть"
                >
                  <i class="fas fa-times text-lg"></i>
                </button>
              </div>

              <div class="space-y-4">
                <div>
                  <div
                    class="text-xs text-slate-400 uppercase tracking-wide mb-1"
                  >
                    Функция
                  </div>
                  <div class="text-sm text-white">
                    {{ selectedRegion.function }}
                  </div>
                </div>

                <div>
                  <div
                    class="text-xs text-slate-400 uppercase tracking-wide mb-1"
                  >
                    Тип
                  </div>
                  <span
                    class="inline-flex px-3 py-1 rounded-full text-xs font-medium"
                    :class="getTypeClass(selectedRegion.type)"
                  >
                    {{ getTypeName(selectedRegion.type) }}
                  </span>
                </div>

                <div>
                  <div
                    class="text-xs text-slate-400 uppercase tracking-wide mb-2"
                  >
                    Расположение
                  </div>
                  <div class="text-sm text-slate-300">
                    {{ selectedRegion.location }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div>
              <div class="text-xs text-slate-400 uppercase tracking-wide mb-2">
                Описание
              </div>
              <p class="text-sm text-slate-300 leading-relaxed mb-4">
                {{ selectedRegion.fullDescription }}
              </p>

              <div class="text-xs text-slate-400 uppercase tracking-wide mb-2">
                Ключевые функции
              </div>
              <ul class="space-y-2">
                <li
                  v-for="(func, index) in selectedRegion.keyFunctions"
                  :key="index"
                  class="text-sm text-slate-300 flex items-start gap-2"
                >
                  <span class="text-cyan-400 mt-1">•</span>
                  <span>{{ func }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Legend -->
    <div
      class="legend mt-6 p-4 rounded-xl bg-slate-900/50 border border-cyan-500/10"
    >
      <div class="flex flex-wrap items-center gap-6">
        <div class="text-sm font-medium text-slate-300">Типы областей:</div>
        <div
          v-for="type in regionTypes"
          :key="type.id"
          class="flex items-center gap-2"
        >
          <div
            class="w-4 h-4 rounded"
            :style="{ backgroundColor: type.color }"
          ></div>
          <span class="text-sm text-slate-400">{{ type.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeView = ref("detailed");
const activeFilter = ref("all");
const hoveredRegion = ref(null);
const selectedRegion = ref(null);
const tooltipPos = ref({ x: 0, y: 0 });

const viewModes = [
  { id: "detailed", label: "Детальный" },
  { id: "simple", label: "Упрощенный" },
  { id: "functional", label: "Функциональный" },
];

const regionTypes = [
  { id: "cognitive", label: "Когнитивные", color: "rgba(6, 182, 212, 0.6)" },
  { id: "sensory", label: "Сенсорные", color: "rgba(34, 197, 94, 0.6)" },
  { id: "motor", label: "Моторные", color: "rgba(249, 115, 22, 0.6)" },
  { id: "emotional", label: "Эмоциональные", color: "rgba(168, 85, 247, 0.6)" },
];

// Anatomically accurate brain outline (lateral view)
const brainOutline =
  "M200,250 Q180,180 220,130 Q280,80 360,70 Q480,65 600,80 Q700,95 760,150 Q810,210 820,280 Q820,350 780,410 Q730,470 650,490 Q570,505 480,500 Q400,495 330,470 Q260,440 220,380 Q190,330 200,250 Z";

// Brain regions with anatomically accurate paths
const brainRegions = ref([
  {
    id: "frontal",
    name: "Лобная доля",
    type: "cognitive",
    function: "Исполнительные функции",
    location: "Передняя часть мозга",
    fullDescription:
      "Отвечает за планирование, принятие решений, контроль поведения, память и решение проблем. Играет ключевую роль в формировании личности.",
    keyFunctions: [
      "Планирование и организация",
      "Принятие решений",
      "Контроль импульсов",
      "Рабочая память",
    ],
    path: "M200,250 Q190,200 220,150 Q260,110 320,95 Q380,85 440,90 Q480,95 500,110 L480,180 Q460,220 420,240 Q360,260 300,260 Q240,255 200,250 Z",
    labelPos: { x: 360, y: 170 },
    center: { x: 350, y: 180 },
  },
  {
    id: "parietal",
    name: "Теменная доля",
    type: "sensory",
    function: "Обработка сенсорной информации",
    location: "Верхняя средняя часть",
    fullDescription:
      "Обрабатывает тактильную информацию, пространственное восприятие и координацию. Интегрирует сенсорные сигналы от различных частей тела.",
    keyFunctions: [
      "Осязание и давление",
      "Температурное восприятие",
      "Пространственная ориентация",
      "Координация движений",
    ],
    path: "M500,110 Q560,100 620,105 Q680,115 720,140 Q760,170 780,210 Q790,250 780,290 L720,270 Q680,260 640,260 Q580,260 540,250 Q500,230 480,200 L500,110 Z",
    labelPos: { x: 640, y: 190 },
    center: { x: 640, y: 200 },
  },
  {
    id: "temporal",
    name: "Височная доля",
    type: "cognitive",
    function: "Память и слух",
    location: "Боковая нижняя часть",
    fullDescription:
      "Обрабатывает слуховую информацию, участвует в формировании долговременной памяти, распознавании лиц и понимании языка.",
    keyFunctions: [
      "Обработка звуков",
      "Распознавание речи",
      "Формирование памяти",
      "Распознавание лиц",
    ],
    path: "M300,260 Q240,270 200,300 Q180,340 190,380 Q210,420 250,440 Q300,455 360,450 Q420,445 460,425 L480,380 Q470,340 440,310 Q400,280 360,270 Q330,265 300,260 Z",
    labelPos: { x: 330, y: 360 },
    center: { x: 340, y: 360 },
  },
  {
    id: "occipital",
    name: "Затылочная доля",
    type: "sensory",
    function: "Обработка зрения",
    location: "Задняя часть мозга",
    fullDescription:
      "Основной центр обработки визуальной информации. Анализирует цвет, форму, движение и глубину зрительных стимулов.",
    keyFunctions: [
      "Восприятие цвета",
      "Распознавание форм",
      "Обработка движения",
      "Пространственное зрение",
    ],
    path: "M720,270 Q760,270 790,290 Q815,320 820,360 Q815,400 790,430 Q750,460 700,475 Q650,485 600,480 L580,440 Q590,400 620,370 Q660,330 690,300 L720,270 Z",
    labelPos: { x: 710, y: 380 },
    center: { x: 710, y: 380 },
  },
  {
    id: "motor-cortex",
    name: "Моторная кора",
    type: "motor",
    function: "Контроль движений",
    location: "Задняя часть лобной доли",
    fullDescription:
      "Планирует, контролирует и выполняет произвольные движения. Каждая часть коры связана с определенной частью тела.",
    keyFunctions: [
      "Планирование движений",
      "Выполнение движений",
      "Мелкая моторика",
      "Координация",
    ],
    path: "M420,240 Q460,220 500,210 Q540,205 580,210 L590,240 Q580,270 560,290 Q530,305 490,305 Q450,300 420,280 L420,240 Z",
    labelPos: { x: 500, y: 255 },
    center: { x: 500, y: 260 },
  },
  {
    id: "prefrontal",
    name: "Префронтальная кора",
    type: "cognitive",
    function: "Высшие функции",
    location: "Передняя часть лобной доли",
    fullDescription:
      "Отвечает за сложное когнитивное поведение, выражение личности, принятие решений и модуляцию социального поведения.",
    keyFunctions: [
      "Планирование будущего",
      "Социальное поведение",
      "Концентрация внимания",
      "Абстрактное мышление",
    ],
    path: "M220,150 Q200,130 200,100 Q210,70 240,55 Q280,45 330,45 Q380,48 420,60 L440,90 Q420,120 380,135 Q330,150 280,150 Q240,148 220,150 Z",
    labelPos: { x: 320, y: 100 },
    center: { x: 320, y: 100 },
  },
  {
    id: "cerebellum",
    name: "Мозжечок",
    type: "motor",
    function: "Координация и баланс",
    location: "Нижняя задняя часть",
    fullDescription:
      "Координирует произвольные движения, поддерживает равновесие и позу. Также участвует в моторном обучении.",
    keyFunctions: [
      "Координация движений",
      "Поддержание баланса",
      "Мышечный тонус",
      "Точность движений",
    ],
    path: "M580,440 Q620,460 670,470 Q720,475 760,465 Q790,450 800,420 L770,430 Q730,445 690,450 Q640,455 600,445 L580,440 Z",
    labelPos: { x: 690, y: 450 },
    center: { x: 690, y: 445 },
  },
  {
    id: "limbic",
    name: "Лимбическая система",
    type: "emotional",
    function: "Эмоции и память",
    location: "Внутренняя средняя часть",
    fullDescription:
      "Регулирует эмоции, мотивацию, обучение и память. Включает гиппокамп, миндалину и другие структуры.",
    keyFunctions: [
      "Эмоциональные реакции",
      "Формирование памяти",
      "Мотивация",
      "Обучение",
    ],
    path: "M460,280 Q480,300 510,310 Q540,315 570,310 Q590,300 600,280 L590,320 Q570,340 540,345 Q510,345 480,335 Q460,320 460,280 Z",
    labelPos: { x: 530, y: 315 },
    center: { x: 530, y: 315 },
  },
]);

// Functional connections between regions
const connections = [
  { from: "prefrontal", to: "motor-cortex" },
  { from: "prefrontal", to: "limbic" },
  { from: "frontal", to: "parietal" },
  { from: "parietal", to: "occipital" },
  { from: "temporal", to: "limbic" },
  { from: "motor-cortex", to: "cerebellum" },
  { from: "occipital", to: "temporal" },
];

const filteredRegions = computed(() => {
  if (activeFilter.value === "all") return brainRegions.value;
  return brainRegions.value.filter((r) => r.type === activeFilter.value);
});

const getRegionFill = (region) => {
  const colors = {
    cognitive: "rgba(6, 182, 212, 0.3)",
    sensory: "rgba(34, 197, 94, 0.3)",
    motor: "rgba(249, 115, 22, 0.3)",
    emotional: "rgba(168, 85, 247, 0.3)",
  };

  if (region.id === selectedRegion.value?.id) {
    return colors[region.type].replace("0.3", "0.5");
  }
  if (region.id === hoveredRegion.value?.id) {
    return colors[region.type].replace("0.3", "0.4");
  }
  return colors[region.type];
};

const getRegionStroke = (region) => {
  const colors = {
    cognitive: "rgba(6, 182, 212, 0.6)",
    sensory: "rgba(34, 197, 94, 0.6)",
    motor: "rgba(249, 115, 22, 0.6)",
    emotional: "rgba(168, 85, 247, 0.6)",
  };

  if (
    region.id === selectedRegion.value?.id ||
    region.id === hoveredRegion.value?.id
  ) {
    return colors[region.type].replace("0.6", "0.9");
  }
  return colors[region.type];
};

const getTypeClass = (type) => {
  const classes = {
    cognitive: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40",
    sensory: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
    motor: "bg-orange-500/20 text-orange-300 border border-orange-500/40",
    emotional: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
  };
  return classes[type];
};

const getTypeName = (type) => {
  const names = {
    cognitive: "Когнитивная",
    sensory: "Сенсорная",
    motor: "Моторная",
    emotional: "Эмоциональная",
  };
  return names[type];
};

const getRegionCenter = (regionId) => {
  const region = brainRegions.value.find((r) => r.id === regionId);
  return region ? region.center : { x: 0, y: 0 };
};

const selectRegion = (region) => {
  selectedRegion.value = selectedRegion.value?.id === region.id ? null : region;
};

const handleMouseMove = (event) => {
  if (!hoveredRegion.value) return;

  const svg = event.currentTarget;
  const rect = svg.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 1000;
  const y = ((event.clientY - rect.top) / rect.height) * 600;

  tooltipPos.value = {
    x: Math.min(Math.max(x - 110, 10), 770),
    y: Math.max(y - 100, 10),
  };
};
</script>

<style scoped>
.grid-pattern {
  background-image: linear-gradient(
      rgba(6, 182, 212, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  width: 100%;
  height: 100%;
}

.brain-outline {
  filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.3));
}

.brain-region {
  filter: drop-shadow(0 0 5px rgba(6, 182, 212, 0.2));
}

.brain-region:hover {
  filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5));
}

.brain-region.region-active {
  filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.7));
}

.region-label {
  font-size: 11px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.connection-line {
  filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.6));
}

.connection-glow {
  filter: blur(3px);
}

.connection-dot {
  filter: drop-shadow(0 0 3px rgba(6, 182, 212, 0.8));
}

.orientation-marker {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.orientation-marker:hover {
  opacity: 1;
}

@media (max-width: 640px) {
  .region-label {
    font-size: 9px;
  }
}
</style>
