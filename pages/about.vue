<template>
  <div class="relative min-h-screen">
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

    <div class="container mx-auto px-4 max-w-7xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <header
        class="relative text-center mb-12 bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-12"
      >
        <div class="relative z-10">
          <h1
            class="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 tracking-tight mb-6"
          >
            О проекте
          </h1>
          <p
            class="text-lg sm:text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            Добро пожаловать в пространство осознанного развития и личностного
            роста. Здесь каждый шаг ведёт к более глубокому пониманию себя и
            гармонии с миром.
          </p>
        </div>
      </header>

      <!-- Personal Biography Section -->
      <section
        class="relative group overflow-hidden bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-8 sm:p-12 mb-12"
      >
        <div class="grid md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <div
              class="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-200 font-medium inline-block"
            >
              Основатель проекта
            </div>
            <div class="space-y-6 text-indigo-200/80">
              <p>
                Здравствуйте! Меня зовут Анастасия, и я рада приветствовать вас
                в пространстве осознанного развития...
              </p>
              <p>
                Мой подход основан на синтезе современной психологии,
                практических методик развития и многолетнего опыта работы с
                людьми...
              </p>
              <p>
                Приглашаю вас в путешествие к лучшей версии себя, где каждый шаг
                наполнен осознанностью и пониманием.
              </p>
            </div>
            <div class="flex gap-4 mt-8">
              <a
                href="#"
                class="text-indigo-300 hover:text-white transition-colors duration-300"
              >
                <i class="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="#"
                class="text-indigo-300 hover:text-white transition-colors duration-300"
              >
                <i class="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <img
              src="/assets/images/profile.jpg"
              alt="Анастасия"
              class="w-full h-[500px] object-cover rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-2"
            />
          </div>
        </div>
      </section>

      <!-- Offerings Section -->
      <section class="mb-16">
        <h2
          class="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 tracking-tight mb-12"
        >
          Что вы найдете здесь?
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="offering in offerings"
            :key="offering.title"
            class="group relative bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl p-8 border border-indigo-500/20 hover:shadow-xl transition-all duration-500"
          >
            <div class="flex gap-6">
              <div
                class="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-200"
              >
                <i :class="offering.icon" class="text-2xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-white/90 mb-3">
                  {{ offering.title }}
                </h3>
                <p class="text-indigo-200/80">{{ offering.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="relative bg-gradient-to-b from-[#1E1B4B]/40 to-[#1E1B4B]/60 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-12 text-center"
      >
        <div class="relative z-10">
          <h2
            class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 tracking-tight mb-6"
          >
            Начните свое путешествие к гармонии сегодня
          </h2>
          <p class="text-lg text-indigo-200/80 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к нашему сообществу и откройте для себя новые
            горизонты развития
          </p>
          <NuxtLink
            to="/courses/courses"
            class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
          >
            Перейти к курсам
            <i class="fas fa-arrow-right ml-2"></i>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
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
</style>
