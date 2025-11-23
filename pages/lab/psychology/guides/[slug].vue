<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />

      <!-- Guide Content Container -->
      <div v-if="guide" class="mt-8">
        <!-- Hero Section -->
        <div class="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
          <!-- Image with Overlay -->
          <div class="relative h-64 sm:h-80 md:h-96">
            <div class="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-slate-900/90 z-10"></div>
            <nuxt-img v-if="guide.image" :src="urlFor(guide.image)?.width(1200).height(630).url()" :alt="guide.title"
              class="w-full h-full object-cover" width="1200" height="630" loading="lazy" format="webp" quality="85" />
          </div>

          <!-- Title Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
            <div class="max-w-4xl">
              <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {{ guide.title }}
              </h1>
            </div>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Description -->
            <div
              class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {{ guide.description }}
              </p>
            </div>

            <!-- Key Sections Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Benefits -->
              <div
                class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm h-full">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <span
                    class="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mr-3 text-cyan-600 dark:text-cyan-400">
                    <i class="fas fa-star"></i>
                  </span>
                  Как это поможет вам?
                </h3>
                <ul class="space-y-3">
                  <li v-for="(benefit, index) in guide.benefits" :key="index" class="flex items-start">
                    <i class="fas fa-check text-cyan-500 mt-1 mr-3 text-sm"></i>
                    <span class="text-slate-600 dark:text-slate-400 text-sm">{{ benefit }}</span>
                  </li>
                </ul>
              </div>

              <!-- Target Audience -->
              <div
                class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm h-full">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <span
                    class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-purple-600 dark:text-purple-400">
                    <i class="fas fa-users"></i>
                  </span>
                  Для кого это руководство?
                </h3>
                <ul class="space-y-3">
                  <li v-for="(audience, index) in guide.targetAudience" :key="index" class="flex items-start">
                    <i class="fas fa-check text-purple-500 mt-1 mr-3 text-sm"></i>
                    <span class="text-slate-600 dark:text-slate-400 text-sm">{{ audience }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- What You Get & Why Download -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- What You Get -->
              <div
                class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <span
                    class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400">
                    <i class="fas fa-box-open"></i>
                  </span>
                  Что внутри?
                </h3>
                <ul class="space-y-3">
                  <li v-for="(item, index) in guide.whatYouGet" :key="index" class="flex items-start">
                    <i class="fas fa-check text-blue-500 mt-1 mr-3 text-sm"></i>
                    <span class="text-slate-600 dark:text-slate-400 text-sm">{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Why Download -->
              <div
                class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <span
                    class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 text-green-600 dark:text-green-400">
                    <i class="fas fa-download"></i>
                  </span>
                  Почему стоит скачать?
                </h3>
                <ul class="space-y-3">
                  <li v-for="(item, index) in guide.whyDownload" :key="index" class="flex items-start">
                    <i class="fas fa-check text-green-500 mt-1 mr-3 text-sm"></i>
                    <span class="text-slate-600 dark:text-slate-400 text-sm">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Comments Section -->
            <div
              class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <i class="fas fa-comments text-cyan-500 mr-3"></i>
                Комментарии
              </h2>

              <!-- Comment Form -->
              <form @submit.prevent="addNewComment" class="mb-8">
                <div class="flex flex-col gap-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input v-model="newComment.name" type="text" placeholder="Ваше имя"
                      class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      required />
                    <input v-model="newComment.email" type="email" placeholder="Ваш email (не публикуется)"
                      class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      required />
                  </div>
                  <textarea v-model="newComment.text" placeholder="Ваш комментарий"
                    class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white min-h-[100px] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    required></textarea>
                  <button type="submit" :disabled="isSubmitting"
                    class="self-start px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-bold transition-colors disabled:opacity-50">
                    {{ isSubmitting ? "Отправка..." : "Отправить" }}
                  </button>
                </div>
              </form>

              <!-- Comments List -->
              <div class="space-y-4">
                <div v-for="comment in comments" :key="comment.id"
                  class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-bold text-slate-900 dark:text-white">{{ comment.name }}</span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="text-slate-600 dark:text-slate-300 text-sm">{{ comment.text }}</p>
                </div>
                <p v-if="comments.length === 0" class="text-center text-slate-500 dark:text-slate-400 py-4">
                  Пока нет комментариев. Будьте первым!
                </p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Download Card -->
            <div
              class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-lg sticky top-24">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Скачать руководство</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Получите полную версию руководства в формате PDF для удобного чтения.
              </p>

              <a v-if="guide.pdfFile?.asset?.url" :href="guide.pdfFile.asset.url"
                class="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 mb-6"
                download>
                <i class="fas fa-file-pdf"></i>
                {{ guide.callToAction || "Скачать PDF" }}
              </a>

              <div class="border-t border-slate-100 dark:border-slate-800 pt-6">
                <p class="text-sm font-medium text-slate-900 dark:text-white mb-3">Поделиться:</p>
                <div class="flex flex-wrap gap-2">
                  <button @click="shareViaWhatsApp"
                    class="w-10 h-10 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center transition-colors">
                    <i class="fab fa-whatsapp"></i>
                  </button>
                  <button @click="shareViaTelegram"
                    class="w-10 h-10 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors">
                    <i class="fab fa-telegram-plane"></i>
                  </button>
                  <button @click="shareViaEmail"
                    class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors">
                    <i class="fas fa-envelope"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex flex-col items-center justify-center py-20">
        <div class="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p class="text-slate-500 dark:text-slate-400">Загрузка руководства...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "laboratory",
});
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { GUIDE_BY_SLUG_QUERY } from "~/api/sanity/queries";
import { addGuideComment, getGuideComments } from "@/api/firebase/comments";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

// --- Route & Sanity ---
const route = useRoute();
const { params } = route;
const { data: guide } = await useSanityQuery<SanityDocument>(
  GUIDE_BY_SLUG_QUERY,
  params
);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// --- Firestore (client only) ---
let firestore: ReturnType<
  typeof import("~/plugins/firebase").useFirestore
> | null = null;
const getClientFirestore = () => {
  if (!process.client) return null;
  if (!firestore) {
    const { useFirestore } = require("~/plugins/firebase");
    firestore = useFirestore();
  }
  return firestore;
};

// --- Comments ---
interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: Date;
}

const comments = ref<Comment[]>([]);
const newComment = reactive({
  name: "",
  email: "",
  text: "",
});
const isSubmitting = ref(false);

const fetchComments = async () => {
  if (!params.slug) return;
  const fs = getClientFirestore();
  if (!fs) return;
  const response = await getGuideComments(fs, params.slug);
  if (response.success) {
    comments.value = response.comments;
  }
};

const addNewComment = async () => {
  if (!params.slug) return;
  const fs = getClientFirestore();
  if (!fs) return;

  isSubmitting.value = true;
  const commentData = {
    name: newComment.name,
    email: newComment.email,
    text: newComment.text,
  };

  const response = await addGuideComment(fs, params.slug, commentData);
  if (response.success) {
    await fetchComments();
    newComment.name = "";
    newComment.email = "";
    newComment.text = "";
  }
  isSubmitting.value = false;
};

// --- Lifecycle ---
onMounted(async () => {
  if (guide.value) {
    await fetchComments();
  }
});

// --- Utility ---
const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// --- Share Functions ---
const shareViaWhatsApp = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    `${guide.value?.title} - Check out this guide!`
  );
  window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
};

const shareViaTelegram = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    guide.value?.title || "Check out this guide!"
  );
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
};

const shareViaEmail = () => {
  const subject = encodeURIComponent(guide.value?.title || "Interesting Guide");
  const body = encodeURIComponent(
    `Check out this guide: ${window.location.href}`
  );
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};
</script>
