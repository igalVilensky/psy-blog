<template>
  <div class="w-full min-h-screen bg-gray-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Loading State -->
      <Loading v-if="loading" />

      <!-- Content when not loading -->
      <div v-else>
        <!-- Lesson Header -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8"
        >
          <div class="flex-1">
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              {{ lesson?.title }}
            </h1>
            <p class="text-gray-600 mt-2 text-lg">
              {{ lesson?.description }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-500">{{ lesson?.duration }}</span>
            <button
              v-if="!isLessonCompleted"
              @click="markLessonAsCompleted"
              class="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition-all duration-200"
            >
              <i class="fas fa-check-circle mr-2"></i>
              Завершить урок
            </button>
            <span v-else class="text-green-600">
              <i class="fas fa-check-circle mr-2"></i>Урок завершен
            </span>
          </div>
        </div>

        <!-- Video Player -->
        <div class="mb-8">
          <iframe
            :src="`https://www.youtube.com/embed/${getYouTubeVideoId(
              lesson?.videoUrl
            )}`"
            class="w-full h-96 rounded-2xl shadow-sm"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <NuxtLink
            v-if="previousLesson"
            :to="`/personal-cabinet/courses/${courseSlug}/${previousLesson.slug}`"
            class="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Предыдущий урок
          </NuxtLink>
          <NuxtLink
            v-if="nextLesson"
            :to="`/personal-cabinet/courses/${courseSlug}/${nextLesson.slug}`"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition-all duration-200"
          >
            Следующий урок
            <i class="fas fa-arrow-right ml-2"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { lessons } from "~/data/courses/healingChildhoodTraumas";
import {
  getPurchasedCourses,
  updateCourseProgress,
} from "~/api/firebase/courses";
import { useAuthStore } from "~/stores/auth";
import { getFirestore } from "firebase/firestore";

definePageMeta({
  layout: "personal-cabinet",
});

const route = useRoute();
const authStore = useAuthStore();
const db = getFirestore();

const courseSlug = route.params.course; // Course slug from URL
const lessonSlug = route.params.lesson; // Lesson slug from URL
const loading = ref(true);
const courseData = ref(null);
const completedLessons = ref([]);

// Find the current lesson by matching the slug
const lesson = computed(() => {
  const lessonSlug = route.params.lesson || ""; // Fallback to empty string if undefined
  const decodedLessonSlug = decodeURIComponent(lessonSlug).toLowerCase().trim();
  console.log("route.params:", route.params);

  // Log each lesson being checked
  const foundLesson = lessons.find((l) => {
    const lessonSlugNormalized = l.slug.toLowerCase().trim();
    console.log("Checking Lesson:", lessonSlugNormalized); // Log the slug of each lesson
    return lessonSlugNormalized === decodedLessonSlug;
  });

  console.log("Found Lesson:", foundLesson); // Log the final result
  return foundLesson;
});

// Find the current lesson index
const currentLessonIndex = computed(() => {
  return lessons.findIndex((l) => l.slug === lessonSlug);
});

// Find the previous and next lessons
const previousLesson = computed(() => {
  return currentLessonIndex.value > 0
    ? lessons[currentLessonIndex.value - 1]
    : null;
});

const nextLesson = computed(() => {
  return currentLessonIndex.value < lessons.length - 1
    ? lessons[currentLessonIndex.value + 1]
    : null;
});

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Fetch course data
const fetchCourseData = async () => {
  if (!authStore.user) return;

  try {
    const response = await getPurchasedCourses(db, authStore.user.uid);
    if (response.success && response.data.length > 0) {
      courseData.value = response.data[0]; // Assuming only one course for now
      completedLessons.value = courseData.value.progress.completedLessons || [];
    }
    console.log(response.data);
  } catch (error) {
    console.error("Ошибка при получении данных курса:", error);
  }
};

// Mark lesson as completed
const markLessonAsCompleted = async () => {
  if (!authStore.user) return;

  try {
    const response = await updateCourseProgress(
      db,
      authStore.user.uid,
      "course_1", // Hardcoded course ID
      lesson.value.slug // Lesson ID (slug)
    );

    if (response.success) {
      // Update local state
      completedLessons.value.push(lesson.value.slug);
    }
  } catch (error) {
    console.error("Ошибка при обновлении прогресса:", error);
  }
};

// Check if the lesson is completed
const isLessonCompleted = computed(() => {
  return completedLessons.value.includes(lesson.value?.slug);
});

onMounted(async () => {
  await fetchCourseData();
  loading.value = false;
  console.log("Current Lesson:", lesson.value);
});
</script>
