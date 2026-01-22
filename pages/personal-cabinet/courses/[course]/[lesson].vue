<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/50">
    <div class="max-w-6xl mx-auto py-8 sm:py-12">
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
            <span class="text-sm font-medium text-gray-600">Прогресс курса</span>
            <span class="text-sm text-gray-500">
              {{ completedLessons.length }}/{{ course?.lessons.length }} уроков
            </span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" :style="`width: ${(completedLessons.length / course?.lessons.length) * 100
              }%`"></div>
          </div>
        </div>

        <!-- Lesson Header -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="flex flex-col sm:flex-row gap-6">
            <div class="flex-1">
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
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
              <button v-if="!isLessonCompleted" @click="markLessonAsCompleted"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all duration-200 hover:shadow">
                <i class="fas fa-check-circle mr-2"></i>
                Завершить урок
              </button>
              <div v-else
                class="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-xl border border-green-200">
                <i class="fas fa-check-circle mr-2"></i>
                Урок завершен
              </div>
            </div>
          </div>
        </div>

        <!-- Video Player Card -->
        <div class="bg-white rounded-xl sm:p-6 shadow-sm border border-gray-100">
          <div class="aspect-w-16 aspect-h-9">
            <iframe :src="`https://www.youtube.com/embed/${getYouTubeVideoId(
              lesson?.videoUrl
            )}`" class="w-full h-full rounded-xl" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
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
            placeholder="Добавьте свои заметки к уроку..."></textarea>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <NuxtLink v-if="previousLesson" :to="`/personal-cabinet/courses/${courseSlug}/${previousLesson.slug}`"
            class="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200 group">
            <i class="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
            Предыдущий урок
          </NuxtLink>
          <NuxtLink v-if="nextLesson" :to="`/personal-cabinet/courses/${courseSlug}/${nextLesson.slug}`"
            class="inline-flex justify-end items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all duration-200 group sm:ml-auto">
            Следующий урок
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
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
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
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
const course = ref(null); // Static course data
const lesson = ref(null); // Current lesson data
const completedLessons = ref([]); // Completed lessons from backend
const isLessonCompleted = ref(false); // Whether the lesson is completed

// Function to show notifications (mock implementation, replace with your actual notification system)
const showNotification = (message, type) => {
  console.log(`[${type}] ${message}`);
  // Replace with your actual notification system, e.g., toast or alert
};

// Fetch course and lesson data
const fetchCourseData = async () => {
  if (!authStore.user) {
    showNotification("Пользователь не авторизован.", "error");
    return;
  }

  try {
    // Fetch static course data from data/courses folder
    const courseModule = await import(`~/data/courses/${courseSlug}.js`);
    course.value = courseModule.course;
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
    showNotification("Ошибка при загрузке данных курса.", "error");
  } finally {
    loading.value = false;
  }
};

// Update Sefirot progress for Gevurah
const updateSefirotProgress = async (userId) => {
  if (!userId) {
    showNotification("Требуется идентификатор пользователя.", "error");
    return { success: false, message: "User ID is required" };
  }

  const currentDate = new Date().toISOString().split("T")[0];
  const dailyRef = doc(db, `users/${userId}/daily/${currentDate}`);
  const progressRef = doc(db, `users/${userId}/progress/sefirot`);

  try {
    // Check if daily actions document exists and initialize if not
    const dailySnap = await getDoc(dailyRef);
    let dailyData = {
      keter: { actions: 0 },
      chokhmah: { actions: 0 },
      binah: { actions: 0 },
      chesed: { actions: 0 },
      gevurah: { actions: 0 },
      tiferet: { actions: 0 },
      netzach: { actions: 0 },
      hod: { actions: 0 },
      yesod: { actions: 0 },
      malkhut: { actions: 0 },
    };

    if (dailySnap.exists()) {
      dailyData = dailySnap.data();
      // Check Gevurah actions limit
      if (dailyData.gevurah?.actions >= 3) {
        showNotification(
          "Достигнуто максимальное количество действий для Гвуры сегодня.",
          "warning"
        );
        return {
          success: false,
          message: "Max daily actions for Gevurah reached",
        };
      }
    } else {
      // Initialize daily document if it doesn't exist
      await setDoc(dailyRef, dailyData);
    }

    // Check if progress document exists and initialize if not
    const progressSnap = await getDoc(progressRef);
    if (!progressSnap.exists()) {
      const initialProgressData = {
        keter: { points: 0, lastActive: serverTimestamp() },
        chokhmah: { points: 0, lastActive: serverTimestamp() },
        binah: { points: 0, lastActive: serverTimestamp() },
        chesed: { points: 0, lastActive: serverTimestamp() },
        gevurah: { points: 0, lastActive: serverTimestamp() },
        tiferet: { points: 0, lastActive: serverTimestamp() },
        netzach: { points: 0, lastActive: serverTimestamp() },
        hod: { points: 0, lastActive: serverTimestamp() },
        yesod: { points: 0, lastActive: serverTimestamp() },
        malkhut: { points: 0, lastActive: serverTimestamp() },
      };
      await setDoc(progressRef, initialProgressData);
    }

    // Update daily actions for Gevurah
    await updateDoc(dailyRef, {
      "gevurah.actions": increment(1),
    });

    // Update Sefirot progress for Gevurah
    await updateDoc(progressRef, {
      "gevurah.points": increment(10), // Increment by 10, matching the Daily Growth Spark example
      "gevurah.lastActive": serverTimestamp(),
    });

    showNotification("Прогресс для Гвуры обновлен!", "success");
    return { success: true, message: "Sefirot progress updated" };
  } catch (error) {
    console.error("Error updating Sefirot progress:", error);
    showNotification(
      "Ошибка при обновлении прогресса Гвуры. Пожалуйста, попробуйте еще раз.",
      "error"
    );
    return { success: false, message: "Error updating Sefirot progress" };
  }
};

// Mark lesson as completed and update Sefirot progress
const markLessonAsCompleted = async () => {
  if (!authStore.user) {
    showNotification("Пользователь не авторизован.", "error");
    return;
  }

  try {
    // Update course progress
    const { success } = await updateCourseProgress(
      authStore.user.uid,
      course.value.id,
      lesson.value.slug
    );

    if (success) {
      // Update local state for course progress
      completedLessons.value.push(lesson.value.slug);
      isLessonCompleted.value = true;

      // Update Sefirot progress for Gevurah
      const sefirotResult = await updateSefirotProgress(authStore.user.uid);
      if (!sefirotResult.success) {
        showNotification(sefirotResult.message, "warning");
      }
    } else {
      showNotification("Ошибка при завершении урока.", "error");
    }
  } catch (error) {
    console.error("Ошибка при обновлении прогресса:", error);
    showNotification("Ошибка при обновлении прогресса.", "error");
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
  const normalizedLessonSlug = normalizeSlug(lessonSlug);

  const index = lessons.findIndex(
    (l) => normalizeSlug(l.slug) === normalizedLessonSlug
  );

  return index;
});

// Find the previous and next lessons
const previousLesson = computed(() => {
  const prevLesson =
    currentLessonIndex.value > 0
      ? course.value.lessons[currentLessonIndex.value - 1]
      : null;

  return prevLesson;
});

const nextLesson = computed(() => {
  const nextLesson =
    currentLessonIndex.value < course.value.lessons.length - 1
      ? course.value.lessons[currentLessonIndex.value + 1]
      : null;

  return nextLesson;
});

onMounted(async () => {
  await fetchCourseData();
});
</script>
<style>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 Aspect Ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
