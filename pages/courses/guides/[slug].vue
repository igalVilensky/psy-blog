<template>
  <div class="min-h-screen text-gray-100">
    <div class="container mx-auto max-w-6xl py-12">
      <!-- Back Navigation -->
      <div class="pl-6 sm:pl-0 mb-10">
        <NuxtLink
          to="/courses/guides"
          class="group inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-all duration-300"
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
        class="bg-gray-800/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 p-8 sm:p-12 space-y-8"
      >
        <!-- Image Section -->
        <div
          class="relative aspect-video rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.01]"
        >
          <nuxt-img
            v-if="guide.image"
            :src="urlFor(guide.image)?.width(1200).height(630).url()"
            :alt="guide.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width="1200"
            height="630"
            loading="lazy"
            format="webp"
            quality="80"
          />
        </div>

        <!-- Title and Description -->
        <div>
          <h1
            class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
          >
            {{ guide.title }}
          </h1>
          <p class="text-gray-300 mb-6 leading-relaxed">
            {{ guide.description }}
          </p>
        </div>

        <!-- Key Sections Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Benefits -->
          <div
            class="bg-gray-700/30 rounded-2xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30"
          >
            <h3 class="text-xl font-bold text-cyan-400 mb-4 flex items-center">
              <i class="fas fa-star mr-3 text-cyan-500"></i>
              Ключевые преимущества
            </h3>
            <ul class="space-y-3">
              <li
                v-for="(benefit, index) in guide.benefits"
                :key="index"
                class="flex items-start group"
              >
                <i
                  class="fas fa-check-circle h-5 w-5 text-cyan-400 mr-3 flex-shrink-0 mt-1 group-hover:text-cyan-300 transition-colors"
                ></i>
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
            class="bg-gray-700/30 rounded-2xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30"
          >
            <h3
              class="text-2xl font-semibold text-cyan-400 mb-4 flex items-center"
            >
              <i class="fas fa-users mr-3 text-cyan-500"></i>
              Для кого это руководство?
            </h3>
            <ul class="text-gray-300 space-y-2">
              <li
                v-for="(audience, index) in guide.targetAudience"
                :key="index"
                class="flex items-start group"
              >
                <i
                  class="fas fa-chevron-right mr-3 text-cyan-400 flex-shrink-0 mt-1 group-hover:text-cyan-300 transition-colors"
                ></i>
                <span class="group-hover:text-white transition-colors">
                  {{ audience }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- What You Get -->
        <div
          class="bg-gray-700/30 rounded-2xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-cyan-500/30"
        >
          <h3
            class="text-2xl font-semibold text-cyan-400 mb-4 flex items-center"
          >
            <i class="fas fa-box-open mr-3 text-cyan-500"></i>
            Что внутри?
          </h3>
          <ul class="text-gray-300 space-y-2 grid md:grid-cols-2 gap-2">
            <li
              v-for="(item, index) in guide.whatYouGet"
              :key="index"
              class="flex items-start group"
            >
              <i
                class="fas fa-chevron-right mr-3 text-cyan-400 flex-shrink-0 mt-1 group-hover:text-cyan-300 transition-colors"
              ></i>
              <span class="group-hover:text-white transition-colors">
                {{ item }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Download Button -->
        <a
          v-if="guide.pdfFile?.asset?.url"
          :href="guide.pdfFile.asset.url"
          class="relative inline-flex items-center justify-center mt-4 px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group w-full"
          download
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-y-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-y-0 ease"
          >
            <i class="fas fa-download"></i>
          </span>
          <span
            class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-y-full ease"
          >
            <i class="fas fa-arrow-down mr-2"></i>
            {{ guide.callToAction || "Скачать PDF" }}
          </span>
          <span class="relative invisible">
            {{ guide.callToAction || "Скачать PDF" }}
          </span>
        </a>
      </div>

      <!-- Loading State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div
          class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-300 text-lg flex items-center">
          <i class="fas fa-spinner mr-2 animate-spin text-cyan-500"></i>
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
import { GUIDE_BY_SLUG_QUERY } from "~/api/sanity/queries";

const { params } = useRoute();
const { data: guide } = (await useSanityQuery)<SanityDocument>(
  GUIDE_BY_SLUG_QUERY,
  params
);
const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>
