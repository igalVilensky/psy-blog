<template>
  <div
    class="relative min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-500 flex flex-col font-sans">
    <TopBar />
    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center py-20">
      <div class="loading-container">
        <div class="mb-12 relative inline-block">
          <div class="w-24 h-24 border-[3px] border-stone-200 dark:border-stone-700 relative">
            <div
              class="absolute inset-0 border-[3px] border-t-stone-900 dark:border-t-white animate-spin duration-[1.5s]">
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <i class="fas fa-cog text-stone-300 dark:text-stone-600 text-2xl animate-pulse"></i>
          </div>
        </div>
        <div class="loading-text">
          <h3 class="text-2xl font-bold text-stone-900 dark:text-white mb-3 uppercase tracking-widest">Настройки</h3>
          <p class="text-stone-600 dark:text-stone-400 font-medium uppercase tracking-wide text-xs">Персонализация
            вашего опыта...</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-6 py-8 w-full">
      <!-- Page Header -->
      <div class="mb-12">
        <NuxtLink to="/profile"
          class="inline-flex items-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all duration-300 mb-6 group">
          <i class="fas fa-arrow-left mr-3 transform transition-transform group-hover:-translate-x-1 text-xs"></i>
          <span class="text-xs uppercase tracking-[0.2em] font-bold">Вернуться в профиль</span>
        </NuxtLink>
        <h1 class="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4 uppercase tracking-tight">
          Настройки профиля
        </h1>
        <p class="text-stone-600 dark:text-stone-400 font-medium uppercase tracking-wide text-sm">
          Управление персональной информацией и параметрами аккаунта
        </p>
      </div>

      <!-- Settings Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Main Settings Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Settings -->
          <section class="settings-card border-l-4 border-l-stone-900 dark:border-l-white">
            <div class="settings-header">
              <div class="flex items-center gap-4">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-user-edit text-stone-900 dark:text-white opacity-60"></i>
                </div>
                <h2 class="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">Персональные
                  данные</h2>
              </div>
              <span class="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Поля со звездочкой
                обязательны</span>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="saveProfile" class="settings-form">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Display Name -->
                <div class="form-group">
                  <label class="form-label">
                    Имя пользователя *
                  </label>
                  <input v-model="displayName" type="text" required placeholder="Как вас называть?"
                    class="form-input" />
                </div>

                <!-- Profession -->
                <div class="form-group">
                  <label class="form-label">
                    Сфера деятельности
                  </label>
                  <input v-model="profession" type="text" placeholder="Ваша профессия" class="form-input" />
                </div>

                <!-- Age -->
                <div class="form-group">
                  <label class="form-label">
                    Возраст
                  </label>
                  <input v-model="age" type="number" min="13" max="120" placeholder="Ваш возраст" class="form-input" />
                </div>

                <!-- Gender -->
                <div class="form-group">
                  <label class="form-label">
                    Пол
                  </label>
                  <select v-model="gender" class="form-input">
                    <option value="" disabled>Не выбран</option>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                  </select>
                </div>
              </div>

              <!-- About Section -->
              <div class="form-group">
                <label class="form-label">
                  Расскажите о себе
                </label>
                <textarea v-model="aboutYourself" class="form-textarea" rows="4" maxlength="300"
                  placeholder="Несколько слов о ваших интересах или целях..."></textarea>
                <div class="char-counter">{{ aboutYourself.length }} / 300 симв.</div>
              </div>

              <!-- Social Media Links -->
              <div class="form-group">
                <label class="form-label">
                  Ссылки на профили
                </label>
                <div class="space-y-4">
                  <div v-for="(platform, index) in socialMedia" :key="index" class="social-media-row">
                    <select v-model="platform.type" class="social-select">
                      <option value="telegram">Telegram</option>
                      <option value="vk">VK</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                    </select>
                    <input v-model="platform.url" type="text"
                      :placeholder="platform.type === 'telegram' ? '@username' : 'https://...'" class="social-input" />
                    <button type="button" @click="removeSocialPlatform(index)" class="remove-btn">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <button type="button" @click="addSocialPlatform" class="add-social-btn">
                  <i class="fas fa-plus mr-3 text-xs"></i>
                  <span>Добавить профиль</span>
                </button>
              </div>

              <!-- Save Button -->
              <div class="pt-6">
                <button type="submit"
                  class="submit-btn bg-stone-900 text-white dark:bg-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 border border-stone-900 dark:border-white uppercase tracking-widest text-xs font-bold">
                  <i class="fas fa-save mr-3"></i>
                  Сохранить изменения
                </button>
              </div>
            </form>
          </section>
        </div>

        <div class="space-y-6">
          <!-- Coach Role Section -->
          <section v-if="!isCoach" class="settings-card bg-stone-50 dark:bg-stone-900 border-l-4 border-l-indigo-600">
            <div class="settings-header">
              <div class="flex items-center gap-4">
                <div class="settings-icon-wrapper bg-white dark:bg-stone-800">
                  <i class="fas fa-user-tie text-indigo-600"></i>
                </div>
                <h2 class="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">Стать Коучем
                </h2>
              </div>
            </div>

            <div class="space-y-6">
              <p class="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                Вы можете получить доступ к профессиональным инструментам для управления клиентами, мониторинга их
                прогресса и ведения базы в единой панели.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <div
                  class="flex items-start gap-3 p-4 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  <i class="fas fa-users-cog text-indigo-600 mt-1"></i>
                  <div class="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
                    Управление клиентами
                  </div>
                </div>
                <div
                  class="flex items-start gap-3 p-4 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  <i class="fas fa-chart-line text-indigo-600 mt-1"></i>
                  <div class="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
                    Глубокая аналитика</div>
                </div>
              </div>

              <button @click="becomeACoach"
                class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest text-xs transition-all">
                Активировать панель коуча
              </button>
            </div>
          </section>

          <section v-else class="settings-card border-emerald-100 dark:border-emerald-800/30">
            <div class="settings-header">
              <div class="flex items-center gap-4">
                <div class="settings-icon-wrapper bg-emerald-50 dark:bg-emerald-900/20">
                  <i class="fas fa-check-circle text-emerald-500"></i>
                </div>
                <h2 class="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">Вы — Коуч</h2>
              </div>
            </div>
            <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-medium">
              Ваш профессиональный аккаунт активен. Вы можете перейти в панель управления клиентами.
            </p>
            <div class="mt-8">
              <NuxtLink to="/coach" class="submit-btn !bg-emerald-500 flex items-center justify-center gap-3">
                <i class="fas fa-rocket"></i>
                ПЕРЕЙТИ В ПАНЕЛЬ
              </NuxtLink>
            </div>
          </section>

          <!-- Account Management -->
          <section class="settings-card">
            <div class="settings-header">
              <div class="flex items-center gap-4">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-shield-alt text-stone-900 dark:text-white opacity-60"></i>
                </div>
                <h2 class="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                  Безопасность
                </h2>
              </div>
            </div>

            <div class="space-y-4">
              <button @click="changePassword" class="sidebar-btn">
                <i class="fas fa-key text-stone-400 dark:text-stone-600 mr-4 text-xs"></i>
                <span class="text-xs uppercase tracking-widest font-bold">Сбросить пароль</span>
                <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 ml-auto text-[10px]"></i>
              </button>
              <button @click="exportData" class="sidebar-btn">
                <i class="fas fa-download text-stone-400 dark:text-stone-600 mr-4 text-xs"></i>
                <span class="text-xs uppercase tracking-widest font-bold">Экспорт данных</span>
                <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 ml-auto text-[10px]"></i>
              </button>
              <button @click="confirmDeleteAccount" class="sidebar-btn danger">
                <i class="fas fa-trash text-red-400/70 mr-4 text-xs"></i>
                <span class="text-xs uppercase tracking-widest font-bold text-red-500/80">Удалить аккаунт</span>
                <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 ml-auto text-[10px]"></i>
              </button>
            </div>
          </section>

          <!-- Support & Help -->
          <section class="settings-card">
            <div class="settings-header">
              <div class="flex items-center gap-4">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-life-ring text-stone-900 dark:text-white opacity-60"></i>
                </div>
                <h2 class="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-tight">Помощь</h2>
              </div>
            </div>

            <div class="space-y-4">
              <NuxtLink to="/faq" class="sidebar-btn">
                <i class="fas fa-question-circle text-stone-400 dark:text-stone-600 mr-4 text-xs"></i>
                <span class="text-xs uppercase tracking-widest font-bold">Частые вопросы</span>
                <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 ml-auto text-[10px]"></i>
              </NuxtLink>
              <button @click="contactSupport" class="sidebar-btn">
                <i class="fas fa-headset text-stone-400 dark:text-stone-600 mr-4 text-xs"></i>
                <span class="text-xs uppercase tracking-widest font-bold">Поддержка</span>
                <i class="fas fa-chevron-right text-stone-300 dark:text-stone-700 ml-auto text-[10px]"></i>
              </button>
            </div>
          </section>

          <!-- Feedback Section -->
          <section class="settings-card">
            <div class="settings-header">
              <div class="flex items-center gap-4">
                <div class="settings-icon-wrapper">
                  <i class="fas fa-comment-dots text-stone-900 dark:text-white opacity-60"></i>
                </div>
                <h2 class="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">Отзыв</h2>
              </div>
            </div>

            <form @submit.prevent="submitFeedbackForm" class="settings-form !space-y-6">
              <div class="form-group">
                <input v-model="feedbackForm.message" type="text" placeholder="Ваши идеи или предложения..."
                  class="form-input" />
              </div>
              <button type="submit" :disabled="isSubmittingFeedback" class="sidebar-btn justify-center text-center">
                <span class="text-xs uppercase tracking-widest font-bold">
                  {{ isSubmittingFeedback ? "Отправка..." : "Отправить" }}
                </span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>

    <!-- Notification Component -->
    <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
      @close="hideNotification" class="z-50" />
    <Footer />
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
import TopBar from "~/components/navigation/TopBar.vue";
import Footer from "~/components/ui/Footer.vue";

definePageMeta({
  layout: "empty",
});

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
const role = ref("");
const isCoach = ref(false);
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
      role.value = userData.role || "";
      isCoach.value = userData.role === "coach";
      socialMedia.value = Array.isArray(userData.socialMedia)
        ? userData.socialMedia
        : [{ type: "telegram", url: "" }];

      // Pre-fill feedback form slightly
      feedbackForm.name = displayName.value;
      feedbackForm.email = user.email;
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
    const formattedUsername = displayName.value.replace(/\s/g, "-");
    router.push(`/profile/${formattedUsername}`);
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
    // Don't clear message immediately in case they want to send similar? No, clear is better.
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

const becomeACoach = async () => {
  const user = getAuth().currentUser;
  if (!user) {
    showNotification("Пользователь не авторизован.", "error");
    return;
  }

  const confirmation = confirm("Вы хотите активировать профессиональную панель коуча?");
  if (confirmation) {
    const result = await updateUserData(user.uid, { role: 'coach' });
    if (result.success) {
      showNotification("Поздравляем! Теперь вы коуч.", "success");
      isCoach.value = true;
      // Also potentially refresh auth store if needed
    } else {
      showNotification("Ошибка: " + result.message, "error");
    }
  }
};

const exportData = () => {
  showNotification("Функция экспорта данных в разработке", "info");
};
</script>

<style lang="postcss" scoped>
.settings-card {
  @apply p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between mb-6 border-l-4;
}

.settings-header {
  @apply flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-6 border-b border-stone-100 dark:border-stone-800/30;
}

.settings-icon-wrapper {
  @apply w-12 h-12 bg-stone-100 dark:bg-stone-800 flex items-center justify-center;
}

.settings-form {
  @apply space-y-8;
}

.form-group {
  @apply space-y-3;
}

.form-label {
  @apply block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-500;
}

.form-input,
.form-textarea,
.social-input,
.social-select {
  @apply w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-4 py-3 text-sm text-stone-900 dark:text-white focus:ring-1 focus:ring-stone-900 dark:focus:ring-white focus:border-stone-900 dark:focus:border-white transition-all outline-none rounded-none;
}

.form-textarea {
  @apply resize-none;
}

.char-counter {
  @apply text-right text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-2;
}

.social-media-row {
  @apply flex flex-wrap sm:flex-nowrap gap-4 items-center;
}

.social-select {
  @apply sm:w-44 px-4 py-3 text-sm;
}

.social-input {
  @apply flex-1 px-4 py-3 rounded-2xl bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100 dark:border-stone-800/50 text-stone-900 dark:text-white placeholder-stone-300 dark:placeholder-stone-600 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-all font-medium;
}

.remove-btn {
  @apply w-10 h-10 flex items-center justify-center text-stone-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all text-sm;
}

.add-social-btn {
  @apply text-stone-400 hover:text-stone-900 dark:hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center transition-all mt-6;
}

.submit-btn {
  @apply w-full px-10 py-5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-stone-900/10;
}

.submit-btn:disabled {
  @apply opacity-50 grayscale cursor-not-allowed;
}

.sidebar-btn {
  @apply w-full flex items-center px-6 py-4 rounded-2xl bg-stone-50/30 dark:bg-stone-800/10 border border-stone-100 dark:border-stone-800/50 text-stone-600 dark:text-stone-400 hover:border-stone-200 dark:hover:border-stone-700 hover:bg-white dark:hover:bg-stone-800/30 transition-all duration-300 text-left;
}

.sidebar-btn.danger {
  @apply hover:border-red-400/30 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-400;
}

.loading-container {
  @apply flex flex-col items-center text-center;
}

@media (max-width: 640px) {
  .settings-card {
    @apply p-8 rounded-[2rem];
  }

  .settings-header {
    @apply mb-8 pb-6;
  }
}
</style>
