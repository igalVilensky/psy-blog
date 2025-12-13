<template>
  <footer class="bg-stone-900 text-stone-300 py-12 md:py-16">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
             <i class="fas fa-brain text-amber-400 text-2xl"></i>
             <span class="text-2xl font-bold text-stone-50">MindQLab</span>
          </div>
          <p class="text-sm leading-relaxed mb-6 opacity-80">
            Лаборатория осознанного роста. Помогаем исследовать себя и становиться лучше каждый день.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors text-stone-400 hover:text-amber-400">
              <i class="fab fa-telegram"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors text-stone-400 hover:text-amber-400">
              <i class="fab fa-vk"></i>
            </a>
          </div>
        </div>

        <!-- Links 1 -->
        <div>
          <h4 class="text-stone-50 font-bold mb-6">Исследуй</h4>
          <ul class="space-y-4 text-sm">
            <li><NuxtLink to="/lab/tests" class="hover:text-amber-400 transition-colors">Тесты личности</NuxtLink></li>
            <li><NuxtLink to="/lab/brain-training" class="hover:text-amber-400 transition-colors">Тренировка мозга</NuxtLink></li>
            <li><NuxtLink to="/lab/growth" class="hover:text-amber-400 transition-colors">Инструменты роста</NuxtLink></li>
          </ul>
        </div>

        <!-- Links 2 -->
        <div>
           <h4 class="text-stone-50 font-bold mb-6">Узнавай</h4>
           <ul class="space-y-4 text-sm">
            <li><NuxtLink to="/blog" class="hover:text-amber-400 transition-colors">Блог</NuxtLink></li>
            <li><NuxtLink to="/courses" class="hover:text-amber-400 transition-colors">Курсы</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-amber-400 transition-colors">О проекте</NuxtLink></li>
           </ul>
        </div>

        <!-- Newsletter -->
        <div>
           <h4 class="text-stone-50 font-bold mb-6">Будь в курсе</h4>
           <p class="text-xs mb-4 opacity-70">
             Получайте полезные инсайты и новости проекта раз в неделю.
           </p>
           <div class="flex flex-col gap-2">
             <input type="email" placeholder="Ваш Email" class="bg-stone-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400/50 outline-none text-stone-100 placeholder-stone-600">
             <button class="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold py-3 px-6 rounded-lg text-sm transition-colors">
               Подписаться
             </button>
           </div>
        </div>
      </div>

      <div class="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
        <p>&copy; {{ new Date().getFullYear() }} MindQLab. Все права защищены.</p>
        <div class="flex gap-6">
          <NuxtLink to="/legal/privacy" class="hover:text-stone-50">Политика конфиденциальности</NuxtLink>
          <NuxtLink to="/legal/terms" class="hover:text-stone-50">Пользовательское соглашение</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>