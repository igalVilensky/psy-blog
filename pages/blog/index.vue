<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#0F172A]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-float"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-float-delay"
        ></div>
        <!-- Animated Grid -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]/80"
        >
          <div class="absolute inset-0 bg-grid-white/[0.02] animate-grid"></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-7xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <!-- <div
          class="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium mb-6 backdrop-blur-sm border border-white/10"
        >
          Блог
        </div> -->
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 tracking-tight mb-6"
        >
          Блог о Развитии и Трансформации
        </h1>
        <p
          class="text-lg sm:text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed"
        >
          Исследуйте идеи, подходы и практический опыт, которые помогут вам
          раскрыть свой потенциал и достичь значимых перемен в жизни.
        </p>
      </section>

      <!-- Menu Tabs -->
      <div class="mb-16">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeTab = category"
            :class="[
              'px-6 py-3 rounded-full transition-all duration-300 font-medium relative overflow-hidden group backdrop-blur-sm',
              activeTab === category
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/10 text-indigo-200 border border-indigo-500/20',
            ]"
          >
            <span class="relative z-10">{{ category }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              :class="{ 'scale-x-100': activeTab === category }"
            ></div>
          </button>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <nuxt-link
          v-for="post in filteredPosts"
          :key="post._id"
          :to="`/blog/${post.slug.current}`"
          @click="incrementViewCount(post._id)"
          class="group bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
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
            <!-- Category badge -->
            <span
              :class="[
                'absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium shadow-md backdrop-blur-sm border border-white/10',
                {
                  'bg-emerald-500/80': post.category === 'Личностный рост',
                  'bg-purple-500/80': post.category === 'Отношения',
                  'bg-blue-500/80': post.category === 'Продуктивность',
                  'bg-gray-500/80': !post.category,
                },
              ]"
              class="text-white"
            >
              {{ post.category }}
            </span>
          </div>

          <div class="p-8">
            <h2
              class="text-xl font-bold text-white/90 mb-4 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300"
            >
              {{ post.title }}
            </h2>

            <!-- Metadata row -->
            <div
              class="flex items-center justify-between text-sm text-indigo-200/60 pt-4 border-t border-indigo-500/20"
            >
              <div class="flex items-center space-x-1.5">
                <i class="far fa-eye text-indigo-400"></i>
                <span>{{ post.views || 0 }}</span>
              </div>
              <div class="flex items-center space-x-1.5">
                <i class="far fa-clock text-indigo-400"></i>
                <span>{{ post.readtime }} мин</span>
              </div>
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
      <div
        v-if="filteredPosts.length === 0"
        class="text-center py-16 bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20"
      >
        <div class="text-indigo-400 mb-4">
          <i class="fas fa-search text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-white/90 mb-2">
          Публикации не найдены
        </h3>
        <p class="text-indigo-200/80">
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
.bg-grid-white {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-grid {
  animation: grid 20s linear infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1b4b;
}

::-webkit-scrollbar-thumb {
  background: #4f46e5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6366f1;
}
</style>
