<template>
  <div class="min-h-screen text-gray-100 bg-gray-900">
    <div class="container mx-auto max-w-6xl py-8 px-4 xl:px-0 sm:py-12">
      <!-- Back Navigation -->
      <div class="mb-8">
        <NuxtLink
          to="/courses/guides"
          class="group inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 font-medium"
        >
          <i
            class="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform text-current"
          ></i>
          Назад к руководствам
        </NuxtLink>
      </div>

      <!-- Guide Content Container -->
      <div
        v-if="guide"
        class="bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
      >
        <!-- Hero Section -->
        <div class="relative">
          <!-- Image with Overlay -->
          <div class="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/90 z-10"
            ></div>
            <nuxt-img
              v-if="guide.image"
              :src="urlFor(guide.image)?.width(1200).height(630).url()"
              :alt="guide.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              width="1200"
              height="630"
              loading="lazy"
              format="webp"
              quality="85"
            />
          </div>

          <!-- Title Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20">
            <div class="max-w-3xl">
              <h1
                class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              >
                {{ guide.title }}
              </h1>
            </div>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          <!-- Description -->
          <div class="max-w-3xl">
            <p class="text-base sm:text-lg text-gray-300 leading-relaxed">
              {{ guide.description }}
            </p>
          </div>

          <!-- Progress Indicator -->
          <div class="py-4 flex justify-center">
            <div class="flex space-x-2 items-center">
              <span class="h-1 w-12 sm:w-16 bg-cyan-500 rounded-full"></span>
              <span
                class="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"
              ></span>
              <span class="h-1 w-12 sm:w-16 bg-cyan-500 rounded-full"></span>
            </div>
          </div>

          <!-- Key Sections Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <!-- Benefits -->
            <div
              class="bg-gray-700/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40 h-full"
            >
              <h3
                class="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 mr-2 sm:mr-3"
                >
                  <i class="fas fa-star text-cyan-500"></i>
                </span>
                Как это поможет вам?
              </h3>
              <ul class="space-y-3 sm:space-y-4">
                <li
                  v-for="(benefit, index) in guide.benefits"
                  :key="index"
                  class="flex items-start group"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-check text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ benefit }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Target Audience -->
            <div
              class="bg-gray-700/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40 h-full"
            >
              <h3
                class="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 mr-2 sm:mr-3"
                >
                  <i class="fas fa-users text-cyan-500"></i>
                </span>
                Для кого это руководство?
              </h3>
              <ul class="space-y-3 sm:space-y-4">
                <li
                  v-for="(audience, index) in guide.targetAudience"
                  :key="index"
                  class="flex items-start group"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-user text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ audience }}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <!-- What You Get -->
            <div
              class="bg-gray-700/30 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40"
            >
              <h3
                class="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 mr-2 sm:mr-3"
                >
                  <i class="fas fa-box-open text-cyan-500"></i>
                </span>
                Что внутри?
              </h3>
              <div class="">
                <div
                  v-for="(item, index) in guide.whatYouGet"
                  :key="index"
                  class="flex items-start group p-2 sm:p-3 rounded-lg hover:bg-gray-600/20 transition-colors"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-check text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Why Download -->
            <div
              class="bg-gray-700/30 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40"
            >
              <h3
                class="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 mr-2 sm:mr-3"
                >
                  <i class="fas fa-download text-cyan-500"></i>
                </span>
                Почему стоит скачать?
              </h3>
              <div class="">
                <div
                  v-for="(item, index) in guide.whyDownload"
                  :key="index"
                  class="flex items-start group p-2 sm:p-3 rounded-lg hover:bg-gray-600/20 transition-colors"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-check text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Download Button and Share Options -->
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-4 sm:pt-6"
          >
            <a
              v-if="guide.pdfFile?.asset?.url"
              :href="guide.pdfFile.asset.url"
              class="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 overflow-hidden font-medium text-base sm:text-lg transition-all duration-300 ease-out rounded-xl group w-full sm:w-auto"
              download
            >
              <span
                class="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 group-hover:from-cyan-600 group-hover:via-fuchsia-600 group-hover:to-purple-600 transition-all duration-500"
              ></span>
              <span
                class="absolute -bottom-1 left-0 w-full h-1 bg-white/20 transition-all duration-300 group-hover:h-full group-hover:opacity-10"
              ></span>
              <span
                class="relative flex items-center justify-center gap-2 text-white"
              >
                <i class="fas fa-file-pdf"></i>
                {{ guide.callToAction || "Скачать PDF" }}
              </span>
            </a>

            <!-- Share Options -->
            <div
              class="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-0"
            >
              <!-- WhatsApp -->
              <button
                @click="shareViaWhatsApp"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share via WhatsApp"
              >
                <i class="fab fa-whatsapp text-gray-300 hover:text-white"></i>
              </button>

              <!-- Telegram -->
              <button
                @click="shareViaTelegram"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share via Telegram"
              >
                <i
                  class="fab fa-telegram-plane text-gray-300 hover:text-white"
                ></i>
              </button>

              <!-- Email -->
              <button
                @click="shareViaEmail"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share via Email"
              >
                <i class="fas fa-envelope text-gray-300 hover:text-white"></i>
              </button>

              <!-- Facebook -->
              <button
                @click="shareViaFacebook"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share on Facebook"
              >
                <i class="fab fa-facebook-f text-gray-300 hover:text-white"></i>
              </button>

              <!-- Instagram -->
              <button
                @click="shareViaInstagram"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share on Instagram"
              >
                <i class="fab fa-instagram text-gray-300 hover:text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments Section - Significantly Improved -->
      <div v-if="guide" class="mt-6 sm:mt-8">
        <div
          class="bg-gray-800/50 rounded-2xl p-4 sm:p-6 border border-gray-700/50"
        >
          <h2
            class="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6 flex items-center"
          >
            <span
              class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 mr-2 sm:mr-3"
            >
              <i class="fas fa-comments text-cyan-500"></i>
            </span>
            Комментарии
          </h2>

          <!-- Comment Form -->
          <form @submit.prevent="addNewComment" class="mb-6 sm:mb-8">
            <div class="flex flex-col gap-3 sm:gap-4">
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  v-model="newComment.name"
                  type="text"
                  placeholder="Ваше имя"
                  class="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  required
                />
                <input
                  v-model="newComment.email"
                  type="email"
                  placeholder="Ваш email (не публикуется)"
                  class="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  required
                />
              </div>
              <textarea
                v-model="newComment.text"
                placeholder="Ваш комментарий"
                class="bg-gray-700/50 border border-gray-600/50 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-300 min-h-[80px] sm:min-h-[100px] focus:outline-none focus:border-cyan-500/50 transition-colors"
                required
              ></textarea>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="self-start px-4 sm:px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm sm:text-base text-white font-medium transition-colors disabled:bg-gray-600"
              >
                {{ isSubmitting ? "Отправка..." : "Отправить" }}
              </button>
            </div>
          </form>

          <!-- Comments List -->
          <div class="space-y-4 sm:space-y-6">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="bg-gray-700/30 rounded-xl p-3 sm:p-4 border border-gray-600/20"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2"
              >
                <span class="font-medium text-cyan-400">{{
                  comment.name
                }}</span>
                <span class="text-xs sm:text-sm text-gray-400">
                  {{ formatDate(comment.createdAt) }}
                </span>
              </div>
              <p class="text-sm sm:text-base text-gray-300">
                {{ comment.text }}
              </p>
            </div>
            <p
              v-if="comments.length === 0"
              class="text-sm sm:text-base text-gray-400 text-center py-4"
            >
              Пока нет комментариев. Будьте первым!
            </p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
      >
        <div class="relative w-16 h-16 sm:w-20 sm:h-20">
          <div
            class="absolute inset-0 border-4 border-cyan-500/20 rounded-full"
          ></div>
          <div
            class="absolute inset-0 border-4 border-t-transparent border-cyan-500 rounded-full animate-spin"
          ></div>
        </div>
        <p class="text-gray-300 text-base sm:text-lg mt-4 sm:mt-6">
          Загрузка руководства...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { GUIDE_BY_SLUG_QUERY } from "~/api/sanity/queries";
import { addGuideComment, getGuideComments } from "@/api/firebase/comments";

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

const shareViaFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareViaInstagram = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert("URL copied to clipboard! Paste it in Instagram to share.");
  });
};
</script>
