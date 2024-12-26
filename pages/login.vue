<template>
  <div
    class="bg-[#FFF5F5] flex flex-col items-center justify-center py-12 px-4"
    :style="{ minHeight: 'calc(100vh - 250px)' }"
  >
    <div
      class="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2"
    >
      <!-- Login Form Section -->
      <div class="p-10">
        <h2 class="text-3xl font-bold text-[#4A4238] mb-6">Вход</h2>
        <form @submit.prevent="loginUser" class="space-y-4">
          <!-- Email input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-[#6B5B4C] mb-2"
            >
              Email
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fas fa-envelope text-[#FF6B6B]"></i>
              </span>
              <input
                type="email"
                id="email"
                v-model="email"
                autocomplete="email"
                required
                class="w-full pl-10 pr-4 py-2 border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
            </div>
          </div>

          <!-- Password input -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-[#6B5B4C] mb-2"
            >
              Пароль
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fas fa-lock text-[#FF6B6B]"></i>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                autocomplete="current-password"
                required
                class="w-full pl-10 pr-12 py-2 border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  class="text-[#FF6B6B]"
                ></i>
              </button>
            </div>
          </div>

          <!-- Error message -->
          <div v-if="error" class="text-sm text-red-500 mb-4">{{ error }}</div>

          <!-- Submit button -->
          <button
            type="submit"
            class="w-full bg-[#FF6B6B] text-white py-3 rounded-lg hover:bg-[#FF5252] transition flex items-center justify-center space-x-2"
          >
            <i class="fas fa-sign-in-alt"></i>
            <span>Войти</span>
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-[#6B5B4C]">
          Нет аккаунта?
          <NuxtLink
            to="/register"
            class="text-[#FF6B6B] hover:text-[#FF5252] transition"
          >
            Зарегистрироваться
          </NuxtLink>
        </p>
      </div>

      <!-- Info Section -->
      <div class="bg-[#FFE4E1] p-10 flex flex-col justify-center space-y-6">
        <h2 class="text-3xl font-bold text-[#4A4238] mb-4">С возвращением!</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <i class="fas fa-book-reader text-[#FF6B6B] text-xl"></i>
            <span class="text-[#6B5B4C]">Продолжите обучение</span>
          </div>
          <div class="flex items-center space-x-4">
            <i class="fas fa-chart-line text-[#FF6B6B] text-xl"></i>
            <span class="text-[#6B5B4C]">Отслеживайте свой прогресс</span>
          </div>
          <div class="flex items-center space-x-4">
            <i class="fas fa-users text-[#FF6B6B] text-xl"></i>
            <span class="text-[#6B5B4C]">Присоединяйтесь к сообществу</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const showPassword = ref(false);

const loginUser = async () => {
  const auth = getAuth();
  error.value = "";

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/profile");
  } catch (err) {
    error.value = err.message;
  }
};
</script>
