<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <div class="container mx-auto px-4 sm:px-0 max-w-6xl relative z-10 py-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Свяжитесь с нами
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Мы всегда готовы ответить на ваши вопросы и помочь вам. Свяжитесь с
          нами любым удобным способом.
        </p>
      </section>

      <!-- Contact Information Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact Details -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8"
        >
          <h2 class="text-2xl font-bold text-white/90 mb-6">Контакты</h2>
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div
                class="p-3 bg-[#0EA5E9]/10 rounded-lg transition-all duration-300"
              >
                <i class="fas fa-envelope text-[#0EA5E9] text-xl"></i>
              </div>
              <a
                href="mailto:info@platform.com"
                class="text-slate-300 hover:text-[#0EA5E9] transition-colors duration-300"
              >
                info@platform.com
              </a>
            </div>

            <div class="flex items-center space-x-4">
              <div
                class="p-3 bg-[#F59E0B]/10 rounded-lg transition-all duration-300"
              >
                <i class="fas fa-phone text-[#F59E0B] text-xl"></i>
              </div>
              <a
                href="tel:+1234567890"
                class="text-slate-300 hover:text-[#F59E0B] transition-colors duration-300"
              >
                +7 (123) 456-78-90
              </a>
            </div>

            <div class="flex items-center space-x-4">
              <div
                class="p-3 bg-[#E879F9]/10 rounded-lg transition-all duration-300"
              >
                <i class="fas fa-map-marker-alt text-[#E879F9] text-xl"></i>
              </div>
              <span class="text-slate-300"> Москва, ул. Примерная, 123 </span>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="pt-8 flex space-x-4">
            <a
              href="#"
              class="group relative inline-flex items-center justify-center p-3 bg-[#0EA5E9]/10 rounded-lg overflow-hidden transition-all duration-300"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] group-hover:translate-x-0 ease"
              >
                <i class="fab fa-telegram"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fab fa-telegram"></i>
              </span>
              <span class="relative invisible">Telegram</span>
            </a>
            <a
              href="#"
              class="group relative inline-flex items-center justify-center p-3 bg-[#F59E0B]/10 rounded-lg overflow-hidden transition-all duration-300"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] group-hover:translate-x-0 ease"
              >
                <i class="fab fa-instagram"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#F59E0B] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fab fa-instagram"></i>
              </span>
              <span class="relative invisible">Instagram</span>
            </a>
            <a
              href="#"
              class="group relative inline-flex items-center justify-center p-3 bg-[#E879F9]/10 rounded-lg overflow-hidden transition-all duration-300"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#E879F9] to-[#C084FC] group-hover:translate-x-0 ease"
              >
                <i class="fab fa-whatsapp"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#E879F9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i class="fab fa-whatsapp"></i>
              </span>
              <span class="relative invisible">WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8"
        >
          <h3 class="text-2xl font-semibold text-white/90 mb-6">
            Напишите нам
          </h3>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="space-y-2">
              <label
                for="name"
                class="block text-sm font-medium text-slate-300"
              >
                Ваше имя
              </label>
              <input
                v-model="formData.name"
                type="text"
                id="name"
                class="w-full px-4 py-3 bg-[#1A1F35]/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 text-white placeholder-slate-400 transition-all duration-300"
                placeholder="Введите ваше имя"
                required
              />
            </div>

            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-slate-300"
              >
                Email
              </label>
              <input
                v-model="formData.email"
                type="email"
                id="email"
                class="w-full px-4 py-3 bg-[#1A1F35]/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 text-white placeholder-slate-400 transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>

            <div class="space-y-2">
              <label
                for="message"
                class="block text-sm font-medium text-slate-300"
              >
                Сообщение
              </label>
              <textarea
                v-model="formData.message"
                id="message"
                rows="4"
                class="w-full px-4 py-3 bg-[#1A1F35]/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 text-white placeholder-slate-400 transition-all duration-300"
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
                  type="email"
                  v-model="email"
                  placeholder="Введите ваш email"
                  class="w-full px-4 py-3 rounded-l-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] transition-all"
                />
                <button
                  @click="subscribe"
                  class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-r-lg group"
                >
                  <span
                    class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
                  >
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span
                    class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
                  >
                    Подписаться
                  </span>
                  <span class="relative invisible">Подписаться</span>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :class="[
                'w-full group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg backdrop-blur-sm border border-[#0EA5E9]/20',
                isSubmitting ? 'opacity-75 cursor-wait' : '',
              ]"
              :disabled="isSubmitting"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
              >
                <i
                  v-if="isSubmitting"
                  class="fas fa-spinner fa-spin text-xl"
                ></i>
                <i v-else class="fas fa-paper-plane text-xl"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
              >
                <i
                  v-if="isSubmitting"
                  class="fas fa-spinner fa-spin text-xl"
                ></i>
                <i v-else class="fas fa-paper-plane text-xl"></i>
                <span class="ml-2">{{
                  isSubmitting ? "Отправка..." : "Отправить сообщение"
                }}</span>
              </span>
              <span class="relative invisible">Отправить сообщение</span>
            </button>
          </form>
        </div>
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
