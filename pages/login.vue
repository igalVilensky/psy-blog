<template>
  <div class="relative h-[80dvh]">
    <div class="container mx-auto max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Login Form Section -->
      <div
        class="w-full max-w-4xl bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden grid md:grid-cols-2 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] mx-auto"
      >
        <!-- Login Form -->
        <div class="p-10">
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-6"
          >
            Вход
          </h2>
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Email input -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i class="far fa-envelope text-[#0EA5E9]"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  autocomplete="email"
                  required
                  class="w-full pl-10 pr-4 py-2 bg-white/5 border border-[#0EA5E9]/20 rounded-lg text-slate-300 placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <!-- Password input -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-slate-300 mb-2"
              >
                Пароль
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i class="fa fa-lock text-[#0EA5E9]"></i>
                </span>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  autocomplete="current-password"
                  required
                  class="w-full pl-10 pr-12 py-2 bg-white/5 border border-[#0EA5E9]/20 rounded-lg text-slate-300 placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  <i
                    :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
                    class="text-[#0EA5E9] hover:text-[#22D3EE] transition-colors duration-200"
                  ></i>
                </button>
              </div>
            </div>

            <!-- Error message -->
            <div
              v-if="error"
              class="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg"
            >
              {{ error }}
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="w-full relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group"
              :disabled="isLoading"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
              >
                <i class="fas fa-sign-in-alt"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
              >
                <i class="fas fa-arrow-right mr-2"></i>
                {{ isLoading ? "Вход..." : "Войти" }}
              </span>
              <span class="relative invisible">Войти</span>
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-slate-400">
            Нет аккаунта?
            <NuxtLink
              to="/register"
              class="text-[#0EA5E9] hover:text-[#22D3EE] font-medium transition-colors duration-200"
            >
              Зарегистрироваться
            </NuxtLink>
          </p>
        </div>

        <!-- Info Section -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl p-10 flex flex-col justify-center border-l border-[#0EA5E9]/20"
        >
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-8"
          >
            Добро пожаловать!
          </h2>
          <div class="space-y-6">
            <div class="flex items-center space-x-4 group">
              <div
                class="p-3 bg-white/10 rounded-lg border border-[#0EA5E9]/20 backdrop-blur-sm group-hover:shadow-[0_0_10px_2px_rgba(14,165,233,0.3)] transition-all duration-300"
              >
                <i class="fas fa-book-reader text-[#0EA5E9] text-xl"></i>
              </div>
              <span class="text-slate-300">Продолжите свой путь обучения</span>
            </div>
            <div class="flex items-center space-x-4 group">
              <div
                class="p-3 bg-white/10 rounded-lg border border-[#0EA5E9]/20 backdrop-blur-sm group-hover:shadow-[0_0_10px_2px_rgba(14,165,233,0.3)] transition-all duration-300"
              >
                <i class="fas fa-chart-line text-[#0EA5E9] text-xl"></i>
              </div>
              <span class="text-slate-300">Отслеживайте свой прогресс</span>
            </div>
            <div class="flex items-center space-x-4 group">
              <div
                class="p-3 bg-white/10 rounded-lg border border-[#0EA5E9]/20 backdrop-blur-sm group-hover:shadow-[0_0_10px_2px_rgba(14,165,233,0.3)] transition-all duration-300"
              >
                <i class="fas fa-users text-[#0EA5E9] text-xl"></i>
              </div>
              <span class="text-slate-300">Станьте частью сообщества</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

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
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
