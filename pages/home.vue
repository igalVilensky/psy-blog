<template>
  <div class="min-h-screen mt-12 sm:mt-24">
    <HeroSection
      :stats="stats"
      :recent-actions="recentActions"
      :recommendations="recommendations"
    />
    <section class="pb-20 pt-16 px-4 sm:px-6 lg:px-0 relative overflow-hidden">
      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BlogPosts :posts="latestBlogPosts" />
          <RecentUpdates :updates="recentUpdates" />
        </div>
        <SuccessStories v-if="!isLoggedIn" :stories="successStories" />
      </div>
    </section>
    <ProfilingReasons :reasons="profilingReasons" />
    <CTASection v-if="!isLoggedIn" />
  </div>
  <DailyGrowthSpark />
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
import DailyGrowthSpark from "~/components/growth-spark/DailyGrowthSpark.vue";

const authStore = useAuthStore();
const firestore = useFirestore();
const isLoggedIn = computed(() => !!authStore.user);

const stats = ref({
  tests: null, // { completedTest: { name, topArchetypes }, ctas: [{ name, link }] }
  courses: null, // { purchasedCourses: [{ name, progressPercentage }], cta: { link } }
  tools: null, // { emotionStats: { totalEntries }, reminder: { link }, cta: { link } }
});
const recentActions = ref([]);
const recommendations = ref([]);
const blogPosts = ref([]);
const recentUpdates = ref([]);
const successStories = ref([]);
const profilingReasons = ref([]);

const latestBlogPosts = computed(() => {
  return blogPosts.value
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3);
});

const loadBlogPosts = async () => {
  try {
    const initialPosts = await fetchPosts();
    // Check if initialPosts is an array directly
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

// Fetch stats for logged-in users
const fetchUserStats = async (userId) => {
  // Assessments (Archetype Test)
  const assessmentResponse = await getLatestUserAssessment(firestore, userId);
  if (assessmentResponse.success) {
    const scores = assessmentResponse.assessment.scores;
    const topArchetypes = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, score]) => ({ name, score }));
    stats.value.tests = {
      completedTest: { name: "Archetype Test", topArchetypes },
      ctas: [{ name: "Big 5 Test", link: "/tests/big-5" }],
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
    stats.value.courses = {
      purchasedCourses: [],
      cta: { link: "/courses" },
    };
  }

  // Emotion Barometer
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

// Mock fetch functions for non-logged-in users
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
    },
    {
      id: 2,
      title: "Развитие",
      description: "Ставьте цели, основанные на вашем профиле.",
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
  }
});
</script>
