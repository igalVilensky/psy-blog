<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center pt-8 sm:-mt-20 px-4 pb-12 sm:pb-0"
  >
    <div
      class="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2 border border-white/20"
    >
      <!-- Contact Information Section -->
      <div
        class="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-10 flex flex-col justify-between"
      >
        <div>
          <h2 class="text-3xl font-bold text-white/90 mb-8">
            Всегда на связи с вами
          </h2>
          <p class="text-purple-200/80 mb-8 text-lg">
            Свяжитесь с нами любым удобным способом. Мы здесь, чтобы помочь вам.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300"
            >
              <i class="fas fa-envelope text-purple-300 text-xl"></i>
            </div>
            <a
              href="mailto:info@platform.com"
              class="text-purple-200/80 hover:text-white transition-colors duration-300"
            >
              info@platform.com
            </a>
          </div>

          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300"
            >
              <i class="fas fa-phone text-purple-300 text-xl"></i>
            </div>
            <a
              href="tel:+1234567890"
              class="text-purple-200/80 hover:text-white transition-colors duration-300"
            >
              +7 (123) 456-78-90
            </a>
          </div>

          <div class="flex items-center space-x-4 group">
            <div
              class="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300"
            >
              <i class="fas fa-map-marker-alt text-purple-300 text-xl"></i>
            </div>
            <span class="text-purple-200/80"> Москва, ул. Примерная, 123 </span>
          </div>
        </div>

        <div class="pt-8 flex space-x-4">
          <a
            href="#"
            class="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <i class="fab fa-telegram text-purple-300 text-xl"></i>
          </a>
          <a
            href="#"
            class="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <i class="fab fa-instagram text-purple-300 text-xl"></i>
          </a>
          <a
            href="#"
            class="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <i class="fab fa-whatsapp text-purple-300 text-xl"></i>
          </a>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="p-10 bg-white/5">
        <h3 class="text-2xl font-semibold text-white/90 mb-8">Напишите нам</h3>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="space-y-2">
            <label
              for="name"
              class="block text-sm font-medium text-purple-200/80"
            >
              Ваше имя
            </label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="w-full px-4 py-3 bg-white/10 border border-purple-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-purple-300/50 transition-all duration-300"
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div class="space-y-2">
            <label
              for="email"
              class="block text-sm font-medium text-purple-200/80"
            >
              Email
            </label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="w-full px-4 py-3 bg-white/10 border border-purple-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-purple-300/50 transition-all duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="space-y-2">
            <label
              for="message"
              class="block text-sm font-medium text-purple-200/80"
            >
              Сообщение
            </label>
            <textarea
              v-model="formData.message"
              id="message"
              rows="4"
              class="w-full px-4 py-3 bg-white/10 border border-purple-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-purple-300/50 transition-all duration-300"
              placeholder="Ваше сообщение..."
              required
            ></textarea>
          </div>
          <!-- Subscription -->
          <div>
            <h4 class="text-lg font-medium text-white mb-4">
              Подписаться на рассылку
            </h4>
            <div class="flex">
              <input
                v-model="subscribeEmail"
                type="email"
                placeholder="Ваш Email"
                class="w-full px-4 py-2 border-2 border-purple-300/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              />
              <button
                @click.prevent="subscribe"
                class="bg-gradient-to-r hover:from-purple-700 rounded-r-lg hover:to-indigo-700 transform from-purple-600 to-indigo-600 text-white transition py-3 px-6"
              >
                Подписаться
              </button>
            </div>
          </div>
          <!-- Submit Button -->
          <button
            type="submit"
            :class="[
              'w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg',
              'hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5',
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
