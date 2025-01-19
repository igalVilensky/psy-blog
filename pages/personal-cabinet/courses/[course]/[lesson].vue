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
import { useAuthStore } from "~/stores/auth";
import { getFirestore } from "firebase/firestore";
import {
  getPurchasedCourses,
  updateCourseProgress,
} from "~/api/firebase/coursesApi";

definePageMeta({
  layout: "personal-cabinet",
});

const route = useRoute();
const authStore = useAuthStore();
const db = getFirestore();

const courseSlug = route.params.course; // Course slug from URL
const lessonSlug = route.params.lesson; // Lesson slug from URL
const loading = ref(true);
const course = ref(null); // Static course data
const lesson = ref(null); // Current lesson data
const completedLessons = ref([]); // Completed lessons from backend
const isLessonCompleted = ref(false); // Whether the lesson is completed

// Fetch course and lesson data
const fetchCourseData = async () => {
  if (!authStore.user) return;

  try {
    // Fetch static course data from data/courses folder
    const courseModule = await import(`~/data/courses/${courseSlug}.js`);
    course.value = courseModule.course;

    // Log the course data and lessons
    console.log("Course Data:", course.value);
    console.log("Total Lessons:", course.value?.lessons.length);
    console.log("All Lessons:", course.value?.lessons);

    // Find the current lesson by matching the slug
    lesson.value = course.value.lessons.find((l) => l.slug === lessonSlug);

    // Fetch purchased courses from backend
    const { success, data } = await getPurchasedCourses(authStore.user.uid);
    if (success && data.length > 0) {
      const backendCourse = data.find((c) => c.courseId === course.value.id);
      if (backendCourse) {
        completedLessons.value = backendCourse.progress.completedLessons || [];
        isLessonCompleted.value = completedLessons.value.includes(lessonSlug);
      }
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных курса:", error);
  } finally {
    loading.value = false;
  }
};

// Mark lesson as completed
const markLessonAsCompleted = async () => {
  if (!authStore.user) return;

  try {
    const { success } = await updateCourseProgress(
      authStore.user.uid,
      course.value.id,
      lesson.value.slug
    );

    if (success) {
      // Update local state
      completedLessons.value.push(lesson.value.slug);
      isLessonCompleted.value = true;
    }
  } catch (error) {
    console.error("Ошибка при обновлении прогресса:", error);
  }
};

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Normalize slugs for comparison
const normalizeSlug = (slug) => slug.trim().toLowerCase().replace(/\s+/g, "-");

// Find the current lesson index
const currentLessonIndex = computed(() => {
  const lessons = course.value?.lessons || [];

  // Log the slugs of the lessons
  lessons.forEach((lesson) => {
    console.log("Lesson Slug:", lesson.slug);
  });

  console.log("URL Lesson Slug:", lessonSlug);

  const normalizedLessonSlug = normalizeSlug(lessonSlug);
  console.log("Normalized URL Lesson Slug:", normalizedLessonSlug);

  const index = lessons.findIndex(
    (l) => normalizeSlug(l.slug) === normalizedLessonSlug
  );
  console.log("Found Index:", index);

  return index;
});

// Find the previous and next lessons
const previousLesson = computed(() => {
  const prevLesson =
    currentLessonIndex.value > 0
      ? course.value.lessons[currentLessonIndex.value - 1]
      : null;

  console.log("Previous Lesson:", prevLesson);
  return prevLesson;
});

const nextLesson = computed(() => {
  const nextLesson =
    currentLessonIndex.value < course.value.lessons.length - 1
      ? course.value.lessons[currentLessonIndex.value + 1]
      : null;

  console.log("Next Lesson:", nextLesson);
  return nextLesson;
});

onMounted(async () => {
  await fetchCourseData();
});
</script>
