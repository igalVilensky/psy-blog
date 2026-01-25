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

            <!-- Login Form -->
            <div class="p-8 sm:p-12">
              <div class="mb-10">
                <div
                  class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 dark:border-cyan-500/30 mb-6">
                  <div class="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
                  <span
                    class="text-xs font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Авторизация</span>
                </div>
                <h2 class="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                  Вход в <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">MindQLab</span>
                </h2>
                <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                  Продолжите свой путь развития
                </p>
              </div>

              <form @submit.prevent="handleLogin" class="space-y-6">
                <!-- Email -->
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-4 flex items-center text-zinc-400 dark:text-zinc-500">
                      <i class="far fa-envelope text-sm"></i>
                    </span>
                    <input type="email" id="email" v-model="email" autocomplete="email" required
                      class="form-input !pl-11" placeholder="your@email.com" />
                  </div>
                </div>

                <!-- Password -->
                <div class="form-group">
                  <label for="password" class="form-label">Пароль</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-4 flex items-center text-zinc-400 dark:text-zinc-500">
                      <i class="fas fa-lock text-sm"></i>
                    </span>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                      autocomplete="current-password" required class="form-input !pl-11 pr-12" placeholder="••••••••" />
                    <button type="button" @click="togglePassword"
                      class="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 dark:text-zinc-500 hover:text-cyan-600 transition-colors">
                      <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'" class="text-sm"></i>
                    </button>
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="error"
                  class="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium animate-shake">
                  <i class="fas fa-exclamation-circle mr-2"></i> {{ error }}
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                  <button type="submit" :disabled="isLoading"
                    class="group w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold uppercase tracking-wider text-sm hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    <span class="flex items-center justify-center gap-2">
                      <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
                      <i v-else class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                      {{ isLoading ? "Вход..." : "Войти" }}
                    </span>
                  </button>
                </div>
              </form>

              <!-- Divider -->
              <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                </div>
                <div class="relative flex justify-center text-xs uppercase tracking-wider">
                  <span class="px-4 bg-white dark:bg-zinc-900 text-zinc-400">или</span>
                </div>
              </div>

              <!-- Google Button -->
              <GoogleSignInButton @error="(msg) => error = msg" />

              <div class="mt-8 text-center">
                <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  Нет аккаунта?
                  <NuxtLink to="/register"
                    class="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold transition-colors">
                    Создать профиль
                  </NuxtLink>
                </p>
              </div>
            </div>

            <!-- Side Info -->
            <div
              class="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800/50 dark:to-zinc-900/50 p-8 sm:p-12 flex flex-col justify-center border-l border-zinc-200 dark:border-zinc-800">
              <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-8">
                С возвращением
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  title: "Вход — MindQLab",
});

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

const infoItems = [
  { icon: "fa-chart-pie", title: "Все замеры под рукой", text: "Ваша история диагностики и тренировок доступна в любой момент." },
  { icon: "fa-rocket", title: "Прогрессируйте быстрее", text: "Система автоматически адаптирует план под ваше текущее состояние." },
  { icon: "fa-shield-alt", title: "Безопасность данных", text: "Ваши результаты зашифрованы и доступны только вам." },
];

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  isLoading.value = true;
  error.value = "";

  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/profile");
  } catch (err) {
    console.error("Login error:", err);
    error.value = "Неверный email или пароль. Пожалуйста, проверьте данные.";
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
  @apply w-full px-4 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-medium text-sm;
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
