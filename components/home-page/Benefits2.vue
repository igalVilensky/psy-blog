<template>
  <section class="py-24 bg-white relative">
    <div class="container mx-auto px-6">
       <!-- Section Header -->
       <div class="text-center max-w-3xl mx-auto mb-20">
          <h2 class="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6 font-montserrat tracking-tight">
            Путь к <span class="relative inline-block text-brand-primary">лучшей версии себя</span>
          </h2>
          <p class="text-stone-500 text-lg leading-relaxed font-open-sans">
            Мы объединили науку и технологии, чтобы создать пространство, где развитие становится естественным процессом.
          </p>
       </div>

       <!-- Benefits Grid -->
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div v-for="(item, index) in benefits" :key="index" 
               class="group p-8 rounded-[2rem] bg-surface-50 border border-surface-100 hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 hover:border-transparent transition-all duration-500 ease-out hover:-translate-y-2">
             
             <!-- Icon Container -->
             <div :class="`w-16 h-16 rounded-2xl ${item.bgClass} flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`">
                <i :class="`${item.icon} ${item.textClass}`"></i>
             </div>
             
             <h3 class="text-xl font-bold text-stone-900 mb-3 font-montserrat">{{ item.title }}</h3>
             <p class="text-stone-500 text-sm leading-7 font-open-sans">
               {{ item.description }}
             </p>
          </div>

       </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  {
    icon: 'fas fa-microscope',
    title: 'Научный подход',
    description: 'Только проверенные психологические методики и валидные тесты.',
    bgClass: 'bg-amber-50',
    textClass: 'text-brand-primary'
  },
  {
    icon: 'fas fa-chart-pie',
    title: 'Глубокий анализ',
    description: 'Детальная расшифровка результатов с понятными объяснениями.',
    bgClass: 'bg-sky-50',
    textClass: 'text-brand-secondary'
  },
  {
    icon: 'fas fa-road',
    title: 'Личный трек',
    description: 'Индивидуальная карта развития, подстраивающаяся под ваши цели.',
    bgClass: 'bg-indigo-50',
    textClass: 'text-brand-accent'
  },
  {
    icon: 'fas fa-users',
    title: 'Поддержка',
    description: 'Сообщество единомышленников, готовых поделиться опытом.',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-500'
  }
]
</script>