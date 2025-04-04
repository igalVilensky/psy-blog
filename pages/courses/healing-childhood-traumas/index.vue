<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section with adjusted colors -->
      <section class="text-center mb-16 relative">
        <div
          class="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl transform -skew-y-1"
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

          <!-- Purchase CTA or Go to Personal Cabinet Link -->
          <div class="text-center mt-8">
            <div v-if="isCoursePurchased(course.id)">
              <NuxtLink
                to="/personal-cabinet"
                class="relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-4 text-white"
              >
                <span class="flex items-center gap-2">
                  <i class="fas fa-tachometer-alt text-lg"></i>
                  Перейти в личный кабинет
                </span>
              </NuxtLink>
            </div>
            <div v-else>
              <button
                @click="purchaseCourseHandler(course.id)"
                :disabled="isPurchasing"
                class="relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-4 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span class="flex items-center gap-2">
                  <i class="fas fa-shopping-cart text-lg"></i>
                  {{ isPurchasing ? "Обработка..." : "Купить курс за 4900₽" }}
                </span>
              </button>
            </div>
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
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { course } from "~/data/courses/healing-childhood-traumas";
import { purchaseCourse, getPurchasedCourses } from "~/api/firebase/coursesApi";

const authStore = useAuthStore();
const email = ref("");
const isPurchasing = ref(false); // Loading state for purchase
const purchasedCourses = ref([]); // Array to store purchased courses

// Teaser lesson (first lesson)
const teaserLesson = {
  title: "Что такое детская травма и как происходит исцеление",
  description:
    "Приспособление к родительским потребностям зачастую приводит к превращению ребенка в «псевдоличность», развитию мнимого Я. Человек ведет себя так, как от него хотят, и постепенно этот тип поведения начинает определять все его поступки и помыслы.",
  videoUrl: "https://youtu.be/C6Cs3X8uBJQ",
  duration: "33 минуты",
};

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
    await purchaseCourse(authStore.user.uid, course);
    alert("Курс успешно приобретен!");
    // Refresh the list of purchased courses
    const result = await getPurchasedCourses(authStore.user.uid);
    if (result.success) {
      purchasedCourses.value = result.data;
    }
  } catch (error) {
    console.error("Ошибка при покупке курса:", error);
    alert("Произошла ошибка при покупке курса. Пожалуйста, попробуйте снова.");
  } finally {
    isPurchasing.value = false; // Stop loading
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
</script>
