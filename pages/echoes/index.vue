<template>
    <div class="min-h-screen bg-gradient-to-br from-zinc-50/50 to-white dark:from-zinc-950/50 dark:to-black transition-colors duration-500 pb-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
            <!-- Hero Section -->
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <span class="px-2 py-0.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20 rounded">
                        Внутренняя Бета
                    </span>
                    <span class="px-2 py-0.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded">
                        Симуляция
                    </span>
                </div>
                <div class="flex items-center gap-3">
                    <h1 class="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                        Voice &rarr; Echoes
                    </h1>
                    <div class="group relative inline-flex items-center justify-center">
                        <i class="fas fa-info-circle text-zinc-400 text-lg hover:text-cyan-500 transition-colors cursor-help" aria-label="Information about Echoes"></i>
                        <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl pointer-events-none text-center leading-relaxed">
                            Echoes is an experimental game layer. Your created parts will start to have small independent moments soon. For now, focus on connection.
                        </div>
                    </div>
                </div>
                <h2 class="text-xl font-medium text-cyan-700 dark:text-cyan-400">
                    Speak your inner thoughts — give birth to a living part of your mind that stays with you
                </h2>
                <p class="text-zinc-500 dark:text-zinc-400 text-sm font-medium max-w-2xl leading-relaxed">
                    This is the start of a gentle simulation. Your Echo will begin as a reflection of what you share today. Talk to it, listen, and watch how it evolves over time.
                </p>
            </div>

            <!-- View 1: Input Area -->
            <div v-if="currentView === 'input'" class="space-y-8 animate-fade-in">
                <div class="space-y-2">
                    <p id="thought-helper" class="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Speak freely — this stays private</p>
                    <textarea 
                        v-model="inputText" 
                        aria-describedby="thought-helper"
                        placeholder="Right now I'm feeling... / My mind keeps saying... / The voice inside is telling me..."
                        class="w-full h-48 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none font-medium text-base leading-relaxed shadow-sm hover:border-cyan-500/50 dark:hover:border-cyan-500/30"
                    ></textarea>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                        Choose how to listen to this thought
                    </h3>
                    <div class="flex flex-wrap gap-3">
                        <button 
                            v-for="option in listenOptions" 
                            :key="option"
                            @click="selectedListenType = option"
                            :class="[
                                'px-4 py-5 sm:py-3 text-sm font-medium rounded-xl border transition-all duration-200 shadow-sm',
                                selectedListenType === option 
                                    ? 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-500 text-cyan-700 dark:text-cyan-300' 
                                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            ]"
                        >
                            {{ option }}
                        </button>
                    </div>
                </div>

                <div class="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                    <button 
                        @click="processThought" 
                        :disabled="!inputText.trim() || !selectedListenType"
                        class="w-full sm:w-auto px-8 py-5 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/25 disabled:hover:shadow-none"
                    >
                        Process &amp; Birth Echo
                    </button>
                </div>
            </div>

            <!-- View 2: Processing Spinner -->
            <div v-else-if="currentView === 'processing'" class="flex flex-col items-center justify-center p-20 space-y-6 min-h-[400px] animate-fade-in bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                <div class="relative w-16 h-16">
                    <div class="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800"></div>
                    <div class="absolute inset-0 rounded-full border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-leaf text-cyan-600 dark:text-cyan-400 animate-pulse" aria-label="Processing"></i>
                    </div>
                </div>
                <div class="text-center space-y-2">
                    <p class="text-sm font-black uppercase tracking-[0.1em] text-zinc-900 dark:text-white">Forming your Echo</p>
                    <Transition name="fade" mode="out-in">
                        <p :key="processingMessage" class="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                            {{ processingMessage }}
                        </p>
                    </Transition>
                </div>
            </div>

            <!-- View 3: Birth Modal / Step -->
            <div v-else-if="currentView === 'birth'" class="space-y-8 animate-fade-in">
                <!-- Result Card -->
                <div class="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 rounded-2xl shadow-sm hover:shadow-lg transition-all space-y-8 relative overflow-hidden group/card">
                    <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600"></div>
                    
                    <div class="flex flex-col items-center justify-center pt-4 pb-2">
                        <div class="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center shadow-inner relative overflow-hidden group-hover/card:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-cyan-400/20 mix-blend-overlay"></div>
                            <span class="text-5xl drop-shadow-sm">{{ generatedData.emoji }}</span>
                        </div>
                        <h2 class="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">Your new Echo is here</h2>
                        <h3 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white group-hover/card:text-cyan-600 dark:group-hover/card:text-cyan-400 transition-colors text-center">Meet this part of you</h3>
                    </div>

                    <div class="grid gap-8">
                        <div class="space-y-3 text-center px-4">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">Core message</span>
                            <p class="font-serif italic text-lg sm:text-2xl text-zinc-900 dark:text-white leading-relaxed">
                                "{{ generatedData.coreVoice }}"
                            </p>
                        </div>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                            <div class="space-y-2">
                                <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Emotional tone</span>
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-zinc-800 dark:text-zinc-200 text-lg">{{ generatedData.toneWord }}</span>
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400">What it wants for you</span>
                                <p class="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                                    {{ generatedData.intent }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Setup Form -->
                <div class="p-8 bg-zinc-50/80 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-8">
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-zinc-500">Name your Echo</label>
                        <input 
                            v-model="echoName" 
                            type="text" 
                            class="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 font-bold text-lg text-zinc-900 dark:text-white shadow-sm transition-all"
                        />
                    </div>

                    <div class="space-y-3">
                        <label class="text-xs font-bold uppercase tracking-widest text-zinc-500">Select Archetype</label>
                        <div class="flex flex-wrap gap-2">
                            <button 
                                v-for="arch in archetypesList" 
                                :key="arch.id"
                                @click="echoArchetype = arch.id"
                                :class="[
                                    'px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all shadow-sm flex items-center gap-2',
                                    echoArchetype === arch.id 
                                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white' 
                                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-cyan-500/50 hover:text-cyan-600'
                                ]"
                            >
                                <span class="text-base">{{ arch.icon }}</span>
                                <span>{{ arch.label }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-zinc-500">Optional Note</label>
                        <input 
                            v-model="echoNotes" 
                            type="text" 
                            placeholder="A few words about this part..."
                            class="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-sm shadow-sm transition-all"
                        />
                    </div>

                    <div class="pt-6">
                        <button 
                            @click="releaseEcho" 
                            :disabled="isSaving"
                            class="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.01] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                        >
                            <i v-if="isSaving" class="fas fa-spinner fa-spin"></i>
                            <span v-else>Release &amp; Meet Your Echo</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- View 4: Dashboard -->
            <div v-else-if="currentView === 'dashboard'" class="space-y-12 animate-fade-in">
                <!-- Header Actions -->
                <div class="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">My Echoes</h2>
                        <p class="text-sm font-medium text-zinc-500">Your living inner circle</p>
                    </div>
                    <button 
                        @click="resetToInput"
                        class="px-4 py-2 border border-cyan-500/50 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2"
                    >
                        <i class="fas fa-plus"></i>
                        <span class="hidden sm:inline">Create New</span>
                        <span class="sm:hidden">New</span>
                    </button>
                </div>

                <!-- Empty State -->
                <div v-if="echoesList.length === 0 && !isLoadingEchoes" class="flex flex-col items-center justify-center p-12 text-center bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 border-dashed rounded-2xl transform transition-all">
                    <div class="w-20 h-20 mb-6 bg-cyan-500/10 rounded-full flex items-center justify-center">
                        <i class="fas fa-seedling text-3xl text-cyan-600 dark:text-cyan-400 opacity-80"></i>
                    </div>
                    <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-2">It's quiet here</h3>
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">Your inner world is waiting locally. The first Echo is ready to be born.</p>
                    <button 
                        @click="resetToInput"
                        class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    >
                        Create Your First Echo
                    </button>
                </div>

                <!-- Echoes Grid -->
                <div v-else-if="echoesList.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="echo in echoesList" :key="echo.id" class="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-cyan-500/50 dark:hover:border-cyan-500/30 hover:shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:scale-[1.02] transition-all duration-300 group">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                    {{ echo.name || 'Unnamed Echo' }}
                                </h3>
                                <div class="mt-2 flex gap-2">
                                  <span class="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                                      <span>{{ getArchetypeIcon(echo.archetype) }}</span> {{ echo.archetype || 'Other' }}
                                  </span>
                                  <span class="text-[10px] px-2 py-0.5 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 rounded font-bold uppercase tracking-wider">
                                      {{ getEchoMood(echo) }}
                                  </span>
                                </div>
                                <span class="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 block mt-2">
                                    Born {{ timeAgo(echo.createdAt) }}
                                </span>
                            </div>
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                                <i class="fas fa-leaf text-cyan-600 dark:text-cyan-400 text-sm"></i>
                            </div>
                        </div>

                        <div class="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 p-4 rounded-xl mb-6 shadow-sm">
                            <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Last Whisper</span>
                            <div v-if="echo.mockWhisper">
                                <p class="text-sm font-medium text-cyan-700 dark:text-cyan-400 italic">
                                    "{{ echo.mockWhisper }}" <span class="ml-2 text-[8px] uppercase tracking-widest bg-cyan-500 text-white px-1.5 py-0.5 rounded shadow-sm">New</span>
                                </p>
                            </div>
                            <div v-else>
                                <p class="text-sm font-medium text-zinc-700 dark:text-zinc-300 italic">
                                    "{{ echo.initialVoice }}"
                                </p>
                            </div>
                        </div>

                        <button @click="openChat(echo)" class="w-full py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex justify-center items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                            <i class="fas fa-comment-dots" aria-label="Talk"></i>
                            Talk to this Echo
                        </button>
                    </div>
                </div>
                
                <div v-else-if="isLoadingEchoes" class="flex justify-center p-12">
                     <div class="relative w-12 h-12">
                         <div class="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800"></div>
                         <div class="absolute inset-0 rounded-full border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                     </div>
                </div>

                <!-- Reflection Prompt -->
                <div class="mt-12 p-6 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-cyan-500 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
                    <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">Simulation Reflection</h4>
                    <p class="text-sm text-zinc-600 dark:text-zinc-300 mb-4 font-medium">What did it feel like to give this part a name and space?</p>
                    <textarea 
                        v-model="reflectionDraft"
                        placeholder="Write a quick note for your journal... (auto-saves locally)"
                        class="w-full h-24 p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-sm font-medium resize-none placeholder-zinc-400 dark:placeholder-zinc-600 transition-colors"
                    ></textarea>
                </div>
            </div>

            <!-- Chat Modal -->
            <div v-if="isChatOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
                <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeChat"></div>
                <div class="relative w-full max-w-lg bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl flex flex-col h-[600px] max-h-[90vh] border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    <!-- Chat Header -->
                    <div class="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 flex items-center justify-center border border-cyan-500/20">
                                <i class="fas fa-leaf text-cyan-600 dark:text-cyan-400"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-zinc-900 dark:text-white leading-tight">{{ selectedChatEcho?.name || 'Echo' }}</h3>
                                <div class="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">{{ selectedChatEcho?.archetype }}</div>
                            </div>
                        </div>
                        <button @click="closeChat" class="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Chat Messages -->
                    <div class="flex-1 overflow-y-auto p-4 space-y-4" id="chat-container">
                        <div v-if="chatHistory.length === 0" class="flex justify-center p-4">
                            <span class="text-xs font-bold uppercase tracking-widest text-zinc-400">Beginning of dialogue</span>
                        </div>
                        <div v-for="(msg, i) in chatHistory" :key="i" class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
                            <div class="max-w-[80%] rounded-2xl px-4 py-3 text-sm font-medium shadow-sm transition-all" :class="msg.role === 'user' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-sm' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm'">
                                {{ msg.content }}
                            </div>
                        </div>
                        <div v-if="isChatTyping" class="flex justify-start">
                            <div class="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex gap-1 items-center">
                                <span class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                                <span class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                                <span class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chat Input -->
                    <div class="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                        <form @submit.prevent="sendChatMessage" class="flex gap-2">
                            <input 
                                v-model="chatInput" 
                                type="text" 
                                placeholder="Type a message..." 
                                class="flex-1 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-sm outline-none"
                            />
                            <button type="submit" :disabled="!chatInput.trim() || isChatTyping" class="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { collection, query, orderBy, getDocs, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';

definePageMeta({
    layout: 'laboratory'
});

const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

// State
const currentView = ref('input'); // input, processing, birth, dashboard
const inputText = ref('');
const selectedListenType = ref('');
const isSaving = ref(false);
const isLoadingEchoes = ref(false);
const echoesList = ref([]);

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
    "No rush — we're just listening..."
];
const currentMsgIndex = ref(0);
const processingMessage = ref(processingMessagesArr[0]);
let msgInterval = null;

// Chat Setup
const isChatOpen = ref(false);
const selectedChatEcho = ref(null);
const chatHistory = ref([]);
const chatInput = ref('');
const isChatTyping = ref(false);

const reflectionDraft = ref('');

watch(reflectionDraft, (newVal) => {
    localStorage.setItem('echoReflectionDraft', newVal);
});

// Time and Date
const timeAgo = (dateInput) => {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};

const getEchoMood = (echo) => {
    const isInteracted = localStorage.getItem('echoChat_' + echo.id);
    if (isInteracted) return "Feeling heard ❤️";
    
    if (!echo.createdAt) return "Newly born";
    const date = new Date(echo.createdAt);
    const hours = Math.floor((new Date() - date) / (1000 * 60 * 60));
    if (hours > 24) return "Settling in";
    return "Newly born";
};

const generatedData = ref({
    coreVoice: '',
    toneWord: '',
    emoji: '',
    intent: '',
});

const echoName = ref('');
const echoArchetype = ref('');
const echoNotes = ref('');

// Methods
const getMockResponse = (text, type) => {
    // Simple localized logic to generate somewhat contextual mock data
    const length = text.length;
    let toneWord = "Curious";
    let emoji = "🤔";
    let intent = "To understand what is happening.";
    let suggestedName = "Curious Observer";
    let suggestedArchetype = "Other";

    if (type.includes("feeling")) {
        toneWord = "Seeking";
        emoji = "🌱";
        intent = "To be heard and to find a clear path to getting its needs met.";
        suggestedName = "The Seeker";
        suggestedArchetype = "Inner Child";
    } else if (type.includes("assumptions")) {
        toneWord = "Analytical";
        emoji = "🧩";
        intent = "To make sure you don't get hurt by jumping to the wrong conclusions.";
        suggestedName = "Inner Detective";
        suggestedArchetype = "Inner Critic";
    } else if (type.includes("worry")) {
        toneWord = "Overwhelmed";
        emoji = "🌀";
        intent = "To prevent future disaster by simulating all possible outcomes.";
        suggestedName = "Anxious Guardian";
        suggestedArchetype = "Anxious One";
    } else if (type.includes("protective")) {
        toneWord = "Defensive";
        emoji = "🛡️";
        intent = "To keep you absolutely safe from any vulnerability or pain.";
        suggestedName = "The Shield";
        suggestedArchetype = "Perfectionist";
    } else if (type.includes("chaos")) {
        toneWord = "Restless";
        emoji = "🌊";
        intent = "To express a heavy emotional load that hasn't found an outlet yet.";
        suggestedName = "The Storm";
        suggestedArchetype = "Other";
    }

    return {
        coreVoice: length > 30 ? text.substring(0, 60) + "..." : "Things feel tangled right now...",
        toneWord,
        emoji,
        intent,
        suggestedName,
        suggestedArchetype
    };
};

const processThought = async () => {
    if (!inputText.value.trim() || !selectedListenType.value) return;
    
    currentView.value = 'processing';
    
    currentMsgIndex.value = 0;
    processingMessage.value = processingMessagesArr[0];
    msgInterval = setInterval(() => {
        currentMsgIndex.value = (currentMsgIndex.value + 1) % processingMessagesArr.length;
        processingMessage.value = processingMessagesArr[currentMsgIndex.value];
    }, 1100);
    
    // Fake delay
    await new Promise(resolve => setTimeout(resolve, 3400));
    
    clearInterval(msgInterval);
    
    const mock = getMockResponse(inputText.value, selectedListenType.value);
    generatedData.value = mock;
    
    // Pre-fill form
    echoName.value = mock.suggestedName;
    echoArchetype.value = mock.suggestedArchetype || 'Other';
    echoNotes.value = '';
    
    currentView.value = 'birth';
};

const releaseEcho = async () => {
    isSaving.value = true;
    
    // Fake delay to simulate "releasing"
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
            lastVisited: serverTimestamp()
        };
        
        await addDoc(echoesRef, newEcho);
        
        await fetchEchoes();
        
        currentView.value = 'dashboard';
    } catch (error) {
        console.error("Error creating echo in Firestore:", error);
        alert("There was an error saving your Echo locally.");
    } finally {
        isSaving.value = false;
    }
};

const fetchEchoes = async () => {
    isLoadingEchoes.value = true;
    const userId = authStore.user?.uid;
    if (!userId) {
        isLoadingEchoes.value = false;
        return;
    }

    try {
        const echoesRef = collection($firestore, 'users', userId, 'echoes');
        const q = query(echoesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedEchoes = [];
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const echo = { id: docSnap.id, ...data };
            
            if (echo.createdAt?.toDate) echo.createdAt = echo.createdAt.toDate();
            if (echo.lastVisited?.toDate) echo.lastVisited = echo.lastVisited.toDate();
            
            // Daily Whisper calculation
            if (echo.lastVisited) {
                const daysSince = (new Date() - echo.lastVisited) / (1000 * 60 * 60 * 24);
                if (daysSince > 1) {
                    echo.mockWhisper = "I'm still here if you need to talk.";
                }
            }
            
            fetchedEchoes.push(echo);
        });
        
        echoesList.value = fetchedEchoes;
    } catch (error) {
        console.error("Error fetching local echoes:", error);
    } finally {
        isLoadingEchoes.value = false;
    }
};

const resetToInput = () => {
    inputText.value = '';
    selectedListenType.value = '';
    currentView.value = 'input';
};

const openChat = async (echo) => {
    selectedChatEcho.value = echo;
    isChatOpen.value = true;
    chatHistory.value = [];
    
    const userId = authStore.user?.uid;
    if (!userId || !echo.id) return;

    try {
        const echoRef = doc($firestore, 'users', userId, 'echoes', echo.id);
        await setDoc(echoRef, { lastVisited: serverTimestamp() }, { merge: true });
        echo.lastVisited = new Date();
        echo.mockWhisper = null;
    } catch (e) {
        console.error("Error updating lastVisited:", e);
    }

    try {
        const messagesRef = collection($firestore, 'users', userId, 'echoes', echo.id, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        const qs = await getDocs(q);
        
        const msgs = [];
        qs.forEach(d => {
            msgs.push(d.data());
        });
        
        if (msgs.length === 0) {
            const initialMsg = {
                role: 'assistant',
                content: `Hello... I'm ${echo.name || 'here'}. You said: "${echo.initialVoice}". How do you feel about that now?`,
                createdAt: serverTimestamp()
            };
            await addDoc(messagesRef, initialMsg);
            initialMsg.createdAt = new Date();
            msgs.push(initialMsg);
        }
        
        chatHistory.value = msgs;
        scrollToBottom();
    } catch (e) {
        console.error("Error fetching chat:", e);
    }
};

const closeChat = () => {
    isChatOpen.value = false;
    selectedChatEcho.value = null;
};

const sendChatMessage = async () => {
    if (!chatInput.value.trim() || isChatTyping.value) return;
    
    const userMsgContent = chatInput.value;
    chatInput.value = '';
    
    const userId = authStore.user?.uid;
    if (!userId || !selectedChatEcho.value?.id) return;
    const echoId = selectedChatEcho.value.id;
    const messagesRef = collection($firestore, 'users', userId, 'echoes', echoId, 'messages');
    
    const userMsg = { role: 'user', content: userMsgContent, createdAt: new Date() };
    chatHistory.value.push(userMsg);
    scrollToBottom();
    
    addDoc(messagesRef, { ...userMsg, createdAt: serverTimestamp() }).catch(e => console.error("Save msg error:", e));
    
    isChatTyping.value = true;
    
    const typingDelay = Math.floor(Math.random() * (3500 - 1800 + 1) + 1800);
    
    try {
        const response = await fetch('/api/ai/echo-chat', {
            method: 'POST',
            body: JSON.stringify({
                messages: chatHistory.value.map(m => ({ role: m.role, content: m.content })),
                echo: selectedChatEcho.value,
                archetype: selectedChatEcho.value.archetype
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        await new Promise(r => setTimeout(r, typingDelay));
        
        if (!response.ok) throw new Error("API failed");
        
        const data = await response.json();
        const aiMsgContent = data.reply;
        
        const aiMsg = { role: 'assistant', content: aiMsgContent, createdAt: new Date() };
        chatHistory.value.push(aiMsg);
        
        addDoc(messagesRef, { ...aiMsg, createdAt: serverTimestamp() }).catch(e => console.error("Save msg error:", e));
    } catch (e) {
        console.error(e);
        const fallbackMsg = { role: 'assistant', content: "I'm here... something feels quiet right now.", createdAt: new Date() };
        chatHistory.value.push(fallbackMsg);
    } finally {
        isChatTyping.value = false;
        scrollToBottom();
    }
};

const scrollToBottom = () => {
    setTimeout(() => {
        const container = document.getElementById('chat-container');
        if (container) container.scrollTop = container.scrollHeight;
    }, 50);
};

onMounted(() => {
    fetchEchoes();
    reflectionDraft.value = localStorage.getItem('echoReflectionDraft') || '';
});
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}

.animate-pulse-once {
    animation: pulseOnce 1s ease-in-out 1;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulseOnce {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
}
</style>
