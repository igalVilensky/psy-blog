<!-- components/space/brain-training/ExercisesView.vue -->
<template>
  <div class="font-sans">
    <!-- Header Section -->
    <div class="mb-12">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight uppercase">
            Библиотека Упражнений
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Коллекция научно обоснованных когнитивных упражнений для развития памяти, внимания и мышления.
          </p>
        </div>

        <!-- Stats Overview -->
        <div class="flex items-center gap-4">
          <div class="stat-card">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              {{ exercises.length }}
            </div>
            <div class="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">
              Упражнений
            </div>
          </div>
          <div class="stat-card border-l-4 border-l-blue-500">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ categories.length - 1 }}
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
          <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="[
            'rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 border',
            selectedCategory === category
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/25'
              : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400'
          ]">
            {{ category }}
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full lg:w-96 group">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <i class="fas fa-search text-zinc-400 transition-colors group-focus-within:text-cyan-500"></i>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Поиск упражнения..."
            class="block w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 py-3.5 pl-11 pr-4 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-sm font-bold text-sm" />
        </div>
      </div>
    </div>

    <!-- Exercises Grid -->
    <div>
      <div v-if="filteredExercises.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ExerciseCard v-for="exercise in filteredExercises" :key="exercise.id" :exercise="exercise"
          @view-details="openModal" />
      </div>

      <!-- Empty State -->
      <div v-else
        class="text-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <div
          class="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 shadow-xl mb-8">
          <i class="fas fa-ghost text-3xl text-zinc-400"></i>
        </div>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">Ничего не найдено</h3>
        <p class="text-zinc-500 dark:text-zinc-400 font-medium">Попробуйте изменить параметры поиска или категорию.</p>
        <button @click="resetFilters"
          class="mt-8 px-8 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold uppercase tracking-widest text-xs hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white transition-all">
          Сбросить фильтры
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <Teleport to="body">
      <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <div v-if="selectedExercise"
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
                  class="rounded-lg bg-cyan-50 dark:bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {{ selectedExercise.category }}
                </span>
              </div>
              <h2 class="text-3xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tight">{{
                t(selectedExercise.title) }}</h2>
              <p class="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{{ selectedExercise.goal
                }}</p>
            </div>

            <!-- Content Grid -->
            <div class="grid gap-6 md:grid-cols-2 mb-10">
              <!-- Instruction -->
              <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 p-6 border border-zinc-200 dark:border-zinc-800">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                  <i class="fas fa-info-circle"></i> Инструкция
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                  {{ selectedExercise.instruction }}
                </p>
              </div>

              <!-- Metrics -->
              <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 p-6 border border-zinc-200 dark:border-zinc-800">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  <i class="fas fa-chart-line"></i> Метрика успеха
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                  {{ selectedExercise.metric }}
                </p>
              </div>

              <!-- Format -->
              <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 p-6 border border-zinc-200 dark:border-zinc-800">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
                  <i class="fas fa-laptop-code"></i> Формат
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                  {{ selectedExercise.format }}
                </p>
              </div>

              <!-- UI Example -->
              <div class="rounded-2xl bg-zinc-50 dark:bg-zinc-950/50 p-6 border border-zinc-200 dark:border-zinc-800">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-pink-600 dark:text-pink-400">
                  <i class="fas fa-eye"></i> Пример интерфейса
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                  {{ selectedExercise.uiExample }}
                </p>
              </div>

              <!-- Related Models -->
              <div v-if="selectedExercise.relatedModels"
                class="rounded-2xl bg-emerald-50/10 dark:bg-emerald-500/5 p-6 border border-emerald-500/20 md:col-span-2">
                <h4
                  class="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  <i class="fas fa-project-diagram"></i> Связанные ментальные модели
                </h4>
                <p class="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                  <button class="hover:text-emerald-500 transition-colors underline decoration-emerald-500/30"
                    @click="$emit('switch-tab', 'models')">
                    {{ selectedExercise.relatedModels }}
                  </button>
                </p>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex justify-end gap-4">
              <button
                class="rounded-xl bg-zinc-100 dark:bg-zinc-800 px-8 py-3.5 font-bold uppercase tracking-widest text-xs text-zinc-600 dark:text-zinc-400 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700"
                @click="closeModal">
                Закрыть
              </button>
              <NuxtLink :to="selectedExercise.link || `/space/brain-training/exercise-runner?id=${selectedExercise.id}`"
                class="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-3.5 font-bold uppercase tracking-widest text-xs text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 active:scale-95 flex items-center gap-2">
                <i class="fas fa-play"></i> Начать
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { exercises, type Exercise } from '@/data/exercises';
import ExerciseCard from '@/components/space/ExerciseCard.vue';
import { t } from '~/utils/translations';

// State
const searchQuery = ref('');
const selectedCategory = ref('Все');
const selectedExercise = ref<Exercise | null>(null);

defineEmits(['switch-tab']);

// Categories
const categories = computed(() => {
  const uniqueCategories = new Set(exercises.map(e => e.category));
  return ['Все', ...Array.from(uniqueCategories)];
});

// Filtered Exercises
const filteredExercises = computed(() => {
  const result = exercises.filter(exercise => {
    // Category Filter
    const matchesCategory = selectedCategory.value === 'Все' || exercise.category === selectedCategory.value;

    // Search Filter
    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      exercise.title.toLowerCase().includes(query) ||
      exercise.goal.toLowerCase().includes(query) ||
      exercise.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return result.sort((a, b) => {
    // 1. Availability (has valid link)
    const aLink = a.link && a.link.trim().length > 0;
    const bLink = b.link && b.link.trim().length > 0;

    if (aLink && !bLink) return -1;
    if (!aLink && bLink) return 1;

    // 2. Secondary Sort: ID (Newer/Higher IDs first? or simple ID order)
    // Let's sort existing ones by ID or Title.
    // Going with ID asc for stability.
    return a.id - b.id;
  });
});


// Methods
const openModal = (exercise: Exercise) => {
  selectedExercise.value = exercise;
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

const closeModal = () => {
  selectedExercise.value = null;
  document.body.style.overflow = '';
};

// Cleanup on Unmount
onUnmounted(() => {
  document.body.style.overflow = '';
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'Все';
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
