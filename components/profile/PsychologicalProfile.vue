<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-8">
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
      >
        <!-- Title and Tabs -->
        <div class="flex flex-col justify-between mb-6">
          <h2 class="text-xl font-bold text-white/90 text-left mb-4">
            <i class="fas fa-brain text-[#0EA5E9] mr-2"></i>
            Психологический профиль
          </h2>

          <!-- Tabs -->
          <div class="flex flex-wrap gap-2 w-full">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full sm:w-auto flex-1 px-3 py-2 rounded-lg transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white'
                  : 'bg-[#0EA5E9]/20 text-[#0EA5E9] hover:bg-[#0EA5E9]/30',
              ]"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="isInitialLoading || loading"
          class="flex flex-col items-center justify-center h-64"
        >
          <i class="fas fa-spinner fa-spin text-4xl text-[#0EA5E9] mb-4"></i>
          <p class="text-slate-300">Загрузка данных...</p>
        </div>

        <!-- Content after loading -->
        <div v-else>
          <!-- Archetypes Tab -->
          <div v-if="activeTab === 'archetypes'">
            <!-- No Data State for Archetypes -->
            <div
              v-if="archetypes.length === 0"
              class="flex flex-col items-center justify-center h-64 text-center"
            >
              <i class="fas fa-chart-pie text-4xl text-[#0EA5E9] mb-4"></i>
              <p class="text-slate-300">Нет данных для отображения.</p>
              <p class="text-sm text-slate-400 mt-2">
                Пройдите тест, чтобы увидеть ваш психологический профиль.
              </p>
              <NuxtLink
                to="/awareness-tools/life-purpose-archetype"
                class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-lg overflow-hidden transition-colors mt-4"
              >
                <span class="relative z-10">
                  <i class="fas fa-play-circle text-sm mr-2"></i>
                  Пройти тест
                </span>
                <div
                  class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#0EA5E9]/60 transition-transform duration-300"
                ></div>
              </NuxtLink>
            </div>

            <!-- Archetypes Section -->
            <div v-else class="space-y-6">
              <!-- Archetypes Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="archetype in visibleArchetypes"
                  :key="archetype.name"
                  class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 flex items-center gap-4 border border-white/10"
                >
                  <!-- Archetype Icon Container -->
                  <div
                    :class="[
                      'w-16 h-16 rounded-full flex items-center justify-center',
                      `bg-${archetype.color}-500/20`,
                    ]"
                  >
                    <i
                      :class="[
                        'fas',
                        archetype.icon,
                        `text-${archetype.color}-400 text-2xl`,
                      ]"
                    ></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white/90">
                      {{ archetype.name }}
                    </h3>
                    <div class="flex items-center mt-2">
                      <div class="h-2 bg-[#0EA5E9]/20 rounded-full w-32">
                        <div
                          class="h-2 rounded-full bg-[#0EA5E9]"
                          :style="{ width: `${archetype.level}%` }"
                        ></div>
                      </div>
                      <span class="ml-2 text-sm text-slate-400"
                        >{{ archetype.level }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Show More Button -->
              <button
                v-if="archetypes.length > 4"
                @click="showMore = !showMore"
                class="group relative inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-lg overflow-hidden transition-colors"
              >
                <span class="relative z-10">
                  {{ showMore ? "Скрыть" : "Показать больше" }}
                </span>
                <div
                  class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#0EA5E9]/60 transition-transform duration-300"
                ></div>
              </button>
            </div>
          </div>

          <!-- Big Five Tab -->
          <div v-if="activeTab === 'bigFive'" class="space-y-6">
            <div
              v-for="trait in bigFiveTraits"
              :key="trait.name"
              class="space-y-2"
            >
              <div class="flex justify-between items-center">
                <span class="text-slate-300 font-medium">{{ trait.name }}</span>
                <span class="text-sm text-slate-400">{{ trait.value }}%</span>
              </div>
              <div class="h-2 bg-[#0EA5E9]/20 rounded-full">
                <div
                  class="h-2 rounded-full"
                  :class="`bg-${trait.color}-500`"
                  :style="{ width: `${trait.value}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Cognitive Styles Tab -->
          <div v-if="activeTab === 'cognitive'" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="style in cognitiveStyles"
                :key="style.name"
                class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 border border-white/10"
              >
                <h3 class="font-semibold text-white/90 mb-2">
                  {{ style.name }}
                </h3>
                <p class="text-sm text-slate-400 mb-4">
                  {{ style.description }}
                </p>
                <div class="flex items-center gap-2">
                  <i :class="['fas', style.icon, 'text-[#0EA5E9]']"></i>
                  <span class="text-sm font-medium text-slate-400"
                    >{{ style.level }}/10</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar Stats -->
    <div class="space-y-8">
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
      >
        <h2 class="text-xl font-bold text-white/90 mb-6">
          <i class="fas fa-chart-line text-[#0EA5E9] mr-2"></i>
          Развитие личности
        </h2>
        <div class="space-y-4">
          <div
            v-for="stat in personalStats"
            :key="stat.name"
            class="flex items-center justify-between"
          >
            <span class="text-slate-300">{{ stat.name }}</span>
            <span class="font-semibold text-white/90">{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  archetypes: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

const activeTab = ref("archetypes");
const showMore = ref(false);
const isInitialLoading = ref(true);

const tabs = [
  { id: "archetypes", name: "Архетипы" },
  { id: "bigFive", name: "Big Five" },
  { id: "cognitive", name: "Когнитивные стили" },
];

const sortedArchetypes = computed(() =>
  props.archetypes.slice().sort((a, b) => b.level - a.level)
);

const visibleArchetypes = computed(() =>
  showMore.value ? sortedArchetypes.value : sortedArchetypes.value.slice(0, 4)
);

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

watch(
  () => props.loading,
  (newLoading) => {
    if (!newLoading) {
      isInitialLoading.value = false;
    }
  }
);
</script>
