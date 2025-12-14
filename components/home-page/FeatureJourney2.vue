<template>
  <section id="how-it-works" class="py-24 bg-stone-50 dark:bg-stone-800 overflow-hidden transition-colors duration-300">
    <div class="container mx-auto px-6">
      
      <div class="text-center mb-20">
        <h2 class="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white mb-6 font-montserrat transition-colors duration-300">
          Ваш путь в <span class="text-brand-primary">MindQLab</span>
        </h2>
        <p class="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto transition-colors duration-300">
          Простая и понятная траектория движения к осознанности и результатам.
        </p>
      </div>

      <div class="relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden lg:block absolute top-[64px] left-[10%] right-[10%] h-[2px] z-0 bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-600 to-transparent"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          
          <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center text-center group">
            <!-- Step Circle -->
            <div class="relative w-32 h-32 mb-8 cursor-pointer">
               <!-- Static border -->
               <div class="absolute inset-0 rounded-full border-2 border-dashed border-stone-300 dark:border-stone-600 group-hover:border-brand-primary/50 dark:group-hover:border-brand-primary/50 transition-colors duration-300"></div>
               
               <div class="absolute inset-2 bg-white dark:bg-stone-900 rounded-full shadow-lg shadow-stone-200/50 dark:shadow-stone-900/50 flex items-center justify-center group-hover:scale-95 transition-all duration-300 border border-stone-100 dark:border-stone-700">
                  <i :class="`${step.icon} text-3xl ${step.color} group-hover:scale-125 transition-transform duration-300`"></i>
               </div>

               <!-- Badge -->
               <div class="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-brand-dark dark:bg-brand-primary text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white dark:border-stone-800 transition-colors duration-300">
                 {{ index + 1 }}
               </div>
            </div>

            <h3 class="text-xl font-bold text-stone-900 dark:text-white mb-3 font-montserrat transition-colors duration-300">{{ step.title }}</h3>
            <p class="text-sm text-stone-600 dark:text-stone-300 mb-6 leading-relaxed px-2 transition-colors duration-300">
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