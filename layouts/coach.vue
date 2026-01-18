<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex transition-colors duration-500">
        <!-- Sidebar -->
        <CoachSidebar
            class="hidden lg:block w-72 flex-none border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" />

        <!-- Mobile Header -->
        <div
            class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 px-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <i class="fas fa-brain"></i>
                </div>
                <span class="font-bold tracking-tight text-slate-900 dark:text-white">COACH <span
                        class="text-indigo-600">PORTAL</span></span>
            </div>
            <button @click="isSidebarOpen = true"
                class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <i class="fas fa-bars text-xl"></i>
            </button>
        </div>

        <!-- Mobile Sidebar Overlay -->
        <Transition name="fade">
            <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
                class="lg:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50"></div>
        </Transition>

        <!-- Mobile Sidebar -->
        <Transition name="slide">
            <CoachSidebar v-if="isSidebarOpen" @close="isSidebarOpen = false"
                class="lg:hidden fixed inset-y-0 left-0 w-72 z-50 shadow-2xl bg-white dark:bg-slate-900" />
        </Transition>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col min-w-0">
            <!-- Desktop Header -->
            <header
                class="hidden lg:flex h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 items-center justify-between px-8 sticky top-0 z-30">
                <div class="flex items-center gap-4">
                    <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest">{{ pageTitle }}</h2>
                </div>

                <div class="flex items-center gap-6">
                    <!-- Quick Actions -->
                    <div class="flex items-center gap-2">
                        <button
                            class="p-2 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                            <i class="fas fa-search text-lg"></i>
                        </button>
                        <button
                            class="p-2 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all relative">
                            <i class="fas fa-bell text-lg"></i>
                            <span
                                class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                    </div>

                    <!-- User Profile -->
                    <ClientOnly>
                        <div class="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
                            <div class="text-right hidden sm:block">
                                <div class="text-xs font-bold text-slate-900 dark:text-white">
                                    {{ authStore.user?.displayName || 'Coach' }}
                                </div>
                                <div class="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
                                    Certified Professional
                                </div>
                            </div>
                            <div
                                class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-white dark:border-slate-800 shadow-sm">
                                {{ authStore.user?.displayName?.[0]?.toUpperCase() || 'C' }}
                            </div>
                        </div>
                        <template #fallback>
                            <div
                                class="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800 opacity-50">
                                <div class="text-right hidden sm:block">
                                    <div class="text-xs font-bold text-slate-900 dark:text-white">Loading...</div>
                                    <div class="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Account
                                    </div>
                                </div>
                                <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                            </div>
                        </template>
                    </ClientOnly>
                </div>
            </header>

            <!-- Content Area -->
            <div class="flex-1 pt-16 lg:pt-0 overflow-y-auto">
                <div class="animate-content">
                    <NuxtPage />
                </div>
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
    if (route.path === '/coach') return 'Обзор панели';
    if (route.path.startsWith('/coach/clients')) return 'Управление клиентами';
    if (route.path === '/coach/analytics') return 'Аналитика системы';
    return 'Личный Кабинет';
});

const handleExecuteFlow = (flowId) => {
    if (flowId) {
        window.dispatchEvent(new CustomEvent('execute-scheduled-flow', { detail: { flowId } }));
    }
};
</script>

<style scoped>
.animate-content {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
