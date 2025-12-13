<!-- pages/lab/brain-training/index.vue -->
<template>
  <div class="brain-training-page min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Breadcrumbs -->
      <Breadcrumbs />
      
      <!-- Page Header -->
      <div class="mb-4">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          Тренировка Мозга
        </h1>
        <p class="text-slate-600 dark:text-cyan-300/70 text-sm sm:text-base leading-relaxed max-w-2xl">
          Комплексная система развития когнитивных способностей: игры, упражнения и ментальные модели.
        </p>
      </div>

      <!-- Main Navigation Tabs -->
      <div class="flex flex-col sm:flex-row gap-4 border-b-0 sm:border-b border-slate-200 dark:border-slate-800 pb-1">
        <!-- Mobile Dropdown -->
        <div class="sm:hidden w-full">
            <div class="relative">
                <select 
                    v-model="activeTab"
                    class="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium"
                >
                    <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
                        {{ tab.label }}
                    </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                    <i class="fas fa-chevron-down text-xs"></i>
                </div>
            </div>
        </div>

        <!-- Desktop Tabs -->
        <div class="hidden sm:flex flex-wrap gap-4">
            <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-3 rounded-t-xl font-medium text-base transition-all relative flex items-center gap-2"
            :class="activeTab === tab.id 
                ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900 border-x border-t border-slate-200 dark:border-slate-800 -mb-[1px] shadow-sm z-10' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'"
            >
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
            </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="bg-white dark:bg-slate-900/30 rounded-b-2xl rounded-tr-2xl min-h-[500px] border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
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
import GamesView from '~/components/lab/brain-training/GamesView.vue';
import ExercisesView from '~/components/lab/brain-training/ExercisesView.vue';
import ModelsView from '~/components/lab/brain-training/ModelsView.vue';
import BrainMapView from '~/components/lab/brain-training/BrainMapView.vue';
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
