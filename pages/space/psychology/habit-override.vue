<template>
    <div class="habit-override-lab min-h-screen pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <Breadcrumbs />

            <!-- Hero Section -->
            <div
                class="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12 min-h-[400px] flex items-center">
                <div class="absolute inset-0 z-0">
                    <NeuralRewireVisualizer />
                    <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent">
                    </div>
                </div>

                <div class="relative z-10 max-w-2xl">
                    <div
                        class="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono mb-4 border border-cyan-500/30 backdrop-blur-sm">
                        ЛАБОРАТОРИЯ / ПСИХОЛОГИЯ
                    </div>
                    <h1 class="text-4xl md:text-6xl font-bold mb-6 font-montserrat tracking-tight leading-tight">
                        Лаборатория<br />Перепрошивки Привычек
                    </h1>
                    <p class="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                        Обнаружьте скрытые триггеры ваших привычек и научитесь их "перепрошивать" с помощью когнитивных
                        протоколов и нейропластичности.
                    </p>

                    <div class="flex flex-wrap gap-4">
                        <button @click="scrollTo('scan')"
                            class="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 flex items-center">
                            <i class="fas fa-search mr-2"></i>
                            Начать Сканирование
                        </button>
                        <button @click="isUIPOpen = true"
                            class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold transition-all flex items-center backdrop-blur-sm">
                            <i class="fas fa-shield-alt mr-2"></i>
                            Протокол Вмешательства
                        </button>
                    </div>
                </div>
            </div>

            <!-- Dashboard Row -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <HabitAnalyticsDashboard />
                </div>
                <div>
                    <AudioPersonaCard :scan-data="userData.triggerScans" />
                </div>
            </div>

            <!-- Main Experiments Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div id="scan" class="scroll-mt-24">
                    <TriggerScanSection @save="saveTriggerScan" />
                </div>
                <div>
                    <EmotionTest @save="saveEmotionTest" />
                </div>
            </div>

            <!-- Cognitive Games & Reward Map -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <MiniGamesSection @save="saveGameScore" />
                </div>
                <div>
                    <RewardMapCard />
                </div>
            </div>

            <!-- Lightweight CTAs -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                    class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-colors text-left group shadow-sm">
                    <i class="fas fa-redo text-cyan-500 mb-2 group-hover:scale-110 transition-transform block"></i>
                    <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Ежедневный Скан</span>
                </button>
                <button @click="isUIPOpen = true"
                    class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors text-left group shadow-sm">
                    <i
                        class="fas fa-shield-alt text-emerald-500 mb-2 group-hover:scale-110 transition-transform block"></i>
                    <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Начать Протокол</span>
                </button>
                <button
                    class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors text-left group shadow-sm">
                    <i class="fas fa-music text-purple-500 mb-2 group-hover:scale-110 transition-transform block"></i>
                    <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Звукотерапия</span>
                </button>
                <button
                    class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-colors text-left group shadow-sm">
                    <i class="fas fa-brain text-orange-500 mb-2 group-hover:scale-110 transition-transform block"></i>
                    <span class="text-sm font-bold text-slate-700 dark:text-slate-300">В Карту Мозга</span>
                </button>
            </div>
        </div>

        <!-- Modals -->
        <InterventionProtocolFlow :is-open="isUIPOpen" @close="isUIPOpen = false" @complete="saveUIPSession" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { updateUserProfile } from '~/utils/firebase';
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue';
import NeuralRewireVisualizer from '~/components/space/habit-override/NeuralRewireVisualizer.vue';
import TriggerScanSection from '~/components/space/habit-override/TriggerScanSection.vue';
import EmotionTest from '~/components/space/habit-override/EmotionTest.vue';
import MiniGamesSection from '~/components/space/habit-override/MiniGamesSection.vue';
import InterventionProtocolFlow from '~/components/space/habit-override/InterventionProtocolFlow.vue';
import HabitAnalyticsDashboard from '~/components/space/habit-override/HabitAnalyticsDashboard.vue';
import RewardMapCard from '~/components/space/habit-override/RewardMapCard.vue';
import AudioPersonaCard from '~/components/space/habit-override/AudioPersonaCard.vue';

definePageMeta({
    layout: 'laboratory'
});

const auth = useAuthStore();
const isUIPOpen = ref(false);
const userData = ref({
    triggerScans: {},
    emotionTests: [],
    games: [],
    uipSessions: []
});

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const saveToFirebase = async (key, data) => {
    if (!auth.user?.uid) return;

    // Update local state
    if (Array.isArray(userData.value[key])) {
        userData.value[key].push(data);
    } else {
        userData.value[key] = data;
    }

    // Persist
    await updateUserProfile(auth.user.uid, {
        [`habitOverride.${key}`]: userData.value[key]
    });
};

const saveTriggerScan = (ratings) => {
    saveToFirebase('triggerScans', ratings);
};

const saveEmotionTest = (results) => {
    saveToFirebase('emotionTests', { timestamp: new Date().toISOString(), results });
};

const saveGameScore = (scoreData) => {
    saveToFirebase('games', scoreData);
};

const saveUIPSession = (sessionData) => {
    saveToFirebase('uipSessions', sessionData);
};

// Load initial data if available
onMounted(async () => {
    if (auth.user?.profile?.habitOverride) {
        userData.value = { ...userData.value, ...auth.user.profile.habitOverride };
    }
});
</script>

