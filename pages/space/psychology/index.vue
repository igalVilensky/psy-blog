<!-- pages/space/psychology/index.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50/50 to-white dark:from-zinc-950/50 dark:to-black text-zinc-900 dark:text-white font-sans transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-12">
      <!-- Breadcrumbs -->
      <Breadcrumbs />

      <!-- Page Header -->
      <div>
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div class="space-y-4">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none">
              Психологическая<br />Лаборатория
            </h1>
            <p class="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
              Научный подход к самопознанию: интерактивные инструменты анализа личности, когнитивные эксперименты и
              библиотека знаний.
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div class="text-3xl font-black text-cyan-600 dark:text-cyan-400 leading-none mb-1">8</div>
              <div class="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest font-black">
                Инструментов
              </div>
            </div>
            <div class="stat-card border-l-4 border-l-purple-500">
              <div class="text-3xl font-black text-purple-600 dark:text-purple-400 leading-none mb-1">24</div>
              <div class="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest font-black">
                Эксперимента
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Experiment / Daily Highlight -->
      <div class="relative group">
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-[2.5rem] blur-2xl opacity-5 group-hover:opacity-10 transition-opacity duration-700">
        </div>
        <div
          class="relative bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-12 overflow-hidden shadow-2xl">
          <!-- Decorative Background Icon -->
          <div class="absolute -right-12 -bottom-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <i class="fas fa-brain text-[15rem]"></i>
          </div>

          <div class="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div class="flex-1 space-y-8">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <span
                    class="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-500/20">
                    <i class="fas fa-bolt mr-1.5"></i> Актуально прямо сейчас
                  </span>
                  <span class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    5-7 МИНУТ
                  </span>
                </div>
                <h3 class="text-3xl sm:text-3xll font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                  Эффект Струпа: <br /><span class="text-cyan-600 dark:text-cyan-400">Тест на гибкость</span>
                </h3>
                <p class="text-zinc-600 dark:text-zinc-400 text-lg font-medium leading-relaxed max-w-xl">
                  Классический эксперимент, проверяющий вашу способность подавлять автоматические реакции. Измерьте свою
                  когнитивную устойчивость за считанные минуты.
                </p>
              </div>

              <div class="flex flex-wrap gap-4">
                <NuxtLink to="/space/brain-training/stroop"
                  class="px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-zinc-500/20 active:scale-95 flex items-center gap-3 group/btn">
                  <span>Запустить эксперимент</span>
                  <i class="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
                </NuxtLink>
                <div class="flex -space-x-3 items-center">
                  <div v-for="i in 4" :key="i"
                    class="w-10 h-10 rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img :src="`https://i.pravatar.cc/100?u=${i}`" alt="user" class="w-full h-full object-cover" />
                  </div>
                  <div class="pl-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    +1.2к исследователей сегодня
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:w-1/3 flex justify-center lg:justify-end">
              <div class="relative">
                <div class="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
                <div
                  class="w-64 h-64 rounded-3xl bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center shadow-inner relative border border-zinc-200 dark:border-zinc-700">
                  <i
                    class="fas fa-flask text-zinc-900 dark:text-white text-8xl transition-transform duration-700 group-hover:scale-110"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Psychology Lab Sections Grid -->
      <div class="space-y-8">
        <h2 class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight flex items-center gap-4">
          Направления исследований
          <div class="h-px flex-1 bg-zinc-100 dark:bg-zinc-800"></div>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LabSectionCard v-for="section in labSections" :key="section.id" :section="section"
            @click="navigateToSection(section)" />
        </div>
      </div>

      <!-- Quick Tools -->
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Микро-инструменты</h2>
          <NuxtLink to="/space"
            class="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 hover:opacity-80 transition-opacity">
            Смотреть все</NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          <QuickToolCard v-for="tool in quickTools" :key="tool.id" :tool="tool" />
        </div>
      </div>

      <!-- Psychology Facts & Insights -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-zinc-100 dark:border-zinc-800">
        <div class="lg:col-span-2 relative group">
          <div
            class="absolute -inset-1 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800/20 dark:to-zinc-900/10 rounded-[2.5rem] -z-10 transition-all group-hover:inset-0">
          </div>
          <div class="flex flex-col md:flex-row gap-10 p-10">
            <div
              class="w-20 h-20 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center flex-shrink-0 shadow-2xl">
              <i class="fas fa-quote-right text-white dark:text-zinc-900 text-3xl"></i>
            </div>
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <span class="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{{
                  dailyFact.category }}</span>
                <div class="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                <span class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">ИНСАЙТ
                  ДНЯ</span>
              </div>
              <p class="text-3xl font-black text-zinc-900 dark:text-white leading-snug tracking-tight">
                "{{ dailyFact.content }}"
              </p>
              <div class="flex items-center gap-4">
                <button @click="refreshFact"
                  class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 transition-colors group/sync">
                  <i class="fas fa-sync-alt group-active/sync:rotate-180 transition-transform duration-500"></i>
                  Обновить факт
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-zinc-900 dark:bg-zinc-950 rounded-[2.5rem] p-10 flex flex-col justify-between items-start text-white shadow-2xl">
          <div class="space-y-6">
            <div class="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <i class="fas fa-question text-xl"></i>
            </div>
            <h4 class="text-2xl font-black uppercase tracking-tight leading-tight">Есть вопрос по <br />психологии?</h4>
            <p class="text-zinc-400 text-sm font-medium leading-relaxed">
              Наши ИИ-ассистенты готовы помочь вам разобраться в сложных темах.
            </p>
          </div>
          <button
            class="mt-8 px-8 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all hover:bg-cyan-500 hover:text-white">
            Задать вопрос
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LabSectionCard from "~/components/space/psychology/LabSectionCard.vue";
import QuickToolCard from "~/components/space/psychology/QuickToolCard.vue";
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
      content: "/images/psychology-og.jpg",
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
    description: "Исследуйте свои роли Взрослый, Ребёнок и Родитель через призму ТА.",
    icon: "fas fa-users-viewfinder",
    gradient: "from-purple-500 to-pink-500",
    path: "/space/psychology/ego-states",
    featured: true,
  },
  {
    id: "healing-childhood-traumas",
    title: "Исцеление травм",
    description: "Трансформация негативного опыта в ресурсную базу для будущего.",
    icon: "fas fa-hand-holding-heart",
    gradient: "from-rose-500 to-pink-500",
    path: "/space/psychology/healing-childhood-traumas",
  },
  {
    id: "psychology-guides",
    title: "Библиотека гайдов",
    description: "Практические руководства по самотерапии и психологической гигиене.",
    icon: "fas fa-bookmark",
    gradient: "from-violet-500 to-purple-500",
    path: "/space/psychology/guides",
  },
  {
    id: "habit-override",
    title: "Перепрошивка",
    description: "Лаборатория анализа и изменения ваших автоматических реакций.",
    icon: "fas fa-code-merge",
    gradient: "from-cyan-500 to-blue-600",
    path: "/space/psychology/habit-override",
  },
  {
    id: "podcasts",
    title: "Подкасты",
    description: "Глубокие обсуждения психологических концепций и интервью с экспертами.",
    icon: "fas fa-microphone-lines",
    gradient: "from-cyan-500 to-blue-500",
    path: "/space/psychology/podcasts",
  },
  {
    id: "mindfulness",
    title: "Осознанность",
    description: "Практики присутствия, медитации и инструменты снижения стресса.",
    icon: "fas fa-spa",
    gradient: "from-teal-500 to-cyan-500",
    path: "/space/mindfulness",
  },
  {
    id: "social-psych",
    title: "Влияние",
    description: "Эксперименты с убеждением, лидерством и групповой динамикой.",
    icon: "fas fa-user-group",
    gradient: "from-green-500 to-emerald-500",
    path: "/space/psychology/social",
    disabled: true,
  },
  {
    id: "personality",
    title: "Личность",
    description: "Исследование черт характера и вашей когнитивной архитектуры.",
    icon: "fas fa-fingerprint",
    gradient: "from-indigo-500 to-purple-500",
    path: "/space/psychology/personality",
    disabled: true,
  },
  {
    id: "emotion-lab",
    title: "Эмоции",
    description: "Анализ эмоциональных паттернов и развитие EQ.",
    icon: "fas fa-heart-pulse",
    gradient: "from-red-500 to-orange-500",
    path: "/space/psychology/emotion-lab",
    disabled: true,
  },
];

const quickTools = [
  {
    id: "emotional-compass",
    title: "Компас",
    icon: "fas fa-compass",
    color: "text-purple-600 dark:text-purple-400",
    path: "/space/growth/emotional-compass"
  },
  {
    id: "wheel-of-life",
    title: "Колесо",
    icon: "fas fa-chart-pie",
    color: "text-cyan-600 dark:text-cyan-400",
    path: "/space/growth/wheel-of-life"
  },
  {
    id: "trigger-scan",
    title: "Скан",
    icon: "fas fa-expand",
    color: "text-blue-600 dark:text-blue-400",
    path: "/space/psychology/habit-override#scan"
  },
  {
    id: "mood-tracker",
    title: "Настрой",
    icon: "fas fa-smile",
    color: "text-amber-500 dark:text-amber-400",
    path: "/space/psychology",
    disabled: true,
  },
  {
    id: "stress-test",
    title: "Стресс",
    icon: "fas fa-bolt-lightning",
    color: "text-rose-600 dark:text-rose-400",
    path: "/space/psychology",
    disabled: true,
  },
  {
    id: "focus-timer",
    title: "Фокус",
    icon: "fas fa-stopwatch",
    color: "text-cyan-500 dark:text-cyan-400",
    path: "/space/psychology",
    disabled: true,
  },
  {
    id: "breathing",
    title: "Вдох",
    icon: "fas fa-wind",
    color: "text-emerald-500 dark:text-emerald-400",
    path: "/space/psychology",
    disabled: true,
  },
];

const dailyFact = ref({
  content:
    "Ваш мозг потребляет около 20% всей энергии вашего тела, хотя составляет всего 2% его веса. Это самый энергозатратный орган в вашей личной вселенной.",
  category: "НЕЙРОНАУКА",
});

const refreshFact = () => {
  // Simple simulation of refreshing
  const facts = [
    { content: "Мозгу требуется всего 1/10 секунды, чтобы отреагировать на страх.", category: "ЭМОЦИИ" },
    { content: "Среднестатистический человек имеет около 6000 мыслей в день.", category: "КОГНИТИВИСТИКА" },
    { content: "Сон — это не отдых для мозга, а время интенсивной очистки от нейротоксинов.", category: "ФИЗИОЛОГИЯ" }
  ];
  dailyFact.value = facts[Math.floor(Math.random() * facts.length)];
};

const navigateToSection = (section) => {
  navigateTo(section.path);
};
</script>

<style scoped>
.stat-card {
  @apply text-center px-6 py-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:scale-105;
}
</style>
