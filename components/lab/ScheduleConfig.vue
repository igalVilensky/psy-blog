<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
            class="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-b border-cyan-500/20 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <i class="fas fa-clock text-white text-lg"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white">Настроить расписание</h3>
                            <p class="text-sm text-slate-400">{{ flowName }}</p>
                        </div>
                    </div>
                    <button @click="close" class="text-slate-400 hover:text-white transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <!-- Enable Toggle -->
                <div
                    class="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div>
                        <p class="font-medium text-white">Включить расписание</p>
                        <p class="text-sm text-slate-400">Автоматические напоминания о выполнении потока</p>
                    </div>
                    <button @click="localSchedule.enabled = !localSchedule.enabled"
                        :class="localSchedule.enabled ? 'bg-cyan-500' : 'bg-slate-700'"
                        class="relative inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none">
                        <span :class="localSchedule.enabled ? 'translate-x-7' : 'translate-x-1'"
                            class="inline-block h-6 w-6 transform rounded-full bg-white transition-transform"></span>
                    </button>
                </div>

                <div v-if="localSchedule.enabled" class="space-y-6">
                    <!-- Schedule Type -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-3">Тип расписания</label>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button v-for="type in scheduleTypes" :key="type.value"
                                @click="localSchedule.type = type.value"
                                :class="localSchedule.type === type.value ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
                                class="p-4 rounded-lg border border-slate-700/50 transition-all flex items-center sm:block gap-3 sm:gap-0">
                                <i :class="type.icon" class="text-xl sm:text-2xl mb-0 sm:mb-2"></i>
                                <p class="text-sm font-medium">{{ type.label }}</p>
                            </button>
                        </div>
                    </div>

                    <!-- Time Picker -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-3">Время выполнения</label>
                        <input v-model="localSchedule.time" type="time"
                            class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors">
                    </div>

                    <!-- Day Selector (for weekly) -->
                    <div v-if="localSchedule.type === 'weekly'">
                        <label class="block text-sm font-medium text-slate-300 mb-3">Дни недели</label>
                        <div class="grid grid-cols-7 gap-2">
                            <button v-for="(day, index) in weekDays" :key="index" @click="toggleDay(index)"
                                :class="localSchedule.days?.includes(index) ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'"
                                class="aspect-square rounded-lg border border-slate-700/50 flex items-center justify-center text-sm font-medium transition-all">
                                {{ day }}
                            </button>
                        </div>
                    </div>

                    <!-- Reminder -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-3">Напоминание за</label>
                        <select v-model="localSchedule.reminderMinutes"
                            class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors">
                            <option :value="undefined">Без напоминания</option>
                            <option :value="5">5 минут</option>
                            <option :value="15">15 минут</option>
                            <option :value="30">30 минут</option>
                            <option :value="60">1 час</option>
                        </select>
                    </div>

                    <!-- Date Range (optional) -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-3">Начало (опционально)</label>
                            <input v-model="localSchedule.startDate" type="date"
                                class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-300 mb-3">Конец (опционально)</label>
                            <input v-model="localSchedule.endDate" type="date"
                                class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="border-t border-slate-700/50 px-6 py-4 flex justify-end gap-3">
                <button @click="close"
                    class="px-6 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
                    Отмена
                </button>
                <button @click="save"
                    class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface FlowSchedule {
    enabled: boolean
    type: 'once' | 'daily' | 'weekly'
    time: string
    days?: number[]
    startDate?: string
    endDate?: string
    reminderMinutes?: number
    lastTriggered?: any
    nextTrigger?: any
}

interface Props {
    isOpen: boolean
    flowName: string
    schedule?: FlowSchedule
}

const props = defineProps<Props>()
const emit = defineEmits<{
    close: []
    save: [schedule: FlowSchedule]
}>()

const scheduleTypes = [
    { value: 'once', label: 'Один раз', icon: 'fas fa-calendar-day' },
    { value: 'daily', label: 'Ежедневно', icon: 'fas fa-calendar-check' },
    { value: 'weekly', label: 'Еженедельно', icon: 'fas fa-calendar-week' }
]

const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const localSchedule = ref<FlowSchedule>({
    enabled: false,
    type: 'daily',
    time: '09:00',
    days: [],
    reminderMinutes: 15
})

// Watch for schedule prop changes
watch(() => props.schedule, (newSchedule) => {
    if (newSchedule) {
        localSchedule.value = { ...newSchedule }
    } else {
        localSchedule.value = {
            enabled: false,
            type: 'daily',
            time: '09:00',
            days: [],
            reminderMinutes: 15
        }
    }
}, { immediate: true })

const toggleDay = (dayIndex: number) => {
    if (!localSchedule.value.days) {
        localSchedule.value.days = []
    }
    const index = localSchedule.value.days.indexOf(dayIndex)
    if (index > -1) {
        localSchedule.value.days.splice(index, 1)
    } else {
        localSchedule.value.days.push(dayIndex)
    }
}

const close = () => {
    emit('close')
}

const save = () => {
    emit('save', localSchedule.value)
}
</script>
