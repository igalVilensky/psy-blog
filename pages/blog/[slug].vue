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

    <div class="container mx-auto sm:px-4 max-w-3xl relative z-10 pb-12 pt-12">
      <!-- Back Navigation -->
      <nuxt-link
        to="/blog"
        class="inline-flex items-center text-[#0EA5E9] hover:text-[#22D3EE] transition-colors mb-8 group pl-6 sm:pl-0"
      >
        <i
          class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
        ></i>
        Вернуться к статьям
      </nuxt-link>

      <article
        v-if="post"
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <!-- Featured Image Container -->
        <div class="relative w-full h-[250px] sm:h-[350px] overflow-hidden">
          <nuxt-img
            v-if="post.image"
            :src="urlFor(post?.image)?.width(1200).height(675).url()"
            :alt="post?.title"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
                'bg-[#0EA5E9]/80 border border-[#0EA5E9]/50':
                  post.category === 'Личностный рост',
                'bg-[#F59E0B]/80 border border-[#F59E0B]/50':
                  post.category === 'Отношения',
                'bg-[#E879F9]/80 border border-[#E879F9]/50':
                  post.category === 'Продуктивность',
                'bg-gray-500/80 border border-gray-500/50': !post.category,
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
            class="flex flex-wrap items-center justify-between mb-6 sm:mb-8 border-b border-white/10 sm:pb-8 pb-6 text-sm text-slate-400"
          >
            <div class="flex flex-wrap items-center gap-4 sm:gap-8 text-base">
              <div class="flex items-center gap-2">
                <i class="far fa-calendar text-[#0EA5E9]"></i>
                <span>{{
                  new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                  })
                }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="far fa-clock text-[#F59E0B]"></i>
                <span>{{ post.readtime }} мин чтения</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="far fa-eye text-[#E879F9]"></i>
                <span>{{ postViews }} просмотров</span>
              </div>
              <button
                @click="isShareOpen = true"
                class="flex items-center gap-2 hover:text-[#0EA5E9] transition-colors"
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
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 max-w-md w-full mx-4"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white/90">Поделиться статьей</h3>
            <button
              @click="isShareOpen = false"
              class="text-slate-300 hover:text-[#0EA5E9]"
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
              class="flex items-center gap-3 w-full p-3 rounded-lg bg-[#0EA5E9]/20 text-[#0EA5E9] hover:bg-[#0EA5E9]/30"
            >
              <i class="fas fa-link"></i>
              Копировать ссылку
            </button>
          </div>
        </div>
      </div>

      <div
        class="mt-12 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sn:rounded-2xl border border-white/10 p-8"
      >
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <i class="fas fa-share-alt text-[#0EA5E9]"></i>
            <h3 class="text-xl font-semibold text-white/90">
              Поделиться статьей
            </h3>
          </div>
          <p class="text-slate-300">
            Понравилась статья? Поделитесь с друзьями!
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <!-- Twitter Share Button with Hover Effect -->
          <button
            @click="shareOn('twitter')"
            class="relative inline-flex items-center justify-center px-4 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#1DA1F2]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#1DA1F2] to-[#1DA1F2]/80 group-hover:translate-x-0 ease"
            >
              <i class="fab fa-twitter"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#1DA1F2] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fab fa-twitter mr-2"></i>
              Twitter
            </span>
            <span class="relative invisible">Twitter</span>
          </button>

          <!-- Facebook Share Button with Hover Effect -->
          <button
            @click="shareOn('facebook')"
            class="relative inline-flex items-center justify-center px-4 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#4267B2]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#4267B2] to-[#4267B2]/80 group-hover:translate-x-0 ease"
            >
              <i class="fab fa-facebook"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#4267B2] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fab fa-facebook mr-2"></i>
              Facebook
            </span>
            <span class="relative invisible">Facebook</span>
          </button>

          <!-- Telegram Share Button with Hover Effect -->
          <button
            @click="shareOn('telegram')"
            class="relative inline-flex items-center justify-center px-4 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#0088cc]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0088cc] to-[#0088cc]/80 group-hover:translate-x-0 ease"
            >
              <i class="fab fa-telegram"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0088cc] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fab fa-telegram mr-2"></i>
              Telegram
            </span>
            <span class="relative invisible">Telegram</span>
          </button>

          <!-- Copy Link Button with Hover Effect -->
          <button
            @click="copyLink"
            class="relative inline-flex items-center justify-center px-4 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#0EA5E9]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
            >
              <i class="fas fa-link"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              <i class="fas fa-link mr-2"></i>
              Копировать
            </span>
            <span class="relative invisible">Копировать</span>
          </button>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div
        class="mt-12 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-white/10 p-8 text-center"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-4">
          Понравилась статья?
        </h2>
        <p class="text-slate-300 mb-6">
          Подпишитесь на нашу рассылку, чтобы получать новые статьи первыми
        </p>
        <div class="flex">
          <input
            type="email"
            v-model="email"
            placeholder="Введите ваш email"
            class="w-full px-4 py-3 rounded-l-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] transition-all"
          />
          <button
            @click="subscribeEmail"
            class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-r-lg group"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
            >
              <i class="fas fa-envelope"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
            >
              Подписаться
            </span>
            <span class="relative invisible">Подписаться</span>
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

<style>
.prose {
  @apply text-slate-300 text-lg;
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
  @apply text-[#0EA5E9] hover:text-[#22D3EE] underline;
}

.prose img {
  @apply rounded-lg my-6;
}

.prose blockquote {
  @apply border-l-4 border-[#0EA5E9]/50 pl-4 text-slate-300 italic;
}

.prose blockquote p {
  @apply italic mb-0;
}

.prose code {
  @apply bg-[#0EA5E9]/20 rounded px-1 text-slate-300;
}

.prose pre {
  @apply bg-[#0EA5E9]/20 text-slate-300 p-4 rounded-lg my-6 overflow-x-auto;
}

/* Add spacing between multi-level lists */
.prose ul ul,
.prose ol ol,
.prose ul ol,
.prose ol ul {
  @apply mt-2 ml-6;
}
</style>
