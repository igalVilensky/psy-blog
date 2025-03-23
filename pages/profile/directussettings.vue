<template>
  <div class="relative min-h-screen px-4 xl:px-0">
    <!-- Main Content -->
    <div class="container mx-auto max-w-6xl relative z-10 py-8">
      <!-- Settings Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Settings Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Settings -->
          <section
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8"
          >
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
            >
              <h2 class="text-2xl font-bold text-white/90 mb-2 md:mb-0">
                Настройки профиля
              </h2>
              <span class="text-sm text-slate-400">* Обязательные поля</span>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="saveProfile" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Display Name -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300">
                    Отображаемое имя *
                  </label>
                  <input
                    v-model="displayName"
                    type="text"
                    required
                    placeholder="Введите ваше имя"
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  />
                </div>

                <!-- Profession -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300">
                    Профессия
                  </label>
                  <input
                    v-model="profession"
                    type="text"
                    placeholder="Введите вашу профессию"
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  />
                </div>

                <!-- Age -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300">
                    Возраст
                  </label>
                  <input
                    v-model="age"
                    type="number"
                    min="13"
                    max="120"
                    placeholder="Введите ваш возраст"
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  />
                </div>

                <!-- Gender -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300">
                    Пол
                  </label>
                  <select
                    v-model="gender"
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  >
                    <option value="" disabled>Выберите пол</option>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                  </select>
                </div>
              </div>

              <!-- About Section -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300">
                  О себе
                </label>
                <textarea
                  v-model="aboutYourself"
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  rows="4"
                  maxlength="300"
                  placeholder="Расскажите немного о себе..."
                ></textarea>
                <div class="flex justify-end">
                  <span class="text-sm text-slate-400">
                    {{ aboutYourself.length }}/300
                  </span>
                </div>
              </div>

              <!-- Social Media Links (UI only, not updated in Directus) -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300">
                  Социальные сети
                </label>
                <div class="space-y-4">
                  <div
                    v-for="(platform, index) in socialMedia"
                    :key="index"
                    class="flex gap-2 md:gap-4 items-center"
                  >
                    <select
                      v-model="platform.type"
                      class="w-1/3 md:w-1/4 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-gray-800 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] text-sm md:text-base"
                    >
                      <option value="telegram">Telegram</option>
                      <option value="vk">VK</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                    </select>
                    <input
                      v-model="platform.url"
                      type="text"
                      :placeholder="'Ссылка на ' + platform.type"
                      class="w-2/3 md:flex-1 px-2 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] text-sm md:text-base"
                    />
                    <button
                      type="button"
                      @click="removeSocialPlatform(index)"
                      class="text-red-500 hover:text-red-600 text-sm md:text-base"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  @click="addSocialPlatform"
                  class="text-[#0EA5E9] text-sm hover:underline mt-2"
                >
                  + Добавить соц. сеть
                </button>
              </div>

              <!-- Save Button -->
              <button
                type="submit"
                class="group relative inline-flex items-center justify-center w-full px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-save"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
                >
                  <i class="fas fa-save mr-2"></i>
                  Сохранить изменения
                </span>
                <span class="relative invisible">Сохранить изменения</span>
              </button>
            </form>
          </section>
          <!-- Feedback Section -->
          <section
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8"
          >
            <h2 class="text-xl font-bold text-white/90 mb-6">Обратная связь</h2>
            <form @submit.prevent="submitFeedbackForm" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300"
                  >Имя</label
                >
                <input
                  v-model="feedbackForm.name"
                  type="text"
                  placeholder="Введите ваше имя"
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300"
                  >Email</label
                >
                <input
                  v-model="feedbackForm.email"
                  type="email"
                  placeholder="Введите ваш email"
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300"
                  >Сообщение</label
                >
                <textarea
                  v-model="feedbackForm.message"
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  rows="4"
                  placeholder="Напишите вашего отзыва..."
                ></textarea>
              </div>
              <button
                type="submit"
                :disabled="isSubmittingFeedback"
                class="group relative inline-flex items-center justify-center w-full sm:w-fit px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
              >
                <span
                  class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
                >
                  <i class="fas fa-paper-plane"></i>
                </span>
                <span
                  class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
                >
                  <i class="fas fa-paper-plane mr-2"></i>
                  Отправить отзыв
                </span>
                <span class="relative invisible">Отправить отзыв</span>
              </button>
            </form>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <section
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8"
          >
            <h2 class="text-xl font-bold text-white/90 mb-6">
              Управление аккаунтом
            </h2>
            <div class="space-y-4">
              <button
                @click="changePassword"
                class="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white hover:bg-white/10 transition-colors flex items-center"
              >
                <i class="fas fa-key mr-3"></i>
                Сменить пароль
              </button>
              <button
                @click="exportData"
                class="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white hover:bg-white/10 transition-colors flex items-center"
              >
                <i class="fas fa-download mr-3"></i>
                Экспорт данных
              </button>
              <button
                @click="confirmDeleteAccount"
                class="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-[#F59E0B]/20 text-[#F59E0B] hover:bg-white/10 transition-colors flex items-center"
              >
                <i class="fas fa-trash mr-3"></i>
                Удалить аккаунт
              </button>
            </div>
          </section>
          <section
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-8"
          >
            <h2 class="text-xl font-bold text-white/90 mb-6">Поддержка</h2>
            <div class="space-y-4">
              <NuxtLink
                to="/faq"
                class="block px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white hover:bg-white/10 transition-colors"
              >
                <i class="fas fa-question-circle mr-3"></i>
                FAQ
              </NuxtLink>
              <button
                @click="contactSupport"
                class="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white hover:bg-white/10 transition-colors flex items-center"
              >
                <i class="fas fa-headset mr-3"></i>
                Связаться с поддержкой
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
    <Notification
      v-if="notificationVisible"
      :message="notificationMessage"
      :type="notificationType"
      @close="hideNotification"
      class="z-50"
    />
    <nav
      class="fixed sm:hidden bottom-4 left-4 right-4 sm:left-8 sm:right-8 bg-gradient-to-r from-[#1A1F35]/60 to-[#1E293B]/60 backdrop-blur-xl rounded-lg border border-[#0EA5E9]/20 p-4 z-50"
    >
      <NuxtLink
        to="/profile"
        class="group inline-flex items-center justify-center w-full px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
      >
        <span
          class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
        >
          <i class="fas fa-arrow-left"></i>
        </span>
        <span
          class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
        >
          <i class="fas fa-arrow-left mr-1 md:mr-2"></i>
          <span>Назад в профиль</span>
        </span>
        <span class="relative invisible">Назад в профиль</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNotification } from "@/composables/useNotification";
import Notification from "@/components/base/Notification.vue";
import {
  updateDirectusUserProfile,
  fetchDirectusUserProfile,
  getCurrentDirectusUser,
} from "@/api/directus";
import { useDirectusAuthStore } from "~/stores/auth2";

// Initialize router and store
const router = useRouter();
const directusAuthStore = useDirectusAuthStore();

// Notification composable
const {
  notificationMessage,
  notificationType,
  notificationVisible,
  showNotification,
  hideNotification,
} = useNotification();

// Profile Fields
const userId = ref(null);
const displayName = ref("");
const profession = ref("");
const age = ref("");
const gender = ref("");
const aboutYourself = ref("");
const socialMedia = ref([{ type: "telegram", url: "" }]); // UI only, not updated in Directus

// Feedback Form
const feedbackForm = reactive({
  name: "",
  email: "",
  message: "",
});
const isSubmittingFeedback = ref(false);

// Fetch current user and profile data on mount
onMounted(async () => {
  // Check if access token exists; if not, attempt to refresh it
  if (!directusAuthStore.accessToken) {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const newAccessToken = await directusAuthStore.refreshToken();
      if (!newAccessToken) {
        showNotification("Сессия истекла. Пожалуйста, войдите снова.", "error");
        directusAuthStore.clearAuth();
        router.push("/login");
        return;
      }
    } else {
      showNotification("Пользователь не авторизован.", "error");
      router.push("/login");
      return;
    }
  }

  // Get current user from Directus
  const userResult = await getCurrentDirectusUser();
  if (userResult.success) {
    userId.value = userResult.user.id;
    displayName.value = userResult.user.first_name || ""; // Set initial displayName from user

    // Fetch profile data
    const profileResult = await fetchDirectusUserProfile({
      userId: userId.value,
    });
    console.log(profileResult, "profileResult");

    if (profileResult.success && profileResult.profile) {
      displayName.value = profileResult.profile.first_name || displayName.value;
      profession.value = profileResult.profile.profession || "";
      age.value = profileResult.profile.age || "";
      gender.value = profileResult.profile.gender || "";
      aboutYourself.value = profileResult.profile.about_yourself || "";
      console.log("Profile data loaded:", profileResult.profile);
    }
  } else {
    showNotification(
      "Ошибка при загрузке данных пользователя: " + userResult.message,
      "error"
    );
    directusAuthStore.clearAuth(); // Clear auth state if user fetch fails
    router.push("/login");
  }
});

// Add a new social platform (UI only)
const addSocialPlatform = () => {
  socialMedia.value.push({ type: "telegram", url: "" });
};

// Remove a social platform (UI only)
const removeSocialPlatform = (index) => {
  socialMedia.value.splice(index, 1);
};

// Save Profile
const saveProfile = async () => {
  if (!directusAuthStore.accessToken || !userId.value) {
    showNotification("Пользователь не авторизован.", "error");
    router.push("/login");
    return;
  }

  const data = {
    userId: userId.value,
    first_name: displayName.value,
    profession: profession.value,
    age: age.value,
    gender: gender.value,
    about_yourself: aboutYourself.value,
  };

  const result = await updateDirectusUserProfile(data);
  if (result.success) {
    showNotification("Изменения сохранены!", "success");
    goBackToProfile();
  } else {
    showNotification(
      "Ошибка при сохранении изменений: " + result.message,
      "error"
    );
  }
};

// Redirect back to profile
const goBackToProfile = () => {
  if (displayName.value) {
    router.push(`/profile/${displayName.value}`);
  } else {
    router.push("/profile");
  }
};

// Placeholder methods
const changePassword = () => {
  showNotification("Функция смены пароля пока не реализована.", "info");
};

const exportData = () => {
  showNotification("Функция экспорта данных пока не реализована.", "info");
};

const confirmDeleteAccount = () => {
  showNotification("Функция удаления аккаунта пока не реализована.", "info");
};

const contactSupport = () => {
  showNotification(
    "Свяжитесь с поддержкой через форму обратной связи.",
    "info"
  );
  router.push("/contact");
};

const submitFeedbackForm = async () => {
  if (feedbackForm.message.trim() === "") {
    showNotification("Пожалуйста, введите ваш отзыв перед отправкой.", "error");
    return;
  }
  showNotification("Функция отправки отзыва пока не реализована.", "info");
};
</script>
