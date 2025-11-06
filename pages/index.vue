<template>
  <div class="min-h-screen mt-12 sm:mt-24">
    <!-- Hero Section -->
    <section class="relative flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-5"></div>
      <div
        class="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl z-10"
      >
        <div class="text-center">
          <h1
            class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300 mb-8 leading-tight"
          >
            Ваш Путь к Личностному
            <span class="whitespace-nowrap relative text-white"> Росту </span>
          </h1>

          <!-- Hero description -->
          <p
            v-if="!isLoggedIn"
            class="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Начните путешествие к лучшей версии себя с нашей платформой
            личностного роста,
            <span class="font-semibold text-cyan-300"
              >основанной на научных исследованиях</span
            >.
          </p>

          <!-- Action cards for new users -->
          <div
            v-if="!isLoggedIn"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 animate-fadeIn opacity-0"
            style="animation-delay: 1.5s"
          >
            <div
              class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300 text-left"
            >
              <div class="flex items-start mb-4">
                <div
                  class="bg-gradient-to-br from-sky-500 to-cyan-400 p-3 rounded-lg mr-4"
                >
                  <i class="fas fa-clipboard-check text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="text-xl font-medium text-white mb-2">
                    Пройдите тест
                  </h3>
                  <p class="text-slate-300 text-sm">
                    Узнайте свои сильные стороны и зоны развития с помощью
                    нашего научно обоснованного теста
                  </p>
                </div>
              </div>
              <button
                class="text-sky-400 text-sm font-medium flex items-center hover:text-sky-300 transition-colors"
              >
                Начать тестирование
                <i class="fas fa-arrow-right ml-2"></i>
              </button>
            </div>

            <div
              class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-left"
            >
              <div class="flex items-start mb-4">
                <div
                  class="bg-gradient-to-br from-purple-500 to-fuchsia-400 p-3 rounded-lg mr-4"
                >
                  <i class="fas fa-user-plus text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="text-xl font-medium text-white mb-2">
                    Создайте аккаунт
                  </h3>
                  <p class="text-slate-300 text-sm">
                    Получите доступ к персонализированным курсам и материалам
                    для вашего развития
                  </p>
                </div>
              </div>
              <button
                class="text-purple-400 text-sm font-medium flex items-center hover:text-purple-300 transition-colors"
              >
                Регистрация
                <i class="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>

          <!-- Centering the "Как начать?" button for new users -->
          <div
            v-if="!isLoggedIn"
            class="flex justify-center animate-fadeIn opacity-0 mb-4"
            style="animation-delay: 2.2s"
          >
            <Button
              to="/how-to-start"
              text="Как начать?"
              iconClass="fas fa-info-circle"
              textColor="#FFFFFF"
              customClass="bg-gradient-to-r from-green-500 to-blue-500 border-[#0EA5E9]/20 w-full sm:w-64"
            />
          </div>

          <!-- Welcome message for logged-in users -->
          <div
            v-if="isLoggedIn"
            class="mb-10 animate-fadeIn opacity-0"
            style="animation-delay: 1.5s"
          >
            <p class="text-xl text-slate-300 mb-3">
              Добро пожаловать,
              <span class="font-semibold text-sky-400">{{ userName }}</span
              >!
            </p>
            <p class="text-slate-400 max-w-xl mx-auto">
              Продолжайте свой путь развития. У вас есть непрочитанные
              уведомления и новые рекомендации.
            </p>
          </div>

          <!-- Основные кнопки -->
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
    <section class="py-24 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300 mb-4"
          >
            Преимущества нашей платформы
          </h2>
          <p class="text-slate-400 max-w-2xl mx-auto">
            Мы объединяем современные методики психологии с технологиями для
            создания персонализированного пути развития
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-transparent hover:border-sky-500/20 transition-all duration-300 group"
          >
            <div
              class="bg-gradient-to-br from-sky-500 to-cyan-400 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            >
              <i class="fas fa-fingerprint text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-white">
              Персональный профиль
            </h3>
            <p class="text-slate-400">
              Узнайте свои сильные стороны, паттерны поведения и потенциальные
              зоны роста на основе вашего уникального профиля
            </p>
            <div class="mt-6 pt-4 border-t border-white/10">
              <a
                href="#"
                class="text-sky-400 text-sm flex items-center hover:text-sky-300 transition-colors"
              >
                Узнать больше
                <i class="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </div>

          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-transparent hover:border-cyan-500/20 transition-all duration-300 group"
          >
            <div
              class="bg-gradient-to-br from-cyan-500 to-emerald-400 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            >
              <i class="fas fa-brain text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-white">
              Умные рекомендации
            </h3>
            <p class="text-slate-400">
              Получайте персонализированные материалы и упражнения на основе
              вашего профиля и целей развития
            </p>
            <div class="mt-6 pt-4 border-t border-white/10">
              <a
                href="#"
                class="text-cyan-400 text-sm flex items-center hover:text-cyan-300 transition-colors"
              >
                Узнать больше
                <i class="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </div>

          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-transparent hover:border-purple-500/20 transition-all duration-300 group"
          >
            <div
              class="bg-gradient-to-br from-purple-500 to-fuchsia-400 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            >
              <i class="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-white">
              Отслеживание прогресса
            </h3>
            <p class="text-slate-400">
              Наблюдайте за своим развитием и получайте insights для дальнейшего
              роста с помощью аналитики
            </p>
            <div class="mt-6 pt-4 border-t border-white/10">
              <a
                href="#"
                class="text-purple-400 text-sm flex items-center hover:text-purple-300 transition-colors"
              >
                Узнать больше
                <i class="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Profile Preview Section -->
    <section class="py-24 px-4 relative">
      <div
        class="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-purple-900/20 opacity-50"
      ></div>
      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              class="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-400"
            >
              Ваш психологический профиль
            </h2>
            <p class="text-slate-300 mb-8 text-lg">
              На основе современных методик психологии мы создадим ваш
              уникальный профиль, который поможет лучше понять себя и свой путь
              развития
            </p>

            <div
              class="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-sky-500/10"
            >
              <div class="flex mb-4">
                <div class="w-1/3 pr-4">
                  <div
                    class="h-2 w-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                  ></div>
                  <p class="text-xs text-slate-400 mt-1">
                    Аналитическое мышление
                  </p>
                </div>
                <div class="w-1/3 px-2">
                  <div
                    class="h-2 w-4/5 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                  ></div>
                  <p class="text-xs text-slate-400 mt-1">Эмоц. интеллект</p>
                </div>
                <div class="w-1/3 pl-4">
                  <div
                    class="h-2 w-2/3 bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full"
                  ></div>
                  <p class="text-xs text-slate-400 mt-1">Креативность</p>
                </div>
              </div>
            </div>

            <ul class="space-y-5 mb-10">
              <li class="flex items-start">
                <i class="fas fa-check-circle text-sky-500 mr-3 mt-1"></i>
                <div>
                  <span class="text-white font-medium"
                    >Определение архетипа личности</span
                  >
                  <p class="text-slate-400 text-sm mt-1">
                    Узнайте свой психологический тип и его характеристики
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <i class="fas fa-check-circle text-sky-500 mr-3 mt-1"></i>
                <div>
                  <span class="text-white font-medium"
                    >Анализ эмоционального интеллекта</span
                  >
                  <p class="text-slate-400 text-sm mt-1">
                    Измерьте свою способность распознавать эмоции и управлять
                    ими
                  </p>
                </div>
              </li>
              <li class="flex items-start">
                <i class="fas fa-check-circle text-sky-500 mr-3 mt-1"></i>
                <div>
                  <span class="text-white font-medium"
                    >Карта потенциала развития</span
                  >
                  <p class="text-slate-400 text-sm mt-1">
                    Визуализация ваших сильных сторон и направлений для роста
                  </p>
                </div>
              </li>
            </ul>

            <button
              class="px-6 py-3 rounded-xl font-medium text-amber-500 flex items-center bg-amber-500/10 hover:bg-amber-500/20 transition-all duration-300 border border-amber-500/30"
            >
              Создать профиль
              <i class="fas fa-arrow-right ml-3"></i>
            </button>
          </div>

          <div class="relative">
            <div
              class="absolute -inset-4 bg-gradient-to-r from-sky-500/20 to-fuchsia-500/20 rounded-2xl blur-xl"
            ></div>
            <div
              class="relative overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src="https://jameskelleher.com/cdn/shop/products/psychological-profile.jpg?v=1527227791"
                alt="Психологический профиль"
                class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="flex items-center mb-4">
                  <div
                    class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4"
                  >
                    <i class="fas fa-play text-white"></i>
                  </div>
                  <span class="text-white font-medium"
                    >Смотреть демо-презентацию</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h2
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400 mb-4"
          >
            Что говорят наши пользователи
          </h2>
          <p class="text-slate-400 max-w-2xl mx-auto">
            Тысячи людей уже улучшили свою жизнь с помощью нашей платформы
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center mr-4"
              >
                <span class="text-white font-bold">АК</span>
              </div>
              <div>
                <h4 class="text-white font-medium">Анна К.</h4>
                <p class="text-slate-400 text-sm">Психолог, 32 года</p>
              </div>
            </div>
            <p class="text-slate-300 mb-4">
              "Платформа помогла мне лучше понять свои сильные стороны и развить
              эмоциональный интеллект. Рекомендую всем, кто заинтересован в
              личностном росте."
            </p>
            <div class="flex text-amber-400">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
          </div>

          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center mr-4"
              >
                <span class="text-white font-bold">МС</span>
              </div>
              <div>
                <h4 class="text-white font-medium">Михаил С.</h4>
                <p class="text-slate-400 text-sm">Предприниматель, 41 год</p>
              </div>
            </div>
            <p class="text-slate-300 mb-4">
              "Благодаря персональному профилю я наконец смог определить свои
              слабые стороны и работать над ними. Результаты заметны уже через
              месяц регулярных занятий."
            </p>
            <div class="flex text-amber-400">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
          </div>

          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-400 flex items-center justify-center mr-4"
              >
                <span class="text-white font-bold">ЕЛ</span>
              </div>
              <div>
                <h4 class="text-white font-medium">Екатерина Л.</h4>
                <p class="text-slate-400 text-sm">Студентка, 24 года</p>
              </div>
            </div>
            <p class="text-slate-300 mb-4">
              "Курсы по самопознанию изменили мое отношение к себе и окружающим.
              Теперь я лучше понимаю свои эмоции и мотивацию поступков."
            </p>
            <div class="flex text-amber-400">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-sky-900/50 to-purple-900/50"
      ></div>
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-sky-500 rounded-full filter blur-3xl opacity-20"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20"
      ></div>

      <div class="container mx-auto max-w-4xl relative z-10">
        <div
          class="bg-white/5 backdrop-blur-md rounded-2xl p-10 border border-white/10 text-center"
        >
          <h2 class="text-3xl font-bold text-white mb-6">
            Готовы начать свой путь к личностному росту?
          </h2>
          <p class="text-slate-300 mb-10 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам людей, которые уже изменили свою жизнь с
            помощью нашей платформы. Первый шаг – создание вашего профиля.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="px-8 py-4 rounded-xl font-medium text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 shadow-lg shadow-sky-500/20 transition-all duration-300"
            >
              Начать бесплатно
            </button>
            <button
              class="px-8 py-4 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300"
            >
              Узнать больше
            </button>
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
