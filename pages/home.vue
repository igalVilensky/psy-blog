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
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { computed, ref, onMounted } from "vue";
import { useFirestore } from "~/plugins/firebase";
import { fetchPosts } from "~/api/sanity/posts";
import { getPostViewCount } from "~/api/firebase/views";
import HeroSection from "~/components/home-page/HeroSection.vue";
import BlogPosts from "~/components/home-page/BlogPosts.vue";
import RecentUpdates from "~/components/home-page/RecentUpdates.vue";
import SuccessStories from "~/components/home-page/SuccessStories.vue";
import ProfilingReasons from "~/components/home-page/ProfilingReasons.vue";
import CTASection from "~/components/home-page/CTASection.vue";

const authStore = useAuthStore();
const firestore = useFirestore();
const isLoggedIn = computed(() => !!authStore.user);

const stats = ref({ testsCompleted: 0, totalTests: 5, streakDays: 0 });
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
    console.log("fetchPosts response:", initialPosts);
    blogPosts.value = Array.isArray(initialPosts.data.value)
      ? initialPosts.data.value
      : [];
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

await loadBlogPosts();

const fetchUserStats = async () => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ testsCompleted: 2, totalTests: 5, streakDays: 5 }),
      500
    );
  });
};
const fetchRecentActions = async () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
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
        ]),
      500
    );
  });
};
const fetchRecommendations = async () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: 1, text: "Завершите тест: Эмоциональный компас" },
          { id: 2, text: "Попробуйте курс: Основы осознанности" },
        ]),
      500
    );
  });
};
const fetchRecentUpdates = async () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
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
        ]),
      500
    );
  });
};
const fetchSuccessStories = async () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            quote: "Тесты помогли мне понять себя.",
            author: "Анна, 34",
          },
          {
            id: 2,
            quote: "Я стала увереннее благодаря профилю.",
            author: "Мария, 28",
          },
        ]),
      500
    );
  });
};
const fetchProfilingReasons = async () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
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
        ]),
      500
    );
  });
};

onMounted(async () => {
  recentUpdates.value = await fetchRecentUpdates();
  profilingReasons.value = await fetchProfilingReasons();
  if (isLoggedIn.value) {
    stats.value = await fetchUserStats();
    recentActions.value = await fetchRecentActions();
    recommendations.value = await fetchRecommendations();
  } else {
    successStories.value = await fetchSuccessStories();
  }
});
</script>
