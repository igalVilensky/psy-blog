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

      <!-- Blog Posts Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <nuxt-link
          v-for="post in posts"
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
            <h2 class="text-xl font-bold text-gray-800 mb-3">
              {{ post.title }}
            </h2>
            <div class="text-gray-500 text-sm">
              {{ new Date(post.publishedAt).toLocaleDateString() }}
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

const POSTS_QUERY = groq`*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{
    _id, 
    title, 
    slug, 
    publishedAt,
    image
  }`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
const { projectId, dataset } = useSanity().client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>
