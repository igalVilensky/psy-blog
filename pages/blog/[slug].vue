<template>
  <div
    class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white font-sans transition-colors duration-500">
    <!-- Navigation -->
    <TopBar />

    <main class="container mx-auto max-w-4xl px-6 py-12">
      <!-- Back Navigation -->
      <nav class="mb-12" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-3 text-sm">
          <li class="flex items-center">
            <NuxtLink to="/blog"
              class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-2">
              <i class="fas fa-arrow-left text-xs"></i>
              <span>Назад к блогу</span>
            </NuxtLink>
          </li>
          <li class="flex items-center">
            <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 mx-2 text-xs"></i>
            <span class="text-stone-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-md">
              {{ post?.title || 'Статья' }}
            </span>
          </li>
        </ol>
      </nav>

      <article v-if="post" class="space-y-8">
        <!-- Article Header -->
        <div class="space-y-6">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
              <span class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                {{ post.category || "Статья" }}
              </span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">
              {{ post.title }}
            </h1>
          </div>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-6 text-sm text-stone-500 dark:text-stone-400">
            <div class="flex items-center gap-2">
              <i class="far fa-calendar text-stone-400"></i>
              <span>{{ formatPublishDate(post.publishedAt) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="far fa-clock text-stone-400"></i>
              <span>{{ post.readtime }} мин чтения</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="far fa-eye text-stone-400"></i>
              <span>{{ postViews }} просмотров</span>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div v-if="post.image" class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <nuxt-img :src="urlFor(post.image)?.width(1200).height(675).url()" :alt="post.title"
            class="w-full h-auto object-cover" width="1200" height="675" loading="lazy" format="webp" quality="90" />
        </div>

        <!-- Article Body -->
        <div class="prose-container">
          <SanityContent v-if="post.body" :blocks="post.body" />
        </div>

        <!-- Share Section -->
        <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
          <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Понравилась статья?</h3>
          <div class="flex flex-wrap gap-3">
            <button @click="shareOn('twitter')"
              class="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
              <i class="fab fa-twitter mr-2"></i>
              Twitter
            </button>
            <button @click="shareOn('facebook')"
              class="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
              <i class="fab fa-facebook mr-2"></i>
              Facebook
            </button>
            <button @click="shareOn('telegram')"
              class="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
              <i class="fab fa-telegram mr-2"></i>
              Telegram
            </button>
            <button @click="copyLink"
              class="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
              <i class="fas fa-link mr-2"></i>
              Копировать ссылку
            </button>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-stone-900 dark:text-white">Комментарии</h3>
            <span class="text-xs text-stone-500 dark:text-stone-400">
              {{ comments.length }} {{ getCommentsWord(comments.length) }}
            </span>
          </div>

          <!-- Comment Form -->
          <form @submit.prevent="addNewComment" class="mb-8 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="newComment.name" type="text" placeholder="Ваше имя" required
                class="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors" />
              <input v-model="newComment.email" type="email" placeholder="Email" required
                class="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors" />
            </div>
            <textarea v-model="newComment.text" placeholder="Ваш комментарий..." rows="4" required
              class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors resize-none"></textarea>
            <div class="flex justify-end">
              <button type="submit" :disabled="isSubmitting"
                class="px-6 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all disabled:opacity-50">
                {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
              </button>
            </div>
          </form>

          <!-- Comments List -->
          <div v-if="comments.length > 0" class="space-y-6">
            <div v-for="comment in comments" :key="comment.id"
              class="pb-6 border-b border-stone-100 dark:border-stone-800 last:border-0 last:pb-0">
              <div class="flex items-start gap-4 mb-3">
                <div class="w-10 h-10 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <i class="fas fa-user text-stone-400"></i>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <div class="text-sm font-semibold text-stone-900 dark:text-white">{{ comment.name }}</div>
                    <div class="text-xs text-stone-500 dark:text-stone-400">{{ formatDate(comment.createdAt) }}</div>
                  </div>
                  <p class="text-sm text-stone-700 dark:text-stone-300">{{ comment.text }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Comments State -->
          <div v-else class="text-center py-12 border border-stone-200 dark:border-stone-800 border-dashed">
            <i class="far fa-comment-dots text-3xl text-stone-300 dark:text-stone-700 mb-4"></i>
            <p class="text-sm text-stone-500 dark:text-stone-400">Пока нет комментариев. Будьте первым!</p>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-paper-plane text-stone-900 dark:text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-3">Новые статьи каждую неделю</h3>
            <p class="text-sm text-stone-600 dark:text-stone-400 mb-6">
              Получайте новые материалы и результаты исследований
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <input type="email" v-model="email" placeholder="Ваш email"
              class="flex-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors" />
            <button @click="subscribeEmail"
              class="px-6 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-colors">
              Подписаться
            </button>
          </div>
        </div>
      </article>

      <!-- Loading State -->
      <div v-else class="flex items-center justify-center py-32">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ref, onMounted, computed } from "vue";
import { getFirestore } from "firebase/firestore";
import { useFirestore } from "~/plugins/firebase";
import { subscribeUser } from "@/api/firebase/contact";
import { getPostViewCount } from "@/api/firebase/views";
import { addPostComment, getPostComments } from "@/api/firebase/comments";
import { createError } from "h3";
import TopBar from '~/components/navigation/TopBar.vue';
import Footer from '~/components/ui/Footer.vue';

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

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Статья не найдена" });
}

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

const metaDescription = computed(() => post.value?.excerpt || getPlainText(post.value?.body));
const postImageUrl = computed(() => post.value?.image ? urlFor(post.value.image)?.width(1200).height(630).url() : `${siteUrl}/default-og-image.png`);

useSeoMeta({
  title: () => `${post.value?.title} | MindQLab`,
  description: metaDescription,
  ogTitle: () => `${post.value?.title} | MindQLab`,
  ogDescription: metaDescription,
  ogImage: postImageUrl,
  ogType: "article",
});

// Client-only state
const db = getFirestore();
const firestore = useFirestore();
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
  const response = await addPostComment(firestore, slug, { ...newComment.value });
  if (response.success) {
    await fetchComments();
    newComment.value = { name: "", email: "", text: "" };
  }
  isSubmitting.value = false;
};

const formatPublishDate = (dateString: string) => new Date(dateString).toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
const formatDate = (date: Date) => new Date(date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
const getCommentsWord = (count: number) => count === 1 ? "комментарий" : (count >= 2 && count <= 4 ? "комментария" : "комментариев");

const shareOn = (platform: "twitter" | "facebook" | "telegram") => {
  const url = window.location.href;
  const title = post.value?.title || "";
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  };
  window.open(shareUrls[platform], "_blank");
};

const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
  alert("Ссылка скопирована!");
};

const subscribeEmail = async () => {
  if (!email.value.includes('@')) return alert("Введите корректный email");
  const result = await subscribeUser(db, email.value);
  if (result.success) { email.value = ""; alert(result.message); }
};

onMounted(async () => {
  if (post.value) {
    await fetchComments();
    postViews.value = await getPostViewCount(db, post.value._id);
  }
});
</script>

<style scoped>
/* Prose Styles */
:deep(.prose-container h2) {
  @apply text-xl font-bold text-stone-900 dark:text-white mt-8 mb-4;
}

:deep(.prose-container h3) {
  @apply text-lg font-bold text-stone-900 dark:text-white mt-6 mb-3;
}

:deep(.prose-container p) {
  @apply text-stone-700 dark:text-stone-300 mb-4 leading-relaxed;
}

:deep(.prose-container ul),
:deep(.prose-container ol) {
  @apply mb-4 pl-6 space-y-2;
}

:deep(.prose-container li) {
  @apply text-stone-700 dark:text-stone-300;
}

:deep(.prose-container a) {
  @apply text-stone-900 dark:text-white underline hover:no-underline;
}

:deep(.prose-container img) {
  @apply my-6;
}

:deep(.prose-container blockquote) {
  @apply border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2 my-6 italic text-stone-600 dark:text-stone-400;
}

:deep(.prose-container code) {
  @apply bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white px-2 py-1 rounded text-sm;
}

:deep(.prose-container pre) {
  @apply bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white p-4 my-6 rounded overflow-x-auto;
}
</style>