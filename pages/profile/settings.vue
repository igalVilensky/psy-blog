<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Enhanced Gradient Orbs -->
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

    <div class="container mx-auto px-4 max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Back to Profile Button -->
      <button
        @click="goBackToProfile"
        class="group relative inline-flex items-center justify-center mb-8 px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
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
      </button>

      <!-- Profile Section -->
      <section
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 mb-8"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-6">Настройки профиля</h2>

        <!-- Bio/Description Fields -->
        <div class="mb-6">
          <label class="block text-slate-300 mb-2">О себе</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              v-model="displayName"
              type="text"
              placeholder="Отображаемое имя"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
            <input
              v-model="profession"
              type="text"
              placeholder="Профессия"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
            <input
              v-model="socialMedia"
              type="text"
              placeholder="Социальные сети"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
            <input
              v-model="age"
              type="number"
              placeholder="Возраст"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
            <select
              v-model="gender"
              class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            >
              <option value="" disabled selected>Выберите пол</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
              <option value="other">Другой</option>
            </select>
          </div>
        </div>

        <!-- Free Text Field (About Yourself) -->
        <div class="mb-6">
          <label class="block text-slate-300 mb-2"
            >О себе (до 300 символов)</label
          >
          <textarea
            v-model="aboutYourself"
            placeholder="Расскажите о себе..."
            class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            rows="4"
            maxlength="300"
          ></textarea>
          <p class="text-sm text-slate-400 mt-2">
            {{ aboutYourself.length }}/300
          </p>
        </div>

        <!-- Save Button with Cool Hover Effect -->
        <button
          @click="saveProfile"
          class="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
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
      </section>

      <!-- Account Deletion Section -->
      <section
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 mb-8"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-6">
          Управление аккаунтом
        </h2>
        <button
          @click="confirmDeleteAccount"
          class="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#F59E0B]/20"
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] group-hover:translate-x-0 ease"
          >
            <i class="fas fa-trash"></i>
          </span>
          <span
            class="absolute flex items-center justify-center w-full h-full text-[#F59E0B] transition-all duration-300 transform group-hover:translate-x-full ease"
          >
            <i class="fas fa-trash mr-2"></i>
            Удалить аккаунт
          </span>
          <span class="relative invisible">Удалить аккаунт</span>
        </button>
      </section>

      <!-- FAQ Section -->
      <section
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 mb-8"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-6">FAQ</h2>
        <p class="text-slate-300 mb-4">
          Есть вопросы? Посетите нашу
          <a href="/faq" class="text-[#0EA5E9] hover:underline">страницу FAQ</a
          >.
        </p>
      </section>

      <!-- Contact Support Section -->
      <section
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 mb-8"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-6">
          Связаться с поддержкой
        </h2>
        <button
          @click="contactSupport"
          class="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
          >
            <i class="fas fa-headset"></i>
          </span>
          <span
            class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
          >
            <i class="fas fa-headset mr-2"></i>
            Связаться с поддержкой
          </span>
          <span class="relative invisible">Связаться с поддержкой</span>
        </button>
      </section>

      <!-- Feedback Section -->
      <section
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8"
      >
        <h2 class="text-2xl font-bold text-white/90 mb-6">Обратная связь</h2>
        <textarea
          v-model="feedback"
          placeholder="Поделитесь своим мнением..."
          class="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#0EA5E9]/20 text-white placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] mb-4"
          rows="4"
        ></textarea>
        <button
          @click="submitFeedback"
          class="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20"
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
          >
            <i class="fas fa-comment-dots"></i>
          </span>
          <span
            class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
          >
            <i class="fas fa-comment-dots mr-2"></i>
            Отправить отзыв
          </span>
          <span class="relative invisible">Отправить отзыв</span>
        </button>
      </section>
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
const socialMedia = ref("");
const age = ref("");
const gender = ref("");
const aboutYourself = ref("");

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
      socialMedia.value = userData.socialMedia || "";
      age.value = userData.age || "";
      gender.value = userData.gender || "";
      aboutYourself.value = userData.aboutYourself || "";
    }
  }
});

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
    socialMedia: socialMedia.value,
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
  // alert("Перенаправление в поддержку...");
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

<style scoped>
@keyframes slow-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-200px, 300px);
  }
}

@keyframes slow-pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slow-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
}

.animate-slow-drift {
  animation: slow-drift 15s ease-in-out infinite;
}

.animate-slow-pulse {
  animation: slow-pulse 12s ease-in-out infinite;
}

.animate-slow-float {
  animation: slow-float 15s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1f35;
}

::-webkit-scrollbar-thumb {
  background: #0ea5e9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #22d3ee;
}
</style>
