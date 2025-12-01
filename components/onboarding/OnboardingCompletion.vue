<template>
  <div class="space-y-8 text-center">
    <div class="space-y-4">
      <div class="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
        <i class="fas fa-check text-3xl text-white"></i>
      </div>
      
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white">
        Настройка завершена!
      </h2>
      <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        Мы создали ваш персональный профиль. Вот краткое резюме вашего пути:
      </p>
    </div>

    <!-- AI Summary Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 text-left relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16"></div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-12 space-y-4">
        <i class="fas fa-circle-notch fa-spin text-3xl text-cyan-500"></i>
        <p class="text-slate-500 dark:text-slate-400 animate-pulse">
          Анализируем ваши ответы...
        </p>
      </div>

      <div v-else class="relative z-10 space-y-6">
        <div class="prose dark:prose-invert max-w-none">
          <h3 class="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">
            <i class="fas fa-robot mr-2"></i>Ваш профиль
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            {{ summary?.summary || 'Не удалось загрузить резюме.' }}
          </p>
        </div>

        <div v-if="summary?.recommendations?.length" class="space-y-3">
          <h4 class="font-semibold text-slate-900 dark:text-white">
            Рекомендации для старта:
          </h4>
          <ul class="space-y-2">
            <li 
              v-for="(rec, idx) in summary.recommendations" 
              :key="idx"
              class="flex items-start gap-3 text-slate-600 dark:text-slate-400"
            >
              <i class="fas fa-star text-yellow-400 mt-1 shrink-0"></i>
              <span>{{ rec }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pt-4">
      <button
        @click="finish"
        class="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200"
      >
        Перейти в профиль
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const router = useRouter();
const authStore = useAuthStore();
const db = getFirestore();

const loading = ref(true);
const summary = ref(null);

onMounted(async () => {
  if (!authStore.user) return;

  // Poll for AI summary or fetch it directly if already ready
  // For now, we'll try to fetch it from Firestore where the server should have saved it
  // Or we can just wait a bit if it's being generated async
  
  try {
    // Wait a moment for the server to process (simulated)
    // In a real app, we might listen to a document change or just fetch
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const summaryRef = doc(db, 'users', authStore.user.uid, 'aiSummary', 'latest');
    const snap = await getDoc(summaryRef);
    
    if (snap.exists()) {
      summary.value = snap.data();
    } else {
      // Fallback if not ready yet or failed
      summary.value = {
        summary: 'Спасибо за ваши ответы! Мы подготовили для вас персональные рекомендации, которые помогут вам достичь ваших целей.',
        recommendations: [
          'Попробуйте утренние медитации для настройки на день',
          'Используйте дневник эмоций для отслеживания прогресса',
          'Начните с коротких практик по 5 минут'
        ]
      };
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const finish = () => {
  if (authStore.user?.displayName) {
    const username = authStore.user.displayName.replace(/\s/g, '-');
    router.push(`/profile/${username}`);
  } else {
    router.push('/profile');
  }
};
</script>
