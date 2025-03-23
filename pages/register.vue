<template>
  <div class="relative" :style="{ minHeight: 'calc(100vh - 250px)' }">
    <div class="container mx-auto max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Registration Form Section -->
      <div
        class="w-full max-w-4xl mx-auto bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 overflow-hidden grid md:grid-cols-2 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <!-- Registration Form -->
        <div class="p-6 sm:p-8">
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-6"
          >
            Регистрация
          </h2>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="text-sm text-green-400 bg-green-500/10 p-3 rounded-lg mb-4"
          >
            {{ successMessage }}
            <NuxtLink
              to="/profile"
              class="text-[#0EA5E9] hover:text-[#22D3EE] font-medium transition-colors duration-200 underline ml-1"
            >
              Перейти в профиль
            </NuxtLink>
          </div>

          <!-- Registration Form (shown only if no success message) -->
          <form
            v-if="!successMessage"
            @submit.prevent="handleRegister"
            class="space-y-4"
          >
            <!-- Display Name input -->
            <div>
              <label
                for="displayName"
                class="block text-sm font-medium text-slate-300 mb-2"
              >
                Ваше имя
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i class="fas fa-user text-[#0EA5E9]"></i>
                </span>
                <input
                  type="text"
                  id="displayName"
                  v-model="displayName"
                  required
                  class="w-full pl-10 pr-4 py-2 bg-white/5 border border-[#0EA5E9]/20 rounded-lg text-slate-300 placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors duration-200"
                  placeholder="Иван Иванов"
                />
              </div>
            </div>

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
                  <i class="fas fa-envelope text-[#0EA5E9]"></i>
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
                  <i class="fas fa-lock text-[#0EA5E9]"></i>
                </span>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  aria-label="Password"
                  aria-describedby="password-helper"
                  autocomplete="new-password"
                  required
                  class="w-full pl-10 pr-12 py-2 bg-white/5 border border-[#0EA5E9]/20 rounded-lg text-slate-300 placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="togglePassword('password')"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  <i
                    :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    class="text-[#0EA5E9] hover:text-[#22D3EE] transition-colors duration-200"
                  ></i>
                </button>
              </div>
            </div>

            <!-- Confirm Password input -->
            <div>
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-slate-300 mb-2"
              >
                Подтвердите пароль
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i class="fas fa-lock text-[#0EA5E9]"></i>
                </span>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  autocomplete="new-password"
                  required
                  class="w-full pl-10 pr-12 py-2 bg-white/5 border border-[#0EA5E9]/20 rounded-lg text-slate-300 placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-colors duration-200"
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
                    class="text-[#0EA5E9] hover:text-[#22D3EE] transition-colors duration-200"
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
                    class="w-4 h-4 bg-white/5 border border-[#0EA5E9]/20 rounded focus:ring-[#0EA5E9] focus:ring-2 text-[#0EA5E9]"
                  />
                </div>
                <div class="ml-3">
                  <label for="privacy" class="text-sm text-slate-300">
                    Я согласен с
                    <NuxtLink
                      to="/legal/privacy"
                      class="text-[#0EA5E9] hover:text-[#22D3EE] transition-colors duration-200"
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
                    class="w-4 h-4 bg-white/5 border border-[#0EA5E9]/20 rounded focus:ring-[#0EA5E9] focus:ring-2 text-[#0EA5E9]"
                  />
                </div>
                <div class="ml-3">
                  <label for="terms" class="text-sm text-slate-300">
                    Я принимаю
                    <NuxtLink
                      to="/legal/terms"
                      class="text-[#0EA5E9] hover:text-[#22D3EE] transition-colors duration-200"
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
              class="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg"
            >
              {{ error }}
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="!isFormValid || isLoading"
              class="w-full relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
              >
                <i class="fas fa-user-plus"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
              >
                <i class="fas fa-arrow-right mr-2"></i>
                {{ isLoading ? "Регистрация..." : "Зарегистрироваться" }}
              </span>
              <span class="relative invisible">Зарегистрироваться</span>
            </button>
          </form>

          <p
            v-if="!successMessage"
            class="mt-6 text-center text-sm text-slate-400"
          >
            Уже есть аккаунт?
            <NuxtLink
              to="/login"
              class="text-[#0EA5E9] hover:text-[#22D3EE] font-medium transition-colors duration-200"
            >
              Войти
            </NuxtLink>
          </p>
        </div>

        <!-- Info Section -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-center border-l border-[#0EA5E9]/20"
        >
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-8"
          >
            Присоединяйтесь к нам
          </h2>
          <div class="space-y-6">
            <div class="flex items-center space-x-4 group">
              <div
                class="p-3 bg-white/10 rounded-lg border border-[#0EA5E9]/20 backdrop-blur-sm group-hover:shadow-[0_0_10px_2px_rgba(14,165,233,0.3)] transition-all duration-300"
              >
                <i class="fas fa-users text-[#0EA5E9] text-xl"></i>
              </div>
              <span class="text-slate-300"
                >Доступ к эксклюзивному контенту</span
              >
            </div>
            <div class="flex items-center space-x-4 group">
              <div
                class="p-3 bg-white/10 rounded-lg border border-[#0EA5E9]/20 backdrop-blur-sm group-hover:shadow-[0_0_10px_2px_rgba(14,165,233,0.3)] transition-all duration-300"
              >
                <i class="fas fa-graduation-cap text-[#0EA5E9] text-xl"></i>
              </div>
              <span class="text-slate-300">Возможность обучения</span>
            </div>
            <div class="flex items-center space-x-4 group">
              <div
                class="p-3 bg-white/10 rounded-lg border border-[#0EA5E9]/20 backdrop-blur-sm group-hover:shadow-[0_0_10px_2px_rgba(14,165,233,0.3)] transition-all duration-300"
              >
                <i class="fas fa-comments text-[#0EA5E9] text-xl"></i>
              </div>
              <span class="text-slate-300">Общение с единомышленниками</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { registerUser } from "~/api/firebase/userProfile"; // Firebase registration
import { registerDirectusUser, getCurrentDirectusUser } from "~/api/directus"; // Directus API
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useDirectusAuthStore } from "~/stores/auth2";
import { useRuntimeConfig } from "#app/nuxt";
import { useHead } from "@unhead/vue";
const directusAuthStore = useDirectusAuthStore();

const route = useRoute();
const firestore = getFirestore();
const assessmentId = ref(route.query.assessmentId);

// Access runtime config
const { useDirectus, directusAdminToken, directusCustomerRoleId, directusUrl } =
  useRuntimeConfig().public;

// Refs for form inputs and state
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const displayName = ref("");
const error = ref("");
const successMessage = ref("");
const acceptPrivacy = ref(false);
const acceptTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

// Default Directus URL
const API_URL = directusUrl || "http://localhost:8055";

// SEO metadata with useHead (unchanged)
useHead({
  title: "Регистрация - Присоединяйтесь к нашему сообществу",
  meta: [
    {
      name: "description",
      content:
        "Зарегистрируйтесь, чтобы получить доступ к эксклюзивному контенту, обучению и общению с единомышленниками.",
    },
    {
      name: "keywords",
      content: "регистрация, создать аккаунт, сообщество, обучение",
    },
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  htmlAttrs: { lang: "ru" },
});

// Computed property to check if form is valid (unchanged)
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

// Toggle password visibility (unchanged)
const togglePassword = (field) => {
  if (field === "password") showPassword.value = !showPassword.value;
  else if (field === "confirm")
    showConfirmPassword.value = !showConfirmPassword.value;
};

// Associate assessment with user (Firebase-specific, unchanged)
const associateAssessmentWithUser = async (userId) => {
  if (!assessmentId.value) return;
  try {
    const assessmentRef = doc(
      firestore,
      "archetypeResults",
      assessmentId.value
    );
    await updateDoc(assessmentRef, { userId });
  } catch (err) {
    console.error("Error associating assessment:", err);
    error.value = "Failed to link your test results. Please contact support.";
  }
};

// Handle registration with debug logs
const handleRegister = async () => {
  if (!isFormValid.value) {
    error.value =
      "Пожалуйста, заполните все поля корректно и примите условия использования";
    return;
  }

  error.value = "";
  isLoading.value = true;

  try {
    console.log("Attempting Firebase registration...");
    const firebaseResponse = await registerUser(
      email.value,
      password.value,
      displayName.value
    );
    console.log("Firebase register response:", firebaseResponse);

    if (!firebaseResponse.success) {
      throw new Error(
        firebaseResponse.message || "Ошибка при регистрации в Firebase"
      );
    }

    const userId = firebaseResponse.user.uid;
    if (assessmentId.value) {
      await associateAssessmentWithUser(userId);
    }

    console.log("Runtime config:", useRuntimeConfig().public);
    console.log("useDirectus:", useDirectus);
    console.log("Condition result:", useDirectus);

    if (useDirectus) {
      console.log("Attempting Directus registration...");
      const directusResponse = await registerDirectusUser({
        email: email.value,
        password: password.value,
        firstName: displayName.value,
        adminToken: directusAdminToken,
        customerRoleId: directusCustomerRoleId,
        acceptedPrivacyPolicy: acceptPrivacy.value,
        acceptedTerms: acceptTerms.value,
      });

      console.log("Directus registration response:", directusResponse);

      if (directusResponse.success) {
        console.log("Directus registration successful:", directusResponse.user);

        console.log("Attempting Directus login...");
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const loginData = await loginResponse.json();
        console.log("Directus login response:", loginData);

        if (!loginResponse.ok) {
          throw new Error(
            loginData.errors?.[0]?.message || "Ошибка входа в Directus"
          );
        }

        // Debug authStore actions
        console.log("authStore actions:", {
          setTokens: typeof directusAuthStore.setTokens,
          clearAuth: typeof directusAuthStore.clearAuth,
          refreshToken: typeof directusAuthStore.refreshToken,
        });

        console.log("directusAuthStore", directusAuthStore);

        directusAuthStore.setTokens(
          loginData.data.access_token,
          loginData.data.refresh_token
        );
        console.log("Directus tokens stored:", {
          access: loginData.data.access_token,
          refresh: loginData.data.refresh_token,
        });

        console.log("Fetching current Directus user...");
        const userResponse = await getCurrentDirectusUser();
        if (userResponse.success) {
          directusAuthStore.user = userResponse.user;
          console.log("Directus user fetched:", userResponse.user);
        }
      } else {
        console.warn("Directus registration failed:", {
          message: directusResponse.message,
          details: directusResponse.details,
        });
      }
    } else {
      console.log("Directus registration skipped due to condition.");
    }

    successMessage.value = "Регистрация прошла успешно! Теперь вы можете";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    displayName.value = "";
    acceptPrivacy.value = false;
    acceptTerms.value = false;
  } catch (err) {
    console.error("Registration error:", err);
    error.value = err.message || "Произошла ошибка при регистрации";
  } finally {
    isLoading.value = false;
  }
};
</script>
