<template>
  <section class="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-surface-50">
    <!-- Dynamic Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
      <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md border border-white/60 rounded-full shadow-sm mb-8 animate-fade-up">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span class="text-xs font-bold text-stone-600 tracking-widest uppercase font-montserrat">Психология нового времени</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-dark leading-[1.1] mb-8 font-montserrat tracking-tight animate-fade-up" style="animation-delay: 100ms;">
            Исследуй себя.<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-orange-500 to-brand-secondary">Расти осознанно.</span>
          </h1>
          
          <p class="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed font-open-sans animate-fade-up" style="animation-delay: 200ms;">
            Ваша персональная лаборатория для изучения личности. Соединяем научную психологию с современными технологиями для вашего роста.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 animate-fade-up" style="animation-delay: 300ms;">
            <NuxtLink to="/lab/tests" class="group relative w-full sm:w-auto px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold overflow-hidden shadow-lg shadow-brand-dark/20 hover:shadow-brand-dark/40 transition-all duration-300 hover:-translate-y-1">
               <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
               <span class="relative flex items-center justify-center gap-2">
                 Начать бесплатно <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
               </span>
            </NuxtLink>
            
            <NuxtLink to="#how-it-works" class="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-sm border border-stone-200 text-stone-700 rounded-2xl font-bold hover:bg-white hover:border-brand-primary/50 hover:text-brand-primary transition-all duration-300 text-center shadow-sm">
               Как это работает
            </NuxtLink>
          </div>
          
          <!-- Trust Indicators -->
          <div class="mt-14 pt-8 border-t border-stone-200/60 flex items-center justify-center lg:justify-start gap-8 text-stone-500 animate-fade-up" style="animation-delay: 400ms;">
             <div class="flex items-center gap-2.5">
               <i class="fas fa-flask text-brand-primary/80 text-lg"></i>
               <span class="text-sm font-semibold">Научно</span>
             </div>
             <div class="flex items-center gap-2.5">
               <i class="fas fa-shield-alt text-brand-secondary/80 text-lg"></i>
               <span class="text-sm font-semibold">Безопасно</span>
             </div>
             <div class="flex items-center gap-2.5">
               <i class="fas fa-bolt text-brand-accent/80 text-lg"></i>
               <span class="text-sm font-semibold">Эффективно</span>
             </div>
          </div>
        </div>

        <!-- Visual Content (Glassmorphism + 3D Feel) -->
        <div class="flex-1 w-full relative animate-slide-in-right" style="animation-delay: 300ms;">
           <div class="relative z-10">
              <!-- Main Card -->
              <div class="relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-glass border border-white/50 aspect-[4/3] overflow-hidden group">
                 <!-- Inner Content -->
                 <div class="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center">
                    
                    <!-- Abstract Rings -->
                    <div class="absolute w-[120%] h-[120%] border-[1px] border-stone-200/50 rounded-full animate-spin-slow dashed-border"></div>
                    <div class="absolute w-[80%] h-[80%] border-[1px] border-brand-primary/20 rounded-full animate-spin-slow animation-delay-2000" style="animation-direction: reverse;"></div>
                    
                    <!-- Centerpiece -->
                    <div class="relative w-40 h-40 bg-white rounded-full shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center z-20 animate-[float_6s_ease-in-out_infinite]">
                       <i class="fas fa-spa text-6xl text-transparent bg-clip-text bg-gradient-to-br from-brand-primary to-orange-600 drop-shadow-sm"></i>
                       <!-- Orbiting Elements -->
                       <div class="absolute -inset-4 border border-stone-100 rounded-full -z-10"></div>
                    </div>

                    <!-- Floating Widgets -->
                    <div class="absolute top-[15%] right-[10%] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white animate-float-delayed z-30 transform hover:scale-105 transition-transform cursor-pointer">
                       <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 ring-4 ring-green-50/50">
                             <i class="fas fa-chart-line"></i>
                          </div>
                          <div>
                             <div class="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Рост</div>
                             <div class="text-sm font-bold text-stone-800">+12% Сегодня</div>
                          </div>
                       </div>
                    </div>

                    <div class="absolute bottom-[20%] left-[10%] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white animate-[float_6s_ease-in-out_infinite] z-30 transform hover:scale-105 transition-transform cursor-pointer">
                       <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary ring-4 ring-sky-50">
                             <i class="fas fa-brain"></i>
                          </div>
                          <div>
                             <div class="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Фокус</div>
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
.dashed-border {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23D6D3D1FF' stroke-width='1' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border: none;
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>