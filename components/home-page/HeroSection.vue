<template>
  <div class="hero-section">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/5 backdrop-blur-lg"
    >
      <!-- Левая колонка: Приветствие и статистика -->
      <div class="p-6 sm:p-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          {{
            isLoggedIn
              ? `С возвращением, ${userName}!`
              : "Откройте свою истинную сущность"
          }}
        </h1>
        <p class="text-lg text-slate-300 mb-8">
          {{
            isLoggedIn
              ? "Продолжайте свое путешествие к самопознанию."
              : "Пройдите наши научно обоснованные тесты личности и отправьтесь в путешествие к самопознанию."
          }}
        </p>

        <!-- Сетка статистики для авторизованных пользователей -->
        <div
          v-if="isLoggedIn"
          class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <!-- Статистика тестов -->
          <div class="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <h3 class="font-semibold text-indigo-800 mb-2">Ваши тесты</h3>
            <div v-if="stats.tests?.completedTest">
              <p class="text-gray-700 mb-2">
                {{ stats.tests.completedTest.name }}
              </p>
              <div class="mb-4">
                <div
                  v-for="(archetype, index) in stats.tests.completedTest
                    .topArchetypes"
                  :key="index"
                  class="flex justify-between items-center mb-1"
                >
                  <span class="text-sm text-gray-600">{{
                    archetype.name
                  }}</span>
                  <span class="text-sm font-medium text-gray-900"
                    >{{ Math.round(archetype.score) }}%</span
                  >
                </div>
              </div>
            </div>
            <div v-else class="text-gray-600 mb-4">Тесты еще не пройдены</div>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="cta in stats.tests?.ctas"
                :key="cta.name"
                :href="cta.link"
                class="text-sm px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                {{ cta.name }}
              </a>
            </div>
          </div>

          <!-- Статистика курсов -->
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <h3 class="font-semibold text-amber-800 mb-2">Ваши курсы</h3>
            <div v-if="stats.courses?.purchasedCourses?.length">
              <div
                v-for="(course, index) in stats.courses.purchasedCourses"
                :key="index"
                class="mb-2"
              >
                <p class="text-sm text-gray-700">{{ course.name }}</p>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    class="bg-amber-500 h-2 rounded-full"
                    :style="`width: ${course.progressPercentage}%`"
                  ></div>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-600 mb-4">
              Курсы еще не приобретены
            </div>
            <div v-if="stats.courses?.cta">
              <a
                :href="stats.courses.cta.link"
                class="text-sm px-3 py-1 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
              >
                Просмотреть курсы
              </a>
            </div>
          </div>

          <!-- Статистика инструментов -->
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <h3 class="font-semibold text-emerald-800 mb-2">
              Ваши инструменты
            </h3>
            <div v-if="stats.tools?.emotionStats">
              <p class="text-gray-700 mb-2">Барометр эмоций</p>
              <p class="text-2xl font-bold text-emerald-700 mb-2">
                {{ stats.tools.emotionStats.totalEntries }}
              </p>
              <p class="text-sm text-gray-600 mb-4">Всего записей</p>
            </div>
            <div v-else class="text-gray-600 mb-4">
              Инструменты еще не использованы
            </div>
            <div v-if="stats.tools?.cta">
              <a
                :href="stats.tools.cta.link"
                class="text-sm px-3 py-1 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
              >
                Попробовать барометр эмоций
              </a>
            </div>
            <div v-else-if="stats.tools?.reminder">
              <a
                :href="stats.tools.reminder.link"
                class="text-sm px-3 py-1 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
              >
                Записать эмоции сегодня
              </a>
            </div>
          </div>
        </div>

        <!-- Кнопки CTA для неавторизованных пользователей -->
        <div v-if="!isLoggedIn" class="flex flex-wrap gap-4 mb-8">
          <a
            href="/login"
            class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Войти
          </a>
          <a
            href="/register"
            class="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Начать
          </a>
        </div>
      </div>

      <!-- Правая колонка: Действия и рекомендации -->
      <div class="bg-gray-50 p-6 sm:p-8 rounded-r-2xl">
        <div v-if="isLoggedIn" class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Недавняя активность
          </h2>
          <ul class="space-y-3">
            <li
              v-for="action in recentActions"
              :key="action.id"
              class="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <span class="text-gray-700">{{ action.description }}</span>
              <span class="text-sm text-gray-500">{{ action.date }}</span>
            </li>
            <li
              v-if="recentActions.length === 0"
              class="p-3 bg-white rounded-lg shadow-sm text-gray-500"
            >
              Нет недавней активности
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            {{ isLoggedIn ? "Рекомендуем для вас" : "Популярные тесты" }}
          </h2>
          <ul class="space-y-3">
            <li
              v-for="rec in recommendations"
              :key="rec.id"
              class="p-3 bg-white rounded-lg shadow-sm border-l-4 border-indigo-500"
            >
              <p class="text-gray-700">{{ rec.text }}</p>
            </li>
            <li
              v-if="!isLoggedIn"
              class="p-3 bg-white rounded-lg shadow-sm border-l-4 border-amber-500"
            >
              <p class="text-gray-700">Пройти тест на архетипы</p>
            </li>
            <li
              v-if="!isLoggedIn"
              class="p-3 bg-white rounded-lg shadow-sm border-l-4 border-emerald-500"
            >
              <p class="text-gray-700">
                Попробовать оценку личности по Большой пятерке
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "~/stores/auth";

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
  recentActions: {
    type: Array,
    default: () => [],
  },
  recommendations: {
    type: Array,
    default: () => [],
  },
});

const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);
const userName = computed(() => {
  if (!authStore.user) return "";
  return authStore.user.displayName || "Пользователь";
});
</script>
