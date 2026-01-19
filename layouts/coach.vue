<template>
    <div class="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white flex">
        <!-- Sidebar -->
        <CoachSidebar class="hidden lg:block w-64 flex-none bg-white dark:bg-stone-900" />

        <!-- Mobile Header -->
        <div
            class="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white z-40 px-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-stone-900 dark:bg-white flex items-center justify-center">
                    <i class="fas fa-brain text-white dark:text-stone-900 text-xs"></i>
                </div>
                <span class="font-bold text-stone-900 dark:text-white text-sm">MindQLab Коуч</span>
            </div>
            <button @click="isSidebarOpen = true"
                class="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white">
                <i class="fas fa-bars text-lg"></i>
            </button>
        </div>

        <!-- Mobile Sidebar Overlay -->
        <Transition name="fade">
            <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
                class="lg:hidden fixed inset-0 bg-stone-900/60 z-50"></div>
        </Transition>

        <!-- Mobile Sidebar -->
        <Transition name="slide">
            <CoachSidebar v-if="isSidebarOpen" @close="isSidebarOpen = false"
                class="lg:hidden fixed inset-y-0 left-0 w-64 z-50 shadow-2xl bg-white dark:bg-stone-900" />
        </Transition>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col min-w-0">
            <!-- Desktop Header -->
            <header
                class="hidden lg:flex h-16 bg-white dark:bg-stone-900 border-b-2 border-stone-900 dark:border-white items-center justify-between px-6 sticky top-0 z-30">
                <div>
                    <h2 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wide">{{ pageTitle }}
                    </h2>
                </div>

                <div class="flex items-center gap-4">
                    <!-- User Profile -->
                    <ClientOnly>
                        <div class="flex items-center gap-3">
                            <div class="text-right">
                                <div class="text-xs font-bold text-stone-900 dark:text-white">
                                    {{ authStore.user?.displayName || 'Коуч' }}
                                </div>
                                <div
                                    class="text-[9px] text-stone-500 dark:text-stone-400 uppercase font-semibold tracking-wide">
                                    Профессионал
                                </div>
                            </div>
                            <div
                                class="w-9 h-9 bg-stone-900 dark:bg-white flex items-center justify-center text-white dark:text-stone-900 font-bold text-sm">
                                {{ authStore.user?.displayName?.[0]?.toUpperCase() || 'C' }}
                            </div>
                        </div>
                        <template #fallback>
                            <div class="flex items-center gap-3 opacity-50">
                                <div class="w-9 h-9 bg-stone-200 dark:bg-stone-800 animate-pulse"></div>
                            </div>
                        </template>
                    </ClientOnly>
                </div>
            </header>

            <!-- Content Area -->
            <div class="flex-1 pt-14 lg:pt-0 overflow-y-auto">
                <NuxtPage />
            </div>
        </main>

        <!-- Global Notification -->
        <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
            :route-path="notificationRoute" :cta-text="notificationCta" :duration="notificationDuration"
            :flow-id="notificationFlowId" :show-close-button="true" @close="hideNotification"
            @execute-flow="handleExecuteFlow" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from "~/stores/auth";
import { useNotification } from "~/composables/useNotification";
import Notification from "~/components/base/Notification.vue";
import CoachSidebar from '~/components/coach/CoachSidebar.vue';

const authStore = useAuthStore();
const route = useRoute();
const { notificationMessage, notificationType, notificationVisible, notificationRoute, notificationCta, notificationDuration, notificationFlowId, hideNotification } = useNotification();

const isSidebarOpen = ref(false);

const pageTitle = computed(() => {
    if (route.path === '/coach') return 'Панель управления';
    if (route.path.startsWith('/coach/clients')) return 'Управление клиентами';
    if (route.path === '/coach/analytics') return 'Аналитика';
    return 'Панель коуча';
});

const handleExecuteFlow = (flowId) => {
    if (flowId) {
        window.dispatchEvent(new CustomEvent('execute-scheduled-flow', { detail: { flowId } }));
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
