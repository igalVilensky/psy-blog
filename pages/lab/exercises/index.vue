<template>
  <div class="px-4 py-8 sm:px-6 lg:px-8 font-sans">
    <!-- Header Section -->
    <div class="mx-auto max-w-7xl text-center mb-12">
      <h1 class="mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl animate-fade-in-up">
        Библиотека упражнений
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        Коллекция из 50 когнитивных упражнений для развития памяти, внимания, мышления и скорости реакции.
      </p>
    </div>

    <!-- Controls Section -->
    <div class="mx-auto mb-12 max-w-7xl">
      <div class="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        
        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full lg:w-96">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="fas fa-search text-slate-400"></i>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск упражнения..."
            class="block w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 py-3 pl-10 pr-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 backdrop-blur focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors shadow-sm"
          />
        </div>
      </div>
    </div>

    <!-- Exercises Grid -->
    <div class="mx-auto max-w-7xl">
      <div v-if="filteredExercises.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ExerciseCard
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          :exercise="exercise"
          @view-details="openModal"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/50 mb-6">
          <i class="fas fa-search text-3xl text-slate-400"></i>
        </div>
        <h3 class="text-xl font-medium text-slate-900 dark:text-white mb-2">Ничего не найдено</h3>
        <p class="text-slate-500 dark:text-slate-400">Попробуйте изменить параметры поиска или категорию.</p>
        <button 
            @click="resetFilters"
            class="mt-6 px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
        >
            Сбросить фильтры
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 backdrop-blur-none"
      enter-to-class="opacity-100 backdrop-blur-sm"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 backdrop-blur-sm"
      leave-to-class="opacity-0 backdrop-blur-none"
    >
      <div 
        v-if="selectedExercise" 
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 bg-slate-900/20 dark:bg-slate-900/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="relative w-full max-w-2xl transform rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e293b] p-8 shadow-2xl transition-all">
            <!-- Close Button -->
            <button 
                @click="closeModal"
                class="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition"
            >
                <i class="fas fa-times text-xl"></i>
            </button>

            <!-- Header -->
            <div class="mb-8 border-b border-slate-100 dark:border-white/5 pb-6">
                <div class="flex items-center gap-3 mb-4">
                     <span class="rounded-full bg-indigo-50 dark:bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300">
                        {{ selectedExercise.category }}
                    </span>
                </div>
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">{{ selectedExercise.title }}</h2>
                <p class="text-lg text-slate-600 dark:text-slate-300">{{ selectedExercise.goal }}</p>
            </div>

            <!-- Content Grid -->
            <div class="grid gap-6 md:grid-cols-2 mb-8">
                <!-- Instruction -->
                <div class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                        <i class="fas fa-info-circle"></i> Инструкция
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {{ selectedExercise.instruction }}
                    </p>
                </div>

                <!-- Metrics -->
                <div class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        <i class="fas fa-chart-line"></i> Метрика успеха
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm">
                        {{ selectedExercise.metric }}
                    </p>
                </div>

                <!-- Format -->
                <div class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        <i class="fas fa-laptop-code"></i> Формат
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm">
                        {{ selectedExercise.format }}
                    </p>
                </div>

                 <!-- UI Example -->
                 <div class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                        <i class="fas fa-eye"></i> Пример интерфейса
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm">
                        {{ selectedExercise.uiExample }}
                    </p>
                </div>
            </div>

            <!-- Action Button -->
            <div class="flex justify-end">
                <button 
                  class="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:opacity-90 active:scale-95"
                  @click="closeModal"
                >
                  Понятно
                </button>
            </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { exercises, type Exercise } from '@/data/exercises';
import ExerciseCard from '@/components/lab/ExerciseCard.vue';

definePageMeta({
  layout: 'laboratory'
});

// State
const searchQuery = ref('');
const selectedCategory = ref('Все');
const selectedExercise = ref<Exercise | null>(null);

// Categories
const categories = computed(() => {
  const uniqueCategories = new Set(exercises.map(e => e.category));
  return ['Все', ...Array.from(uniqueCategories)];
});

// Filtered Exercises
const filteredExercises = computed(() => {
  return exercises.filter(exercise => {
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
</style>
