<template>
  <section class="py-24 bg-white dark:bg-stone-900 overflow-hidden transition-colors duration-300">
    <div class="container mx-auto px-6">
      <div class="flex flex-col lg:flex-row items-center gap-20">
        
        <!-- Text Content -->
        <div class="w-full lg:w-1/2 order-2 lg:order-1">
          <div class="inline-block px-4 py-1.5 bg-brand-secondary/10 dark:bg-brand-secondary/20 text-brand-secondary rounded-full text-xs font-bold uppercase tracking-wider mb-6 transition-colors duration-300">
            Визуализация
          </div>
          <h2 class="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white mb-8 font-montserrat leading-tight transition-colors duration-300">
            Следите за <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">прогрессом</span>
          </h2>
          <p class="text-stone-600 dark:text-stone-300 text-lg mb-10 leading-relaxed font-open-sans transition-colors duration-300">
            Панель управления дает исчерпывающую информацию о ваших когнитивных тренировках и личностном росте. Графики обновляются мгновенно.
          </p>
          
          <ul class="space-y-4 mb-10">
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-brand-secondary/10 dark:bg-brand-secondary/20 flex items-center justify-center text-brand-secondary mt-1 flex-shrink-0 transition-colors duration-300">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700 dark:text-stone-300 transition-colors duration-300">Детальная история сессий</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-brand-secondary/10 dark:bg-brand-secondary/20 flex items-center justify-center text-brand-secondary mt-1 flex-shrink-0 transition-colors duration-300">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700 dark:text-stone-300 transition-colors duration-300">Сравнение показателей с предыдущими периодами</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-brand-secondary/10 dark:bg-brand-secondary/20 flex items-center justify-center text-brand-secondary mt-1 flex-shrink-0 transition-colors duration-300">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700 dark:text-stone-300 transition-colors duration-300">Персональные рекомендации по улучшению</span>
            </li>
          </ul>

          <NuxtLink to="/space/dashboard" class="inline-flex items-center gap-3 px-8 py-4 bg-brand-secondary hover:bg-sky-600 dark:bg-brand-secondary dark:hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transform hover:-translate-y-1">
            <span>Открыть демо-панель</span>
            <i class="fas fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <!-- Dashboard Visualization -->
        <div class="w-full lg:w-1/2 order-1 lg:order-2">
           <div class="relative rounded-[2rem] bg-stone-800 dark:bg-stone-950 p-3 shadow-2xl shadow-stone-400/30 dark:shadow-black/50 transition-all duration-300">
              
              <!-- Screen Container -->
              <div class="bg-stone-50 dark:bg-stone-900 rounded-[1.5rem] overflow-hidden flex flex-col h-[450px] transition-colors duration-300">
                 <!-- App Header -->
                 <div class="bg-white dark:bg-stone-800 border-b border-stone-100 dark:border-stone-700 p-6 flex justify-between items-center transition-colors duration-300">
                    <div>
                       <div class="h-5 w-32 bg-stone-200 dark:bg-stone-700 rounded-md mb-2 animate-pulse transition-colors duration-300"></div>
                       <div class="h-3 w-48 bg-stone-100 dark:bg-stone-800 rounded-md transition-colors duration-300"></div>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-600 border border-stone-200 dark:border-stone-600 transition-colors duration-300"></div>
                 </div>

                 <!-- App Content -->
                 <div class="p-6 grid grid-cols-2 gap-4 h-full bg-stone-50 dark:bg-stone-900 overflow-hidden transition-colors duration-300">
                    
                    <!-- Main Chart Area -->
                    <div class="col-span-2 bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 transition-colors duration-300">
                       <div class="flex justify-between items-center mb-6">
                          <div class="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded transition-colors duration-300"></div>
                          <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-lg transition-colors duration-300">+12.5%</span>
                       </div>
                       <!-- CSS Bar Chart -->
                       <div class="flex items-end justify-between h-32 gap-2 px-2">
                          <div class="w-full bg-brand-secondary/20 dark:bg-brand-secondary/30 rounded-t-lg h-[40%] transition-colors duration-300"></div>
                          <div class="w-full bg-brand-secondary/20 dark:bg-brand-secondary/30 rounded-t-lg h-[60%] transition-colors duration-300"></div>
                          <div class="w-full bg-brand-secondary/20 dark:bg-brand-secondary/30 rounded-t-lg h-[30%] transition-colors duration-300"></div>
                          <div class="w-full bg-brand-secondary/20 dark:bg-brand-secondary/30 rounded-t-lg h-[80%] transition-colors duration-300"></div>
                          <div class="w-full bg-brand-secondary rounded-t-lg h-[65%] relative shadow-lg shadow-sky-200 dark:shadow-sky-900/50 transition-colors duration-300"></div>
                          <div class="w-full bg-brand-secondary/20 dark:bg-brand-secondary/30 rounded-t-lg h-[90%] transition-colors duration-300"></div>
                       </div>
                    </div>

                    <!-- Stats Card Small -->
                    <div class="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 transition-colors duration-300">
                       <div class="w-10 h-10 rounded-xl bg-brand-accent/10 dark:bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-4 transition-colors duration-300">
                          <i class="fas fa-brain"></i>
                       </div>
                       <div class="text-2xl font-bold text-stone-800 dark:text-white transition-colors duration-300">85%</div>
                       <div class="text-xs text-stone-400 dark:text-stone-500 mt-1 transition-colors duration-300">Эффективность</div>
                    </div>

                    <!-- Circular Progress -->
                    <div class="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 flex flex-col items-center justify-center transition-colors duration-300">
                       <div class="relative w-16 h-16 mb-2">
                          <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path class="text-stone-100 dark:text-stone-700 transition-colors duration-300" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" />
                            <path class="text-brand-primary" stroke-dasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                          </svg>
                       </div>
                       <div class="text-xs text-stone-400 dark:text-stone-500 transition-colors duration-300">Фокус</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  </section>
</template>