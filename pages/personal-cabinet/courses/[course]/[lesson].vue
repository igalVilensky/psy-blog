<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Loading State with Skeleton -->
      <div v-if="loading" class="space-y-8">
        <div class="animate-pulse space-y-4">
          <div class="h-8 bg-gray-200 rounded-md w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded-md w-1/2"></div>
          <div class="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      <!-- Content when not loading -->
      <div v-else class="space-y-8">
        <!-- Course Progress Bar -->
        <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-600"
              >Прогресс курса</span
            >
            <span class="text-sm text-gray-500">
              {{ completedLessons.length }}/{{ course?.lessons.length }} уроков
            </span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
              :style="`width: ${
                (completedLessons.length / course?.lessons.length) * 100
              }%`"
            ></div>
          </div>
        </div>

        <!-- Lesson Header -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="flex flex-col sm:flex-row gap-6">
            <div class="flex-1">
              <h1
                class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                {{ lesson?.title }}
              </h1>
              <p class="text-gray-600 mt-3 text-lg">
                {{ lesson?.description }}
              </p>
              <div class="flex items-center gap-4 mt-4">
                <span class="inline-flex items-center text-sm text-gray-500">
                  <i class="fas fa-clock mr-2"></i>
                  {{ lesson?.duration }}
                </span>
                <span class="inline-flex items-center text-sm text-gray-500">
                  <i class="fas fa-book-reader mr-2"></i>
                  Урок {{ currentLessonIndex + 1 }} из
                  {{ course?.lessons.length }}
                </span>
              </div>
            </div>
            <div class="flex items-center">
              <button
                v-if="!isLessonCompleted"
                @click="markLessonAsCompleted"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all duration-200 hover:shadow"
              >
                <i class="fas fa-check-circle mr-2"></i>
                Завершить урок
              </button>
              <div
                v-else
                class="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-xl border border-green-200"
              >
                <i class="fas fa-check-circle mr-2"></i>
                Урок завершен
              </div>
            </div>
          </div>
        </div>

        <!-- Video Player Card -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="aspect-w-16 aspect-h-9">
            <iframe
              :src="`https://www.youtube.com/embed/${getYouTubeVideoId(
                lesson?.videoUrl
              )}`"
              class="w-full h-full rounded-xl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Notes Section (Optional) -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-xl font-semibold mb-4">
            <i class="fas fa-sticky-note mr-2 text-blue-600"></i>
            Заметки к уроку
          </h2>
          <textarea
            class="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Добавьте свои заметки к уроку..."
          ></textarea>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <NuxtLink
            v-if="previousLesson"
            :to="`/personal-cabinet/courses/${courseSlug}/${previousLesson.slug}`"
            class="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200 group"
          >
            <i
              class="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"
            ></i>
            Предыдущий урок
          </NuxtLink>
          <NuxtLink
            v-if="nextLesson"
            :to="`/personal-cabinet/courses/${courseSlug}/${nextLesson.slug}`"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all duration-200 group sm:ml-auto"
          >
            Следующий урок
            <i
              class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
            ></i>
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
import {
  getPurchasedCourses,
  updateCourseProgress,
} from "~/api/firebase/coursesApi";

definePageMeta({
  layout: "personal-cabinet",
});

const route = useRoute();
const authStore = useAuthStore();

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
<style>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
