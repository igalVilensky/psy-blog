<template>
  <div class="relative min-h-screen">
    <div
      class="container mx-auto px-4 sm:px-4 max-w-3xl relative z-10 pb-12 pt-12"
    >
      <!-- Back Navigation -->
      <nuxt-link
        to="/blog"
        class="inline-flex items-center text-[#0EA5E9] hover:text-[#22D3EE] transition-colors mb-8 group pl-3 sm:pl-0"
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
        <div
          class="relative w-full h-[200px] sm:h-[250px] md:h-[350px] overflow-hidden"
        >
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
        <div class="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <!-- Title -->
          <h1
            class="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-6"
          >
            {{ post.title }}
          </h1>

          <!-- Meta Information Row with Share Button -->
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 border-b border-white/10 pb-6 sm:pb-8 text-sm text-slate-400"
          >
            <div
              class="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-8 text-sm sm:text-base mb-4 sm:mb-0"
            >
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
            </div>
            <button
              @click="isShareOpen = true"
              class="flex items-center gap-2 hover:text-[#0EA5E9] transition-colors"
            >
              <i class="fas fa-share-alt"></i>
              <span>Поделиться</span>
            </button>
          </div>

          <!-- Article Content -->
          <div
            class="prose prose-invert max-w-none prose-img:rounded-lg prose-img:mx-auto"
          >
            <SanityContent v-if="post.body" :blocks="post.body" />
          </div>
        </div>
      </article>

      <!-- Comments Section - Improved for responsiveness -->
      <div
        v-if="post"
        class="mt-8 sm:mt-12 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8"
      >
        <h2
          class="text-xl sm:text-2xl font-bold text-white/90 mb-4 sm:mb-6 flex items-center"
        >
          <i class="fas fa-comments text-[#0EA5E9] mr-3"></i>
          Комментарии
        </h2>

        <!-- Comment Form - Improved for mobile -->
        <form @submit.prevent="addNewComment" class="mb-6 sm:mb-8">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row gap-4">
              <input
                v-model="newComment.name"
                type="text"
                placeholder="Ваше имя"
                class="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
                required
              />
              <input
                v-model="newComment.email"
                type="email"
                placeholder="Ваш email (не публикуется)"
                class="flex-1 px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
                required
              />
            </div>
            <textarea
              v-model="newComment.text"
              placeholder="Ваш комментарий"
              class="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 min-h-[100px] sm:min-h-[120px] focus:outline-none focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] transition-all"
              required
            ></textarea>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="self-start px-4 sm:px-6 py-2 sm:py-3 bg-[#0EA5E9] hover:bg-[#22D3EE] rounded-lg text-white font-medium transition-colors disabled:bg-gray-600"
            >
              {{ isSubmitting ? "Отправка..." : "Отправить" }}
            </button>
          </div>
        </form>

        <!-- Comments List - Improved for mobile -->
        <div class="space-y-4 sm:space-y-6">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="bg-[#1A1F35]/60 rounded-lg p-3 sm:p-4 border border-white/10"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2"
            >
              <span class="font-medium text-[#0EA5E9] mb-1 sm:mb-0">{{
                comment.name
              }}</span>
              <span class="text-xs sm:text-sm text-slate-400">
                {{ formatDate(comment.createdAt) }}
              </span>
            </div>
            <p class="text-slate-300 text-sm sm:text-base">
              {{ comment.text }}
            </p>
          </div>
          <p v-if="comments.length === 0" class="text-slate-400 text-center">
            Пока нет комментариев. Будьте первым!
          </p>
        </div>
      </div>

      <!-- Share Modal - Improved for mobile -->
      <div
        v-if="isShareOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      >
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 max-w-md w-full"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg sm:text-xl font-bold text-white/90">
              Поделиться статьей
            </h3>
            <button
              @click="isShareOpen = false"
              class="text-slate-300 hover:text-[#0EA5E9] p-2"
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

      <!-- Bottom Share Section - Improved for mobile -->
      <div
        class="mt-8 sm:mt-12 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8"
      >
        <div class="text-center mb-4 sm:mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <i class="fas fa-share-alt text-[#0EA5E9]"></i>
            <h3 class="text-lg sm:text-xl font-semibold text-white/90">
              Поделиться статьей
            </h3>
          </div>
          <p class="text-slate-300 text-sm sm:text-base">
            Понравилась статья? Поделитесь с друзьями!
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <!-- Twitter Share Button with Hover Effect -->
          <button
            @click="shareOn('twitter')"
            class="relative inline-flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#1DA1F2]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#1DA1F2] to-[#1DA1F2]/80 group-hover:translate-x-0 ease"
            >
              <i class="fab fa-twitter"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#1DA1F2] transition-all duration-300 transform group-hover:translate-x-full ease text-xs sm:text-base"
            >
              <i class="fab fa-twitter mr-1 sm:mr-2"></i>
              <span class="hidden sm:inline">Twitter</span>
              <span class="inline sm:hidden">Twitter</span>
            </span>
            <span class="relative invisible">Twitter</span>
          </button>

          <!-- Facebook Share Button with Hover Effect -->
          <button
            @click="shareOn('facebook')"
            class="relative inline-flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#4267B2]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#4267B2] to-[#4267B2]/80 group-hover:translate-x-0 ease"
            >
              <i class="fab fa-facebook"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#4267B2] transition-all duration-300 transform group-hover:translate-x-full ease text-xs sm:text-base"
            >
              <i class="fab fa-facebook mr-1 sm:mr-2"></i>
              <span class="hidden sm:inline">Facebook</span>
              <span class="inline sm:hidden">FB</span>
            </span>
            <span class="relative invisible">Facebook</span>
          </button>

          <!-- Telegram Share Button with Hover Effect -->
          <button
            @click="shareOn('telegram')"
            class="relative inline-flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#0088cc]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0088cc] to-[#0088cc]/80 group-hover:translate-x-0 ease"
            >
              <i class="fab fa-telegram"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0088cc] transition-all duration-300 transform group-hover:translate-x-full ease text-xs sm:text-base"
            >
              <i class="fab fa-telegram mr-1 sm:mr-2"></i>
              <span class="hidden sm:inline">Telegram</span>
              <span class="inline sm:hidden">TG</span>
            </span>
            <span class="relative invisible">Telegram</span>
          </button>

          <!-- Copy Link Button with Hover Effect -->
          <button
            @click="copyLink"
            class="relative inline-flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group backdrop-blur-sm border border-[#0EA5E9]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
            >
              <i class="fas fa-link"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease text-xs sm:text-base"
            >
              <i class="fas fa-link mr-1 sm:mr-2"></i>
              <span class="hidden sm:inline">Копировать</span>
              <span class="inline sm:hidden">Копировать</span>
            </span>
            <span class="relative invisible">Копировать</span>
          </button>
        </div>
      </div>

      <!-- Newsletter Section - Improved for mobile -->
      <div
        class="mt-8 sm:mt-12 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 text-center"
      >
        <h2 class="text-xl sm:text-2xl font-bold text-white/90 mb-2 sm:mb-4">
          Понравилась статья?
        </h2>
        <p class="text-slate-300 text-sm sm:text-base mb-4 sm:mb-6">
          Подпишитесь на нашу рассылку, чтобы получать новые статьи первыми
        </p>
        <div class="flex flex-col sm:flex-row">
          <input
            type="email"
            v-model="email"
            placeholder="Введите ваш email"
            class="w-full px-4 py-3 rounded-lg sm:rounded-r-none sm:rounded-l-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] transition-all mb-3 sm:mb-0"
          />
          <button
            @click="subscribeEmail"
            class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg sm:rounded-l-none sm:rounded-r-lg group"
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
import { useFirestore } from "~/plugins/firebase";
import { subscribeUser } from "@/api/firebase/contact";
import { getPostViewCount } from "@/api/firebase/views";
import { addPostComment, getPostComments } from "@/api/firebase/comments";

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

const db = getFirestore();
const firestore = useFirestore();
const isShareOpen = ref(false);
const postViews = ref(0);
const email = ref("");

// Comments state
interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: Date;
}
const comments = ref<Comment[]>([]);
const newComment = ref({
  name: "",
  email: "",
  text: "",
});
const isSubmitting = ref(false);

// Fetch comments
const fetchComments = async () => {
  if (!params.slug) return;
  const response = await getPostComments(firestore, params.slug);
  if (response.success) {
    comments.value = response.comments;
  }
};

// Add new comment
const addNewComment = async () => {
  if (!params.slug) return;

  isSubmitting.value = true;
  const commentData = {
    name: newComment.value.name,
    email: newComment.value.email,
    text: newComment.value.text,
  };

  const response = await addPostComment(firestore, params.slug, commentData);
  if (response.success) {
    await fetchComments();
    newComment.value = { name: "", email: "", text: "" };
  }
  isSubmitting.value = false;
};

// Date formatting
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Load comments and views on mount
onMounted(async () => {
  if (post.value) {
    await fetchComments();
    postViews.value = await getPostViewCount(db, post.value._id);
  }
});

// Watch for post changes
watch(
  () => post.value,
  async (newPost) => {
    if (newPost) {
      await fetchComments();
      postViews.value = await getPostViewCount(db, newPost._id);
    }
  }
);

const shareOn = (platform: "twitter" | "facebook" | "telegram") => {
  const url = window.location.href;
  const title = post.value?.title;

  const shareUrls: { [key in "twitter" | "facebook" | "telegram"]: string } = {
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
