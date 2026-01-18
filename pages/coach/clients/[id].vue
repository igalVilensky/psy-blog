<template>
  <div class="p-6 lg:p-10 space-y-10">
    <div v-if="loading" class="flex items-center justify-center py-24">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="client" class="space-y-10 animate-fadeIn">
      <!-- Profile Header -->
      <div class="relative group">
        <div
          class="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group-hover:shadow-xl group-hover:border-indigo-500/20">
        </div>

        <div class="relative p-6 lg:p-10 flex flex-col gap-8">
          <!-- Back Button Row -->
          <div class="relative z-10">
            <button @click="router.push('/coach')"
              class="group/back flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-500/20">
              <i class="fas fa-arrow-left text-xs transition-transform group-hover/back:-translate-x-1"></i>
              <span class="text-[10px] font-black uppercase tracking-widest">Назад к панели</span>
            </button>
          </div>

          <!-- Profile & Actions Row -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div class="flex items-center gap-5 lg:gap-8">
              <div
                class="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl transition-transform duration-500">
                <img v-if="client.avatarUrl" :src="client.avatarUrl" class="w-full h-full object-cover shadow-inner" />
                <i v-else class="fas fa-user text-2xl lg:text-4xl text-slate-300"></i>
              </div>

              <div class="space-y-1 lg:space-y-2">
                <div class="flex flex-wrap items-center gap-2 lg:gap-3">
                  <h1 class="text-xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {{ client.displayName || 'Без имени' }}
                  </h1>
                  <div
                    class="px-2 py-0.5 lg:px-3 lg:py-1 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Активен
                  </div>
                </div>
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-4 text-[10px] lg:text-sm font-black uppercase tracking-widest text-slate-400">
                  <div class="flex items-center gap-2">
                    <i class="far fa-envelope text-indigo-500/50"></i>
                    <span class="truncate max-w-[180px] sm:max-w-none">{{ client.email }}</span>
                  </div>
                  <div class="hidden sm:flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
                    <i class="far fa-calendar text-indigo-500/50"></i>
                    <span>С нами с 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-3 w-full lg:w-auto">
              <button @click="activeTab = 'notes'"
                class="flex-1 lg:flex-none px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
                ЗАМЕТКИ
              </button>
              <button
                class="flex-1 lg:flex-none px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl bg-indigo-600 text-white font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all active:scale-95">
                НАПИСАТЬ
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-10 no-scrollbar px-2">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="pb-5 text-[11px] font-black uppercase tracking-[0.25rem] transition-all relative whitespace-nowrap"
          :class="activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'">
          {{ tab.label }}
          <div v-if="activeTab === tab.id"
            class="absolute bottom-[-1px] left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)] animate-width">
          </div>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="min-h-[500px] relative">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fadeIn">
          <div class="xl:col-span-2 space-y-8">
            <!-- Analytic Card -->
            <div
              class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative group">
              <div
                class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-indigo-500/10 transition-colors">
              </div>

              <div class="flex items-center justify-between mb-10 relative z-10">
                <div class="space-y-1">
                  <h3 class="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Активность
                    когнити</h3>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Динамика тренировок за
                    последние 7 дней</p>
                </div>
                <div
                  class="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase">Weekly View</span>
                </div>
              </div>

              <div class="h-64 flex items-end gap-3 px-2 relative z-10">
                <div v-for="(val, i) in [40, 70, 45, 90, 65, 30, 85]" :key="i"
                  class="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl relative group transition-all hover:bg-indigo-500/20 cursor-pointer overflow-hidden"
                  :style="`height: ${val}%`">
                  <div
                    class="absolute bottom-0 left-0 right-0 h-0 group-hover:h-full bg-gradient-to-t from-indigo-500/30 to-purple-500/10 transition-all duration-500">
                  </div>
                  <div
                    class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-black py-2 px-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-[-4px] whitespace-nowrap z-20">
                    {{ Math.round(val / 10) }} СЕССИЙ
                  </div>
                </div>
              </div>
              <div
                class="flex justify-between mt-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">
                <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="i in 2" :key="i"
                class="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-6 group hover:bg-indigo-500/10 transition-all hover:translate-x-2">
                <div
                  class="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                  <i class="fas fa-crown text-2xl"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Достижение
                    разблокировано</h4>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase mt-1 tracking-widest">7
                    дней активных тренировок</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Sidebar -->
          <div class="space-y-8 animate-fadeIn" style="animation-delay: 0.1s">
            <div
              class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors">
              </div>

              <h3 class="text-lg font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight relative z-10">
                Общий прогресс</h3>
              <div class="space-y-8 relative z-10">
                <div class="flex flex-col items-center">
                  <div class="relative w-40 h-40 flex items-center justify-center">
                    <svg class="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" stroke-width="8" fill="transparent"
                        class="text-slate-100 dark:text-slate-800" />
                      <circle cx="80" cy="80" r="70" stroke="currentColor" stroke-width="10" stroke-dasharray="440"
                        stroke-dashoffset="154" stroke-linecap="round" fill="transparent"
                        class="text-indigo-600 dark:text-indigo-400 transition-all duration-1000 ease-out" />
                    </svg>
                    <div class="absolute flex flex-col items-center">
                      <span class="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">65%</span>
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Курс</span>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-center">
                    <div class="text-sm font-black text-slate-900 dark:text-white">42</div>
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Сессий</div>
                  </div>
                  <div
                    class="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-center">
                    <div class="text-sm font-black text-slate-900 dark:text-white">5</div>
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Тестов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Big 5 Personality Tab -->
        <div v-if="activeTab === 'personality'" class="space-y-8 animate-fadeIn">
          <div v-if="big5Loading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
          <div v-else-if="big5Data" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              class="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

              <h3
                class="text-2xl font-black text-slate-900 dark:text-white mb-10 uppercase tracking-tight relative z-10">
                Черты личности <span class="text-indigo-600">(BIG 5)</span></h3>
              <div class="space-y-10 relative z-10">
                <div v-for="(score, trait) in big5Data.traitScores" :key="trait" class="space-y-3">
                  <div class="flex justify-between items-end">
                    <h4 class="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{{ trait
                    }}</h4>
                    <span class="text-base font-black text-indigo-600 dark:text-indigo-400">{{ Math.round(score) }}
                      <span class="text-xs text-slate-400">/ 120</span></span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_0_12px_rgba(79,70,229,0.3)] transition-all duration-1000 ease-out"
                      :style="`width: ${(score / 120) * 100}%`"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trait Analysis -->
            <div
              class="bg-indigo-600 dark:bg-indigo-900/40 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden group">
              <div
                class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700">
              </div>
              <h3 class="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-3">
                <i class="fas fa-brain text-indigo-200"></i> Психологический профиль
              </h3>
              <div class="space-y-6 relative z-10 text-indigo-50 leading-relaxed">
                <p class="text-sm border-l-4 border-indigo-200 pl-6 py-2">
                  На основе результатов теста Big 5, клиент склонен к высокое организованности и дисциплине.
                  Эмоциональная стабильность находится в пределах нормы, что способствует эффективному обучению.
                </p>
                <div class="grid grid-cols-2 gap-6 pt-6">
                  <div class="space-y-1">
                    <span class="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-200/60">Доминанта</span>
                    <div class="text-lg font-black uppercase">Доброжелательность</div>
                  </div>
                  <div class="space-y-1">
                    <span
                      class="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-200/60">Рекомендация</span>
                    <div class="text-lg font-black uppercase">Групповая работа</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else
            class="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <i class="fas fa-chart-pie text-4xl text-slate-300 dark:text-slate-700 mb-4"></i>
            <h3 class="text-slate-400 font-black uppercase tracking-widest text-sm">Данные тестирования отсутствуют</h3>
          </div>
        </div>

        <!-- Emotions Tab -->
        <div v-if="activeTab === 'emotions'" class="space-y-8 animate-fadeIn">
          <div class="flex items-center justify-between gap-4 mb-2">
            <h3 class="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">История состояний
            </h3>
            <div class="flex items-center gap-2">
              <button
                class="p-2 w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-600 transition-all">
                <i class="fas fa-filter text-xs"></i>
              </button>
            </div>
          </div>

          <div v-if="emotionsLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>

          <div v-else-if="emotionsData && emotionsData.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(entry, idx) in emotionsData" :key="idx"
              class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden">
              <div class="flex justify-between items-start mb-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl group-hover:scale-110 transition-transform">
                    {{ entry.emotion?.charAt(0) || '😊' }}
                  </div>
                  <div>
                    <span
                      class="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-600 mb-2 inline-block shadow-sm">
                      {{ entry.emotion }}
                    </span>
                    <h4 class="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{{
                      entry.subEmotion }}</h4>
                  </div>
                </div>
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  {{ formatDate(entry.timestamp) }}
                </div>
              </div>

              <div class="space-y-5">
                <div class="space-y-2">
                  <div class="flex justify-between items-end">
                    <span class="text-[10px] text-slate-400 uppercase font-black tracking-widest">Интенсивность</span>
                    <span class="text-xs font-black text-indigo-600 dark:text-indigo-400">{{ entry.intensity
                    }}/10</span>
                  </div>
                  <div class="w-full h-1.5 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.3)] transition-all duration-1000"
                      :style="`width: ${entry.intensity * 10}%`"></div>
                  </div>
                </div>
                <p v-if="entry.note"
                  class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-indigo-100 dark:border-indigo-900/50 pl-4 py-1">
                  "{{ entry.note }}"
                </p>
              </div>
            </div>
          </div>

          <div v-else
            class="text-center py-24 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800/50">
            <div
              class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-smile text-3xl text-slate-300 dark:text-slate-700"></i>
            </div>
            <h3 class="text-slate-400 font-black uppercase tracking-widest text-sm">Данных об эмоциях пока нет</h3>
          </div>
        </div>

        <!-- Training Results Tab -->
        <div v-if="activeTab === 'training'" class="space-y-8 animate-fadeIn">
          <div class="flex items-center justify-between gap-4">
            <h3 class="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Журнал занятий</h3>
            <button
              class="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black text-indigo-600 hover:text-white hover:bg-indigo-600 transition-all uppercase tracking-[0.2em] shadow-sm">
              Экспорт данных
            </button>
          </div>

          <div v-if="trainingLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>

          <div v-else-if="trainingData && trainingData.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(result, idx) in trainingData" :key="idx"
              class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group relative overflow-hidden">
              <div
                class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors">
              </div>

              <div class="flex justify-between items-start mb-8">
                <div
                  class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <i class="fas fa-gamepad text-2xl"></i>
                </div>
                <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {{ formatDate(result.timestamp) }}
                </div>
              </div>

              <h4
                class="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                {{ EXERCISE_NAMES[result.exerciseType] || result.exerciseType }}
              </h4>

              <div class="flex items-end justify-between mt-6">
                <div class="space-y-1">
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Результат</span>
                  <div class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{{ result.score }}
                  </div>
                </div>
                <div
                  class="w-10 h-10 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center">
                  <i
                    class="fas fa-chevron-right text-slate-300 text-[10px] group-hover:text-indigo-500 transition-colors group-hover:translate-x-1"></i>
                </div>
              </div>

              <!-- Additional Metrics -->
              <div v-if="result.accuracy !== undefined" class="mt-4 flex items-center gap-4">
                <div class="flex flex-col">
                  <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Точность</span>
                  <span class="text-xs font-black text-indigo-500">{{ result.accuracy }}%</span>
                </div>
                <div v-if="result.avgReactionTime"
                  class="flex flex-col border-l border-slate-100 dark:border-slate-800 pl-4">
                  <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Реакция</span>
                  <span class="text-xs font-black text-purple-500">{{ result.avgReactionTime }}ms</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else
            class="text-center py-24 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800/50">
            <div
              class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-running text-3xl text-slate-300 dark:text-slate-700"></i>
            </div>
            <h3 class="text-slate-400 font-black uppercase tracking-widest text-sm">Тренировки еще не проводились</h3>
          </div>
        </div>

        <!-- Notes Tab -->
        <div v-if="activeTab === 'notes'" class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <div class="lg:col-span-1">
            <div
              class="bg-indigo-600 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/30 relative overflow-hidden group">
              <div
                class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700">
              </div>
              <h3 class="text-2xl font-black uppercase mb-6 tracking-tight flex items-center gap-3">
                <i class="fas fa-sticky-note text-indigo-200"></i> Коуч-заметки
              </h3>
              <p class="text-sm text-indigo-100 leading-relaxed mb-8 relative z-10">
                Используйте этот раздел для ведения личных записей о прогрессе, инсайтах и коррекции стратегии обучения.
              </p>

              <div class="space-y-4 relative z-10">
                <textarea v-model="newNote" placeholder="Ваша заметка..."
                  class="w-full h-40 p-6 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-indigo-200 text-sm focus:bg-white/20 focus:outline-none transition-all resize-none"></textarea>
                <button @click="saveNote" :disabled="!newNote || noteSaving"
                  class="w-full py-4 rounded-2xl bg-white text-indigo-600 font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50">
                  <template v-if="noteSaving">
                    <i class="fas fa-circle-notch animate-spin mr-2"></i> Сохранение...
                  </template>
                  <template v-else>Сохранить запись</template>
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div v-if="notesLoading" class="flex justify-center py-20">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
            <div v-else-if="notes.length > 0" class="space-y-6">
              <div v-for="note in notes" :key="note.id"
                class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all">
                <div class="flex justify-between items-center mb-6">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{
                      formatDate(note.timestamp ||
                        note.createdAt) }}</span>
                  </div>
                  <button class="text-slate-300 hover:text-rose-500 transition-colors">
                    <i class="fas fa-trash-alt text-[10px]"></i>
                  </button>
                </div>
                <p class="text-base text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-medium">
                  {{
                    note.content }}</p>
              </div>
            </div>
            <div v-else
              class="text-center py-24 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800/50">
              <div
                class="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-pen-nib text-3xl text-slate-300 dark:text-slate-700"></i>
              </div>
              <h3 class="text-slate-400 font-black uppercase tracking-widest text-sm">История заметок пуста</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else
      class="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 mx-auto max-w-2xl px-10">
      <div class="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
        <i class="fas fa-exclamation-triangle text-4xl text-rose-500"></i>
      </div>
      <h2 class="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Клиент не найден</h2>
      <p class="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed">К сожалению, нам не удалось найти
        данные
        указанного клиента. Возможно, ссылка устарела или аккаунт был удален.</p>
      <NuxtLink to="/coach"
        class="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all hover:translate-x-1">
        <i class="fas fa-arrow-left"></i> Вернуться к списку
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { getCoachClientDetails, addCoachNote, getCoachNotes, getClientTrainingResults, getClientEmotionHistory } from '~/api/firebase/coach';

definePageMeta({
  layout: 'coach',
  middleware: ['coach']
});

const route = useRoute();
const authStore = useAuthStore();
const db = getFirestore();

const loading = ref(true);
const client = ref(null);
const activeTab = ref('overview');
const tabs = [
  { id: 'overview', label: 'ОБЗОР' },
  { id: 'personality', label: 'ЛИЧНОСТЬ' },
  { id: 'emotions', label: 'ЭМОЦИИ' },
  { id: 'training', label: 'ТРЕНИРОВКИ' },
  { id: 'notes', label: 'ЗАМЕТКИ' }
];

// Big 5 Data
const big5Data = ref(null);
const big5Loading = ref(false);

// Notes Data
const notes = ref([]);
const newNote = ref('');
const notesLoading = ref(false);
const noteSaving = ref(false);

// Emotions & Training Data
const emotionsData = ref(null);
const emotionsLoading = ref(false);
const trainingData = ref(null);
const trainingLoading = ref(false);

const EXERCISE_NAMES = {
  targetTracking: 'Отслеживание целей',
  mentalShift: 'Ментальное переключение',
  patternDetection: 'Детекция паттернов',
  stroop: 'Тест Струпа',
  reaction: 'Время реакции',
  anagram: 'Анаграммы',
  nback: 'N-Back Lite',
  double: 'Дабл (Внимание)',
  digitSpan: 'Цифровой охват',
  trailMaking: 'Тест связи путей',
  logicPairs: 'Логические пары',
  raven: 'Тест Равена'
};

const fetchData = async () => {
  const clientId = route.params.id;
  if (!clientId) return;

  loading.value = true;
  client.value = await getCoachClientDetails(clientId);
  loading.value = false;

  if (client.value) {
    loadNotes();
  }
};

const loadBig5Data = async () => {
  if (!client.value || big5Data.value) return;

  big5Loading.value = true;
  try {
    const q = query(
      collection(db, `users/${client.value.id}/big5Results`),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      big5Data.value = snap.docs[0].data();
    }
  } catch (err) {
    console.error('Error fetching Big 5:', err);
  } finally {
    big5Loading.value = false;
  }
};

const loadNotes = async () => {
  if (!client.value || !authStore.user) return;
  notesLoading.value = true;
  notes.value = await getCoachNotes(authStore.user.uid, client.value.id);
  notesLoading.value = false;
};

const saveNote = async () => {
  if (!newNote.value || !client.value || !authStore.user) return;

  noteSaving.value = true;
  const res = await addCoachNote(authStore.user.uid, client.value.id, newNote.value);
  if (res.success) {
    newNote.value = '';
    await loadNotes();
  }
  noteSaving.value = false;
};

const loadEmotions = async () => {
  if (!client.value || emotionsData.value) return;
  emotionsLoading.value = true;
  emotionsData.value = await getClientEmotionHistory(client.value.id);
  emotionsLoading.value = false;
};

const loadTraining = async () => {
  if (!client.value || trainingData.value) return;
  trainingLoading.value = true;
  trainingData.value = await getClientTrainingResults(client.value.id);
  trainingLoading.value = false;
};

const formatDate = (ts) => {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

watch(activeTab, (newTab) => {
  if (newTab === 'personality') loadBig5Data();
  if (newTab === 'emotions') loadEmotions();
  if (newTab === 'training') loadTraining();
  if (newTab === 'notes') loadNotes();
}, { immediate: true });

onMounted(fetchData);
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-width {
  animation: expandWidth 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  from {
    width: 0%;
    left: 50%;
    right: 50%;
  }

  to {
    width: 100%;
    left: 0%;
    right: 0%;
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
