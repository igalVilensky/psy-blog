<template>
  <div class="bg-gradient-to-br from-pink-50 to-white min-h-screen py-12">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- Back Navigation -->
      <nuxt-link
        to="/blog"
        class="inline-flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-8 group"
      >
        <svg
          class="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Вернуться к статьям
      </nuxt-link>

      <article
        v-if="post"
        class="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <!-- Featured Image -->
        <div class="relative w-full">
          <img
            v-if="post.image"
            :src="urlFor(post?.image)?.width(1200).height(675).url()"
            :alt="post?.title"
            class="w-full h-[400px] object-cover"
          />
        </div>

        <!-- Content Container -->
        <div class="p-8">
          <!-- Title -->
          <h1 v-if="post.title" class="text-4xl font-bold text-gray-800 mb-6">
            {{ post.title }}
          </h1>

          <!-- Author and Meta Information -->
          <div
            class="flex items-center justify-between mb-8 border-b border-gray-100 pb-6"
          >
            <div class="flex items-center">
              <img
                v-if="post.author?.image"
                :src="urlFor(post?.author)?.width(40).height(40).url()"
                :alt="post.author?.name"
                class="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <div class="font-medium text-gray-800">
                  {{ post.author }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ new Date(post.publishedAt).toLocaleDateString() }}
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-500 flex items-center">
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
              {{ post.readtime }} мин чтения
            </div>
          </div>

          <!-- Article Content -->
          <div class="prose prose-pink max-w-none">
            <SanityContent v-if="post.body" :blocks="post.body" />
          </div>
        </div>
      </article>

      <!-- Newsletter Section -->
      <div
        class="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 mt-12 text-center"
      >
        <h2 class="text-2xl font-bold text-white mb-4">Понравилась статья?</h2>
        <p class="text-white mb-6">
          Подпишитесь на нашу рассылку, чтобы получать новые статьи первыми
        </p>
        <div class="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg text-gray-800"
          />
          <button
            class="bg-white text-pink-600 px-6 py-3 rounded-r-lg hover:bg-gray-100 transition"
          >
            Подписаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const { params } = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, params);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<style>
.prose {
  @apply text-gray-700;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-800 mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-bold text-gray-800 mt-6 mb-3;
}

.prose p {
  @apply mb-4;
}

.prose ul {
  @apply list-disc list-inside mb-4;
}

.prose ol {
  @apply list-decimal list-inside mb-4;
}

.prose a {
  @apply text-pink-600 hover:text-pink-700 underline;
}

.prose img {
  @apply rounded-lg my-6;
}

.prose blockquote {
  @apply border-l-4 border-pink-500 pl-4 italic my-6;
}

.prose code {
  @apply bg-gray-100 rounded px-1;
}

.prose pre {
  @apply bg-gray-800 text-white p-4 rounded-lg my-6 overflow-x-auto;
}
</style>
