<template>
    <div class="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-500 pb-20 font-open-sans relative overflow-hidden">
        <!-- Subtle Pattern -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-10">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgb(120 113 108 / 0.15) 1px, transparent 0); background-size: 32px 32px;"></div>
        </div>
        
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative z-10">

            <!-- Unauthenticated State -->
            <div v-if="!authStore.user" class="flex flex-col items-center justify-center py-24 space-y-6 text-center animate-fade-in bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-12 shadow-2xl rounded-[2rem]">
                <div class="w-24 h-24 flex items-center justify-center bg-stone-100 dark:bg-stone-900 border-2 border-dashed border-stone-200 dark:border-stone-700 text-4xl mb-4 text-orange-500 rounded-3xl">
                    <i class="fas fa-lock"></i>
                </div>
                <h2 class="text-3xl lg:text-4xl font-black text-stone-900 dark:text-white tracking-tight font-montserrat">Authentication Required</h2>
                <p class="text-base font-medium text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">You must be logged into your MindQLab account to birth, interact with, and store your psychological inner parts.</p>
                <NuxtLink to="/login" class="px-10 py-4 mt-4 bg-orange-500 text-white font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
                    Sign In to Space
                </NuxtLink>
            </div>

            <!-- Authenticated App -->
            <template v-else>
                <!-- Header Section -->
                <div class="space-y-4">
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full shadow-sm mb-4">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span class="text-[10px] font-bold text-stone-700 dark:text-stone-300 tracking-widest uppercase font-montserrat">Internal Beta / Experiment</span>
                    </div>
                <div class="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-8">
                    <h1 class="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 font-montserrat tracking-tight leading-none mb-2">
                        Echoes
                    </h1>
                    <NuxtLink to="/space/experiments/echoes/dashboard"
                        class="px-5 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2 rounded-2xl shadow-sm hover:shadow-md">
                        <span>Living Dashboard</span>
                        <i class="fas fa-arrow-right"></i>
                    </NuxtLink>
                </div>
                <p class="text-stone-500 dark:text-stone-400 text-base font-medium max-w-2xl leading-relaxed">
                    Give birth to living parts of your mind that stay with you. Turn fleeting thoughts and emotions into psychological companions.
                </p>
            </div>

            <!-- History Section (Default View) -->
            <div v-if="currentView === 'history'" class="space-y-8 animate-fade-in">
                <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <div class="space-y-1">
                        <h2 class="text-sm font-black uppercase tracking-widest text-zinc-400">Your Echoes</h2>
                        <p class="text-xs text-zinc-500 uppercase font-medium">Previously birthed parts</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <button @click="fetchHistory"
                            class="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            <i class="fas fa-sync-alt" :class="{ 'fa-spin': historyLoading }"></i>
                        </button>
                    </div>
                </div>

                <div class="flex justify-center py-4">
                    <button @click="currentView = 'input'"
                        class="px-10 py-5 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-white dark:to-stone-200 text-white dark:text-stone-900 font-bold uppercase tracking-widest hover:scale-105 transition-transform w-full md:w-auto text-center rounded-[2rem] shadow-xl group flex items-center justify-center gap-3">
                        <i class="fas fa-seedling text-orange-400 group-hover:text-white transition-colors"></i> <span class="font-montserrat">Create New Echo</span>
                    </button>
                </div>

                <!-- History List -->
                <div v-if="history.length > 0" class="grid grid-cols-1 gap-4">
                    <NuxtLink v-for="echo in history" :key="echo.id"
                        :to="`/space/experiments/echoes/dashboard?id=${echo.id}`"
                        class="flex items-center justify-between p-6 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-orange-500 transition-all group rounded-2xl shadow-sm hover:shadow-md">
                        <div class="flex items-center gap-6">
                            <div
                                class="w-12 h-12 flex items-center justify-center bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-700 text-xl group-hover:scale-110 transition-transform rounded-2xl shadow-inner">
                                {{ getArchetypeIcon(echo.archetype) }}
                            </div>
                            <div class="space-y-1">
                                <h4 class="text-sm font-bold text-stone-900 dark:text-white font-montserrat tracking-tight">
                                    {{ echo.name || 'Unnamed part' }}</h4>
                                <div class="flex items-center gap-3">
                                    <p class="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest">
                                        {{ echo.archetype }}
                                    </p>
                                    <p class="text-[10px] font-medium text-stone-500">
                                        {{ formatDate(echo.createdAt) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-2">
                            <p class="text-[10px] text-stone-400 italic max-w-xs truncate hidden sm:block">
                                "{{ echo.initialVoice }}"
                            </p>
                            <div class="flex items-center gap-3">
                                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">Open &rarr;</span>
                                <i class="fas fa-chevron-right text-stone-300 group-hover:text-orange-500 transition-colors"></i>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div v-else-if="!historyLoading"
                    class="p-12 text-center bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 border-dashed mt-4 rounded-3xl">
                    <p class="text-xs font-bold uppercase tracking-widest text-stone-400 italic">No Echoes found. Give a voice to your first thought.</p>
                </div>
            </div>

            <!-- Input Section -->
            <div v-if="currentView === 'input'" class="space-y-8 animate-fade-in relative z-10">
                <button @click="currentView = 'history'" class="absolute -top-12 left-0 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-2">
                    <i class="fas fa-arrow-left"></i> <span class="text-[10px] uppercase font-bold tracking-widest">Back to list</span>
                </button>

                <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 px-1">Raw Voice</label>
                    <textarea v-model="inputText" placeholder="Write exactly what you are feeling right now... don't filter it."
                        class="w-full h-48 p-6 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-stone-300 dark:placeholder-stone-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none font-medium text-sm leading-relaxed rounded-[2rem] shadow-inner"></textarea>
                </div>

                <div class="space-y-4">
                    <label class="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 px-1">How should we listen to this?</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <button v-for="option in listenOptions" :key="option" 
                                @click="selectedListenType = option"
                                :class="[selectedListenType === option ? 'bg-orange-500 text-white shadow-md border-orange-600' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-orange-400']"
                                class="p-4 text-xs font-bold text-left border transition-all rounded-xl">
                            {{ option }}
                        </button>
                    </div>
                </div>

                <div class="flex justify-end pt-4">
                    <button @click="processThought" :disabled="!inputText || !selectedListenType || isProcessing"
                        class="px-10 py-5 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-white dark:to-stone-200 text-white dark:text-stone-900 font-bold uppercase tracking-widest hover:from-orange-500 hover:to-rose-500 hover:text-white dark:hover:from-orange-500 dark:hover:to-rose-500 transition-all duration-500 disabled:opacity-50 flex items-center gap-3 rounded-[2rem] shadow-xl hover:-translate-y-1">
                        <span class="font-montserrat">Listen Sincerely</span>
                        <i class="fas fa-ear-listen text-orange-400 group-hover:text-white" v-if="!isProcessing"></i>
                        <i class="fas fa-circle-notch fa-spin text-orange-400 text-lg" v-else></i>
                    </button>
                </div>
            </div>

            <!-- Processing Layer -->
            <div v-if="currentView === 'processing'" class="flex flex-col items-center justify-center p-20 space-y-6 animate-fade-in min-h-[50vh]">
                <div class="relative w-20 h-20 flex items-center justify-center">
                    <div class="absolute inset-0 border-4 border-stone-200 dark:border-stone-800 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                    <i class="fas fa-heart text-rose-500 text-2xl animate-pulse"></i>
                </div>
                <div class="text-center space-y-3">
                    <p class="text-[12px] font-black uppercase tracking-[0.2em] text-stone-900 dark:text-white transition-opacity duration-500 font-montserrat" :key="processingMessage">{{ processingMessage }}</p>
                    <p class="text-[10px] font-bold uppercase tracking-widest text-orange-500">{{ enrichmentStatus }}</p>
                </div>
            </div>

            <!-- Birth Modal / Enrichment Results -->
            <div v-if="currentView === 'birth'" class="space-y-10 animate-fade-in mt-12">
                <div class="max-w-xl mx-auto bg-white dark:bg-stone-800 border-none p-8 md:p-12 shadow-2xl relative rounded-[2rem] overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-rose-500 shadow-sm"></div>
                    <button @click="currentView = 'input'" class="absolute top-6 right-6 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center justify-center w-10 h-10 bg-stone-100 dark:bg-stone-700 rounded-full">
                        <i class="fas fa-times"></i>
                    </button>

                    <div class="text-center mb-8 pb-8 border-b border-stone-200 dark:border-stone-700">
                        <div class="w-24 h-24 mx-auto bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-4xl mb-6 shadow-inner animate-pulse-once rounded-[2rem]">
                            {{ generatedData.emoji }}
                        </div>
                        <h2 class="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-500 mb-2">A new part is born</h2>
                        <h3 class="text-3xl font-black text-stone-900 dark:text-white tracking-tight uppercase font-montserrat">{{ echoName || 'Unnamed' }}</h3>
                        
                        <div class="mt-6 px-6 py-4 bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800 italic text-sm text-stone-600 dark:text-stone-400 rounded-2xl shadow-inner">
                            "{{ generatedData.coreVoice }}"
                        </div>
                    </div>

                    <div class="space-y-8">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 block px-1">Name</label>
                                <input v-model="echoName" type="text" class="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 p-4 text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:border-orange-500 rounded-xl transition-colors">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 block px-1">Archetype</label>
                                <select v-model="echoArchetype" class="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 p-4 text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:border-orange-500 rounded-xl transition-colors appearance-none">
                                    <option v-for="arc in archetypesList" :key="arc.id" :value="arc.id">{{ arc.icon }} {{ arc.label }}</option>
                                </select>
                            </div>
                        </div>

                        <!-- Enriched AI Profile Data -->
                        <div class="p-6 md:p-8 bg-orange-50/50 dark:bg-orange-900/10 border border-orange-200/50 dark:border-orange-800/30 space-y-6 shadow-inner relative overflow-hidden rounded-2xl">
                            <div class="absolute -right-6 -top-6 text-8xl opacity-[0.03] dark:opacity-[0.05] text-orange-900 dark:text-orange-300"><i class="fas fa-microscope"></i></div>
                            <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-orange-700 dark:text-orange-500 flex items-center gap-2"><i class="fas fa-sparkles text-xs"></i> AI Psychological Profile</h4>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div class="space-y-2">
                                    <span class="text-[10px] font-bold tracking-widest uppercase text-stone-400 flex items-center gap-2"><i class="fas fa-brain text-orange-400"></i> Core Belief</span>
                                    <p class="text-xs text-stone-800 dark:text-stone-300 font-medium leading-relaxed pl-3 border-l-2 border-orange-500">{{ enrichedProfile.coreBelief || '...' }}</p>
                                </div>
                                <div class="space-y-2">
                                    <span class="text-[10px] font-bold tracking-widest uppercase text-stone-400 flex items-center gap-2"><i class="fas fa-shield-alt text-orange-400"></i> Primary Fear</span>
                                    <p class="text-xs text-stone-800 dark:text-stone-300 font-medium leading-relaxed pl-3 border-l-2 border-orange-500">{{ enrichedProfile.primaryFear || '...' }}</p>
                                </div>
                                <div class="space-y-2">
                                    <span class="text-[10px] font-bold tracking-widest uppercase text-stone-400 flex items-center gap-2"><i class="fas fa-heart text-rose-400"></i> Core Need</span>
                                    <p class="text-xs text-stone-800 dark:text-stone-300 font-medium leading-relaxed pl-3 border-l-2 border-rose-500">{{ enrichedProfile.coreNeed || '...' }}</p>
                                </div>
                                <div class="space-y-2">
                                    <span class="text-[10px] font-bold tracking-widest uppercase text-stone-400 flex items-center gap-2"><i class="fas fa-bullseye text-rose-400"></i> Current Goal</span>
                                    <p class="text-xs text-stone-800 dark:text-stone-300 font-medium leading-relaxed pl-3 border-l-2 border-rose-500">{{ enrichedProfile.currentGoal || '...' }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 block px-1">Personal Notes <span class="lowercase font-normal opacity-50">(optional)</span></label>
                            <textarea v-model="echoNotes" rows="3" class="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 p-4 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500 resize-none rounded-xl transition-colors" placeholder="Add your own observations about this part..."></textarea>
                        </div>
                    </div>

                    <div class="mt-10 flex gap-4">
                        <button @click="releaseEcho" :disabled="isSaving"
                            class="flex-1 py-5 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-white dark:to-stone-200 text-white dark:text-stone-900 font-bold uppercase tracking-widest hover:from-orange-500 hover:to-rose-500 hover:text-white dark:hover:from-orange-500 dark:hover:to-rose-500 transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 rounded-[2rem] group">
                            <span v-if="!isSaving" class="font-montserrat">Release into Dashboard</span>
                            <i v-if="!isSaving" class="fas fa-seedling text-orange-400 group-hover:text-white transition-colors"></i>
                            <span v-else class="font-montserrat">Saving to Soul...</span>
                            <i v-if="isSaving" class="fas fa-circle-notch fa-spin text-orange-400 text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

definePageMeta({
    layout: 'laboratory'
});

const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

// State
const currentView = ref('history'); // history, input, processing, birth
const inputText = ref('');
const selectedListenType = ref('');
const isProcessing = ref(false);
const isSaving = ref(false);

const history = ref([]);
const historyLoading = ref(false);
const enrichmentStatus = ref('');

const listenOptions = [
    "Find the main feeling & need",
    "Uncover hidden assumptions",
    "Turn worry into small steps",
    "Hear the protective intention",
    "Just hold the chaos gently"
];

const archetypesList = [
    { id: "Inner Critic", label: "Inner Critic", icon: "⚡" },
    { id: "Anxious One", label: "Anxious One", icon: "🌀" },
    { id: "Inner Child", label: "Inner Child", icon: "🌱" },
    { id: "Perfectionist", label: "Perfectionist", icon: "✨" },
    { id: "Protector", label: "Protector", icon: "🛡️" },
    { id: "Other", label: "Other", icon: "👤" }
];

const getArchetypeIcon = (archId) => {
    const found = archetypesList.find(a => a.id === archId);
    return found ? found.icon : "👤";
};

// Processing State setup
const processingMessagesArr = [
    "Holding this feeling with care...",
    "Letting the deeper layers surface...",
    "No rush — we're just listening...",
    "Understanding the emotional core..."
];
const currentMsgIndex = ref(0);
const processingMessage = ref(processingMessagesArr[0]);
let msgInterval = null;

// Extracted & Output data
const generatedData = ref({
    coreVoice: '',
    toneWord: '',
    emoji: '',
    intent: '',
});
const enrichedProfile = ref({
    coreBelief: '',
    primaryFear: '',
    coreNeed: '',
    currentGoal: ''
});

const echoName = ref('');
const echoArchetype = ref('');
const echoNotes = ref('');

// Time and Date
const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });
};

const fetchHistory = async () => {
    const userId = authStore.user?.uid;
    if (!userId) return;
    historyLoading.value = true;
    try {
        const q = query(
            collection($firestore, 'users', userId, 'echoes'),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        history.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching echoes history:", error);
    } finally {
        historyLoading.value = false;
    }
};

const getMockResponse = (text, type) => {
    const length = text.length;
    let toneWord = "Curious";
    let emoji = "🤔";
    let intent = "To understand what is happening.";
    let suggestedName = "Curious Observer";
    let suggestedArchetype = "Other";

    if (type.includes("feeling")) {
        toneWord = "Seeking"; emoji = "🌱"; intent = "To be heard and to find a clear path.";
        suggestedName = "The Seeker"; suggestedArchetype = "Inner Child";
    } else if (type.includes("assumptions")) {
        toneWord = "Analytical"; emoji = "🧩"; intent = "To avoid wrong conclusions.";
        suggestedName = "Inner Detective"; suggestedArchetype = "Inner Critic";
    } else if (type.includes("worry")) {
        toneWord = "Overwhelmed"; emoji = "🌀"; intent = "To prevent disaster.";
        suggestedName = "Anxious Guardian"; suggestedArchetype = "Anxious One";
    } else if (type.includes("protective")) {
        toneWord = "Defensive"; emoji = "🛡️"; intent = "To keep you safe from vulnerability.";
        suggestedName = "The Shield"; suggestedArchetype = "Perfectionist";
    } else if (type.includes("chaos")) {
        toneWord = "Restless"; emoji = "🌊"; intent = "To express a heavy load.";
        suggestedName = "The Storm"; suggestedArchetype = "Other";
    }

    return {
        coreVoice: length > 30 ? text.substring(0, 70) + "..." : text,
        toneWord, emoji, intent, suggestedName, suggestedArchetype
    };
};

const processThought = async () => {
    if (!inputText.value.trim() || !selectedListenType.value) return;
    
    currentView.value = 'processing';
    isProcessing.value = true;
    enrichmentStatus.value = "Phase 1: Local Mapping";
    
    currentMsgIndex.value = 0;
    processingMessage.value = processingMessagesArr[0];
    msgInterval = setInterval(() => {
        currentMsgIndex.value = (currentMsgIndex.value + 1) % processingMessagesArr.length;
        processingMessage.value = processingMessagesArr[currentMsgIndex.value];
    }, 1500);
    
    // 1. Generate basic mock core data locally instantly
    const mock = getMockResponse(inputText.value, selectedListenType.value);
    generatedData.value = mock;
    
    echoName.value = mock.suggestedName;
    echoArchetype.value = mock.suggestedArchetype || 'Other';
    echoNotes.value = '';

    // 2. Fire the secondary AI Enrichment request to fill out the deep structural profile
    enrichmentStatus.value = "Phase 2: Groq Llama Deep Analysis via API...";
    
    try {
        const payload = {
            coreVoice: inputText.value,
            intent: mock.intent,
            archetype: mock.suggestedArchetype,
            name: mock.suggestedName
        };

        const res = await fetch('/api/ai/echo-enrich', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("API Enrichment failed");
        
        const data = await res.json();
        enrichedProfile.value = {
            coreBelief: data.coreBelief || "Unknown fundamental belief.",
            primaryFear: data.primaryFear || "Fear cannot be pinpointed.",
            coreNeed: data.coreNeed || "The core need is obscured.",
            currentGoal: data.currentGoal || "Goal is unclear at the moment."
        };
    } catch (e) {
        console.error("Enrichment error, falling back", e);
        enrichedProfile.value = {
            coreBelief: "I need to take up space.",
            primaryFear: "That I will be ignored.",
            coreNeed: "To connect with the core self.",
            currentGoal: "To establish a dialogue."
        };
    } finally {
        clearInterval(msgInterval);
        isProcessing.value = false;
        currentView.value = 'birth';
    }
};

const releaseEcho = async () => {
    isSaving.value = true;
    
    const userId = authStore.user?.uid;
    if (!userId) {
        alert("Please log in to save your Echo.");
        isSaving.value = false;
        return;
    }

    try {
        const echoesRef = collection($firestore, 'users', userId, 'echoes');
        
        const newEcho = {
            name: echoName.value || 'Unnamed',
            archetype: echoArchetype.value || 'Other',
            initialVoice: generatedData.value.coreVoice,
            notes: echoNotes.value,
            createdAt: serverTimestamp(),
            lastVisited: serverTimestamp(),
            // Embed enriched profile data
            coreBelief: enrichedProfile.value.coreBelief,
            primaryFear: enrichedProfile.value.primaryFear,
            coreNeed: enrichedProfile.value.coreNeed,
            currentGoal: enrichedProfile.value.currentGoal,
            isLegacy: false
        };
        
        await addDoc(echoesRef, newEcho);
        
        // Reset and fetch
        inputText.value = '';
        selectedListenType.value = '';
        await fetchHistory();
        currentView.value = 'history';
        
    } catch (error) {
        console.error("Error creating echo in Firestore:", error);
        alert("There was an error saving your Echo locally.");
    } finally {
        isSaving.value = false;
    }
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
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-pulse-once {
    animation: pulseOnce 1.5s cubic-bezier(0.4, 0, 0.6, 1);
}

@keyframes pulseOnce {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1) translateY(-5px); }
}
</style>
