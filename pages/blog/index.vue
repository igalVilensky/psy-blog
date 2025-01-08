<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-20">
        <div
          class="inline-block px-6 py-2 bg-gradient-to-b from-[#1A1F35] to-indigo-600 rounded-full text-white font-medium mb-6 shadow-lg"
        >
          Блог
        </div>
        <h1 class="text-5xl font-bold text-gray-800 mb-6 tracking-tight">
          Блог о Развитии и Трансформации
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Исследуйте идеи, подходы и практический опыт, которые помогут вам
          раскрыть свой потенциал и достичь значимых перемен в жизни.
        </p>
      </section>

      <!-- Menu Tabs with Animation -->
      <div class="mb-16">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeTab = category"
            :class="[
              'px-6 py-3 rounded-full transition-all duration-300 font-medium relative overflow-hidden group',
              activeTab === category
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200 hover:text-white ',
            ]"
          >
            <span class="relative z-10">{{ category }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              :class="{ 'scale-x-100': activeTab === category }"
            ></div>
          </button>
        </div>
      </div>

      <!-- Blog Posts Grid with Animation -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <nuxt-link
          v-for="post in filteredPosts"
          :key="post._id"
          :to="`/blog/${post.slug.current}`"
          @click="incrementViewCount(post._id)"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
        >
          <div class="relative overflow-hidden">
            <nuxt-img
              v-if="post.image"
              :src="urlFor(post?.image)?.width(550).height(310).url()"
              :alt="post.title"
              class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              width="550"
              height="310"
              loading="lazy"
              format="webp"
              quality="80"
            />
            <!-- Category badge with gradient -->
            <span
              :class="[
                'absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium shadow-md backdrop-blur-sm text-white',
                {
                  'bg-emerald-500/80 border border-emerald-200':
                    post.category === 'Личностный рост',
                  'bg-purple-500/80 border border-purple-200':
                    post.category === 'Отношения',
                  'bg-blue-500/80 border border-blue-200':
                    post.category === 'Продуктивность',
                  'bg-gray-500/80 border border-gray-200': !post.category,
                },
              ]"
            >
              {{ post.category }}
            </span>
          </div>

          <div class="p-8">
            <h2
              class="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300"
            >
              {{ post.title }}
            </h2>

            <!-- Metadata row with enhanced styling -->
            <div
              class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100"
            >
              <!-- Views count -->
              <div class="flex items-center space-x-1.5">
                <i class="far fa-eye text-indigo-400"></i>
                <span>{{ post.views || 0 }}</span>
              </div>

              <!-- Reading time -->
              <div class="flex items-center space-x-1.5">
                <i class="far fa-clock text-indigo-400"></i>
                <span>{{ post.readtime }} мин</span>
              </div>

              <!-- Date with custom formatting -->
              <div class="flex items-center space-x-1.5">
                <i class="far fa-calendar text-indigo-400"></i>
                <span>{{
                  new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                  })
                }}</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <i class="fas fa-search text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Публикации не найдены
        </h3>
        <p class="text-gray-500">
          В данной категории пока нет публикаций. Пожалуйста, выберите другую
          категорию.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useFirestore } from "~/plugins/firebase";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { incrementPostViewCount, getPostViewCount } from "~/api/firebase/views";

const firestore = useFirestore();

const incrementViewCount = async (postId) => {
  await incrementPostViewCount(firestore, postId);
};

const initialPosts = await fetchPosts();
const posts = ref(initialPosts.data || []);
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

const categories = ref([
  "Все",
  "Личностный рост",
  "Отношения",
  "Продуктивность",
]);

const activeTab = ref("Все");

onMounted(async () => {
  try {
    await Promise.all(
      posts.value.map(async (post) => {
        post.views = await getPostViewCount(firestore, post._id);
      })
    );
  } catch (error) {
    console.error("Failed to fetch views:", error);
  }
});

const filteredPosts = computed(() => {
  if (!posts.value) return [];
  if (activeTab.value === "Все") {
    return posts.value;
  }
  return posts.value.filter((post) => post.category === activeTab.value);
});
</script>

<style scoped>
/* Optional: Add smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}

/* Optional: Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
