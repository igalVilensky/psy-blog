<!-- pages/lab/psychology/index.vue -->
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      <!-- Header Section - Fixed to match your style -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              ПСИХОЛОГИЧЕСКАЯ ЛАБОРАТОРИЯ
            </h1>
            <p class="text-slate-600 dark:text-cyan-300/70 text-sm sm:text-base leading-relaxed max-w-2xl">
              Исследуйте глубины разума через интерактивные эксперименты и
              практические инструменты
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">8</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Инструментов
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Эксперимента
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rest of the content remains the same -->
      <div class="mb-12">
        <div
          class="bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 border border-purple-200 dark:border-purple-500/20 rounded-2xl p-6 shadow-sm dark:shadow-none">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-star text-yellow-500 dark:text-yellow-400"></i>
                <span class="text-yellow-600 dark:text-yellow-400 font-semibold">ЭКСПЕРИМЕНТ ДНЯ</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Тест Струпа</h3>
              <p class="text-slate-600 dark:text-slate-300 mb-4">
                Измерьте свою когнитивную гибкость в классическом
                психологическом тесте
              </p>
              <NuxtLink to="/lab/games/stroop" class="btn-primary inline-block">
                <i class="fas fa-flask mr-2"></i>
                Попробовать сейчас
              </NuxtLink>
            </div>
            <div class="hidden md:block">
              <div class="w-32 h-32 rounded-2xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                <i class="fas fa-brain text-purple-600 dark:text-purple-400 text-5xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Psychology Lab Sections Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <LabSectionCard v-for="section in labSections" :key="section.id" :section="section"
          @click="navigateToSection(section)" />
      </div>

      <!-- Quick Tools -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Быстрые инструменты</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickToolCard v-for="tool in quickTools" :key="tool.id" :tool="tool" />
        </div>
      </div>

      <!-- Psychology Facts -->
      <div
        class="bg-white dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-cyan-500/20 shadow-sm dark:shadow-none">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center">
            <i class="fas fa-lightbulb text-cyan-600 dark:text-cyan-400 text-xl"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Факт о психологии</h3>
            <p class="text-slate-500 dark:text-slate-400">Узнавайте что-то новое каждый день</p>
          </div>
        </div>
        <div class="text-slate-600 dark:text-slate-300 leading-relaxed">
          {{ dailyFact.content }}
        </div>
        <div class="flex items-center justify-between mt-4">
          <span class="text-cyan-600 dark:text-cyan-400 text-sm font-mono">{{
            dailyFact.category
          }}</span>
          <button class="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fas fa-sync-alt text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LabSectionCard from "~/components/lab/psychology/LabSectionCard.vue";
import QuickToolCard from "~/components/lab/psychology/QuickToolCard.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
definePageMeta({
  layout: "laboratory",
});

useHead({
  title: "Психологическая Лаборатория",
  meta: [
    {
      name: "description",
      content:
        "Исследуйте глубины разума через интерактивные эксперименты, психологические тесты и образовательные материалы.",
    },
    {
      property: "og:title",
      content: "Психологическая Лаборатория | MindQ Lab",
    },
    {
      property: "og:description",
      content:
        "Исследуйте глубины разума через интерактивные эксперименты, психологические тесты и образовательные материалы.",
    },
    {
      property: "og:image",
      content: "/images/psychology-og.jpg", // Placeholder
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});

const labSections = [
  {
    id: "ego-states",
    title: "Эго-состояния",
    description: "Исследуйте свои роли Родитель/Взрослый/Ребёнок",
    icon: "fas fa-people-arrows",
    gradient: "from-purple-500 to-pink-500",
    path: "/lab/psychology/ego-states",
    featured: true,
  },
  {
    id: "healing-childhood-traumas",
    title: "Исцеление детских травм",
    description: "Трансформация негативного опыта в ресурс для роста",
    icon: "fas fa-hand-holding-heart",
    gradient: "from-rose-500 to-pink-500",
    path: "/lab/psychology/healing-childhood-traumas",
  },
  {
    id: "psychology-guides",
    title: "Библиотека гайдов",
    description: "Коллекция практических руководств для саморазвития",
    icon: "fas fa-book-open",
    gradient: "from-violet-500 to-purple-500",
    path: "/lab/psychology/guides",
  },
  {
    id: "podcasts",
    title: "Подкасты",
    description: "Вдохновляющие беседы для личностного роста",
    icon: "fas fa-podcast",
    gradient: "from-cyan-500 to-blue-500",
    path: "/lab/psychology/podcasts",
  },
  {
    id: "mindfulness",
    title: "Осознанность",
    description: "Практики присутствия и медитативные упражнения",
    icon: "fas fa-spa",
    gradient: "from-teal-500 to-cyan-500",
    path: "/lab/mindfulness",
  },
  {
    id: "cognitive-illusions",
    title: "Когнитивные иллюзии",
    description: "Обманите свой мозг и поймите как работает восприятие",
    icon: "fas fa-eye",
    gradient: "from-cyan-500 to-blue-500",
    path: "/lab/psychology/cognitive-illusions",
    disabled: true,
  },
  {
    id: "emotion-lab",
    title: "Эмоциональная лаборатория",
    description: "Анализируйте и тренируйте эмоциональный интеллект",
    icon: "fas fa-heart-pulse",
    gradient: "from-red-500 to-orange-500",
    path: "/lab/psychology/emotion-lab",
    disabled: true,
  },
  {
    id: "social-psych",
    title: "Социальная психология",
    description: "Эксперименты с влиянием, убеждением и групповой динамикой",
    icon: "fas fa-users",
    gradient: "from-green-500 to-emerald-500",
    path: "/lab/psychology/social",
    disabled: true,
  },
  {
    id: "personality",
    title: "Личность и характер",
    description: "Карта вашей уникальной психологической структуры",
    icon: "fas fa-fingerprint",
    gradient: "from-indigo-500 to-purple-500",
    path: "/lab/psychology/personality",
    disabled: true,
  },
];

const quickTools = [
  {
    id: "emotional-compass",
    title: "Эмоциональный компас",
    icon: "fas fa-compass",
    color: "text-purple-600 dark:text-purple-400",
    path: "/lab/experiments/emotional-compass"
  },
  {
    id: "wheel-of-life",
    title: "Колесо баланса",
    icon: "fas fa-chart-pie",
    color: "text-cyan-600 dark:text-cyan-400",
    path: "/lab/experiments/wheel-of-life"
  },
  {
    id: "mood-tracker",
    title: "Настроение",
    icon: "fas fa-smile",
    color: "text-yellow-600 dark:text-yellow-400",
    path: "/lab/psychology"
  },
  {
    id: "stress-test",
    title: "Стресс-тест",
    icon: "fas fa-heartbeat",
    color: "text-red-600 dark:text-red-400",
    path: "/lab/psychology"
  },
  {
    id: "focus-timer",
    title: "Фокус",
    icon: "fas fa-hourglass-half",
    color: "text-blue-600 dark:text-blue-400",
    path: "/lab/psychology"
  },
  {
    id: "breathing",
    title: "Дыхание",
    icon: "fas fa-wind",
    color: "text-green-600 dark:text-green-400",
    path: "/lab/psychology"
  },
];

const dailyFact = {
  content:
    "Мозг человека способен хранить примерно 2.5 петабайта информации - это примерно 3 миллиона часов телепередач.",
  category: "НЕЙРОНАУКА",
};

const navigateToSection = (section) => {
  navigateTo(section.path);
};
</script>

<style scoped>
.stat-card {
  @apply text-center px-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 shadow-sm dark:shadow-none;
}

.btn-primary {
  @apply px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105;
}
</style>
