<template>
  <section class="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgb(120 113 108 / 0.15) 1px, transparent 0); background-size: 32px 32px;"></div>
    </div>

    <!-- Gradient Overlays (Static) -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-brand-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full shadow-sm mb-8 transition-colors duration-300">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span class="text-xs font-bold text-stone-700 dark:text-stone-300 tracking-widest uppercase font-montserrat">Психология нового времени</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-stone-900 dark:text-white leading-[1.1] mb-8 font-montserrat tracking-tight transition-colors duration-300">
            Исследуй себя.<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-orange-500 to-brand-secondary">Расти осознанно.</span>
          </h1>
          
          <p class="text-lg md:text-xl text-stone-600 dark:text-stone-300 mb-10 leading-relaxed font-open-sans transition-colors duration-300">
            Ваша персональная лаборатория для изучения личности. Соединяем научную психологию с современными технологиями для вашего роста.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <NuxtLink to="/space/tests" class="group relative w-full sm:w-auto px-8 py-4 bg-brand-dark dark:bg-brand-primary text-white rounded-2xl font-bold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
               <span class="relative flex items-center justify-center gap-2">
                 Начать бесплатно <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
               </span>
            </NuxtLink>
            
            <NuxtLink to="#how-it-works" class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 rounded-2xl font-bold hover:border-brand-primary dark:hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-primary transition-all duration-300 text-center shadow-sm">
               Как это работает
            </NuxtLink>
          </div>
          
          <!-- Trust Indicators -->
          <div class="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-stone-500 dark:text-stone-400 transition-colors duration-300">
             <div class="flex items-center gap-2.5">
               <i class="fas fa-flask text-brand-primary text-lg"></i>
               <span class="text-sm font-semibold">Научно</span>
             </div>
             <div class="flex items-center gap-2.5">
               <i class="fas fa-shield-alt text-brand-secondary text-lg"></i>
               <span class="text-sm font-semibold">Безопасно</span>
             </div>
             <div class="flex items-center gap-2.5">
               <i class="fas fa-bolt text-brand-accent text-lg"></i>
               <span class="text-sm font-semibold">Эффективно</span>
             </div>
          </div>
        </div>

        <!-- Visual Content - Hero Image -->
        <div class="flex-1 w-full relative">
           <div class="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] group">
              <!-- Image with overlay -->
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80" 
                alt="Mind exploration visualization"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>
              
              <!-- Floating Stats Card -->
              <div class="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-stone-800/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/50 dark:border-stone-700/50 transition-colors duration-300">
                 <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                       <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-orange-500 flex items-center justify-center text-white shadow-lg">
                          <i class="fas fa-chart-line"></i>
                       </div>
                       <div>
                          <div class="text-2xl font-bold text-stone-900 dark:text-white font-montserrat">15,000+</div>
                          <div class="text-xs text-stone-600 dark:text-stone-400 font-semibold">Активных пользователей</div>
                       </div>
                    </div>
                    <div class="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                       +23% за месяц
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  </section>
</template>
