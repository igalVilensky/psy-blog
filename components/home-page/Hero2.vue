<template>
  <section class="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
       <div class="absolute -top-[10%] -right-[5%] w-[50%] h-[50%] bg-amber-200/20 rounded-full blur-3xl rounded-blob animate-slow-float"></div>
       <div class="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-sky-200/20 rounded-full blur-3xl rounded-blob animation-delay-2000 animate-slow-float"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-stone-100 mb-8 animate-fade-in-up">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span class="text-xs font-semibold text-stone-600 tracking-wide uppercase">Психология нового времени</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.15] mb-6 font-montserrat animate-fade-in-up animation-delay-100">
            Исследуй себя.<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Расти осознанно.</span>
          </h1>
          
          <p class="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-200">
            Ваша персональная лаборатория для изучения личности, развития когнитивных навыков и обретения внутренней гармонии.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-300">
            <NuxtLink to="/lab/tests" class="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20 transition-all transform hover:-translate-y-1 text-center">
               Начать бесплатно
            </NuxtLink>
            <NuxtLink to="#how-it-works" class="w-full sm:w-auto px-8 py-4 bg-white border border-stone-200 text-stone-700 rounded-xl font-bold hover:border-amber-400 hover:text-amber-600 transition-all text-center flex items-center justify-center gap-2 group">
               <span>Как это работает</span>
               <i class="fas fa-arrow-down transform group-hover:translate-y-1 transition-transform"></i>
            </NuxtLink>
          </div>
          
          <div class="mt-12 flex items-center justify-center lg:justify-start gap-8 text-stone-400 animate-fade-in-up animation-delay-400">
             <div class="flex items-center gap-2">
               <i class="fas fa-check-circle text-amber-500"></i>
               <span class="text-sm">Научно</span>
             </div>
             <div class="flex items-center gap-2">
               <i class="fas fa-check-circle text-amber-500"></i>
               <span class="text-sm">Безопасно</span>
             </div>
             <div class="flex items-center gap-2">
               <i class="fas fa-check-circle text-amber-500"></i>
               <span class="text-sm">Эффективно</span>
             </div>
          </div>
        </div>

        <!-- Visual Content -->
        <div class="flex-1 w-full max-w-lg lg:max-w-none relative animate-fade-in-right animation-delay-300">
           <!-- Decorative main image container -->
           <div class="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-200 bg-white">
              <!-- Using a reliable placeholder abstract design if no image provided, or standard gradients -->
              <div class="absolute inset-0 bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center">
                 <!-- Central Element -->
                 <div class="relative w-64 h-64">
                    <div class="absolute inset-0 border-[1px] border-stone-200 rounded-full animate-spin-slow"></div>
                    <div class="absolute inset-8 border-[1px] border-amber-200 rounded-full animate-spin-slow animation-reverse"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                       <i class="fas fa-spa text-6xl text-amber-400 drop-shadow-sm"></i>
                    </div>
                    
                    <!-- Floating Cards -->
                    <div class="absolute top-0 right-0 transform translate-x-8 -translate-y-8 bg-white p-4 rounded-xl shadow-lg border border-stone-50 animate-float-slow">
                       <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                             <i class="fas fa-chart-line"></i>
                          </div>
                          <div>
                             <div class="text-xs text-stone-400">Рост сегодня</div>
                             <div class="text-sm font-bold text-stone-800">+12%</div>
                          </div>
                       </div>
                    </div>

                    <div class="absolute bottom-0 left-0 transform -translate-x-4 translate-y-4 bg-white p-4 rounded-xl shadow-lg border border-stone-50 animate-float-slow animation-delay-1000">
                       <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                             <i class="fas fa-brain"></i>
                          </div>
                          <div>
                             <div class="text-xs text-stone-400">Фокус</div>
                             <div class="text-sm font-bold text-stone-800">Отличный</div>
                          </div>
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

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-1000 {
  animation-delay: 1s;
}
.animation-reverse {
  animation-direction: reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float-slow {
  animation: float 6s ease-in-out infinite;
}
</style>
