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

        <!-- Column Balance & Energy of the Day -->
        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Column Balance Gauge -->
          <div
            class="bg-white/5 backdrop-blur rounded-xl p-4 shadow-xl border border-white/10"
          >
            <h3 class="text-lg font-semibold text-white mb-2">Баланс колонн</h3>
            <div class="flex items-center space-x-4 mb-2">
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-xs text-gold-300">Правая (Огонь)</span>
                  <span class="text-xs text-gold-300"
                    >{{ Math.round(columnProgress.right) }}%</span
                  >
                </div>
                <div class="w-full bg-black/30 rounded-full h-2">
                  <div
                    class="h-2 rounded-full bg-gradient-to-r from-gold-500/70 to-gold-300"
                    :style="{ width: `${columnProgress.right}%` }"
                  ></div>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-xs text-blue-300">Левая (Вода)</span>
                  <span class="text-xs text-blue-300"
                    >{{ Math.round(columnProgress.left) }}%</span
                  >
                </div>
                <div class="w-full bg-black/30 rounded-full h-2">
                  <div
                    class="h-2 rounded-full bg-gradient-to-r from-blue-500/70 to-blue-300"
                    :style="{ width: `${columnProgress.left}%` }"
                  ></div>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-xs text-green-300">Центр (Воздух)</span>
                  <span class="text-xs text-green-300"
                    >{{ Math.round(columnProgress.center) }}%</span
                  >
                </div>
                <div class="w-full bg-black/30 rounded-full h-2">
                  <div
                    class="h-2 rounded-full bg-gradient-to-r from-green-500/70 to-green-300"
                    :style="{ width: `${columnProgress.center}%` }"
                  ></div>
                </div>
              </div>
            </div>
            <p class="text-xs text-white/80 mt-1">
              <span class="font-medium">Рекомендация:</span>
              {{ columnRecommendation }}
            </p>
          </div>

          <!-- Energy of the Day -->
          <div
            class="bg-white/5 backdrop-blur rounded-xl p-4 shadow-xl border border-white/10"
          >
            <h3 class="text-lg font-semibold text-white mb-2">Энергия дня</h3>
            <div class="grid grid-cols-3 gap-2 mb-3">
              <button
                @click="selectEnergyColumn('right')"
                class="py-2 px-3 rounded-lg text-sm font-medium transition-all"
                :class="
                  energyOfDay === 'right'
                    ? 'bg-gold-500/30 text-gold-200 border border-gold-400/50'
                    : 'bg-black/20 text-white/70 border border-white/10 hover:bg-white/10'
                "
              >
                <i class="fas fa-fire mr-1"></i> Огонь
              </button>
              <button
                @click="selectEnergyColumn('left')"
                class="py-2 px-3 rounded-lg text-sm font-medium transition-all"
                :class="
                  energyOfDay === 'left'
                    ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                    : 'bg-black/20 text-white/70 border border-white/10 hover:bg-white/10'
                "
              >
                <i class="fas fa-water mr-1"></i> Вода
              </button>
              <button
                @click="selectEnergyColumn('center')"
                class="py-2 px-3 rounded-lg text-sm font-medium transition-all"
                :class="
                  energyOfDay === 'center'
                    ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                    : 'bg-black/20 text-white/70 border border-white/10 hover:bg-white/10'
                "
              >
                <i class="fas fa-wind mr-1"></i> Воздух
              </button>
            </div>
            <p class="text-xs text-white/80">
              {{ energyRecommendation }}
            </p>
          </div>
        </div>

        <!-- Cycle Toggle -->
        <div class="mb-4 flex justify-between items-center">
          <div class="flex items-center">
            <label class="inline-flex items-center cursor-pointer mr-4">
              <input
                type="checkbox"
                v-model="pathOfWholeness"
                class="sr-only peer"
              />
              <div
                class="relative w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-gold-600 peer-checked:to-gold-400"
              ></div>
              <span class="ml-2 text-sm font-medium text-white/80"
                >Путь Целостности</span
              >
            </label>
            <p v-if="pathOfWholeness" class="text-sm text-gold-300">
              <i class="fas fa-sun mr-1"></i> Неделя {{ currentWeek }}:
              {{ getCurrentSefirahName() }}
            </p>
          </div>
          <nuxt-link
            to="/community/leaderboard"
            class="text-sm flex items-center text-white/80 hover:text-white"
          >
            <i class="fas fa-trophy mr-1 text-gold-300"></i> Таблица лидеров
          </nuxt-link>
        </div>

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
                  <!-- Background gradient -->
                  <linearGradient
                    id="svg-bg"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="rgba(15, 23, 42, 0.8)" />
                    <stop offset="100%" stop-color="rgba(15, 23, 42, 0.9)" />
                  </linearGradient>

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

                  <!-- Gold glow filter for Path of Wholeness -->
                  <filter
                    id="gold-glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0.8 0 1 0 0 0.7 0 0 1 0 0.1 0 0 0 1 0"
                      result="glow"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="glow"
                      operator="over"
                    />
                  </filter>

                  <!-- Column-specific pulse filters -->
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

                  <!-- Left column pulse (blue/water) -->
                  <filter
                    id="pulse-left"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0 0 0.4 0 0 0.9 0.8 0 0 0 1 0 0 0 0.7 0"
                      result="glow"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="glow"
                      operator="over"
                    />
                  </filter>

                  <!-- Right column pulse (gold/fire) -->
                  <filter
                    id="pulse-right"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0.8 0.7 0.5 0 0 0 0 0 0 0 0 0 0 0 0.7 0"
                      result="glow"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="glow"
                      operator="over"
                    />
                  </filter>

                  <!-- Center column pulse (green/air) -->
                  <filter
                    id="pulse-center"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0.3 0.8 0 0 0 0.2 1 0 0 0 0.3 0.5 0 0 0 0 0 0 0.7 0"
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

                  <!-- Golden light beam (descending light) -->
                  <linearGradient id="golden-light" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="rgba(255,215,0,0.9)" />
                    <stop offset="50%" stop-color="rgba(255,215,0,0.4)" />
                    <stop offset="100%" stop-color="rgba(255,215,0,0.1)" />
                  </linearGradient>

                  <!-- Column-specific gradients -->
                  <linearGradient
                    id="left-column-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stop-color="rgba(59,130,246,0.7)" />
                    <stop offset="100%" stop-color="rgba(147,197,253,0.7)" />
                  </linearGradient>

                  <linearGradient
                    id="right-column-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stop-color="rgba(234,179,8,0.7)" />
                    <stop offset="100%" stop-color="rgba(250,204,21,0.7)" />
                  </linearGradient>

                  <linearGradient
                    id="center-column-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stop-color="rgba(34,197,94,0.7)" />
                    <stop offset="100%" stop-color="rgba(74,222,128,0.7)" />
                  </linearGradient>
                </defs>

                <!-- Descending Light Animation (for Path of Wholeness) -->
                <g v-if="pathOfWholeness">
                  <line
                    x1="200"
                    y1="50"
                    x2="200"
                    y2="550"
                    stroke="url(#golden-light)"
                    stroke-width="4"
                    stroke-opacity="0.8"
                    filter="url(#gold-glow)"
                    class="descending-light"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      values="0,1000;1000,0"
                      dur="15s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-1000"
                      dur="15s"
                      repeatCount="indefinite"
                    />
                  </line>
                </g>

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
                      :class="[
                        { 'active-path': conn.active },
                        getConnectionColumnClass(conn.from, conn.to),
                      ]"
                      :stroke-dasharray="conn.active ? '5,5' : '2,3'"
                    />
                    <circle
                      v-if="conn.active"
                      :class="
                        getConnectionParticleClass(
                          conn.columnType || conn.category
                        )
                      "
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
                  <!-- Path of Wholeness highlight -->
                  <circle
                    v-if="pathOfWholeness && isCurrentWeekSefirah(sefirah.id)"
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    r="25"
                    class="fill-gold-500/20"
                    filter="url(#gold-glow)"
                  >
                    <animate
                      attributeName="r"
                      values="25;30;25"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0.7;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <!-- Outer glow ring -->
                  <circle
                    v-if="sefirah.progress > 0"
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    r="18"
                    :class="getNodeGlowClass(sefirah.id, sefirah.column)"
                    opacity="0.4"
                    filter="url(#glow)"
                  />

                  <!-- Pulse effect on hover -->
                  <circle
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    r="18"
                    class="node-pulse"
                    :class="getNodePulseClass(sefirah.category, sefirah.column)"
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
                      getNodeClass(
                        sefirah.id,
                        sefirah.displayProgress,
                        sefirah.column
                      ),
                      'node-circle',
                      {
                        'highlight-node':
                          highlightedCategory === sefirah.category ||
                          energyOfDay === sefirah.column,
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
                      {{ sefirah.function }}: {{ sefirah.displayProgress }}%
                      (Уровень {{ sefirah.level }})
                    </title>
                    <animate
                      v-if="sefirah.displayProgress > 0"
                      attributeName="opacity"
                      values="0.9;1;0.9"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <!-- Progress ring -->
                  <circle
                    v-if="sefirah.displayProgress > 0"
                    :cx="sefirah.x"
                    :cy="sefirah.y"
                    r="15"
                    :stroke="getNodeStrokeColor(sefirah.id, sefirah.column)"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                    :stroke-dasharray="`${sefirah.displayProgress * 0.94}, 100`"
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
                      getIconClass(
                        sefirah.category,
                        sefirah.displayProgress,
                        sefirah.column
                      ),
                    ]"
                    style="pointer-events: none"
                  >
                    <tspan
                      v-if="sefirah.category === 'wisdom'"
                      class="fa"
                    ></tspan>
                    <tspan
                      v-else-if="sefirah.category === 'emotions'"
                      class="fa"
                    ></tspan>
                    <tspan
                      v-else-if="sefirah.category === 'action'"
                      class="fa"
                    ></tspan>
                    <tspan
                      v-else-if="sefirah.category === 'integration'"
                      class="fa"
                    ></tspan>
                  </text>

                  <!-- Level indicator -->
                  <text
                    v-if="sefirah.level > 1"
                    :x="sefirah.x + 20"
                    :y="sefirah.y - 15"
                    class="text-xs font-semibold"
                    :fill="getLevelColor(sefirah.column)"
                    text-anchor="middle"
                    dominant-baseline="middle"
                  >
                    {{ sefirah.level }}
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
                  :x="activeTooltip.x - 80"
                  :y="activeTooltip.y"
                  width="160"
                  height="90"
                  class="tooltip-container"
                >
                  <div
                    class="bg-black/80 backdrop-blur-sm p-2 rounded text-white text-xs border border-white/20"
                  >
                    <div class="flex justify-between items-center">
                      <p class="font-medium">{{ activeTooltip.function }}</p>
                      <span
                        class="px-1.5 py-0.5 rounded text-[10px] font-medium"
                        :class="getTooltipLevelClass(activeTooltip.column)"
                      >
                        Ур. {{ activeTooltip.level }}
                      </span>
                    </div>
                    <p class="text-gray-300">{{ activeTooltip.name }}</p>
                    <div class="w-full bg-gray-800/50 rounded-full h-1 mt-1">
                      <div
                        class="h-1 rounded-full"
                        :class="
                          getProgressBarClass(
                            activeTooltip.id,
                            activeTooltip.column
                          )
                        "
                        :style="{ width: `${activeTooltip.displayProgress}%` }"
                      ></div>
                    </div>
                    <div class="flex justify-between mt-1">
                      <span class="text-[10px] text-gray-400"
                        >{{ activeTooltip.points }} очков</span
                      >
                      <span class="text-[10px] text-gray-400"
                        >{{ activeTooltip.dailyActions }}/{{
                          activeTooltip.maxActions
                        }}
                        сегодня</span
                      >
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
                :class="getCardProgressClass(sefirah.id, sefirah.column)"
              >
                {{ sefirah.displayProgress }}%
              </div>
            </div>

            <div class="flex items-center mb-2">
              <span
                class="px-2 py-0.5 rounded-full text-xs font-medium"
                :class="getLevelBadgeClass(sefirah.column)"
              >
                Уровень {{ sefirah.level }}
              </span>
              <span class="text-xs text-gray-400 ml-2">
                {{ sefirah.points }} очков
              </span>
            </div>

            <p class="text-gray-300 text-sm mb-2">{{ sefirah.function }}</p>
            <p class="text-gray-400 text-sm mb-4">{{ sefirah.description }}</p>

            <div class="mb-4">
              <div class="flex justify-between text-xs text-gray-400 mb-1">
                <span>Прогресс</span>
                <span
                  >{{ sefirah.dailyActions }}/{{ sefirah.maxActions }} действий
                  сегодня</span
                >
              </div>
              <div class="w-full bg-gray-800/50 rounded-full h-1.5 mb-1">
                <div
                  class="h-1.5 rounded-full"
                  :class="getProgressBarClass(sefirah.id, sefirah.column)"
                  :style="{ width: `${sefirah.displayProgress}%` }"
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
import { doc, getDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";

// Auth and Firestore setup
const authStore = useAuthStore();
const firestore = useFirestore();
const isLoggedIn = computed(() => !!authStore.user);
const activeCard = ref(null);
const activeTooltip = ref(null);
const hoveredNode = ref(null);
const highlightedCategory = ref(null);
const pathOfWholeness = ref(false);
const energyOfDay = ref(null);
const currentWeek = ref(1);
const pathOrder = ref([
  "keter",
  "chokhmah",
  "binah",
  "chesed",
  "gevurah",
  "tiferet",
  "netzach",
  "hod",
  "yesod",
  "malkhut",
]);

// Column definitions
const columns = {
  left: { name: "Вода", color: "blue", sefirot: ["binah", "gevurah", "hod"] },
  right: {
    name: "Огонь",
    color: "gold",
    sefirot: ["chokhmah", "chesed", "netzach"],
  },
  center: {
    name: "Воздух",
    color: "green",
    sefirot: ["keter", "tiferet", "yesod", "malkhut"],
  },
};

// Sefirot Data Structure with column assignments
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "integration",
    column: "center",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "wisdom",
    column: "right",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "emotions",
    column: "left",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "emotions",
    column: "right",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "action",
    column: "left",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "integration",
    column: "center",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "action",
    column: "right",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "wisdom",
    column: "left",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "integration",
    column: "center",
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
    points: 0,
    level: 1,
    dailyActions: 0,
    maxActions: 3,
    displayProgress: 0,
    category: "action",
    column: "center",
    cta: { text: "Завершить задачу", link: "/awareness-tools" },
  },
]);

// Connection data with column types
const connections = computed(() => {
  return [
    {
      path: "M200 67 L133 160",
      active:
        sefirot.value.find((s) => s.id === "keter").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "chokhmah").displayProgress > 0,
      from: "keter",
      to: "chokhmah",
      columnType: "right",
    },
    {
      path: "M200 67 L267 160",
      active:
        sefirot.value.find((s) => s.id === "keter").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "binah").displayProgress > 0,
      from: "keter",
      to: "binah",
      columnType: "left",
    },
    {
      path: "M133 160 L107 267",
      active:
        sefirot.value.find((s) => s.id === "chokhmah").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "chesed").displayProgress > 0,
      from: "chokhmah",
      to: "chesed",
      columnType: "right",
    },
    {
      path: "M267 160 L293 267",
      active:
        sefirot.value.find((s) => s.id === "binah").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "gevurah").displayProgress > 0,
      from: "binah",
      to: "gevurah",
      columnType: "left",
    },
    {
      path: "M107 267 L200 347",
      active:
        sefirot.value.find((s) => s.id === "chesed").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "tiferet").displayProgress > 0,
      from: "chesed",
      to: "tiferet",
      columnType: "center",
    },
    {
      path: "M293 267 L200 347",
      active:
        sefirot.value.find((s) => s.id === "gevurah").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "tiferet").displayProgress > 0,
      from: "gevurah",
      to: "tiferet",
      columnType: "center",
    },
    {
      path: "M107 267 L133 373",
      active:
        sefirot.value.find((s) => s.id === "chesed").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "netzach").displayProgress > 0,
      from: "chesed",
      to: "netzach",
      columnType: "right",
    },
    {
      path: "M293 267 L267 373",
      active:
        sefirot.value.find((s) => s.id === "gevurah").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "hod").displayProgress > 0,
      from: "gevurah",
      to: "hod",
      columnType: "left",
    },
    {
      path: "M133 373 L200 453",
      active:
        sefirot.value.find((s) => s.id === "netzach").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "yesod").displayProgress > 0,
      from: "netzach",
      to: "yesod",
      columnType: "center",
    },
    {
      path: "M267 373 L200 453",
      active:
        sefirot.value.find((s) => s.id === "hod").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "yesod").displayProgress > 0,
      from: "hod",
      to: "yesod",
      columnType: "center",
    },
    {
      path: "M200 453 L200 533",
      active:
        sefirot.value.find((s) => s.id === "yesod").displayProgress > 0 &&
        sefirot.value.find((s) => s.id === "malkhut").displayProgress > 0,
      from: "yesod",
      to: "malkhut",
      columnType: "center",
    },
  ];
});

// Calculate column progress averages
const columnProgress = computed(() => {
  const result = {
    left: 0,
    right: 0,
    center: 0,
  };

  sefirot.value.forEach((sefirah) => {
    result[sefirah.column] += sefirah.displayProgress;
  });

  // Calculate averages
  result.left = Math.round(result.left / columns.left.sefirot.length);
  result.right = Math.round(result.right / columns.right.sefirot.length);
  result.center = Math.round(result.center / columns.center.sefirot.length);

  return result;
});

// Column recommendation
const columnRecommendation = computed(() => {
  const lowestColumn = Object.entries(columnProgress.value).reduce(
    (acc, [key, value]) => (value < acc.value ? { key, value } : acc),
    { key: "left", value: 100 }
  ).key;

  const sefirahNames = {
    left: "Бина",
    right: "Хохма",
    center: "Кетер",
  };

  return `Укрепите ${columns[lowestColumn].name}: ${sefirahNames[lowestColumn]}`;
});

// Energy of the day recommendation
const energyRecommendation = computed(() => {
  if (!energyOfDay.value) return "Выберите энергию дня для рекомендаций";

  const columnSefirot = sefirot.value.filter(
    (s) => s.column === energyOfDay.value
  );
  const lowestSefirah = columnSefirot.reduce(
    (lowest, current) =>
      current.displayProgress < lowest.displayProgress ? current : lowest,
    columnSefirot[0]
  );

  return `Сфокусируйтесь на ${lowestSefirah.function} (${lowestSefirah.name})`;
});

// Select energy column
const selectEnergyColumn = (column) => {
  energyOfDay.value = energyOfDay.value === column ? null : column;

  if (energyOfDay.value) {
    const columnSefirot = sefirot.value.filter(
      (s) => s.column === energyOfDay.value
    );
    const lowestSefirah = columnSefirot.reduce(
      (lowest, current) =>
        current.displayProgress < lowest.displayProgress ? current : current,
      columnSefirot[0]
    );

    scrollToSefirah(lowestSefirah.id);
  }
};

// Check if sefirah is current week's focus
const isCurrentWeekSefirah = (id) => {
  return pathOfWholeness.value && pathOrder.value[currentWeek.value - 1] === id;
};

// Get current sefirah name for Path of Wholeness
const getCurrentSefirahName = () => {
  const currentSefirahId = pathOrder.value[currentWeek.value - 1];
  const sefirah = sefirot.value.find((s) => s.id === currentSefirahId);
  return sefirah ? sefirah.name : "";
};

// Calculate level based on points
const calculateLevel = (points) => {
  if (points < 200) return 1;
  if (points < 400) return 2;
  if (points < 1000) return 3;
  if (points < 2000) return 4;
  return 5;
};

// Calculate display progress
const calculateDisplayProgress = (points, level) => {
  const levelThreshold = level * 200;
  const progress = Math.min((points / levelThreshold) * 100, 100);
  return Math.round(progress);
};

// Calculate daily progress
const calculateDailyProgress = (actions, maxActions) => {
  return Math.round((actions / maxActions) * 100);
};

// Apply decay to points
const applyDecay = (points, lastActive) => {
  if (!lastActive) return points;

  const daysInactive = Math.floor(
    (new Date() - lastActive.toDate()) / (1000 * 60 * 60 * 24)
  );
  if (daysInactive <= 7) return points;

  const decayDays = daysInactive - 7;
  let decayedPoints = points;

  for (let i = 0; i < decayDays; i++) {
    decayedPoints = Math.max(decayedPoints * 0.95, 10);
  }

  return Math.round(decayedPoints);
};

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

// Get connection column class
const getConnectionColumnClass = (fromId, toId) => {
  const fromSefirah = sefirot.value.find((s) => s.id === fromId);
  const toSefirah = sefirot.value.find((s) => s.id === toId);

  // If both are in same column, use that column's color
  if (fromSefirah.column === toSefirah.column) {
    return `path-${fromSefirah.column}`;
  }

  // Otherwise use a neutral color
  return "path-neutral";
};

// Get node pulse class
const getNodePulseClass = (category, column) => {
  if (column) {
    return `pulse-${column}`;
  }

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
const getConnectionParticleClass = (columnType) => {
  switch (columnType) {
    case "left":
      return "fill-blue-300";
    case "right":
      return "fill-gold-300";
    case "center":
      return "fill-green-300";
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

// Get ring color for active card
const getRingColor = (id) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "75, 85, 99";

  switch (sefirah.column) {
    case "left":
      return "59, 130, 246";
    case "right":
      return "234, 179, 8";
    case "center":
      return "34, 197, 94";
    default:
      return "75, 85, 99";
  }
};

const getIconClass = (category, progress, column) => {
  if (progress === 0) return "fill-gray-400";

  switch (column) {
    case "left":
      return "fill-blue-200";
    case "right":
      return "fill-gold-200";
    case "center":
      return "fill-green-200";
    default:
      return "fill-gray-400";
  }
};

// Styling functions
const getNodeClass = (id, progress, column) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "fill-gray-700";

  if (progress === 0) return "fill-gray-700 stroke-gray-500";

  switch (column) {
    case "left":
      return "fill-blue-600 stroke-blue-400";
    case "right":
      return "fill-gold-600 stroke-gold-400";
    case "center":
      return "fill-green-600 stroke-green-400";
    default:
      return "fill-gray-700 stroke-gray-500";
  }
};

const getNodeGlowClass = (id, column) => {
  switch (column) {
    case "left":
      return "fill-blue-400";
    case "right":
      return "fill-gold-400";
    case "center":
      return "fill-green-400";
    default:
      return "fill-white";
  }
};

const getNodeStrokeColor = (id, column) => {
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

const getProgressBarClass = (id, column) => {
  switch (column) {
    case "left":
      return "bg-gradient-to-r from-blue-500 to-blue-300";
    case "right":
      return "bg-gradient-to-r from-gold-500 to-gold-300";
    case "center":
      return "bg-gradient-to-r from-green-500 to-green-300";
    default:
      return "bg-gray-600";
  }
};

const getCardProgressClass = (id, column) => {
  const sefirah = sefirot.value.find((s) => s.id === id);
  if (!sefirah) return "bg-gray-800/50 text-gray-400";

  if (sefirah.displayProgress === 0) return "bg-gray-800/50 text-gray-400";

  switch (column) {
    case "left":
      return "bg-blue-500/20 text-blue-300";
    case "right":
      return "bg-gold-500/20 text-gold-300";
    case "center":
      return "bg-green-500/20 text-green-300";
    default:
      return "bg-gray-800/50 text-gray-400";
  }
};

const getLevelColor = (column) => {
  switch (column) {
    case "left":
      return "#93c5fd";
    case "right":
      return "#fcd34d";
    case "center":
      return "#86efac";
    default:
      return "#ffffff";
  }
};

const getLevelBadgeClass = (column) => {
  switch (column) {
    case "left":
      return "bg-blue-500/20 text-blue-300";
    case "right":
      return "bg-gold-500/20 text-gold-300";
    case "center":
      return "bg-green-500/20 text-green-300";
    default:
      return "bg-gray-800/50 text-gray-400";
  }
};

const getTooltipLevelClass = (column) => {
  switch (column) {
    case "left":
      return "bg-blue-500/30 text-blue-100";
    case "right":
      return "bg-gold-500/30 text-gold-100";
    case "center":
      return "bg-green-500/30 text-green-100";
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

// Fetch User Progress from Firebase
const fetchSefirotProgress = async (userId) => {
  try {
    // Get progress data
    const progressRef = doc(firestore, `users/${userId}/progress/sefirot`);
    const progressSnap = await getDoc(progressRef);

    if (progressSnap.exists()) {
      const progressData = progressSnap.data();

      // Update sefirot with points and calculate levels
      sefirot.value.forEach((sefirah) => {
        if (progressData[sefirah.id]) {
          const points = applyDecay(
            progressData[sefirah.id].points || 0,
            progressData[sefirah.id].lastActive
          );

          const level = calculateLevel(points);
          const displayProgress = calculateDisplayProgress(points, level);

          sefirah.points = points;
          sefirah.level = level;
          sefirah.displayProgress = displayProgress;
          sefirah.lastActive = progressData[sefirah.id].lastActive;
        }
      });
    }

    // Get daily actions
    const today = new Date().toISOString().split("T")[0];
    const dailyRef = doc(firestore, `users/${userId}/daily/${today}`);
    const dailySnap = await getDoc(dailyRef);

    if (dailySnap.exists()) {
      const dailyData = dailySnap.data();
      sefirot.value.forEach((sefirah) => {
        sefirah.dailyActions = dailyData[sefirah.id]?.actions || 0;
        sefirah.progress = calculateDailyProgress(
          sefirah.dailyActions,
          sefirah.maxActions
        );
      });
    }

    // Set up real-time listener for progress updates
    onSnapshot(progressRef, (snap) => {
      if (snap.exists()) {
        const progressData = snap.data();
        sefirot.value.forEach((sefirah) => {
          if (progressData[sefirah.id]) {
            const points = applyDecay(
              progressData[sefirah.id].points || 0,
              progressData[sefirah.id].lastActive
            );

            const level = calculateLevel(points);
            const displayProgress = calculateDisplayProgress(points, level);

            sefirah.points = points;
            sefirah.level = level;
            sefirah.displayProgress = displayProgress;
            sefirah.lastActive = progressData[sefirah.id].lastActive;
          }
        });
      }
    });

    // Set up real-time listener for daily actions
    onSnapshot(dailyRef, (snap) => {
      if (snap.exists()) {
        const dailyData = snap.data();
        sefirot.value.forEach((sefirah) => {
          sefirah.dailyActions = dailyData[sefirah.id]?.actions || 0;
          sefirah.progress = calculateDailyProgress(
            sefirah.dailyActions,
            sefirah.maxActions
          );
        });
      }
    });
  } catch (error) {
    console.error("Error fetching Sefirot progress:", error);
    sefirot.value.forEach((s) => {
      if (typeof s.progress !== "number") s.progress = 0;
      if (typeof s.displayProgress !== "number") s.displayProgress = 0;
    });
  }
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
      s.displayProgress = demoData[index];
      s.points = demoData[index] * 10;
      s.level = calculateLevel(s.points);
      s.dailyActions = Math.floor(Math.random() * 4);
    });
  }

  // Set current week (1-10)
  currentWeek.value =
    (Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 1)) /
        (1000 * 60 * 60 * 24 * 7)
    ) %
      10) +
    1;
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

.path-left {
  stroke: rgba(59, 130, 246, 0.3);
}

.path-right {
  stroke: rgba(234, 179, 8, 0.3);
}

.path-center {
  stroke: rgba(34, 197, 94, 0.3);
}

.path-neutral {
  stroke: rgba(255, 255, 255, 0.15);
}

.active-path {
  stroke-dasharray: 5, 5;
  stroke-width: 2;
}

.path-left.active-path {
  stroke: rgba(59, 130, 246, 0.6);
}

.path-right.active-path {
  stroke: rgba(234, 179, 8, 0.6);
}

.path-center.active-path {
  stroke: rgba(34, 197, 94, 0.6);
}

.path-neutral.active-path {
  stroke: rgba(255, 255, 255, 0.3);
}

.fill-blue-200 {
  fill: #bfdbfe;
}

.fill-gold-200 {
  fill: #fde68a;
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

.fill-gold-600 {
  fill: #d97706;
}

.stroke-gold-400 {
  stroke: #fbbf24;
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

/* Column colors */
.text-blue-300 {
  color: #93c5fd;
}

.text-gold-300 {
  color: #fcd34d;
}

.text-green-300 {
  color: #86efac;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.bg-gold-500 {
  background-color: #eab308;
}

.bg-green-500 {
  background-color: #22c55e;
}

.from-blue-500 {
  --tw-gradient-from: #3b82f6;
}

.to-blue-300 {
  --tw-gradient-to: #93c5fd;
}

.from-gold-500 {
  --tw-gradient-from: #eab308;
}

.to-gold-300 {
  --tw-gradient-to: #fcd34d;
}

.from-green-500 {
  --tw-gradient-from: #22c55e;
}

.to-green-300 {
  --tw-gradient-to: #86efac;
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
.pulse-blue,
.pulse-left {
  filter: url(#pulse-blue);
}

.pulse-right {
  filter: url(#pulse-right);
}

.pulse-center {
  filter: url(#pulse-center);
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

/* Descending light animation */
.descending-light {
  animation: lightFlow 15s linear infinite;
}

@keyframes lightFlow {
  0% {
    stroke-dasharray: 0, 1000;
  }
  100% {
    stroke-dasharray: 1000, 0;
  }
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
