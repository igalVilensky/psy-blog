<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-black px-6 py-8 transition-colors duration-500">
    <div class="max-w-7xl mx-auto space-y-12">
      <Breadcrumbs />

      <!-- Header -->
      <div class="space-y-6">
        <h1
          class="text-4xl sm:text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
          Архитектура<br /><span class="text-cyan-600 dark:text-cyan-400">Эго-состояний</span>
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl leading-relaxed">
          Исследуйте динамическую структуру вашей личности через призму транзактного анализа Эрика Берна. Поймите роли
          Родителя, Взрослого и Ребёнка.
        </p>

        <!-- Enhanced Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="stat-card">
            <div class="text-3xl font-black text-cyan-600 dark:text-cyan-400 leading-none mb-2">
              {{ stats.explored }}/3
            </div>
            <div
              class="text-[10px] text-zinc-500 dark:text-zinc-500 font-black uppercase tracking-widest leading-tight">
              Состояний изучено
            </div>
          </div>

          <div class="stat-card border-l-4 border-l-purple-500">
            <div class="text-3xl font-black text-purple-600 dark:text-purple-400 leading-none mb-2">
              {{ completedScenarios.length }}
            </div>
            <div
              class="text-[10px] text-zinc-500 dark:text-zinc-500 font-black uppercase tracking-widest leading-tight">
              Сценариев пройдено
            </div>
          </div>

          <div class="stat-card">
            <div class="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none mb-2">
              {{ awarenessLevel }}%
            </div>
            <div
              class="text-[10px] text-zinc-500 dark:text-zinc-500 font-black uppercase tracking-widest leading-tight">
              Коэффициент осознанности
            </div>
          </div>

          <div class="stat-card">
            <div class="text-3xl font-black text-orange-600 dark:text-orange-400 leading-none mb-2">
              {{ sessionTime }}
            </div>
            <div
              class="text-[10px] text-zinc-500 dark:text-zinc-500 font-black uppercase tracking-widest leading-tight">
              Время исследования
            </div>
          </div>
        </div>
      </div>

      <!-- Ego State Cards (Tabs on Mobile, Grid on Desktop) -->
      <div class="mb-12">
        <h2 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
          <span class="w-1 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full"></span>
          Три эго-состояния личности
        </h2>

        <!-- Mobile Tabs -->
        <div class="md:hidden flex space-x-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-4 overflow-x-auto">
          <button v-for="state in egoStates" :key="state.id" @click="setActiveState(state.id)"
            class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
            :class="activeState === state.id ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'">
            <i :class="[state.icon, 'mr-2']"></i>
            {{ state.title }}
          </button>
        </div>

        <!-- Cards Container -->
        <!-- Added -mb-[2px] to overlap with details container, items-end for bottom alignment -->
        <!-- Cards Container -->
        <!-- Grid overlaps details container by 2px. Wrappers handle the gap via padding. -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10 -mb-[2px]">
          <!-- On mobile, only show active state. On desktop, show all. -->
          <template v-for="state in egoStates" :key="state.id">
            <div v-show="isMobile ? activeState === state.id : true"
              class="h-full flex flex-col transition-all duration-300"
              :class="activeState === state.id ? 'pb-0 z-20' : 'pb-6 z-10'">
              <EgoStateCard :state="state" :is-active="activeState === state.id"
                :usage-percentage="getStateUsage(state.id)" @click="setActiveState(state.id)" class="h-full" />
            </div>
          </template>
        </div>

        <!-- Detailed Info for Active State -->
        <!-- Added dynamic rounded corners logic and border matching -->
        <transition name="fade" mode="out-in">
          <div v-if="activeState" :key="activeState"
            class="rounded-2xl p-6 border-2 relative z-0 shadow-sm dark:shadow-none" :class="{
              // Parent state (cyan) - left card
              'bg-cyan-50 dark:bg-cyan-950/50 rounded-tl-none border-cyan-200 dark:border-cyan-500/50': activeState === 'parent' && !isMobile,
              'bg-cyan-50 dark:bg-cyan-950/50 rounded-t-none border-cyan-200 dark:border-cyan-500/50': activeState === 'parent' && isMobile,
              // Adult state (emerald) - center card
              'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-500/50': activeState === 'adult' && !isMobile,
              'bg-emerald-50 dark:bg-emerald-950/50 rounded-t-none border-emerald-200 dark:border-emerald-500/50': activeState === 'adult' && isMobile,
              // Child state (orange) - right card
              'bg-orange-50 dark:bg-orange-950/50 rounded-tr-none border-orange-200 dark:border-orange-500/50': activeState === 'child' && !isMobile,
              'bg-orange-50 dark:bg-orange-950/50 rounded-t-none border-orange-200 dark:border-orange-500/50': activeState === 'child' && isMobile,
            }">
            <!-- Border cover for seamless merge - hides border where card connects -->
            <div v-if="!isMobile" class="absolute top-0 h-[2px] z-10" :class="{
              'left-0 w-1/3 bg-cyan-50 dark:bg-cyan-950/50': activeState === 'parent',
              'left-1/3 w-1/3 bg-emerald-50 dark:bg-emerald-950/50': activeState === 'adult',
              'right-0 w-1/3 bg-orange-50 dark:bg-orange-950/50': activeState === 'child',
            }" style="margin-top: -2px;"></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold mb-3 flex items-center gap-2" :class="{
                  'text-cyan-600 dark:text-cyan-400': activeState === 'parent',
                  'text-emerald-600 dark:text-emerald-400': activeState === 'adult',
                  'text-orange-600 dark:text-orange-400': activeState === 'child',
                }">
                  <i class="fas fa-lightbulb"></i>
                  Когда это состояние полезно
                </h3>
                <ul class="space-y-2">
                  <li v-for="(benefit, idx) in getStateBenefits(activeState)" :key="idx"
                    class="text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2">
                    <i class="fas fa-check text-emerald-500 dark:text-emerald-400 mt-1 text-xs"></i>
                    <span>{{ benefit }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-3 flex items-center gap-2" :class="{
                  'text-red-600 dark:text-red-400': activeState === 'child',
                  'text-orange-600 dark:text-orange-400': activeState !== 'child',
                }">
                  <i class="fas fa-exclamation-triangle"></i>
                  Потенциальные ловушки
                </h3>
                <ul class="space-y-2">
                  <li v-for="(trap, idx) in getStateTraps(activeState)" :key="idx"
                    class="text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2">
                    <i class="fas fa-times text-red-500 dark:text-red-400 mt-1 text-xs"></i>
                    <span>{{ trap }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Assessment Terminal -->
      <div
        class="bg-zinc-900 dark:bg-zinc-950 rounded-[3rem] p-8 md:p-16 border border-zinc-800 shadow-2xl overflow-hidden relative">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <div class="text-center mb-16 space-y-4">
            <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Терминал<br />Диагностики
            </h2>
            <p class="text-zinc-500 font-medium text-lg">
              Интерактивная симуляция жизненных ситуаций для выявления ваших доминирующих паттернов.
            </p>
          </div>

          <!-- Assessment Flow -->
          <div v-if="!assessmentStarted" class="text-center">
            <div
              class="w-32 h-32 bg-zinc-800 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-zinc-700 shadow-2xl group cursor-pointer hover:border-cyan-500/50 transition-all duration-500">
              <i class="fas fa-play text-4xl text-cyan-400 group-hover:scale-125 transition-transform"></i>
            </div>
            <button @click="startAssessment"
              class="px-12 py-5 bg-white text-zinc-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-cyan-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-black/40">
              Инициализировать тест
            </button>
          </div>

          <!-- Wizard Flow -->
          <div v-else-if="!assessmentCompleted" class="space-y-12">
            <!-- Progress Bar High Contrast -->
            <div class="space-y-4">
              <div class="flex items-end justify-between">
                <div class="space-y-1">
                  <div class="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ШАГ {{
                    currentScenarioIndex + 1
                    }} ИЗ {{ scenarios.length }}</div>
                  <div class="text-xl font-black text-cyan-400 uppercase tracking-tight">{{ currentScenario.category }}
                  </div>
                </div>
                <div class="text-3xl font-black text-white leading-none">{{ Math.round(((currentScenarioIndex + 1) /
                  scenarios.length) * 100) }}%</div>
              </div>
              <div class="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  class="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-700 ease-out"
                  :style="{
                    width: `${((currentScenarioIndex + 1) / scenarios.length) * 100}%`,
                  }"></div>
              </div>
            </div>

            <transition name="slide-fade" mode="out-in">
              <div :key="currentScenario.id" class="space-y-10">
                <div class="bg-zinc-800/50 border border-zinc-800 p-8 rounded-3xl space-y-4 shadow-xl">
                  <h4 class="text-3xl font-black text-white leading-tight uppercase tracking-tight">
                    {{ currentScenario.title }}
                  </h4>
                  <p class="text-zinc-400 text-lg font-medium leading-relaxed">
                    {{ currentScenario.description }}
                  </p>
                </div>

                <div class="grid grid-cols-1 gap-4">
                  <button v-for="response in currentScenario.responses" :key="response.egoState"
                    @click="selectResponse(response)" :disabled="!!userResponse"
                    class="p-6 rounded-2xl border transition-all text-left group flex items-start gap-6 relative overflow-hidden"
                    :class="[
                      userResponse?.egoState === response.egoState
                        ? 'bg-zinc-800 border-cyan-500/50 shadow-2xl'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600',
                      !!userResponse && userResponse?.egoState !== response.egoState ? 'opacity-30 grayscale' : ''
                    ]">
                    <div
                      class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                      :class="userResponse ? getStateIconBg(response.egoState) : 'bg-zinc-800 text-zinc-600 group-hover:text-zinc-300'">
                      <i :class="getStateIcon(response.egoState)" class="text-xl"></i>
                    </div>
                    <div>
                      <p class="text-white text-lg font-black uppercase tracking-tight leading-tight mb-2">{{
                        response.text }}
                      </p>
                      <transition name="fade">
                        <span v-if="userResponse"
                          class="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                          :class="getStateBadgeClass(response.egoState)">
                          {{ getStateLabel(response.egoState) }}
                        </span>
                      </transition>
                    </div>
                  </button>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div v-if="userResponse" class="pt-10">
                <button @click="nextStep"
                  class="w-full py-6 bg-white text-zinc-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-cyan-500 hover:text-white transition-all active:scale-95 shadow-2xl">
                  {{ isLastScenario ? 'Просмотреть финальный отчет' : 'Продолжить симуляцию' }}
                </button>
              </div>
            </transition>
          </div>

          <!-- Result Summary View -->
          <div v-else class="text-center py-10 space-y-8">
            <div
              class="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <i class="fas fa-chart-line text-3xl text-emerald-400"></i>
            </div>
            <h3 class="text-3xl font-black text-white uppercase tracking-tight">Отчет сформирован</h3>
            <button @click="restartAssessment"
              class="px-8 py-4 bg-zinc-800 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-zinc-700 transition-colors">
              <i class="fas fa-redo mr-2"></i> Пройти повторно
            </button>
          </div>
        </div>
      </div>

      <!-- Pattern Recognition & Insights (Only show after completion) -->
      <transition name="slide-up">
        <div v-if="assessmentCompleted" class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <!-- Pattern Chart -->
          <div
            class="lg:col-span-2 bg-white dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i class="fas fa-chart-bar text-cyan-600 dark:text-cyan-400"></i>
                Ваши паттерны реакций
              </h3>
              <button @click="showInsights = !showInsights"
                class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <i class="fas fa-info-circle mr-1"></i>
                {{ showInsights ? "Скрыть" : "Показать" }} детали
              </button>
            </div>

            <div class="h-72 flex items-end justify-between gap-4 mb-6 px-4">
              <div v-for="pattern in patternData" :key="pattern.state"
                class="flex-1 flex flex-col items-center group cursor-pointer relative h-full justify-end"
                @mouseenter="hoveredPattern = pattern.state" @mouseleave="hoveredPattern = null">
                <transition name="slide-up">
                  <div v-if="hoveredPattern === pattern.state"
                    class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-cyan-500/50 rounded-lg px-3 py-2 text-xs text-white font-mono shadow-xl z-10 whitespace-nowrap">
                    <div class="font-bold text-cyan-400">
                      {{ pattern.percentage }}%
                    </div>
                    <div class="text-slate-400">{{ pattern.count }} реакций</div>
                  </div>
                </transition>

                <!-- Bar -->
                <div
                  class="w-full max-w-[60px] rounded-t-xl transition-all duration-1000 ease-out relative overflow-hidden"
                  :class="pattern.color" :style="{ height: `${Math.max(pattern.percentage, 5)}%` }">
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  </div>
                </div>

                <div class="text-center mt-3">
                  <div class="text-slate-900 dark:text-white font-medium text-sm mb-1">
                    {{ pattern.label }}
                  </div>
                  <div class="text-slate-500 dark:text-slate-500 text-xs font-mono">
                    {{ pattern.percentage }}%
                  </div>
                </div>
              </div>
            </div>

            <transition name="slide-fade">
              <div v-if="showInsights"
                class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-cyan-500/20">
                <h4 class="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
                  💡 Анализ баланса
                </h4>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {{ getBalanceAnalysis() }}
                </p>
              </div>
            </transition>
          </div>

          <!-- Quick Tips Card -->
          <div
            class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <i class="fas fa-compass text-emerald-600 dark:text-emerald-400 text-xl"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Советы эксперта</h3>
                <p class="text-slate-600 dark:text-slate-400 text-xs">Как работать с состояниями</p>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="bg-white dark:bg-slate-900/30 rounded-lg p-4 border border-emerald-500/10 shadow-sm dark:shadow-none">
                <div class="flex items-start gap-3">
                  <i class="fas fa-check-circle text-emerald-600 dark:text-emerald-400 mt-1"></i>
                  <div>
                    <h4 class="text-slate-900 dark:text-white font-medium text-sm mb-1">
                      Баланс — это ключ
                    </h4>
                    <p class="text-slate-600 dark:text-slate-400 text-xs">
                      Идеальное распределение: 50% Взрослый, 25% Родитель, 25%
                      Ребёнок
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-white dark:bg-slate-900/30 rounded-lg p-4 border border-cyan-500/10 shadow-sm dark:shadow-none">
                <div class="flex items-start gap-3">
                  <i class="fas fa-brain text-cyan-600 dark:text-cyan-400 mt-1"></i>
                  <div>
                    <h4 class="text-slate-900 dark:text-white font-medium text-sm mb-1">
                      Осознанность
                    </h4>
                    <p class="text-slate-600 dark:text-slate-400 text-xs">
                      Замечайте, из какого состояния вы действуете прямо сейчас
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-white dark:bg-slate-900/30 rounded-lg p-4 border border-purple-500/10 shadow-sm dark:shadow-none">
                <div class="flex items-start gap-3">
                  <i class="fas fa-exchange-alt text-purple-600 dark:text-purple-400 mt-1"></i>
                  <div>
                    <h4 class="text-slate-900 dark:text-white font-medium text-sm mb-1">Гибкость</h4>
                    <p class="text-slate-600 dark:text-slate-400 text-xs">
                      Учитесь переключаться между состояниями по необходимости
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Course Promotion -->
      <div class="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl p-6 md:p-8 border border-purple-500/20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <i class="fas fa-graduation-cap text-purple-600 dark:text-purple-400 text-3xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
                  Глубокое погружение
                </h3>
                <p class="text-purple-700 dark:text-purple-300">
                  Мастер-курс по транзактному анализу
                </p>
              </div>
            </div>

            <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Освойте полный спектр работы с эго-состояниями: от диагностики до
              трансформации деструктивных паттернов
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <i class="fas fa-check text-emerald-500 dark:text-emerald-400"></i>
                <span>12 часов практики</span>
              </div>
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <i class="fas fa-check text-emerald-500 dark:text-emerald-400"></i>
                <span>Сертификат</span>
              </div>
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <i class="fas fa-check text-emerald-500 dark:text-emerald-400"></i>
                <span>Работа с внутренним ребёнком</span>
              </div>
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <i class="fas fa-check text-emerald-500 dark:text-emerald-400"></i>
                <span>Личный коучинг</span>
              </div>
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <i class="fas fa-check text-emerald-500 dark:text-emerald-400"></i>
                <span>Трансформация родителя</span>
              </div>
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <i class="fas fa-check text-emerald-500 dark:text-emerald-400"></i>
                <span>Балансировка состояний</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button class="flex-1 btn-primary">
                <i class="fas fa-rocket mr-2"></i>
                Узнать о курсе
              </button>
              <button
                class="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-500/30 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all duration-300 shadow-sm dark:shadow-none">
                <i class="fas fa-play-circle mr-2"></i>
                Демо урок
              </button>
            </div>
          </div>

          <div class="hidden lg:block">
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-20">
              </div>
              <div
                class="relative bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm shadow-lg dark:shadow-none">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 dark:text-slate-400 text-sm">Студентов</span>
                    <span class="text-slate-900 dark:text-white font-bold">2,847</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 dark:text-slate-400 text-sm">Рейтинг</span>
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-yellow-500 dark:text-yellow-400 text-xs"></i>
                      <span class="text-slate-900 dark:text-white font-bold">4.9</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 dark:text-slate-400 text-sm">Длительность</span>
                    <span class="text-slate-900 dark:text-white font-bold">8 недель</span>
                  </div>
                  <div class="h-px bg-slate-200 dark:bg-slate-700/50"></div>
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500 dark:text-slate-400 text-sm">Цена</span>
                    <div>
                      <span class="text-slate-400 dark:text-slate-500 line-through text-sm">₽24,990</span>
                      <span class="text-emerald-600 dark:text-emerald-400 font-bold text-xl ml-2">₽14,990</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EgoStateCard from "~/components/space/psychology/EgoStateCard.vue";
import { useWindowSize } from '@vueuse/core';
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
  layout: "laboratory",
});

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const activeState = ref("adult");
const assessmentStarted = ref(false);
const assessmentCompleted = ref(false);
const currentScenarioIndex = ref(0);
const userResponse = ref(null);
const hoveredPattern = ref(null);
const completedScenarios = ref([]);
const showInsights = ref(false);
const sessionStartTime = ref(Date.now());
const sessionTime = ref("0:00");
const sessionResponses = ref({ parent: 0, adult: 0, child: 0 });

// Computed
const currentScenario = computed(() => scenarios[currentScenarioIndex.value]);
const isLastScenario = computed(() => currentScenarioIndex.value === scenarios.length - 1);

// Stats
const stats = computed(() => ({
  explored: Object.keys(sessionResponses.value).filter(
    (k) => sessionResponses.value[k] > 0
  ).length,
}));

const awarenessLevel = computed(() => {
  const total = Object.values(sessionResponses.value).reduce(
    (a, b) => a + b,
    0
  );
  if (total === 0) return 0;
  const adultPercentage = (sessionResponses.value.adult / total) * 100;
  return Math.min(Math.round(40 + adultPercentage * 0.6), 100);
});

// Update session time
onMounted(() => {
  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - sessionStartTime.value) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    sessionTime.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);

  onUnmounted(() => clearInterval(interval));
});

const egoStates = [
  {
    id: "parent",
    title: "РОДИТЕЛЬ",
    description: "Усвоенные модели поведения и моральные установки авторитетов.",
    icon: "fas fa-shield-halved",
    color: "from-cyan-500 to-blue-500",
    characteristics: ["Критикующий", "Заботливый", "Нормативный", "Контролирующий"],
  },
  {
    id: "adult",
    title: "ВЗРОСЛЫЙ",
    description: "Рациональный анализ реальности, свободный от предубеждений прошлого.",
    icon: "fas fa-brain",
    color: "from-emerald-500 to-green-500",
    characteristics: ["Логичный", "Объективный", "Фактологичный", "Решающий"],
  },
  {
    id: "child",
    title: "РЕБЁНОК",
    description: "Пространство эмоций, спонтанности, интуиции и творческого импульса.",
    icon: "fas fa-face-smile-beam",
    color: "from-orange-500 to-rose-500",
    characteristics: ["Свободный", "Адаптивный", "Бунтующий", "Творческий"],
  },
];

const scenarios = [
  {
    id: 1,
    title: "Критика на работе",
    description:
      "Ваш коллега публично критикует результаты вашей работы на совещании",
    icon: "fas fa-comment-dots",
    category: "Профессиональное",
    responses: [
      {
        egoState: "parent",
        text: "Я работаю здесь дольше тебя и знаю, как делать правильно. Давай я покажу, как надо.",
        recommendation:
          "Попробуйте перейти во взрослое состояние и конструктивно обсудить конкретные моменты без защитной реакции.",
        optimal: "Взрослый",
      },
      {
        egoState: "adult",
        text: "Спасибо за обратную связь. Давай обсудим конкретные моменты, чтобы улучшить результат.",
        recommendation:
          "Отличная взрослая реакция! Вы сохраняете объективность и открыты к конструктивному диалогу.",
        optimal: "Взрослый",
      },
      {
        egoState: "child",
        text: "Это несправедливо! Я так старался, а ты всё равно недоволен!",
        recommendation:
          "Эмоции понятны, но попробуйте перейти к взрослому анализу ситуации и конкретной обратной связи.",
        optimal: "Взрослый",
      },
    ],
  },
  {
    id: 2,
    title: "Важное решение",
    description:
      "Вам предложили новую должность, но это требует переезда в другой город",
    icon: "fas fa-route",
    category: "Карьера",
    responses: [
      {
        egoState: "parent",
        text: 'Родители всегда говорили: "Лучше синица в руках". Не стоит рисковать стабильностью.',
        recommendation:
          "Учитывайте опыт, но принимайте решение исходя из своих текущих ценностей и целей.",
        optimal: "Взрослый",
      },
      {
        egoState: "adult",
        text: "Давайте проанализирую все плюсы и минусы, финансовые аспекты и влияние на качество жизни.",
        recommendation:
          "Идеальный подход! Взвешенное взрослое решение на основе фактов и анализа.",
        optimal: "Взрослый",
      },
      {
        egoState: "child",
        text: "Боюсь всё испортить и потом жалеть. Может, лучше оставить всё как есть?",
        recommendation:
          "Страх естественен, но перейдите во взрослое состояние для объективной оценки рисков и возможностей.",
        optimal: "Взрослый",
      },
    ],
  },
  {
    id: 3,
    title: "Конфликт в семье",
    description:
      "Ваш партнер забыл о важной договорённости в третий раз за месяц",
    icon: "fas fa-home",
    category: "Личное",
    responses: [
      {
        egoState: "parent",
        text: "Сколько раз можно повторять одно и то же! Ты никогда не меняешься!",
        recommendation:
          "Критика усугубляет конфликт. Попробуйте выразить свои чувства из взрослого состояния.",
        optimal: "Взрослый",
      },
      {
        egoState: "adult",
        text: "Я расстроен(а), что это повторяется. Давай обсудим, как нам вместе решить эту проблему.",
        recommendation:
          "Прекрасно! Вы выражаете чувства без обвинений и предлагаете совместное решение.",
        optimal: "Взрослый",
      },
      {
        egoState: "child",
        text: "Тебе всё равно на меня! Я для тебя не важен(важна)!",
        recommendation:
          "Эмоции понятны, но обобщения и драматизация не помогут решить ситуацию.",
        optimal: "Взрослый",
      },
    ],
  },
  {
    id: 4,
    title: "Публичное выступление",
    description: "Вам нужно выступить с презентацией перед большой аудиторией",
    icon: "fas fa-presentation",
    category: "Профессиональное",
    responses: [
      {
        egoState: "parent",
        text: "Нужно показать себя компетентным профессионалом. Нельзя допустить ошибок.",
        recommendation:
          "Перфекционизм создаёт лишнее давление. Примите естественность процесса.",
        optimal: "Взрослый + Ребёнок",
      },
      {
        egoState: "adult",
        text: "Подготовлюсь тщательно, отрепетирую и буду гибко реагировать на вопросы.",
        recommendation: "Отличный баланс! Подготовка + гибкость = успех.",
        optimal: "Взрослый",
      },
      {
        egoState: "child",
        text: "А вдруг я забуду текст? Все будут смеяться надо мной!",
        recommendation:
          "Страх нормален, но катастрофизация усиливает тревогу. Вернитесь к фактам.",
        optimal: "Взрослый",
      },
    ],
  },
  {
    id: 5,
    title: "Творческий проект",
    description:
      "У вас появилась идея для творческого проекта, но нет гарантий успеха",
    icon: "fas fa-palette",
    category: "Творчество",
    responses: [
      {
        egoState: "parent",
        text: "Это несерьёзно и непрактично. Лучше заниматься чем-то более надёжным.",
        recommendation:
          "Критикующий родитель блокирует творчество. Позвольте себе исследовать.",
        optimal: "Взрослый + Ребёнок",
      },
      {
        egoState: "adult",
        text: "Оценю ресурсы, риски и потенциал. Можно начать с малого проекта.",
        recommendation: "Хороший баланс между разумом и творчеством!",
        optimal: "Взрослый + Ребёнок",
      },
      {
        egoState: "child",
        text: "Это будет круто! Я хочу попробовать прямо сейчас!",
        recommendation:
          "Энтузиазм прекрасен! Добавьте планирование для устойчивого результата.",
        optimal: "Ребёнок + Взрослый",
      },
    ],
  },
  {
    id: 6,
    title: "Финансовое давление",
    description: "Неожиданные расходы создали дыру в бюджете",
    icon: "fas fa-wallet",
    category: "Финансы",
    responses: [
      {
        egoState: "parent",
        text: "Надо было быть более осторожным и предусмотрительным!",
        recommendation:
          "Самокритика не решает проблему. Сосредоточьтесь на действиях.",
        optimal: "Взрослый",
      },
      {
        egoState: "adult",
        text: "Проанализирую ситуацию, составлю план действий и найду решения.",
        recommendation: "Идеально! Конструктивный подход к проблеме.",
        optimal: "Взрослый",
      },
      {
        egoState: "child",
        text: "Почему со мной всегда происходит что-то плохое?!",
        recommendation:
          "Жертвенная позиция забирает силы. Перейдите к активным действиям.",
        optimal: "Взрослый",
      },
    ],
  },
];

const patternData = computed(() => {
  const total = Object.values(sessionResponses.value).reduce(
    (a, b) => a + b,
    0
  );

  return [
    {
      state: "parent",
      label: "Родитель",
      percentage:
        total > 0
          ? Math.round((sessionResponses.value.parent / total) * 100)
          : 33,
      count: sessionResponses.value.parent,
      color: "bg-gradient-to-t from-blue-500 to-cyan-500",
    },
    {
      state: "adult",
      label: "Взрослый",
      percentage:
        total > 0
          ? Math.round((sessionResponses.value.adult / total) * 100)
          : 34,
      count: sessionResponses.value.adult,
      color: "bg-gradient-to-t from-emerald-500 to-green-500",
    },
    {
      state: "child",
      label: "Ребёнок",
      percentage:
        total > 0
          ? Math.round((sessionResponses.value.child / total) * 100)
          : 33,
      count: sessionResponses.value.child,
      color: "bg-gradient-to-t from-orange-500 to-red-500",
    },
  ];
});

const setActiveState = (stateId) => {
  activeState.value = stateId;
};

const startAssessment = () => {
  assessmentStarted.value = true;
  assessmentCompleted.value = false;
  currentScenarioIndex.value = 0;
  userResponse.value = null;
  completedScenarios.value = [];
  sessionResponses.value = { parent: 0, adult: 0, child: 0 };
};

const restartAssessment = () => {
  startAssessment();
};

const selectResponse = (response) => {
  if (userResponse.value) return; // Prevent changing answer
  userResponse.value = response;
  sessionResponses.value[response.egoState]++;

  if (!completedScenarios.value.includes(currentScenario.value.id)) {
    completedScenarios.value.push(currentScenario.value.id);
  }
};

const nextStep = () => {
  if (isLastScenario.value) {
    assessmentCompleted.value = true;
    showInsights.value = true;
  } else {
    currentScenarioIndex.value++;
    userResponse.value = null;
  }
};

const getStateLabel = (egoState) => {
  const states = {
    parent: "Родитель",
    adult: "Взрослый",
    child: "Ребёнок",
  };
  return states[egoState];
};

const getStateAnalysis = (egoState) => {
  const analyses = {
    parent:
      "Вы действуете из усвоенных паттернов поведения. Это может давать стабильность и направление, но иногда мешает видеть новые решения и гибко адаптироваться к текущим обстоятельствам.",
    adult:
      "Вы сохраняете рациональность и объективность. Это оптимальное состояние для решения сложных задач, принятия решений и конструктивного взаимодействия с другими людьми.",
    child:
      "Вы руководствуетесь эмоциями и спонтанными реакциями. Это состояние дает доступ к креативности и аутентичным чувствам, но не всегда практично для решения проблем.",
  };
  return analyses[egoState];
};

const getStateIcon = (egoState) => {
  const icons = {
    parent: "fas fa-user-shield",
    adult: "fas fa-brain",
    child: "fas fa-child",
  };
  return icons[egoState];
};

const getStateIconBg = (egoState) => {
  const bgs = {
    parent: "bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/30",
    adult: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/30",
    child: "bg-orange-500/20 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500/30",
  };
  return bgs[egoState];
};

const getStateBadgeClass = (egoState) => {
  const classes = {
    parent: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    adult: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    child: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
  };
  return classes[egoState];
};

const getStateUsage = (stateId) => {
  const total = Object.values(sessionResponses.value).reduce(
    (a, b) => a + b,
    0
  );
  if (total === 0) return 33;
  return Math.round((sessionResponses.value[stateId] / total) * 100);
};

const getStateBenefits = (stateId) => {
  const benefits = {
    parent: [
      "Передача опыта и знаний другим людям",
      "Установление границ и правил в отношениях",
      "Забота и поддержка близких людей",
      "Быстрое принятие решений на основе проверенных моделей",
    ],
    adult: [
      "Объективная оценка ситуации без эмоциональных искажений",
      "Эффективное решение проблем и конфликтов",
      "Адаптация к новым обстоятельствам",
      "Конструктивное взаимодействие с людьми",
    ],
    child: [
      "Доступ к креативности и творческому мышлению",
      "Спонтанность и радость в жизни",
      "Аутентичное выражение эмоций",
      "Способность играть и получать удовольствие",
    ],
  };
  return benefits[stateId] || [];
};

const getStateTraps = (stateId) => {
  const traps = {
    parent: [
      "Чрезмерная критичность к себе и другим",
      "Ригидность и неготовность к изменениям",
      "Навязывание своих взглядов окружающим",
      "Игнорирование текущих обстоятельств",
    ],
    adult: [
      "Чрезмерная рациональность, игнорирование эмоций",
      "Затягивание решений из-за излишнего анализа",
      "Потеря спонтанности и легкости",
      "Эмоциональная отстранённость",
    ],
    child: [
      "Импульсивность и необдуманные действия",
      "Зависимость от одобрения других",
      "Избегание ответственности",
      "Эмоциональная нестабильность",
    ],
  };
  return traps[stateId] || [];
};

const getBalanceAnalysis = () => {
  const total = Object.values(sessionResponses.value).reduce(
    (a, b) => a + b,
    0
  );
  if (total === 0)
    return "Пройдите несколько сценариев для получения персонализированного анализа вашего баланса эго-состояний.";

  const percentages = {
    parent: Math.round((sessionResponses.value.parent / total) * 100),
    adult: Math.round((sessionResponses.value.adult / total) * 100),
    child: Math.round((sessionResponses.value.child / total) * 100),
  };

  if (percentages.adult >= 50) {
    return "✅ Отличный баланс! Вы преимущественно действуете из взрослого состояния, что говорит о высокой осознанности и эффективности в решении задач.";
  } else if (percentages.parent > 40) {
    return "⚠️ Высокая активность родительского состояния. Попробуйте чаще переходить во взрослое состояние для более гибкого реагирования на ситуации.";
  } else if (percentages.child > 40) {
    return "⚠️ Преобладает детское состояние. Добавьте больше рациональности и структурности в принятие решений через взрослое состояние.";
  } else {
    return "📊 Сбалансированное распределение. Продолжайте развивать осознанность для оптимального использования каждого состояния по ситуации.";
  }
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  @apply bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none;
}

.btn-primary {
  @apply px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105;
}

.scenario-btn {
  @apply p-4 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600/50 shadow-sm dark:shadow-none;
}

.scenario-active {
  @apply bg-purple-500/10 border-purple-500/40 text-slate-900 dark:text-white shadow-lg shadow-purple-500/20;
}

.scenario-completed {
  @apply border-emerald-500/30;
}

.response-option {
  @apply p-5 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 transition-all duration-300 w-full text-left shadow-sm dark:shadow-none;
}

.response-selected {
  @apply bg-slate-100 dark:bg-slate-700/50 border-cyan-500/50 shadow-lg shadow-cyan-500/20;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-scale-enter-active {
  transition: all 0.5s ease-out;
}

.fade-scale-leave-active {
  transition: all 0.3s ease-in;
}

.fade-scale-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.fade-scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

<style scoped>.stat-card {
  @apply text-center px-6 py-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:scale-105;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
