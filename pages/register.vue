<template>
  <div
    class="bg-gradient-to-br from-pink-50 via-rose-50 to-white flex flex-col items-center justify-center py-12 px-4"
    :style="{ minHeight: 'calc(100vh - 250px)' }"
  >
    <div
      class="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2"
    >
      <!-- Registration Form Section -->
      <div class="p-10">
        <h2 class="text-3xl font-bold text-[#4A4238] mb-6">Регистрация</h2>
        <form @submit.prevent="registerUser" class="space-y-4">
          <!-- Display Name input -->
          <div>
            <label
              for="displayName"
              class="block text-sm font-medium text-[#6B5B4C] mb-2"
            >
              Ваше имя
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fas fa-user text-[#FF6B6B]"></i>
              </span>
              <input
                type="text"
                id="displayName"
                v-model="displayName"
                required
                class="w-full pl-10 pr-4 py-2 border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
            </div>
          </div>

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
                autocomplete="new-password"
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

          <!-- Confirm Password input -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-[#6B5B4C] mb-2"
            >
              Подтвердите пароль
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fas fa-lock text-[#FF6B6B]"></i>
              </span>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                class="w-full pl-10 pr-12 py-2 border-2 border-[#FFD1DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                <i
                  :class="
                    showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                  class="text-[#FF6B6B]"
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
                  class="w-4 h-4 border-2 border-[#FFD1DC] rounded focus:ring-[#FF6B6B] focus:ring-2"
                />
              </div>
              <div class="ml-3">
                <label for="privacy" class="text-sm text-[#6B5B4C]">
                  Я согласен с
                  <NuxtLink
                    to="/legal/privacy"
                    class="text-[#FF6B6B] hover:text-[#FF5252] transition"
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
                  class="w-4 h-4 border-2 border-[#FFD1DC] rounded focus:ring-[#FF6B6B] focus:ring-2"
                />
              </div>
              <div class="ml-3">
                <label for="terms" class="text-sm text-[#6B5B4C]">
                  Я принимаю
                  <NuxtLink
                    to="/legal/terms"
                    class="text-[#FF6B6B] hover:text-[#FF5252] transition"
                  >
                    Условия использования
                  </NuxtLink>
                </label>
              </div>
            </div>
          </div>

          <!-- Error message -->
          <div v-if="error" class="text-sm text-red-500 mb-4">{{ error }}</div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full bg-[#FF6B6B] text-white py-3 rounded-lg hover:bg-[#FF5252] transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-user-plus"></i>
            <span>Зарегистрироваться</span>
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-[#6B5B4C]">
          Уже есть аккаунт?
          <NuxtLink
            to="/login"
            class="text-[#FF6B6B] hover:text-[#FF5252] transition"
          >
            Войти
          </NuxtLink>
        </p>
      </div>

      <!-- Info Section -->
      <div class="bg-[#FFE4E1] p-10 flex flex-col justify-center space-y-6">
        <h2 class="text-3xl font-bold text-[#4A4238] mb-4">
          Присоединяйтесь к нам
        </h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <i class="fas fa-users text-[#FF6B6B] text-xl"></i>
            <span class="text-[#6B5B4C]">Доступ к эксклюзивному контенту</span>
          </div>
          <div class="flex items-center space-x-4">
            <i class="fas fa-graduation-cap text-[#FF6B6B] text-xl"></i>
            <span class="text-[#6B5B4C]">Возможность обучения</span>
          </div>
          <div class="flex items-center space-x-4">
            <i class="fas fa-comments text-[#FF6B6B] text-xl"></i>
            <span class="text-[#6B5B4C]">Общение с единомышленниками</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { doc, setDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const displayName = ref("");
const error = ref("");
const acceptPrivacy = ref(false);
const acceptTerms = ref(false);
const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

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
    // Basic email validation
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
    // Minimum password length validation (e.g., 6 characters)
    password.value.length >= 6
  );
});

const registerUser = async () => {
  if (!isFormValid.value) {
    error.value =
      "Пожалуйста, заполните все поля корректно и примите условия использования";
    return;
  }

  const auth = getAuth();
  error.value = "";

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: displayName.value,
    });

    const firestore = useNuxtApp().$firestore;
    await setDoc(doc(firestore, "users", user.uid), {
      email: user.email,
      displayName: displayName.value,
      createdAt: new Date(),
      acceptedPrivacyPolicy: true,
      acceptedTerms: true,
    });

    router.push("/login");
  } catch (err) {
    error.value = err.message;
  }
};
</script>
