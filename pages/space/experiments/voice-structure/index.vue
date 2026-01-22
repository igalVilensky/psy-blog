<template>
    <div class="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-500 pb-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <!-- Header Section -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <span
                        class="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 rounded">
                        Внутренняя Бета
                    </span>
                    <span
                        class="px-2 py-0.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded">
                        Эксперимент
                    </span>
                </div>
                <h1 class="text-4xl font-black text-stone-900 dark:text-white uppercase tracking-tighter leading-none">
                    Голос &rarr; Когнитивная Структура
                </h1>
                <p class="text-stone-500 dark:text-stone-400 text-sm font-medium max-w-2xl leading-relaxed">
                    Превращайте хаос мыслей в структурированные паттерны. Это когнитивный протез для быстрой разгрузки
                    ума.
                </p>
            </div>

            <!-- Template Selection -->
            <div v-if="!selectedTemplateId" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button v-for="tpl in templates" :key="tpl.id" @click="selectTemplate(tpl)"
                    class="flex flex-col text-left p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white transition-all transform hover:-translate-y-1 group">
                    <div
                        class="w-10 h-10 flex items-center justify-center bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 mb-4 group-hover:bg-stone-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-stone-900 transition-colors">
                        <i :class="tpl.icon" class="text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-tight mb-2">{{
                        tpl.name }}</h3>
                    <p class="text-stone-500 dark:text-stone-400 text-xs leading-relaxed">{{ tpl.description }}</p>
                    <div
                        class="mt-6 text-[10px] font-black uppercase tracking-widest text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                        Выбрать Шаблон &rarr;
                    </div>
                </button>
            </div>

            <!-- Input Section -->
            <div v-if="selectedTemplateId && !structuredData" class="space-y-8 animate-fade-in">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <button @click="resetSession"
                            class="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                            Шаблон: {{ selectedTemplate?.name }}
                        </h2>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="inputType = 'voice'"
                            :class="[inputType === 'voice' ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900' : 'text-stone-400']"
                            class="px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors rounded">
                            Голос
                        </button>
                        <button @click="inputType = 'text'"
                            :class="[inputType === 'text' ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900' : 'text-stone-400']"
                            class="px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors rounded">
                            Текст
                        </button>
                    </div>
                </div>

                <!-- Voice Input UI -->
                <div v-if="inputType === 'voice'"
                    class="flex flex-col items-center justify-center p-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-8 min-h-[300px] relative overflow-hidden">
                    <div v-if="isListening"
                        class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-stone-900/0 via-stone-900/50 to-stone-900/0 dark:via-white/50 animate-pulse">
                    </div>

                    <div v-if="isListening" class="flex items-end gap-1 h-12">
                        <div v-for="i in 12" :key="i" class="w-1 bg-stone-900 dark:bg-white animate-bounce"
                            :style="{ height: `${Math.random() * 100}%` }"></div>
                    </div>
                    <div v-else
                        class="w-24 h-24 rounded-full border border-stone-100 dark:border-stone-800 flex items-center justify-center">
                        <i class="fas fa-microphone text-3xl text-stone-300 dark:text-stone-700"></i>
                    </div>

                    <div class="text-center space-y-2">
                        <h3 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest">
                            {{ isListening ? 'Слушаю...' : 'Готов к записи' }}
                        </h3>
                        <p class="text-stone-400 text-xs">{{ isListening ? 'Говорите свободно. Мы разберемся с хаосом.'
                            : 'Нажмите старт и выгрузите ваши мысли.' }}</p>
                    </div>

                    <div class="flex items-center gap-4">
                        <button v-if="!isListening" @click="startVoice"
                            class="px-10 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                            Начать Запись
                        </button>
                        <button v-else @click="stopVoice"
                            class="px-10 py-4 bg-red-600 text-white font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                            Стоп и Анализ
                        </button>
                    </div>

                    <div v-if="interimTranscript || transcript?.text"
                        class="max-w-md text-center text-xs text-stone-400 font-medium italic line-clamp-2">
                        "{{ interimTranscript || transcript?.text }}..."
                    </div>
                </div>

                <!-- Text Input UI -->
                <div v-if="inputType === 'text'" class="space-y-6">
                    <div class="p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-400">
                        <h4
                            class="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-300 mb-2">
                            Пример для этого шаблона:</h4>
                        <p class="text-xs text-amber-800 dark:text-amber-200 leading-relaxed italic">
                            "{{ selectedTemplate?.example }}"
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest text-stone-400 px-1">Ваши
                            мысли:</label>
                        <textarea v-model="rawContent" placeholder="Пишите всё как есть, без цензуры и структуры..."
                            class="w-full h-64 p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white placeholder-stone-300 dark:placeholder-stone-700 focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors resize-none font-medium text-sm leading-relaxed"></textarea>
                    </div>

                    <div class="flex justify-end">
                        <button @click="processText" :disabled="!rawContent || isProcessing"
                            class="px-10 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100">
                            {{ isProcessing ? 'Обработка...' : 'Структурировать Мысли' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Processing -->
            <div v-if="isProcessing && !structuredData"
                class="flex flex-col items-center justify-center p-20 space-y-6">
                <div class="relative w-16 h-16 text-stone-900 dark:text-white">
                    <i class="fas fa-circle-notch fa-spin text-4xl"></i>
                </div>
                <div class="text-center space-y-1">
                    <p class="text-[10px] font-black uppercase tracking-[0.2em] text-stone-900 dark:text-white">Работа с
                        паттернами</p>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-stone-400">AI Engine active</p>
                </div>
            </div>

            <!-- Results Layer -->
            <div v-if="structuredData" class="space-y-10 animate-fade-in">
                <div class="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-6">
                    <div class="space-y-1">
                        <h2 class="text-sm font-black uppercase tracking-widest text-stone-400">Результат анализа</h2>
                        <p class="text-lg font-bold text-stone-900 dark:text-white uppercase">{{ selectedTemplate?.name
                        }}</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <NuxtLink v-if="lastDocId" :to="`/space/experiments/voice-structure/${lastDocId}`"
                            class="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 underline">
                            Постоянная ссылка
                        </NuxtLink>
                        <button @click="resetSession"
                            class="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                            Новая Сессия
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div v-for="(value, key) in structuredData" :key="key"
                        class="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 border-l-4 border-l-stone-900 dark:border-l-white">
                        <h3 class="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">{{
                            formatKey(key) }}</h3>
                        <p class="text-stone-900 dark:text-white font-medium leading-relaxed whitespace-pre-wrap">
                            {{ value || '—' }}
                        </p>
                    </div>
                </div>

                <div class="pt-12 border-t border-stone-200 dark:border-stone-800">
                    <button @click="showRaw = !showRaw"
                        class="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                        {{ showRaw ? 'Скрыть оригинал' : 'Показать оригинал' }}
                    </button>

                    <Transition name="fade">
                        <div v-if="showRaw"
                            class="mt-6 p-6 bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 opacity-60">
                            <p
                                class="text-xs font-mono text-stone-500 dark:text-stone-400 whitespace-pre-wrap leading-relaxed">
                                {{ fullTranscript || rawContent }}</p>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- History Section -->
            <div v-if="!selectedTemplateId && !structuredData" class="pt-20 space-y-8">
                <div class="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-6">
                    <div class="space-y-1">
                        <h2 class="text-sm font-black uppercase tracking-widest text-stone-400">История сессий</h2>
                        <p class="text-xs text-stone-500 uppercase font-medium">Ваши прошлые когнитивные маппинги</p>
                    </div>
                    <button @click="fetchHistory"
                        class="text-xs text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
                        <i class="fas fa-sync-alt" :class="{ 'fa-spin': historyLoading }"></i>
                    </button>
                </div>

                <!-- History List -->
                <div v-if="history.length > 0" class="grid grid-cols-1 gap-4">
                    <NuxtLink v-for="session in history" :key="session.id"
                        :to="`/space/experiments/voice-structure/${session.id}`"
                        class="flex items-center justify-between p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-white transition-all group">
                        <div class="flex items-center gap-6">
                            <div
                                class="w-10 h-10 flex items-center justify-center bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                                <i :class="getTemplateIcon(session.template)"></i>
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                                    {{ getTemplateDisplayName(session.template) }}</h4>
                                <p class="text-[10px] font-medium text-stone-400 uppercase tracking-widest">
                                    {{ formatDate(session.createdAt) }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <span
                                class="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">Смотреть
                                &rarr;</span>
                            <i
                                class="fas fa-chevron-right text-stone-200 group-hover:text-stone-900 dark:group-hover:text-white transition-colors"></i>
                        </div>
                    </NuxtLink>
                </div>
                <div v-else-if="!historyLoading"
                    class="p-12 text-center bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 border-dashed">
                    <p class="text-xs font-bold uppercase tracking-widest text-stone-400 italic">История сессий пока
                        пуста</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useSpeechRecognition } from '~/composables/useSpeechRecognition';
import { structureThoughts } from '~/api/firebase/structureThoughts';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

definePageMeta({
    layout: 'laboratory'
});

const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

// Russian Template Definitions
const templates = [
    {
        id: 'mental_dump_to_clarity',
        icon: 'fas fa-brain',
        name: 'Из Хаоса в Ясность',
        description: 'Разгрузите ум. Выделите доминирующие темы, эмоциональную нагрузку и то, что требует внимания прямо сейчас.',
        example: 'Меня дико бесит ситуация на работе, коллега постоянно опаздывает, при этом я чувствую вину за то, что злюсь, а еще мне завтра нужно сдать отчет и я боюсь не успеть...'
    },
    {
        id: 'continue_or_stop',
        icon: 'fas fa-traffic-light',
        name: 'Продолжить или Остановить',
        description: 'Анализ экспериментов. Помогает увидеть скрытые допущения и сигналы за или против продолжения активности.',
        example: 'Я уже месяц учу испанский, но прогресс медленный, я заставляю себя садиться за уроки, хотя в начале было весело. Может это не мое или я просто устал?'
    },
    {
        id: 'chaos_to_plan',
        icon: 'fas fa-list-check',
        name: 'Из Хаоса в План',
        description: 'Перевод абстрактных целей в конкретные шаги. Извлечение ограничений и немедленных действий.',
        example: 'Хочу запустить свой подкаст, но нет оборудования, боюсь говорить на камеру, бюджет почти нулевой, нужно понять с чего начать прямо на этой неделе.'
    }
];

// State
const selectedTemplateId = ref(null);
const inputType = ref('voice');
const rawContent = ref('');
const isProcessing = ref(false);
const structuredData = ref(null);
const lastDocId = ref(null);
const showRaw = ref(false);
const fullTranscript = ref('');
const history = ref([]);
const historyLoading = ref(false);

// Composables
const { isListening, transcript, interimTranscript, start, stop, isSupported } = useSpeechRecognition();

// Computed
const selectedTemplate = computed(() => templates.find(t => t.id === selectedTemplateId.value));

// Watch transcript
watch(transcript, (newVal) => {
    if (newVal?.text) {
        fullTranscript.value += ' ' + newVal.text;
    }
});

// Methods
const selectTemplate = (tpl) => {
    selectedTemplateId.value = tpl.id;
    structuredData.value = null;
    rawContent.value = '';
    fullTranscript.value = '';
};

const resetSession = () => {
    if (isListening.value) stop();
    selectedTemplateId.value = null;
    structuredData.value = null;
    rawContent.value = '';
    fullTranscript.value = '';
    showRaw.value = false;
};

const startVoice = () => {
    fullTranscript.value = '';
    start('ru-RU'); // Set to Russian
};

const stopVoice = async () => {
    stop();
    await new Promise(resolve => setTimeout(resolve, 800));

    const content = fullTranscript.value.trim();
    if (!content) return;

    await processInput(content, 'voice');
};

const processText = async () => {
    if (!rawContent.value.trim()) return;
    await processInput(rawContent.value.trim(), 'text');
};

const processInput = async (content, source) => {
    isProcessing.value = true;
    try {
        const userId = authStore.user?.uid;
        const result = await structureThoughts(
            $firestore,
            userId,
            selectedTemplateId.value,
            content,
            source
        );

        if (result.success) {
            structuredData.value = result.structuredData;
            lastDocId.value = result.docId;
            fetchHistory(); // Refresh history
        } else {
            alert('Ошибка обработки. Попробуйте еще раз.');
        }
    } catch (error) {
        console.error('Error processing:', error);
    } finally {
        isProcessing.value = false;
    }
};

const formatKey = (key) => {
    return key.replace(/_/g, ' ');
};

const fetchHistory = async () => {
    if (!authStore.user) return;
    historyLoading.value = true;
    try {
        const q = query(
            collection($firestore, 'voice_structures'),
            where('userId', '==', authStore.user.uid),
            orderBy('createdAt', 'desc'),
            limit(10)
        );
        const querySnapshot = await getDocs(q);
        history.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching history:', error);
    } finally {
        historyLoading.value = false;
    }
};

const getTemplateDisplayName = (id) => {
    return templates.find(t => t.id === id)?.name || id;
};

const getTemplateIcon = (id) => {
    return templates.find(t => t.id === id)?.icon || 'fas fa-file-alt';
};

const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
};

onMounted(() => {
    fetchHistory();
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
