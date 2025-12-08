<template>
  <div class="px-4 py-8 sm:px-6 lg:px-8 font-sans">
    <!-- Header Section -->
    <div class="mx-auto max-w-7xl text-center mb-12">
      <h1 class="mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 dark:from-purple-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl animate-fade-in-up">
        Менталитека
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        Коллекция из 20 фундаментальных когнитивных моделей для эффективного мышления и обучения.
      </p>
    </div>

    <!-- Controls Section -->
    <div class="mx-auto mb-12 max-w-7xl">
      <div class="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        
        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="goal in goals"
            :key="goal"
            @click="selectedGoal = goal"
            :class="[
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              selectedGoal === goal
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            {{ goal }}
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
            placeholder="Поиск модели..."
            class="block w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 py-3 pl-10 pr-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 backdrop-blur focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors shadow-sm"
          />
        </div>
      </div>
    </div>

    <!-- Models Grid -->
    <div class="mx-auto max-w-7xl">
      <div v-if="filteredModels.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ModelCard
          v-for="model in filteredModels"
          :key="model.id"
          :model="model"
          @view-details="openModal"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/50 mb-6">
          <i class="fas fa-brain text-3xl text-slate-400"></i>
        </div>
        <h3 class="text-xl font-medium text-slate-900 dark:text-white mb-2">Ничего не найдено</h3>
        <p class="text-slate-500 dark:text-slate-400">Попробуйте изменить параметры поиска или категорию.</p>
        <button 
            @click="resetFilters"
            class="mt-6 px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
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
        v-if="selectedModel" 
        class="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto overflow-x-hidden p-4 pt-24 md:p-4 bg-slate-900/20 dark:bg-slate-900/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="relative w-full max-w-3xl transform rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e293b] p-8 shadow-2xl transition-all">
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
                     <span class="rounded-full bg-purple-50 dark:bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-300">
                        {{ selectedModel.relatedGoals }}
                    </span>
                </div>
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">{{ selectedModel.title }}</h2>
                <p class="text-lg text-slate-600 dark:text-slate-300">{{ selectedModel.explanation }}</p>
            </div>

            <!-- Visual Content -->
            <div class="mb-8 rounded-xl bg-slate-50 dark:bg-slate-900/50 p-6 border border-slate-200 dark:border-white/5 text-center">
                 <h4 class="mb-2 text-sm font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    <i class="fas fa-eye mr-2"></i> Визуализация
                </h4>
                <p class="text-xl font-mono text-slate-700 dark:text-slate-200">
                    {{ selectedModel.visualization }}
                </p>
            </div>

            <!-- Details Grid -->
            <div class="grid gap-6 md:grid-cols-2 mb-8">
                <!-- Example -->
                <div class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                        <i class="fas fa-lightbulb"></i> Пример из жизни
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {{ selectedModel.example }}
                    </p>
                </div>

                <!-- Application -->
                <div class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <i class="fas fa-check-circle"></i> Как применять
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm">
                        {{ selectedModel.application }}
                    </p>
                </div>

                <!-- Related Exercises -->
                <div v-if="selectedModel.relatedExercises" class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                        <i class="fas fa-dumbbell"></i> Упражнения
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm">
                         <NuxtLink to="/lab/exercises" class="hover:underline text-rose-600 dark:text-rose-300">{{ selectedModel.relatedExercises }}</NuxtLink>
                    </p>
                </div>

                 <!-- Related Tests -->
                 <div v-if="selectedModel.relatedTests" class="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-white/5">
                    <h4 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                        <i class="fas fa-vial"></i> Тесты
                    </h4>
                    <p class="text-slate-700 dark:text-slate-300 text-sm">
                        <NuxtLink to="/lab/tests" class="hover:underline text-blue-600 dark:text-blue-300">{{ selectedModel.relatedTests }}</NuxtLink>
                    </p>
                </div>
            </div>

            <!-- Action Button -->
            <div class="flex justify-end">
                <button 
                  class="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:opacity-90 active:scale-95"
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
import { ref, computed, onUnmounted } from 'vue';
import { models, type Model } from '@/data/models';
import ModelCard from '@/components/lab/ModelCard.vue';

definePageMeta({
  layout: 'laboratory'
});

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
</style>
