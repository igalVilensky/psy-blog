<template>
  <div
    class="relative min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-500 flex flex-col font-sans">
    <!-- Mobile Header -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white z-40 px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-stone-900 dark:bg-white flex items-center justify-center">
          <i class="fas fa-sliders-h text-white dark:text-stone-900 text-xs"></i>
        </div>
        <span class="font-bold text-stone-900 dark:text-white text-sm">Настройки</span>
      </div>
      <NuxtLink to="/profile" class="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white">
        <i class="fas fa-arrow-left text-sm"></i>
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex min-w-0 pt-14 lg:pt-0">
      <!-- Desktop Sidebar -->
      <div
        class="hidden lg:block w-64 flex-none bg-white dark:bg-stone-900 border-r-2 border-stone-900 dark:border-white">
        <div class="p-6 border-b-2 border-stone-900 dark:border-white">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-stone-900 dark:bg-white flex items-center justify-center">
              <i class="fas fa-sliders-h text-white dark:text-stone-900 text-sm"></i>
            </div>
            <span class="font-bold text-stone-900 dark:text-white">Настройки</span>
          </div>
          <NuxtLink to="/profile"
            class="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            <i class="fas fa-arrow-left text-xs"></i>
            <span>Вернуться в профиль</span>
          </NuxtLink>
        </div>

        <nav class="p-4 space-y-2">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="w-full text-left px-4 py-3 text-sm font-semibold transition-all" :class="activeTab === tab.id
              ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'">
            <div class="flex items-center gap-3">
              <i :class="tab.icon"></i>
              <span>{{ tab.label }}</span>
            </div>
          </button>
        </nav>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto">
        <!-- Desktop Header -->
        <header
          class="hidden lg:flex h-16 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h2 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wide">
              {{ activeTabLabel }}
            </h2>
          </div>
          <div class="flex items-center gap-4">
            <div class="font-mono text-xs text-stone-500 dark:text-stone-400">
              {{ currentTime }}
            </div>
          </div>
        </header>

        <div class="p-6 lg:p-8 space-y-8">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex items-center justify-center py-32">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-stone-900 dark:border-white"></div>
          </div>

          <!-- Profile Tab -->
          <div v-else-if="activeTab === 'profile'" class="space-y-8">
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Профиль</span>
                  </div>
                  <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
                    Персональные данные
                  </h1>
                </div>
              </div>
            </div>

            <form @submit.prevent="saveProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    class="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                    Имя пользователя *
                  </label>
                  <input v-model="displayName" type="text" required placeholder="Как вас называть?"
                    class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors" />
                </div>

                <div>
                  <label
                    class="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                    Сфера деятельности
                  </label>
                  <input v-model="profession" type="text" placeholder="Ваша профессия"
                    class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors" />
                </div>

                <div>
                  <label
                    class="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                    Возраст
                  </label>
                  <input v-model="age" type="number" min="13" max="120" placeholder="Ваш возраст"
                    class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors" />
                </div>

                <div>
                  <label
                    class="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                    Пол
                  </label>
                  <select v-model="gender"
                    class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors">
                    <option value="" disabled>Не выбран</option>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  class="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                  Расскажите о себе
                </label>
                <textarea v-model="aboutYourself" rows="4" maxlength="300"
                  placeholder="Несколько слов о ваших интересах или целях..."
                  class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors resize-none"></textarea>
                <div class="text-right text-xs text-stone-500 dark:text-stone-400 mt-2">
                  {{ aboutYourself.length }} / 300 симв.
                </div>
              </div>

              <div>
                <label
                  class="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">
                  Социальные сети
                </label>
                <div class="space-y-4">
                  <div v-for="(platform, index) in socialMedia" :key="index" class="flex gap-4 items-center">
                    <select v-model="platform.type"
                      class="w-32 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors">
                      <option value="telegram">Telegram</option>
                      <option value="vk">VK</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                    </select>
                    <input v-model="platform.url" type="text"
                      :placeholder="platform.type === 'telegram' ? '@username' : 'https://...'"
                      class="flex-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors" />
                    <button type="button" @click="removeSocialPlatform(index)"
                      class="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-red-500">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <button type="button" @click="addSocialPlatform"
                  class="mt-4 px-4 py-2 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                  <i class="fas fa-plus mr-2"></i>
                  Добавить профиль
                </button>
              </div>

              <button type="submit"
                class="px-8 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
                Сохранить изменения
              </button>
            </form>
          </div>

          <!-- Account Tab -->
          <div v-else-if="activeTab === 'account'" class="space-y-8">
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Аккаунт</span>
                  </div>
                  <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
                    Управление аккаунтом
                  </h1>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Security -->
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Безопасность</h3>
                <div class="space-y-4">
                  <button @click="changePassword"
                    class="w-full flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                    <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Сбросить пароль</span>
                    <i class="fas fa-chevron-right text-stone-400"></i>
                  </button>
                  <button @click="exportData"
                    class="w-full flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                    <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Экспорт данных</span>
                    <i class="fas fa-chevron-right text-stone-400"></i>
                  </button>
                </div>
              </div>

              <!-- Danger Zone -->
              <div class="bg-white dark:bg-stone-900 border border-red-200 dark:border-red-800/30 p-6">
                <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Опасная зона</h3>
                <button @click="confirmDeleteAccount"
                  class="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors border border-red-200 dark:border-red-700">
                  <span class="text-sm font-semibold text-red-700 dark:text-red-300">Удалить аккаунт</span>
                  <i class="fas fa-chevron-right text-red-400"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Coach Tab -->
          <div v-else-if="activeTab === 'coach'" class="space-y-8">
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Профессиональный
                      доступ</span>
                  </div>
                  <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
                    Панель коуча
                  </h1>
                </div>
              </div>
            </div>

            <div v-if="!isCoach" class="bg-white dark:bg-stone-900 border-l-4 border-indigo-600 p-6">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <i class="fas fa-user-tie text-indigo-600 dark:text-indigo-400"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-stone-900 dark:text-white">Стать Коучем</h3>
                  <p class="text-sm text-stone-600 dark:text-stone-400 mt-1">Активируйте профессиональные инструменты
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  <i class="fas fa-users-cog text-indigo-600 mb-2"></i>
                  <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    Управление клиентами
                  </div>
                </div>
                <div class="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  <i class="fas fa-chart-line text-indigo-600 mb-2"></i>
                  <div class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    Глубокая аналитика
                  </div>
                </div>
              </div>

              <button @click="becomeACoach"
                class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all">
                Активировать панель коуча
              </button>
            </div>

            <div v-else class="bg-white dark:bg-stone-900 border-l-4 border-emerald-600 p-6">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <i class="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-stone-900 dark:text-white">Вы — Коуч</h3>
                  <p class="text-sm text-stone-600 dark:text-stone-400 mt-1">Профессиональный аккаунт активен</p>
                </div>
              </div>

              <NuxtLink to="/coach"
                class="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all">
                <i class="fas fa-rocket"></i>
                Перейти в панель
              </NuxtLink>
            </div>
          </div>

          <!-- Support Tab -->
          <div v-else-if="activeTab === 'support'" class="space-y-8">
            <div class="border-b border-stone-200 dark:border-stone-800 pb-6">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-1 h-4 bg-stone-900 dark:bg-white"></div>
                    <span
                      class="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Поддержка</span>
                  </div>
                  <h1 class="text-3xl font-bold text-stone-900 dark:text-white">
                    Помощь и обратная связь
                  </h1>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Resources -->
              <div class="space-y-6">
                <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Ресурсы</h3>
                  <div class="space-y-4">
                    <NuxtLink to="/faq"
                      class="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                      <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Частые вопросы</span>
                      <i class="fas fa-chevron-right text-stone-400"></i>
                    </NuxtLink>
                    <button @click="contactSupport"
                      class="w-full flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-100 dark:border-stone-700">
                      <span class="text-sm font-semibold text-stone-700 dark:text-stone-300">Связаться с
                        поддержкой</span>
                      <i class="fas fa-chevron-right text-stone-400"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Feedback -->
              <div class="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6">
                <h3 class="text-lg font-bold text-stone-900 dark:text-white mb-4">Обратная связь</h3>
                <form @submit.prevent="submitFeedbackForm" class="space-y-4">
                  <div>
                    <textarea v-model="feedbackForm.message" rows="4" placeholder="Ваши идеи или предложения..."
                      class="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" :disabled="isSubmittingFeedback"
                    class="w-full py-3 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold transition-all disabled:opacity-50">
                    {{ isSubmittingFeedback ? 'Отправка...' : 'Отправить отзыв' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Notification Component -->
    <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
      @close="hideNotification" class="z-50" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
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

// State
const displayName = ref("");
const profession = ref("");
const age = ref("");
const gender = ref("");
const isCoach = ref(false);
const aboutYourself = ref("");
const socialMedia = ref([{ type: "telegram", url: "" }]);
const isLoading = ref(true);
const currentTime = ref("");
const activeTab = ref("profile");

const feedbackForm = reactive({
  name: "",
  email: "",
  message: "",
});
const isSubmittingFeedback = ref(false);

const tabs = [
  { id: 'profile', label: 'Профиль', icon: 'fas fa-user-edit' },
  { id: 'account', label: 'Аккаунт', icon: 'fas fa-shield-alt' },
  { id: 'coach', label: 'Коуч', icon: 'fas fa-user-tie' },
  { id: 'support', label: 'Поддержка', icon: 'fas fa-life-ring' },
];

const activeTabLabel = computed(() => {
  return tabs.find(tab => tab.id === activeTab.value)?.label || 'Настройки';
});

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTime.value = `${hours}:${minutes}:${seconds}`;
};

let timeInterval;

onAuthStateChanged(getAuth(), async (user) => {
  if (user) {
    const userData = await fetchUserData(user.uid);

    if (userData) {
      displayName.value = userData.displayName || "";
      profession.value = userData.profession || "";
      age.value = userData.age || "";
      gender.value = userData.gender || "";
      aboutYourself.value = userData.aboutYourself || "";
      isCoach.value = userData.role === "coach";
      socialMedia.value = Array.isArray(userData.socialMedia)
        ? userData.socialMedia
        : [{ type: "telegram", url: "" }];

      feedbackForm.name = displayName.value;
      feedbackForm.email = user.email;
    }

    setTimeout(() => {
      isLoading.value = false;
    }, 300);
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
  } else {
    showNotification(
      "Ошибка при сохранении: " + result.message,
      "error"
    );
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
              "Ошибка при удалении: " + result.message,
              "error"
            );
          }
        } catch (error) {
          console.error("Error during reauthentication or deletion:", error);
          showNotification(
            "Ошибка при удалении: " + error.message,
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
      showNotification("Ошибка при отправке: " + error.message, "error");
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
    } else {
      showNotification("Ошибка: " + result.message, "error");
    }
  }
};

const exportData = () => {
  showNotification("Функция экспорта данных в разработке", "info");
};

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>