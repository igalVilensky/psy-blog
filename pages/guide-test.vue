<template>
  <div class="relative min-h-screen bg-[#1A1F35]">
    <div class="relative z-10">
      <!-- Enhanced Header Section -->
      <header class="pt-8 px-4 relative">
        <!-- Animated Background Gradient -->
        <div
          class="absolute -bottom-2 sm:bottom-0 inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-[#E879F9]/10 to-[#0EA5E9]/10 animate-gradient-x"
        ></div>

        <div class="container mx-auto max-w-6xl relative">
          <!-- Enhanced Breadcrumb -->
          <nav class="mb-6">
            <ol class="flex items-center space-x-2 text-sm">
              <li class="flex items-center group">
                <NuxtLink
                  to="/"
                  class="text-slate-300 hover:text-[#0EA5E9] transition-all duration-300 flex items-center"
                >
                  <i class="fas fa-home mr-2 text-[#0EA5E9]"></i>
                  <span
                    class="group-hover:translate-x-1 transition-transform duration-300"
                    >Главная</span
                  >
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <i class="fas fa-chevron-right text-slate-400 mx-3 text-xs"></i>
                <span class="text-white font-medium" aria-current="page"
                  >Гайды</span
                >
              </li>
            </ol>
          </nav>

          <!-- Enhanced Title Section -->
          <div class="mb-6">
            <div class="md:inline-block w-full md:w-auto">
              <div
                class="bg-[#0EA5E9]/20 md:bg-transparent px-6 py-4 md:p-0 rounded-lg"
              >
                <h1 class="text-3xl md:text-4xl font-bold text-white">Гайды</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Guides Grid -->
      <main class="container mx-auto max-w-6xl px-4 sm:px-0 pb-24 mt-4 sm:mt-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="guide in filteredGuides"
            :key="guide._id"
            class="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
          >
            <!-- Image Container -->
            <div class="relative aspect-[4/3] overflow-hidden">
              <nuxt-img
                v-if="guide.image"
                :src="urlFor(guide.image).width(550).height(310).url()"
                :alt="guide.title || 'Изображение гайда'"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                width="550"
                height="310"
                loading="lazy"
                format="webp"
                quality="80"
              />
            </div>

            <div class="p-8">
              <h2
                class="text-xl font-bold text-white/90 mb-4 line-clamp-2 group-hover:text-[#0EA5E9] transition-colors duration-300"
              >
                {{ guide.title }}
              </h2>

              <p class="text-slate-300 line-clamp-3 mb-4">
                {{ guide.description }}
              </p>

              <!-- Call to Action -->
              <a
                :href="guide.downloadLink"
                class="inline-flex items-center px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <i class="fas fa-download mr-2"></i>
                {{ guide.callToAction }}
              </a>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div
          role="status"
          aria-live="polite"
          v-if="filteredGuides?.length === 0"
          class="text-center py-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
        >
          <div class="text-[#0EA5E9] mb-4">
            <i class="fas fa-search text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/90 mb-2">
            Гайды не найдены
          </h3>
          <p class="text-slate-300">
            В данной категории пока нет гайдов. Пожалуйста, выберите другую
            категорию.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchGuides } from "~/api/sanity/guides";
import { getImageUrl } from "~/api/sanity/client";

// Fetch guides
const initialGuides = await fetchGuides();
const guides = ref(initialGuides.data || []);

// Image URL builder
const { projectId, dataset } = useSanity().client.config();
const urlFor = getImageUrl(projectId, dataset);

// Filtered guides (if you add categories later)
const filteredGuides = computed(() => {
  return guides.value; // Add filtering logic if needed
});
</script>
