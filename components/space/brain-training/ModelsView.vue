<!-- components/space/brain-training/ModelsView.vue -->
<template>
  <div class="font-sans">
    <!-- Header Section -->
    <div class="mb-12">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight uppercase">
            Когнитивные Модели
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Коллекция фундаментальных когнитивных моделей для системного мышления и обучения.
          </p>
        </div>

        <!-- Stats Overview -->
        <div class="flex items-center gap-4">
          <div class="stat-card">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ models.length }}
            </div>
            <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">
              Моделей
            </div>
          </div>
          <div class="stat-card border-l-4 border-l-cyan-500">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {{ goals.length - 1 }}
            </div>
            <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">
              Категорий
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls Section -->
    <div class="mb-12">
      <div class="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          <button v-for="goal in goals" :key="goal" @click="selectedGoal = goal" :class="[
            'rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 border',
            selectedGoal === goal
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25'
              : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
          ]">
            {{ goal }}
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full lg:w-96 group">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <i class="fas fa-search text-zinc-400 transition-colors group-focus-within:text-blue-500"></i>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Поиск модели..."
            class="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 py-3.5 pl-11 pr-4 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all shadow-sm font-bold text-sm" />
        </div>
      </div>
    </div>

    <!-- Models Grid -->
    <div>
      <div v-if="filteredModels.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ModelCard v-for="model in filteredModels" :key="model.id" :model="model" @view-details="openModal" />
      </div>

      <!-- Empty State -->
      <div v-else
        class="text-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <div
          class="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 shadow-xl mb-8">
          <i class="fas fa-brain text-3xl text-zinc-400"></i>
        </div>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">Ничего не найдено</h3>
        <p class="text-zinc-500 dark:text-zinc-400 font-medium">Попробуйте изменить параметры поиска или категорию.</p>
        <button @click="resetFilters"
          class="mt-8 px-8 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold uppercase tracking-widest text-xs hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all">
          Сбросить фильтры
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <Teleport to="body">
      <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <div v-if="selectedModel"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-md"
          @click.self="closeModal">
          <div
            class="relative w-full max-w-2xl transform rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-2xl transition-all max-h-[90vh] overflow-y-auto">
            <!-- Close Button -->
            <button @click="closeModal"
              class="absolute right-6 top-6 rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>

            <!-- Header -->
            <div class="mb-10 pb-8 border-b border-zinc-100 dark:border-zinc-800">
              <div class="flex items-center gap-3 mb-6">
                <span
                  class="rounded-lg bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {{ selectedModel.relatedGoals }}
                </span>
              </div>
              <h2 class="text-3xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tight">{{
                t(selectedModel.title) }}</h2>
              <p class="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{{
                selectedModel.explanation }}</p>
            </div>

            <!-- Visual Content -->
            <div
              class="mb-10 rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 p-6 border border-zinc-200 dark:border-zinc-800 text-center shadow-inner">
              <h4 class="mb-4 text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                <i class="fas fa-eye mr-2"></i> Визуализация
              </h4>
              <p class="text-2xl font-mono text-zinc-800 dark:text-zinc-100 tracking-widest">
                {{ selectedModel.visualization }}
              </p>
            </div>

            <!-- Details Grid -->
            <div class="grid gap-6 md:grid-cols-2 mb-10">
              <!-- Example -->
              <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 p-6 border border-zinc-200 dark:border-zinc-800">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  <i class="fas fa-lightbulb"></i> Пример из жизни
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                  {{ selectedModel.example }}
                </p>
              </div>

              <!-- Application -->
              <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 p-6 border border-zinc-200 dark:border-zinc-800">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  <i class="fas fa-check-circle"></i> Как применять
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                  {{ selectedModel.application }}
                </p>
              </div>

              <!-- Related Exercises -->
              <div v-if="selectedModel.relatedExercises"
                class="rounded-2xl bg-rose-50/10 dark:bg-rose-500/5 p-6 border border-rose-500/20">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 dark:text-rose-400">
                  <i class="fas fa-dumbbell"></i> Упражнения
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                  <button class="hover:text-rose-500 transition-colors underline decoration-rose-500/30"
                    @click="$emit('switch-tab', 'exercises')">{{ t(selectedModel.relatedExercises) }}</button>
                </p>
              </div>

              <!-- Related Tests -->
              <div v-if="selectedModel.relatedTests"
                class="rounded-2xl bg-blue-50/10 dark:bg-blue-500/5 p-6 border border-blue-500/20">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  <i class="fas fa-vial"></i> Тесты
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                  <NuxtLink to="/space/tests"
                    class="hover:text-cyan-500 transition-colors underline decoration-cyan-500/30">{{
                      selectedModel.relatedTests }}</NuxtLink>
                </p>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex justify-end">
              <button
                class="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 font-bold uppercase tracking-widest text-xs text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 active:scale-95"
                @click="closeModal">
                Понятно
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { models, type Model } from '@/data/models';
import ModelCard from '@/components/space/ModelCard.vue';
import { t } from '~/utils/translations';

defineEmits(['switch-tab']);

// State
const searchQuery = ref('');
const selectedGoal = ref('Все');
const selectedModel = ref<Model | null>(null);

// Categories
const goals = computed(() => {
  const allGoals = models.flatMap(m => m.relatedGoals.split(', '));
  const uniqueGoals = new Set(allGoals);
  return ['Все', ...Array.from(uniqueGoals)];
});

// Filtered Models
const filteredModels = computed(() => {
  return models.filter(model => {
    // Goal Filter (Partial match because "Память, внимание")
    const matchesGoal = selectedGoal.value === 'Все' || model.relatedGoals.includes(selectedGoal.value);

    // Search Filter
    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      model.title.toLowerCase().includes(query) ||
      model.explanation.toLowerCase().includes(query) ||
      model.relatedGoals.toLowerCase().includes(query);

    return matchesGoal && matchesSearch;
  });
});

// Methods
const openModal = (model: Model) => {
  selectedModel.value = model;
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

const closeModal = () => {
  selectedModel.value = null;
  document.body.style.overflow = '';
};

// Cleanup on Unmount
onUnmounted(() => {
  document.body.style.overflow = '';
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedGoal.value = 'Все';
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card {
  @apply text-center px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none min-w-[100px];
}
</style>
