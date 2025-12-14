<template>
  <section class="py-24 bg-stone-50 dark:bg-stone-800 overflow-hidden transition-colors duration-300">
    <div class="container mx-auto px-6">
       
       <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white mb-6 font-montserrat transition-colors duration-300">
            Нам <span class="text-brand-primary">доверяют</span>
          </h2>
          <p class="text-stone-600 dark:text-stone-300 text-lg transition-colors duration-300">
            Присоединяйтесь к тысячам людей, которые уже меняют свою жизнь.
          </p>
       </div>

       <!-- Testimonials -->
       <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div v-for="(review, i) in reviews" :key="i" class="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-700 relative hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
             <i class="fas fa-quote-right absolute top-8 right-8 text-stone-100 dark:text-stone-800 text-4xl transition-colors duration-300"></i>
             <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden flex items-center justify-center text-stone-500 dark:text-stone-400 font-bold transition-colors duration-300">
                   <i class="fas fa-user"></i>
                </div>
                <div>
                   <div class="font-bold text-stone-900 dark:text-white font-montserrat transition-colors duration-300">{{ review.name }}</div>
                   <div class="text-xs text-stone-400 dark:text-stone-500 uppercase transition-colors duration-300">{{ review.role }}</div>
                </div>
             </div>
             <p class="text-stone-600 dark:text-stone-300 italic leading-relaxed relative z-10 font-open-sans transition-colors duration-300">
               "{{ review.text }}"
             </p>
             <div class="mt-6 flex text-amber-400 text-sm">
                <i v-for="n in 5" :key="n" class="fas fa-star"></i>
             </div>
          </div>
       </div>

       <!-- Stats Bar -->
       <div class="relative bg-brand-dark dark:bg-stone-950 rounded-[2.5rem] p-10 md:p-16 overflow-hidden shadow-2xl shadow-stone-400/20 dark:shadow-black/50 transition-colors duration-300">
          <div class="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 dark:bg-brand-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
             <div>
                <div class="text-4xl md:text-5xl font-extrabold text-white mb-2 font-montserrat">15k+</div>
                <div class="text-stone-400 dark:text-stone-500 text-sm font-bold uppercase tracking-widest transition-colors duration-300">Пользователей</div>
             </div>
             <div class="hidden md:block w-px h-16 bg-stone-800 dark:bg-stone-700"></div>
             <div>
                <div class="text-4xl md:text-5xl font-extrabold text-brand-primary mb-2 font-montserrat">500+</div>
                <div class="text-stone-400 dark:text-stone-500 text-sm font-bold uppercase tracking-widest transition-colors duration-300">Материалов</div>
             </div>
             <div class="hidden md:block w-px h-16 bg-stone-800 dark:bg-stone-700"></div>
             <div>
                <div class="text-4xl md:text-5xl font-extrabold text-brand-secondary mb-2 font-montserrat">24/7</div>
                <div class="text-stone-400 dark:text-stone-500 text-sm font-bold uppercase tracking-widest transition-colors duration-300">Доступ</div>
             </div>
             <div class="mt-6 md:mt-0">
                <NuxtLink to="/register" class="inline-block px-10 py-5 bg-white dark:bg-brand-primary text-brand-dark dark:text-white font-extrabold rounded-2xl hover:bg-stone-200 dark:hover:bg-amber-600 transition-all shadow-lg hover:scale-105 transform duration-200">
                   Присоединиться
                </NuxtLink>
             </div>
          </div>
       </div>

    </div>
  </section>
</template>

<script setup>
const reviews = [
  { name: 'Елена В.', role: 'Пользователь', text: 'Удивительно, как простые упражнения могут так сильно повлиять на продуктивность. Я стала намного спокойнее.' },
  { name: 'Анна К.', role: 'Студентка', text: 'Тесты помогли мне лучше понять свои сильные стороны. Теперь я знаю, в каком направлении двигаться.' },
  { name: 'Мария С.', role: 'Психолог', text: 'Рекомендую эту платформу своим клиентам как отличное дополнение к терапии. Удобно и профессионально.' },
]
</script>