<template>
  <div class="min-h-screen bg-surface-50 dark:bg-brand-dark text-stone-800 dark:text-stone-200 overflow-hidden transition-colors duration-500 relative selection:bg-brand-primary/30 selection:text-brand-dark">
    
    <!-- Masterpiece Background Elements -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <!-- Ambient Orbs -->
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
      <div class="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
      <div class="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen"></div>
      
      <!-- Noise Texture -->
      <div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto  px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
      
      <!-- Hero Section -->
      <section class="text-center mb-24 lg:mb-32">
        <div class="flex flex-col items-center">
          
          <!-- Interactive Petri Dish (Redesigned) -->
          <div class="relative mb-12 group cursor-pointer perspective-1000" @mouseenter="labActive = true" @mouseleave="labActive = false">
             <!-- Outer Glow -->
             <div class="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
             
             <!-- The Dish -->
             <div class="relative w-32 h-32 md:w-40 md:h-40 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
                
                <!-- Fluid Gradient Inside -->
                <div class="absolute inset-0 bg-gradient-to-br from-brand-secondary/80 to-brand-accent/80 opacity-90 transition-all duration-500 group-hover:opacity-100"></div>
                
                <!-- Spinning Rings -->
                <div class="absolute inset-3 border border-white/30 rounded-full animate-spin-slow"></div>
                <div class="absolute inset-6 border border-white/20 rounded-full animate-spin-slow" style="animation-direction: reverse; animation-duration: 15s;"></div>

                <!-- Icon -->
                <i class="fas fa-flask text-white text-5xl md:text-6xl relative z-10 drop-shadow-md transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"></i>

                <!-- Particles -->
                <div class="absolute inset-0 pointer-events-none">
                  <div v-for="i in 8" :key="i" class="particle" :style="getParticleStyle(i)"></div>
                </div>
             </div>

             <!-- Floating Badges -->
             <div class="absolute -top-2 -right-10 bg-white dark:bg-stone-800 shadow-glass border border-stone-100 dark:border-stone-700 px-3 py-1.5 rounded-full text-xs font-bold text-brand-secondary flex items-center gap-1 animate-float">
                <i class="fas fa-atom"></i> Научно
             </div>
             <div class="absolute -bottom-2 -left-10 bg-white dark:bg-stone-800 shadow-glass border border-stone-100 dark:border-stone-700 px-3 py-1.5 rounded-full text-xs font-bold text-brand-primary flex items-center gap-1 animate-float-delayed">
                <i class="fas fa-magic"></i> Магия
             </div>
          </div>

          <!-- Title -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-full mb-6 animate-fade-up">
            <span class="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
            <span class="text-xs font-bold text-brand-secondary uppercase tracking-widest font-montserrat">О проекте MindQ Lab</span>
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-dark dark:text-white mb-8 font-montserrat tracking-tight leading-tight animate-fade-up animation-delay-100">
            Лаборатория <br class="md:hidden" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-orange-500 to-brand-secondary">осознанного роста</span>
          </h1>

          <p class="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed font-open-sans animate-fade-up animation-delay-200">
            Мы объединили академическую психологию, нейронауки и передовые технологии, чтобы создать пространство, где исследование себя становится захватывающим путешествием.
          </p>
        </div>
      </section>

      <!-- Mission Grid (Bento Style) -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24 animate-fade-up animation-delay-300">
        
        <!-- Mission Statement (Large) -->
        <div class="lg:col-span-8 bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/50 dark:border-stone-700 shadow-glass relative overflow-hidden group">
           <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-secondary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
           
           <div class="relative z-10">
              <div class="w-16 h-16 rounded-2xl bg-brand-dark text-white flex items-center justify-center text-3xl mb-8 shadow-lg shadow-brand-dark/20">
                 <i class="fas fa-bullseye"></i>
              </div>
              <h2 class="text-3xl font-bold text-brand-dark dark:text-white mb-6 font-montserrat">Наша Миссия</h2>
              <p class="text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
                 Сделать профессиональные инструменты самопознания доступными для каждого. Мы создаем безопасную цифровую среду, где вы можете исследовать архитектуру своей личности без сложных терминов и скучных тестов.
              </p>
           </div>
        </div>

        <!-- Stats Column -->
        <div class="lg:col-span-4 flex flex-col gap-6">
           <div class="flex-1 bg-brand-primary/10 dark:bg-brand-primary/20 backdrop-blur-md rounded-[2rem] p-8 border border-brand-primary/20 flex flex-col justify-center items-center text-center group hover:bg-brand-primary/20 transition-colors">
              <div class="text-5xl font-extrabold text-brand-primary mb-2 font-montserrat group-hover:scale-110 transition-transform duration-300">12+</div>
              <div class="text-sm font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider">Научных методик</div>
           </div>
           <div class="flex-1 bg-brand-secondary/10 dark:bg-brand-secondary/20 backdrop-blur-md rounded-[2rem] p-8 border border-brand-secondary/20 flex flex-col justify-center items-center text-center group hover:bg-brand-secondary/20 transition-colors">
              <div class="text-5xl font-extrabold text-brand-secondary mb-2 font-montserrat group-hover:scale-110 transition-transform duration-300">15k+</div>
              <div class="text-sm font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider">Пользователей</div>
           </div>
        </div>
      </section>

      <!-- Approach Section -->
      <section class="mb-24">
        <div class="text-center mb-16">
           <h2 class="text-3xl md:text-5xl font-extrabold text-brand-dark dark:text-white mb-6 font-montserrat">
             Экосистема <span class="text-brand-accent">MindQ</span>
           </h2>
           <p class="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
             Комплексный подход к развитию, где каждый элемент усиливает другой.
           </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div v-for="(feature, idx) in features" :key="idx" class="group bg-white dark:bg-stone-900 rounded-[2rem] p-8 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div :class="`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`">
                 <i :class="feature.icon"></i>
              </div>
              <h3 class="text-xl font-bold text-brand-dark dark:text-white mb-3 font-montserrat">{{ feature.title }}</h3>
              <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                 {{ feature.description }}
              </p>
           </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="mb-24">
         <div class="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
            <div>
               <h2 class="text-3xl md:text-5xl font-extrabold text-brand-dark dark:text-white mb-4 font-montserrat">Команда</h2>
               <p class="text-stone-500 dark:text-stone-400 max-w-md">Люди, которые стоят за технологиями и наукой MindQ Lab.</p>
            </div>
            <div class="hidden md:block h-px flex-1 bg-stone-200 dark:bg-stone-800 mx-8 mb-2"></div>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Team Member 1 -->
            <div class="group relative bg-white dark:bg-stone-900 rounded-[2.5rem] p-2 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-500">
               <div class="flex flex-col sm:flex-row h-full">
                  <!-- Image -->
                  <div class="w-full sm:w-2/5 aspect-square sm:aspect-auto relative rounded-[2rem] overflow-hidden">
                     <img src="/assets/images/profile.jpg" alt="Анастасия Виленская" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                     <div class="absolute inset-0 bg-brand-accent/20 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
                  </div>
                  
                  <!-- Content -->
                  <div class="w-full sm:w-3/5 p-8 flex flex-col justify-center">
                     <div class="inline-flex self-start px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-bold uppercase tracking-wider mb-4">
                        Психология
                     </div>
                     <h3 class="text-2xl font-bold text-brand-dark dark:text-white mb-1 font-montserrat">Анастасия Виленская</h3>
                     <p class="text-sm font-semibold text-stone-400 mb-6">Head of Content & Psychology</p>
                     <p class="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-6">
                        Отвечает за научную валидность методик и создание психологического контента. Объединяет классическую теорию с современными практиками.
                     </p>
                     <div class="flex gap-3">
                        <a href="#" class="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:bg-brand-secondary hover:text-white transition-colors">
                           <i class="fab fa-linkedin-in text-xs"></i>
                        </a>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Team Member 2 -->
            <div class="group relative bg-white dark:bg-stone-900 rounded-[2.5rem] p-2 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-500">
               <div class="flex flex-col sm:flex-row h-full">
                  <div class="w-full sm:w-2/5 aspect-square sm:aspect-auto relative rounded-[2rem] overflow-hidden">
                     <img src="/assets/images/igal.avif" alt="Игаль Виленский" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                     <div class="absolute inset-0 bg-brand-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
                  </div>
                  
                  <div class="w-full sm:w-3/5 p-8 flex flex-col justify-center">
                     <div class="inline-flex self-start px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Technology
                     </div>
                     <h3 class="text-2xl font-bold text-brand-dark dark:text-white mb-1 font-montserrat">Игаль Виленский</h3>
                     <p class="text-sm font-semibold text-stone-400 mb-6">Tech Lead & Founder</p>
                     <p class="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-6">
                        Архитектор платформы. Превращает сложные психологические алгоритмы в интуитивный и увлекательный цифровой опыт.
                     </p>
                     <div class="flex gap-3">
                        <a href="#" class="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:bg-brand-primary hover:text-white transition-colors">
                           <i class="fab fa-linkedin-in text-xs"></i>
                        </a>
                        <a href="#" class="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:bg-brand-dark hover:text-white transition-colors">
                           <i class="fab fa-github text-xs"></i>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- CTA Section -->
      <section class="relative rounded-[3rem] overflow-hidden">
         <div class="absolute inset-0 bg-brand-dark">
            <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-secondary/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
            <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
         </div>

         <div class="relative z-10 px-8 py-20 md:py-24 text-center">
            <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-6 font-montserrat">Готовы к открытию?</h2>
            <p class="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
               Присоединяйтесь к MindQ Lab сегодня. Пройдите свой первый тест и получите персональную карту развития.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <NuxtLink to="/lab/tests" class="px-10 py-5 bg-white text-brand-dark rounded-2xl font-bold text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-brand-primary/30 transform hover:-translate-y-1">
                  Начать исследование
               </NuxtLink>
               <NuxtLink to="/courses" class="px-10 py-5 bg-transparent border-2 border-stone-600 text-white rounded-2xl font-bold text-lg hover:border-white hover:bg-white/5 transition-all duration-300">
                  Смотреть курсы
               </NuxtLink>
            </div>
         </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@unhead/vue";

const labActive = ref(false);

const getParticleStyle = (i) => {
  const delay = i * 0.5;
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  return `top: ${top}%; left: ${left}%; animation-delay: ${delay}s;`;
};

// Features Data
const features = [
  {
    icon: "fas fa-brain",
    title: "Нейронауки",
    description: "Методики, основанные на пластичности мозга и когнитивных исследованиях.",
    bg: "bg-brand-secondary/10 text-brand-secondary"
  },
  {
    icon: "fas fa-gamepad",
    title: "Геймификация",
    description: "Превращаем саморазвитие в увлекательную игру с достижениями и уровнями.",
    bg: "bg-brand-primary/10 text-brand-primary"
  },
  {
    icon: "fas fa-fingerprint",
    title: "Персонализация",
    description: "Адаптивные алгоритмы подстраивают контент под ваш психотип.",
    bg: "bg-brand-accent/10 text-brand-accent"
  }
];

// SEO metadata
useHead({
  title: "О нас | MindQ Lab",
  meta: [
    { name: "description", content: "MindQ Lab — инновационная платформа для исследования сознания и личностного роста." },
  ],
});

definePageMeta({
  layout: "index2",
});

</script>

<style scoped>
/* Custom Particle Animation for Petri Dish */
@keyframes floatParticle {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
  50% { transform: translate(var(--tx, 10px), var(--ty, -20px)) scale(1.5); opacity: 0.8; }
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: floatParticle 3s infinite ease-in-out;
}

.particle:nth-child(odd) { --tx: 15px; --ty: -15px; }
.particle:nth-child(even) { --tx: -10px; --ty: -25px; }

.perspective-1000 {
  perspective: 1000px;
}
</style>