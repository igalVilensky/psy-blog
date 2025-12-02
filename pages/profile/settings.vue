<template>
  <div class="relative min-h-screen bg-slate-50 dark:bg-slate-950 px-4 xl:px-0 transition-colors duration-300">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-container">
        <div class="loading-spinner-wrapper">
          <div class="spinner-ring spinner-ring-1"></div>
          <div class="spinner-ring spinner-ring-2"></div>
          <div class="spinner-ring spinner-ring-3"></div>
          <div class="spinner-core">
            <i class="fas fa-cog text-3xl text-cyan-600 dark:text-cyan-400"></i>
          </div>
        </div>
        <div class="loading-text">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Загрузка настроек</h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm">Подготовка профиля...</p>
        </div>
        <div class="loading-progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto py-8 sm:py-12">
      <!-- Page Header -->
      <div class="mb-8">
        <NuxtLink to="/profile"
          class="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-300 transition-colors mb-4 group">
          <i class="fas fa-arrow-left mr-2 transform transition-transform group-hover:-translate-x-1"></i>
          Назад в профиль
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 gradient-text">
          Настройки профиля
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Управляйте своим профилем и настройками аккаунта
        </p>
      </div>

      <!-- Settings Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Main Settings Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Settings -->
          <section class="settings-card">
            <div class="settings-header">
              <div class="flex items-center gap-3">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-user-edit text-cyan-600 dark:text-cyan-400"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Настройки профиля</h2>
              </div>
              <span class="text-sm text-slate-600 dark:text-slate-400">* Обязательные поля</span>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="saveProfile" class="settings-form">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Display Name -->
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-user text-cyan-600 dark:text-cyan-400 mr-2"></i>
                    Отображаемое имя *
                  </label>
                  <input v-model="displayName" type="text" required placeholder="Введите ваше имя" class="form-input" />
                </div>

                <!-- Profession -->
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-briefcase text-cyan-600 dark:text-cyan-400 mr-2"></i>
                    Профессия
                  </label>
                  <input v-model="profession" type="text" placeholder="Введите вашу профессию" class="form-input" />
                </div>

                <!-- Age -->
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-birthday-cake text-pink-400 mr-2"></i>
                    Возраст
                  </label>
                  <input v-model="age" type="number" min="13" max="120" placeholder="Введите ваш возраст"
                    class="form-input" />
                </div>

                <!-- Gender -->
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-venus-mars text-emerald-400 mr-2"></i>
                    Пол
                  </label>
                  <select v-model="gender" class="form-input">
                    <option value="" disabled>Выберите пол</option>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                  </select>
                </div>
              </div>

              <!-- About Section -->
              <div class="form-group">
                <label class="form-label">
                  <i class="fas fa-quote-right text-cyan-600 dark:text-cyan-400 mr-2"></i>
                  О себе
                </label>
                <textarea v-model="aboutYourself" class="form-textarea" rows="4" maxlength="300"
                  placeholder="Расскажите немного о себе..."></textarea>
                <div class="char-counter">{{ aboutYourself.length }}/300</div>
              </div>

              <!-- Social Media Links -->
              <div class="form-group">
                <label class="form-label">
                  <i class="fas fa-share-alt text-cyan-600 dark:text-cyan-400 mr-2"></i>
                  Социальные сети
                </label>
                <div class="space-y-3">
                  <div v-for="(platform, index) in socialMedia" :key="index" class="social-media-row">
                    <select v-model="platform.type" class="social-select">
                      <option value="telegram">Telegram</option>
                      <option value="vk">VK</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                    </select>
                    <input v-model="platform.url" type="text" :placeholder="'Ссылка на ' + platform.type"
                      class="social-input" />
                    <button type="button" @click="removeSocialPlatform(index)" class="remove-btn">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <button type="button" @click="addSocialPlatform" class="add-social-btn">
                  <i class="fas fa-plus mr-2"></i>
                  Добавить соц. сеть
                </button>
              </div>

              <!-- Save Button -->
              <button type="submit" class="submit-btn">
                <span class="btn-gradient"></span>
                <span class="btn-content">
                  <i class="fas fa-save mr-2"></i>
                  Сохранить изменения
                </span>
              </button>
            </form>
          </section>

          <!-- Feedback Section -->
          <section class="settings-card">
            <div class="settings-header">
              <div class="flex items-center gap-3">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-comment-dots text-cyan-600 dark:text-cyan-400"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Обратная связь</h2>
              </div>
            </div>

            <form @submit.prevent="submitFeedbackForm" class="settings-form">
              <!-- Name -->
              <div class="form-group">
                <label class="form-label">
                  <i class="fas fa-user text-cyan-600 dark:text-cyan-400 mr-2"></i>
                  Имя
                </label>
                <input v-model="feedbackForm.name" type="text" placeholder="Введите ваше имя" class="form-input" />
              </div>

              <!-- Email -->
              <div class="form-group">
                <label class="form-label">
                  <i class="fas fa-envelope text-cyan-600 dark:text-cyan-400 mr-2"></i>
                  Email
                </label>
                <input v-model="feedbackForm.email" type="email" placeholder="Введите ваш email" class="form-input" />
              </div>

              <!-- Message -->
              <div class="form-group">
                <label class="form-label">
                  <i class="fas fa-message text-pink-400 mr-2"></i>
                  Сообщение
                </label>
                <textarea v-model="feedbackForm.message" class="form-textarea" rows="4"
                  placeholder="Напишите ваш отзыв..."></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" :disabled="isSubmittingFeedback" class="submit-btn">
                <span class="btn-gradient"></span>
                <span class="btn-content">
                  <i class="fas fa-paper-plane mr-2"></i>
                  {{ isSubmittingFeedback ? "Отправка..." : "Отправить отзыв" }}
                </span>
              </button>
            </form>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Account Management -->
          <section class="settings-card">
            <div class="settings-header">
              <div class="flex items-center gap-3">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-cog text-emerald-400"></i>
                </div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                  Управление аккаунтом
                </h2>
              </div>
            </div>

            <div class="space-y-3">
              <button @click="changePassword" class="sidebar-btn">
                <i class="fas fa-key text-cyan-600 dark:text-cyan-400 mr-3"></i>
                <span>Сменить пароль</span>
                <i class="fas fa-chevron-right text-slate-600 ml-auto"></i>
              </button>
              <button @click="exportData" class="sidebar-btn">
                <i class="fas fa-download text-cyan-600 dark:text-cyan-400 mr-3"></i>
                <span>Экспорт данных</span>
                <i class="fas fa-chevron-right text-slate-600 ml-auto"></i>
              </button>
              <button @click="confirmDeleteAccount" class="sidebar-btn danger">
                <i class="fas fa-trash text-red-400 mr-3"></i>
                <span>Удалить аккаунт</span>
                <i class="fas fa-chevron-right text-slate-600 ml-auto"></i>
              </button>
            </div>
          </section>

          <!-- Support & Help -->
          <section class="settings-card">
            <div class="settings-header">
              <div class="flex items-center gap-3">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-life-ring text-orange-400"></i>
                </div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">Поддержка</h2>
              </div>
            </div>

            <div class="space-y-3">
              <NuxtLink to="/faq" class="sidebar-btn">
                <i class="fas fa-question-circle text-cyan-600 dark:text-cyan-400 mr-3"></i>
                <span>FAQ</span>
                <i class="fas fa-chevron-right text-slate-600 ml-auto"></i>
              </NuxtLink>
              <button @click="contactSupport" class="sidebar-btn">
                <i class="fas fa-headset text-cyan-600 dark:text-cyan-400 mr-3"></i>
                <span>Связаться с поддержкой</span>
                <i class="fas fa-chevron-right text-slate-600 ml-auto"></i>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Notification Component -->
    <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
      @close="hideNotification" class="z-50" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { submitContactForm } from "@/api/firebase/contact";
import {
  fetchUserData,
  updateUserData,
  deleteUserAccount,
} from "@/api/firebase/userProfile";
import { useNotification } from "@/composables/useNotification";
import Notification from "@/components/base/Notification.vue";

const router = useRouter();

const {
  notificationMessage,
  notificationType,
  notificationVisible,
  showNotification,
  hideNotification,
} = useNotification();

const db = getFirestore();

const displayName = ref("");
const profession = ref("");
const age = ref("");
const gender = ref("");
const aboutYourself = ref("");
const socialMedia = ref([{ type: "telegram", url: "" }]);
const isLoading = ref(true);

const feedbackForm = reactive({
  name: "",
  email: "",
  message: "",
});
const isSubmittingFeedback = ref(false);

onAuthStateChanged(getAuth(), async (user) => {
  if (user) {
    const userData = await fetchUserData(user.uid);

    if (userData) {
      displayName.value = userData.displayName || "";
      profession.value = userData.profession || "";
      age.value = userData.age || "";
      gender.value = userData.gender || "";
      aboutYourself.value = userData.aboutYourself || "";
      socialMedia.value = Array.isArray(userData.socialMedia)
        ? userData.socialMedia
        : [{ type: "telegram", url: "" }];
    }

    // Simulate loading delay for smooth transition
    setTimeout(() => {
      isLoading.value = false;
    }, 800);
  } else {
    router.push("/login");
  }
});

const addSocialPlatform = () => {
  socialMedia.value.push({ type: "telegram", url: "" });
};

const removeSocialPlatform = (index) => {
  socialMedia.value.splice(index, 1);
};

const saveProfile = async () => {
  const user = getAuth().currentUser;
  if (!user) {
    showNotification("Пользователь не авторизован.", "error");
    return;
  }

  const normalizedSocialMedia = socialMedia.value.map((platform) => {
    let url = platform.url.trim();
    if (platform.type === "telegram" && url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://t.me/${url.replace("@", "")}`;
      }
    }
    return { type: platform.type, url };
  });

  const data = {
    displayName: displayName.value,
    profession: profession.value,
    socialMedia: normalizedSocialMedia,
    age: age.value,
    gender: gender.value,
    aboutYourself: aboutYourself.value,
  };

  const result = await updateUserData(user.uid, data);
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

const goBackToProfile = () => {
  if (displayName.value) {
    router.push(`/profile/${displayName.value}`);
  } else {
    router.push("/profile");
  }
};

const confirmDeleteAccount = async () => {
  const confirmationMessage = `
    Вы уверены, что хотите удалить аккаунт? 
    Это действие нельзя отменить. 
    После удаления:
    - Все ваши данные будут безвозвратно удалены.
    - Вы не сможете использовать этот email для создания нового аккаунта.
    - Все ваши настройки, профиль и связанные данные будут утеряны.
  `;

  if (confirm(confirmationMessage)) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const password = prompt(
        "Для подтверждения удаления аккаунта, введите ваш пароль:"
      );

      if (password) {
        try {
          const credential = EmailAuthProvider.credential(user.email, password);
          await reauthenticateWithCredential(user, credential);

          const result = await deleteUserAccount(user.uid);

          if (result.success) {
            showNotification("Аккаунт успешно удален.", "success");
            router.push("/");
          } else {
            showNotification(
              "Ошибка при удалении аккаунта: " + result.message,
              "error"
            );
          }
        } catch (error) {
          console.error("Error during reauthentication or deletion:", error);
          showNotification(
            "Ошибка при удалении аккаунта: " + error.message,
            "error"
          );
        }
      } else {
        showNotification("Пароль не введен. Удаление отменено.", "error");
      }
    } else {
      showNotification("Пользователь не авторизован.", "error");
    }
  }
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

  isSubmittingFeedback.value = true;

  const result = await submitContactForm(db, feedbackForm);
  if (result.success) {
    showNotification(result.message, "success");
    feedbackForm.name = "";
    feedbackForm.email = "";
    feedbackForm.message = "";
  } else {
    showNotification(result.message, "error");
  }

  isSubmittingFeedback.value = false;
};

const changePassword = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    showNotification("Не удалось определить email пользователя", "error");
    return;
  }

  const confirmation = confirm(`Отправить письмо для сброса пароля на ${user.email}?`);

  if (confirmation) {
    try {
      await sendPasswordResetEmail(auth, user.email);
      showNotification("Письмо для сброса пароля отправлено! Проверьте почту.", "success");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      showNotification("Ошибка при отправке письма: " + error.message, "error");
    }
  }
};

const exportData = () => {
  showNotification("Функция экспорта данных в разработке", "info");
};
</script>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent;
}

.settings-card {
  @apply p-6 sm:p-8 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300;
}

.settings-header {
  @apply flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-cyan-500/10;
}

.settings-icon-wrapper {
  @apply w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex items-center justify-center;
}

.settings-form {
  @apply space-y-6;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center;
}

.form-input,
.form-textarea {
  @apply w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300;
}

.form-input:focus,
.form-textarea:focus {
  @apply bg-gray-200 dark:bg-slate-800/70;
}

.char-counter {
  @apply text-right text-sm text-slate-600 dark:text-slate-400;
}

.social-media-row {
  @apply flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center;
}

.social-select {
  @apply w-full sm:w-36 px-3 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all;
}

.social-input {
  @apply flex-1 px-3 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all;
}

.remove-btn {
  @apply p-2 sm:p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all;
}

.add-social-btn {
  @apply text-cyan-600 dark:text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center transition-colors mt-3;
}

.submit-btn {
  @apply relative w-full px-8 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25;
}

.submit-btn:disabled {
  @apply opacity-50 cursor-not-allowed hover:scale-100;
}

.btn-gradient {
  @apply absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-500 to-pink-500;
}

.submit-btn:hover .btn-gradient {
  @apply scale-110;
}

.btn-content {
  @apply relative z-10 text-white font-medium flex items-center justify-center;
}

.sidebar-btn {
  @apply w-full flex items-center px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800/30 border border-gray-300 dark:border-slate-700/50 text-gray-900 dark:text-white hover:border-cyan-500/30 hover:bg-gray-200 dark:hover:bg-slate-800/50 transition-all duration-300 text-left;
}

.sidebar-btn.danger {
  @apply hover:border-red-500/30 hover:bg-red-500/10;
}

@media (max-width: 640px) {
  .settings-card {
    @apply p-4;
  }

  .settings-header {
    @apply pb-4;
  }
}

/* Loading State Styles */
.loading-overlay {
  @apply fixed inset-0 bg-white dark:bg-slate-950 z-50 flex items-center justify-center;
}

.loading-container {
  @apply flex flex-col items-center gap-8;
}

.loading-spinner-wrapper {
  @apply relative w-32 h-32;
}

.spinner-ring {
  @apply absolute inset-0 rounded-full border-4 border-transparent;
  animation: spin 3s linear infinite;
}

.spinner-ring-1 {
  @apply border-t-cyan-500;
  animation-duration: 2s;
}

.spinner-ring-2 {
  @apply border-r-cyan-500;
  animation-duration: 3s;
  animation-direction: reverse;
}

.spinner-ring-3 {
  @apply border-b-pink-500;
  animation-duration: 4s;
}

.spinner-core {
  @apply absolute inset-0 flex items-center justify-center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

.loading-text {
  @apply text-center;
}

.loading-progress {
  @apply w-64 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-cyan-500 via-cyan-500 to-pink-500 rounded-full;
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% {
    width: 0%;
    margin-left: 0%;
  }

  50% {
    width: 75%;
    margin-left: 0%;
  }

  100% {
    width: 0%;
    margin-left: 100%;
  }
}
</style>
