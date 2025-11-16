<template>
  <main class="relative min-h-screen bg-slate-950">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back Navigation -->
      <nuxt-link
        to="/blog"
        class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
      >
        <i
          class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"
        ></i>
        Вернуться к статьям
      </nuxt-link>

      <article v-if="post" class="blog-post-container">
        <!-- Featured Image Container -->
        <div class="featured-image-wrapper">
          <nuxt-img
            v-if="post.image"
            :src="urlFor(post?.image)?.width(1200).height(675).url()"
            :alt="post?.title"
            class="featured-image"
            width="1200"
            height="675"
            loading="lazy"
            format="webp"
            quality="80"
          />
          <div class="image-overlay"></div>

          <!-- Category Badge -->
          <span :class="['category-badge', getCategoryClass(post.category)]">
            {{ post.category || "Статья" }}
          </span>
        </div>

        <!-- Content Container -->
        <div class="content-wrapper">
          <!-- Title -->
          <h1 class="article-title">
            {{ post.title }}
          </h1>

          <!-- Meta Information -->
          <div class="meta-info-container">
            <div class="meta-info-row">
              <div class="meta-item">
                <i class="far fa-calendar text-cyan-400"></i>
                <span>{{ formatPublishDate(post.publishedAt) }}</span>
              </div>
              <div class="meta-item">
                <i class="far fa-clock text-purple-400"></i>
                <span>{{ post.readtime }} мин чтения</span>
              </div>
              <div class="meta-item">
                <i class="far fa-eye text-pink-400"></i>
                <span>{{ postViews }} просмотров</span>
              </div>
            </div>
            <button @click="isShareOpen = true" class="share-button">
              <i class="fas fa-share-alt mr-2"></i>
              Поделиться
            </button>
          </div>

          <!-- Article Content -->
          <div class="prose-container">
            <SanityContent v-if="post.body" :blocks="post.body" />
          </div>
        </div>
      </article>

      <!-- Share Section -->
      <div class="share-section">
        <div class="share-header">
          <div class="flex items-center gap-3 mb-2">
            <div class="share-icon-wrapper">
              <i class="fas fa-share-alt text-cyan-400"></i>
            </div>
            <h3 class="text-xl font-bold text-white">Поделиться статьей</h3>
          </div>
          <p class="text-slate-400 text-sm">
            Понравилась статья? Поделитесь с друзьями!
          </p>
        </div>

        <div class="share-buttons-grid">
          <button
            @click="shareOn('twitter')"
            class="social-share-btn twitter-btn"
          >
            <div class="social-btn-bg"></div>
            <div class="social-btn-content">
              <i class="fab fa-twitter text-xl"></i>
              <span class="hidden sm:inline ml-2">Twitter</span>
            </div>
          </button>

          <button
            @click="shareOn('facebook')"
            class="social-share-btn facebook-btn"
          >
            <div class="social-btn-bg"></div>
            <div class="social-btn-content">
              <i class="fab fa-facebook text-xl"></i>
              <span class="hidden sm:inline ml-2">Facebook</span>
            </div>
          </button>

          <button
            @click="shareOn('telegram')"
            class="social-share-btn telegram-btn"
          >
            <div class="social-btn-bg"></div>
            <div class="social-btn-content">
              <i class="fab fa-telegram text-xl"></i>
              <span class="hidden sm:inline ml-2">Telegram</span>
            </div>
          </button>

          <button @click="copyLink" class="social-share-btn copy-btn">
            <div class="social-btn-bg"></div>
            <div class="social-btn-content">
              <i class="fas fa-link text-xl"></i>
              <span class="hidden sm:inline ml-2">Копировать</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Comments Section -->
      <div v-if="post" class="comments-section">
        <div class="comments-header">
          <div class="flex items-center gap-3">
            <div class="comments-icon-wrapper">
              <i class="fas fa-comments text-purple-400"></i>
            </div>
            <h2 class="text-2xl font-bold text-white">Комментарии</h2>
          </div>
          <p class="text-slate-400 text-sm mt-2">
            {{ comments.length }} {{ getCommentsWord(comments.length) }}
          </p>
        </div>

        <!-- Comment Form -->
        <form @submit.prevent="addNewComment" class="comment-form">
          <div class="form-fields-grid">
            <input
              v-model="newComment.name"
              type="text"
              placeholder="Ваше имя"
              class="form-input"
              required
            />
            <input
              v-model="newComment.email"
              type="email"
              placeholder="Email (не публикуется)"
              class="form-input"
              required
            />
          </div>
          <textarea
            v-model="newComment.text"
            placeholder="Ваш комментарий..."
            class="form-textarea"
            rows="4"
            required
          ></textarea>
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="submit-button"
            >
              <i class="fas fa-paper-plane mr-2"></i>
              {{ isSubmitting ? "Отправка..." : "Отправить комментарий" }}
            </button>
          </div>
        </form>

        <!-- Comments List -->
        <div class="comments-list">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="comment-card"
          >
            <div class="comment-header">
              <div class="comment-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="flex-1">
                <span class="comment-author">{{ comment.name }}</span>
                <span class="comment-date">{{
                  formatDate(comment.createdAt)
                }}</span>
              </div>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
          <div v-if="comments.length === 0" class="no-comments">
            <i class="fas fa-comment-slash text-4xl text-slate-600 mb-3"></i>
            <p class="text-slate-400">Пока нет комментариев. Будьте первым!</p>
          </div>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="newsletter-section">
        <div class="newsletter-content">
          <div class="newsletter-icon">
            <i class="fas fa-envelope text-3xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">
            Понравилась статья?
          </h2>
          <p class="text-slate-300 mb-6">
            Подпишитесь на рассылку и получайте новые статьи первыми
          </p>
          <div class="newsletter-form">
            <input
              type="email"
              v-model="email"
              placeholder="Введите ваш email"
              class="newsletter-input"
            />
            <button @click="subscribeEmail" class="newsletter-button">
              <span class="button-gradient"></span>
              <span class="button-text">
                <i class="fas fa-bell mr-2"></i>
                Подписаться
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Share Modal -->
      <div
        v-if="isShareOpen"
        class="modal-overlay"
        @click="isShareOpen = false"
      >
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="text-xl font-bold text-white">Поделиться статьей</h3>
            <button @click="isShareOpen = false" class="modal-close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <button
              @click="shareOn('twitter')"
              class="modal-share-btn bg-[#1DA1F2]"
            >
              <i class="fab fa-twitter mr-3"></i>
              Twitter
            </button>
            <button
              @click="shareOn('facebook')"
              class="modal-share-btn bg-[#4267B2]"
            >
              <i class="fab fa-facebook mr-3"></i>
              Facebook
            </button>
            <button
              @click="shareOn('telegram')"
              class="modal-share-btn bg-[#0088cc]"
            >
              <i class="fab fa-telegram mr-3"></i>
              Telegram
            </button>
            <button
              @click="copyLink"
              class="modal-share-btn bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
            >
              <i class="fas fa-link mr-3"></i>
              Копировать ссылку
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ref, watch, onMounted, computed } from "vue";
import { getFirestore } from "firebase/firestore";
import { useFirestore } from "~/plugins/firebase";
import { subscribeUser } from "@/api/firebase/contact";
import { getPostViewCount } from "@/api/firebase/views";
import { addPostComment, getPostComments } from "@/api/firebase/comments";
import { createError } from "h3";

const route = useRoute();
const { params } = route;

const {
  public: { siteUrl },
} = useRuntimeConfig();

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{..., "author": author->{name}}`;
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, params);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// SEO
const getPlainText = (blocks: any[] | undefined) => {
  if (!blocks) return "";
  return (
    blocks
      .filter((block) => block._type === "block" && block.children)
      .map((block) => block.children.map((child: any) => child.text).join(""))
      .join(" ")
      .substring(0, 155) + "..."
  );
};

const metaDescription = computed(
  () => post.value?.excerpt || getPlainText(post.value?.body)
);
const postImageUrl = computed(() =>
  post.value?.image
    ? urlFor(post.value.image)?.width(1200).height(630).url()
    : `${siteUrl}/default-og-image.png`
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Статья не найдена" });
}

useSeoMeta({
  title: () => `${post.value?.title} | MindQLab`,
  description: metaDescription,
  ogTitle: () => `${post.value?.title} | MindQLab`,
  ogDescription: metaDescription,
  ogImage: postImageUrl,
  ogUrl: () => `${siteUrl}${route.fullPath}`,
  ogType: "article",
  twitterCard: "summary_large_image",
});

useHead({
  link: [{ rel: "canonical", href: () => `${siteUrl}${route.fullPath}` }],
  htmlAttrs: { lang: "ru" },
  meta: [
    { name: "robots", content: "index, follow" },
    { property: "og:locale", content: "ru_RU" },
  ],
  script: [
    {
      type: "application/ld+json",
      children: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}${route.fullPath}`,
          },
          headline: post.value?.title,
          image: postImageUrl.value,
          datePublished: post.value?.publishedAt,
          dateModified: post.value?._updatedAt || post.value?.publishedAt,
          author: {
            "@type": "Person",
            name: post.value?.author?.name || "Команда MindQLab",
          },
          publisher: {
            "@type": "Organization",
            name: "MindQLab",
            logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
          },
          description: metaDescription.value,
        })
      ),
    },
  ],
});

// Client-only state
const db = getFirestore();
const firestore = useFirestore();
const isShareOpen = ref(false);
const postViews = ref(0);
const email = ref("");

interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: Date;
}
const comments = ref<Comment[]>([]);
const newComment = ref({ name: "", email: "", text: "" });
const isSubmitting = ref(false);

const fetchComments = async () => {
  if (!params.slug) return;
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const response = await getPostComments(firestore, slug);
  if (response.success) comments.value = response.comments;
};

const addNewComment = async () => {
  if (!params.slug) return;
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  isSubmitting.value = true;
  const commentData = { ...newComment.value };
  const response = await addPostComment(firestore, slug, commentData);
  if (response.success) {
    await fetchComments();
    newComment.value = { name: "", email: "", text: "" };
  }
  isSubmitting.value = false;
};

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatPublishDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
};

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    "Личностный рост": "category-growth",
    Отношения: "category-relations",
    Продуктивность: "category-productivity",
  };
  return classes[category] || "category-default";
};

const getCommentsWord = (count: number) => {
  if (count === 1) return "комментарий";
  if (count >= 2 && count <= 4) return "комментария";
  return "комментариев";
};

onMounted(async () => {
  if (post.value) {
    await fetchComments();
    postViews.value = await getPostViewCount(db, post.value._id);
  }
});

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
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `${siteUrl}${route.fullPath}`;
  const title = post.value?.title;
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title || "")}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title || "")}`,
  };
  if (typeof window !== "undefined") window.open(shareUrls[platform], "_blank");
};

const copyLink = async () => {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert("Ссылка скопирована!");
    }
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

const validateEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.toLowerCase());
</script>

<style scoped>
.blog-post-container {
  @apply rounded-2xl bg-slate-900/50 border border-cyan-500/20 overflow-hidden 
         backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 mb-12;
}

.featured-image-wrapper {
  @apply relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden;
}

.featured-image {
  @apply w-full h-full object-cover transition-transform duration-700 hover:scale-110;
}

.image-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent;
}

.category-badge {
  @apply absolute top-6 left-6 px-4 py-2 rounded-xl text-sm font-medium 
         backdrop-blur-md border shadow-lg;
}

.category-growth {
  @apply bg-cyan-500/20 text-cyan-300 border-cyan-500/40;
}

.category-relations {
  @apply bg-orange-500/20 text-orange-300 border-orange-500/40;
}

.category-productivity {
  @apply bg-purple-500/20 text-purple-300 border-purple-500/40;
}

.category-default {
  @apply bg-slate-500/20 text-slate-300 border-slate-500/40;
}

.content-wrapper {
  @apply px-6 sm:px-8 md:px-12 py-8 sm:py-10;
}

.article-title {
  @apply text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 
         leading-tight bg-gradient-to-r from-cyan-400 to-purple-400 
         bg-clip-text text-transparent;
}

.meta-info-container {
  @apply flex flex-col sm:flex-row sm:items-center sm:justify-between 
         pb-6 mb-8 border-b border-cyan-500/20 gap-4;
}

.meta-info-row {
  @apply flex flex-wrap items-center gap-4 sm:gap-6 text-sm;
}

.meta-item {
  @apply flex items-center gap-2 text-slate-400;
}

.share-button {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 
         text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 
         hover:border-cyan-500/50 transition-all duration-300 text-sm font-medium;
}

.prose-container {
  @apply text-slate-300 text-base sm:text-lg leading-relaxed;
}

.share-section {
  @apply p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/20 
         backdrop-blur-sm mb-12;
}

.share-header {
  @apply text-center mb-6;
}

.share-icon-wrapper {
  @apply w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 
         flex items-center justify-center;
}

.share-buttons-grid {
  @apply grid grid-cols-2 sm:grid-cols-4 gap-4;
}

.social-share-btn {
  @apply relative p-4 rounded-xl border overflow-hidden 
         transition-all duration-300 hover:transform hover:scale-105;
}

.social-btn-bg {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
}

.social-share-btn:hover .social-btn-bg {
  @apply opacity-100;
}

.social-btn-content {
  @apply relative z-10 flex items-center justify-center text-white font-medium;
}

.twitter-btn {
  @apply border-[#1DA1F2]/30 hover:border-[#1DA1F2];
}

.twitter-btn .social-btn-bg {
  @apply bg-gradient-to-r from-[#1DA1F2] to-[#1DA1F2]/80;
}

.facebook-btn {
  @apply border-[#4267B2]/30 hover:border-[#4267B2];
}

.facebook-btn .social-btn-bg {
  @apply bg-gradient-to-r from-[#4267B2] to-[#4267B2]/80;
}

.telegram-btn {
  @apply border-[#0088cc]/30 hover:border-[#0088cc];
}

.telegram-btn .social-btn-bg {
  @apply bg-gradient-to-r from-[#0088cc] to-[#0088cc]/80;
}

.copy-btn {
  @apply border-cyan-500/30 hover:border-cyan-500;
}

.copy-btn .social-btn-bg {
  @apply bg-gradient-to-r from-cyan-500 to-purple-500;
}

.comments-section {
  @apply p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-purple-500/20 
         backdrop-blur-sm mb-12;
}

.comments-header {
  @apply mb-8;
}

.comments-icon-wrapper {
  @apply w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 
         flex items-center justify-center;
}

.comment-form {
  @apply mb-8 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50;
}

.form-fields-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4;
}

.form-input {
  @apply w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 
         text-white placeholder-slate-400 focus:outline-none 
         focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all;
}

.form-textarea {
  @apply w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 
         text-white placeholder-slate-400 resize-y mb-4
         focus:outline-none focus:border-cyan-500 focus:ring-1 
         focus:ring-cyan-500 transition-all;
}

.submit-button {
  @apply px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 
         text-white font-medium hover:from-cyan-600 hover:to-purple-600 
         transition-all duration-300 transform hover:scale-105 
         shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
         disabled:shadow-none inline-flex items-center justify-center;
}

.comments-list {
  @apply space-y-4;
}

.comment-card {
  @apply p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 
         hover:border-purple-500/30 transition-all duration-300;
}

.comment-header {
  @apply flex items-center gap-3 mb-3;
}

.comment-avatar {
  @apply w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 
         flex items-center justify-center text-white flex-shrink-0;
}

.comment-author {
  @apply block font-medium text-cyan-400 text-sm;
}

.comment-date {
  @apply block text-xs text-slate-500;
}

.comment-text {
  @apply text-slate-300 text-sm leading-relaxed;
}

.no-comments {
  @apply text-center py-12 text-slate-400;
}

.newsletter-section {
  @apply p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-purple-500/10 
         via-pink-500/10 to-cyan-500/10 border border-purple-500/20 
         backdrop-blur-sm;
}

.newsletter-content {
  @apply text-center max-w-2xl mx-auto;
}

.newsletter-icon {
  @apply w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br 
         from-purple-500/20 to-pink-500/20 flex items-center justify-center 
         text-purple-400;
}

.newsletter-form {
  @apply flex flex-col sm:flex-row gap-3;
}

.newsletter-input {
  @apply flex-1 px-4 py-3 rounded-lg sm:rounded-r-none bg-slate-900/50 
         border border-slate-700 text-white placeholder-slate-400 
         focus:outline-none focus:border-purple-500 focus:ring-1 
         focus:ring-purple-500 transition-all;
}

.newsletter-button {
  @apply relative px-8 py-3 rounded-lg sm:rounded-l-none overflow-hidden 
         transition-all duration-300;
}

.newsletter-button:hover .button-gradient {
  @apply scale-110;
}

.button-gradient {
  @apply absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 
         to-cyan-500 transition-transform duration-300;
}

.button-text {
  @apply relative z-10 text-white font-medium flex items-center justify-center;
}

.modal-overlay {
  @apply fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center 
         justify-center z-50 p-4;
}

.modal-content {
  @apply bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 
         p-6 max-w-md w-full;
}

.modal-header {
  @apply flex justify-between items-center mb-6;
}

.modal-close {
  @apply text-slate-400 hover:text-cyan-400 transition-colors p-2;
}

.modal-body {
  @apply space-y-3;
}

.modal-share-btn {
  @apply w-full p-4 rounded-xl text-white font-medium flex items-center 
         justify-center hover:opacity-90 transition-all duration-300;
}

/* Prose styles for article content */
:deep(.prose-container h2) {
  @apply text-2xl sm:text-3xl font-bold text-white mt-8 mb-4;
}

:deep(.prose-container h3) {
  @apply text-xl sm:text-2xl font-semibold text-white mt-6 mb-3;
}

:deep(.prose-container p) {
  @apply text-slate-300 mb-4 leading-relaxed;
}

:deep(.prose-container ul),
:deep(.prose-container ol) {
  @apply mb-4 pl-6;
}

:deep(.prose-container li) {
  @apply mb-2 text-slate-300;
}

:deep(.prose-container a) {
  @apply text-cyan-400 hover:text-cyan-300 underline;
}

:deep(.prose-container img) {
  @apply rounded-xl my-6 border border-cyan-500/20;
}

:deep(.prose-container blockquote) {
  @apply border-l-4 border-cyan-500/50 pl-4 py-2 my-6 italic text-slate-300;
}

:deep(.prose-container code) {
  @apply bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded;
}

:deep(.prose-container pre) {
  @apply bg-slate-800/50 border border-slate-700 text-slate-300 p-4 
         rounded-xl my-6 overflow-x-auto;
}
</style>
