<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              СВЯЖИТЕСЬ С НАМИ
            </h1>
            <p class="text-slate-600 dark:text-cyan-300/70 text-sm sm:text-base leading-relaxed max-w-2xl">
              Мы всегда готовы ответить на ваши вопросы и помочь вам. Свяжитесь с нами любым удобным способом.
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-4">
            <div class="stat-card">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">24/7</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Поддержка
              </div>
            </div>
            <div class="stat-card">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">&lt;1ч</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Ответ
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information and Form Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <!-- Contact Details Card -->
        <div class="contact-card">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Контактная информация</h2>

          <div class="space-y-6">
            <!-- Email -->
            <div class="contact-item">
              <div class="contact-icon-wrapper bg-cyan-500/10 dark:bg-cyan-500/20">
                <i class="fas fa-envelope text-cyan-600 dark:text-cyan-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Email</div>
                <a href="mailto:vilenskyigal@gmail.com"
                  class="text-slate-700 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 font-medium">
                  vilenskyigal@gmail.com
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="contact-item">
              <div class="contact-icon-wrapper bg-purple-500/10 dark:bg-purple-500/20">
                <i class="fas fa-phone text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
              <div class="flex-1">
                <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Телефон</div>
                <a href="tel:+491783099433"
                  class="text-slate-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 font-medium">
                  +49 178 3099433
                </a>
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="pt-8 border-t border-slate-200 dark:border-slate-700/50 mt-8">
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">
              Социальные сети
            </h3>
            <div class="flex flex-wrap gap-3">
              <!-- Telegram -->
              <a href="https://web.telegram.org/a/#984171843" target="_blank" rel="noopener noreferrer"
                class="social-btn social-btn-cyan">
                <i class="fab fa-telegram"></i>
              </a>

              <!-- Instagram -->
              <a href="https://www.instagram.com/galactik.anastasia/" target="_blank" rel="noopener noreferrer"
                class="social-btn social-btn-purple">
                <i class="fab fa-instagram"></i>
              </a>

              <!-- WhatsApp -->
              <a href="https://wa.me/491783099433" target="_blank" rel="noopener noreferrer"
                class="social-btn social-btn-emerald">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="contact-card">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Напишите нам
          </h3>
          <form @submit.prevent="submitForm" class="space-y-5">
            <!-- Name Input -->
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Ваше имя
              </label>
              <input v-model="formData.name" type="text" id="name" class="form-input" placeholder="Введите ваше имя"
                required />
            </div>

            <!-- Email Input -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input v-model="formData.email" type="email" id="email" class="form-input" placeholder="your@email.com"
                required />
            </div>

            <!-- Message Input -->
            <div class="space-y-2">
              <label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Сообщение
              </label>
              <textarea v-model="formData.message" id="message" rows="4" class="form-input"
                placeholder="Ваше сообщение..." required></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="isSubmitting" class="btn-primary w-full">
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-paper-plane mr-2"></i>
              {{ isSubmitting ? "Отправка..." : "Отправить сообщение" }}
            </button>
          </form>
        </div>
      </div>

      <!-- Newsletter Subscription -->
      <div class="newsletter-card">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div class="flex-shrink-0">
            <div
              class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <i class="fas fa-envelope-open-text text-white text-2xl"></i>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Подписаться на рассылку
            </h3>
            <p class="text-slate-600 dark:text-slate-300 text-sm mb-4">
              Получайте последние новости, статьи и обновления прямо на вашу почту
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <input type="email" v-model="subscribeEmail" placeholder="Введите ваш email" class="form-input flex-1" />
              <button @click="subscribe" class="btn-secondary whitespace-nowrap">
                <i class="fas fa-bell mr-2"></i>
                Подписаться
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Response Time -->
        <div class="info-card">
          <div class="info-icon-wrapper bg-cyan-500/10 dark:bg-cyan-500/20">
            <i class="fas fa-clock text-cyan-600 dark:text-cyan-400 text-2xl"></i>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Быстрый ответ
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Мы отвечаем на все запросы в течение одного часа
          </p>
        </div>

        <!-- Support -->
        <div class="info-card">
          <div class="info-icon-wrapper bg-purple-500/10 dark:bg-purple-500/20">
            <i class="fas fa-headset text-purple-600 dark:text-purple-400 text-2xl"></i>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Поддержка 24/7
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Наша команда всегда готова помочь вам в любое время
          </p>
        </div>

        <!-- Privacy -->
        <div class="info-card">
          <div class="info-icon-wrapper bg-emerald-500/10 dark:bg-emerald-500/20">
            <i class="fas fa-shield-alt text-emerald-600 dark:text-emerald-400 text-2xl"></i>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Конфиденциальность
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Ваши данные защищены и никогда не будут переданы третьим лицам
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getFirestore } from "firebase/firestore";
import { submitContactForm, subscribeUser } from "../api/firebase/contact";

// SEO Meta Tags
useHead({
  title: "Свяжитесь с нами",
  meta: [
    {
      name: "description",
      content:
        "Свяжитесь с командой MindQ Lab. Мы всегда готовы ответить на ваши вопросы и помочь вам.",
    },
    {
      property: "og:title",
      content: "Свяжитесь с нами | MindQ Lab",
    },
    {
      property: "og:description",
      content:
        "Свяжитесь с командой MindQ Lab. Мы всегда готовы ответить на ваши вопросы и помочь вам.",
    },
    {
      property: "og:image",
      content: "/images/contact-og.jpg",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});

// Firestore initialization
const db = getFirestore();

// Reactive form data
const formData = reactive({
  name: "",
  email: "",
  message: "",
});
const isSubmitting = ref(false);
const subscribeEmail = ref("");

// Form submission logic
const submitForm = async () => {
  isSubmitting.value = true;
  const result = await submitContactForm(db, formData);
  if (result.success) {
    alert(result.message);
    // Clear form data after successful submission
    formData.name = "";
    formData.email = "";
    formData.message = "";
  } else {
    alert(result.message);
  }
  isSubmitting.value = false;
};

// Subscription logic
const subscribe = async () => {
  const result = await subscribeUser(db, subscribeEmail.value);
  if (result.success) {
    alert(result.message);
    subscribeEmail.value = ""; // Clear email input
  } else {
    alert(result.message);
  }
};
</script>

<style scoped>
.stat-card {
  @apply text-center px-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 shadow-sm dark:shadow-none;
}

.contact-card {
  @apply p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 backdrop-blur-sm shadow-sm dark:shadow-none;
}

.contact-item {
  @apply flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all duration-300;
}

.contact-icon-wrapper {
  @apply w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0;
}

.social-btn {
  @apply w-12 h-12 rounded-lg flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg;
}

.social-btn-cyan {
  @apply bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white border border-cyan-500/20 hover:border-cyan-500;
}

.social-btn-purple {
  @apply bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/20 hover:border-purple-500;
}

.social-btn-emerald {
  @apply bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 hover:border-emerald-500;
}

.form-input {
  @apply w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300;
}

.btn-primary {
  @apply px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn-secondary {
  @apply px-6 py-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-cyan-500/20 text-slate-700 dark:text-white font-medium hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300;
}

.newsletter-card {
  @apply p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-500/10 dark:via-purple-500/10 dark:to-pink-500/10 border border-cyan-500/20 dark:border-cyan-500/20 backdrop-blur-sm mb-12;
}

.info-card {
  @apply p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-cyan-500/10 backdrop-blur-sm shadow-sm dark:shadow-none text-center;
}

.info-icon-wrapper {
  @apply w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4;
}

@media (max-width: 640px) {
  .stat-card {
    @apply px-3 py-2;
  }

  .contact-card {
    @apply p-4;
  }

  .info-card {
    @apply p-4;
  }
}
</style>
