<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'laboratory',
  title: 'Конструктор Лаборатории'
})

interface Module {
  id: string
  type: 'tool' | 'test' | 'game' | 'experiment'
  name: string
  icon: string
  description: string
}

interface FlowItem extends Module {
  instanceId: string
}

// Mock Data for Available Modules
const availableModules: Module[] = [
  {
    id: 'breathing-exercise',
    type: 'tool',
    name: 'Дыхательная практика',
    icon: '🌬️',
    description: 'Управляемое дыхание для расслабления'
  },
  {
    id: 'reaction-time',
    type: 'test',
    name: 'Тест на реакцию',
    icon: '⚡',
    description: 'Измерение скорости зрительной реакции'
  },
  {
    id: 'memory-grid',
    type: 'game',
    name: 'Сетка памяти',
    icon: '🧩',
    description: 'Тренировка пространственной памяти'
  },
  {
    id: 'mood-tracker',
    type: 'tool',
    name: 'Трекер настроения',
    icon: '📝',
    description: 'Журнал эмоционального состояния'
  },
  {
    id: 'stroop-test',
    type: 'test',
    name: 'Тест Струпа',
    icon: '🎨',
    description: 'Задание на когнитивную интерференцию'
  }
]

const labFlow = ref<FlowItem[]>([])
const isDragging = ref(false)
const draggedItem = ref<Module | null>(null)

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

const saveFlow = () => {
  console.log('Saving Flow:', JSON.stringify(labFlow.value, null, 2))
  alert('Поток сохранен в консоль! (Проверьте DevTools)')
}
</script>

<template>
  <div class="flex h-[calc(100vh-100px)] flex-col bg-slate-50 md:flex-row dark:bg-slate-900">
    <!-- Sidebar: Module Library -->
    <aside class="w-full shrink-0 border-b border-slate-200 bg-white p-4 md:w-80 md:border-b-0 md:border-r dark:border-slate-700 dark:bg-slate-800">
      <h2 class="mb-4 text-lg font-bold text-slate-800 dark:text-white">Библиотека модулей</h2>
      <p class="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Перетащите модули на холст, чтобы создать свою лабораторию.
      </p>

      <div class="flex gap-3 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
        <div
          v-for="module in availableModules"
          :key="module.id"
          draggable="true"
          @dragstart="onDragStart($event, module)"
          @dragend="onDragEnd"
          @click="addItemToFlow(module)"
          class="min-w-[200px] cursor-grab rounded-lg border border-slate-200 bg-slate-50 p-3 transition-all hover:border-blue-400 hover:shadow-md active:cursor-grabbing md:min-w-0 dark:border-slate-700 dark:bg-slate-700 dark:hover:border-blue-500"
        >
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ module.icon }}</span>
            <div>
              <h3 class="font-medium text-slate-900 dark:text-white">{{ module.name }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ module.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Canvas: Flow Builder -->
    <main class="flex-1 overflow-hidden bg-slate-100 p-4 md:p-8 dark:bg-slate-950">
      <div class="mx-auto flex h-full max-w-4xl flex-col">
        <header class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Новая Лаборатория</h1>
            <p class="text-slate-500 dark:text-slate-400">Спроектируйте свой экспериментальный поток</p>
          </div>
          <div class="flex gap-3">
            <button class="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800">
              Предпросмотр
            </button>
            <button
              @click="saveFlow"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Сохранить
            </button>
          </div>
        </header>

        <!-- Drop Zone -->
        <div
          @dragover.prevent
          @drop="onDrop"
          class="relative flex-1 overflow-y-auto rounded-xl border-2 border-dashed transition-all"
          :class="[
            isDragging
              ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-900/20'
              : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'
          ]"
        >
          <!-- Empty State -->
          <div
            v-if="labFlow.length === 0"
            class="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-400"
          >
            <div class="mb-4 rounded-full bg-slate-100 p-6 dark:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <p class="text-lg font-medium">Начните создание</p>
            <p class="text-sm">Перетащите модули из меню или нажмите на них</p>
          </div>

          <!-- Flow Items -->
          <div v-else class="space-y-4 p-6">
            <div
              v-for="(item, index) in labFlow"
              :key="item.instanceId"
              class="group relative flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <!-- Order Number -->
              <div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {{ index + 1 }}
              </div>

              <!-- Icon -->
              <div class="text-3xl">{{ item.icon }}</div>

              <!-- Content -->
              <div class="flex-1">
                <h3 class="font-bold text-slate-900 dark:text-white">{{ item.name }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.description }}</p>
              </div>

              <!-- Actions -->
              <button
                @click="removeItem(index)"
                class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                title="Удалить модуль"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
/* Custom scrollbar for the sidebar if needed */
aside::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
aside::-webkit-scrollbar-track {
  background: transparent;
}
aside::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>
