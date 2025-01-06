<template>
  <div
    class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white min-h-screen py-12"
  >
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-800 mb-6 tracking-tight">
          Блог о Развитии и Трансформации
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Исследуйте идеи, подходы и опыт, которые помогут вам расти и достигать
          новых высот.
        </p>
      </section>

      <!-- Menu Tabs -->
      <div class="mb-12 sm:mb-16">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeTab = category"
            :class="[
              'px-6 py-2.5 rounded-full transition-all duration-300 font-medium text-sm',
              activeTab === category
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
                : 'bg-white text-gray-700 hover:bg-pink-100 border border-gray-100',
            ]"
          >
            {{ category }}
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
          class="group block bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div class="relative">
            <img
              v-if="post.image"
              :src="urlFor(post?.image)?.width(550).height(310).url()"
              :alt="post.title"
              class="w-full h-52 object-cover"
            />
            <!-- Category badge repositioned to top left -->
            <span
              :class="[
                'absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm',
                {
                  'bg-emerald-100 text-emerald-800':
                    post.category === 'Личностный рост',
                  'bg-purple-100 text-purple-800':
                    post.category === 'Отношения',
                  'bg-blue-100 text-blue-800':
                    post.category === 'Продуктивность',
                  'bg-gray-100 text-gray-800': !post.category,
                },
              ]"
            >
              {{ post.category }}
            </span>
          </div>

          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 line-clamp-2">
              {{ post.title }}
            </h2>
            <div class="border-t pt-4">
              <!-- Metadata row -->
              <div
                class="flex items-center justify-between text-sm text-gray-500"
              >
                <!-- Views count -->
                <span class="flex items-center">
                  <i class="far fa-eye mr-1.5"></i>
                  {{ post.views || 0 }}
                </span>

                <!-- Reading time -->
                <span class="flex items-center">
                  <i class="far fa-clock mr-1.5"></i>
                  {{ post.readtime }} мин
                </span>

                <!-- Date -->
                <span>
                  {{
                    new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })
                  }}
                </span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useFirestore } from "~/plugins/firebase";
import { fetchPosts } from "~/api/sanity/posts";
import { getImageUrl } from "~/api/sanity/client";
import { incrementPostViewCount, getPostViewCount } from "~/api/firebase/views"; // Include getPostViewCount

const firestore = useFirestore();

// Function to increment view count (unchanged)
const incrementViewCount = async (postId) => {
  await incrementPostViewCount(firestore, postId);
};

// Use the query result directly, but convert to ref for reactivity
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

// Fetch view counts when the component mounts
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
  if (!posts.value) return []; // Add null check
  if (activeTab.value === "Все") {
    return posts.value;
  }
  return posts.value.filter((post) => post.category === activeTab.value);
});
</script>
