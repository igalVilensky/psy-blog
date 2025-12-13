<template>
  <section class="py-16 md:py-24 bg-stone-50 overflow-hidden">
    <div class="container mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-stone-900 mb-6 font-montserrat">
          Ваш путь в <span class="text-amber-500">MindQLab</span>
        </h2>
        <p class="text-stone-600 max-w-2xl mx-auto">
          Простая и понятная траектория движения к осознанности и результатам.
        </p>
      </div>

      <div class="relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden lg:block absolute top-[60px] left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-200 to-transparent z-0"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          
          <!-- Step 1: Start -->
          <div class="flex flex-col items-center text-center group">
            <div class="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative">
               <div class="absolute inset-0 rounded-full border border-stone-100"></div>
               <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 text-2xl">
                 <i class="fas fa-flag"></i>
               </div>
               <!-- Step Number Badge -->
               <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">1</div>
            </div>
            <h3 class="text-xl font-bold text-stone-900 mb-2">Начните</h3>
            <p class="text-sm text-stone-500 mb-4 px-4">
              Пройдите базовый тест личности, чтобы определить точку А.
            </p>
            <NuxtLink to="/lab/tests" class="text-amber-500 font-bold hover:text-amber-600 text-sm flex items-center gap-1">
              Выбрать тест <i class="fas fa-chevron-right text-xs"></i>
            </NuxtLink>
          </div>

          <!-- Step 2: Grow -->
          <div class="flex flex-col items-center text-center group">
            <div class="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative">
               <div class="absolute inset-0 rounded-full border border-stone-100"></div>
               <div class="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 text-2xl">
                 <i class="fas fa-seedling"></i>
               </div>
               <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">2</div>
            </div>
            <h3 class="text-xl font-bold text-stone-900 mb-2">Растите</h3>
            <p class="text-sm text-stone-500 mb-4 px-4">
              Используйте инструменты тренировки мозга и практики.
            </p>
            <NuxtLink to="/lab/brain-training" class="text-sky-500 font-bold hover:text-sky-600 text-sm flex items-center gap-1">
              К упражнениям <i class="fas fa-chevron-right text-xs"></i>
            </NuxtLink>
          </div>

          <!-- Step 3: Understand -->
          <div class="flex flex-col items-center text-center group">
            <div class="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative">
               <div class="absolute inset-0 rounded-full border border-stone-100"></div>
               <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-2xl">
                 <i class="fas fa-lightbulb"></i>
               </div>
               <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">3</div>
            </div>
            <h3 class="text-xl font-bold text-stone-900 mb-2">Поймите</h3>
            <p class="text-sm text-stone-500 mb-4 px-4">
              Анализируйте отчеты и читайте экспертные материалы.
            </p>
            <NuxtLink to="/blog" class="text-indigo-500 font-bold hover:text-indigo-600 text-sm flex items-center gap-1">
              Читать блог <i class="fas fa-chevron-right text-xs"></i>
            </NuxtLink>
          </div>

          <!-- Step 4: Join -->
          <div class="flex flex-col items-center text-center group">
            <div class="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative">
               <div class="absolute inset-0 rounded-full border border-stone-100"></div>
               <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 text-2xl">
                 <i class="fas fa-handshake"></i>
               </div>
               <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">4</div>
            </div>
            <h3 class="text-xl font-bold text-stone-900 mb-2">Общайтесь</h3>
            <p class="text-sm text-stone-500 mb-4 px-4">
              Делитесь успехами и находите поддержку в сообществе.
            </p>
            <NuxtLink to="/lab/community" class="text-emerald-500 font-bold hover:text-emerald-600 text-sm flex items-center gap-1">
              Вступить <i class="fas fa-chevron-right text-xs"></i>
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>