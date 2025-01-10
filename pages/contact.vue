<template>
  <div
    class="relative min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E1B4B] flex flex-col items-center justify-center pt-8 sm:-mt-20 px-4 pb-12 sm:pb-0"
  >
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#0F172A]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-float"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-float-delay"
        ></div>
        <!-- Animated Grid -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]/80"
        >
          <div class="absolute inset-0 bg-grid-white/[0.02] animate-grid"></div>
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-4xl bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2 border border-indigo-500/20"
    >
      <!-- Contact Information Section -->
      <div
        class="bg-gradient-to-br from-[#1E1B4B]/90 to-[#0F172A]/90 p-10 flex flex-col justify-between"
      >
        <div>
          <h2 class="text-3xl font-bold text-white/90 mb-8">
            Всегда на связи с вами
          </h2>
          <p class="text-indigo-200/80 mb-8 text-lg">
            Свяжитесь с нами любым удобным способом. Мы здесь, чтобы помочь вам.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-all duration-300"
            >
              <i class="fas fa-envelope text-indigo-400 text-xl"></i>
            </div>
            <a
              href="mailto:info@platform.com"
              class="text-indigo-200/80 hover:text-white transition-colors duration-300"
            >
              info@platform.com
            </a>
          </div>

          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-all duration-300"
            >
              <i class="fas fa-phone text-indigo-400 text-xl"></i>
            </div>
            <a
              href="tel:+1234567890"
              class="text-indigo-200/80 hover:text-white transition-colors duration-300"
            >
              +7 (123) 456-78-90
            </a>
          </div>

          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-all duration-300"
            >
              <i class="fas fa-map-marker-alt text-indigo-400 text-xl"></i>
            </div>
            <span class="text-indigo-200/80"> Москва, ул. Примерная, 123 </span>
          </div>
        </div>

        <div class="pt-8 flex space-x-4">
          <a
            href="#"
            class="p-3 bg-indigo-500/10 rounded-lg hover:bg-indigo-500/20 transition-all duration-300"
          >
            <i class="fab fa-telegram text-indigo-400 text-xl"></i>
          </a>
          <a
            href="#"
            class="p-3 bg-indigo-500/10 rounded-lg hover:bg-indigo-500/20 transition-all duration-300"
          >
            <i class="fab fa-instagram text-indigo-400 text-xl"></i>
          </a>
          <a
            href="#"
            class="p-3 bg-indigo-500/10 rounded-lg hover:bg-indigo-500/20 transition-all duration-300"
          >
            <i class="fab fa-whatsapp text-indigo-400 text-xl"></i>
          </a>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="p-10 bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60">
        <h3 class="text-2xl font-semibold text-white/90 mb-8">Напишите нам</h3>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="space-y-2">
            <label
              for="name"
              class="block text-sm font-medium text-indigo-200/80"
            >
              Ваше имя
            </label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="w-full px-4 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-indigo-300/50 transition-all duration-300"
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div class="space-y-2">
            <label
              for="email"
              class="block text-sm font-medium text-indigo-200/80"
            >
              Email
            </label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="w-full px-4 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-indigo-300/50 transition-all duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="space-y-2">
            <label
              for="message"
              class="block text-sm font-medium text-indigo-200/80"
            >
              Сообщение
            </label>
            <textarea
              v-model="formData.message"
              id="message"
              rows="4"
              class="w-full px-4 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-indigo-300/50 transition-all duration-300"
              placeholder="Ваше сообщение..."
              required
            ></textarea>
          </div>

          <!-- Subscription -->
          <div>
            <h4 class="text-lg font-medium text-white/90 mb-4">
              Подписаться на рассылку
            </h4>
            <div class="flex">
              <input
                v-model="subscribeEmail"
                type="email"
                placeholder="Ваш Email"
                class="w-full px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-indigo-300/50 transition-all duration-300"
              />
              <button
                @click.prevent="subscribe"
                class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-r-lg hover:opacity-90 transition-all"
              >
                Подписаться
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :class="[
              'w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-lg',
              'hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5',
              'transition-all duration-300 flex items-center justify-center space-x-2',
              isSubmitting ? 'opacity-75 cursor-wait' : '',
            ]"
            :disabled="isSubmitting"
          >
            <i v-if="isSubmitting" class="fas fa-spinner fa-spin text-xl"></i>
            <i v-else class="fas fa-paper-plane text-xl"></i>
            <span>{{
              isSubmitting ? "Отправка..." : "Отправить сообщение"
            }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getFirestore } from "firebase/firestore";
import { submitContactForm, subscribeUser } from "../api/firebase/contact";

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
.bg-grid-white {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes grid {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: -3s;
}

.animate-grid {
  animation: grid 20s linear infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1b4b;
}

::-webkit-scrollbar-thumb {
  background: #4f46e5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6366f1;
}
</style>
