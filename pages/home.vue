<template>
  <div class="min-h-screen">
    <!-- Hero Section (Full Width) -->
    <header class="pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 xl:px-0">
      <div class="container mx-auto max-w-6xl">
        <HeroSection
          :stats="stats"
          :recent-actions="recentActions"
          :recommendations="recommendations"
          class="rounded-2xl shadow-xl overflow-hidden"
        />
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="px-6 xl:px-0 pb-20">
      <div class="container mx-auto max-w-6xl">
        <!-- Two-Column Layout: Notifications and Recent Updates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <NotificationsSection
            :notifications="notifications"
            class="rounded-xl shadow-md"
          />
          <RecentUpdates
            :updates="recentUpdates"
            class="rounded-xl shadow-md"
          />
        </div>

        <!-- Daily Growth Spark Summary (Full Width) -->
        <section class="mb-16">
          <DailyGrowthSparkSummary class="rounded-xl shadow-md" />
        </section>

        <!-- Blog Posts (Full Width) -->
        <section class="mb-16">
          <BlogPosts :posts="latestBlogPosts" class="rounded-xl shadow-md" />
        </section>

        <!-- Success Stories for Non-Logged-In Users (Full Width) -->
        <section v-if="!isLoggedIn" class="mb-16">
          <SuccessStories
            :stories="successStories"
            class="rounded-xl shadow-md"
          />
        </section>

        <!-- Why Profiling Section (Grid Layout) -->
        <section class="mb-16">
          <ProfilingReasons
            :reasons="profilingReasons"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          />
        </section>

        <!-- CTA Section for Non-Logged-In Users (Full Width) -->
        <section v-if="!isLoggedIn">
          <CTASection
            class="bg-indigo-600 text-white rounded-xl shadow-lg p-8"
          />
        </section>
      </div>
    </main>

    <!-- Daily Growth Spark (Floating Component) -->
    <DailyGrowthSpark class="fixed bottom-6 right-6 z-50" />
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { computed, ref, onMounted } from "vue";
import { useFirestore } from "~/plugins/firebase";
import { fetchPosts } from "~/api/sanity/posts";
import { getPostViewCount } from "~/api/firebase/views";
import { getLatestUserAssessment } from "~/api/firebase/assessments";
import { getPurchasedCourses } from "~/api/firebase/coursesApi";
import { getEmotionBarometerStats } from "~/api/firebase/emotionBarometer";
import HeroSection from "~/components/home-page/HeroSection.vue";
import BlogPosts from "~/components/home-page/BlogPosts.vue";
import RecentUpdates from "~/components/home-page/RecentUpdates.vue";
import SuccessStories from "~/components/home-page/SuccessStories.vue";
import ProfilingReasons from "~/components/home-page/ProfilingReasons.vue";
import CTASection from "~/components/home-page/CTASection.vue";
import NotificationsSection from "~/components/home-page/NotificationsSection.vue";
import DailyGrowthSpark from "~/components/growth-spark/DailyGrowthSpark.vue";
import DailyGrowthSparkSummary from "~/components/growth-spark/DailyGrowthSparkSummary.vue";

const authStore = useAuthStore();
const firestore = useFirestore();
const isLoggedIn = computed(() => !!authStore.user);

const stats = ref({
  tests: null,
  courses: null,
  tools: null,
});
const recentActions = ref([]);
const recommendations = ref([]);
const blogPosts = ref([]);
const recentUpdates = ref([]);
const successStories = ref([]);
const profilingReasons = ref([]);
const notifications = ref([]);

const fetchNotifications = async (userId) => {
  if (!userId) {
    notifications.value = [];
    return;
  }
  const today = new Date().toISOString().split("T")[0];
  const hasEmotionalEntry = await checkEmotionalCompassEntry(userId, today);
  const hasDailySpark = await checkDailySparkCompletion(userId, today);

  notifications.value = [];
  if (!hasEmotionalEntry) {
    notifications.value.push({
      id: 1,
      message: "Don't forget to log your emotions today!",
      link: "/tools/emotion-barometer",
      ctaText: "Log Now",
    });
  }
  if (!hasDailySpark) {
    notifications.value.push({
      id: 2,
      message: "Complete your Daily Spark task for a bonus!",
      link: "/daily-spark",
      ctaText: "Start Now",
    });
  }
};

const latestBlogPosts = computed(() => {
  return blogPosts.value
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3);
});

const loadBlogPosts = async () => {
  try {
    const initialPosts = await fetchPosts();
    blogPosts.value = Array.isArray(initialPosts) ? initialPosts : [];
    if (blogPosts.value.length > 0) {
      await Promise.all(
        blogPosts.value.map(async (post) => {
          post.views = await getPostViewCount(firestore, post._id);
        })
      );
    }
  } catch (error) {
    console.error("Failed to fetch blog posts or views:", error);
    blogPosts.value = [];
  }
};

const fetchUserStats = async (userId) => {
  const assessmentResponse = await getLatestUserAssessment(firestore, userId);
  if (assessmentResponse.success) {
    const scores = assessmentResponse.assessment.scores;
    const topArchetypes = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, score]) => ({ name, score }));
    stats.value.tests = {
      completedTest: { name: "Archetype Test", topArchetypes },
      ctas: [{ name: "Big 5 Test", link: "/awareness-tools/big-5-model" }],
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
    stats.value.courses = {
      purchasedCourses: [],
      cta: { link: "/courses" },
    };
  }

  const emotionStatsResponse = await getEmotionBarometerStats(
    firestore,
    userId
  );
  if (
    emotionStatsResponse.success &&
    emotionStatsResponse.stats.totalEntries > 0
  ) {
    stats.value.tools = {
      emotionStats: { totalEntries: emotionStatsResponse.stats.totalEntries },
      reminder: { link: "/tools/emotion-barometer" },
      cta: null,
    };
  } else {
    stats.value.tools = {
      emotionStats: null,
      reminder: null,
      cta: { link: "/tools/emotion-barometer" },
    };
  }
};

const fetchRecentActions = async () => {
  return [
    {
      id: 1,
      description: "Завершили тест: Большая пятёрка",
      date: "02.03.2025",
    },
    {
      id: 2,
      description: "Начали тест: Эмоциональный компас",
      date: "01.03.2025",
    },
  ];
};

const fetchRecommendations = async () => {
  return [
    { id: 1, text: "Завершите тест: Эмоциональный компас" },
    { id: 2, text: "Попробуйте курс: Основы осознанности" },
  ];
};

const fetchRecentUpdates = async () => {
  return [
    {
      id: 1,
      title: "Новый тест",
      description: "Добавлен тест на стрессоустойчивость.",
    },
    {
      id: 2,
      title: "Обновление",
      description: "Большая пятёрка теперь с пояснениями.",
    },
  ];
};

const fetchSuccessStories = async () => {
  return [
    { id: 1, quote: "Тесты помогли мне понять себя.", author: "Анна, 34" },
    {
      id: 2,
      quote: "Я стала увереннее благодаря профилю.",
      author: "Мария, 28",
    },
  ];
};

const fetchProfilingReasons = async () => {
  return [
    {
      id: 1,
      title: "Самопознание",
      description: "Узнайте свои сильные и слабые стороны.",
      icon: "brain",
    },
    {
      id: 2,
      title: "Развитие",
      description: "Ставьте цели, основанные на вашем профиле.",
      icon: "target",
    },
    {
      id: 3,
      title: "Понимание",
      description: "Осознайте свои эмоциональные паттерны.",
      icon: "heart",
    },
  ];
};

onMounted(async () => {
  recentUpdates.value = await fetchRecentUpdates();
  profilingReasons.value = await fetchProfilingReasons();
  await loadBlogPosts();

  if (isLoggedIn.value) {
    const userId = authStore.user.uid;
    await fetchUserStats(userId);
    await fetchNotifications(userId);
    recentActions.value = await fetchRecentActions();
    recommendations.value = await fetchRecommendations();
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
        cta: { link: "/tools/emotion-barometer" },
      },
    };
    successStories.value = await fetchSuccessStories();
    notifications.value = [];
  }
});

const checkEmotionalCompassEntry = async (userId, date) => {
  const emotionStats = await getEmotionBarometerStats(firestore, userId);
  return emotionStats.success && emotionStats.stats.lastEntryDate === date;
};

const checkDailySparkCompletion = async (userId, date) => {
  return false; // Placeholder
};
</script>
