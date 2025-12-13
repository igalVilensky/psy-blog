<template>
  <section class="py-24 bg-surface-50 overflow-hidden">
    <div class="container mx-auto px-6">
       
       <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6 font-montserrat">
            Нам <span class="text-brand-primary">доверяют</span>
          </h2>
          <p class="text-stone-600 text-lg">
            Присоединяйтесь к тысячам людей, которые уже меняют свою жизнь.
          </p>
       </div>

       <!-- Testimonials -->
       <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div v-for="(review, i) in reviews" :key="i" class="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 relative hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
             <i class="fas fa-quote-right absolute top-8 right-8 text-stone-100 text-4xl"></i>
             <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-full bg-stone-200 overflow-hidden flex items-center justify-center text-stone-500 font-bold">
                   <i class="fas fa-user"></i>
                </div>
                <div>
                   <div class="font-bold text-stone-900 font-montserrat">{{ review.name }}</div>
                   <div class="text-xs text-stone-400 uppercase">{{ review.role }}</div>
                </div>
             </div>
             <p class="text-stone-600 italic leading-relaxed relative z-10 font-open-sans">
               "{{ review.text }}"
             </p>
             <div class="mt-6 flex text-amber-400 text-sm">
                <i v-for="n in 5" :key="n" class="fas fa-star"></i>
             </div>
          </div>
       </div>

       <!-- Stats Bar -->
       <div class="relative bg-brand-dark rounded-[2.5rem] p-10 md:p-16 overflow-hidden shadow-2xl shadow-stone-400/20">
          <div class="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
             <div>
                <div class="text-4xl md:text-5xl font-extrabold text-white mb-2 font-montserrat">10k+</div>
                <div class="text-stone-400 text-sm font-bold uppercase tracking-widest">Пользователей</div>
             </div>
             <div class="hidden md:block w-px h-16 bg-stone-800"></div>
             <div>
                <div class="text-4xl md:text-5xl font-extrabold text-brand-primary mb-2 font-montserrat">500+</div>
                <div class="text-stone-400 text-sm font-bold uppercase tracking-widest">Материалов</div>
             </div>
             <div class="hidden md:block w-px h-16 bg-stone-800"></div>
             <div>
                <div class="text-4xl md:text-5xl font-extrabold text-brand-secondary mb-2 font-montserrat">24/7</div>
                <div class="text-stone-400 text-sm font-bold uppercase tracking-widest">Доступ</div>
             </div>
             <div class="mt-6 md:mt-0">
                <NuxtLink to="/register" class="inline-block px-10 py-5 bg-white text-brand-dark font-extrabold rounded-2xl hover:bg-stone-200 transition-colors shadow-lg hover:scale-105 transform duration-200">
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