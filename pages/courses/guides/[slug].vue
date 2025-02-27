<template>
  <div class="min-h-screen text-gray-100 bg-gray-900">
    <div class="container mx-auto max-w-6xl py-8 px-4 sm:px-6 sm:py-12">
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
        class="bg-gray-800/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50"
      >
        <!-- Hero Section -->
        <div class="relative">
          <!-- Image with Overlay -->
          <div class="relative h-64 sm:h-80 md:h-96 overflow-hidden">
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
          <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
            <div class="max-w-3xl">
              <h1
                class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              >
                {{ guide.title }}
              </h1>
            </div>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="p-6 sm:p-8 space-y-8">
          <!-- Description -->
          <div class="max-w-3xl">
            <p class="text-lg text-gray-300 leading-relaxed">
              {{ guide.description }}
            </p>
          </div>

          <!-- Progress Indicator -->
          <div class="py-4 flex justify-center">
            <div class="flex space-x-2 items-center">
              <span class="h-1 w-16 bg-cyan-500 rounded-full"></span>
              <span
                class="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"
              ></span>
              <span class="h-1 w-16 bg-cyan-500 rounded-full"></span>
            </div>
          </div>

          <!-- Key Sections Grid -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Benefits -->
            <div
              class="bg-gray-700/30 rounded-2xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40 h-full"
            >
              <h3
                class="text-xl font-bold text-cyan-400 mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 mr-3"
                >
                  <i class="fas fa-star text-cyan-500"></i>
                </span>
                Как это поможет вам?
              </h3>
              <ul class="space-y-4">
                <li
                  v-for="(benefit, index) in guide.benefits"
                  :key="index"
                  class="flex items-start group"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-3 h-5 w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-check text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ benefit }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Target Audience -->
            <div
              class="bg-gray-700/30 rounded-2xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40 h-full"
            >
              <h3
                class="text-xl font-bold text-cyan-400 mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 mr-3"
                >
                  <i class="fas fa-users text-cyan-500"></i>
                </span>
                Для кого это руководство?
              </h3>
              <ul class="space-y-4">
                <li
                  v-for="(audience, index) in guide.targetAudience"
                  :key="index"
                  class="flex items-start group"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-3 h-5 w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-user text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ audience }}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- What You Get -->
            <div
              class="bg-gray-700/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40"
            >
              <h3
                class="text-xl font-bold text-cyan-400 mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 mr-3"
                >
                  <i class="fas fa-box-open text-cyan-500"></i>
                </span>
                Что внутри?
              </h3>
              <div class="">
                <div
                  v-for="(item, index) in guide.whatYouGet"
                  :key="index"
                  class="flex items-start group p-3 rounded-lg hover:bg-gray-600/20 transition-colors"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-3 h-5 w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-check text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Why Download -->
            <div
              class="bg-gray-700/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-700/40"
            >
              <h3
                class="text-xl font-bold text-cyan-400 mb-4 flex items-center"
              >
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 mr-3"
                >
                  <i class="fas fa-download text-cyan-500"></i>
                </span>
                Почему стоит скачать?
              </h3>
              <div class="">
                <div
                  v-for="(item, index) in guide.whyDownload"
                  :key="index"
                  class="flex items-start group p-3 rounded-lg hover:bg-gray-600/20 transition-colors"
                >
                  <span
                    class="flex-shrink-0 mt-1 mr-3 h-5 w-5 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors"
                  >
                    <i
                      class="fas fa-check text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    ></i>
                  </span>
                  <span
                    class="text-gray-300 group-hover:text-white transition-colors"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Download Button and Share Options -->
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6"
          >
            <a
              v-if="guide.pdfFile?.asset?.url"
              :href="guide.pdfFile.asset.url"
              class="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-lg transition-all duration-300 ease-out rounded-xl group w-full sm:w-auto"
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
            <div class="flex gap-3">
              <button
                class="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share via Email"
              >
                <i class="fas fa-envelope text-gray-300 hover:text-white"></i>
              </button>
              <button
                class="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share on Twitter"
              >
                <i class="fab fa-twitter text-gray-300 hover:text-white"></i>
              </button>
              <button
                class="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                title="Share on Facebook"
              >
                <i class="fab fa-facebook-f text-gray-300 hover:text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="relative w-20 h-20">
          <div
            class="absolute inset-0 border-4 border-cyan-500/20 rounded-full"
          ></div>
          <div
            class="absolute inset-0 border-4 border-t-transparent border-cyan-500 rounded-full animate-spin"
          ></div>
        </div>
        <p class="text-gray-300 text-lg mt-6">Загрузка руководства...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { GUIDE_BY_SLUG_QUERY } from "~/api/sanity/queries";

const { params } = useRoute();
const { data: guide } = (await useSanityQuery)<SanityDocument>(
  GUIDE_BY_SLUG_QUERY,
  params
);
console.log(guide);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>
