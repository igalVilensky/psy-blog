<template>
  <div class="relative min-h-screen">
    <div class="container mx-auto max-w-6xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <ScrollGlowSection>
        <header
          class="relative text-center mb-12 bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-12 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <div class="relative z-10">
            <h1
              class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
            >
              О проекте
            </h1>
            <p
              class="sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
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
          class="relative overflow-hidden bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-[#0EA5E9]/20 py-6 sm:p-12 mb-12 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <div class="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div class="space-y-6 px-6">
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
                class="w-full sm:h-[400px] object-cover sm:rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-2"
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
              class="group relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl p-6 sm:p-8 border border-[#0EA5E9]/20 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)] transition-all duration-300"
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
          class="relative bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl sm:rounded-2xl border border-[#0EA5E9]/20 p-6 sm:p-12 text-center transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
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

            <Button
              to="/courses/courses"
              text="Перейти к курсам"
              iconClass="fas fa-book-open"
              gradientStart="#9B4DFF"
              gradientEnd="#00B0FF"
              textColor="#FFF"
              customClass=" bg-gradient-to-r from-purple-500 to-cyan-500 border-[#FFF]"
              isLink="true"
              isClickable="true"
            />
          </div>
        </section>
      </ScrollGlowSection>
    </div>
  </div>
</template>

<script setup>
import ScrollGlowSection from "~/components/ui/ScrollGlowSection.vue";
import Button from "~/components/base/Button.vue";

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
