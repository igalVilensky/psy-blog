<template>
  <div
    class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white flex flex-col items-center justify-center py-12 px-4"
    :style="{ minHeight: 'calc(100vh - 250px)' }"
  >
    <div
      class="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2"
    >
      <!-- Registration Form Section -->
      <div class="p-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Регистрация</h2>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Display Name input -->
          <div>
            <label
              for="displayName"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Ваше имя
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fas fa-user text-indigo-600"></i>
              </span>
              <input
                type="text"
                id="displayName"
                v-model="displayName"
                required
                class="w-full pl-10 pr-4 py-2 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                placeholder="Иван Иванов"
              />
            </div>
          </div>

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
                <i class="fas fa-envelope text-indigo-600"></i>
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
                <i class="fas fa-lock text-indigo-600"></i>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                autocomplete="new-password"
                required
                class="w-full pl-10 pr-12 py-2 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="togglePassword('password')"
                class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  class="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                ></i>
              </button>
            </div>
          </div>

          <!-- Confirm Password input -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Подтвердите пароль
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fas fa-lock text-indigo-600"></i>
              </span>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                class="w-full pl-10 pr-12 py-2 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="togglePassword('confirm')"
                class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <i
                  :class="
                    showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                  class="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                ></i>
              </button>
            </div>
          </div>

          <!-- Privacy Policy and Terms Checkboxes -->
          <div class="space-y-3">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="privacy"
                  v-model="acceptPrivacy"
                  type="checkbox"
                  required
                  class="w-4 h-4 border-2 border-indigo-100 rounded focus:ring-indigo-500 focus:ring-2 text-indigo-600"
                />
              </div>
              <div class="ml-3">
                <label for="privacy" class="text-sm text-gray-600">
                  Я согласен с
                  <NuxtLink
                    to="/legal/privacy"
                    class="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  >
                    Политикой конфиденциальности
                  </NuxtLink>
                </label>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="acceptTerms"
                  type="checkbox"
                  required
                  class="w-4 h-4 border-2 border-indigo-100 rounded focus:ring-indigo-500 focus:ring-2 text-indigo-600"
                />
              </div>
              <div class="ml-3">
                <label for="terms" class="text-sm text-gray-600">
                  Я принимаю
                  <NuxtLink
                    to="/legal/terms"
                    class="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  >
                    Условия использования
                  </NuxtLink>
                </label>
              </div>
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
            :disabled="!isFormValid || isLoading"
            class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i
              class="fas fa-user-plus group-hover:translate-x-1 transition-transform duration-200"
            ></i>
            <span>{{
              isLoading ? "Регистрация..." : "Зарегистрироваться"
            }}</span>
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          Уже есть аккаунт?
          <NuxtLink
            to="/login"
            class="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            Войти
          </NuxtLink>
        </p>
      </div>

      <!-- Info Section -->
      <div
        class="bg-gradient-to-br from-indigo-50 to-blue-50 p-10 flex flex-col justify-center"
      >
        <h2 class="text-3xl font-bold text-gray-800 mb-8">
          Присоединяйтесь к нам
        </h2>
        <div class="space-y-6">
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
            >
              <i class="fas fa-users text-indigo-600 text-xl"></i>
            </div>
            <span class="text-gray-700">Доступ к эксклюзивному контенту</span>
          </div>
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
            >
              <i class="fas fa-graduation-cap text-indigo-600 text-xl"></i>
            </div>
            <span class="text-gray-700">Возможность обучения</span>
          </div>
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
            >
              <i class="fas fa-comments text-indigo-600 text-xl"></i>
            </div>
            <span class="text-gray-700">Общение с единомышленниками</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "~/api/firebase/userProfile";

// Refs for form inputs and state
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const displayName = ref("");
const error = ref("");
const acceptPrivacy = ref(false);
const acceptTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false); // Added loading state
const router = useRouter();

// Computed property to check if all fields are filled and valid
const isFormValid = computed(() => {
  return (
    displayName.value.trim() !== "" &&
    email.value.trim() !== "" &&
    password.value.trim() !== "" &&
    confirmPassword.value.trim() !== "" &&
    password.value === confirmPassword.value &&
    acceptPrivacy.value &&
    acceptTerms.value &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
    password.value.length >= 6
  );
});

// Toggle password visibility
const togglePassword = (field) => {
  if (field === "password") {
    showPassword.value = !showPassword.value;
  } else if (field === "confirm") {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};

// Handle registration
const handleRegister = async () => {
  if (!isFormValid.value) {
    error.value =
      "Пожалуйста, заполните все поля корректно и примите условия использования";
    return;
  }

  error.value = ""; // Clear any previous errors
  isLoading.value = true; // Set loading state

  try {
    const response = await registerUser(
      email.value,
      password.value,
      displayName.value
    );

    if (response.success) {
      // Redirect to login page after successful registration
      router.push("/login");
    } else {
      error.value = response.message || "Ошибка при регистрации";
    }
  } catch (err) {
    error.value = err.message || "Произошла ошибка при регистрации";
  } finally {
    isLoading.value = false; // Reset loading state
  }
};
</script>
