<template>
  <div
    class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white flex flex-col items-center justify-center py-12 px-4"
    :style="{ minHeight: 'calc(100vh - 250px)' }"
  >
    <div
      class="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2"
    >
      <!-- Login Form Section -->
      <div class="p-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Вход</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="far fa-envelope text-indigo-600"></i>
              </span>
              <input
                type="email"
                id="email"
                v-model="email"
                autocomplete="email"
                required
                class="w-full pl-10 pr-4 py-2 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <!-- Password input -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Пароль
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fa fa-lock text-indigo-600"></i>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                autocomplete="current-password"
                required
                class="w-full pl-10 pr-12 py-2 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <i
                  :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
                  class="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                ></i>
              </button>
            </div>
          </div>

          <!-- Error message -->
          <div
            v-if="error"
            class="text-sm text-red-500 bg-red-50 p-3 rounded-lg"
          >
            {{ error }}
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 group"
            :disabled="isLoading"
          >
            <i
              class="fas fa-sign-in-alt group-hover:translate-x-1 transition-transform duration-200"
            ></i>
            <span>{{ isLoading ? "Вход..." : "Войти" }}</span>
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          Нет аккаунта?
          <NuxtLink
            to="/register"
            class="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            Зарегистрироваться
          </NuxtLink>
        </p>
      </div>

      <!-- Info Section -->
      <div
        class="bg-gradient-to-br from-indigo-50 to-blue-50 p-10 flex flex-col justify-center"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Добро пожаловать!</h2>
        <div class="space-y-6">
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
            >
              <i class="fas fa-book-reader text-indigo-600 text-xl"></i>
            </div>
            <span class="text-gray-700">Продолжите свой путь обучения</span>
          </div>
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
            >
              <i class="fas fa-chart-line text-indigo-600 text-xl"></i>
            </div>
            <span class="text-gray-700">Отслеживайте свой прогресс</span>
          </div>
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
            >
              <i class="fas fa-users text-indigo-600 text-xl"></i>
            </div>
            <span class="text-gray-700">Станьте частью сообщества</span>
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
