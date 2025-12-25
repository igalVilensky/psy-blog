<template>
  <div class="blog-posts">
    <ul
      class="space-y-6 bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300">
      <li v-for="post in posts" :key="post._id" class="group">
        <a :href="`/blog/${post.slug?.current}`" class="block">
          <div class="flex flex-col space-y-4">
            <!-- Featured image -->
            <div class="rounded-lg overflow-hidden bg-gray-100 aspect-video relative">
              <nuxt-img v-if="post.image" :src="urlFor(post?.image)?.width(1200).height(675).url()" :alt="post?.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" width="1200"
                height="675" loading="lazy" format="webp" quality="80" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <span>No image</span>
              </div>

              <!-- Category badge -->
              <div class="absolute top-3 left-3">
                <span v-if="post.categories && post.categories[0]"
                  class="inline-block px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">
                  {{ post.categories[0].title }}
                </span>
              </div>
            </div>

            <!-- Post info -->
            <div>
              <h3 class="text-xl font-bold text-white group-hover:text-indigo-600 transition-colors">
                {{ post.title }}
              </h3>
              <p class="mt-2 text-gray-600 line-clamp-2">
                {{ post.excerpt || post.description || "" }}
              </p>

              <!-- Meta info -->
              <div class="mt-4 flex items-center text-sm text-gray-500">
                <span v-if="post.author?.name" class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-gray-200 overflow-hidden mr-2">
                    <img v-if="post.author.image?.asset?.url" :src="post.author.image.asset.url" :alt="post.author.name"
                      class="w-full h-full object-cover" />
                  </div>
                  {{ post.author.name }}
                </span>
                <span class="mx-2">·</span>
                <span>{{ formatDate(post.publishedAt) }}</span>
                <span class="mx-2">·</span>
                <span>{{ post.views || 0 }} views</span>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div
      class="mt-8 text-center bg-white/5 backdrop-blur-lg py-4 rounded-xl border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300">
      <a href="/blog"
        class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Просмотреть все статьи

        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import imageUrlBuilder from "@sanity/image-url";

defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
});

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
const { projectId, dataset } = useSanity().client.config();

const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>
