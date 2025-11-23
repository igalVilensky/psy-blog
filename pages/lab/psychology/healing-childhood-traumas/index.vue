<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />

      <!-- Hero Section -->
      <div class="mb-12 text-center relative mt-8">
        <!-- Decorative background elements -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl -z-10"></div>
        
        <span class="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium mb-6 border border-rose-200 dark:border-rose-700/50">
          Премиум Курс
        </span>
        
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          Исцеление Детских Травм
        </h1>
        
        <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Профессиональный курс по трансформации негативного опыта в ресурс для личностного роста. 
          21 урок глубокой проработки.
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        <!-- Left Column: Course Info & Teaser -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Teaser Card -->
          <div class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
             <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                   <i class="fas fa-play text-rose-600 dark:text-rose-400"></i>
                </div>
                <h2 class="text-xl font-bold text-slate-900 dark:text-white">Введение в курс</h2>
             </div>

             <!-- Video Wrapper -->
             <div class="aspect-video rounded-xl overflow-hidden bg-slate-900 mb-6 shadow-lg">
                <iframe
                  :src="`https://www.youtube.com/embed/${getYouTubeId(teaserLesson.videoUrl)}?controls=1&rel=0`"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
             </div>

             <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">{{ teaserLesson.title }}</h3>
             <p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
               {{ teaserLesson.description }}
             </p>
             
             <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span class="flex items-center gap-2">
                   <i class="fas fa-clock"></i> {{ teaserLesson.duration }}
                </span>
             </div>
          </div>

          <!-- Course Modules -->
           <div class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Программа курса</h3>
              <div class="space-y-4">
                 <div v-for="(module, idx) in course.modules" :key="idx" class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/30">
                    <div class="w-10 h-10 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm text-rose-500 flex-shrink-0">
                       <i :class="module.icon"></i>
                    </div>
                    <div>
                       <h4 class="font-bold text-slate-900 dark:text-white">{{ module.title }}</h4>
                       <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ module.description }}</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        <!-- Right Column: Sidebar / Action -->
        <div class="lg:col-span-1">
           <div class="sticky top-24 space-y-6">
              
              <!-- Purchase Card -->
              <div class="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-lg relative overflow-hidden">
                 <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-transparent rounded-bl-full -z-10"></div>
                 
                 <div class="text-center mb-6">
                    <p class="text-slate-500 dark:text-slate-400 text-sm mb-1">Стоимость курса</p>
                    <div class="flex items-center justify-center gap-3">
                       <span class="text-3xl font-bold text-slate-900 dark:text-white">{{ course.price }} ₽</span>
                    </div>
                 </div>

                 <div v-if="isCoursePurchased(course.id)">
                    <NuxtLink
                      to="/personal-cabinet"
                      class="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <i class="fas fa-check-circle"></i>
                      Перейти к обучению
                    </NuxtLink>
                 </div>
                 <div v-else class="space-y-4">
                    <div id="paypal-button-container" class="w-full min-h-[150px]"></div>
                    <p v-if="!authStore.user" class="text-xs text-center text-rose-500">
                       <i class="fas fa-exclamation-circle mr-1"></i>
                       Войдите в аккаунт для покупки
                    </p>
                 </div>

                 <div class="mt-6 space-y-3">
                    <div class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                       <i class="fas fa-infinity text-rose-500 w-5"></i>
                       <span>Доступ навсегда</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                       <i class="fas fa-laptop text-rose-500 w-5"></i>
                       <span>Доступ с любого устройства</span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                       <i class="fas fa-certificate text-rose-500 w-5"></i>
                       <span>Сертификат о прохождении</span>
                    </div>
                 </div>
              </div>

              <!-- Subscription Box -->
              <div class="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50">
                 <h3 class="font-bold text-slate-900 dark:text-white mb-2">Подписка на новости</h3>
                 <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Полезные материалы о психологии и травмах.</p>
                 
                 <div class="space-y-3">
                    <input
                      type="email"
                      v-model="email"
                      placeholder="Ваш email"
                      class="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                    />
                    <button
                      @click="subscribeEmail"
                      class="w-full px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity"
                    >
                      Подписаться
                    </button>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "laboratory",
});
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { course } from "~/data/courses/healing-childhood-traumas";
import { purchaseCourse, getPurchasedCourses } from "~/api/firebase/coursesApi";
import { loadScript } from "@paypal/paypal-js";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

const authStore = useAuthStore();
const config = useRuntimeConfig();
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

  // Initialize PayPal if course not purchased
  if (!isCoursePurchased(course.id)) {
    initializePayPal();
  }
});

// Check if a course is already purchased
const isCoursePurchased = (courseId) => {
  return purchasedCourses.value.some((course) => course.courseId === courseId);
};

// Initialize PayPal Buttons
const initializePayPal = async () => {
  try {
    const paypal = await loadScript({
      "client-id": config.public.paypalClientId || "test", // Fallback to 'test' if not set
      currency: "RUB",
    });

    if (paypal) {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            if (!authStore.user) {
              alert("Пожалуйста, войдите в систему, чтобы приобрести курс.");
              return actions.reject();
            }
            return actions.order.create({
              purchase_units: [
                {
                  description: course.title,
                  amount: {
                    value: course.price.toString(),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            isPurchasing.value = true;
            try {
              const order = await actions.order.capture();
              console.log("Payment successful:", order);

              // Grant access to the course
              await purchaseCourse(authStore.user.uid, course);
              
              alert("Курс успешно приобретен!");
              
              // Refresh purchased courses
              const result = await getPurchasedCourses(authStore.user.uid);
              if (result.success) {
                purchasedCourses.value = result.data;
              }
            } catch (error) {
              console.error("Error capturing order:", error);
              alert("Произошла ошибка при завершении оплаты.");
            } finally {
              isPurchasing.value = false;
            }
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
            alert("Произошла ошибка PayPal. Попробуйте позже.");
          },
        })
        .render("#paypal-button-container");
    }
  } catch (error) {
    console.error("Failed to load PayPal SDK:", error);
  }
};

// Existing subscription logic
const subscribeEmail = async () => {
  if (!validateEmail(email.value)) {
    alert("Пожалуйста, введите корректный email");
    return;
  }

  // Remove the db parameter - your subscribeUser function should get db internally
  const result = await subscribeUser(email.value);
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
