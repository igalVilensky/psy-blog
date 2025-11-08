<!-- pages/lab/tests.vue -->
<template>
  <div
    class="cognitive-tests-station min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-8"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="mb-10">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight gradient-text"
            >
              КОГНИТИВНЫЕ ТЕСТЫ
            </h1>
            <p
              class="text-cyan-300/70 text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              Комплексная оценка когнитивных функций: память, внимание, логика и
              скорость реакции
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div class="text-2xl font-bold text-cyan-400">12</div>
              <div class="text-xs text-slate-400 uppercase tracking-wide">
                Тестов
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-purple-400">8</div>
              <div class="text-xs text-slate-400 uppercase tracking-wide">
                Категорий
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Test Categories -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-white">ОСНОВНЫЕ ТЕСТЫ</h2>
          <button
            class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Посмотреть все →
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="test in testCategories"
            :key="test.id"
            class="test-category-card group"
            @click="navigateToTest(test)"
          >
            <!-- Icon Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="icon-wrapper" :class="test.iconBg">
                <i :class="test.icon" class="text-white text-xl"></i>
              </div>
              <span
                class="difficulty-badge"
                :class="getDifficultyClass(test.difficulty)"
              >
                {{ test.difficulty }}
              </span>
            </div>

            <!-- Content -->
            <h3
              class="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors"
            >
              {{ test.title }}
            </h3>
            <p class="text-sm text-slate-400 mb-1">{{ test.subtitle }}</p>
            <p class="text-sm text-slate-300 leading-relaxed mb-4">
              {{ test.description }}
            </p>

            <!-- Footer -->
            <div
              class="flex items-center justify-between pt-4 border-t border-slate-700/50"
            >
              <div class="flex items-center gap-2 text-cyan-400">
                <i class="fas fa-clock text-xs"></i>
                <span class="text-xs font-medium">{{ test.duration }}</span>
              </div>
              <div class="flex items-center gap-2 text-purple-400">
                <i class="fas fa-tasks text-xs"></i>
                <span class="text-xs font-medium"
                  >{{ test.tasksCount }} заданий</span
                >
              </div>
            </div>

            <!-- Hover Effect -->
            <div class="card-shine"></div>
          </div>
        </div>
      </div>

      <!-- Quick Tests Section -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-white">БЫСТРЫЕ ТЕСТЫ</h2>
          <span class="text-sm text-slate-400">Менее 5 минут</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="quickTest in quickTests"
            :key="quickTest.id"
            class="quick-test-card"
            @click="startQuickTest(quickTest)"
          >
            <div
              class="quick-icon-wrapper"
              :style="{ background: quickTest.gradient }"
            >
              <i :class="quickTest.icon" class="text-white text-lg"></i>
            </div>
            <h4 class="text-white text-sm font-medium mt-3 mb-1">
              {{ quickTest.title }}
            </h4>
            <p class="text-slate-400 text-xs">{{ quickTest.time }}</p>
          </div>
        </div>
      </div>

      <!-- Test History / Recent Results -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Tests -->
        <div class="info-card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">
              Последние результаты
            </h3>
            <button
              class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              История
            </button>
          </div>
          <div class="space-y-3">
            <div
              v-for="result in recentResults"
              :key="result.id"
              class="result-item"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :style="{ background: result.color }"
                  >
                    <i :class="result.icon" class="text-white text-sm"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-white">
                      {{ result.test }}
                    </div>
                    <div class="text-xs text-slate-400">{{ result.date }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div
                    class="text-lg font-bold"
                    :class="getScoreClass(result.score)"
                  >
                    {{ result.score }}%
                  </div>
                  <div class="text-xs text-slate-400">
                    {{ result.percentile }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="info-card">
          <div class="flex items-center gap-2 mb-4">
            <div
              class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"
            >
              <i class="fas fa-lightbulb text-purple-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-white">Рекомендации</h3>
          </div>
          <div class="space-y-3">
            <div
              v-for="recommendation in recommendations"
              :key="recommendation.id"
              class="recommendation-item"
            >
              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <i class="fas fa-check text-cyan-400 text-xs"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-white mb-1">
                    {{ recommendation.title }}
                  </div>
                  <div class="text-xs text-slate-400 leading-relaxed">
                    {{ recommendation.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Banner -->
      <div
        class="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div
            class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-info-circle text-cyan-400 text-xl"></i>
          </div>
          <div class="flex-1">
            <h4 class="text-white font-semibold mb-1">О когнитивных тестах</h4>
            <p class="text-sm text-slate-300 leading-relaxed">
              Регулярное прохождение когнитивных тестов помогает отслеживать
              динамику развития умственных способностей и выявлять области для
              улучшения. Рекомендуется проходить тесты в спокойной обстановке и
              в хорошем самочувствии.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "laboratory",
});

const testCategories = [
  {
    id: "memory",
    title: "Память",
    subtitle: "Кратковременная и долговременная",
    icon: "fas fa-brain",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
    description:
      "Оценка способности запоминать и воспроизводить информацию различных типов",
    duration: "15-20 мин",
    difficulty: "Средняя",
    tasksCount: 12,
  },
  {
    id: "attention",
    title: "Внимание",
    subtitle: "Концентрация и переключение",
    icon: "fas fa-bullseye",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    description:
      "Измерение способности концентрироваться и переключать внимание между задачами",
    duration: "10-15 мин",
    difficulty: "Легкая",
    tasksCount: 8,
  },
  {
    id: "logic",
    title: "Логика",
    subtitle: "Абстрактное мышление",
    icon: "fas fa-project-diagram",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
    description:
      "Решение логических задач, анализ паттернов и абстрактное мышление",
    duration: "20-25 мин",
    difficulty: "Сложная",
    tasksCount: 15,
  },
  {
    id: "reaction",
    title: "Скорость реакции",
    subtitle: "Моторная и когнитивная",
    icon: "fas fa-bolt",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
    description:
      "Тестирование времени реакции на визуальные и аудиальные стимулы",
    duration: "5-8 мин",
    difficulty: "Легкая",
    tasksCount: 20,
  },
  {
    id: "verbal",
    title: "Вербальные способности",
    subtitle: "Речь и языковые навыки",
    icon: "fas fa-comment-dots",
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
    description:
      "Оценка словарного запаса, понимания речи и вербального мышления",
    duration: "12-18 мин",
    difficulty: "Средняя",
    tasksCount: 10,
  },
  {
    id: "spatial",
    title: "Пространственное мышление",
    subtitle: "Визуализация и ориентация",
    icon: "fas fa-cube",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    description:
      "Тесты на способность мысленно манипулировать объектами в пространстве",
    duration: "15-20 мин",
    difficulty: "Сложная",
    tasksCount: 14,
  },
];

const quickTests = [
  {
    id: 1,
    title: "Реакция",
    icon: "fas fa-bolt",
    time: "2 мин",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  },
  {
    id: 2,
    title: "Память",
    icon: "fas fa-brain",
    time: "3 мин",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  },
  {
    id: 3,
    title: "Внимание",
    icon: "fas fa-eye",
    time: "2 мин",
    gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
  },
  {
    id: 4,
    title: "Логика",
    icon: "fas fa-puzzle-piece",
    time: "4 мин",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  },
  {
    id: 5,
    title: "Счет",
    icon: "fas fa-calculator",
    time: "3 мин",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
  },
  {
    id: 6,
    title: "Паттерны",
    icon: "fas fa-shapes",
    time: "3 мин",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
  },
];

const recentResults = [
  {
    id: 1,
    test: "Тест на память",
    date: "2 дня назад",
    score: 87,
    percentile: "Топ 15%",
    icon: "fas fa-brain",
    color: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  },
  {
    id: 2,
    test: "Тест на внимание",
    date: "5 дней назад",
    score: 92,
    percentile: "Топ 8%",
    icon: "fas fa-bullseye",
    color: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
  },
  {
    id: 3,
    test: "Логический тест",
    date: "1 неделю назад",
    score: 78,
    percentile: "Топ 25%",
    icon: "fas fa-project-diagram",
    color: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  },
];

const recommendations = [
  {
    id: 1,
    title: "Попробуйте тест на пространственное мышление",
    description:
      "Вы давно не проходили этот тест. Рекомендуем пройти для полной оценки",
  },
  {
    id: 2,
    title: "Улучшите результаты по логике",
    description:
      "Регулярная практика поможет повысить ваш показатель на 10-15%",
  },
  {
    id: 3,
    title: "Пройдите быстрые тесты",
    description:
      "Ежедневные 5-минутные тесты помогут поддерживать когнитивные функции",
  },
];

const getDifficultyClass = (difficulty) => {
  const classes = {
    Легкая: "difficulty-easy",
    Средняя: "difficulty-medium",
    Сложная: "difficulty-hard",
  };
  return classes[difficulty] || "difficulty-medium";
};

const getScoreClass = (score) => {
  if (score >= 90) return "text-emerald-400";
  if (score >= 75) return "text-cyan-400";
  if (score >= 60) return "text-yellow-400";
  return "text-orange-400";
};

const navigateToTest = (test) => {
  navigateTo(`/lab/tests`);
};

const startQuickTest = (test) => {
  navigateTo(`/lab/tests`);
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  @apply text-center px-4 py-3 rounded-xl bg-slate-900/50 border border-cyan-500/10;
}

.test-category-card {
  @apply relative p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/10 
         hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden;
}

.test-category-card:hover {
  @apply bg-slate-900/70 transform -translate-y-1 shadow-lg shadow-cyan-500/10;
}

.card-shine {
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
         translate-x-[-100%] transition-transform duration-1000;
}

.test-category-card:hover .card-shine {
  @apply translate-x-[100%];
}

.icon-wrapper {
  @apply w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0;
}

.difficulty-badge {
  @apply px-2 py-1 rounded-lg text-xs font-medium;
}

.difficulty-easy {
  @apply bg-emerald-500/10 text-emerald-400 border border-emerald-500/20;
}

.difficulty-medium {
  @apply bg-cyan-500/10 text-cyan-400 border border-cyan-500/20;
}

.difficulty-hard {
  @apply bg-orange-500/10 text-orange-400 border border-orange-500/20;
}

.quick-test-card {
  @apply p-4 rounded-xl bg-slate-900/30 border border-purple-500/10 
         hover:border-purple-500/30 hover:bg-slate-900/50 transition-all 
         duration-300 cursor-pointer text-center;
}

.quick-test-card:hover {
  @apply transform -translate-y-1;
}

.quick-icon-wrapper {
  @apply w-12 h-12 mx-auto rounded-xl flex items-center justify-center;
}

.info-card {
  @apply p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/10 backdrop-blur-sm;
}

.result-item {
  @apply p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 
         hover:border-cyan-500/30 transition-all duration-300;
}

.recommendation-item {
  @apply p-3 rounded-lg bg-slate-800/20 border border-slate-700/30;
}

@media (max-width: 640px) {
  .stat-card {
    @apply px-3 py-2;
  }

  .test-category-card {
    @apply p-4;
  }

  .info-card {
    @apply p-4;
  }
}
</style>
