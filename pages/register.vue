<template>
  <div
    class="min-h-screen transition-colors duration-500 flex flex-col bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-stone-900 dark:text-stone-100 font-sans">
    <TopBar />

    <main class="flex-1 relative flex items-center justify-center py-20 overflow-hidden">
      <!-- Background Animation -->
      <div class="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div
          class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mindqlab-calm-accent/10 rounded-full blur-[100px] animate-float-delayed">
        </div>
        <div
          class="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-mindqlab-calm-accent-secondary/10 rounded-full blur-[120px] animate-slow-float">
        </div>
      </div>

      <!-- Neural Visualizer -->
      <div class="absolute inset-0 z-0 opacity-60 dark:opacity-20 pointer-events-none">
        <ClientOnly>
          <CursorNeuralVisualizer />
        </ClientOnly>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div
            class="bg-white/80 dark:bg-stone-900/60 backdrop-blur-xl rounded-[3rem] border border-stone-100 dark:border-stone-800/50 shadow-2xl overflow-hidden grid md:grid-cols-2 animate-fade-up">

            <!-- Registration Form -->
            <div class="p-8 sm:p-12">
              <div class="mb-10">
                <h2 class="text-3xl font-light text-stone-900 dark:text-white uppercase tracking-tight mb-2">
                  Регистрация в <span class="text-mindqlab-calm-accent font-medium">MindQLab</span>
                </h2>
                <p class="text-stone-400 dark:text-stone-500 font-light italic text-sm">
                  Начните свой путь трансформации
                </p>
              </div>

              <!-- Success Message -->
              <div v-if="successMessage"
                class="p-6 rounded-[2rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-light leading-relaxed animate-fade-up">
                <div class="flex items-center gap-3 mb-4">
                  <i class="fas fa-check-circle text-xl"></i>
                  <span class="font-medium uppercase tracking-wider">Успешно!</span>
                </div>
                {{ successMessage }}
                <div class="mt-6">
                  <NuxtLink to="/profile" class="submit-btn !bg-emerald-500 block text-center">
                    ПЕРЕЙТИ В ПРОФИЛЬ
                  </NuxtLink>
                </div>
              </div>

              <form v-else @submit.prevent="handleRegister" class="space-y-5">
                <!-- Name -->
                <div class="form-group">
                  <label for="displayName" class="form-label">Ваше имя</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-4 flex items-center text-stone-300 dark:text-stone-600">
                      <i class="fas fa-user text-sm"></i>
                    </span>
                    <input type="text" id="displayName" v-model="displayName" required class="form-input !pl-10"
                      placeholder="Иван Иванов" />
                  </div>
                </div>

                <!-- Email -->
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-4 flex items-center text-stone-300 dark:text-stone-600">
                      <i class="far fa-envelope text-sm"></i>
                    </span>
                    <input type="email" id="email" v-model="email" required autocomplete="email"
                      class="form-input !pl-10" placeholder="your@email.com" />
                  </div>
                </div>

                <!-- Password -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="form-group">
                    <label for="password" class="form-label">Пароль</label>
                    <div class="relative">
                      <span class="absolute inset-y-0 left-4 flex items-center text-stone-300 dark:text-stone-600">
                        <i class="fas fa-lock text-sm"></i>
                      </span>
                      <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                        class="form-input !pl-10" placeholder="••••••••" />
                      <button type="button" @click="togglePassword('password')"
                        class="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-300 dark:text-stone-600 hover:text-mindqlab-calm-accent transition-colors">
                        <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'" class="text-xs"></i>
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="confirmPassword" class="form-label">Повтор</label>
                    <div class="relative">
                      <span class="absolute inset-y-0 left-4 flex items-center text-stone-300 dark:text-stone-600">
                        <i class="fas fa-lock text-sm"></i>
                      </span>
                      <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
                        v-model="confirmPassword" required class="form-input !pl-10" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <!-- Checkboxes -->
                <div class="space-y-4 pt-4">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <div class="relative flex items-center shrink-0">
                      <input v-model="becomeCoach" type="checkbox"
                        class="w-4 h-4 rounded border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-mindqlab-calm-accent focus:ring-mindqlab-calm-accent/50" />
                    </div>
                    <span
                      class="text-[11px] text-stone-500 dark:text-stone-400 group-hover:text-mindqlab-calm-accent transition-colors">
                      Я хочу стать <span class="font-bold text-mindqlab-calm-accent">Коучем</span>
                    </span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input v-model="acceptPrivacy" type="checkbox" required
                      class="w-4 h-4 rounded border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-mindqlab-calm-accent" />
                    <span class="text-[11px] text-stone-500 dark:text-stone-400">
                      Согласен с <NuxtLink to="/legal/privacy" class="text-mindqlab-calm-accent underline">политикой
                      </NuxtLink>
                    </span>
                  </label>
                </div>

                <!-- Error Message -->
                <div v-if="error"
                  class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-500 text-[10px] font-light animate-shake">
                  {{ error }}
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                  <button type="submit" :disabled="!isFormValid || isLoading"
                    class="submit-btn group relative overflow-hidden">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                      <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
                      {{ isLoading ? "РЕГИСТРАЦИЯ..." : "ЗАРЕГИСТРИРОВАТЬСЯ" }}
                    </span>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-mindqlab-calm-accent to-mindqlab-calm-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                  </button>
                </div>
              </form>

              <div v-if="!successMessage" class="mt-8 text-center">
                <p class="text-xs text-stone-400 dark:text-stone-500 font-light">
                  Уже есть аккаунт?
                  <NuxtLink to="/login" class="text-mindqlab-calm-accent hover:underline font-medium transition-colors">
                    Войти
                  </NuxtLink>
                </p>
              </div>
            </div>

            <!-- Side Info -->
            <div
              class="bg-stone-50/50 dark:bg-stone-800/30 p-8 sm:p-12 flex flex-col justify-center border-l border-stone-100 dark:border-stone-800/50">
              <h3 class="text-xl font-light text-stone-900 dark:text-white uppercase tracking-tight mb-8">
                Преимущества
              </h3>
              <div class="space-y-8">
                <div v-for="(item, i) in infoItems" :key="i" class="flex items-start gap-4 group">
                  <div
                    class="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center text-mindqlab-calm-accent shadow-sm border border-stone-100 dark:border-stone-700/50 group-hover:border-mindqlab-calm-accent/30 transition-all duration-500 shrink-0">
                    <i :class="['fas', item.icon, 'text-sm']"></i>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-stone-800 dark:text-stone-200 mb-1">{{ item.title }}</h4>
                    <p class="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">{{ item.text }}</p>
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
const acceptTerms = ref(true); // Default to true as per label
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

<style lang="postcss" scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-[10px] uppercase tracking-[0.2em] font-medium text-stone-400 dark:text-stone-500;
}

.form-input {
  @apply w-full px-6 py-4 rounded-2xl bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100 dark:border-stone-800/50 text-stone-900 dark:text-white placeholder-stone-300 dark:placeholder-stone-600 focus:outline-none focus:border-mindqlab-calm-accent focus:ring-1 focus:ring-mindqlab-calm-accent transition-all duration-300 font-light text-sm;
}

.submit-btn {
  @apply w-full px-10 py-5 rounded-full bg-mindqlab-calm-accent text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-mindqlab-calm-accent/20 cursor-pointer;
}

.submit-btn:disabled {
  @apply opacity-50 grayscale cursor-not-allowed;
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
</style>
