<template>
  <div class="relative min-h-screen bg-slate-900">
    <!-- Fixed background with proper opacity -->
    <div class="fixed inset-0">
      <div class="absolute top-0 left-0 w-full h-full bg-slate-900">
        <!-- Adjusted gradient orbs -->
        <div
          class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-slow-pulse"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-full blur-3xl animate-slow-float"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section with adjusted colors -->
      <section class="text-center mb-16 relative">
        <div
          class="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl transform -skew-y-1"
        ></div>
        <span
          class="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-cyan-300 text-sm font-medium mb-6"
        >
          Премиум Курс
        </span>
        <h1
          class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight mb-6 relative"
        >
          Исцеление Детских Травм
        </h1>
        <p
          class="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          Профессиональный курс по трансформации негативного опыта в ресурс для
          личностного роста
        </p>
      </section>

      <!-- Course Content Section with proper contrast -->
      <div
        class="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 shadow-2xl"
      >
        <div class="space-y-8">
          <!-- Teaser Lesson Card -->
          <div
            class="flex flex-col md:flex-row gap-8 sm:p-6 relative group rounded-xl transition-all duration-300 sm:hover:bg-slate-700/50 sm:items-start"
          >
            <!-- Video Section -->
            <div class="md:w-2/5 flex-shrink-0">
              <div
                class="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-blue-500/20 shadow-lg"
              >
                <iframe
                  :src="`https://www.youtube.com/embed/${getYouTubeId(
                    teaserLesson.videoUrl
                  )}?controls=1&rel=0`"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <!-- Content Section -->
            <div class="flex-1 flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="px-4 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-sm font-medium"
                >
                  Урок 1 (Превью)
                </span>
                <div
                  class="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent"
                ></div>
              </div>
              <h2
                class="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300"
              >
                {{ teaserLesson.title }}
              </h2>
              <p class="text-gray-300 mb-6 leading-relaxed">
                {{ teaserLesson.description }}
              </p>

              <!-- Metadata section -->
              <div class="flex flex-wrap gap-6 text-sm">
                <!-- Duration -->
                <span
                  class="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-700/50 text-gray-200"
                >
                  <span
                    class="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0"
                  >
                    <i class="fas fa-hourglass text-sm"></i>
                  </span>
                  <span>{{ teaserLesson.duration }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Purchase CTA -->
          <div class="text-center mt-8">
            <button
              @click="handlePurchase"
              class="relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 text-white"
            >
              <span class="flex items-center gap-2">
                <i class="fas fa-shopping-cart text-lg"></i>
                {{
                  hasPurchasedCourse
                    ? "Перейти к курсу"
                    : "Купить курс за 4900₽"
                }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Subscription Section with fixed contrast -->
      <div
        class="mt-16 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-12 text-center relative overflow-hidden"
      >
        <h2 class="text-3xl font-bold text-white mb-4 relative">
          Подпишитесь на новые материалы
        </h2>
        <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Получите доступ к эксклюзивным материалам курса и будьте в курсе новых
          обновлений
        </p>
        <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0">
          <input
            type="email"
            v-model="email"
            placeholder="Ваш email"
            class="w-full px-6 py-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-slate-900/50 border border-blue-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="subscribeEmail"
            class="relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 rounded-lg sm:rounded-l-none sm:rounded-r-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 text-white"
          >
            <span class="flex items-center gap-2">
              <i class="fas fa-envelope text-lg"></i>
              Подписаться
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";
import { useAuthStore } from "~/stores/auth";
import { purchaseCourse, getPurchasedCourses } from "~/api/firebase/courses";

const authStore = useAuthStore();
const db = getFirestore();
const email = ref("");
const hasPurchasedCourse = ref(false); // Track if the user has purchased the course

// Teaser lesson (first lesson)
const teaserLesson = {
  title: "Что такое детская травма и как происходит исцеление",
  description:
    "Приспособление к родительским потребностям зачастую приводит к превращению ребенка в «псевдоличность», развитию мнимого Я. Человек ведет себя так, как от него хотят, и постепенно этот тип поведения начинает определять все его поступки и помыслы.",
  videoUrl: "https://youtu.be/C6Cs3X8uBJQ",
  duration: "33 минуты",
};

// Check if the user has purchased the course
const checkIfCoursePurchased = async (userId) => {
  try {
    const { success, data } = await getPurchasedCourses(db, userId);
    if (success) {
      // Check if the course with ID "course_1" is in the purchased courses
      hasPurchasedCourse.value = data.some(
        (course) => course.courseId === "course_1"
      );
    }
  } catch (error) {
    console.error("Error checking purchased courses:", error);
  }
};

// Handle purchase button click
const handlePurchase = async () => {
  try {
    const db = getFirestore();

    // Ensure authStore is initialized
    if (!authStore) {
      alert("Ошибка при инициализации. Пожалуйста, перезагрузите страницу.");
      return;
    }

    const userId = authStore.user?.uid; // Use optional chaining to avoid errors

    if (!userId) {
      alert("Пожалуйста, войдите в систему, чтобы купить курс.");
      return;
    }

    const courseId = "course_1"; // Replace with the actual course ID
    const courseData = {
      totalLessons: 21, // Replace with the actual total lessons
    };

    const { success, message } = await purchaseCourse(
      db,
      userId,
      courseId,
      courseData
    );

    if (success) {
      alert(message);
      hasPurchasedCourse.value = true; // Update the purchase status
      // Redirect to the personal cabinet or course page
      navigateTo("/personal-cabinet");
    } else if (message === "Курс уже куплен") {
      // If the course is already purchased, redirect to /personal-cabinet
      navigateTo("/personal-cabinet");
    } else {
      alert(message);
    }
  } catch (error) {
    alert("Произошла ошибка при покупке курса. Пожалуйста, попробуйте снова.");
  }
};

// Existing subscription logic
const subscribeEmail = async () => {
  if (!validateEmail(email.value)) {
    alert("Пожалуйста, введите корректный email");
    return;
  }

  const result = await subscribeUser(db, email.value);
  if (result.success) {
    alert(result.message);
    email.value = "";
  } else {
    alert(result.message);
  }
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// On mounted, check if the user has purchased the course
onMounted(async () => {
  if (authStore.user) {
    await checkIfCoursePurchased(authStore.user.uid);
  }
});
</script>
