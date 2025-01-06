<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
    <div class="lg:col-span-2 space-y-8">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <h2 class="text-xl font-bold text-gray-800">
            <i class="fas fa-brain text-pink-600 mr-2"></i>
            Психологический профиль
          </h2>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex-1 sm:flex-initial px-3 py-1 rounded-lg text-sm transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>

        <!-- Rest of the code remains the same -->
        <!-- Archetypes Section -->
        <div v-if="activeTab === 'archetypes'" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="archetype in archetypes"
              :key="archetype.name"
              class="bg-gray-50 rounded-lg p-6 flex items-center gap-4"
            >
              <div
                :class="[
                  'w-16 h-16 rounded-full flex items-center justify-center',
                  `bg-${archetype.color}-100`,
                ]"
              >
                <i
                  :class="[
                    'fas',
                    archetype.icon,
                    `text-${archetype.color}-600 text-2xl`,
                  ]"
                ></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">
                  {{ archetype.name }}
                </h3>
                <div class="flex items-center mt-2">
                  <div class="h-2 bg-gray-200 rounded-full w-32">
                    <div
                      class="h-2 rounded-full bg-pink-600"
                      :style="{ width: `${archetype.level}%` }"
                    ></div>
                  </div>
                  <span class="ml-2 text-sm text-gray-600"
                    >{{ archetype.level }}%</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Big Five Section -->
        <div v-if="activeTab === 'bigFive'" class="space-y-6">
          <div
            v-for="trait in bigFiveTraits"
            :key="trait.name"
            class="space-y-2"
          >
            <div class="flex justify-between items-center">
              <span class="text-gray-700 font-medium">{{ trait.name }}</span>
              <span class="text-sm text-gray-600">{{ trait.value }}%</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full">
              <div
                class="h-2 rounded-full"
                :class="`bg-${trait.color}-600`"
                :style="{ width: `${trait.value}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Cognitive Styles Section -->
        <div v-if="activeTab === 'cognitive'" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="style in cognitiveStyles"
              :key="style.name"
              class="bg-gray-50 rounded-lg p-6"
            >
              <h3 class="font-semibold text-gray-800 mb-2">
                {{ style.name }}
              </h3>
              <p class="text-sm text-gray-600 mb-4">
                {{ style.description }}
              </p>
              <div class="flex items-center gap-2">
                <i :class="['fas', style.icon, 'text-pink-600']"></i>
                <span class="text-sm font-medium">{{ style.level }}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar Stats -->
    <div class="space-y-8">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-xl font-bold text-gray-800 mb-6">
          <i class="fas fa-chart-line text-pink-600 mr-2"></i>
          Развитие личности
        </h2>
        <div class="space-y-4">
          <div
            v-for="stat in personalStats"
            :key="stat.name"
            class="flex items-center justify-between"
          >
            <span class="text-gray-700">{{ stat.name }}</span>
            <span class="font-semibold text-gray-900">{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref("archetypes");

const tabs = [
  { id: "archetypes", name: "Архетипы" },
  { id: "bigFive", name: "Big Five" },
  { id: "cognitive", name: "Когнитивные стили" },
];

const archetypes = [
  { name: "Герой", level: 75, color: "pink", icon: "fa-shield-alt" },
  { name: "Мудрец", level: 60, color: "blue", icon: "fa-book" },
  { name: "Творец", level: 85, color: "purple", icon: "fa-paint-brush" },
  { name: "Искатель", level: 70, color: "green", icon: "fa-compass" },
];

const bigFiveTraits = [
  { name: "Открытость новому", value: 78, color: "pink" },
  { name: "Добросовестность", value: 65, color: "blue" },
  { name: "Экстраверсия", value: 82, color: "green" },
  { name: "Доброжелательность", value: 70, color: "purple" },
  { name: "Нейротизм", value: 45, color: "yellow" },
];

const cognitiveStyles = [
  {
    name: "Логическое мышление",
    description: "Способность к анализу и структурированию информации",
    level: 8,
    icon: "fa-brain",
  },
  {
    name: "Креативность",
    description: "Способность находить нестандартные решения",
    level: 7,
    icon: "fa-lightbulb",
  },
  {
    name: "Интуиция",
    description: "Развитость внутреннего чутья",
    level: 9,
    icon: "fa-eye",
  },
  {
    name: "Эмпатия",
    description: "Понимание эмоций других людей",
    level: 6,
    icon: "fa-heart",
  },
];

const personalStats = [
  { name: "Уровень осознанности", value: "7/10" },
  { name: "Эмоциональный интеллект", value: "75%" },
  { name: "Стрессоустойчивость", value: "8/10" },
  { name: "Адаптивность", value: "82%" },
];
</script>
