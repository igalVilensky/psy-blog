<template>
    <div class="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-500 pb-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

            <!-- Back Navigation -->
            <NuxtLink to="/space/experiments/voice-structure"
                class="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors group">
                <i class="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
                <span class="text-xs font-bold uppercase tracking-widest">Назад к экспериментам</span>
            </NuxtLink>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center p-20 space-y-6">
                <div class="relative w-16 h-16 text-stone-900 dark:text-white">
                    <i class="fas fa-circle-notch fa-spin text-4xl"></i>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error || !data"
                class="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-12 text-center space-y-4">
                <i class="fas fa-exclamation-triangle text-3xl text-red-600 dark:text-red-400"></i>
                <h2 class="text-xl font-bold text-stone-900 dark:text-white uppercase leading-none">Эксперимент не
                    найден</h2>
                <p class="text-stone-500 dark:text-stone-400 text-sm font-medium">{{ error || `Мы не смогли найти данные
                    этой сессии.` }}</p>
            </div>

            <!-- Content Section -->
            <div v-else class="space-y-10 animate-fade-in">
                <!-- Header Info -->
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <span
                            class="px-2 py-0.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded">
                            Архив сессии
                        </span>
                        <span class="text-[10px] font-black uppercase tracking-widest text-stone-400">
                            {{ formatDate(data.createdAt) }}
                        </span>
                    </div>
                    <h1
                        class="text-4xl font-black text-stone-900 dark:text-white uppercase tracking-tighter leading-none">
                        {{ getTemplateName(data.template) }}
                    </h1>
                    <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        <i :class="data.source === 'voice' ? 'fas fa-microphone' : 'fas fa-keyboard'"></i>
                        <span>Источник: {{ data.source === 'voice' ? 'Голос' : 'Текст' }}</span>
                    </div>
                </div>

                <!-- Structured Results -->
                <div class="space-y-10">
                    <div class="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-6">
                        <h2 class="text-sm font-black uppercase tracking-widest text-stone-400">Структурированные
                            инсайты</h2>
                    </div>

                    <div v-if="data.structuredOutput" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div v-for="(value, key) in data.structuredOutput" :key="key"
                            class="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 border-l-4 border-l-stone-900 dark:border-l-white">
                            <h3 class="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">{{
                                formatKey(key) }}</h3>
                            <p class="text-stone-900 dark:text-white font-medium leading-relaxed whitespace-pre-wrap">
                                {{ value || '—' }}
                            </p>
                        </div>
                    </div>
                    <div v-else
                        class="p-12 text-center bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 border-dashed">
                        <p class="text-xs font-bold uppercase tracking-widest text-stone-400 italic">Данные структуры
                            отсутствуют</p>
                    </div>
                </div>

                <!-- Raw Input Section -->
                <div class="pt-12 border-t border-stone-200 dark:border-stone-800">
                    <div class="space-y-6">
                        <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Исходный текст
                            (Сырые мысли)</h3>
                        <div
                            class="p-8 bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 opacity-80">
                            <p
                                class="text-sm font-medium text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed italic">
                                "{{ data.rawInput }}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
    layout: 'laboratory'
});

const route = useRoute();
const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

const loading = ref(true);
const error = ref(null);
const data = ref(null);

const templates = {
    mental_dump_to_clarity: 'Из Хаоса в Ясность',
    continue_or_stop: 'Продолжить или Остановить',
    chaos_to_plan: 'Из Хаоса в План'
};

const getTemplateName = (id) => templates[id] || id;

const formatKey = (key) => key.replace(/_/g, ' ');

const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const fetchSession = async () => {
    loading.value = true;
    error.value = null;

    try {
        const docRef = doc($firestore, 'voice_structures', route.params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const sessionData = docSnap.data();

            // Basic security: check ownership
            if (sessionData.userId !== authStore.user?.uid) {
                error.value = 'Доступ запрещен. Это не ваша сессия.';
                return;
            }

            data.value = sessionData;
        } else {
            error.value = 'Запись не найдена в базе данных.';
        }
    } catch (err) {
        console.error('Error fetching session:', err);
        error.value = 'Ошибка при загрузке данных сессии.';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchSession();
});
</script>

<style scoped>
.animate-fade-in {
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
</style>
