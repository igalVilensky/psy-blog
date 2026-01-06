<template>
  <div
    class="min-h-screen bg-mindqlab-calm-bg dark:bg-mindqlab-calm-dark-bg text-stone-900 dark:text-stone-100 font-sans transition-colors duration-500">
    <TopBar />

    <div class="max-w-7xl mx-auto px-6 py-20">
      <!-- Header Section -->
      <div class="mb-20 animate-fade-up">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div class="max-w-3xl">
            <h1
              class="text-4xl md:text-5xl lg:text-7xl font-light text-stone-900 dark:text-white mb-8 tracking-tight uppercase">
              Свяжитесь с нами
            </h1>
            <p class="text-stone-500 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed italic">
              Мы всегда готовы ответить на ваши вопросы и помочь вам. Свяжитесь с нами любым удобным способом.
            </p>
          </div>

          <!-- Stats Overview -->
          <div class="flex items-center gap-6">
            <div class="stat-card">
              <div class="text-3xl font-light text-mindqlab-calm-accent">24/7</div>
              <div class="text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] font-medium mt-1">
                Поддержка
              </div>
            </div>
            <div class="stat-card">
              <div class="text-3xl font-light text-stone-900 dark:text-white">&lt;1ч</div>
              <div class="text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] font-medium mt-1">
                Ответ
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information and Form Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <!-- Contact Details Card -->
        <div class="contact-card">
          <h2 class="text-3xl font-light text-stone-900 dark:text-white mb-10">Контактная информация</h2>

          <div class="space-y-8">
            <!-- Email -->
            <div class="contact-item">
              <div class="contact-icon-wrapper bg-stone-50 dark:bg-stone-800/30">
                <i class="fas fa-envelope text-mindqlab-calm-accent text-xl"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] font-medium mb-1">
                  Email</div>
                <a href="mailto:contact@mindqlab.com"
                  class="text-stone-800 dark:text-stone-200 hover:text-mindqlab-calm-accent transition-colors duration-300 text-base sm:text-lg font-light block truncate"
                  title="contact@mindqlab.com">
                  contact@mindqlab.com
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="contact-item">
              <div class="contact-icon-wrapper bg-stone-50 dark:bg-stone-800/30">
                <i class="fas fa-phone text-stone-900 dark:text-white text-xl"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] font-medium mb-1">
                  Телефон</div>
                <a href="tel:+491783099433"
                  class="text-stone-800 dark:text-stone-200 hover:text-mindqlab-calm-accent transition-colors duration-300 text-base sm:text-lg font-light block truncate">
                  +49 178 3099433
                </a>
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="pt-10 border-t border-stone-50 dark:border-stone-800/30 mt-12">
            <h3 class="text-[10px] font-medium text-stone-400 dark:text-stone-600 mb-6 uppercase tracking-[0.2em]">
              Социальные сети
            </h3>
            <div class="flex flex-wrap gap-4">
              <!-- Telegram -->
              <a href="https://web.telegram.org/a/#984171843" target="_blank" rel="noopener noreferrer"
                class="social-btn">
                <i class="fab fa-telegram"></i>
              </a>

              <!-- Instagram -->
              <a href="https://www.instagram.com/galactik.anastasia/" target="_blank" rel="noopener noreferrer"
                class="social-btn">
                <i class="fab fa-instagram"></i>
              </a>

              <!-- WhatsApp -->
              <a href="https://wa.me/491783099433" target="_blank" rel="noopener noreferrer" class="social-btn">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="contact-card">
          <h3 class="text-3xl font-light text-stone-900 dark:text-white mb-10">
            Напишите нам
          </h3>
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Name Input -->
            <div class="space-y-3">
              <label for="name"
                class="text-xs font-medium text-stone-400 dark:text-stone-600 uppercase tracking-widest px-4">
                Ваше имя
              </label>
              <input v-model="formData.name" type="text" id="name" class="form-input" placeholder="Как вас зовут?"
                required />
            </div>

            <!-- Email Input -->
            <div class="space-y-3">
              <label for="email"
                class="text-xs font-medium text-stone-400 dark:text-stone-600 uppercase tracking-widest px-4">
                Email
              </label>
              <input v-model="formData.email" type="email" id="email" class="form-input" placeholder="your@email.com"
                required />
            </div>

            <!-- Message Input -->
            <div class="space-y-3">
              <label for="message"
                class="text-xs font-medium text-stone-400 dark:text-stone-600 uppercase tracking-widest px-4">
                Сообщение
              </label>
              <textarea v-model="formData.message" id="message" rows="5" class="form-input"
                placeholder="Расскажите, чем мы можем помочь..." required></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="isSubmitting" class="btn-primary w-full group">
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else
                class="fas fa-paper-plane mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
              {{ isSubmitting ? "Отправка..." : "Отправить сообщение" }}
            </button>
          </form>
        </div>
      </div>

      <!-- Newsletter Subscription -->
      <div class="newsletter-card">
        <div class="flex flex-col lg:grid lg:grid-cols-12 items-center gap-12">
          <div class="lg:col-span-5">
            <h3 class="text-3xl font-light text-stone-900 dark:text-white mb-4">
              Оставайтесь на связи
            </h3>
            <p class="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
              Получайте последние новости, статьи и инсайты из нашей лаборатории развития прямо на вашу почту.
            </p>
          </div>
          <div class="lg:col-span-7 w-full">
            <div class="flex flex-col sm:flex-row gap-4">
              <input type="email" v-model="subscribeEmail" placeholder="Введите ваш email" class="form-input flex-1" />
              <button @click="subscribe" class="btn-secondary px-10">
                <i class="fas fa-bell mr-2"></i>
                Подписаться
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Response Time -->
        <div class="info-card">
          <div class="info-icon-wrapper bg-stone-50 dark:bg-stone-800/20">
            <i class="fas fa-clock text-mindqlab-calm-accent text-2xl"></i>
          </div>
          <h4 class="text-xl font-light text-stone-900 dark:text-white mb-3">
            Быстрый ответ
          </h4>
          <p class="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            Мы отвечаем на все запросы в течение одного часа в рабочее время.
          </p>
        </div>

        <!-- Support -->
        <div class="info-card">
          <div class="info-icon-wrapper bg-stone-50 dark:bg-stone-800/20">
            <i class="fas fa-headset text-mindqlab-calm-accent text-2xl"></i>
          </div>
          <h4 class="text-xl font-light text-stone-900 dark:text-white mb-3">
            Поддержка 24/7
          </h4>
          <p class="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            Наша команда всегда на связи, чтобы помочь вам в любое время суток.
          </p>
        </div>

        <!-- Privacy -->
        <div class="info-card">
          <div class="info-icon-wrapper bg-stone-50 dark:bg-stone-800/20">
            <i class="fas fa-shield-alt text-mindqlab-calm-accent text-2xl"></i>
          </div>
          <h4 class="text-xl font-light text-stone-900 dark:text-white mb-3">
            Приватность
          </h4>
          <p class="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            Ваши данные полностью защищены и используются только для связи с вами.
          </p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getFirestore } from "firebase/firestore";
import { submitContactForm, subscribeUser } from "../api/firebase/contact";
import TopBar from '~/components/navigation/TopBar.vue';
import Footer from '~/components/ui/Footer.vue';

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
.animate-fade-up {
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card {
  @apply text-center px-8 py-6 rounded-[2rem] bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/50 shadow-sm transition-all duration-300;
}

.contact-card {
  @apply p-10 md:p-12 rounded-[3.5rem] bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/50 backdrop-blur-sm shadow-sm;
}

.contact-item {
  @apply flex items-center sm:items-start gap-4 sm:gap-6 p-5 sm:p-6 rounded-[2rem] bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100/50 dark:border-stone-800/30 hover:border-mindqlab-calm-accent/30 transition-all duration-500 overflow-hidden;
}

.contact-icon-wrapper {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110;
}

.social-btn {
  @apply w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-white dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800/50 text-stone-400 dark:text-stone-500 hover:text-mindqlab-calm-accent hover:border-mindqlab-calm-accent transition-all duration-300;
}

.form-input {
  @apply w-full px-6 py-4 bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100 dark:border-stone-800/50 rounded-2xl focus:outline-none focus:border-mindqlab-calm-accent/50 text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 transition-all duration-300 font-light;
}

.btn-primary {
  @apply px-10 py-5 rounded-full bg-mindqlab-calm-accent text-white font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-mindqlab-calm-accent/20 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply px-10 py-5 rounded-full bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-stone-900 dark:text-white font-medium hover:border-mindqlab-calm-accent transition-all duration-300 shadow-sm;
}

.newsletter-card {
  @apply p-12 md:p-16 rounded-[4rem] bg-white/50 dark:bg-stone-900/20 border border-stone-100 dark:border-stone-800/50 backdrop-blur-sm mb-20;
}

.info-card {
  @apply p-10 rounded-[3rem] bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/50 backdrop-blur-sm shadow-sm text-center transition-all duration-500 hover:scale-[1.02];
}

.info-icon-wrapper {
  @apply w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm;
}
</style>
