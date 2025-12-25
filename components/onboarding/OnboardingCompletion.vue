<template>
  <div class="space-y-8 text-center">
    <div class="space-y-4">
      <div
        class="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
        <i class="fas fa-check text-3xl text-white"></i>
      </div>

      <h2 class="text-3xl font-bold text-slate-900 dark:text-white">
        Настройка завершена!
      </h2>
      <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        Мы создали ваш персональный профиль. Ниже — краткое резюме и практические рекомендации.
      </p>
    </div>

    <!-- AI Summary Card -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 text-left relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16"></div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-12 space-y-4">
        <i class="fas fa-circle-notch fa-spin text-3xl text-cyan-500"></i>
        <p class="text-slate-500 dark:text-slate-400 animate-pulse">
          Загружаем персональное резюме...
        </p>
      </div>

      <div v-else class="relative z-10 space-y-6">
        <div class="prose dark:prose-invert max-w-none">
          <h3 class="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">
            <i class="fas fa-robot mr-2"></i>Ваш профиль
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            {{ summary?.summary || defaultText }}
          </p>
        </div>

        <div v-if="summary?.recommendations?.length" class="space-y-3">
          <h4 class="font-semibold text-slate-900 dark:text-white">
            Рекомендации для старта:
          </h4>
          <ul class="space-y-2">
            <li v-for="(rec, idx) in summary.recommendations" :key="idx"
              class="flex items-start gap-3 text-slate-600 dark:text-slate-400">
              <i class="fas fa-star text-yellow-400 mt-1 shrink-0"></i>
              <span>{{ rec }}</span>
            </li>
          </ul>
        </div>

        <div v-if="summary?.strengths?.length" class="space-y-2">
          <h4 class="font-semibold text-slate-900 dark:text-white">Сильные стороны</h4>
          <div class="flex gap-2 flex-wrap">
            <span v-for="(s, i) in summary.strengths" :key="i"
              class="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-200">
              {{ s }}
            </span>
          </div>
        </div>

        <div v-if="summary?.risks?.length" class="space-y-2">
          <h4 class="font-semibold text-red-600">На что обратить внимание</h4>
          <ul class="text-sm text-slate-600 dark:text-slate-400">
            <li v-for="(r, i) in summary.risks" :key="i">• {{ r }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pt-4">
      <button @click="finish"
        class="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200">
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
const defaultText = 'Спасибо за ваши ответы! Мы подготовили персональные рекомендации, которые помогут вам начать работу с вашими целями.';

onMounted(async () => {
  if (!authStore.user) {
    loading.value = false;
    return;
  }

  try {
    const uid = authStore.user.uid;
    const summaryRef = doc(db, 'users', uid, 'aiSummary', 'latest');
    const snap = await getDoc(summaryRef);

    if (snap.exists()) {
      summary.value = snap.data();
    } else {
      // If summary does not exist yet (edge-case), show fallback message
      summary.value = {
        summary: defaultText,
        recommendations: [
          'Попробуйте утренние медитации для настройки на день',
          'Ведите краткий дневник эмоций: 1–2 минуты',
          'Начните с коротких практик по 3–5 минут'
        ]
      };
    }
  } catch (e) {
    console.error('Error fetching AI summary:', e);
    summary.value = {
      summary: defaultText,
      recommendations: [
        'Попробуйте утренние медитации для настройки на день',
        'Ведите краткий дневник эмоций: 1–2 минуты',
        'Начните с коротких практик по 3–5 минут'
      ]
    };
  } finally {
    loading.value = false;
  }
});

const finish = () => {
  // Navigate to profile - prefer username route if available
  if (authStore.user?.displayName) {
    const username = authStore.user.displayName.replace(/\s/g, '-');
    router.push(`/profile/${username}`);
  } else {
    router.push('/profile');
  }
};
</script>
