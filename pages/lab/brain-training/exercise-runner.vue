<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center relative">
        <i class="fas fa-hammer text-4xl text-slate-400 dark:text-slate-600 animate-pulse"></i>
        <div class="absolute -right-2 -top-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
          WIP
        </div>
      </div>
      
      <div class="space-y-2">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
          Упражнение в разработке
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Мы работаем над переносом этого упражнения в новый формат. Пожалуйста, загляните позже.
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
        <div class="text-sm font-medium text-slate-500 dark:text-slate-500 mb-1">ID упражнения</div>
        <code class="text-cyan-600 dark:text-cyan-400 font-mono">{{ route.query.id || 'Unknown' }}</code>
      </div>

      <button 
        @click="router.back()" 
        class="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-90 transition-all"
      >
        <i class="fas fa-arrow-left mr-2"></i>
        Вернуться назад
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

definePageMeta({
  layout: 'empty'
});
</script>
