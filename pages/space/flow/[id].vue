<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useNotification } from '~/composables/useNotification'
import Notification from '~/components/base/Notification.vue'
import FlowExecutor from '~/components/space/FlowExecutor.vue'

definePageMeta({
    layout: 'laboratory',
    title: 'Просмотр Потока'
})

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const { notificationVisible, notificationMessage, notificationType, showNotification, hideNotification } = useNotification()

const flowId = route.params.id as string
const flow = ref<any>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const isExecutingFlow = ref(false)
const debugInfo = ref<any>(null)

const flowTypes: Record<string, string> = {
    routine: 'Рутина',
    protocol: 'Протокол',
    session: 'Сессия',
    custom: 'Свободный'
}

const flowCategories: Record<string, string> = {
    morning: 'Утро',
    evening: 'Вечер',
    stress: 'Стресс',
    focus: 'Фокус',
    sleep: 'Сон',
    growth: 'Рост',
    custom: 'Другое'
}

const loadFlow = async () => {
    isLoading.value = true
    error.value = null

    try {
        const { doc, getDoc } = await import('firebase/firestore')
        const { $firestore } = useNuxtApp()

        const flowRef = doc($firestore, 'labFlows', flowId)
        const flowSnap = await getDoc(flowRef)

        if (flowSnap.exists()) {
            const data = flowSnap.data()
            // Check if public or owner
            if (data.isPublic || (auth.user && data.userId === auth.user.uid)) {
                flow.value = { id: flowSnap.id, ...data }
            } else {
                error.value = 'Этот поток является приватным. Доступ запрещен.'
            }
        } else {
            error.value = 'Поток не найден.'
        }
    } catch (err) {
        console.error('Error loading flow:', err)
        error.value = 'Ошибка при загрузке потока.'
    } finally {
        isLoading.value = false
    }
}

const addToMyFlows = async () => {
    if (!auth.user) {
        showNotification('Войдите в систему, чтобы сохранить поток', 'warning')
        return
    }

    try {
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
        const { $firestore } = useNuxtApp()

        const newFlowData = {
            ...flow.value,
            name: `${flow.value.name} (Копия)`,
            userId: auth.user.uid,
            userEmail: auth.user.email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isPublic: false,
            isTemplate: false,
            timesUsed: 0,
            lastUsedAt: null
        }

        // Remove ID to create new doc
        delete newFlowData.id

        const labFlowsRef = collection($firestore, 'labFlows')
        await addDoc(labFlowsRef, newFlowData)

        showNotification('Поток добавлен в вашу библиотеку!', 'success')
        setTimeout(() => {
            router.push('/space/builder')
        }, 1500)
    } catch (err) {
        console.error('Error copying flow:', err)
        showNotification('Ошибка при сохранении потока', 'error')
    }
}

onMounted(() => {
    loadFlow()
})
</script>

<template>
    <div class="min-h-screen bg-slate-50 pb-12 dark:bg-slate-950">
        <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
            @close="hideNotification" />

        <FlowExecutor v-if="isExecutingFlow && flow" :flow="flow" @close="isExecutingFlow = false"
            @complete="isExecutingFlow = false" />

        <div class="mx-auto max-w-3xl px-4 pt-8 md:px-8">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
                <div class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500"></div>
                <p class="text-slate-600 dark:text-slate-400">Загрузка потока...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="flex flex-col items-center justify-center py-20 text-center">
                <div class="mb-6 rounded-full bg-red-100 p-6 dark:bg-red-900/20">
                    <i class="fas fa-lock text-4xl text-red-500"></i>
                </div>
                <h3 class="mb-2 text-xl font-bold text-slate-900 dark:text-white">Доступ ограничен</h3>
                <p class="mb-6 text-slate-600 dark:text-slate-400">{{ error }}</p>

                <NuxtLink to="/space/builder"
                    class="rounded-lg bg-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    Вернуться в конструктор
                </NuxtLink>
            </div>

            <!-- Flow Content -->
            <div v-else class="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-900">
                <!-- Header -->
                <div class="border-b border-slate-100 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900">
                    <div class="mb-4 flex flex-wrap gap-2">
                        <span
                            class="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 text-xs font-medium text-white">
                            {{ flowTypes[flow.type] || 'Поток' }}
                        </span>
                        <span
                            class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                            {{ flowCategories[flow.category] || 'Общее' }}
                        </span>
                    </div>

                    <h1 class="mb-4 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                        {{ flow.name }}
                    </h1>

                    <p v-if="flow.description" class="mb-6 text-base text-slate-600 dark:text-slate-400">
                        {{ flow.description }}
                    </p>

                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in flow.tags" :key="tag"
                            class="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            #{{ tag }}
                        </span>
                    </div>
                </div>

                <!-- Modules List -->
                <div class="bg-slate-50 p-6 md:p-8 dark:bg-slate-950/50">
                    <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Модули ({{ flow.modules.length }})
                    </h3>

                    <div class="space-y-3">
                        <div v-for="(module, index) in flow.modules" :key="index"
                            class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div
                                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                {{ index + 1 }}
                            </div>
                            <div class="text-2xl">{{ module.icon }}</div>
                            <div class="min-w-0 flex-1">
                                <h4 class="font-medium text-slate-900 dark:text-white">{{ module.name }}</h4>
                                <p class="truncate text-xs text-slate-500 dark:text-slate-400">{{ module.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="border-t border-slate-100 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900">
                    <div class="flex flex-col gap-3 sm:flex-row">
                        <button @click="isExecutingFlow = true"
                            class="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/30">
                            <i class="fas fa-play mr-2"></i>
                            Запустить сейчас
                        </button>
                        <button @click="addToMyFlows"
                            class="flex-1 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-center text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                            <i class="fas fa-plus mr-2"></i>
                            Добавить к себе
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
