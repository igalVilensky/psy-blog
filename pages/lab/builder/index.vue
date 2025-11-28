<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useThemeStore } from '~/stores/theme'
import { useNotification } from '~/composables/useNotification'
import Notification from '~/components/base/Notification.vue'
import FlowCard from '~/components/lab/FlowCard.vue'
import FlowExecutor from '~/components/lab/FlowExecutor.vue'
import ScheduleConfig, { type FlowSchedule } from '~/components/lab/ScheduleConfig.vue'

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

interface LabFlow {
  id?: string
  name: string
  description: string
  type: 'routine' | 'protocol' | 'session' | 'custom'
  category: 'morning' | 'evening' | 'stress' | 'focus' | 'sleep' | 'growth' | 'custom'
  tags: string[]
  modules: any[]

  // Metadata
  userId: string
  userEmail: string
  createdAt: any
  updatedAt: any

  // Sharing & Visibility
  isPublic: boolean
  isTemplate: boolean
  shareCode?: string

  // Usage & Analytics
  timesUsed: number
  lastUsedAt?: any
  estimatedDuration?: number

  // Scheduling
  schedule?: FlowSchedule
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

const flowTypes = {
  routine: 'Рутина',
  protocol: 'Протокол',
  session: 'Сессия',
  custom: 'Свободный'
}

const flowCategories = {
  morning: 'Утро',
  evening: 'Вечер',
  stress: 'Стресс',
  focus: 'Фокус',
  sleep: 'Сон',
  growth: 'Рост',
  custom: 'Другое'
}

const prebuiltTemplates: Partial<LabFlow>[] = [
  {
    name: 'Утренняя Активация',
    description: 'Зарядитесь энергией и настройтесь на продуктивный день.',
    type: 'routine',
    category: 'morning',
    tags: ['энергия', 'утро', 'продуктивность'],
    modules: [
      {
        id: 'tool-mindfulness',
        type: 'tool',
        category: 'tools',
        name: 'Медитация',
        icon: '🧘',
        description: 'Короткая практика осознанности'
      },
      {
        id: 'exp-growth',
        type: 'experiment',
        category: 'experiments',
        name: 'Искра Роста',
        icon: '✨',
        description: 'Постановка намерения на день'
      }
    ],
    estimatedDuration: 15
  },
  {
    name: 'Глубокий Фокус',
    description: 'Протокол для входа в состояние потока и концентрации.',
    type: 'protocol',
    category: 'focus',
    tags: ['работа', 'поток', 'концентрация'],
    modules: [
      {
        id: 'tool-sound',
        type: 'tool',
        category: 'tools',
        name: 'Звукотерапия',
        icon: '🔊',
        description: 'Бинауральные ритмы для фокуса'
      },
      {
        id: 'game-stroop',
        type: 'game',
        category: 'games',
        name: 'Эффект Струпа',
        icon: '🎨',
        description: 'Разминка для мозга'
      }
    ],
    estimatedDuration: 45
  },
  {
    name: 'Вечернее Расслабление',
    description: 'Подготовка ко сну и снятие дневного напряжения.',
    type: 'routine',
    category: 'evening',
    tags: ['сон', 'релакс', 'вечер'],
    modules: [
      {
        id: 'exp-wheel',
        type: 'experiment',
        category: 'experiments',
        name: 'Колесо Баланса',
        icon: '🎡',
        description: 'Рефлексия дня'
      },
      {
        id: 'tool-mindfulness',
        type: 'tool',
        category: 'tools',
        name: 'Медитация',
        icon: '🧘',
        description: 'Сканирование тела'
      }
    ],
    estimatedDuration: 20
  },
  {
    name: 'SOS: Анти-Стресс',
    description: 'Быстрая помощь при высоком уровне стресса и тревоги.',
    type: 'session',
    category: 'stress',
    tags: ['спокойствие', 'тревога', 'дыхание'],
    modules: [
      {
        id: 'tool-mindfulness',
        type: 'tool',
        category: 'tools',
        name: 'Медитация',
        icon: '🧘',
        description: 'Дыхательные практики'
      },
      {
        id: 'tool-sound',
        type: 'tool',
        category: 'tools',
        name: 'Звукотерапия',
        icon: '🔊',
        description: 'Успокаивающие звуки природы'
      }
    ],
    estimatedDuration: 10
  },
  {
    name: 'Творческий Прорыв',
    description: 'Активация креативного мышления и поиск новых идей.',
    type: 'session',
    category: 'growth',
    tags: ['креативность', 'идеи', 'мозг'],
    modules: [
      {
        id: 'game-reaction',
        type: 'game',
        category: 'games',
        name: 'Тест Реакции',
        icon: '⚡',
        description: 'Активация нервной системы'
      },
      {
        id: 'psy-podcasts',
        type: 'tool',
        category: 'psychology',
        name: 'Психо-Подкасты',
        icon: '🎧',
        description: 'Вдохновение от экспертов'
      }
    ],
    estimatedDuration: 30
  }
]

const labFlow = ref<FlowItem[]>([])
const isDragging = ref(false)
const draggedItem = ref<Module | null>(null)
const expandedCategories = ref<Set<string>>(new Set(['games'])) // Default first category open
const mobileSidebarOpen = ref(false)

// Flow metadata
const flowName = ref('Моя Лаборатория')
const flowDescription = ref('')
const flowType = ref<'routine' | 'protocol' | 'session' | 'custom'>('custom')
const flowCategory = ref<'morning' | 'evening' | 'stress' | 'focus' | 'sleep' | 'growth' | 'custom'>('custom')
const flowTags = ref<string[]>([])
const tagInput = ref('')

// UI state
const currentView = ref<'builder' | 'myflows' | 'templates' | 'history'>('builder')
const isSaving = ref(false)
const isLoading = ref(false)
const savedFlows = ref<LabFlow[]>([])
const flowSessions = ref<any[]>([])
const editingFlowId = ref<string | null>(null)

// Execution state
const showFlowExecutor = ref(false)
const selectedFlowForExecution = ref<LabFlow | null>(null)

// Scheduling State
const showScheduleModal = ref(false)
const selectedFlowForSchedule = ref<LabFlow | null>(null)

// Stores
const auth = useAuthStore()
const themeStore = useThemeStore()
const { $firestore } = useNuxtApp()
const { notificationMessage, notificationType, notificationVisible, showNotification, hideNotification } = useNotification()

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
    showNotification(
      'Войдите или зарегистрируйтесь, чтобы сохранить свои лаборатории и получить доступ ко всем функциям',
      'warning',
      0 // Don't auto-dismiss
    )
    return
  }

  if (labFlow.value.length === 0) {
    showNotification('Добавьте хотя бы один модуль в поток', 'warning')
    return
  }

  if (!flowName.value.trim()) {
    showNotification('Пожалуйста, введите название потока', 'warning')
    return
  }

  isSaving.value = true

  try {
    const { collection, addDoc, updateDoc, doc, serverTimestamp } = await import('firebase/firestore')

    const flowData: any = {
      name: flowName.value.trim(),
      description: flowDescription.value.trim(),
      type: flowType.value,
      category: flowCategory.value,
      tags: flowTags.value,
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
      updatedAt: serverTimestamp(),

      // Sharing & visibility
      isPublic: false,
      isTemplate: false,

      // Usage analytics
      timesUsed: 0,
      estimatedDuration: labFlow.value.length * 5 // Rough estimate: 5 min per module
    }

    const labFlowsRef = collection($firestore, 'labFlows')

    if (editingFlowId.value) {
      // Update existing flow
      const flowDocRef = doc($firestore, 'labFlows', editingFlowId.value)
      await updateDoc(flowDocRef, flowData)
      showNotification(`Поток "${flowName.value}" успешно обновлен!`, 'success')

      // Update in local array
      const index = savedFlows.value.findIndex(f => f.id === editingFlowId.value)
      if (index !== -1) {
        savedFlows.value[index] = { ...savedFlows.value[index], ...flowData }
      }
    } else {
      // Create new flow
      flowData.createdAt = serverTimestamp()
      const docRef = await addDoc(labFlowsRef, flowData)
      showNotification(`Поток "${flowName.value}" успешно сохранен!`, 'success')

      // Add to local array
      savedFlows.value.unshift({ id: docRef.id, ...flowData })
    }

    // Reset form
    editingFlowId.value = null
    currentView.value = 'myflows'
  } catch (error) {
    console.error('Error saving flow:', error)
    showNotification('Ошибка при сохранении потока. Попробуйте еще раз.', 'error')
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

// Tag management
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !flowTags.value.includes(tag)) {
    flowTags.value.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  flowTags.value.splice(index, 1)
}

// Flow management functions
const createNewFlow = () => {
  labFlow.value = []
  flowName.value = 'Новый Поток'
  flowDescription.value = ''
  flowType.value = 'custom'
  flowCategory.value = 'custom'
  flowTags.value = []
  editingFlowId.value = null
  currentView.value = 'builder'
}

const editFlow = (flow: LabFlow) => {
  labFlow.value = flow.modules.map((module: any) => ({
    ...module,
    instanceId: `${module.id}-${Date.now()}-${Math.random()}`
  }))
  flowName.value = flow.name
  flowDescription.value = flow.description || ''
  flowType.value = flow.type
  flowCategory.value = flow.category
  flowTags.value = [...flow.tags]
  editingFlowId.value = flow.id || null
  currentView.value = 'builder'
}

const duplicateFlow = async (flow: LabFlow) => {
  labFlow.value = flow.modules.map((module: any) => ({
    ...module,
    instanceId: `${module.id}-${Date.now()}-${Math.random()}`
  }))
  flowName.value = `${flow.name} (Копия)`
  flowDescription.value = flow.description || ''
  flowType.value = flow.type
  flowCategory.value = flow.category
  flowTags.value = [...flow.tags]
  editingFlowId.value = null
  currentView.value = 'builder'
  showNotification('Поток скопирован. Отредактируйте и сохраните.', 'success')
}

const deleteFlow = async (flowId: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот поток?')) return

  try {
    const { doc, deleteDoc } = await import('firebase/firestore')
    const flowDocRef = doc($firestore, 'labFlows', flowId)
    await deleteDoc(flowDocRef)

    savedFlows.value = savedFlows.value.filter(f => f.id !== flowId)
    showNotification('Поток успешно удален', 'success')
  } catch (error) {
    console.error('Error deleting flow:', error)
    showNotification('Ошибка при удалении потока', 'error')
  }
}

const toggleShare = async (flow: LabFlow) => {
  if (!auth.user || !flow.id) return

  try {
    const { $firestore } = useNuxtApp()
    const { doc, updateDoc } = await import('firebase/firestore')
    const flowRef = doc($firestore, 'labFlows', flow.id)

    // Toggle public status
    const newIsPublic = !flow.isPublic
    await updateDoc(flowRef, { isPublic: newIsPublic })

    // Update local state
    const index = savedFlows.value.findIndex(f => f.id === flow.id)
    if (index !== -1) {
      savedFlows.value[index].isPublic = newIsPublic
    }

    if (newIsPublic) {
      // Generate and copy link
      const shareLink = `${window.location.origin}/lab/flow/${flow.id}`
      await navigator.clipboard.writeText(shareLink)
      showNotification('Поток опубликован! Ссылка скопирована в буфер обмена.', 'success')
    } else {
      showNotification('Поток теперь приватный.', 'info')
    }
  } catch (error) {
    console.error('Error sharing flow:', error)
    showNotification('Ошибка при изменении настроек доступа', 'error')
  }
}

const openScheduleModal = (flow: LabFlow) => {
  selectedFlowForSchedule.value = flow
  showScheduleModal.value = true
}

const saveSchedule = async (schedule: FlowSchedule) => {
  if (!selectedFlowForSchedule.value?.id) return

  try {
    const { $firestore } = useNuxtApp()
    const { doc, updateDoc } = await import('firebase/firestore')
    const flowRef = doc($firestore, 'labFlows', selectedFlowForSchedule.value.id)

    await updateDoc(flowRef, { schedule })

    // Update local state
    const index = savedFlows.value.findIndex(f => f.id === selectedFlowForSchedule.value?.id)
    if (index !== -1) {
      savedFlows.value[index].schedule = schedule
    }

    showScheduleModal.value = false
    selectedFlowForSchedule.value = null
    showNotification('Расписание сохранено', 'success')
  } catch (error) {
    console.error('Error saving schedule:', error)
    showNotification('Ошибка при сохранении расписания', 'error')
  }
}

const useTemplate = (template: Partial<LabFlow>) => {
  labFlow.value = template.modules?.map((templateModule: any) => {
    const originalModule = availableModules.find(m => m.id === templateModule.id)
    return {
      ...originalModule,
      ...templateModule,
      instanceId: `${templateModule.id}-${Date.now()}-${Math.random()}`
    }
  }) || []

  flowName.value = template.name || 'Новый Поток'
  flowDescription.value = template.description || ''
  flowType.value = template.type || 'custom'
  flowCategory.value = template.category || 'custom'
  flowTags.value = [...(template.tags || [])]
  editingFlowId.value = null

  currentView.value = 'builder'
  showNotification('Шаблон применен. Вы можете отредактировать его и сохранить.', 'success')
}

const startFlow = (flow: LabFlow) => {
  if (flow.modules.length === 0) {
    showNotification('В этом потоке нет модулей', 'warning')
    return
  }

  selectedFlowForExecution.value = flow
  showFlowExecutor.value = true
}

const handleFlowComplete = async (sessionData: any) => {
  if (!selectedFlowForExecution.value || !auth.user) return

  try {
    const { collection, addDoc, updateDoc, doc, serverTimestamp, increment } = await import('firebase/firestore')

    // 1. Create session record
    await addDoc(collection($firestore, 'flowSessions'), {
      flowId: selectedFlowForExecution.value.id,
      flowName: selectedFlowForExecution.value.name,
      userId: auth.user.uid,
      userEmail: auth.user.email,
      startedAt: serverTimestamp(), // Ideally this should be passed from executor start time
      completedAt: serverTimestamp(),
      duration: sessionData.duration,
      status: 'completed',
      modulesCount: selectedFlowForExecution.value.modules.length
    })

    // 2. Update flow stats
    if (selectedFlowForExecution.value.id) {
      const flowRef = doc($firestore, 'labFlows', selectedFlowForExecution.value.id)
      await updateDoc(flowRef, {
        timesUsed: increment(1),
        lastUsedAt: serverTimestamp()
      })

      // Update local state
      const index = savedFlows.value.findIndex(f => f.id === selectedFlowForExecution.value?.id)
      if (index !== -1) {
        savedFlows.value[index].timesUsed = (savedFlows.value[index].timesUsed || 0) + 1
        savedFlows.value[index].lastUsedAt = new Date()
      }
    }

    showNotification('Поток успешно завершен! Отличная работа!', 'success')
  } catch (error) {
    console.error('Error saving session:', error)
    showNotification('Ошибка при сохранении результата', 'error')
  } finally {
    showFlowExecutor.value = false
    selectedFlowForExecution.value = null
  }
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
    })) as LabFlow[]

    // Switch to myflows view if user has saved flows
    if (savedFlows.value.length > 0 && currentView.value === 'builder' && labFlow.value.length === 0) {
      currentView.value = 'myflows'
    }
  } catch (error) {
    console.error('Error loading flows:', error)
  } finally {
    isLoading.value = false
  }
}

const loadFlowSessions = async () => {
  if (!auth.user) return

  try {
    const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore')

    const sessionsRef = collection($firestore, 'flowSessions')
    const q = query(
      sessionsRef,
      where('userId', '==', auth.user.uid),
      orderBy('completedAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    flowSessions.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      completedAt: doc.data().completedAt?.toDate()
    }))
  } catch (error) {
    console.error('Error loading sessions:', error)
  }
}

// Watch for view changes
watch(currentView, (newView) => {
  if (newView === 'history' && auth.user) {
    loadFlowSessions()
  } else if (newView === 'myflows' && auth.user) {
    loadUserFlows()
  }
})

// Load flows on mount
onMounted(() => {
  if (auth.user) {
    loadUserFlows()
    loadFlowSessions()
  }

  // Listen for scheduled flow execution events from notifications
  window.addEventListener('execute-scheduled-flow', (event) => {
    const { flowId } = event.detail

    // Find the flow and start it
    const flow = savedFlows.value.find(f => f.id === flowId)
    if (flow) {
      startFlow(flow)
    } else {
      console.warn('Flow not found:', flowId)
    }
  })
})

</script>

<template>
  <!-- Notification Component -->
  <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
    @close="hideNotification" />

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
    <main class="flex-1 overflow-hidden bg-slate-100 px-4 md:px-8 dark:bg-slate-950 pt-8 sm:pt-4 pb-8">
      <div class="mx-auto flex h-full max-w-6xl flex-col">
        <!-- View Switcher -->
        <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            class="flex w-full overflow-x-auto gap-2 rounded-lg border border-slate-200 bg-white p-1 md:w-auto dark:border-slate-700 dark:bg-slate-800 scrollbar-hide">
            <button @click="currentView = 'builder'" :class="[
              'whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors',
              currentView === 'builder'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
            ]">
              <i class="fas fa-tools mr-2"></i>
              Конструктор
            </button>
            <button @click="currentView = 'myflows'" :class="[
              'whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors',
              currentView === 'myflows'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
            ]">
              <i class="fas fa-folder-open mr-2"></i>
              Мои Потоки
              <span v-if="savedFlows.length > 0" class="ml-1.5 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {{ savedFlows.length }}
              </span>
            </button>
            <button @click="currentView = 'templates'" :class="[
              'whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors',
              currentView === 'templates'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
            ]">
              <i class="fas fa-star mr-2"></i>
              Шаблоны
            </button>
            <button @click="currentView = 'history'" :class="[
              'whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors',
              currentView === 'history'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
            ]">
              <i class="fas fa-history mr-2"></i>
              История
            </button>
          </div>

          <button v-if="currentView !== 'builder'" @click="createNewFlow"
            class="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-600 hover:to-blue-700 md:w-auto">
            <i class="fas fa-plus mr-2"></i>
            Новый Поток
          </button>
        </div>

        <!-- Builder View -->
        <div v-if="currentView === 'builder'" class="flex flex-1 flex-col">
          <header class="mb-4 flex flex-col gap-4">
            <!-- Flow Name -->
            <div>
              <input v-model="flowName" type="text" placeholder="Название потока..."
                class="w-full text-xl font-bold text-slate-900 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-colors md:text-2xl dark:text-white dark:hover:border-slate-600 dark:focus:border-blue-400" />
            </div>

            <!-- Flow Description -->
            <div>
              <textarea v-model="flowDescription" placeholder="Описание потока (опционально)..." rows="2"
                class="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-colors resize-none dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-blue-400"></textarea>
            </div>

            <!-- Flow Metadata -->
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <!-- Type -->
              <div>
                <label class="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">Тип потока</label>
                <select v-model="flowType"
                  class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <option v-for="(label, key) in flowTypes" :key="key" :value="key">{{ label }}</option>
                </select>
              </div>

              <!-- Category -->
              <div>
                <label class="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">Категория</label>
                <select v-model="flowCategory"
                  class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <option v-for="(label, key) in flowCategories" :key="key" :value="key">{{ label }}</option>
                </select>
              </div>
            </div>

            <!-- Tags -->
            <div>
              <label class="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">Теги</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="(tag, index) in flowTags" :key="index"
                  class="inline-flex items-center gap-1.5 rounded-md bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  #{{ tag }}
                  <button @click="removeTag(index)" class="hover:text-red-600 dark:hover:text-red-400">
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <input v-model="tagInput" @keyup.enter="addTag" type="text" placeholder="Добавить тег..."
                  class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300" />
                <button @click="addTag"
                  class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <button @click="saveFlow" :disabled="isSaving"
                class="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-save mr-2"></i>
                {{ isSaving ? 'Сохранение...' : editingFlowId ? 'Обновить Поток' : 'Сохранить Поток' }}
              </button>
              <button v-if="editingFlowId" @click="createNewFlow"
                class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                <i class="fas fa-times mr-2"></i>
                Отменить
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
                          <p class="truncate text-[10px] text-slate-500 dark:text-slate-400">{{ module.description }}
                          </p>
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
                  <h3 class="truncate text-sm font-bold text-slate-900 md:text-base dark:text-white">{{ item.name }}
                  </h3>
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

        <!-- My Flows View -->
        <div v-else-if="currentView === 'myflows'" class="flex-1 overflow-y-auto">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex items-center justify-center py-20">
            <div class="text-center">
              <div
                class="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500">
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-400">Загрузка потоков...</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="savedFlows.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
            <div class="mb-6 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
              <i class="fas fa-folder-open text-4xl text-slate-400"></i>
            </div>
            <h3 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">Нет сохраненных потоков</h3>
            <p class="mb-6 text-sm text-slate-600 dark:text-slate-400">
              Создайте свой первый поток в конструкторе
            </p>
            <button @click="createNewFlow"
              class="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-700">
              <i class="fas fa-plus mr-2"></i>
              Создать Поток
            </button>
          </div>

          <!-- Flows Grid -->
          <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FlowCard v-for="flow in savedFlows" :key="flow.id" :flow="flow" :flow-types="flowTypes"
              :flow-categories="flowCategories" @start="startFlow" @edit="editFlow" @duplicate="duplicateFlow"
              @delete="deleteFlow" @share="toggleShare" @schedule="openScheduleModal" />
          </div>
        </div>

        <!-- History View -->
        <div v-else-if="currentView === 'history'" class="flex-1 overflow-y-auto">
          <div v-if="flowSessions.length === 0"
            class="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center dark:border-slate-700 dark:bg-slate-800/50">
            <div class="mb-4 rounded-full bg-slate-100 p-4 dark:bg-slate-800">
              <i class="fas fa-history text-3xl text-slate-400"></i>
            </div>
            <h3 class="text-lg font-medium text-slate-900 dark:text-white">История пуста</h3>
            <p class="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Здесь будут отображаться результаты ваших завершенных сессий.
            </p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="session in flowSessions" :key="session.id"
              class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <i class="fas fa-check"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-900 dark:text-white">{{ session.flowName }}</h3>
                  <div class="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      <i class="fas fa-calendar-alt mr-1"></i>
                      {{ session.completedAt ? new Date(session.completedAt).toLocaleDateString() : 'Неизвестно' }}
                    </span>
                    <span>
                      <i class="fas fa-clock mr-1"></i>
                      {{ Math.floor(session.duration / 60) }}:{{ (session.duration % 60).toString().padStart(2, '0') }}
                    </span>
                    <span>
                      <i class="fas fa-layer-group mr-1"></i>
                      {{ session.modulesCount }} модулей
                    </span>
                  </div>
                </div>
              </div>

              <div class="text-right">
                <span
                  class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Завершено
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Templates View -->
        <div v-else-if="currentView === 'templates'" class="flex-1 overflow-y-auto">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(template, index) in prebuiltTemplates" :key="index"
              class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">

              <div>
                <div class="mb-3 flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h3 class="truncate text-lg font-bold text-slate-900 dark:text-white">
                      {{ template.name }}
                    </h3>
                    <p class="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                      {{ template.description }}
                    </p>
                  </div>
                </div>

                <div class="mb-3 flex flex-wrap gap-2">
                  <span
                    class="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-2.5 py-0.5 text-xs font-medium text-white">
                    {{ flowTypes[template.type || 'custom'] }}
                  </span>
                  <span
                    class="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {{ flowCategories[template.category || 'custom'] }}
                  </span>
                </div>

                <div class="mb-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div class="flex items-center gap-1">
                    <i class="fas fa-puzzle-piece"></i>
                    <span>{{ template.modules?.length || 0 }} модулей</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="fas fa-clock"></i>
                    <span>~{{ template.estimatedDuration }} мин</span>
                  </div>
                </div>
              </div>

              <button @click="useTemplate(template)"
                class="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                <i class="fas fa-magic mr-2"></i>
                Использовать шаблон
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <FlowExecutor v-if="showFlowExecutor && selectedFlowForExecution" :is-open="showFlowExecutor"
      :flow="selectedFlowForExecution" @close="showFlowExecutor = false" @complete="handleFlowComplete" />

    <ScheduleConfig v-if="showScheduleModal && selectedFlowForSchedule" :is-open="showScheduleModal"
      :flow-name="selectedFlowForSchedule.name" :schedule="selectedFlowForSchedule.schedule"
      @close="showScheduleModal = false" @save="saveSchedule" />
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
