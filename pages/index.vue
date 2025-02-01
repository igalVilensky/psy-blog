<template>
  <div
    class="min-h-screen text-white font-sans"
    :style="{ minHeight: 'calc(100vh - 250px)' }"
  >
    <!-- Hero Section with Value Proposition -->
    <section
      class="relative h-[100vh] flex items-center justify-center overflow-hidden"
      :style="{ minHeight: 'calc(100vh - 250px)' }"
    >
      <!-- Content -->
      <div
        class="relative container mx-auto px-6 sm:px-8 max-w-3xl pb-24 md:pb-32"
      >
        <div class="text-center">
          <!-- Heading -->
          <h1
            class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-6 animate-slideDown"
          >
            Ваш Путь к Личностному
            <span class="whitespace-nowrap">
              Р<i
                class="fas fa-compass text-2xl sm:text-4xl text-[#0EA5E9] animate-spin-slow relative sm:bottom-1"
              ></i
              >сту
            </span>
          </h1>
          <!-- Subheading -->
          <p
            class="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed animate-slideUp opacity-0"
            style="animation-delay: 0.3s"
          >
            Исследуйте себя, развивайтесь и достигайте своих целей с помощью
            наших
            <span class="font-semibold text-[#22D3EE]"
              >профессиональных инструментов</span
            >
          </p>

          <!-- Greeting Message for Logged-in Users -->
          <div
            v-if="isLoggedIn"
            class="mb-8 animate-fadeIn opacity-0"
            style="animation-delay: 0.6s"
          >
            <p class="text-lg md:text-xl text-slate-300">
              Добро пожаловать, {{ userName }}!
            </p>
          </div>

          <!-- Buttons (only shown after fetching auth) -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0"
            style="animation-delay: 2s"
          >
            <Button
              :to="isLoggedIn ? '/personal-cabinet' : '/courses/courses'"
              :text="isLoggedIn ? 'Продолжить обучение' : 'Начать обучение'"
              iconClass="fas fa-book-open"
              textColor="#FFFFFF"
              customClass="bg-gradient-to-r from-purple-500 to-cyan-500 border-[#0EA5E9]/20"
            />

            <Button
              :to="isLoggedIn ? '/profile' : '/login'"
              :text="isLoggedIn ? 'Перейти в профиль' : 'Создать профиль'"
              iconClass="fas fa-user"
              textColor="#0EA5E9"
              customClass="bg-transparent border-2 border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/10 transition-colors"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white/5 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="bg-gradient-to-br from-[#0EA5E9] to-[#E879F9] p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6"
            >
              <i class="fas fa-fingerprint text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-4">Персональный профиль</h3>
            <p class="text-slate-300">
              Узнайте свои сильные стороны, паттерны поведения и потенциальные
              зоны роста
            </p>
          </div>

          <div
            class="bg-white/5 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="bg-gradient-to-br from-[#0EA5E9] to-[#E879F9] p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6"
            >
              <i class="fas fa-brain text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-4">Умные рекомендации</h3>
            <p class="text-slate-300">
              Получайте персонализированные материалы и упражнения на основе
              вашего профиля
            </p>
          </div>

          <div
            class="bg-white/5 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div
              class="bg-gradient-to-br from-[#0EA5E9] to-[#E879F9] p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6"
            >
              <i class="fas fa-chart-line text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-4">Отслеживание прогресса</h3>
            <p class="text-slate-300">
              Наблюдайте за своим развитием и получайте insights для дальнейшего
              роста
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Profile Preview Section -->
    <section
      class="py-20 px-4 bg-gradient-to-r from-[#0EA5E9]/5 to-[#E879F9]/5"
    >
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              class="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]"
            >
              Ваш психологический профиль
            </h2>
            <p class="text-slate-300 mb-8">
              На основе современных методик психологии мы создадим ваш
              уникальный профиль, который поможет лучше понять себя и свой путь
              развития
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center">
                <i class="fas fa-check-circle text-[#0EA5E9] mr-3"></i>
                <span class="text-slate-300"
                  >Определение архетипа личности</span
                >
              </li>
              <li class="flex items-center">
                <i class="fas fa-check-circle text-[#0EA5E9] mr-3"></i>
                <span class="text-slate-300"
                  >Анализ эмоционального интеллекта</span
                >
              </li>
              <li class="flex items-center">
                <i class="fas fa-check-circle text-[#0EA5E9] mr-3"></i>
                <span class="text-slate-300">Карта потенциала развития</span>
              </li>
            </ul>
            <Button
              to="/profile"
              text="Создать профиль"
              iconClass="fas fa-arrow-right"
              class=""
              isLink="true"
              textColor="#F59E0B"
              isClickable="true"
            />
          </div>
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#E879F9]/20 rounded-xl blur-xl"
            ></div>
            <img
              src="https://academica.ru/upload/medialibrary/edc/yavo2.jpg"
              alt="Психологический профиль"
              class="relative rounded-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { computed } from "vue";
import Button from "~/components/base/Button.vue";

const authStore = useAuthStore();

// Computed properties to reactively check the logged-in state
const isLoggedIn = computed(() => !!authStore.user);
const userName = computed(() => authStore.user?.displayName || "Гость");
</script>

<style scoped>
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.animate-slideDown {
  animation: slideDown 1.8s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 1.8s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 2s ease-out forwards;
}
</style>
