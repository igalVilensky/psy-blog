<!-- components/community/AuthCTA.vue -->
<template>
  <div
    class="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl p-6 border border-orange-500/20 text-center"
  >
    <div class="mb-4">
      <div
        class="w-16 h-16 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-4"
      >
        <i class="fas fa-users text-orange-400 text-2xl"></i>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">
        Присоединяйтесь к сообществу
      </h3>
      <p class="text-slate-300 text-sm leading-relaxed">
        Войдите или зарегистрируйтесь, чтобы создавать посты, общаться с другими
        исследователями и делиться своим опытом
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <NuxtLink
        to="/login"
        class="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
      >
        <i class="fas fa-sign-in-alt"></i>
        <span>Войти</span>
      </NuxtLink>
      <NuxtLink
        to="/register"
        class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
      >
        <i class="fas fa-user-plus"></i>
        <span>Регистрация</span>
      </NuxtLink>
    </div>

    <!-- Benefits List -->
    <div class="mt-6 pt-6 border-t border-orange-500/20">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div class="flex items-start gap-3">
          <i class="fas fa-check-circle text-emerald-400 mt-1"></i>
          <div>
            <h4 class="text-white text-sm font-medium mb-1">
              Создавайте посты
            </h4>
            <p class="text-slate-400 text-xs">
              Делитесь опытом и инсайтами
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <i class="fas fa-check-circle text-cyan-400 mt-1"></i>
          <div>
            <h4 class="text-white text-sm font-medium mb-1">
              Общайтесь
            </h4>
            <p class="text-slate-400 text-xs">
              Обсуждайте темы с единомышленниками
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <i class="fas fa-check-circle text-purple-400 mt-1"></i>
          <div>
            <h4 class="text-white text-sm font-medium mb-1">
              Развивайтесь
            </h4>
            <p class="text-slate-400 text-xs">
              Получайте поддержку и советы
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed for this simple CTA component
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
