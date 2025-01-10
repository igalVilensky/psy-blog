<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Gradient Orbs -->
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 rounded-full blur-3xl animate-slow-drift"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-full blur-3xl animate-slow-pulse"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-[#E879F9]/10 to-[#C084FC]/10 rounded-full blur-3xl animate-slow-float"
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-7xl relative z-10 pb-12 pt-12">
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
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Contact Details -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
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
              class="p-3 bg-[#0EA5E9]/10 rounded-lg hover:bg-[#0EA5E9]/20 transition-all duration-300"
            >
              <i class="fab fa-telegram text-[#0EA5E9] text-xl"></i>
            </a>
            <a
              href="#"
              class="p-3 bg-[#F59E0B]/10 rounded-lg hover:bg-[#F59E0B]/20 transition-all duration-300"
            >
              <i class="fab fa-instagram text-[#F59E0B] text-xl"></i>
            </a>
            <a
              href="#"
              class="p-3 bg-[#E879F9]/10 rounded-lg hover:bg-[#E879F9]/20 transition-all duration-300"
            >
              <i class="fab fa-whatsapp text-[#E879F9] text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
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
                  v-model="subscribeEmail"
                  type="email"
                  placeholder="Ваш Email"
                  class="w-full px-4 py-2 bg-[#1A1F35]/40 border border-white/10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 text-white placeholder-slate-400 transition-all duration-300"
                />
                <button
                  @click.prevent="subscribe"
                  class="group relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white font-medium rounded-r-lg overflow-hidden transition-all hover:from-[#22D3EE] hover:to-[#C084FC]"
                >
                  <span class="relative z-10">Подписаться</span>
                  <div
                    class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#22D3EE] to-[#C084FC] transition-transform duration-300"
                  ></div>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :class="[
                'w-full group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white font-medium rounded-lg overflow-hidden transition-all hover:from-[#22D3EE] hover:to-[#C084FC]',
                isSubmitting ? 'opacity-75 cursor-wait' : '',
              ]"
              :disabled="isSubmitting"
            >
              <span class="relative z-10">
                <i
                  v-if="isSubmitting"
                  class="fas fa-spinner fa-spin text-xl"
                ></i>
                <i v-else class="fas fa-paper-plane text-xl"></i>
                <span class="ml-2">{{
                  isSubmitting ? "Отправка..." : "Отправить сообщение"
                }}</span>
              </span>
              <div
                class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#22D3EE] to-[#C084FC] transition-transform duration-300"
              ></div>
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
