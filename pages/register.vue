<template>
  <div
    class="min-h-screen transition-colors duration-500 flex flex-col bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-white font-sans">
    <TopBar />

    <main class="flex-1 relative flex items-center justify-center py-20 overflow-hidden">
      <!-- Background Animation -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div
            class="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden grid md:grid-cols-2 animate-fade-up">

            <!-- Registration Form -->
            <div class="p-8 sm:p-12">
              <div class="mb-8">
                <div
                  class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 dark:border-cyan-500/30 mb-6">
                  <div class="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
                  <span
                    class="text-xs font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Регистрация</span>
                </div>
                <h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                  Создать аккаунт в <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">MindQLab</span>
                </h2>
                <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                  Начните свой путь трансформации
                </p>
              </div>

              <!-- Success Message -->
              <div v-if="successMessage"
                class="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-sm font-medium animate-fade-up">
                <div class="flex items-center gap-3 mb-4">
                  <i class="fas fa-check-circle text-xl"></i>
                  <span class="font-bold uppercase tracking-wider">Успешно!</span>
                </div>
                {{ successMessage }}
                <div class="mt-6">
                  <NuxtLink to="/profile"
                    class="block w-full px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold uppercase tracking-wider text-sm text-center hover:shadow-xl hover:shadow-emerald-500/25 transition-all">
                    Перейти в профиль
                  </NuxtLink>
                </div>
              </div>

              <form v-else @submit.prevent="handleRegister" class="space-y-5">
                <!-- Name -->
                <div class="form-group">
                  <label for="displayName" class="form-label">Ваше имя</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-4 flex items-center text-zinc-400 dark:text-zinc-500">
                      <i class="fas fa-user text-sm"></i>
                    </span>
                    <input type="text" id="displayName" v-model="displayName" required class="form-input !pl-11"
                      placeholder="Иван Иванов" />
                  </div>
                </div>

                <!-- Email -->
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-4 flex items-center text-zinc-400 dark:text-zinc-500">
                      <i class="far fa-envelope text-sm"></i>
                    </span>
                    <input type="email" id="email" v-model="email" required autocomplete="email"
                      class="form-input !pl-11" placeholder="your@email.com" />
                  </div>
                </div>

                <!-- Password -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="form-group">
                    <label for="password" class="form-label">Пароль</label>
                    <div class="relative">
                      <span class="absolute inset-y-0 left-4 flex items-center text-zinc-400 dark:text-zinc-500">
                        <i class="fas fa-lock text-sm"></i>
                      </span>
                      <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                        class="form-input !pl-11" placeholder="••••••••" />
                      <button type="button" @click="togglePassword('password')"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 dark:text-zinc-500 hover:text-cyan-600 transition-colors">
                        <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'" class="text-xs"></i>
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="confirmPassword" class="form-label">Повтор</label>
                    <div class="relative">
                      <span class="absolute inset-y-0 left-4 flex items-center text-zinc-400 dark:text-zinc-500">
                        <i class="fas fa-lock text-sm"></i>
                      </span>
                      <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
                        v-model="confirmPassword" required class="form-input !pl-11" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <!-- Checkboxes -->
                <div class="space-y-4 pt-2">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <div class="relative flex items-center shrink-0">
                      <input v-model="becomeCoach" type="checkbox"
                        class="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-cyan-600 focus:ring-cyan-500/50 transition-colors" />
                    </div>
                    <span
                      class="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-cyan-600 transition-colors font-medium">
                      Я хочу стать <span class="font-bold text-cyan-600 dark:text-cyan-400">Коучем</span>
                    </span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input v-model="acceptPrivacy" type="checkbox" required
                      class="w-5 h-5 rounded border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-cyan-600 focus:ring-cyan-500/50" />
                    <span class="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                      Согласен с <NuxtLink to="/legal/privacy"
                        class="text-cyan-600 dark:text-cyan-400 underline hover:no-underline">политикой
                      </NuxtLink>
                    </span>
                  </label>
                </div>

                <!-- Error Message -->
                <div v-if="error"
                  class="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium animate-shake">
                  <i class="fas fa-exclamation-circle mr-2"></i> {{ error }}
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                  <button type="submit" :disabled="!isFormValid || isLoading"
                    class="group w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold uppercase tracking-wider text-sm hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    <span class="flex items-center justify-center gap-2">
                      <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
                      {{ isLoading ? "Регистрация..." : "Зарегистрироваться" }}
                    </span>
                  </button>
                </div>
              </form>

              <!-- Divider -->
              <div v-if="!successMessage" class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                </div>
                <div class="relative flex justify-center text-xs uppercase tracking-wider">
                  <span class="px-4 bg-white dark:bg-zinc-900 text-zinc-400">или</span>
                </div>
              </div>

              <!-- Google Button -->
              <GoogleSignInButton v-if="!successMessage" label="Регистрация через Google"
                @error="(msg) => error = msg" />

              <div v-if="!successMessage" class="mt-8 text-center">
                <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  Уже есть аккаунт?
                  <NuxtLink to="/login"
                    class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold transition-colors">
                    Войти
                  </NuxtLink>
                </p>
              </div>
            </div>

            <!-- Side Info -->
            <div
              class="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-900/50 p-8 sm:p-12 flex flex-col justify-center border-l border-zinc-200 dark:border-zinc-800">
              <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-8">
                Преимущества
              </h3>
              <div class="space-y-6">
                <div v-for="(item, i) in infoItems" :key="i" class="flex items-start gap-4 group">
                  <div
                    class="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-200 dark:border-zinc-700 group-hover:border-cyan-500/50 transition-all duration-300 shrink-0">
                    <i :class="['fas', item.icon, 'text-cyan-600 dark:text-cyan-400']"></i>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-zinc-900 dark:text-white mb-1">{{ item.title }}</h4>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { registerUser } from "~/api/firebase/userProfile";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import TopBar from '~/components/navigation/TopBar.vue';
import Footer from '~/components/ui/Footer.vue';
import CursorNeuralVisualizer from '~/components/space/CursorNeuralVisualizer.vue';
import GoogleSignInButton from '~/components/ui/GoogleSignInButton.vue';

definePageMeta({
  layout: "empty",
  seo: {
    noindex: true,
    nofollow: true,
  },
});

useHead({
  title: "Регистрация — MindQLab",
});

const route = useRoute();
const firestore = getFirestore();
const assessmentId = ref(route.query.assessmentId);

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const displayName = ref("");
const error = ref("");
const successMessage = ref("");
const acceptPrivacy = ref(false);
const acceptTerms = ref(true);
const becomeCoach = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

const infoItems = [
  { icon: "fa-brain", title: "Когнитивная карта", text: "Создайте детальный профиль своих сильных сторон." },
  { icon: "fa-stream", title: "Адаптивные тренировки", text: "Программы, которые растут вместе с вашими навыками." },
  { icon: "fa-gem", title: "Эксклюзивный контент", text: "Доступ к закрытым методикам и исследованиям." },
];

const isFormValid = computed(() => {
  return (
    displayName.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    acceptPrivacy.value &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
    password.value.length >= 6
  );
});

const togglePassword = (field) => {
  if (field === "password") showPassword.value = !showPassword.value;
  else if (field === "confirm") showConfirmPassword.value = !showConfirmPassword.value;
};

const associateAssessmentWithUser = async (userId) => {
  if (!assessmentId.value) return;
  try {
    const assessmentRef = doc(firestore, "archetypeResults", assessmentId.value);
    await updateDoc(assessmentRef, { userId });
  } catch (err) {
    console.error("Error associating assessment:", err);
  }
};

const handleRegister = async () => {
  if (!isFormValid.value) {
    error.value = "Пожалуйста, заполните все поля корректно.";
    return;
  }

  error.value = "";
  isLoading.value = true;

  try {
    const additionalData = {};
    if (route.query.coach) additionalData.coachId = route.query.coach;
    if (becomeCoach.value) additionalData.role = 'coach';

    const firebaseResponse = await registerUser(
      email.value,
      password.value,
      displayName.value,
      additionalData
    );

    if (!firebaseResponse.success) throw new Error(firebaseResponse.message);

    const userId = firebaseResponse.user.uid;
    if (assessmentId.value) await associateAssessmentWithUser(userId);

    successMessage.value = "Регистрация прошла успешно! Добро пожаловать в систему.";
  } catch (err) {
    console.error("Registration error:", err);
    error.value = err.message || "Ошибка при регистрации.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400;
}

.form-input {
  @apply w-full px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-medium text-sm;
}

.animate-fade-up {
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

::selection {
  background-color: rgba(6, 182, 212, 0.3);
  color: inherit;
}

.dark ::selection {
  background-color: rgba(6, 182, 212, 0.5);
}
</style>
