<template>
  <div class="relative min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-1">
      <div class="absolute top-0 left-0 w-full h-full bg-[#1A1F35]">
        <!-- Gradient Orbs -->
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

    <div class="container mx-auto px-4 max-w-7xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <ScrollGlowSection>
        <header
          class="relative text-center mb-12 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-12 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <div class="relative z-10">
            <h1
              class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
            >
              О проекте
            </h1>
            <p
              class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Добро пожаловать в пространство осознанного развития и личностного
              роста. Здесь каждый шаг ведёт к более глубокому пониманию себя и
              гармонии с миром.
            </p>
          </div>
        </header>
      </ScrollGlowSection>

      <!-- Personal Biography Section -->
      <ScrollGlowSection>
        <section
          class="relative overflow-hidden bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 sm:p-12 mb-12 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <div class="grid md:grid-cols-2 gap-12">
            <div class="space-y-6">
              <div
                class="px-4 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full text-[#0EA5E9] font-medium inline-block"
              >
                Основатель проекта
              </div>
              <div class="space-y-6 text-slate-300">
                <p>
                  Здравствуйте! Меня зовут Анастасия, и я рада приветствовать
                  вас в пространстве осознанного развития...
                </p>
                <p>
                  Мой подход основан на синтезе современной психологии,
                  практических методик развития и многолетнего опыта работы с
                  людьми...
                </p>
                <p>
                  Приглашаю вас в путешествие к лучшей версии себя, где каждый
                  шаг наполнен осознанностью и пониманием.
                </p>
              </div>
              <!-- Social Media Links -->
              <div class="flex gap-4 mt-8">
                <a href="#" class="group relative p-3" target="_blank">
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                  <i
                    class="fab fa-linkedin text-xl relative z-10 text-[#F59E0B] group-hover:text-white transition-all duration-300 group-hover:scale-110"
                  ></i>
                </a>
                <a href="#" class="group relative p-3" target="_blank">
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                  <i
                    class="fab fa-instagram text-xl relative z-10 text-[#F59E0B] group-hover:text-white transition-all duration-300 group-hover:scale-110"
                  ></i>
                </a>
              </div>
            </div>
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-[#E879F9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <img
                src="/assets/images/profile.jpg"
                alt="Анастасия"
                class="w-full h-[500px] object-cover rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-2"
              />
            </div>
          </div>
        </section>
      </ScrollGlowSection>

      <!-- Offerings Section -->
      <section class="mb-16">
        <h2
          class="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-12"
        >
          Что вы найдете здесь?
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <ScrollGlowSection
            v-for="(offering, index) in offerings"
            :key="offering.title"
          >
            <div
              class="group relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl p-8 border border-[#0EA5E9]/20 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] transition-all duration-300"
            >
              <div class="flex gap-6">
                <div
                  class="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl"
                  :class="[
                    index % 3 === 0
                      ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]'
                      : index % 3 === 1
                      ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                      : 'bg-[#E879F9]/10 text-[#E879F9]',
                  ]"
                >
                  <i :class="offering.icon" class="text-2xl"></i>
                </div>
                <div>
                  <h3
                    class="text-xl font-semibold text-white/90 mb-3"
                    :class="[
                      index % 3 === 0
                        ? 'text-[#0EA5E9]'
                        : index % 3 === 1
                        ? 'text-[#F59E0B]'
                        : 'text-[#E879F9]',
                    ]"
                  >
                    {{ offering.title }}
                  </h3>
                  <p class="text-slate-300">{{ offering.description }}</p>
                </div>
              </div>
            </div>
          </ScrollGlowSection>
        </div>
      </section>

      <!-- Call to Action -->
      <ScrollGlowSection>
        <section
          class="relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-12 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <div class="relative z-10">
            <h2
              class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
            >
              Начните свое путешествие к гармонии сегодня
            </h2>
            <p class="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к нашему сообществу и откройте для себя новые
              горизонты развития
            </p>

            <NuxtLink
              to="/courses/courses"
              class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group"
            >
              <span
                class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
              >
                <i class="fas fa-book-open"></i>
              </span>
              <span
                class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
              >
                Перейти к курсам
              </span>
              <span class="relative invisible">Перейти к курсам</span>
            </NuxtLink>
          </div>
        </section>
      </ScrollGlowSection>
    </div>
  </div>
</template>

<script setup>
import ScrollGlowSection from "~/components/ui/ScrollGlowSection.vue";

const offerings = [
  {
    title: "Курсы по личностному развитию",
    description:
      "Структурированные программы, разработанные экспертами, для достижения максимальной эффективности в личностном росте и развитии профессиональных навыков.",
    icon: "fas fa-graduation-cap",
  },
  {
    title: "Гайды для улучшения отношений",
    description:
      "Комплексные руководства, основанные на современных исследованиях психологии, для создания и укрепления глубоких, осознанных отношений.",
    icon: "fas fa-heart",
  },
  {
    title: "Рабочие тетради для самоанализа",
    description:
      "Профессионально разработанные инструменты для глубокого самопознания, включающие практические упражнения и техники рефлексии.",
    icon: "fas fa-book",
  },
  {
    title: "Поддерживающие сообщества",
    description:
      "Активное сообщество единомышленников, где вы найдете поддержку, обмен опытом и возможности для нетворкинга с людьми схожих интересов.",
    icon: "fas fa-users",
  },
];
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
</style>
