<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float"
        ></div>
      </div>
    </div>

    <div class="container mx-auto max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Блог о Развитии и Трансформации
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4"
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
                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white'
                : 'bg-white/10 text-white border border-white/10',
            ]"
          >
            <span class="relative z-10">{{ category }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
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
          class="group bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <div class="relative overflow-hidden aspect-[4/3]">
            <nuxt-img
              v-if="post.image"
              :src="urlFor(post?.image)?.width(550).height(310).url()"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                  'bg-[#0EA5E9]/80': post.category === 'Личностный рост',
                  'bg-[#F59E0B]/80': post.category === 'Отношения',
                  'bg-[#E879F9]/80': post.category === 'Продуктивность',
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
              class="text-xl font-bold text-white/90 mb-4 line-clamp-2 group-hover:text-[#0EA5E9] transition-colors duration-300"
            >
              {{ post.title }}
            </h2>

            <!-- Metadata row -->
            <div
              class="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/10"
            >
              <div class="flex items-center space-x-1.5">
                <i class="far fa-eye text-[#0EA5E9]"></i>
                <span>{{ post.views || 0 }}</span>
              </div>
              <div class="flex items-center space-x-1.5">
                <i class="far fa-clock text-[#F59E0B]"></i>
                <span>{{ post.readtime }} мин</span>
              </div>
              <div class="flex items-center space-x-1.5">
                <i class="far fa-calendar text-[#E879F9]"></i>
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
        class="text-center py-16 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10"
      >
        <div class="text-[#0EA5E9] mb-4">
          <i class="fas fa-search text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-white/90 mb-2">
          Публикации не найдены
        </h3>
        <p class="text-slate-300">
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
