<template>
  <div class="lab-home min-h-screen bg-slate-950 pb-16">
    <!-- Hero Section -->
    <section class="hero-section relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-4 sm:px-0 py-12">
        <!-- Welcome Header -->
        <div class="mb-10">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight gradient-text">
            {{
              isLoggedIn ? `Добро пожаловать, ${userName}` : "ЛАБОРАТОРИЯ РОСТА"
            }}
          </h1>
          <p class="text-cyan-300/70 text-lg leading-relaxed max-w-3xl">
            {{
              isLoggedIn
                ? "Продолжайте свой путь саморазвития и исследуйте новые возможности"
                : "Откройте свой потенциал через научно обоснованные тесты и инструменты"
            }}
          </p>
        </div>

        <!-- Stats Dashboard for Logged In Users -->
        <div v-if="isLoggedIn" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <!-- Tests Card -->
          <div class="stat-dashboard-card">
            <div class="flex items-center gap-3 mb-4">
              <div class="stat-icon-wrapper bg-gradient-to-br from-cyan-500 to-blue-600">
                <i class="fas fa-brain text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">Тесты</h3>
                <p class="text-xs text-slate-400">Когнитивный профиль</p>
              </div>
            </div>
            <div v-if="stats.tests?.completedTest" class="space-y-3">
              <div class="mb-3">
                <div class="text-sm text-slate-400 mb-2">Последний тест:</div>
                <div class="text-cyan-400 font-medium">
                  {{ stats.tests.completedTest.name }}
                </div>
              </div>
              <div v-if="stats.tests.completedTest.topArchetypes" class="space-y-2">
                <div class="text-xs text-slate-400 mb-2">Топ архетипы:</div>
                <div v-for="arch in stats.tests.completedTest.topArchetypes" :key="arch.name"
                  class="flex items-center justify-between text-sm">
                  <span class="text-white">{{ arch.name }}</span>
                  <span class="text-cyan-400 font-medium">{{ arch.score }}%</span>
                </div>
              </div>
            </div>
            <div v-else class="text-slate-400 text-sm mb-4">
              Начните с прохождения теста
            </div>
            <div v-if="stats.tests?.ctas?.length" class="flex flex-wrap gap-2 mt-4">
              <NuxtLink v-for="cta in stats.tests.ctas" :key="cta.name" :to="cta.link" class="cta-button-small">
                {{ cta.name }}
              </NuxtLink>
            </div>
          </div>

          <!-- Courses Card -->
          <div class="stat-dashboard-card">
            <div class="flex items-center gap-3 mb-4">
              <div class="stat-icon-wrapper bg-gradient-to-br from-purple-500 to-pink-600">
                <i class="fas fa-graduation-cap text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">Курсы</h3>
                <p class="text-xs text-slate-400">Обучение и развитие</p>
              </div>
            </div>
            <div v-if="stats.courses?.purchasedCourses?.length" class="space-y-3">
              <div v-for="course in stats.courses.purchasedCourses" :key="course.name" class="course-progress-item">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-white">{{ course.name }}</span>
                  <span class="text-xs text-cyan-400 font-medium">
                    {{ course.progressPercentage }}%
                  </span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${course.progressPercentage}%` }"></div>
                </div>
              </div>
            </div>
            <div v-else class="text-slate-400 text-sm mb-4">
              Исследуйте доступные курсы
            </div>
            <NuxtLink v-if="stats.courses?.cta" :to="stats.courses.cta.link" class="cta-button-small">
              Все курсы
            </NuxtLink>
          </div>

          <!-- Tools Card -->
          <div class="stat-dashboard-card">
            <div class="flex items-center gap-3 mb-4">
              <div class="stat-icon-wrapper bg-gradient-to-br from-emerald-500 to-teal-600">
                <i class="fas fa-compass text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white">Инструменты</h3>
                <p class="text-xs text-slate-400">Ежедневная практика</p>
              </div>
            </div>
            <div v-if="stats.tools?.emotionStats" class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-slate-400">Записей эмоций:</span>
                <span class="text-2xl font-bold text-emerald-400">
                  {{ stats.tools.emotionStats.totalEntries }}
                </span>
              </div>
            </div>
            <div v-else class="text-slate-400 text-sm mb-4">
              Начните отслеживать эмоции
            </div>
            <NuxtLink v-if="stats.tools?.reminder" :to="stats.tools.reminder.link"
              class="cta-button-small bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20">
              <i class="fas fa-bell mr-2"></i>
              Записать эмоции
            </NuxtLink>
            <NuxtLink v-else-if="stats.tools?.cta" :to="stats.tools.cta.link" class="cta-button-small">
              Эмоциональный компас
            </NuxtLink>
          </div>
        </div>

        <!-- CTA for Non-Logged In Users -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div class="cta-hero-card">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <i class="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-white">Начните сейчас</h3>
            </div>
            <p class="text-slate-300 mb-6 leading-relaxed">
              Создайте свой профиль и получите доступ к персонализированным
              тестам, курсам и инструментам саморазвития.
            </p>
            <NuxtLink to="/register" class="btn-primary">
              <i class="fas fa-user-plus mr-2"></i>
              Создать профиль
            </NuxtLink>
          </div>
          <div class="cta-hero-card">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <i class="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-white">Ваш рост</h3>
            </div>
            <p class="text-slate-300 mb-6 leading-relaxed">
              Отслеживайте свой прогресс, достигайте целей и получайте научно
              обоснованные рекомендации.
            </p>
            <NuxtLink to="/about" class="btn-secondary">
              <i class="fas fa-info-circle mr-2"></i>
              Узнать больше
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Notifications Section -->
    <section v-if="isLoggedIn && localNotifications.length > 0" class="max-w-6xl mx-auto px-4 sm:px-0 mb-12">
      <div class="notifications-container">
        <div class="flex items-center gap-3 mb-6">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <i class="fas fa-bell text-white"></i>
          </div>
          <h2 class="text-2xl font-bold text-white">Напоминания</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="notification in localNotifications" :key="notification.id" class="notification-card">
            <div class="flex items-start gap-4">
              <div class="notification-icon">
                <i class="fas fa-exclamation-circle text-orange-400"></i>
              </div>
              <div class="flex-1">
                <p class="text-white mb-3">{{ notification.message }}</p>
                <NuxtLink :to="notification.routePath" class="notification-cta">
                  {{ notification.ctaText }}
                  <i class="fas fa-arrow-right ml-2"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="max-w-6xl mx-auto px-4 sm:px-0 mb-12">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <i class="fas fa-newspaper text-white"></i>
          </div>
          <h2 class="text-2xl font-bold text-white">Последние статьи</h2>
        </div>
        <NuxtLink to="/blog" class="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
          Все статьи <i class="fas fa-arrow-right ml-1"></i>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="post in latestBlogPosts" :key="post._id" class="blog-card">
          <div v-if="post.mainImage" class="blog-image-wrapper">
            <img :src="post.mainImage" :alt="post.title" class="blog-image" />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="blog-category">{{ post.category || "Статья" }}</span>
              <span class="text-xs text-slate-400">•</span>
              <span class="text-xs text-slate-400">
                {{ formatDate(post.publishedAt) }}
              </span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-3 line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-sm text-slate-400 mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            <div class="flex items-center justify-between">
              <NuxtLink :to="`/blog/${post.slug?.current || post._id}`" class="blog-read-more">
                Читать далее
                <i class="fas fa-arrow-right ml-2"></i>
              </NuxtLink>
              <div v-if="post.views" class="flex items-center gap-1 text-xs text-slate-500">
                <i class="fas fa-eye"></i>
                <span>{{ post.views }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Why Profiling Section -->
    <section v-if="!isLoggedIn" class="max-w-6xl mx-auto px-4 sm:px-0 mb-12">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-white mb-4 gradient-text">
          Почему профилирование?
        </h2>
        <p class="text-slate-300 max-w-2xl mx-auto">
          Узнайте себя глубже и откройте путь к осознанному развитию
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="reason in profilingReasons" :key="reason.id" class="reason-card">
          <div class="reason-icon-wrapper">
            <i :class="`fas fa-${reason.icon} text-3xl`"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">
            {{ reason.title }}
          </h3>
          <p class="text-slate-400 leading-relaxed">
            {{ reason.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Success Stories -->
    <section v-if="!isLoggedIn && successStories.length > 0" class="max-w-6xl mx-auto px-4 sm:px-0 mb-12">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-white mb-4 gradient-text">
          Истории успеха
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="story in successStories" :key="story.id" class="success-story-card">
          <div class="mb-4">
            <i class="fas fa-quote-left text-3xl text-cyan-400/30"></i>
          </div>
          <p class="text-lg text-white mb-4 leading-relaxed">
            "{{ story.quote }}"
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500"></div>
            <div>
              <div class="text-sm font-medium text-cyan-400">
                {{ story.author }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useFirestore } from "~/composables/useFirestore";
import { fetchPosts } from "~/api/sanity/posts";
import { getPostViewCount } from "~/api/firebase/views";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { getPurchasedCourses } from "~/api/firebase/coursesApi";
import { getEmotionBarometerData } from "~/api/firebase/emotionBarometer";

const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.user);
const userName = computed(
  () =>
    authStore.user?.displayName ||
    authStore.user?.email?.split("@")[0] ||
    "Исследователь"
);

const getFirestore = () => useFirestore();

// Reactive state
const stats = ref({ tests: null, courses: null, tools: null });
const blogPosts = ref([]);
const successStories = ref([]);
const profilingReasons = ref([]);
const localNotifications = ref([]);

const latestBlogPosts = computed(() => {
  return blogPosts.value
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3);
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// --- Firestore & API functions ---
const loadBlogPosts = async () => {
  try {
    const initialPosts = await fetchPosts();
    blogPosts.value = Array.isArray(initialPosts) ? initialPosts : [];

    const fs = getFirestore();
    if (fs && blogPosts.value.length > 0) {
      await Promise.all(
        blogPosts.value.map(async (post) => {
          post.views = await getPostViewCount(fs, post._id);
        })
      );
    }
  } catch (error) {
    console.error("Failed to fetch blog posts or views:", error);
    blogPosts.value = [];
  }
};

const fetchUserStats = async (userId) => {
  const fs = getFirestore();
  if (!fs) return;

  try {
    // Latest assessment
    const assessmentResponse = await getLatestUserAssessment(fs, userId);
    if (assessmentResponse.success) {
      const scores = assessmentResponse.assessment.scores;
      const topArchetypes = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, score]) => ({ name, score }));
      stats.value.tests = {
        completedTest: { name: "Archetype Test", topArchetypes },
        ctas: [{ name: "Big 5 Test", link: "/lab/tests/big-5-model" }],
      };
    } else {
      stats.value.tests = {
        completedTest: null,
        ctas: [
          { name: "Archetype Test", link: "/tests/archetype" },
          { name: "Big 5 Test", link: "/tests/big-5" },
        ],
      };
    }

    // Courses
    const coursesResponse = await getPurchasedCourses(userId);
    if (coursesResponse.success && coursesResponse.data.length > 0) {
      stats.value.courses = {
        purchasedCourses: coursesResponse.data.map((course) => ({
          name: course.title,
          progressPercentage: course.progress.progressPercentage,
        })),
        cta: null,
      };
    } else {
      stats.value.courses = { purchasedCourses: [], cta: { link: "/courses" } };
    }

    // Emotion Barometer
    const emotionStatsResponse = await getEmotionBarometerData(fs, userId);
    if (
      emotionStatsResponse.success &&
      emotionStatsResponse.data.entries.length
    ) {
      stats.value.tools = {
        emotionStats: {
          totalEntries: emotionStatsResponse.data.entries.length,
        },
        reminder: { link: "/lab/experiments/emotional-compass" },
        cta: null,
      };
    } else {
      stats.value.tools = {
        emotionStats: null,
        reminder: null,
        cta: { link: "/lab/experiments/emotional-compass" },
      };
    }
  } catch (error) {
    console.error("Error fetching user stats:", error);
  }
};

const fetchNotifications = async (userId) => {
  if (!userId) {
    localNotifications.value = [];
    return;
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const fs = getFirestore();
    const hasEmotionalEntry = fs
      ? await checkEmotionalCompassEntry(userId, today)
      : false;

    localNotifications.value = [];
    if (!hasEmotionalEntry) {
      localNotifications.value.push({
        id: 1,
        message: "Не забудьте записать свои эмоции сегодня!",
        routePath: "/lab/experiments/emotional-compass",
        ctaText: "Записать сейчас",
      });
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    localNotifications.value = [];
  }
};

const checkEmotionalCompassEntry = async (userId, date) => {
  const fs = getFirestore();
  if (!fs) return false;
  try {
    const emotionData = await getEmotionBarometerData(fs, userId);
    if (emotionData.success) {
      const { lastUpdated } = emotionData.data;
      return lastUpdated && lastUpdated.split("T")[0] === date;
    }
    return false;
  } catch {
    return false;
  }
};


const fetchSuccessStories = async () => [
  {
    id: 1,
    quote: "Тесты помогли мне понять себя и найти направление для развития.",
    author: "Анна, 34",
  },
  {
    id: 2,
    quote: "Я стала увереннее благодаря персональному профилю и рекомендациям.",
    author: "Мария, 28",
  },
];

const fetchProfilingReasons = async () => [
  {
    id: 1,
    title: "Самопознание",
    description:
      "Узнайте свои сильные и слабые стороны через научно обоснованные тесты.",
    icon: "brain",
  },
  {
    id: 2,
    title: "Развитие",
    description:
      "Ставьте цели и отслеживайте прогресс на основе вашего уникального профиля.",
    icon: "chart-line",
  },
  {
    id: 3,
    title: "Понимание",
    description:
      "Осознайте свои эмоциональные паттерны и научитесь управлять ими.",
    icon: "heart",
  },
];

// --- On Mounted ---
onMounted(async () => {
  profilingReasons.value = await fetchProfilingReasons();
  await loadBlogPosts();

  if (isLoggedIn.value) {
    const userId = authStore.user.uid;
    await fetchUserStats(userId);
    await fetchNotifications(userId);
  } else {
    stats.value = {
      tests: {
        completedTest: null,
        ctas: [
          { name: "Archetype Test", link: "/tests/archetype" },
          { name: "Big 5 Test", link: "/tests/big-5" },
        ],
      },
      courses: { purchasedCourses: [], cta: { link: "/courses" } },
      tools: {
        emotionStats: null,
        reminder: null,
        cta: { link: "/lab/experiments/emotional-compass" },
      },
    };
    successStories.value = await fetchSuccessStories();
  }
});
</script>

<style scoped>
.lab-home {
  position: relative;
}

.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-dashboard-card {
  @apply p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300;
}

.stat-icon-wrapper {
  @apply w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0;
}

.cta-button-small {
  @apply px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50;
}

.course-progress-item {
  @apply p-3 rounded-lg bg-slate-800/30 border border-slate-700/50;
}

.cta-hero-card {
  @apply p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300;
}

.btn-primary {
  @apply px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 inline-flex items-center;
}

.btn-secondary {
  @apply px-6 py-3 rounded-xl bg-slate-800/80 border border-cyan-500/30 text-cyan-400 font-medium hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300 inline-flex items-center;
}

.notifications-container {
  @apply p-6 rounded-2xl bg-slate-900/50 border border-orange-500/20 backdrop-blur-sm;
}

.notification-card {
  @apply p-4 rounded-xl bg-slate-800/50 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300;
}

.notification-icon {
  @apply w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0;
}

.notification-cta {
  @apply text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors duration-300 inline-flex items-center;
}

.blog-card {
  @apply rounded-2xl bg-slate-900/50 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden hover:transform hover:-translate-y-1;
}

.blog-image-wrapper {
  @apply w-full h-48 overflow-hidden;
}

.blog-image {
  @apply w-full h-full object-cover transition-transform duration-500 hover:scale-110;
}

.blog-category {
  @apply px-2 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20;
}

.blog-read-more {
  @apply text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300 inline-flex items-center;
}

.reason-card {
  @apply p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 text-center hover:transform hover:-translate-y-1;
}

.reason-icon-wrapper {
  @apply w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400;
}

.success-story-card {
  @apply p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .stat-dashboard-card {
    @apply p-4;
  }

  .cta-hero-card {
    @apply p-6;
  }

  .notifications-container {
    @apply p-4;
  }

  .blog-card {
    @apply mb-4;
  }
}
</style>
