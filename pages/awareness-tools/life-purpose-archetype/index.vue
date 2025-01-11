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

    <div class="container mx-auto px-4 max-w-4xl relative z-10 pb-12 pt-12">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1
          class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] tracking-tight mb-6"
        >
          Откройте Ваше Истинное Предназначение
        </h1>
        <p
          class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Погрузитесь в глубокое исследование архетипов вашей личности и
          раскройте истинную цель вашей жизни через трансформационный процесс
          самопознания.
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="startAssessment"
            class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 group-hover:translate-x-0 ease"
            >
              <i class="fas fa-play"></i>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:translate-x-full ease"
            >
              Начать исследование
            </span>
            <span class="relative invisible">Начать исследование</span>
          </button>
          <button
            @click="showInfo"
            class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group bg-white/10 border border-[#0EA5E9]/20"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-[#0EA5E9] duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9]/10 to-[#22D3EE]/10 group-hover:translate-x-0 ease"
            ></span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              Узнать больше
            </span>
            <span class="relative invisible">Узнать больше</span>
          </button>
        </div>
      </section>

      <!-- Features Section -->
      <section class="grid md:grid-cols-2 gap-8 mb-12">
        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <h2
            class="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-4"
          >
            Для личного развития
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-[#0EA5E9] mr-2">✦</span>
              <span class="text-slate-300"
                >Раскройте глубинные темы и роли вашей жизни</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-[#0EA5E9] mr-2">✦</span>
              <span class="text-slate-300"
                >Поймите свои природные таланты и предназначение</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-[#0EA5E9] mr-2">✦</span>
              <span class="text-slate-300"
                >Получите руководство для важных жизненных решений</span
              >
            </li>
          </ul>
        </div>

        <div
          class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
        >
          <h2
            class="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-4"
          >
            Для экспертов
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-[#0EA5E9] mr-2">✦</span>
              <span class="text-slate-300"
                >Помогайте клиентам найти их истинное призвание</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-[#0EA5E9] mr-2">✦</span>
              <span class="text-slate-300"
                >Используйте глубинные инсайты в коучинге</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-[#0EA5E9] mr-2">✦</span>
              <span class="text-slate-300"
                >Создавайте индивидуальные планы развития</span
              >
            </li>
          </ul>
        </div>
      </section>

      <!-- Process Section -->
      <section
        class="bg-gradient-to-b from-[#1A1F35]/40 to-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-[#0EA5E9]/20 p-8 mb-12 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
      >
        <h2
          class="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] mb-8"
        >
          Процесс исследования
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div
              class="w-12 h-12 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0EA5E9]/20"
            >
              <span class="text-[#0EA5E9] font-bold">1</span>
            </div>
            <h3 class="font-semibold mb-2 text-slate-300">Глубокая оценка</h3>
            <p class="text-slate-300">
              Ответьте на тщательно разработанные вопросы о вашей личности
            </p>
          </div>
          <div class="text-center">
            <div
              class="w-12 h-12 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0EA5E9]/20"
            >
              <span class="text-[#0EA5E9] font-bold">2</span>
            </div>
            <h3 class="font-semibold mb-2 text-slate-300">Анализ архетипов</h3>
            <p class="text-slate-300">
              Получите подробный анализ ваших ключевых архетипов
            </p>
          </div>
          <div class="text-center">
            <div
              class="w-12 h-12 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0EA5E9]/20"
            >
              <span class="text-[#0EA5E9] font-bold">3</span>
            </div>
            <h3 class="font-semibold mb-2 text-slate-300">Практические шаги</h3>
            <p class="text-slate-300">
              Узнайте, как применить эти знания в жизни
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const startAssessment = () => {
  router.push("/awareness-tools/life-purpose-archetype/assessment");
};

const showInfo = () => {
  router.push("/awareness-tools/life-purpose-archetype/explanation");
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
</style>
