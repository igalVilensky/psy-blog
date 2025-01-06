<template>
  <div
    class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white min-h-screen py-12"
  >
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- Back Navigation -->
      <nuxt-link
        to="/blog"
        class="inline-flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-8 group"
      >
        <i
          class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
        ></i>
        Вернуться к статьям
      </nuxt-link>

      <article
        v-if="post"
        class="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <!-- Featured Image Container with Gradient Overlay -->
        <div class="relative w-full h-[250px] sm:h-[350px]">
          <img
            v-if="post.image"
            :src="urlFor(post?.image)?.width(1200).height(675).url()"
            :alt="post?.title"
            class="w-full h-full object-cover"
          />
          <!-- Gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
          ></div>

          <!-- Category Badge - Moved to top left of image -->
          <span
            :class="[
              'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium',
              {
                'bg-emerald-100 text-emerald-800':
                  post.category === 'Личностный рост',
                'bg-purple-100 text-purple-800': post.category === 'Отношения',
                'bg-blue-100 text-blue-800': post.category === 'Продуктивность',
                'bg-gray-100 text-gray-800': !post.category,
              },
            ]"
          >
            {{ post.category }}
          </span>
        </div>

        <!-- Content Container -->
        <div class="px-8 py-6 sm:py-8">
          <!-- Title -->
          <h1 v-if="post.title" class="text-4xl font-bold text-gray-800 mb-6">
            {{ post.title }}
          </h1>

          <!-- Meta Information Row with Share Button -->
          <div
            class="flex flex-wrap items-center justify-between mb-6 sm:mb-8 border-b border-gray-100 sm:pb-8 pb-6 text-sm text-gray-600"
          >
            <div class="flex flex-wrap items-center gap-4 sm:gap-8 text-base">
              <div class="flex items-center gap-2">
                <i class="far fa-calendar"></i>
                <span>{{
                  new Date(post.publishedAt).toLocaleDateString()
                }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="far fa-clock"></i>
                <span>{{ post.readtime }} мин чтения</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="far fa-eye"></i>
                <span>{{ postViews }} просмотров</span>
              </div>
              <button
                @click="isShareOpen = true"
                class="flex items-center gap-2 hover:text-pink-600 transition-colors"
              >
                <i class="fas fa-share-alt"></i>
                <span>Поделиться</span>
              </button>
            </div>

            <!-- Share Button - Moved to meta row -->
          </div>

          <!-- Article Content -->
          <div class="prose prose-pink max-w-none">
            <SanityContent v-if="post.body" :blocks="post.body" />
          </div>
        </div>
      </article>

      <!-- Share Modal -->
      <div
        v-if="isShareOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Поделиться статьей</h3>
            <button
              @click="isShareOpen = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="flex flex-col gap-3">
            <button
              @click="shareOn('twitter')"
              class="flex items-center gap-3 w-full p-3 rounded-lg bg-[#1DA1F2] text-white hover:bg-opacity-90"
            >
              <i class="fab fa-twitter"></i>
              Twitter
            </button>
            <button
              @click="shareOn('facebook')"
              class="flex items-center gap-3 w-full p-3 rounded-lg bg-[#4267B2] text-white hover:bg-opacity-90"
            >
              <i class="fab fa-facebook"></i>
              Facebook
            </button>
            <button
              @click="shareOn('telegram')"
              class="flex items-center gap-3 w-full p-3 rounded-lg bg-[#0088cc] text-white hover:bg-opacity-90"
            >
              <i class="fab fa-telegram"></i>
              Telegram
            </button>
            <button
              @click="copyLink"
              class="flex items-center gap-3 w-full p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <i class="fas fa-link"></i>
              Копировать ссылку
            </button>
          </div>
        </div>
      </div>
      <!-- Share Section -->
      <div class="mt-12 bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <i class="fas fa-share-alt text-gray-600"></i>
            <h3 class="text-xl font-semibold text-gray-800">
              Поделиться статьей
            </h3>
          </div>
          <p class="text-gray-600">
            Понравилась статья? Поделитесь с друзьями!
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            @click="shareOn('twitter')"
            class="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-all"
          >
            <i class="fab fa-twitter"></i>
            <span>Twitter</span>
          </button>

          <button
            @click="shareOn('facebook')"
            class="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#4267B2] text-white hover:bg-opacity-90 transition-all"
          >
            <i class="fab fa-facebook"></i>
            <span>Facebook</span>
          </button>

          <button
            @click="shareOn('telegram')"
            class="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#0088cc] text-white hover:bg-opacity-90 transition-all"
          >
            <i class="fab fa-telegram"></i>
            <span>Telegram</span>
          </button>

          <button
            @click="copyLink"
            class="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            <i class="fas fa-link"></i>
            <span>Копировать</span>
          </button>
        </div>
      </div>
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
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg text-gray-800"
          />
          <button
            @click="subscribeEmail"
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
import { ref } from "vue";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";
import { getPostViewCount } from "@/api/firebase/views";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const { params } = useRoute();
const { data: post } = (await useSanityQuery)<SanityDocument>(
  POST_QUERY,
  params
);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const isShareOpen = ref(false);
const postViews = ref(0);
const db = getFirestore();
const email = ref("");

const shareOn = (platform: string) => {
  const url = window.location.href;
  const title = post.value?.title;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
  };

  window.open(shareUrls[platform], "_blank");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    // You might want to add a toast notification here
    alert("Ссылка скопирована!");
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};
// Email subscription method
const subscribeEmail = async () => {
  if (email.value && validateEmail(email.value)) {
    const result = await subscribeUser(db, email.value);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
    email.value = ""; // Clear input after submission
  } else {
    alert("Пожалуйста, введите корректный email");
  }
};

// Simple email validation
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Use watch to getPostViewCount
watch(
  () => post.value,
  async (newPost) => {
    if (newPost && newPost._id) {
      postViews.value = await getPostViewCount(db, newPost._id);
    }
  },
  { immediate: true }
);
</script>

<style>
.prose {
  @apply text-gray-700 text-lg;
}

.prose h2 {
  @apply text-2xl sm:text-3xl font-semibold text-gray-800 mt-8 mb-4;
}

.prose h3 {
  @apply text-2xl font-medium text-gray-800 mt-6 mb-3;
}

.prose p {
  @apply text-lg mb-4 leading-relaxed;
}

.prose ul {
  @apply list-disc list-inside mb-4;
}

.prose ol {
  @apply list-decimal list-inside mb-4;
}

.prose li {
  @apply mb-2;
}

.prose a {
  @apply text-pink-600 hover:text-pink-700 underline;
}

.prose img {
  @apply rounded-lg my-6;
}

.prose blockquote {
  @apply border-l-4 border-pink-500 pl-4 py-1 my-6 text-gray-600 italic;
}

.prose blockquote p {
  @apply italic mb-0;
}

.prose code {
  @apply bg-gray-100 rounded px-1;
}

.prose pre {
  @apply bg-gray-800 text-white p-4 rounded-lg my-6 overflow-x-auto;
}

/* Add spacing between multi-level lists */
.prose ul ul,
.prose ol ol,
.prose ul ol,
.prose ol ul {
  @apply mt-2 ml-6;
}
</style>
