<template>
  <div
    class="min-h-screen bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500">
    <!-- Navigation -->
    <TopBar />

    <main class="container mx-auto max-w-4xl px-6 py-12">
      <!-- Back Navigation -->
      <nav class="mb-12 animate-fade-up" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-3 text-sm">
          <li class="flex items-center">
            <NuxtLink to="/blog"
              class="text-stone-400 hover:text-mindqlab-calm-accent transition-colors flex items-center">
              <i class="fas fa-arrow-left mr-2 text-[10px]"></i>
              <span>Блог</span>
            </NuxtLink>
          </li>
          <li class="flex items-center">
            <i class="fas fa-chevron-right text-stone-200 dark:text-stone-800 mx-2 text-[8px]"></i>
            <span class="text-stone-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-md">
              {{ post?.title || 'Статья' }}
            </span>
          </li>
        </ol>
      </nav>

      <article v-if="post" class="animate-fade-up" style="animation-delay: 0.1s">
        <!-- Featured Image -->
        <div
          class="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-stone-100 dark:border-stone-800 shadow-xl shadow-stone-200/20 dark:shadow-none mb-12">
          <nuxt-img v-if="post.image" :src="urlFor(post?.image)?.width(1200).height(675).url()" :alt="post?.title"
            class="w-full h-full object-cover transition-transform duration-1000" width="1200" height="675"
            loading="lazy" format="webp" quality="90" />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>

          <span
            class="absolute top-6 left-6 px-5 py-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-mindqlab-calm-accent border border-stone-100/50">
            {{ post.category || "Статья" }}
          </span>
        </div>

        <!-- Content Header -->
        <header class="mb-12">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 dark:text-white mb-8 leading-[1.15]">
            {{ post.title }}
          </h1>

          <div
            class="flex flex-wrap items-center gap-6 pb-8 border-b border-stone-100 dark:border-stone-800/50 text-[11px] font-bold uppercase tracking-widest text-stone-400">
            <div class="flex items-center">
              <i class="far fa-calendar mr-2 text-mindqlab-calm-accent opacity-70"></i>
              <span>{{ formatPublishDate(post.publishedAt) }}</span>
            </div>
            <div class="flex items-center">
              <i class="far fa-clock mr-2 text-mindqlab-calm-accent opacity-70"></i>
              <span>{{ post.readtime }} мин чтения</span>
            </div>
            <div class="flex items-center">
              <i class="far fa-eye mr-2 text-mindqlab-calm-accent opacity-70"></i>
              <span>{{ postViews }} просмотров</span>
            </div>
          </div>
        </header>

        <!-- Article Content -->
        <div class="prose-container mb-20 animate-fade-up" style="animation-delay: 0.2s">
          <SanityContent v-if="post.body" :blocks="post.body" />
        </div>
      </article>

      <!-- Bottom Sections (Cards) -->
      <div class="grid grid-cols-1 gap-8 mb-24 animate-fade-up" style="animation-delay: 0.3s">

        <!-- Share & Interaction -->
        <div
          class="p-10 bg-white dark:bg-stone-900/40 rounded-[2.5rem] border border-stone-100 dark:border-stone-800 text-center">
          <h3 class="text-2xl font-light mb-8 text-stone-900 dark:text-white italic">Понравилась статья?</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <button @click="shareOn('twitter')" class="social-share-btn">
              <i class="fab fa-twitter"></i>
            </button>
            <button @click="shareOn('facebook')" class="social-share-btn">
              <i class="fab fa-facebook"></i>
            </button>
            <button @click="shareOn('telegram')" class="social-share-btn">
              <i class="fab fa-telegram"></i>
            </button>
            <button @click="copyLink" class="social-share-btn">
              <i class="fas fa-link"></i>
            </button>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="p-10 bg-white dark:bg-stone-900/40 rounded-[3rem] border border-stone-100 dark:border-stone-800">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-2xl font-light text-stone-900 dark:text-white">Комментарии</h2>
            <span class="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              {{ comments.length }} {{ getCommentsWord(comments.length) }}
            </span>
          </div>

          <!-- Comment Form -->
          <form @submit.prevent="addNewComment" class="mb-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input v-model="newComment.name" type="text" placeholder="Ваше имя" class="form-input" required />
              <input v-model="newComment.email" type="email" placeholder="Email" class="form-input" required />
            </div>
            <textarea v-model="newComment.text" placeholder="Ваш комментарий..." class="form-textarea" rows="4"
              required></textarea>
            <div class="flex justify-end">
              <button type="submit" :disabled="isSubmitting"
                class="px-10 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium text-sm transition-all hover:bg-opacity-90 disabled:opacity-50">
                {{ isSubmitting ? "Отправка..." : "Отправить" }}
              </button>
            </div>
          </form>

          <!-- List -->
          <div class="space-y-6">
            <div v-for="comment in comments" :key="comment.id"
              class="pb-6 border-b border-stone-50 dark:border-stone-800/40 last:border-0">
              <div class="flex items-center space-x-4 mb-3">
                <div
                  class="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                  <i class="fas fa-user text-xs"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-stone-900 dark:text-white">{{ comment.name }}</div>
                  <div class="text-[10px] text-stone-400 uppercase tracking-widest">{{ formatDate(comment.createdAt) }}
                  </div>
                </div>
              </div>
              <p class="text-sm text-stone-600 dark:text-stone-400 leading-relaxed pl-14">{{ comment.text }}</p>
            </div>

            <div v-if="comments.length === 0" class="text-center py-12 opacity-40">
              <i class="far fa-comment-dots text-2xl mb-4 block"></i>
              <p class="text-xs font-medium uppercase tracking-widest italic">Пока нет обсуждений. Будьте первым.</p>
            </div>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div
          class="p-10 bg-mindqlab-calm-accent/5 dark:bg-mindqlab-calm-accent/10 rounded-[3rem] border border-mindqlab-calm-accent/20 text-center">
          <div
            class="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white dark:bg-stone-900 flex items-center justify-center text-mindqlab-calm-accent shadow-sm">
            <i class="fas fa-paper-plane text-2xl"></i>
          </div>
          <h2 class="text-2xl font-light text-stone-900 dark:text-white mb-4">Вам будет что обсудить</h2>
          <p class="text-stone-500 dark:text-stone-400 font-light mb-10 max-w-md mx-auto">
            Получайте новые статьи и результаты наших исследований раз в неделю.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input type="email" v-model="email" placeholder="Ваш @email"
              class="form-input flex-grow rounded-full text-center sm:text-left px-8" />
            <button @click="subscribeEmail"
              class="px-10 py-4 bg-mindqlab-calm-accent text-white rounded-full font-medium transition-all hover:bg-opacity-90 shadow-lg shadow-mindqlab-calm-accent/20">
              Подписаться
            </button>
          </div>
        </div>

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
import { ref, watch, onMounted, computed } from "vue";
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

onMounted(async () => {
  if (post.value) {
    await fetchComments();
    postViews.value = await getPostViewCount(db, post.value._id);
  }
});

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
</script>

<style scoped>
.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.social-share-btn {
  @apply w-12 h-12 rounded-full border border-stone-100 dark:border-stone-800 flex items-center justify-center text-stone-400 hover:text-mindqlab-calm-accent hover:border-mindqlab-calm-accent transition-all duration-300;
}

.form-input {
  @apply w-full px-6 py-4 rounded-2xl bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100 dark:border-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-mindqlab-calm-accent/50 transition-all text-sm;
}

.form-textarea {
  @apply w-full px-6 py-4 rounded-3xl bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100 dark:border-stone-800 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-mindqlab-calm-accent/50 transition-all text-sm mb-4;
}

/* Prose Styles */
:deep(.prose-container h2) {
  @apply text-2xl sm:text-3xl font-light text-stone-900 dark:text-white mt-16 mb-8;
}

:deep(.prose-container h3) {
  @apply text-xl sm:text-2xl font-light text-stone-900 dark:text-white mt-12 mb-6;
}

:deep(.prose-container p) {
  @apply text-sm sm:text-base text-stone-600 dark:text-stone-400 mb-8 leading-relaxed font-light;
}

:deep(.prose-container ul),
:deep(.prose-container ol) {
  @apply mb-8 pl-6 space-y-4;
}

:deep(.prose-container li) {
  @apply text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light;
}

:deep(.prose-container a) {
  @apply text-mindqlab-calm-accent hover:opacity-80 underline underline-offset-4 decoration-mindqlab-calm-accent/30;
}

:deep(.prose-container img) {
  @apply rounded-[2.5rem] my-12 border border-stone-100 dark:border-stone-800;
}

:deep(.prose-container blockquote) {
  @apply border-l-2 border-mindqlab-calm-accent pl-8 py-2 my-12 italic text-stone-500 dark:text-stone-500 font-light text-lg;
}

:deep(.prose-container code) {
  @apply bg-stone-100 dark:bg-stone-800/50 text-mindqlab-calm-accent px-2 py-0.5 rounded-md text-sm;
}

:deep(.prose-container pre) {
  @apply bg-stone-900 text-stone-100 p-8 rounded-[2rem] my-12 overflow-x-auto text-xs;
}
</style>
