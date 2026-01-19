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
            
            <!-- Login Form -->
            <div class="p-8 sm:p-12">
              <div class="mb-10">
                <h2 class="text-3xl font-light text-stone-900 dark:text-white uppercase tracking-tight mb-2">
                  Вход в <span class="text-mindqlab-calm-accent font-medium">MindQLab</span>
                </h2>
                <p class="text-stone-400 dark:text-stone-500 font-light italic text-sm">
                  Продолжите свой путь развития
                </p>
              </div>

              <form @submit.prevent="handleLogin" class="space-y-6">
                <!-- Email -->
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-5 text-stone-300 dark:text-stone-600">
                      <i class="far fa-envelope text-sm"></i>
                    </span>
                    <input type="email" id="email" v-model="email" autocomplete="email" required
                      class="form-input pl-12" placeholder="your@email.com" />
                  </div>
                </div>

                <!-- Password -->
                <div class="form-group">
                  <label for="password" class="form-label">Пароль</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-5 text-stone-300 dark:text-stone-600">
                      <i class="fas fa-lock text-sm"></i>
                    </span>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                      autocomplete="current-password" required class="form-input pl-12 pr-12" placeholder="••••••••" />
                    <button type="button" @click="togglePassword"
                      class="absolute inset-y-0 right-0 flex items-center pr-5 text-stone-300 dark:text-stone-600 hover:text-mindqlab-calm-accent transition-colors">
                      <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'" class="text-sm"></i>
                    </button>
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-500 text-xs font-light leading-relaxed animate-shake">
                  <i class="fas fa-exclamation-circle mr-2"></i> {{ error }}
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                  <button type="submit" :disabled="isLoading" class="submit-btn group relative overflow-hidden">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                      <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
                      <i v-else class="fas fa-arrow-right mr-2 transition-transform group-hover:translate-x-1"></i>
                      {{ isLoading ? "Вход..." : "ВОЙТИ" }}
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-mindqlab-calm-accent to-mindqlab-calm-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </form>

              <div class="mt-8 text-center">
                <p class="text-xs text-stone-400 dark:text-stone-500 font-light">
                  Нет аккаунта? 
                  <NuxtLink to="/register" class="text-mindqlab-calm-accent hover:underline font-medium transition-colors">
                    Создать профиль
                  </NuxtLink>
                </p>
              </div>
            </div>

            <!-- Side Info -->
            <div class="bg-stone-50/50 dark:bg-stone-800/30 p-8 sm:p-12 flex flex-col justify-center border-l border-stone-100 dark:border-stone-800/50">
              <h3 class="text-xl font-light text-stone-900 dark:text-white uppercase tracking-tight mb-8">
                С возвращением
              </h3>
              <div class="space-y-8">
                <div v-for="(item, i) in infoItems" :key="i" class="flex items-start gap-4 group">
                  <div class="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center text-mindqlab-calm-accent shadow-sm border border-stone-100 dark:border-stone-700/50 group-hover:border-mindqlab-calm-accent/30 transition-all duration-500 shrink-0">
                    <i :class="['fas', item.icon, 'text-sm']"></i>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-stone-800 dark:text-stone-200 mb-1">{{ item.title }}</h4>
                    <p class="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">{{ item.text }}</p>
                  </div>
                </div>
              </div>

              <!-- Integration Micro-text -->
              <div class="mt-12 pt-8 border-t border-stone-100 dark:border-stone-800/50">
                <p class="text-[10px] uppercase tracking-widest text-stone-300 dark:text-stone-600 font-bold">
                  Core System Integration
                </p>
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
  @apply w-full px-10 py-5 rounded-full bg-mindqlab-calm-accent text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-mindqlab-calm-accent/20;
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
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>

