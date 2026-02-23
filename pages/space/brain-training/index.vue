<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50/50 to-white dark:from-zinc-950/50 dark:to-black text-zinc-900 dark:text-white font-sans transition-colors duration-500 overflow-x-hidden">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <!-- Breadcrumbs -->
      <Breadcrumbs />

      <!-- Page Header -->
      <div class="mb-4">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 tracking-tight">
          Тренировка Мозга
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed max-w-2xl font-medium">
          Комплексная система развития когнитивных способностей: научно обоснованные игры, упражнения и ментальные
          модели.
        </p>
      </div>

      <!-- Main Navigation Tabs -->
      <div class="flex flex-col sm:flex-row gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-px">
        <!-- Mobile Dropdown -->
        <div class="sm:hidden w-full mb-4">
          <div class="relative">
            <select v-model="activeTab"
              class="w-full appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white py-3 pl-4 pr-10 focus:outline-none font-bold rounded-xl shadow-sm">
              <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
                {{ tab.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>

        <!-- Desktop Tabs -->
        <div class="hidden sm:flex flex-wrap gap-2">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all relative flex items-center gap-2 rounded-t-xl border-b-2"
            :class="activeTab === tab.id
              ? 'text-cyan-600 dark:text-cyan-400 border-cyan-500 bg-white dark:bg-zinc-900 shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 border-transparent'">
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div
        class="bg-white dark:bg-zinc-900/50 backdrop-blur-sm min-h-[500px] border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-xl">
        <Transition name="fade" mode="out-in">
          <KeepAlive>
            <component :is="currentView" @switch-tab="switchTab" />
          </KeepAlive>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import GamesView from '~/components/space/brain-training/GamesView.vue';
import ExercisesView from '~/components/space/brain-training/ExercisesView.vue';
import ModelsView from '~/components/space/brain-training/ModelsView.vue';
import BrainMapView from '~/components/space/brain-training/BrainMapView.vue';
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const activeTab = ref('games');

const seoData = computed(() => {
  const map = {
    games: {
      title: 'Развивающие Игры',
      desc: 'Коллекция игр для тренировки памяти, внимания и скорости мышления.',
      keywords: 'игры для мозга, тренировка памяти, развитие внимания, когнитивные игры'
    },
    exercises: {
      title: 'Когнитивные Упражнения',
      desc: 'Научно обоснованные упражнения для развития когнитивных способностей.',
      keywords: 'N-Back, тест Струпа, тренировка реакции, упражнения для мозга'
    },
    models: {
      title: 'Когнитивные Модели',
      desc: 'Библиотека ментальных моделей и фреймворков мышления.',
      keywords: 'ментальные модели, системное мышление, принятие решений'
    },
    'brain-map': {
      title: 'Интерактивная Карта Мозга',
      desc: 'Исследуйте структуры и функции человеческого мозга.',
      keywords: 'карта мозга, нейробиология, функции мозга, анатомия мозга'
    }
  };
  return map[activeTab.value] || map.games;
});

useHead(() => ({
  title: `${seoData.value.title} | Тренировка Мозга`,
  meta: [
    { name: 'description', content: seoData.value.desc },
    { name: 'keywords', content: seoData.value.keywords },
    { property: 'og:title', content: `${seoData.value.title} | MindQ Lab` },
    { property: 'og:description', content: seoData.value.desc },
    { property: 'og:type', content: 'website' },
  ],
}));

const tabs = [
  { id: 'games', label: 'Игры', icon: 'fas fa-gamepad' },
  { id: 'exercises', label: 'Упражнения', icon: 'fas fa-dumbbell' },
  { id: 'models', label: 'Когнитивные Модели', icon: 'fas fa-brain' },
  { id: 'brain-map', label: 'Карта Мозга', icon: 'fas fa-project-diagram' },
];

const currentView = computed(() => {
  switch (activeTab.value) {
    case 'games': return GamesView;
    case 'exercises': return ExercisesView;
    case 'models': return ModelsView;
    case 'brain-map': return BrainMapView;
    default: return GamesView;
  }
});

const switchTab = (tabId) => {
  if (tabs.some(t => t.id === tabId)) {
    activeTab.value = tabId;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>