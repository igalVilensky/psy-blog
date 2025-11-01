<template>
  <div class="min-h-screen bg-background relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-purple-start/20 to-purple-end/20 rounded-full blur-3xl animate-slow-pulse"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-gradient-blue-start/20 to-gradient-blue-end/20 rounded-full blur-3xl animate-slow-drift"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-gradient-orange-start/10 to-gradient-orange-end/10 rounded-full blur-3xl animate-slow-float"
      ></div>
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-8 py-8"
    >
      <div class="max-w-5xl w-full">
        <!-- Main Card -->
        <div
          class="bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 p-4 sm:p-6 md:p-12 lg:p-16 transform hover:scale-[1.01] transition-all duration-500"
        >
          <!-- Header Section -->
          <div ref="confettiTrigger" class="text-center mb-8 md:mb-12">
            <!-- Animated Icon -->
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 md:mb-8 bg-gradient-to-br from-gradient-purple-start to-gradient-purple-end rounded-full flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300"
            >
              <i
                class="fas fa-gift text-3xl sm:text-4xl md:text-5xl text-white"
              ></i>
            </div>

            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gradient-purple-start via-gradient-purple-end to-gradient-blue-end bg-clip-text text-transparent mb-4 md:mb-6 leading-tight px-2"
            >
              С Днём Рождения, Настя! 🎉
            </h1>

            <p
              class="text-xl sm:text-2xl md:text-3xl text-white mb-3 md:mb-4 font-light px-2"
            >
              Моя дорогая Анастасия
            </p>
            <p
              class="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
            >
              От всего сердца, от твоего любящего мужа и наших замечательных
              детей: Амели, Натаниэля и Адриэля 💕
            </p>
          </div>

          <!-- CTA Button -->
          <div class="text-center mb-8 md:mb-12 px-2">
            <button
              @click="revealSurprise"
              class="group relative px-6 sm:px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg md:text-xl text-white shadow-2xl hover:shadow-purple-start/50 transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <span
                class="relative z-10 flex items-center gap-2 sm:gap-3 justify-center"
              >
                <i
                  :class="showSurprise ? 'fas fa-heart' : 'fas fa-sparkles'"
                ></i>
                <span class="whitespace-nowrap">{{
                  showSurprise ? "Ты — моё всё 💖" : "Открыть подарок"
                }}</span>
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-gradient-purple-end to-gradient-purple-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </button>
          </div>

          <!-- Surprise Content -->
          <transition name="fade-slide">
            <div v-if="showSurprise" class="space-y-6 md:space-y-8">
              <!-- Main Gift Section -->
              <div
                class="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20 shadow-xl"
              >
                <div class="text-center mb-6 md:mb-8">
                  <a
                    href="https://mindqlab.com"
                    target="_blank"
                    class="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end rounded-full text-white font-semibold text-sm sm:text-base md:text-lg mb-4 md:mb-6 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                  >
                    <i class="fas fa-globe"></i>
                    <span>mindqlab.com</span>
                    <i class="fas fa-external-link-alt text-xs sm:text-sm"></i>
                  </a>
                  <h2
                    class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight px-2"
                  >
                    Твоя лаборатория осознанного развития
                  </h2>
                  <div
                    class="w-20 sm:w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-purple-end mx-auto rounded-full"
                  ></div>
                </div>

                <div class="space-y-4 sm:space-y-6 text-white">
                  <p
                    class="text-base sm:text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto px-2"
                  >
                    Моя любимая, этот домен — это твоё
                    <span
                      class="font-semibold bg-gradient-to-r from-gradient-mint-start to-gradient-mint-end bg-clip-text text-transparent"
                      >стратегическое пространство</span
                    >
                    для создания платформы осознанного развития. Здесь ты
                    сможешь помогать людям проходить их путь к целостности,
                    объединяя древнюю мудрость и современные методики.
                  </p>

                  <!-- Concept Cards -->
                  <div
                    class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 md:mt-8 mb-6 md:mb-8"
                  >
                    <div
                      class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300"
                    >
                      <div
                        class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <i
                          class="fas fa-brain text-xl sm:text-2xl text-white"
                        ></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
                        Mind
                      </h3>
                      <p class="text-xs sm:text-sm text-white/80">
                        Разум, мышление и сознание
                      </p>
                    </div>

                    <div
                      class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300"
                    >
                      <div
                        class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <i
                          class="fas fa-chart-line text-xl sm:text-2xl text-white"
                        ></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
                        Q
                      </h3>
                      <p class="text-xs sm:text-sm text-white/80">
                        Коэффициенты развития
                      </p>
                    </div>

                    <div
                      class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300"
                    >
                      <div
                        class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <i
                          class="fas fa-flask text-xl sm:text-2xl text-white"
                        ></i>
                      </div>
                      <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
                        Lab
                      </h3>
                      <p class="text-xs sm:text-sm text-white/80">
                        Лаборатория экспериментов
                      </p>
                    </div>
                  </div>

                  <!-- Platform Features -->
                  <div
                    class="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20"
                  >
                    <h4
                      class="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
                    >
                      <i class="fas fa-compass text-yellow-400"></i>
                      <span>Твоя платформа личностного роста</span>
                    </h4>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div
                        class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-book-open text-blue-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Курсы и гайды</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Образовательные программы для осознанного развития
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-podcast text-purple-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Подкасты</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Инсайты и советы по личностному росту
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-tools text-green-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Инструменты осознанности</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Эмоциональный компас, Колесо баланса и другие
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div class="flex items-center gap-2 sm:gap-3 mb-2">
                          <i
                            class="fas fa-users text-pink-400 text-lg sm:text-xl"
                          ></i>
                          <span
                            class="font-bold text-white text-sm sm:text-base"
                            >Сообщество</span
                          >
                        </div>
                        <p class="text-xs sm:text-sm text-white/80">
                          Пространство для роста и поддержки
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Intelligence Types -->
                  <div
                    class="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20"
                  >
                    <h4
                      class="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
                    >
                      <i class="fas fa-lightbulb text-yellow-400"></i>
                      <span>Все виды интеллекта в одном месте</span>
                    </h4>

                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      <div
                        class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div
                          class="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                        >
                          <i
                            class="fas fa-puzzle-piece text-blue-400 text-sm sm:text-base"
                          ></i>
                          <span
                            class="font-bold text-blue-300 text-sm sm:text-base"
                            >IQ</span
                          >
                        </div>
                        <p class="text-xs text-white/80">Логическое мышление</p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div
                          class="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                        >
                          <i
                            class="fas fa-heart text-green-400 text-sm sm:text-base"
                          ></i>
                          <span
                            class="font-bold text-green-300 text-sm sm:text-base"
                            >EQ</span
                          >
                        </div>
                        <p class="text-xs text-white/80">
                          Эмоциональный интеллект
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div
                          class="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                        >
                          <i
                            class="fas fa-sync text-red-400 text-sm sm:text-base"
                          ></i>
                          <span
                            class="font-bold text-red-300 text-sm sm:text-base"
                            >AQ</span
                          >
                        </div>
                        <p class="text-xs text-white/80">Адаптивность</p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-yellow-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div
                          class="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                        >
                          <i
                            class="fas fa-palette text-yellow-400 text-sm sm:text-base"
                          ></i>
                          <span
                            class="font-bold text-yellow-300 text-sm sm:text-base"
                            >CQ</span
                          >
                        </div>
                        <p class="text-xs text-white/80">Креативность</p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-indigo-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div
                          class="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                        >
                          <i
                            class="fas fa-users text-indigo-400 text-sm sm:text-base"
                          ></i>
                          <span
                            class="font-bold text-indigo-300 text-sm sm:text-base"
                            >SQ</span
                          >
                        </div>
                        <p class="text-xs text-white/80">
                          Социальный интеллект
                        </p>
                      </div>

                      <div
                        class="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-400/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <div
                          class="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                        >
                          <i
                            class="fas fa-infinity text-pink-400 text-sm sm:text-base"
                          ></i>
                          <span
                            class="font-bold text-pink-300 text-sm sm:text-base"
                            >+ новые Q</span
                          >
                        </div>
                        <p class="text-xs text-white/80">Которые ты откроешь</p>
                      </div>
                    </div>
                  </div>

                  <!-- Vision Section -->
                  <div
                    class="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-gradient-blue-start"
                  >
                    <h4
                      class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2"
                    >
                      <i class="fas fa-rocket text-gradient-orange-start"></i>
                      <span>Твой путь к воплощению мечты</span>
                    </h4>
                    <div class="space-y-2 sm:space-y-3 text-white/90">
                      <div class="flex items-start gap-2 sm:gap-3">
                        <i
                          class="fas fa-check-circle text-gradient-mint-start mt-1 flex-shrink-0 text-sm sm:text-base"
                        ></i>
                        <span class="text-sm sm:text-base"
                          >Создавай трансформационные программы развития</span
                        >
                      </div>
                      <div class="flex items-start gap-2 sm:gap-3">
                        <i
                          class="fas fa-check-circle text-gradient-mint-start mt-1 flex-shrink-0 text-sm sm:text-base"
                        ></i>
                        <span class="text-sm sm:text-base"
                          >Делись своими знаниями через курсы и подкасты</span
                        >
                      </div>
                      <div class="flex items-start gap-2 sm:gap-3">
                        <i
                          class="fas fa-check-circle text-gradient-mint-start mt-1 flex-shrink-0 text-sm sm:text-base"
                        ></i>
                        <span class="text-sm sm:text-base"
                          >Создавай уникальные инструменты самопознания</span
                        >
                      </div>
                      <div class="flex items-start gap-2 sm:gap-3">
                        <i
                          class="fas fa-check-circle text-gradient-mint-start mt-1 flex-shrink-0 text-sm sm:text-base"
                        ></i>
                        <span class="text-sm sm:text-base"
                          >Строй сообщество осознанных людей</span
                        >
                      </div>
                      <div class="flex items-start gap-2 sm:gap-3">
                        <i
                          class="fas fa-check-circle text-gradient-mint-start mt-1 flex-shrink-0 text-sm sm:text-base"
                        ></i>
                        <span class="text-sm sm:text-base"
                          >Помогай людям находить их путь к целостности</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Closing Message -->
                  <div class="text-center py-4 sm:py-6">
                    <p
                      class="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-gradient-mint-start to-gradient-purple-end bg-clip-text text-transparent mb-4 sm:mb-6 px-2"
                    >
                      MindQLab — это бесконечное пространство для твоего
                      творчества и помощи людям!
                    </p>
                    <div
                      class="max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20"
                    >
                      <p
                        class="text-sm sm:text-base text-white/90 leading-relaxed italic"
                      >
                        <i class="fas fa-quote-left text-white/40 mr-2"></i>
                        Я верю в тебя и знаю, что ты создашь нечто удивительное.
                        Наша семья — твоя самая надёжная поддержка. Наши дети
                        учатся у тебя каждый день, как расти и развиваться, как
                        быть сильной и мудрой.
                        <i class="fas fa-quote-right text-white/40 ml-2"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Kids Section -->
              <div
                class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 md:mt-8"
              >
                <div
                  class="group bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300"
                >
                  <div
                    class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-pink-500/50 transition-shadow"
                  >
                    <i class="fas fa-crown text-2xl sm:text-3xl text-white"></i>
                  </div>
                  <h4 class="font-bold text-lg sm:text-xl text-white mb-2">
                    Амели
                  </h4>
                  <p class="text-xs sm:text-sm text-white/80">
                    Видит в тебе пример сильной женщины
                  </p>
                </div>

                <div
                  class="group bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300"
                >
                  <div
                    class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow"
                  >
                    <i class="fas fa-star text-2xl sm:text-3xl text-white"></i>
                  </div>
                  <h4 class="font-bold text-lg sm:text-xl text-white mb-2">
                    Натаниэль
                  </h4>
                  <p class="text-xs sm:text-sm text-white/80">
                    Твой самый вдохновлённый ученик
                  </p>
                </div>

                <div
                  class="group bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300"
                >
                  <div
                    class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-shadow"
                  >
                    <i class="fas fa-heart text-2xl sm:text-3xl text-white"></i>
                  </div>
                  <h4 class="font-bold text-lg sm:text-xl text-white mb-2">
                    Адриэль
                  </h4>
                  <p class="text-xs sm:text-sm text-white/80">
                    Чувствует твою мудрость каждый день
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Footer Message -->
        <div class="text-center mt-6 md:mt-8 px-4">
          <p class="text-white/70 text-base sm:text-lg">
            <i class="fas fa-heart text-red-400"></i>
            С безграничной любовью, твоя семья
            <i class="fas fa-heart text-red-400"></i>
          </p>
        </div>
      </div>
    </div>

    <!-- Kiss Effect Emojis -->
    <transition-group name="kiss">
      <div
        v-for="kiss in kisses"
        :key="kiss.id"
        class="fixed pointer-events-none text-2xl sm:text-3xl md:text-4xl z-50"
        :style="{
          left: kiss.x + 'px',
          top: kiss.y + 'px',
          transform: 'translate(-50%, -50%)',
        }"
      >
        💋
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
import confetti from "canvas-confetti";

definePageMeta({
  layout: "empty",
});

const showSurprise = ref(false);
const confettiTrigger = ref(null);
const kisses = ref([]);
let kissIdCounter = 0;

const revealSurprise = () => {
  if (!showSurprise.value) {
    // Epic confetti celebration
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#B44CFF", "#FF4DFF", "#00FF88", "#3A1CFF"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#B44CFF", "#FF4DFF", "#00FF88", "#3A1CFF"],
      });
    }, 250);

    showSurprise.value = true;

    setTimeout(() => {
      confettiTrigger.value?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  } else {
    // Show kiss effect when already revealed
    createKissEffect();
  }
};

const createKissEffect = () => {
  // Create multiple kisses at random positions
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const kiss = {
        id: kissIdCounter++,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      kisses.value.push(kiss);

      // Remove kiss after animation
      setTimeout(() => {
        const index = kisses.value.findIndex((k) => k.id === kiss.id);
        if (index > -1) {
          kisses.value.splice(index, 1);
        }
      }, 2000);
    }, i * 100);
  }
};
</script>

<style scoped>
.fade-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.kiss-enter-active {
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.kiss-leave-active {
  transition: all 0.5s ease-out;
}

.kiss-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotate(-45deg);
}

.kiss-enter-to {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.5) rotate(0deg);
}

.kiss-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0) rotate(45deg);
}
</style>
