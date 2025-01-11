<template>
  <div class="relative min-h-screen">
    <!-- Animated Background - Keeping the original stunning effect -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift opacity-60"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse opacity-40"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float opacity-50"
        ></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 max-w-6xl relative z-10 py-8">
      <!-- Navigation Bar -->
      <nav
        class="flex items-center justify-between mb-8 bg-gradient-to-r from-[#1A1F35]/60 to-[#1E293B]/60 backdrop-blur-xl rounded-lg border border-[#0EA5E9]/20 p-4"
      >
        <NuxtLink
          to="/profile"
          class="group relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
          >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span
            class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Назад в профиль
          </span>
          <span class="relative invisible">Назад в профиль</span>
        </NuxtLink>

        <div class="text-white/90 font-semibold">Настройки аккаунта</div>
      </nav>

      <!-- Settings Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Settings Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Settings -->
          <section
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white/90">
                Настройки профиля
              </h2>
              <span class="text-sm text-slate-400">* Обязательные поля</span>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="saveProfile" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Отображаемое имя *</label
                  >
                  <input
                    v-model="displayName"
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Профессия</label
                  >
                  <input
                    v-model="profession"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Возраст</label
                  >
                  <input
                    v-model="age"
                    type="number"
                    min="13"
                    max="120"
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-slate-300"
                    >Пол</label
                  >
                  <select
                    v-model="gender"
                    class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  >
                    <option value="" disabled>Выберите пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                    <option value="other">Другой</option>
                  </select>
                </div>
              </div>

              <!-- About Section -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300"
                  >О себе</label
                >
                <textarea
                  v-model="aboutYourself"
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  rows="4"
                  maxlength="300"
                  placeholder="Расскажите немного о себе..."
                ></textarea>
                <div class="flex justify-end">
                  <span class="text-sm text-slate-400"
                    >{{ aboutYourself.length }}/300</span
                  >
                </div>
              </div>

              <!-- Social Media Links -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300"
                  >Социальные сети</label
                >
                <div class="space-y-4">
                  <div
                    v-for="(platform, index) in socialMedia"
                    :key="index"
                    class="flex gap-4"
                  >
                    <select
                      v-model="platform.type"
                      class="w-1/4 px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
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
                      class="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                    />
                    <button
                      type="button"
                      @click="removeSocialPlatform(index)"
                      class="text-red-500 hover:text-red-600"
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
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Account Management -->
          <section
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8"
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

          <!-- Support & Help -->
          <section
            class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Import useRouter for navigation
import { getAuth } from "firebase/auth";
import { fetchUserData, updateUserData } from "@/api/firebase/userProfile";

// Initialize router
const router = useRouter();

// Bio/Description Fields
const displayName = ref("");
const profession = ref("");
const age = ref("");
const gender = ref("");
const aboutYourself = ref("");
// Social Media
const socialMedia = ref([{ type: "telegram", url: "" }]); // Initialize with one platform
// Feedback
const feedback = ref("");

// Fetch user data on component mount
onMounted(async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userData = await fetchUserData(user.uid);
    if (userData) {
      displayName.value = userData.displayName || "";
      profession.value = userData.profession || "";
      age.value = userData.age || "";
      gender.value = userData.gender || "";
      aboutYourself.value = userData.aboutYourself || "";
      // Ensure socialMedia is an array of objects
      socialMedia.value = Array.isArray(userData.socialMedia)
        ? userData.socialMedia
        : [{ type: "telegram", url: "" }];
    }
  }
});

// Add a new social platform
const addSocialPlatform = () => {
  socialMedia.value.push({ type: "telegram", url: "" });
};

// Remove a social platform
const removeSocialPlatform = (index) => {
  socialMedia.value.splice(index, 1);
};

// Save Profile
const saveProfile = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Пользователь не авторизован.");
    return;
  }

  const data = {
    displayName: displayName.value,
    profession: profession.value,
    socialMedia: socialMedia.value, // Ensure this is an array of objects
    age: age.value,
    gender: gender.value,
    aboutYourself: aboutYourself.value,
  };

  const result = await updateUserData(user.uid, data);
  if (result.success) {
    alert("Изменения сохранены!");
    goBackToProfile(); // Redirect back to profile after saving
  } else {
    alert("Ошибка при сохранении изменений: " + result.message);
  }
};

// Redirect back to profile
const goBackToProfile = () => {
  if (displayName.value) {
    router.push(`/profile/${displayName.value}`); // Redirect to [username].vue
  } else {
    router.push("/profile"); // Fallback if displayName is not set
  }
};

// Account Deletion
const confirmDeleteAccount = () => {
  if (
    confirm(
      "Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить."
    )
  ) {
    alert("Аккаунт удален.");
    // Add backend logic here to delete the account
  }
};

// Contact Support
const contactSupport = () => {
  router.push("/contact"); // Redirect to the /contact route
};

// Submit Feedback
const submitFeedback = () => {
  if (feedback.value.trim() === "") {
    alert("Пожалуйста, введите ваш отзыв перед отправкой.");
    return;
  }

  alert("Спасибо за ваш отзыв!");
  feedback.value = "";
};
</script>
