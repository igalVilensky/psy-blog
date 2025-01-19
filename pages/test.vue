<template>
  <div class="p-8">
    <!-- Display a greeting if the user is authenticated -->
    <div v-if="!authStore.loading">
      <h1 class="text-3xl font-bold mb-4">Курсы</h1>
      <p v-if="authStore.user" class="text-lg mb-6">
        Привет, {{ authStore.user.profile?.username || authStore.user.email }}!
      </p>
    </div>

    <!-- Loading state -->
    <div v-else class="text-center">
      <p>Загрузка...</p>
    </div>

    <!-- Course listing -->
    <div class="space-y-6">
      <div
        v-for="course in courses"
        :key="course.id"
        class="border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        <h2 class="text-2xl font-semibold mb-4">{{ course.title }}</h2>
        <p class="text-gray-600 mb-4">{{ course.description }}</p>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <p>
            <strong class="text-gray-700">Цена:</strong> {{ course.price }} руб.
          </p>
          <p>
            <strong class="text-gray-700">Количество уроков:</strong>
            {{ course.lessonsCount }}
          </p>
          <p>
            <strong class="text-gray-700">Продолжительность:</strong>
            {{ course.duration }} ч.
          </p>
        </div>
        <button
          v-if="isCoursePurchased(course.id)"
          class="bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
          disabled
        >
          Уже приобретен
        </button>
        <button
          v-else
          @click="purchaseCourseHandler(course.id)"
          :disabled="isPurchasing"
          class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ isPurchasing ? "Обработка..." : "Купить курс" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth"; // Import the auth store
import { course } from "~/data/courses/testCourse";
import { course2 } from "~/data/courses/secondTestCourse";
import { purchaseCourse, getPurchasedCourses } from "~/api/firebase/coursesApi"; // Import the purchase function

const authStore = useAuthStore();
const courses = ref([course, course2]);
const isPurchasing = ref(false); // Loading state for purchase
const purchasedCourses = ref([]); // Array to store purchased courses

// Fetch purchased courses when the component mounts
onMounted(async () => {
  await authStore.initAuth();
  if (authStore.user) {
    try {
      const result = await getPurchasedCourses(authStore.user.uid);
      if (result.success) {
        purchasedCourses.value = result.data;
      }
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
    }
  }
});

// Check if a course is already purchased
const isCoursePurchased = (courseId) => {
  return purchasedCourses.value.some((course) => course.courseId === courseId);
};

// Function to handle purchase
const purchaseCourseHandler = async (courseId) => {
  if (!authStore.user) {
    alert("Пожалуйста, войдите в систему, чтобы приобрести курс.");
    return;
  }

  isPurchasing.value = true; // Start loading

  try {
    const course = courses.value.find((c) => c.id === courseId);
    if (course) {
      await purchaseCourse(authStore.user.uid, course);
      alert("Курс успешно приобретен!");
      // Refresh the list of purchased courses
      const result = await getPurchasedCourses(authStore.user.uid);
      if (result.success) {
        purchasedCourses.value = result.data;
      }
    }
  } catch (error) {
    console.error("Ошибка при покупке курса:", error);
    alert("Произошла ошибка при покупке курса. Пожалуйста, попробуйте снова.");
  } finally {
    isPurchasing.value = false; // Stop loading
  }
};
</script>
