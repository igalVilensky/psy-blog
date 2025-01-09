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

    <div class="container mx-auto px-4 max-w-3xl relative z-10 pb-12 pt-12">
      <!-- Back Navigation -->
      <nuxt-link
        to="/blog"
        class="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group"
      >
        <i
          class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
        ></i>
        Вернуться к статьям
      </nuxt-link>

      <article
        v-if="post"
        class="bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 overflow-hidden"
      >
        <!-- Featured Image Container -->
        <div class="relative w-full h-[250px] sm:h-[350px]">
          <nuxt-img
            v-if="post.image"
            :src="urlFor(post?.image)?.width(1200).height(675).url()"
            :alt="post?.title"
            class="w-full h-full object-cover"
            width="1200"
            height="675"
            loading="lazy"
            format="webp"
            quality="80"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
          ></div>

          <!-- Category Badge -->
          <span
            :class="[
              'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm text-white',
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

        <!-- Content Container -->
        <div class="px-8 py-6 sm:py-8">
          <!-- Title -->
          <h1 class="text-4xl font-bold text-white/90 mb-6">
            {{ post.title }}
          </h1>

          <!-- Meta Information Row with Share Button -->
          <div
            class="flex flex-wrap items-center justify-between mb-6 sm:mb-8 border-b border-indigo-500/20 sm:pb-8 pb-6 text-sm text-indigo-200/60"
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
                class="flex items-center gap-2 hover:text-indigo-300 transition-colors"
              >
                <i class="fas fa-share-alt"></i>
                <span>Поделиться</span>
              </button>
            </div>
          </div>

          <!-- Article Content -->
          <div class="prose prose-invert max-w-none">
            <SanityContent v-if="post.body" :blocks="post.body" />
          </div>
        </div>
      </article>

      <!-- Share Modal -->
      <div
        v-if="isShareOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      >
        <div
          class="bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-6 max-w-md w-full mx-4"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white/90">Поделиться статьей</h3>
            <button
              @click="isShareOpen = false"
              class="text-indigo-200/60 hover:text-indigo-200"
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
              class="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30"
            >
              <i class="fas fa-link"></i>
              Копировать ссылку
            </button>
          </div>
        </div>
      </div>

      <!-- Share Section -->
      <div
        class="mt-12 bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-8"
      >
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <i class="fas fa-share-alt text-indigo-400"></i>
            <h3 class="text-xl font-semibold text-white/90">
              Поделиться статьей
            </h3>
          </div>
          <p class="text-indigo-200/80">
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
            class="flex items-center justify-center gap-2 p-3 rounded-lg bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 transition-all"
          >
            <i class="fas fa-link"></i>
            <span>Копировать</span>
          </button>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div
        class="mt-12 bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-8 text-center"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Понравилась статья?
        </h2>
        <p class="text-indigo-200/80 mb-6">
          Подпишитесь на нашу рассылку, чтобы получать новые статьи первыми
        </p>
        <div class="max-w-md mx-auto flex">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-4 py-3 rounded-l-lg bg-white/5 border border-indigo-500/20 text-white placeholder-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            @click="subscribeEmail"
            class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-r-lg hover:opacity-90 transition"
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
    alert("Ссылка скопирована!");
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};

const subscribeEmail = async () => {
  if (!validateEmail(email.value)) {
    alert("Пожалуйста, введите корректный email");
    return;
  }

  const result = await subscribeUser(db, email.value);
  if (result.success) {
    alert(result.message);
    email.value = "";
  } else {
    alert(result.message);
  }
};

const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

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

<style>
.prose {
  @apply text-indigo-200/80 text-lg;
}

.prose h2 {
  @apply text-2xl sm:text-3xl font-semibold text-white/90 mt-8 mb-4;
}

.prose h3 {
  @apply text-2xl font-medium text-white/90 mt-6 mb-3;
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
  @apply text-indigo-400 hover:text-indigo-300 underline;
}

.prose img {
  @apply rounded-lg my-6;
}

.prose blockquote {
  @apply border-l-4 border-indigo-500/50 pl-4 text-indigo-200/60 italic;
}

.prose blockquote p {
  @apply italic mb-0;
}

.prose code {
  @apply bg-indigo-500/20 rounded px-1 text-indigo-200;
}

.prose pre {
  @apply bg-indigo-500/20 text-indigo-200 p-4 rounded-lg my-6 overflow-x-auto;
}

/* Add spacing between multi-level lists */
.prose ul ul,
.prose ol ol,
.prose ul ol,
.prose ol ul {
  @apply mt-2 ml-6;
}
</style>
