<template>
  <section class="py-16 md:py-24 bg-white overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        
        <!-- Text Content -->
        <div class="w-full lg:w-1/2 order-2 lg:order-1">
          <div class="inline-block px-4 py-1.5 bg-sky-50 text-sky-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Визуализация
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-stone-900 mb-6 font-montserrat leading-tight">
            Следите за своим <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">прогрессом в реальном времени</span>
          </h2>
          <p class="text-stone-600 text-lg mb-8 leading-relaxed">
            Наша панель управления дает исчерпывающую информацию о ваших когнитивных тренировках, эмоциональном состоянии и личностном росте. Все графики и метрики обновляются мгновенно.
          </p>
          
          <ul class="space-y-4 mb-10">
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 mt-1 flex-shrink-0">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700">Детальная история сессий и результатов</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 mt-1 flex-shrink-0">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700">Сравнение показателей с предыдущими периодами</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 mt-1 flex-shrink-0">
                <i class="fas fa-check text-xs"></i>
              </div>
              <span class="text-stone-700">Персональные рекомендации по улучшению</span>
            </li>
          </ul>

          <NuxtLink to="/lab/dashboard" class="inline-flex items-center gap-3 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-bold transition-colors">
            <span>Открыть демо-панель</span>
            <i class="fas fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <!-- Dashboard Mockup Visualization -->
        <div class="w-full lg:w-1/2 order-1 lg:order-2">
           <div class="relative rounded-2xl bg-stone-900 p-2 shadow-2xl shadow-sky-900/20 transform rotate-1 hover:rotate-0 transition-transform duration-700">
              <!-- Window Controls -->
              <div class="absolute top-4 left-4 flex gap-2 z-10">
                 <div class="w-3 h-3 rounded-full bg-red-500"></div>
                 <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <!-- Dashboard Container -->
              <div class="bg-stone-50 rounded-xl overflow-hidden pt-10 pb-6 px-6 h-[400px] flex flex-col">
                 <!-- Header Mockup -->
                 <div class="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
                    <div>
                       <div class="h-4 w-32 bg-stone-200 rounded mb-2"></div>
                       <div class="h-3 w-48 bg-stone-100 rounded"></div>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-stone-200"></div>
                 </div>

                 <!-- Grid Mockup -->
                 <div class="grid grid-cols-2 gap-4 flex-1">
                    <!-- Chart Card 1 -->
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                       <div class="flex justify-between mb-4">
                          <div class="h-3 w-20 bg-stone-200 rounded"></div>
                          <div class="h-3 w-8 bg-green-100 rounded text-green-600 text-[10px] flex items-center justify-center px-1">+5%</div>
                       </div>
                       <div class="flex items-end gap-1 h-32 justify-between px-2">
                          <div class="w-full bg-sky-100 rounded-t h-[40%]"></div>
                          <div class="w-full bg-sky-200 rounded-t h-[60%]"></div>
                          <div class="w-full bg-sky-300 rounded-t h-[30%]"></div>
                          <div class="w-full bg-sky-400 rounded-t h-[80%]"></div>
                          <div class="w-full bg-sky-500 rounded-t h-[65%]"></div>
                          <div class="w-full bg-sky-600 rounded-t h-[90%]"></div>
                       </div>
                    </div>

                    <!-- Stats Card 2 -->
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between">
                       <div class="h-3 w-24 bg-stone-200 rounded mb-4"></div>
                       <div class="text-center">
                          <div class="inline-block w-24 h-24 rounded-full border-4 border-indigo-100 border-t-indigo-500 mb-2"></div>
                          <div class="text-2xl font-bold text-stone-800">85%</div>
                          <div class="text-xs text-stone-400">Эффективность</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  </section>
</template>