<template>
  <section class="py-16 md:py-24 bg-stone-50 overflow-hidden">
    <div class="container mx-auto px-6">
       
       <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-stone-900 mb-6 font-montserrat">
            Нам <span class="text-amber-500">доверяют</span>
          </h2>
          <p class="text-stone-600">
            Присоединяйтесь к тысячам людей, которые уже меняют свою жизнь.
          </p>
       </div>

       <!-- Testimonials Loop (Horizontal Scroll) -->
       <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative">
             <i class="fas fa-quote-right absolute top-6 right-6 text-stone-100 text-4xl"></i>
             <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-full bg-stone-200 overflow-hidden">
                   <!-- Placeholder Avatar -->
                   <i class="fas fa-user text-stone-400 text-xl w-full h-full flex items-center justify-center bg-stone-100"></i>
                </div>
                <div>
                   <div class="font-bold text-stone-900">Елена В.</div>
                   <div class="text-xs text-stone-500">Пользователь MindQLab</div>
                </div>
             </div>
             <p class="text-stone-600 italic leading-relaxed">
               "Удивительно, как простые упражнения могут так сильно повлиять на продуктивность. Я стала намного спокойнее и собраннее."
             </p>
             <div class="mt-4 flex text-amber-400 text-sm">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
             </div>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative">
             <i class="fas fa-quote-right absolute top-6 right-6 text-stone-100 text-4xl"></i>
             <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-full bg-stone-200 overflow-hidden">
                   <i class="fas fa-user text-stone-400 text-xl w-full h-full flex items-center justify-center bg-stone-100"></i>
                </div>
                <div>
                   <div class="font-bold text-stone-900">Анна К.</div>
                   <div class="text-xs text-stone-500">Студентка курса</div>
                </div>
             </div>
             <p class="text-stone-600 italic leading-relaxed">
               "Тесты помогли мне лучше понять свои сильные стороны. Теперь я знаю, в каком направлении двигаться."
             </p>
             <div class="mt-4 flex text-amber-400 text-sm">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
             </div>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative">
             <i class="fas fa-quote-right absolute top-6 right-6 text-stone-100 text-4xl"></i>
             <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-full bg-stone-200 overflow-hidden">
                   <i class="fas fa-user text-stone-400 text-xl w-full h-full flex items-center justify-center bg-stone-100"></i>
                </div>
                <div>
                   <div class="font-bold text-stone-900">Мария С.</div>
                   <div class="text-xs text-stone-500">Психолог</div>
                </div>
             </div>
             <p class="text-stone-600 italic leading-relaxed">
               "Рекомендую эту платформу своим клиентам как отличное дополнение к терапии. Удобно и профессионально."
             </p>
             <div class="mt-4 flex text-amber-400 text-sm">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
             </div>
          </div>

       </div>

       <!-- Stats Bar -->
       <div class="bg-stone-900 rounded-3xl p-8 md:p-12 text-center md:text-left">
          <div class="flex flex-col md:flex-row justify-between items-center gap-8">
             <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-white mb-2">10k+</div>
                <div class="text-stone-400 text-sm uppercase tracking-wide">Пользователей</div>
             </div>
             <div class="hidden md:block w-px h-16 bg-stone-800"></div>
             <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-amber-400 mb-2">500+</div>
                <div class="text-stone-400 text-sm uppercase tracking-wide">Материалов</div>
             </div>
             <div class="hidden md:block w-px h-16 bg-stone-800"></div>
             <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-sky-400 mb-2">24/7</div>
                <div class="text-stone-400 text-sm uppercase tracking-wide">Доступ</div>
             </div>
             <div class="mt-6 md:mt-0">
                <NuxtLink to="/register" class="inline-block px-8 py-4 bg-white text-stone-900 font-bold rounded-xl hover:bg-stone-100 transition-colors">
                   Присоединиться
                </NuxtLink>
             </div>
          </div>
       </div>

    </div>
  </section>
</template>