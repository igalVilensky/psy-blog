<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useThemeStore } from '~/stores/theme'

definePageMeta({
  layout: 'laboratory',
  title: 'Конструктор Лаборатории'
})

interface Module {
  id: string
  type: 'tool' | 'test' | 'game' | 'experiment'
  category: 'games' | 'experiments' | 'psychology' | 'tools'
  name: string
  icon: string
  description: string
  path?: string
}

interface FlowItem extends Module {
  instanceId: string
}

// Real Data from Codebase
const availableModules: Module[] = [
  // Games
  {
    id: 'game-memory',
    type: 'game',
    category: 'games',
    name: 'Тренировка Памяти',
    icon: '🧩',
    description: 'Развитие визуальной и пространственной памяти',
    path: '/lab/games/memory'
  },
  {
    id: 'game-reaction',
    type: 'game',
    category: 'games',
    name: 'Тест Реакции',
    icon: '⚡',
    description: 'Измерение скорости реакции на стимулы',
    path: '/lab/games/reaction'
  },
  {
    id: 'game-stroop',
    type: 'game',
    category: 'games',
    name: 'Эффект Струпа',
    icon: '🎨',
    description: 'Тренировка когнитивной гибкости',
    path: '/lab/games/stroop'
  },

  // Experiments
  {
    id: 'exp-wheel',
    type: 'experiment',
    category: 'experiments',
    name: 'Колесо Баланса',
    icon: '🎡',
    description: 'Оценка удовлетворенности сферами жизни',
    path: '/lab/experiments/wheel-of-life'
  },
  {
    id: 'exp-growth',
    type: 'experiment',
    category: 'experiments',
    name: 'Искра Роста',
    icon: '✨',
    description: 'Ежедневные задания для саморазвития',
    path: '/lab/experiments/daily-growth-spark'
  },
  {
    id: 'exp-conversation',
    type: 'experiment',
    category: 'experiments',
    name: 'Глубокий Разговор',
    icon: '💬',
    description: 'Инструмент для значимых бесед',
    path: '/lab/experiments/deep-conversation'
  },

  // Psychology
  {
    id: 'psy-ego',
    type: 'tool',
    category: 'psychology',
    name: 'Эго-состояния',
    icon: '🎭',
    description: 'Анализ родитель-взрослый-ребенок',
    path: '/lab/psychology/ego-states'
  },
  {
    id: 'psy-habit',
    type: 'tool',
    category: 'psychology',
    name: 'Перезапись Привычек',
    icon: '🔄',
    description: 'Нейропластичность и изменение поведения',
    path: '/lab/psychology/habit-override'
  },
  {
    id: 'psy-podcasts',
    type: 'tool',
    category: 'psychology',
    name: 'Психо-Подкасты',
    icon: '🎧',
    description: 'Аудиоматериалы для развития',
    path: '/lab/psychology/podcasts'
  },

  // General Tools
  {
    id: 'tool-mindfulness',
    type: 'tool',
    category: 'tools',
    name: 'Медитация',
    icon: '🧘',
    description: 'Практики осознанности',
    path: '/lab/mindfulness'
  },
  {
    id: 'tool-sound',
    type: 'tool',
    category: 'tools',
    name: 'Звукотерапия',
    icon: '🔊',
    description: 'Бинауральные ритмы и фокус',
    path: '/lab/sound-therapy'
  },
  {
    id: 'tool-brain-map',
    type: 'tool',
    category: 'tools',
    name: 'Карта Мозга',
    icon: '🧠',
    description: 'Визуализация когнитивных функций',
    path: '/lab/brain-map'
  }
]

const categories = {
  games: 'Игры',
  experiments: 'Эксперименты',
  psychology: 'Психология',
  tools: 'Инструменты'
}

const labFlow = ref<FlowItem[]>([])
const isDragging = ref(false)
const draggedItem = ref<Module | null>(null)
const expandedCategories = ref<Set<string>>(new Set(['games'])) // Default first category open
const mobileSidebarOpen = ref(false)
const flowName = ref('Моя Лаборатория')
const isSaving = ref(false)
const isLoading = ref(false)
const savedFlows = ref<any[]>([])

// Stores
const auth = useAuthStore()
const themeStore = useThemeStore()
const { $firestore } = useNuxtApp()

// Helper functions
const getUserInitials = (user: any) => {
  if (user.displayName) {
    return user.displayName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return user.email ? user.email[0].toUpperCase() : 'У'
}

const logout = async () => {
  await auth.logout()
  navigateTo('/lab')
}

// Drag and Drop Handlers
const onDragStart = (event: DragEvent, module: Module) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('application/json', JSON.stringify(module))
  }
  draggedItem.value = module
  isDragging.value = true
}

const onDragEnd = () => {
  isDragging.value = false
  draggedItem.value = null
}

const onDrop = (event: DragEvent) => {
  const data = event.dataTransfer?.getData('application/json')
  if (data) {
    const module = JSON.parse(data) as Module
    addItemToFlow(module)
  }
  isDragging.value = false
}

const addItemToFlow = (module: Module) => {
  const newItem: FlowItem = {
    ...module,
    instanceId: `${module.id}-${Date.now()}`
  }
  labFlow.value.push(newItem)
}

const removeItem = (index: number) => {
  labFlow.value.splice(index, 1)
}

const saveFlow = async () => {
  if (!auth.user) {
    alert('Пожалуйста, войдите в систему, чтобы сохранить поток')
    return
  }

  if (labFlow.value.length === 0) {
    alert('Добавьте хотя бы один модуль в поток')
    return
  }

  if (!flowName.value.trim()) {
    alert('Пожалуйста, введите название потока')
    return
  }

  isSaving.value = true

  try {
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')

    const flowData = {
      name: flowName.value.trim(),
      modules: labFlow.value.map(item => ({
        id: item.id,
        type: item.type,
        category: item.category,
        name: item.name,
        icon: item.icon,
        description: item.description,
        path: item.path
      })),
      userId: auth.user.uid,
      userEmail: auth.user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const labFlowsRef = collection($firestore, 'labFlows')
    await addDoc(labFlowsRef, flowData)

    alert(`✅ Поток "${flowName.value}" успешно сохранен!`)
  } catch (error) {
    console.error('Error saving flow:', error)
    alert('❌ Ошибка при сохранении потока. Попробуйте еще раз.')
  } finally {
    isSaving.value = false
  }
}

const modulesByCategory = computed(() => {
  const grouped: Record<string, Module[]> = {}
  for (const module of availableModules) {
    if (!grouped[module.category]) {
      grouped[module.category] = []
    }
    grouped[module.category].push(module)
  }
  return grouped
})

const toggleCategory = (categoryKey: string) => {
  if (expandedCategories.value.has(categoryKey)) {
    expandedCategories.value.delete(categoryKey)
  } else {
    expandedCategories.value.add(categoryKey)
  }
}

const isCategoryExpanded = (categoryKey: string) => {
  return expandedCategories.value.has(categoryKey)
}

// Load user's saved flows
const loadUserFlows = async () => {
  if (!auth.user) return

  isLoading.value = true

  try {
    const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore')

    const labFlowsRef = collection($firestore, 'labFlows')
    const q = query(
      labFlowsRef,
      where('userId', '==', auth.user.uid),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    savedFlows.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Load the most recent flow if available
    if (savedFlows.value.length > 0) {
      const latestFlow = savedFlows.value[0]
      flowName.value = latestFlow.name
      labFlow.value = latestFlow.modules.map((module: any) => ({
        ...module,
        instanceId: `${module.id}-${Date.now()}-${Math.random()}`
      }))
    }
  } catch (error) {
    console.error('Error loading flows:', error)
  } finally {
    isLoading.value = false
  }
}

// Load flows on mount
onMounted(() => {
  if (auth.user) {
    loadUserFlows()
  }
})
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar: Module Library -->
    <aside
      class="fixed left-0 top-0 z-10 hidden h-screen w-[280px] shrink-0 flex-col border-r border-slate-200 bg-white md:flex dark:border-slate-700 dark:bg-slate-800">
      <!-- Header Section -->
      <div class="shrink-0 border-b border-slate-200 p-6 dark:border-cyan-500/20">
        <NuxtLink to="/" class="mb-4 flex items-center space-x-3 group">
          <div class="relative">
            <div
              class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-purple-400/30 bg-slate-100 dark:bg-slate-950">
              <img src="/mindqlab-logo.png" alt="MindQLab Logo"
                class="relative h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div
              class="absolute -inset-1 rounded-full bg-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            </div>
          </div>
          <div>
            <div
              class="text-xs font-mono font-semibold tracking-widest text-slate-600 transition-colors group-hover:text-slate-800 dark:text-cyan-400 dark:group-hover:text-cyan-300">
              ГЛАВНАЯ
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400">mindqlab.com</div>
          </div>
        </NuxtLink>

        <!-- Lab Logo -->
        <NuxtLink to="/lab" class="lab-logo group block">
          <div
            class="flex items-center space-x-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-100 dark:border-cyan-500/10 dark:bg-slate-800/50 dark:hover:bg-slate-800/80">
            <div
              class="petri-dish relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20"></div>
              <i class="fas fa-brain relative z-10 text-xl text-white"></i>
            </div>
            <div>
              <div class="font-montserrat text-lg font-bold text-slate-900 dark:text-white">
                MIND Q LAB
              </div>
              <div class="font-mono text-xs text-cyan-700 dark:text-cyan-400/70">
                v2.0 ЭКСПЕРИМЕНТАЛЬНАЯ
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Module Categories -->
      <div class="flex-1 overflow-y-auto p-2">
        <div class="mb-3 px-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-500">
          МОДУЛИ КОНСТРУКТОРА
        </div>
        <div v-for="(label, key) in categories" :key="key" class="mb-2">
          <!-- Category Header (Collapsible) -->
          <button @click="toggleCategory(key)"
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {{ label }}
            </h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="size-4 text-slate-400 transition-transform"
              :class="{ 'rotate-180': isCategoryExpanded(key) }">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <!-- Category Items (Collapsible) -->
          <div class="mt-2 space-y-2 overflow-hidden transition-all duration-300"
            :class="isCategoryExpanded(key) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'">
            <div v-for="module in modulesByCategory[key]" :key="module.id" draggable="true"
              @dragstart="onDragStart($event, module)" @dragend="onDragEnd" @click="addItemToFlow(module)"
              class="cursor-grab rounded-lg border border-slate-100 bg-slate-50 p-2 transition-all hover:border-blue-400 hover:shadow-sm active:cursor-grabbing dark:border-slate-700 dark:bg-slate-700/50 dark:hover:border-blue-500">
              <div class="flex items-center gap-3">
                <span class="shrink-0 text-xl">{{ module.icon }}</span>
                <div class="min-w-0 flex-1">
                  <h3 class="truncate text-sm font-medium text-slate-900 dark:text-white">{{ module.name }}</h3>
                  <p class="truncate text-[10px] text-slate-500 dark:text-slate-400">{{ module.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Section -->
      <div class="z-10 mt-auto border-t border-slate-200 bg-white p-4 dark:border-cyan-500/10 dark:bg-slate-900">
        <ClientOnly>
          <div v-if="auth.user"
            class="user-info rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-cyan-500/10 dark:bg-slate-800/50">
            <div class="mb-3 flex items-center space-x-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 font-bold text-white">
                {{ getUserInitials(auth.user) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="mb-0.5 font-mono text-xs text-cyan-700 dark:text-cyan-400/70">
                  ИССЛЕДОВАТЕЛЬ
                </div>
                <div class="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {{ auth.user.displayName || auth.user.email }}
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <NuxtLink to="/profile"
                class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-center text-xs font-medium text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-600/50 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-700">
                Профиль
              </NuxtLink>
              <button @click="logout"
                class="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-center text-xs font-medium text-red-600 transition-all hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20">
                Выход
              </button>
            </div>
          </div>
          <div v-else class="auth-buttons space-y-2">
            <NuxtLink to="/login"
              class="block w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800">
              Вход для исследователей
            </NuxtLink>
            <NuxtLink to="/register"
              class="block w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-center text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-600 hover:to-blue-700">
              Присоединиться
            </NuxtLink>
          </div>
        </ClientOnly>
      </div>

      <!-- Theme Toggle -->
      <div class="z-10 border-t border-slate-200 bg-white p-4 dark:border-cyan-500/10 dark:bg-slate-900">
        <button @click="themeStore.toggleTheme()"
          class="group flex w-full items-center justify-between rounded-lg border border-yellow-500/20 bg-slate-50 p-2 transition-colors hover:bg-slate-100 dark:border-yellow-500/10 dark:bg-slate-800/30 dark:hover:bg-slate-800/50">
          <span class="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
            <i class="fas text-xs text-yellow-600 transition-transform duration-300 group-hover:rotate-90 dark:text-yellow-400"
              :class="themeStore.theme === 'dark' ? 'fa-moon' : 'fa-sun'"></i>
            <span>Режим</span>
          </span>
          <span class="font-mono text-xs font-medium text-yellow-700 dark:text-yellow-400">
            {{ themeStore.theme === "dark" ? "НОЧНОЙ" : "ДНЕВНОЙ" }}
          </span>
        </button>
      </div>
    </aside>

    <!-- Main Canvas: Flow Builder -->
    <main class="flex-1 overflow-hidden bg-slate-100 p-4 md:p-8 dark:bg-slate-950">
      <div class="mx-auto flex h-full max-w-4xl flex-col">
        <header class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div class="flex-1">
            <input v-model="flowName" type="text" placeholder="Название лаборатории..."
              class="w-full text-xl font-bold text-slate-900 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-colors md:text-2xl dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-400" />
            <p class="text-sm text-slate-500 dark:text-slate-400">Спроектируйте свой поток</p>
          </div>
          <div class="flex gap-2">
            <button
              class="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 md:text-sm dark:text-slate-300 dark:hover:bg-slate-800">
              Предпросмотр
            </button>
            <button @click="saveFlow" :disabled="isSaving"
              class="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </header>

        <!-- Mobile Sidebar (Collapsible) -->
        <div class="mb-4 md:hidden">
          <button @click="mobileSidebarOpen = !mobileSidebarOpen"
            class="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
            <span class="text-sm font-semibold text-slate-800 dark:text-white">Библиотека модулей</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="size-5 text-slate-400 transition-transform"
              :class="{ 'rotate-180': mobileSidebarOpen }">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <div class="mt-2 overflow-hidden transition-all duration-300"
            :class="mobileSidebarOpen ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'">
            <div
              class="bg-white rounded-lg border border-slate-200 p-2 max-h-[60vh] overflow-y-auto dark:bg-slate-800 dark:border-slate-700">
              <div v-for="(label, key) in categories" :key="key" class="mb-2">
                <button @click="toggleCategory(key)"
                  class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50">
                  <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {{ label }}
                  </h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="size-4 text-slate-400 transition-transform"
                    :class="{ 'rotate-180': isCategoryExpanded(key) }">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                <div class="space-y-2 mt-2 overflow-hidden transition-all duration-300"
                  :class="isCategoryExpanded(key) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'">
                  <div v-for="module in modulesByCategory[key]" :key="module.id" @click="addItemToFlow(module)"
                    class="cursor-pointer rounded-lg border border-slate-100 bg-slate-50 p-2 transition-all hover:border-blue-400 hover:shadow-sm dark:border-slate-700 dark:bg-slate-700/50 dark:hover:border-blue-500">
                    <div class="flex items-center gap-3">
                      <span class="text-xl shrink-0">{{ module.icon }}</span>
                      <div class="min-w-0 flex-1">
                        <h3 class="truncate text-sm font-medium text-slate-900 dark:text-white">{{ module.name }}</h3>
                        <p class="truncate text-[10px] text-slate-500 dark:text-slate-400">{{ module.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drop Zone -->
        <div @dragover.prevent @drop="onDrop"
          class="relative flex flex-1 flex-col overflow-y-auto rounded-xl border-2 border-dashed transition-all min-h-[400px]"
          :class="[
            isDragging
              ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-900/20'
              : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'
          ]">
          <!-- Empty State -->
          <div v-if="labFlow.length === 0"
            class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-slate-400">
            <div class="mb-4 rounded-full bg-slate-100 p-4 md:p-6 dark:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-8 md:size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <p class="text-base font-medium md:text-lg">Начните создание</p>
            <p class="text-xs md:text-sm">Перетащите модули из меню или нажмите на них</p>
          </div>

          <!-- Flow Items -->
          <div v-else class="space-y-3 p-4 md:space-y-4 md:p-6">
            <div v-for="(item, index) in labFlow" :key="item.instanceId"
              class="group relative flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md md:gap-4 md:p-4 dark:border-slate-700 dark:bg-slate-800">
              <!-- Order Number -->
              <div
                class="flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 md:size-8 md:text-sm dark:bg-slate-700 dark:text-slate-300">
                {{ index + 1 }}
              </div>

              <!-- Icon -->
              <div class="text-2xl md:text-3xl">{{ item.icon }}</div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h3 class="truncate text-sm font-bold text-slate-900 md:text-base dark:text-white">{{ item.name }}</h3>
                <p class="truncate text-xs text-slate-500 md:text-sm dark:text-slate-400">{{ item.description }}</p>
              </div>

              <!-- Actions -->
              <button @click="removeItem(index)"
                class="shrink-0 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600 md:p-2 dark:text-slate-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                title="Удалить модуль">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-4 md:size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Custom scrollbar for the sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}
</style>
