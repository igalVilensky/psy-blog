<template>
  <div class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Наш Блог</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Исследуйте наши статьи о личностном росте, развитии и трансформации
        </p>
      </section>

      <!-- Menu Tabs -->
      <div class="mb-12">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeTab = category"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              activeTab === category
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-pink-100',
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
          class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
        >
          <div class="relative">
            <img
              v-if="post.image"
              :src="urlFor(post?.image)?.width(550).height(310).url()"
              :alt="post.title"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 line-clamp-2">
              {{ post.title }}
            </h2>
            <div class="border-t pt-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div
                    class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    <span class="text-sm font-medium text-gray-600">
                      {{ post.author.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <span class="text-sm font-medium text-gray-700">{{
                    post.author
                  }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="flex items-center">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ post.readtime }} мин
                  </span>
                  <span class="mx-2">•</span>
                  <span>{{
                    new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import { computed, ref } from "vue";

const POSTS_QUERY = groq`*[
    _type == "post"
    && defined(slug.current)
   ]|order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    publishedAt,
    image,
    category,
    readtime,
    author
   }`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const categories = ref([
  "Все",
  "Личностный рост",
  "Отношения",
  "Продуктивность",
]);

const activeTab = ref("Все");

const filteredPosts = computed(() => {
  if (activeTab.value === "Все") {
    return posts.value;
  }
  return posts.value?.filter((post) => post.category === activeTab.value);
});
</script>
