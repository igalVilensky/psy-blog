<template>
  <div
    class="relative min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-500 flex flex-col font-sans">
    <!-- Mobile Header -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white z-40 px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-stone-900 dark:bg-white flex items-center justify-center">
          <i class="fas fa-user text-white dark:text-stone-900 text-xs"></i>
        </div>
        <span class="font-bold text-stone-900 dark:text-white text-sm">Профиль</span>
      </div>
      <button @click="openSettings"
        class="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white">
        <i class="fas fa-cog text-sm"></i>
      </button>
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex min-w-0 pt-14 lg:pt-0">
      <!-- Desktop Sidebar -->
      <div
        class="hidden lg:block w-64 flex-none bg-white dark:bg-stone-900 border-r-2 border-stone-900 dark:border-white">
        <div class="p-6 border-b-2 border-stone-900 dark:border-white">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-stone-900 dark:bg-white flex items-center justify-center">
              <i class="fas fa-user text-white dark:text-stone-900 text-sm"></i>
            </div>
            <span class="font-bold text-stone-900 dark:text-white">Профиль</span>
          </div>
          <button @click="openSettings"
            class="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            <i class="fas fa-cog text-xs"></i>
            <span>Настройки</span>
          </button>
        </div>

        <nav class="p-4 space-y-2">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="w-full text-left px-4 py-3 text-sm font-semibold transition-all" :class="activeTab === tab.id
              ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'">
            <div class="flex items-center gap-3">
              <i :class="tab.icon"></i>
              <span>{{ tab.label }}</span>
            </div>
          </button>
        </nav>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto">
        <!-- Desktop Header -->
        <header
          class="hidden lg:flex h-16 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h2 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wide">
              {{ activeTabLabel }}
            </h2>
          </div>
          <div class="flex items-center gap-4">
            <div class="font-mono text-xs text-stone-500 dark:text-stone-400">
              {{ currentTime }}
            </div>
            <button @click="openSettings"
              class="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white">
              <i class="fas fa-cog"></i>
            </button>
          </div>
        </header>

        <div class="p-6 lg:p-8 space-y-8">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex items-center justify-center py-32">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
          </div>

          <!-- Overview Tab -->
          <div v-else-if="activeTab === 'overview'" class="space-y-8">
            <!-- Profile Header -->
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-16 h-16 bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
                    <img v-if="avatarUrl" :src="avatarUrl" class="w-full h-full object-cover" />
                    <i v-else class="fas fa-user text-2xl text-stone-400 dark:text-stone-600"></i>
                  </div>
                  <div>
                    <h1 class="text-2xl font-bold text-stone-900 dark:text-white">{{ authStore.user?.displayName ||
                      'Пользователь' }}</h1>
                    <p class="text-sm text-stone-500 dark:text-stone-400 mt-1">{{ authStore.user?.email }}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                        {{ authStore.user?.isCoach ? 'Коуч' : 'Пользователь' }}
                      </span>
                    </div>
                  </div>
                </div>
                <button @click="openSettings"
                  class="px-6 py-3 border border-stone-300 dark:border-stone-700 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors self-start">
                  <i class="fas fa-cog mr-2"></i>
                  Настройки
                </button>
              </div>
            </div>

            <!-- Bio Info -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div class="lg:col-span-2 space-y-6">
                <!-- Personal Info -->
                <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Личная информация</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div
                        class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                        Профессия</div>
                      <div class="text-stone-900 dark:text-white">{{ profession || 'Не указано' }}</div>
                    </div>
                    <div>
                      <div
                        class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                        Возраст</div>
                      <div class="text-stone-900 dark:text-white">{{ age || 'Не указан' }}</div>
                    </div>
                    <div>
                      <div
                        class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                        Пол</div>
                      <div class="text-stone-900 dark:text-white">{{ gender || 'Не указан' }}</div>
                    </div>
                    <div>
                      <div
                        class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                        Статус</div>
                      <div class="text-stone-900 dark:text-white">{{ authStore.user?.onboardingCompleted ?
                        'Профильнастроен' : 'Требуется настройка' }}</div>
                    </div>
                  </div>
                </div>

                <!-- About -->
                <div v-if="aboutYourself"
                  class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">О себе</h3>
                  <p class="text-stone-700 dark:text-stone-300">{{ aboutYourself }}</p>
                </div>

                <!-- Social Media -->
                <div v-if="socialMedia.length > 0"
                  class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Социальные сети</h3>
                  <div class="flex flex-wrap gap-3">
                    <a v-for="(platform, index) in socialMedia" :key="index" :href="platform.url" target="_blank"
                      class="px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-colors">
                      <i :class="getSocialIcon(platform.type)" class="mr-2"></i>
                      {{ getSocialLabel(platform.type) }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="space-y-6">
                <!-- Onboarding CTA -->
                <div v-if="!authStore.user?.onboardingCompleted"
                  class="bg-white dark:bg-stone-900 border-l-4 border-emerald-600 p-6">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-3">Персональная настройка</h3>
                  <p class="text-sm text-stone-600 dark:text-stone-400 mb-6">Пройдите опрос для индивидуального плана
                    развития</p>
                  <NuxtLink to="/onboarding"
                    class="block w-full px-6 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold text-center transition-all">
                    Начать опрос
                  </NuxtLink>
                </div>

                <!-- Profile Complete -->
                <div v-else class="bg-white dark:bg-stone-900 border-l-4 border-emerald-600 p-6">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-3">Профиль настроен</h3>
                  <p class="text-sm text-stone-600 dark:text-stone-400 mb-6">Ваша персональная карта развития построена
                  </p>
                  <NuxtLink to="/onboarding"
                    class="block w-full px-6 py-3 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 text-sm font-semibold text-center transition-all">
                    Обновить оценку
                  </NuxtLink>
                </div>

                <!-- Quick Links -->
                <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Быстрые действия</h3>
                  <div class="space-y-3">
                    <NuxtLink to="/space/dashboard"
                      class="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                      <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Центр управления</span>
                      <i class="fas fa-arrow-right text-stone-400"></i>
                    </NuxtLink>
                    <NuxtLink to="/space"
                      class="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                      <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Лаборатория</span>
                      <i class="fas fa-arrow-right text-stone-400"></i>
                    </NuxtLink>
                    <NuxtLink v-if="authStore.user?.isCoach" to="/coach"
                      class="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                      <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Панель коуча</span>
                      <i class="fas fa-arrow-right text-stone-400"></i>
                    </NuxtLink>
                    <button @click="logoutUser"
                      class="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors border border-red-200 dark:border-red-700">
                      <span class="text-sm font-semibold text-red-700 dark:text-red-300">Выйти</span>
                      <i class="fas fa-sign-out-alt text-red-400"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Flows Tab -->
          <div v-else-if="activeTab === 'flows'" class="space-y-8">
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Потоки</span>
                  </div>
                  <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
                    Публичные потоки
                  </h1>
                </div>
                <NuxtLink to="/lab/builder"
                  class="px-6 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
                  <i class="fas fa-plus mr-2"></i>
                  Создать поток
                </NuxtLink>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loadingFlows" class="flex items-center justify-center py-20">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900 dark:border-white"></div>
            </div>

            <!-- Empty State -->
            <div v-else-if="publicFlows.length === 0"
              class="text-center py-20 border-2 border-dashed border-stone-300 dark:border-stone-700">
              <i class="fas fa-stream text-4xl text-stone-300 dark:text-stone-700 mb-4"></i>
              <h3 class="text-lg font-semibold text-stone-900 dark:text-white mb-2">Нет публичных потоков</h3>
              <p class="text-stone-500 dark:text-stone-400 text-sm mb-6">
                Этот пользователь еще не опубликовал потоки.
              </p>
              <NuxtLink to="/lab/builder"
                class="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
                <i class="fas fa-plus-circle"></i>
                Создать поток
              </NuxtLink>
            </div>

            <!-- Flows Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="flow in publicFlows" :key="flow.id" @click="navigateToFlow(flow.id)"
                class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 hover:border-stone-900 dark:hover:border-white transition-colors cursor-pointer">
                <!-- Header -->
                <div class="mb-4">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white truncate">
                    {{ flow.name }}
                  </h3>
                  <p v-if="flow.description" class="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
                    {{ flow.description }}
                  </p>
                </div>

                <!-- Badges -->
                <div class="mb-4 flex flex-wrap gap-2">
                  <span
                    class="px-3 py-1 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold">
                    {{ flowTypes[flow.type] || 'Поток' }}
                  </span>
                  <span
                    class="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold">
                    {{ flowCategories[flow.category] || 'Общее' }}
                  </span>
                </div>

                <!-- Stats -->
                <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <div class="flex items-center gap-1">
                    <i class="fas fa-puzzle-piece"></i>
                    <span>{{ flow.modules?.length || 0 }} модулей</span>
                  </div>
                  <div v-if="flow.estimatedDuration" class="flex items-center gap-1">
                    <i class="fas fa-clock"></i>
                    <span>~{{ flow.estimatedDuration }} мин</span>
                  </div>
                  <div v-if="flow.timesUsed > 0" class="flex items-center gap-1">
                    <i class="fas fa-play-circle"></i>
                    <span>{{ flow.timesUsed }}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Emotions Tab -->
          <div v-else-if="activeTab === 'emotions'" class="space-y-8">
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Эмоции</span>
                  </div>
                  <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
                    Эмоциональный барометр
                  </h1>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">Всего
                  записей</div>
                <div class="text-2xl font-bold text-stone-900 dark:text-white">{{ emotionBarometerStats.totalEntries }}
                </div>
              </div>
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                  Частая эмоция</div>
                <div class="text-2xl font-bold text-stone-900 dark:text-white truncate">{{
                  emotionBarometerStats.mostCommonEmotion || 'Нет данных' }}</div>
              </div>
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">Сред.
                  интенсивность</div>
                <div class="text-2xl font-bold text-stone-900 dark:text-white">{{
                  Math.round(emotionBarometerStats.averageIntensity) }}/10</div>
              </div>
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                  Популярный тег</div>
                <div class="text-2xl font-bold text-stone-900 dark:text-white truncate">{{
                  emotionBarometerStats.mostCommonTag || 'Нет данных' }}</div>
              </div>
            </div>

            <!-- Chart -->
            <div v-if="emotionBarometerStats.totalEntries > 0"
              class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
              <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-6">Распределение эмоций</h3>
              <div class="h-64">
                <canvas ref="emotionChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Assessments Tab -->
          <div v-else-if="activeTab === 'assessments'" class="space-y-8">
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Психология</span>
                  </div>
                  <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
                    Психологический профиль
                  </h1>
                </div>
              </div>
            </div>

            <div v-if="assessmentError"
              class="text-center py-20 border-2 border-dashed border-stone-300 dark:border-stone-700">
              <i class="fas fa-exclamation-triangle text-4xl text-stone-300 dark:text-stone-700 mb-4"></i>
              <h3 class="text-lg font-semibold text-stone-900 dark:text-white mb-2">{{ assessmentError }}</h3>
            </div>

            <div v-else-if="loadingAssessments" class="flex items-center justify-center py-20">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900 dark:border-white"></div>
            </div>

            <div v-else-if="latestAssessment" class="space-y-6">
              <!-- Archetype Scores -->
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-6">Архетипы личности</h3>
                <div class="space-y-4">
                  <div v-for="archetype in archetypeScores" :key="archetype.name"
                    class="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                    <div class="flex items-center gap-3">
                      <i :class="archetype.icon" class="text-stone-600 dark:text-stone-400"></i>
                      <span class="text-sm font-semibold text-stone-900 dark:text-white">{{ archetype.name }}</span>
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="text-right">
                        <div class="text-sm font-bold text-stone-900 dark:text-white">{{ archetype.level }}/30</div>
                        <div class="text-xs text-stone-500 dark:text-stone-400">
                          {{ calculateArchetypePercentage(archetype.level) }}%
                        </div>
                      </div>
                      <button @click="handleDownload(archetype.guideUrl)"
                        class="px-4 py-2 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold transition-all">
                        <i class="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-20 border-2 border-dashed border-stone-300 dark:border-stone-700">
              <i class="fas fa-brain text-4xl text-stone-300 dark:text-stone-700 mb-4"></i>
              <h3 class="text-lg font-semibold text-stone-900 dark:text-white mb-2">Тестирование не пройдено</h3>
              <p class="text-stone-500 dark:text-stone-400 text-sm mb-6">
                Пройдите опрос, чтобы получить психологический профиль
              </p>
              <NuxtLink to="/onboarding"
                class="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
                Пройти опрос
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Notification Component -->
    <Notification v-if="notificationMessage" :message="notificationMessage" :type="notificationType"
      @close="hideNotification" class="z-50" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Chart, registerables } from "chart.js";
import { useNotification } from "~/composables/useNotification";
import Notification from "~/components/base/Notification.vue";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { fetchUserAvatarUrl } from "~/api/firebase/userProfile";

definePageMeta({
  layout: "empty",
});

// Register Chart.js plugins
Chart.register(...registerables);

const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

// Refs
const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(true);
const currentTime = ref("");
const activeTab = ref("overview");
const emotionChart = ref(null);
const chartInstance = ref(null);

// Bio Data
const profession = ref("");
const socialMedia = ref([]);
const age = ref("");
const gender = ref("");
const aboutYourself = ref("");
const avatarUrl = ref(null);

// Lab Flows Data
const publicFlows = ref([]);
const loadingFlows = ref(false);

const flowTypes = {
  routine: 'Рутина',
  protocol: 'Протокол',
  session: 'Сессия',
  custom: 'Свободный'
};

const flowCategories = {
  morning: 'Утро',
  evening: 'Вечер',
  stress: 'Стресс',
  focus: 'Фокус',
  sleep: 'Сон',
  growth: 'Рост',
  custom: 'Другое'
};

// Emotion Barometer Stats
const emotionBarometerStats = ref({
  totalEntries: 0,
  mostCommonEmotion: "",
  averageIntensity: 0,
  mostCommonTag: "",
  emotionDistribution: {},
});

// Psychological Profile Data
const latestAssessment = ref(null);
const assessmentError = ref(null);
const archetypeScores = ref([]);
const loadingAssessments = ref(false);

// Archetype Guides
const archetypeGuides = {
  воин: "https://drive.google.com/uc?export=download&id=1Z9XqjKfmXtIuPkpqFjlZf0UeK5uZd4-7",
  мудрец: "https://drive.google.com/uc?export=download&id=1jRFDKQh_LeSy_hFS-rBic-qOXhwN1w9d",
  искатель: "https://drive.google.com/uc?export=download&id=1t9Eyq6mPBA-Zh1YPkDjtnoAicYIYdnSL",
  творец: "https://drive.google.com/uc?export=download&id=1EB-sU__obr0nar984wxVEOWvMGU3LWNg",
  правитель: "https://drive.google.com/uc?export=download&id=1kC5TMJUWRAy5pKXOlW4qlAx6PXoe--2g",
  маг: "https://drive.google.com/uc?export=download&id=1r-5W_RuCHRXJX6QOXmmQT8TL7asKvGAQ",
  любовник: "https://drive.google.com/uc?export=download&id=1NzU0BGyZGTTqx_1kCnyr97CFbRIg72PN",
  шут: "https://drive.google.com/uc?export=download&id=1Vecj9bKoGI2iRulAjBSMAAe_A0A526BV",
  сирота: "https://drive.google.com/uc?export=download&id=1lqXNJNpE2S96t4bioP5ZUHd-tsu_To0B",
  опекун: "https://drive.google.com/uc?export=download&id=1MjruEXhQa24RGxpEHiuLszqbu3_1OBeY",
  простодушный: "https://drive.google.com/uc?export=download&id=1JLFEcqtBb6rT7QWW6BAwbRi0o17tAJ6E",
  бунтарь: "https://drive.google.com/uc?export=download&id=1nET_NObXciLQlL44TB_Jo6qPEmR-4Nd4",
};

const tabs = [
  { id: 'overview', label: 'Обзор', icon: 'fas fa-user' },
  { id: 'flows', label: 'Потоки', icon: 'fas fa-stream' },
  { id: 'emotions', label: 'Эмоции', icon: 'fas fa-heart' },
  { id: 'assessments', label: 'Психология', icon: 'fas fa-brain' },
];

const activeTabLabel = computed(() => {
  return tabs.find(tab => tab.id === activeTab.value)?.label || 'Профиль';
});

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTime.value = `${hours}:${minutes}:${seconds}`;
};

let timeInterval;

const openSettings = () => {
  router.push('/profile/settings');
};

const loadUserData = async () => {
  if (!authStore.user) return;

  try {
    const [avatarData, bioData, emotionData, assessmentData] = await Promise.allSettled([
      fetchUserAvatarUrl(authStore.user.uid),
      fetchBioData(authStore.user.uid),
      fetchEmotionBarometerData(authStore.user.uid),
      fetchLatestAssessment(authStore.user.uid),
    ]);

    if (avatarData.status === "fulfilled") {
      avatarUrl.value = avatarData.value;
    }

    if (emotionData.status === "rejected") {
      console.error("❌ Emotion data loading failed:", emotionData.reason);
    }

    if (assessmentData.status === "rejected") {
      console.error("❌ Assessment data loading failed:", assessmentData.reason);
    }
  } catch (error) {
    console.error("Error loading user data:", error);
    showNotification("Произошла ошибка при загрузке данных", "error");
  } finally {
    isLoading.value = false;
  }
};

const fetchBioData = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      profession.value = data.profession || "";
      socialMedia.value = Array.isArray(data.socialMedia) ? data.socialMedia : [];
      age.value = data.age || "";
      gender.value = data.gender || "";
      aboutYourself.value = data.aboutYourself || "";
    }
  } catch (error) {
    console.error("Error fetching bio data:", error);
  }
};

const fetchEmotionBarometerData = async (userId) => {
  try {
    const db = getFirestore();
    const { success, stats } = await getEmotionBarometerStats(db, userId);

    if (success) {
      emotionBarometerStats.value = stats;
    }
  } catch (error) {
    console.error("Error loading emotion barometer data:", error);
  }
};

const fetchLatestAssessment = async (userId) => {
  loadingAssessments.value = true;
  assessmentError.value = null;

  try {
    const db = getFirestore();
    const { success, assessment } = await getLatestUserAssessment(db, userId);

    if (success && assessment) {
      latestAssessment.value = assessment;
      archetypeScores.value = Object.entries(assessment.scores).map(
        ([name, level]) => ({
          name,
          level: parseFloat(level),
          icon: getIconForArchetype(name),
          guideUrl: archetypeGuides[name] || "#",
        })
      );
    } else {
      assessmentError.value = "Не удалось загрузить результаты теста.";
    }
  } catch (error) {
    console.error("Error fetching latest assessment:", error);
    assessmentError.value = "Произошла ошибка при загрузке результатов.";
  } finally {
    loadingAssessments.value = false;
  }
};

const fetchPublicFlows = async (userId) => {
  loadingFlows.value = true;
  try {
    const db = getFirestore();
    const labFlowsRef = collection(db, 'labFlows');
    const q = query(
      labFlowsRef,
      where('userId', '==', userId),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    publicFlows.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching public flows:', error);
  } finally {
    loadingFlows.value = false;
  }
};

const initializeChart = () => {
  if (!emotionChart.value || !emotionBarometerStats.value.totalEntries > 0) return;

  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  const distribution = emotionBarometerStats.value.emotionDistribution;
  const ctx = emotionChart.value.getContext("2d");

  chartInstance.value = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(distribution),
      datasets: [{
        data: Object.values(distribution),
        backgroundColor: [
          "rgba(6, 182, 212, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(34, 211, 238, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(16, 185, 129, 0.8)",
        ],
        borderColor: "rgba(15, 23, 42, 0.8)",
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "rgba(203, 213, 225, 1)",
            padding: 15,
            font: { size: 12 },
          },
        },
      },
    },
  });
};

const getSocialIcon = (type) => {
  const icons = {
    telegram: 'fab fa-telegram',
    vk: 'fab fa-vk',
    instagram: 'fab fa-instagram',
    facebook: 'fab fa-facebook',
  };
  return icons[type] || 'fas fa-link';
};

const getSocialLabel = (type) => {
  const labels = {
    telegram: 'Telegram',
    vk: 'VK',
    instagram: 'Instagram',
    facebook: 'Facebook',
  };
  return labels[type] || 'Соц. сеть';
};

const getIconForArchetype = (name) => {
  const icons = {
    творец: "fa-paint-brush",
    исследователь: "fa-compass",
    мудрец: "fa-book-open",
    воин: "fa-shield-alt",
    маг: "fa-magic",
    заботливый: "fa-heart",
    наставник: "fa-chalkboard-teacher",
    правитель: "fa-crown",
    друг: "fa-handshake",
    шут: "fa-laugh",
    мятежник: "fa-fire",
    герой: "fa-medal",
  };
  return icons[name] || "fa-question";
};

const calculateArchetypePercentage = (level) => {
  const min = 6;
  const max = 30;
  return Math.round(((level - min) / (max - min)) * 100);
};

const handleDownload = (url) => {
  if (!url || url === "#") {
    console.log("No guide available for this archetype");
    return;
  }
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const logoutUser = async () => {
  await authStore.logout();
  router.push("/login");
};

const navigateToFlow = (flowId) => {
  router.push(`/lab/flow/${flowId}`);
};

watch(activeTab, async (newTab) => {
  if (newTab === 'emotions' && emotionBarometerStats.value.totalEntries > 0) {
    await nextTick();
    initializeChart();
  }

  if (newTab === 'flows' && authStore.user && publicFlows.value.length === 0) {
    await fetchPublicFlows(authStore.user.uid);
  }

  if (newTab === 'assessments' && authStore.user && !latestAssessment.value) {
    await fetchLatestAssessment(authStore.user.uid);
  }
}, { immediate: true });

onMounted(async () => {
  await authStore.initAuth();

  if (!authStore.user) {
    router.push("/login");
    return;
  }

  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  await loadUserData();
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (chartInstance.value) chartInstance.value.destroy();
});
</script>