<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-8">
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transition-all duration-300"
      >
        <!-- Title and Tabs -->
        <div class="flex flex-col justify-between mb-6">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4"
          >
            <h2
              class="text-xl font-bold text-white/90 text-left flex items-center whitespace-nowrap"
            >
              <i class="fas fa-brain text-[#0EA5E9] mr-2"></i>
              Психологический профиль
            </h2>
            <span class="text-sm text-slate-400 whitespace-nowrap">
              Последнее обновление: {{ formatDate(lastUpdate) }}
            </span>
          </div>

          <!-- Tabs with Smooth Transitions -->
          <div class="flex flex-wrap gap-2 w-full">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="switchTab(tab.id)"
              :class="[
                'w-full sm:w-auto flex-1 px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white shadow-lg shadow-[#0EA5E9]/20'
                  : 'bg-[#0EA5E9]/20 text-[#0EA5E9] hover:bg-[#0EA5E9]/30 hover:scale-102',
              ]"
            >
              <i :class="['fas', tab.icon]"></i>
              <span>{{ tab.name }}</span>
              <span class="text-xs opacity-75" v-if="tab.count"
                >({{ tab.count }})</span
              >
            </button>
          </div>
        </div>

        <!-- Loading State with Skeleton -->
        <div v-if="isInitialLoading || loading" class="space-y-4">
          <div v-for="n in 4" :key="n" class="animate-pulse">
            <div class="h-24 bg-slate-700/30 rounded-lg"></div>
          </div>
        </div>

        <!-- Content with Transitions -->
        <TransitionGroup
          name="fade"
          tag="div"
          v-else
          class="transition-all duration-300"
        >
          <!-- Archetypes Tab -->
          <div v-if="activeTab === 'archetypes'" key="archetypes">
            <div v-if="archetypes.length === 0" class="empty-state">
              <div
                class="flex flex-col items-center justify-center h-64 text-center"
              >
                <i
                  class="fas fa-chart-pie text-4xl text-[#0EA5E9] mb-4 animate-bounce"
                ></i>
                <p class="text-slate-300">Нет данных для отображения.</p>
                <p class="text-sm text-slate-400 mt-2">
                  Пройдите тест, чтобы увидеть ваш психологический профиль.
                </p>
                <NuxtLink
                  to="/awareness-tools/life-purpose-archetype"
                  class="btn-primary mt-4"
                >
                  <i class="fas fa-play-circle text-sm mr-2"></i>
                  Пройти тест
                </NuxtLink>
              </div>
            </div>

            <div v-else class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="(archetype, index) in visibleArchetypes"
                  :key="archetype.name"
                  class="archetype-card"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <div
                    :class="[
                      'w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110',
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
                  <div class="flex-1">
                    <h3 class="font-semibold text-white/90 mb-1">
                      {{ archetype.name }}
                    </h3>
                    <p class="text-sm text-slate-400 mb-2">
                      {{ archetype.description }}
                    </p>
                    <div class="flex items-center">
                      <div class="h-2 bg-[#0EA5E9]/20 rounded-full flex-1">
                        <div
                          class="h-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] transition-all duration-1000"
                          :style="{ width: `${archetype.level}%` }"
                        ></div>
                      </div>
                      <span class="ml-2 text-sm font-medium text-slate-400"
                        >{{ archetype.level }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <button
                v-if="archetypes.length > 4"
                @click="toggleShowMore"
                class="btn-secondary w-full sm:w-auto"
              >
                <i
                  :class="[
                    'fas',
                    showMore ? 'fa-chevron-up' : 'fa-chevron-down',
                    'mr-2',
                  ]"
                ></i>
                {{ showMore ? "Скрыть" : "Показать больше" }}
              </button>
            </div>
          </div>

          <!-- Big Five Tab -->
          <div v-if="activeTab === 'bigFive'" key="bigFive" class="space-y-6">
            <div
              v-for="(trait, index) in bigFiveTraits"
              :key="trait.name"
              class="trait-card"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <i
                    :class="['fas', trait.icon, `text-${trait.color}-400`]"
                  ></i>
                  <span class="text-slate-300 font-medium">{{
                    trait.name
                  }}</span>
                </div>
                <span class="text-sm font-medium text-slate-400"
                  >{{ trait.value }}%</span
                >
              </div>
              <div
                class="relative h-2 bg-[#0EA5E9]/20 rounded-full overflow-hidden"
              >
                <div
                  class="absolute h-2 rounded-full transition-all duration-1000 animate-widthExpand"
                  :class="`bg-gradient-to-r from-${trait.color}-500 to-${trait.color}-400`"
                  :style="{ width: `${trait.value}%` }"
                ></div>
              </div>
              <p class="text-sm text-slate-400 mt-2">{{ trait.description }}</p>
            </div>
          </div>

          <!-- Cognitive Styles Tab -->
          <div
            v-if="activeTab === 'cognitive'"
            key="cognitive"
            class="space-y-6"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="(style, index) in cognitiveStyles"
                :key="style.name"
                class="cognitive-card"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div
                    class="w-10 h-10 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center"
                  >
                    <i :class="['fas', style.icon, 'text-[#0EA5E9]']"></i>
                  </div>
                  <h3 class="font-semibold text-white/90">{{ style.name }}</h3>
                </div>
                <p class="text-sm text-slate-400 mb-4">
                  {{ style.description }}
                </p>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-2 bg-[#0EA5E9]/20 rounded-full">
                    <div
                      class="h-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
                      :style="{ width: `${style.level * 10}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-slate-400"
                    >{{ style.level }}/10</span
                  >
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Right Sidebar Stats -->
    <div class="space-y-8">
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
      >
        <h2 class="text-xl font-bold text-white/90 mb-6 flex items-center">
          <i class="fas fa-chart-line text-[#0EA5E9] mr-2"></i>
          Развитие личности
        </h2>
        <div class="space-y-6">
          <div v-for="stat in personalStats" :key="stat.name" class="stat-card">
            <div class="flex items-center justify-between mb-2">
              <span class="text-slate-300">{{ stat.name }}</span>
              <span class="font-semibold text-white/90">{{ stat.value }}</span>
            </div>
            <div class="h-1.5 bg-[#0EA5E9]/20 rounded-full">
              <div
                class="h-1.5 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
                :style="{
                  width:
                    typeof stat.value === 'string'
                      ? stat.value.split('/')[0] * 10 + '%'
                      : stat.value,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Stats Card -->
      <div
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
      >
        <h3 class="text-lg font-semibold text-white/90 mb-4">Прогресс</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">Завершено тестов</span>
            <span class="text-white/90"
              >{{ completedTests }}/{{ totalTests }}</span
            >
          </div>
          <div
            class="relative h-2 bg-[#0EA5E9]/20 rounded-full overflow-hidden"
          >
            <div
              class="absolute h-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
              :style="{ width: `${(completedTests / totalTests) * 100}%` }"
            ></div>
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
  lastUpdate: {
    type: Date,
    default: () => new Date(),
  },
  completedTests: {
    type: Number,
    default: 3,
  },
  totalTests: {
    type: Number,
    default: 5,
  },
});

const activeTab = ref("archetypes");
const showMore = ref(false);
const isInitialLoading = ref(true);

const tabs = [
  { id: "archetypes", name: "Архетипы", icon: "fa-masks-theater" },
  { id: "bigFive", name: "Big Five", icon: "fa-star" },
  { id: "cognitive", name: "Когнитивные стили", icon: "fa-brain" },
];

const sortedArchetypes = computed(() =>
  props.archetypes.slice().sort((a, b) => b.level - a.level)
);

const visibleArchetypes = computed(() =>
  showMore.value ? sortedArchetypes.value : sortedArchetypes.value.slice(0, 4)
);

const bigFiveTraits = [
  {
    name: "Открытость новому",
    value: 78,
    color: "pink",
    icon: "fa-door-open",
    description: "Стремление к новым впечатлениям и опыту",
  },
  {
    name: "Добросовестность",
    value: 65,
    color: "blue",
    icon: "fa-check-double",
    description: "Организованность и ответственность",
  },
  {
    name: "Экстраверсия",
    value: 82,
    color: "green",
    icon: "fa-users",
    description: "Общительность и энергичность",
  },
  {
    name: "Доброжелательность",
    value: 70,
    color: "purple",
    icon: "fa-heart",
    description: "Эмпатия и забота о других",
  },
  {
    name: "Нейротизм",
    value: 45,
    color: "yellow",
    icon: "fa-balance-scale",
    description: "Эмоциональная стабильность",
  },
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
  {
    name: "Уровень осознанности",
    value: "7/10",
    icon: "fa-meditation",
  },
  {
    name: "Эмоциональный интеллект",
    value: "75%",
    icon: "fa-brain-circuit",
  },
  {
    name: "Стрессоустойчивость",
    value: "8/10",
    icon: "fa-shield",
  },
  {
    name: "Адаптивность",
    value: "82%",
    icon: "fa-arrows-rotate",
  },
];

const formatDate = (date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const switchTab = (tabId) => {
  activeTab.value = tabId;
};

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

watch(
  () => props.loading,
  (newLoading) => {
    if (!newLoading) {
      setTimeout(() => {
        isInitialLoading.value = false;
      }, 500);
    }
  }
);
</script>

<style scoped>
.btn-primary {
  @apply relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#0EA5E9]/20;
}

.btn-secondary {
  @apply relative inline-flex items-center justify-center px-4 py-2 bg-[#0EA5E9]/20 text-[#0EA5E9] rounded-lg transition-all duration-300 hover:bg-[#0EA5E9]/30;
}

.archetype-card {
  @apply bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 flex items-start gap-4 border border-white/10 transition-all duration-300 hover:border-[#0EA5E9]/30 animate-fadeIn;
}

.trait-card {
  @apply bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-4 border border-white/10 transition-all duration-300 hover:border-[#0EA5E9]/30 animate-fadeIn;
}

.cognitive-card {
  @apply bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-lg p-6 border border-white/10 transition-all duration-300 hover:border-[#0EA5E9]/30 animate-fadeIn;
}

.stat-card {
  @apply transition-all duration-300 hover:translate-x-1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes widthExpand {
  from {
    width: 0;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-widthExpand {
  animation: widthExpand 1s ease-out forwards;
}
</style>
