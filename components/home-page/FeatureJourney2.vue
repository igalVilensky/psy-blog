<template>
  <section class="py-24 bg-surface-50 overflow-hidden">
    <div class="container mx-auto px-6">
      
      <div class="text-center mb-20">
        <h2 class="text-3xl md:text-4xl font-extrabold text-brand-dark mb-6 font-montserrat">
          Ваш путь в <span class="text-brand-primary">MindQLab</span>
        </h2>
        <p class="text-stone-500 max-w-2xl mx-auto">
          Простая и понятная траектория движения к осознанности и результатам.
        </p>
      </div>

      <div class="relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden lg:block absolute top-[64px] left-[10%] right-[10%] h-[2px] z-0 dashed-line"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          
          <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center text-center group">
            <!-- Step Circle -->
            <div class="relative w-32 h-32 mb-8 cursor-pointer">
               <!-- Rotating border on hover -->
               <div class="absolute inset-0 rounded-full border-2 border-dashed border-stone-200 group-hover:border-brand-primary/50 group-hover:rotate-180 transition-all duration-700 ease-in-out"></div>
               
               <div class="absolute inset-2 bg-white rounded-full shadow-lg shadow-stone-100 flex items-center justify-center group-hover:scale-90 transition-transform duration-300">
                  <i :class="`${step.icon} text-3xl ${step.color} group-hover:scale-125 transition-transform duration-300`"></i>
               </div>

               <!-- Badge -->
               <div class="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
                 {{ index + 1 }}
               </div>
            </div>

            <h3 class="text-xl font-bold text-brand-dark mb-3 font-montserrat">{{ step.title }}</h3>
            <p class="text-sm text-stone-500 mb-6 leading-relaxed px-2">
              {{ step.desc }}
            </p>
            
            <NuxtLink :to="step.link" :class="`text-sm font-bold ${step.color} hover:opacity-80 flex items-center gap-2 transition-all group-hover:translate-x-1`">
              {{ step.cta }} <i class="fas fa-chevron-right text-xs"></i>
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { title: 'Начните', desc: 'Пройдите базовый тест личности, чтобы определить точку А.', icon: 'fas fa-flag', color: 'text-brand-primary', cta: 'Выбрать тест', link: '/lab/tests' },
  { title: 'Растите', desc: 'Используйте инструменты тренировки мозга и практики.', icon: 'fas fa-seedling', color: 'text-brand-secondary', cta: 'К упражнениям', link: '/lab/brain-training' },
  { title: 'Поймите', desc: 'Анализируйте отчеты и читайте экспертные материалы.', icon: 'fas fa-lightbulb', color: 'text-brand-accent', cta: 'Читать блог', link: '/blog' },
  { title: 'Общайтесь', desc: 'Делитесь успехами и находите поддержку в сообществе.', icon: 'fas fa-handshake', color: 'text-emerald-500', cta: 'Вступить', link: '/lab/community' }
]
</script>

<style scoped>
.dashed-line {
  background-image: linear-gradient(to right, transparent 50%, #e7e5e4 50%);
  background-size: 20px 100%;
  background-color: transparent;
  height: 2px;
}
</style>