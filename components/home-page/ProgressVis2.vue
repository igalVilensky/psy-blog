<template>
  <section class="py-24 bg-white overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="flex flex-col lg:flex-row items-center gap-20">
        
        <!-- Text Content -->
        <div class="w-full lg:w-1/2 order-2 lg:order-1">
          <div class="inline-block px-4 py-1.5 bg-brand-secondary/10 text-brand-secondary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Визуализация
          </div>
          <h2 class="text-4xl md:text-5xl font-extrabold text-brand-dark mb-8 font-montserrat leading-tight">
            Следите за <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">прогрессом</span>
          </h2>
          <p class="text-stone-600 text-lg mb-10 leading-relaxed font-open-sans">
            Панель управления дает исчерпывающую информацию о ваших когнитивных тренировках и личностном росте. Графики обновляются мгновенно.
          </p>
          
          <ul class="space-y-4 mb-10">
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mt-1 flex-shrink-0">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700">Детальная история сессий</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mt-1 flex-shrink-0">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700">Сравнение показателей с предыдущими периодами</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mt-1 flex-shrink-0">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700">Персональные рекомендации по улучшению</span>
            </li>
          </ul>

          <NuxtLink to="/lab/dashboard" class="inline-flex items-center gap-3 px-8 py-4 bg-brand-secondary hover:bg-sky-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transform hover:-translate-y-1">
            <span>Открыть демо-панель</span>
            <i class="fas fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <!-- Dashboard Visualization -->
        <div class="w-full lg:w-1/2 order-1 lg:order-2 perspective-1000">
           <div class="relative rounded-[2rem] bg-stone-900 p-3 shadow-2xl shadow-stone-400/50 transform lg:rotate-y-6 lg:rotate-x-6 hover:rotate-0 transition-all duration-1000 ease-out">
              
              <!-- Screen Container -->
              <div class="bg-surface-50 rounded-[1.5rem] overflow-hidden flex flex-col h-[450px]">
                 <!-- App Header -->
                 <div class="bg-white border-b border-stone-100 p-6 flex justify-between items-center">
                    <div>
                       <div class="h-5 w-32 bg-stone-200 rounded-md mb-2 animate-pulse"></div>
                       <div class="h-3 w-48 bg-stone-100 rounded-md"></div>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-stone-200 to-stone-100 border border-stone-200"></div>
                 </div>

                 <!-- App Content -->
                 <div class="p-6 grid grid-cols-2 gap-4 h-full bg-surface-50 overflow-hidden">
                    
                    <!-- Main Chart Area -->
                    <div class="col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
                       <div class="flex justify-between items-center mb-6">
                          <div class="h-4 w-24 bg-stone-200 rounded"></div>
                          <span class="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-lg">+12.5%</span>
                       </div>
                       <!-- CSS Bar Chart -->
                       <div class="flex items-end justify-between h-32 gap-2 px-2">
                          <div class="w-full bg-brand-secondary/20 rounded-t-lg h-[40%]"></div>
                          <div class="w-full bg-brand-secondary/20 rounded-t-lg h-[60%]"></div>
                          <div class="w-full bg-brand-secondary/20 rounded-t-lg h-[30%]"></div>
                          <div class="w-full bg-brand-secondary/20 rounded-t-lg h-[80%]"></div>
                          <div class="w-full bg-brand-secondary rounded-t-lg h-[65%] relative shadow-lg shadow-sky-200"></div>
                          <div class="w-full bg-brand-secondary/20 rounded-t-lg h-[90%]"></div>
                       </div>
                    </div>

                    <!-- Stats Card Small -->
                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
                       <div class="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4">
                          <i class="fas fa-brain"></i>
                       </div>
                       <div class="text-2xl font-bold text-stone-800">85%</div>
                       <div class="text-xs text-stone-400 mt-1">Эффективность</div>
                    </div>

                    <!-- Circular Progress -->
                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center justify-center">
                       <div class="relative w-16 h-16 mb-2">
                          <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path class="text-stone-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" />
                            <path class="text-brand-primary" stroke-dasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                          </svg>
                       </div>
                       <div class="text-xs text-stone-400">Фокус</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.perspective-1000 { perspective: 1000px; }
.rotate-y-6 { transform: rotateY(-12deg) rotateX(5deg); }
</style>