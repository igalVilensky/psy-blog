<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white"
  >
    <!-- Main Content Area -->
    <main class="px-4 md:px-6 xl:px-0 pb-20 pt-8 md:pt-12">
      <div class="container mx-auto max-w-6xl">
        <!-- Page Header -->
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-3xl md:text-4xl font-semibold mb-2">
            Древо Себя: Исследуйте Сфирот
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto px-4">
            Кликните на любую сфиру, чтобы узнать её психологическое и
            каббалистическое значение.
          </p>
        </div>

        <!-- Three Lines Explanation -->
        <section class="mb-8 bg-white/5 rounded-lg p-4 border border-white/10">
          <h2 class="text-xl font-semibold mb-4 text-center">
            Три Линии Древа Жизни
          </h2>
          <p class="text-sm text-gray-300 mb-4">
            В каббале Древо Жизни содержит три вертикальные линии,
            представляющие разные аспекты божественного проявления:
          </p>
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <button
              @click="highlightLine('right')"
              class="flex-1 p-3 rounded-lg transition-all"
              :class="
                activeLine === 'right'
                  ? 'bg-yellow-500/20 border-yellow-500/50'
                  : 'bg-slate-700/50 hover:bg-slate-700'
              "
            >
              <h3 class="font-medium text-yellow-400 mb-1">Правая линия</h3>
              <p class="text-xs text-gray-300">
                Милосердие, экспансия, мужская энергия
              </p>
            </button>
            <button
              @click="highlightLine('center')"
              class="flex-1 p-3 rounded-lg transition-all"
              :class="
                activeLine === 'center'
                  ? 'bg-green-500/20 border-green-500/50'
                  : 'bg-slate-700/50 hover:bg-slate-700'
              "
            >
              <h3 class="font-medium text-green-400 mb-1">Центральная линия</h3>
              <p class="text-xs text-gray-300">Баланс, гармония, интеграция</p>
            </button>
            <button
              @click="highlightLine('left')"
              class="flex-1 p-3 rounded-lg transition-all"
              :class="
                activeLine === 'left'
                  ? 'bg-blue-500/20 border-blue-500/50'
                  : 'bg-slate-700/50 hover:bg-slate-700'
              "
            >
              <h3 class="font-medium text-blue-400 mb-1">Левая линия</h3>
              <p class="text-xs text-gray-300">
                Строгость, ограничение, женская энергия
              </p>
            </button>
          </div>
          <button
            @click="resetHighlight()"
            class="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Сбросить выделение
          </button>
        </section>

        <!-- Tree Visualization -->
        <section
          class="mb-8 bg-white/5 backdrop-blur rounded-xl shadow-xl border border-white/10 relative"
        >
          <div class="relative flex flex-col items-center">
            <!-- SVG Tree -->
            <svg
              class="w-full max-w-3xl h-[32rem] lg:max-w-4xl lg:h-[40rem] xl:max-w-5xl xl:h-[48rem]"
              viewBox="0 0 400 600"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect x="0" y="0" width="400" height="600" fill="url(#svg-bg)" />

              <!-- Title inside SVG (desktop only) -->
              <g class="hidden md:block">
                <text x="160" y="30" class="text-3xl font-semibold text-white">
                  Древо Себя
                </text>
              </g>

              <!-- Definitions for effects -->
              <defs>
                <!-- Background gradient -->
                <linearGradient id="svg-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="rgba(15, 23, 42, 0.8)" />
                  <stop offset="100%" stop-color="rgba(15, 23, 42, 0.9)" />
                </linearGradient>

                <!-- Glow filter -->
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <!-- Column-specific glow filters -->
                <filter
                  id="glow-left"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="0 0 0 0 0 0 0.4 0 0 0.9 0.8 0 0 0 1 0 0 0 0.7 0"
                    result="glow"
                  />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>

                <filter
                  id="glow-right"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="1 0 0 0 0.8 0.7 0.5 0 0 0 0 0 0 0 0 0 0 0 0.7 0"
                    result="glow"
                  />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>

                <filter
                  id="glow-center"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="0.3 0.8 0 0 0 0.2 1 0 0 0 0.3 0.5 0 0 0 0 0 0 0.7 0"
                    result="glow"
                  />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>

                <!-- Highlight filters -->
                <filter
                  id="highlight"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <!-- Sefirot Connections -->
              <g class="connections">
                <line
                  v-for="(conn, idx) in connections"
                  :key="`conn-${idx}`"
                  :x1="conn.x1"
                  :y1="conn.y1"
                  :x2="conn.x2"
                  :y2="conn.y2"
                  :stroke="getConnectionStroke(conn.column)"
                  :stroke-width="isLineActive(conn.column) ? 3 : 1.5"
                  :stroke-opacity="isLineActive(conn.column) ? 0.8 : 0.3"
                  :class="{ 'transition-all duration-300': true }"
                />
              </g>

              <!-- Sefirot Nodes -->
              <g
                v-for="sefirah in sefirot"
                :key="sefirah.id"
                class="cursor-pointer"
                @click="openModal(sefirah)"
              >
                <!-- Outer glow ring -->
                <circle
                  :cx="sefirah.x"
                  :cy="sefirah.y"
                  r="18"
                  :class="getNodeGlowClass(sefirah.column)"
                  :opacity="isNodeActive(sefirah.column) ? 0.8 : 0.4"
                  :filter="getGlowFilter(sefirah.column)"
                />

                <!-- Base node circle -->
                <circle
                  :cx="sefirah.x"
                  :cy="sefirah.y"
                  :r="hoveredNode === sefirah.id ? 18 : 15"
                  :fill="sefirah.energyColor"
                  class="node-circle transition-all duration-300"
                  stroke="#ffffff"
                  :stroke-width="isNodeActive(sefirah.column) ? 2 : 1"
                  @mouseover="hoveredNode = sefirah.id"
                  @mouseleave="hoveredNode = null"
                >
                  <title>{{ sefirah.function }} ({{ sefirah.name }})</title>
                </circle>

                <!-- Icon inside node -->
                <foreignObject
                  :x="sefirah.x - 10"
                  :y="sefirah.y - 10"
                  width="20"
                  height="20"
                  style="pointer-events: none"
                >
                  <div class="flex items-center justify-center h-full w-full">
                    <i
                      class="fas text-white text-xs"
                      :class="getSefirahIcon(sefirah.id)"
                    ></i>
                  </div>
                </foreignObject>

                <!-- Label with psychological term and Hebrew name -->
                <g>
                  <text
                    :x="getLabelX(sefirah)"
                    :y="sefirah.y + 30"
                    class="font-medium text-white text-xs"
                    :class="{
                      'text-opacity-80':
                        activeLine && !isNodeActive(sefirah.column),
                    }"
                    text-anchor="middle"
                    dominant-baseline="middle"
                  >
                    {{ sefirah.function }}
                  </text>
                  <text
                    :x="getLabelX(sefirah)"
                    :y="sefirah.y + 45"
                    class="text-[0.6rem] font-light"
                    :class="
                      isNodeActive(sefirah.column)
                        ? 'text-gray-200'
                        : 'text-gray-400'
                    "
                    text-anchor="middle"
                    dominant-baseline="middle"
                  >
                    ({{ sefirah.name }})
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </section>

        <!-- Parzufim Explanation -->
        <section class="mb-8 bg-white/5 rounded-lg p-4 border border-white/10">
          <h2 class="text-xl font-semibold mb-4 text-center">
            Концепция Парцуфим в Каббале
          </h2>
          <p class="text-sm text-gray-300 mb-4">
            Парцуфим (Лики) — это конфигурации сфирот, которые действуют как
            единые системы. Они представляют динамические аспекты божественного
            проявления.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div
              v-for="parzuf in parzufim"
              :key="parzuf.id"
              @click="showParzufDetail(parzuf)"
              class="p-3 rounded-lg cursor-pointer transition-all hover:bg-white/10"
              :class="{ 'bg-white/10': activeParzuf === parzuf.id }"
            >
              <h3 class="font-medium mb-1 flex items-center gap-2">
                <i :class="parzuf.icon" class="text-yellow-400"></i>
                {{ parzuf.name }}
              </h3>
              <p class="text-xs text-gray-400">{{ parzuf.description }}</p>
            </div>
          </div>

          <div
            v-if="activeParzufDetail"
            class="mt-4 p-4 bg-slate-800/50 rounded-lg"
          >
            <h3 class="font-semibold text-lg mb-2">
              {{ activeParzufDetail.name }}
            </h3>
            <p class="text-sm mb-3">
              {{ activeParzufDetail.detailedDescription }}
            </p>
            <div class="text-xs text-gray-400">
              <p>
                <span class="font-medium">Соответствующие сфирот:</span>
                {{ activeParzufDetail.relatedSefirot.join(", ") }}
              </p>
              <p>
                <span class="font-medium">Аспект:</span>
                {{ activeParzufDetail.aspect }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Modal for Sefirah Info -->
    <transition name="modal">
      <div
        v-if="selectedSefirah"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div
          class="bg-slate-800 rounded-xl max-w-md w-full p-6 relative shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto"
        >
          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 text-gray-400 hover:text-white"
            @click="closeModal"
          >
            <i class="fas fa-times"></i>
          </button>

          <!-- Modal Header -->
          <div class="flex items-start gap-3 mb-4">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              :style="{ backgroundColor: selectedSefirah.energyColor }"
            >
              <i
                :class="getSefirahIcon(selectedSefirah.id)"
                class="text-white"
              ></i>
            </div>
            <div>
              <h2 class="text-2xl font-semibold">
                {{ selectedSefirah.function }} ({{ selectedSefirah.name }})
              </h2>
              <p class="text-sm text-gray-400">{{ selectedSefirah.symbol }}</p>
            </div>
          </div>

          <!-- Toggle Tabs -->
          <div class="flex mb-4">
            <button
              class="flex-1 py-2 px-4 text-sm font-medium rounded-l-md transition-colors"
              :class="
                activeTab === 'psychological'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-gray-300'
              "
              @click="activeTab = 'psychological'"
            >
              Психологическое
            </button>
            <button
              class="flex-1 py-2 px-4 text-sm font-medium rounded-r-md transition-colors"
              :class="
                activeTab === 'kabbalistic'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-gray-300'
              "
              @click="activeTab = 'kabbalistic'"
            >
              Каббалистическое
            </button>
          </div>

          <!-- Tab Content -->
          <div class="text-gray-300 text-sm leading-relaxed">
            <div v-if="activeTab === 'psychological'">
              <h3 class="text-lg font-medium text-white mb-2">
                Психологическое значение
              </h3>
              <p class="font-bold italic mb-2">
                *{{ selectedSefirah.association }}*
              </p>
              <p class="mb-4">{{ selectedSefirah.psychologicalMeaning }}</p>

              <div
                v-if="selectedSefirah.psychologicalExercise"
                class="bg-slate-700/50 p-3 rounded-lg mt-4"
              >
                <h4 class="font-medium text-white mb-2">
                  Упражнение для развития:
                </h4>
                <p>{{ selectedSefirah.psychologicalExercise }}</p>
              </div>
            </div>
            <div v-else>
              <h3 class="text-lg font-medium text-white mb-2">
                Каббалистическое значение
              </h3>
              <p class="font-bold italic mb-2">
                *{{ selectedSefirah.association }}*
              </p>
              <p class="mb-4">{{ selectedSefirah.kabbalisticMeaning }}</p>

              <div class="grid grid-cols-2 gap-3 text-xs mt-4">
                <div>
                  <p class="text-gray-400">Архетип:</p>
                  <p class="font-medium">
                    {{ selectedSefirah.archetype || "—" }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-400">Стихия:</p>
                  <p class="font-medium">
                    {{ selectedSefirah.element || "—" }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-400">Планета:</p>
                  <p class="font-medium">{{ selectedSefirah.planet || "—" }}</p>
                </div>
                <div>
                  <p class="text-gray-400">Цвет:</p>
                  <p class="font-medium">
                    {{ selectedSefirah.colorName || "—" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Sefirot Data with enhanced information
const sefirot = ref([
  {
    id: "keter",
    name: "Кетер",
    function: "Высшее Я",
    symbol: "Корона",
    energyColor: "#FFD700",
    colorName: "Золотой",
    association: "Чистое намерение",
    archetype: "Царь/Мудрец",
    element: "Дух",
    planet: "Нептун",
    x: 200,
    y: 67,
    column: "center",
    psychologicalMeaning:
      "Кетер представляет ваше истинное 'Я', центр вашей идентичности и высший потенциал. Это точка интеграции всех аспектов личности, где вы соединяетесь с вашей жизненной целью.",
    kabbalisticMeaning:
      "В каббале Кетер — это 'Корона', первая сфира, представляющая божественную волю и источник всего творения. Это чистый свет, из которого исходят все остальные сфирот.",
    psychologicalExercise:
      "Медитация на высшее предназначение. Задавайте себе вопросы: 'Кто я на самом деле?', 'В чем моя истинная цель?'",
  },
  {
    id: "chokhmah",
    name: "Хохма",
    function: "Ясность",
    symbol: "Око/искра",
    energyColor: "#C0C0C0",
    colorName: "Серебристо-белый",
    association: "Интуитивное озарение",
    archetype: "Отец",
    element: "Огонь",
    planet: "Уран",
    x: 133,
    y: 160,
    column: "right",
    psychologicalMeaning:
      "Хохма символизирует интуитивное прозрение и ясность мышления. Это способность видеть суть вещей и находить новые идеи через вдохновение.",
    kabbalisticMeaning:
      "Хохма — это 'Мудрость', искра божественного вдохновения. Она представляет начальную точку творческого процесса, где рождаются идеи.",
    psychologicalExercise:
      "Развитие интуиции через ведение дневника озарений. Записывайте внезапные прозрения и проверяйте их точность со временем.",
  },
  {
    id: "binah",
    name: "Бина",
    function: "Эм. осознанность",
    symbol: "Кубок",
    energyColor: "#0000FF",
    colorName: "Синий",
    association: "Мудрое понимание",
    archetype: "Мать",
    element: "Вода",
    planet: "Сатурн",
    x: 267,
    y: 160,
    column: "left",
    psychologicalMeaning:
      "Бина отвечает за эмоциональную осознанность и понимание своих чувств. Это способность анализировать эмоции и использовать их для роста.",
    kabbalisticMeaning:
      "Бина — это 'Понимание', сфира, которая структурирует мудрость Хохмы. Она символизирует женский аспект божественного, формирующий идеи в реальность.",
    psychologicalExercise:
      "Анализ эмоций через ведение эмоционального дневника. Записывайте ситуации, свои реакции и скрытые причины этих реакций.",
  },
  {
    id: "chesed",
    name: "Хесед",
    function: "Связь",
    symbol: "Раскрытая ладонь",
    energyColor: "#00B7EB",
    colorName: "Голубой",
    association: "Безусловная любовь",
    archetype: "Благодетель",
    element: "Вода",
    planet: "Юпитер",
    x: 107,
    y: 267,
    column: "right",
    psychologicalMeaning:
      "Хесед отражает сострадание, щедрость и способность строить глубокие связи с другими. Это энергия любви и поддержки.",
    kabbalisticMeaning:
      "Хесед — это 'Милосердие', сфира безусловной любви и щедрости. Она представляет божественное стремление к распространению добра.",
    psychologicalExercise:
      "Практика бескорыстной помощи. Раз в неделю совершайте добрый поступок без ожидания благодарности.",
  },
  {
    id: "gevurah",
    name: "Гвура",
    function: "Структура",
    symbol: "Меч",
    energyColor: "#FF0000",
    colorName: "Красный",
    association: "Сила воли",
    archetype: "Воин",
    element: "Огонь",
    planet: "Марс",
    x: 293,
    y: 267,
    column: "left",
    psychologicalMeaning:
      "Гвура символизирует дисциплину, силу и способность устанавливать границы. Это умение направлять энергию в конкретные действия.",
    kabbalisticMeaning:
      "Гвура — это 'Сила' или 'Суд', сфира, которая ограничивает и структурирует милосердие Хеседа. Она представляет божественную строгость.",
    psychologicalExercise:
      "Установление здоровых границ. Определите одну сферу жизни, где вам нужно установить четкие границы, и реализуйте это.",
  },
  {
    id: "tiferet",
    name: "Тиферет",
    function: "Интеграция",
    symbol: "Сердце",
    energyColor: "#FFD755",
    colorName: "Золотистый",
    association: "Красота в балансе",
    archetype: "Царь",
    element: "Воздух",
    planet: "Солнце",
    x: 200,
    y: 347,
    column: "center",
    psychologicalMeaning:
      "Тиферет — это гармония и баланс, центр, где интегрируются эмоции, мысли и действия. Это ваше внутреннее равновесие.",
    kabbalisticMeaning:
      "Тиферет — это 'Красота', сфира, которая объединяет Хесед и Гвуру. Она символизирует божественную гармонию и сострадание.",
    psychologicalExercise:
      "Практика баланса. Ведите дневник, отмечая моменты гармонии и дисбаланса в вашей жизни, и анализируйте причины.",
  },
  {
    id: "netzach",
    name: "Нецах",
    function: "Мотивация",
    symbol: "Факел",
    energyColor: "#008000",
    colorName: "Зеленый",
    association: "Устремлённость",
    archetype: "Победитель",
    element: "Огонь",
    planet: "Венера",
    x: 133,
    y: 373,
    column: "right",
    psychologicalMeaning:
      "Нецах представляет стойкость, мотивацию и стремление к достижению целей. Это энергия, которая движет вас вперед.",
    kabbalisticMeaning:
      "Нецах — это 'Победа', сфира вечности и выносливости. Она отражает божественную способность преодолевать препятствия.",
    psychologicalExercise:
      "Постановка и достижение небольших целей. Каждый день ставьте одну конкретную цель и фиксируйте её выполнение.",
  },
  {
    id: "hod",
    name: "Ход",
    function: "Перспектива",
    symbol: "Лотос",
    energyColor: "#FFA500",
    colorName: "Оранжевый",
    association: "Смирение и принятие",
    archetype: "Посланник",
    element: "Воздух",
    planet: "Меркурий",
    x: 267,
    y: 373,
    column: "left",
    psychologicalMeaning:
      "Ход символизирует рефлексию, способность видеть вещи с разных сторон и учиться через знания и опыт.",
    kabbalisticMeaning:
      "Ход — это 'Слава', сфира, которая отвечает за восприятие и передачу божественного света через структуру и порядок.",
    psychologicalExercise:
      "Практика многогранного восприятия. Анализируйте важные события с трех разных точек зрения: своей, другого участника и нейтрального наблюдателя.",
  },
  {
    id: "yesod",
    name: "Йесод",
    function: "Рутина",
    symbol: "Луна",
    energyColor: "#800080",
    colorName: "Фиолетовый",
    association: "Канал связи",
    archetype: "Маг",
    element: "Эфир",
    planet: "Луна",
    x: 200,
    y: 453,
    column: "center",
    psychologicalMeaning:
      "Йесод — это фундамент вашей жизни, привычки и рутины, которые поддерживают ваш рост и стабильность.",
    kabbalisticMeaning:
      "Йесод — это 'Основа', сфира, которая соединяет все сфирот и передает их энергию в Малхут. Она символизирует связь с божественным.",
    psychologicalExercise:
      "Анализ и оптимизация привычек. В течение недели фиксируйте свои ежедневные рутины и отмечайте, какие из них поддерживают, а какие мешают вашим целям.",
  },
  {
    id: "malkhut",
    name: "Малхут",
    function: "Воплощение",
    symbol: "Земля",
    energyColor: "#3C2F2F",
    colorName: "Земляной",
    association: "Материальное проявление",
    archetype: "Царица",
    element: "Земля",
    planet: "Земля",
    x: 200,
    y: 533,
    column: "center",
    psychologicalMeaning:
      "Малхут представляет реализацию ваших идей и действий в физическом мире. Это ваша способность воплощать мечты в реальность.",
    kabbalisticMeaning:
      "Малхут — это 'Царство', сфира, которая принимает божественный свет и проявляет его в материальном мире. Это завершение творения.",
    psychologicalExercise:
      "Практика материализации идей. Каждую неделю выбирайте одну идею и предпринимайте конкретные шаги для её реализации в физическом мире.",
  },
]);

// Connections Data
const connections = [
  { x1: 200, y1: 67, x2: 133, y2: 160, column: "right" }, // Keter to Chokhmah
  { x1: 200, y1: 67, x2: 267, y2: 160, column: "left" }, // Keter to Binah
  { x1: 133, y1: 160, x2: 107, y2: 267, column: "right" }, // Chokhmah to Chesed
  { x1: 267, y1: 160, x2: 293, y2: 267, column: "left" }, // Binah to Gevurah
  { x1: 107, y1: 267, x2: 200, y2: 347, column: "center" }, // Chesed to Tiferet
  { x1: 293, y1: 267, x2: 200, y2: 347, column: "center" }, // Gevurah to Tiferet
  { x1: 107, y1: 267, x2: 133, y2: 373, column: "right" }, // Chesed to Netzach
  { x1: 293, y1: 267, x2: 267, y2: 373, column: "left" }, // Gevurah to Hod
  { x1: 133, y1: 373, x2: 200, y2: 453, column: "center" }, // Netzach to Yesod
  { x1: 267, y1: 373, x2: 200, y2: 453, column: "center" }, // Hod to Yesod
  { x1: 200, y1: 453, x2: 200, y2: 533, column: "center" }, // Yesod to Malkhut
];

// Parzufim Data
const parzufim = [
  {
    id: "arik-anpin",
    name: "Арик Анпин",
    icon: "fa-user-tie",
    description: "Длинный Лик, высшая милость",
    detailedDescription:
      "Арик Анпин (Длинный Лик) представляет аспект бесконечного терпения и милосердия в божественном. Это высшая форма прощения и всеобъемлющей любви, которая предшествует процессу суда.",
    relatedSefirot: ["Кетер", "Хохма", "Бина"],
    aspect: "Бесконечное милосердие",
  },
  {
    id: "abba-ve-imma",
    name: "Абба ве-Имма",
    icon: "fa-people-arrows",
    description: "Отец и Мать, мужское и женское",
    detailedDescription:
      "Абба (Отец) и Имма (Мать) представляют мужской и женский аспекты божественного. Хохма (Отец) - активный принцип, дающий семя творения, Бина (Мать) - принимающий принцип, формирующий творение.",
    relatedSefirot: ["Хохма", "Бина"],
    aspect: "Божественная полярность",
  },
  {
    id: "zeir-anpin",
    name: "Зеир Анпин",
    icon: "fa-user",
    description: "Малый Лик, 6 нижних сфирот",
    detailedDescription:
      "Зеир Анпин (Малый Лик) объединяет шесть эмоциональных сфирот от Хеседа до Йесода. Он представляет аспект божественного, который взаимодействует с миром через эмоции и суд.",
    relatedSefirot: ["Хесед", "Гвура", "Тиферет", "Нецах", "Ход", "Йесод"],
    aspect: "Эмоциональный интеллект",
  },
  {
    id: "nukva",
    name: "Нуква",
    icon: "fa-user-alt",
    description: "Женский аспект, невеста",
    detailedDescription:
      "Нуква (Женский аспект) представляет Малхут, которая получает свет от всех вышестоящих сфирот. Она символизирует Шхину - божественное присутствие в мире.",
    relatedSefirot: ["Малхут"],
    aspect: "Божественное присутствие",
  },
];

// Modal State
const selectedSefirah = ref(null);
const activeTab = ref("psychological");
const hoveredNode = ref(null);
const activeLine = ref(null);
const activeParzuf = ref(null);
const activeParzufDetail = ref(null);

// Modal Functions
const openModal = (sefirah) => {
  selectedSefirah.value = sefirah;
  activeTab.value = "psychological";
};

const closeModal = () => {
  selectedSefirah.value = null;
};

// Line Highlight Functions
const highlightLine = (line) => {
  activeLine.value = line;
};

const resetHighlight = () => {
  activeLine.value = null;
};

const isLineActive = (column) => {
  return activeLine.value === column;
};

const isNodeActive = (column) => {
  return !activeLine.value || activeLine.value === column;
};

// Parzufim Functions
const showParzufDetail = (parzuf) => {
  activeParzuf.value = parzuf.id;
  activeParzufDetail.value = parzuf;
};

// Styling Functions
const getNodeGlowClass = (column) => {
  switch (column) {
    case "left":
      return "fill-blue-400";
    case "right":
      return "fill-yellow-400";
    case "center":
      return "fill-green-400";
    default:
      return "fill-white";
  }
};

const getGlowFilter = (column) => {
  switch (column) {
    case "left":
      return "url(#glow-left)";
    case "right":
      return "url(#glow-right)";
    case "center":
      return "url(#glow-center)";
    default:
      return "url(#glow)";
  }
};

const getConnectionStroke = (column) => {
  switch (column) {
    case "left":
      return "#3b82f6";
    case "right":
      return "#eab308";
    case "center":
      return "#22c55e";
    default:
      return "#4B5563";
  }
};

const getSefirahIcon = (id) => {
  const icons = {
    keter: "fa-crown",
    chokhmah: "fa-eye",
    binah: "fa-trophy",
    chesed: "fa-hand-holding-heart",
    gevurah: "fa-gavel",
    tiferet: "fa-heart",
    netzach: "fa-fire",
    hod: "fa-spa",
    yesod: "fa-moon",
    malkhut: "fa-globe",
  };
  return icons[id] || "fa-circle";
};

const getLabelX = (sefirah) => {
  if (sefirah.x < 160) return sefirah.x - 35;
  if (sefirah.x > 240) return sefirah.x + 35;
  return sefirah.x;
};
</script>

<style scoped>
.node-circle {
  transition: r 0.3s ease, filter 0.3s ease, stroke-width 0.3s ease;
}
.node-circle:hover {
  filter: brightness(1.2);
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .bg-slate-800,
.modal-leave-active .bg-slate-800 {
  transition: transform 0.3s ease;
}
.modal-enter-from .bg-slate-800,
.modal-leave-to .bg-slate-800 {
  transform: scale(0.95);
}

/* Responsive SVG Text */
svg text {
  fill: currentColor;
  font-size: 10px;
  transition: opacity 0.3s ease;
}
@media (min-width: 768px) {
  svg text {
    font-size: 12px;
  }
}

/* Ensure SVG is interactive */
svg {
  pointer-events: bounding-box;
}
.connections {
  z-index: 1;
}

/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
