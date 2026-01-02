<template>
  <div class="bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm overflow-hidden relative">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white font-montserrat tracking-tight">
          Ежедневный Скан Состояния
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Зафиксируйте, как прошел ваш день
        </p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
        <i class="fas fa-feather-pointed text-xl"></i>
      </div>
    </div>

    <!-- Mood Selection -->
    <div class="grid grid-cols-5 gap-3 mb-8">
      <button 
        v-for="m in moods" 
        :key="m.value"
        @click="selectedMood = m.value"
        class="flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 group"
        :class="[
          selectedMood === m.value 
            ? 'border-purple-500 bg-purple-500/5 scale-105' 
            : 'border-transparent bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
        ]"
      >
        <span class="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-500" :class="{ 'grayscale-0': selectedMood === m.value }">
          {{ m.emoji }}
        </span>
        <span class="text-[10px] uppercase tracking-wider font-bold" :class="selectedMood === m.value ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'">
          {{ m.label }}
        </span>
      </button>
    </div>

    <!-- Habits -->
    <div class="mb-8">
      <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest flex items-center gap-2">
        <i class="fas fa-check-double text-emerald-500"></i>
        Достижения за сегодня
      </h3>
      <p class="text-xs text-slate-500 mb-4 italic">Отметьте то, что вы уже успели сделать сегодня</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label 
          v-for="(habit, key) in habitList" 
          :key="key"
          class="flex items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-all group"
          :class="{ 'bg-emerald-500/5 border-emerald-500/20': habits[key] }"
        >
          <div class="relative flex items-center">
            <input 
              type="checkbox" 
              v-model="habits[key]"
              class="sr-only"
            >
            <div 
              class="w-5 h-5 rounded border-2 transition-all flex items-center justify-center"
              :class="habits[key] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600'"
            >
              <i v-if="habits[key]" class="fas fa-check text-[10px] text-white"></i>
            </div>
          </div>
          <span class="ml-3 text-sm font-medium transition-colors" :class="habits[key] ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'">
            {{ habit }}
          </span>
        </label>
      </div>
    </div>

    <!-- Note -->
    <div class="mb-8">
      <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest">
        Одна важная мысль
      </label>
      <div class="relative">
        <textarea 
          v-model="note"
          rows="2"
          placeholder="Что сегодня было особенного?.."
          class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none outline-none"
        ></textarea>
        <div class="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400">
          {{ note.length }}/140
        </div>
      </div>
    </div>

    <!-- Submit -->
    <button 
      @click="submitEntry"
      :disabled="submitting || !selectedMood"
      class="w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-3"
      :class="[
        submitting || !selectedMood
          ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-50'
          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/25 scale-100 hover:scale-[1.02]'
      ]"
    >
      <i v-if="submitting" class="fas fa-circle-notch fa-spin"></i>
      <i v-else class="fas fa-paper-plane"></i>
      <span>{{ submitting ? 'Сохранение...' : 'Зафиксировать состояние' }}</span>
    </button>

    <!-- Success Feedback Overlay -->
    <Transition name="fade">
      <div v-if="showSuccess" class="absolute inset-0 bg-white/90 dark:bg-slate-900/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
        <div class="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4 text-white text-3xl animate-bounce">
          <i class="fas fa-check"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">Сохранено!</h3>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-center px-6">Ваш вклад в осознанность зафиксирован.</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['save']);

const moods = [
  { value: 1, label: 'Ужасно', emoji: '😫' },
  { value: 2, label: 'Плохо', emoji: '😔' },
  { value: 3, label: 'Нормально', emoji: '😐' },
  { value: 4, label: 'Хорошо', emoji: '🙂' },
  { value: 5, label: 'Отлично', emoji: '🤩' }
];

const habitList = {
  meditation: 'Медитация',
  exercise: 'Спорт / Прогулка',
  reading: 'Чтение',
  water: 'Норма воды',
  early_rise: 'Ранний подъем',
  healthy_food: 'Здоровое питание'
};

const selectedMood = ref(null);
const habits = reactive({
  meditation: false,
  exercise: false,
  reading: false,
  water: false,
  early_rise: false,
  healthy_food: false
});
const note = ref('');
const submitting = ref(false);
const showSuccess = ref(false);

const submitEntry = async () => {
  if (!selectedMood.value) return;
  
  submitting.value = true;
  try {
    const entry = {
      mood: selectedMood.value,
      habits: { ...habits },
      note: note.value.trim().substring(0, 140),
      timestamp: new Date()
    };
    
    emit('save', entry);
    
    // Reset form after a short delay
    setTimeout(() => {
      submitting.value = false;
      showSuccess.value = true;
      
      // Clear form
      selectedMood.value = null;
      Object.keys(habits).forEach(k => habits[k] = false);
      note.value = '';
    }, 600);

    // Auto-hide success feedback (parent will likely close modal anyway)
    setTimeout(() => {
       showSuccess.value = false;
    }, 2000);
    
  } catch (error) {
    console.error('Error saving entry:', error);
    submitting.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
