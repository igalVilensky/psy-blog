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
                <p class="text-base font-medium text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">You must be logged into your MindQLab account to access the Living Dashboard and interact with your Echoes.</p>
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
                        <span class="text-[10px] font-bold text-stone-700 dark:text-stone-300 tracking-widest uppercase font-montserrat">Internal Beta / Dashboard</span>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <h1 class="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 font-montserrat tracking-tight pb-2">
                            My Echoes
                        </h1>
                        <NuxtLink to="/space/experiments/echoes"
                            class="px-6 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2 rounded-2xl shadow-sm hover:shadow-md">
                            <i class="fas fa-plus"></i>
                            <span>New Echo</span>
                        </NuxtLink>
                    </div>
                </div>

            <!-- Dashboard Grid -->
            <div v-if="isLoadingEchoes" class="flex justify-center py-20">
                <i class="fas fa-circle-notch fa-spin text-4xl text-stone-300 dark:text-stone-700"></i>
            </div>

            <div v-else-if="echoesList.length === 0" class="p-16 text-center bg-white dark:bg-stone-800 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-[2rem] shadow-sm space-y-6">
                <div class="w-20 h-20 mx-auto flex items-center justify-center bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-300 dark:text-stone-600 text-3xl rounded-3xl shadow-inner">
                    <i class="fas fa-ghost"></i>
                </div>
                <h3 class="text-xl font-bold text-stone-900 dark:text-white font-montserrat">Inner world is empty</h3>
                <p class="text-stone-500 dark:text-stone-400 text-sm max-w-sm mx-auto">You haven't birthed any parts yet. Start by exploring your thoughts.</p>
                <NuxtLink to="/space/experiments/echoes" class="inline-block px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-2xl shadow-lg">
                    Give Voice to First Thought
                </NuxtLink>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                <div v-for="echo in echoesList" :key="echo.id" class="flex flex-col p-6 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-all duration-300 group relative shadow-lg rounded-[2rem] hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                    
                    <!-- Dynamic Archetype Background Glow -->
                    <div :class="getArchetypeGlow(echo.archetype)" class="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>

                    <!-- Delete Button -->
                    <button @click="confirmDelete(echo)" class="absolute top-6 right-6 text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 z-10 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center">
                        <i class="fas fa-trash-alt text-xs"></i>
                    </button>

                    <div class="flex items-center gap-4 mb-5 relative z-10">
                        <div :class="getArchetypeBadge(echo.archetype)" class="w-14 h-14 flex items-center justify-center text-2xl rounded-2xl shadow-inner">
                            {{ getArchetypeIcon(echo.archetype) }}
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-stone-900 dark:text-white tracking-tight font-montserrat">{{ echo.name }}</h3>
                            <p class="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{{ echo.archetype }}</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-2 mb-5 relative z-10">
                        <span class="px-2 py-1 bg-stone-100 dark:bg-stone-700/50 text-stone-500 dark:text-stone-300 rounded-lg text-[10px] uppercase font-bold tracking-widest flex items-center gap-1"><i class="far fa-clock"></i> Born {{ timeAgo(echo.createdAt) }}</span>
                        <span :class="getMoodBadge(echo)" class="px-2 py-1 rounded-lg text-[10px] uppercase font-bold tracking-widest">{{ getEchoMood(echo) }}</span>
                    </div>

                    <div class="bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-700/50 p-5 rounded-2xl mb-6 shadow-inner relative z-10">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2"><i class="fas fa-quote-left mr-1 opacity-50"></i> Last Whisper</span>
                        <div v-if="echo.mockWhisper">
                            <p class="text-sm font-medium text-orange-700 dark:text-orange-400 italic">
                                "{{ echo.mockWhisper }}" <span class="ml-2 inline-block -translate-y-px text-[8px] uppercase tracking-widest bg-orange-500 text-white px-1.5 py-0.5 rounded shadow-sm">New</span>
                            </p>
                        </div>
                        <div v-else>
                            <p class="text-sm font-medium text-stone-700 dark:text-stone-300 italic leading-relaxed">
                                "{{ echo.initialVoice || '...' }}"
                            </p>
                        </div>
                    </div>

                    <button @click="openChat(echo)" class="mt-auto w-full py-4 bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors flex justify-center items-center gap-2 rounded-xl relative z-10 shadow-sm border border-stone-200 dark:border-stone-600">
                        <i class="fas fa-comment-dots"></i>
                        <span>Talk to Echo</span>
                    </button>
                </div>
            </div>

            <!-- Force Interaction Engine -->
            <div v-if="echoesList.length >= 2" class="pt-16 mt-8 space-y-8 animate-fade-in relative">
                <div class="text-center space-y-3">
                    <h2 class="text-3xl font-black text-stone-900 dark:text-white font-montserrat tracking-tight flex items-center justify-center gap-3">
                        <i class="fas fa-project-diagram text-orange-500 drop-shadow-md"></i> Force Echo Interaction
                    </h2>
                    <p class="text-stone-500 dark:text-stone-400 text-base font-medium max-w-lg mx-auto">Observe a deep, unprompted discussion between two parts of your mind.</p>
                </div>

                <div class="p-8 md:p-10 bg-white dark:bg-stone-800 border bg-opacity-70 dark:bg-opacity-50 backdrop-blur-lg border-stone-200 dark:border-stone-700 rounded-[2.5rem] shadow-xl relative z-0">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative">
                        <!-- Connecting Orbit Decoration -->
                        <div class="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px bg-stone-300 dark:bg-stone-600 -z-10 border-dashed border-t border-b-0 -translate-y-[40px]"></div>
                        
                        <div class="space-y-3 bg-stone-50 dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm relative z-10 transition-colors">
                            <label class="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 block ml-1"><i class="fas fa-dot-circle mr-1"></i> Origin Echo</label>
                            <div class="relative">
                                <select v-model="selectedEchoA" class="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-4 text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm">
                                    <option value="" disabled>Choose first part...</option>
                                    <option v-for="e in echoesList" :key="'A-'+e.id" :value="e" :disabled="selectedEchoB?.id === e.id">{{ e.name }} ({{ e.archetype }})</option>
                                </select>
                            </div>
                        </div>
                        <div class="space-y-3 bg-stone-50 dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm relative z-10 transition-colors">
                            <label class="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 block ml-1"><i class="fas fa-dot-circle mr-1"></i> Responding Echo</label>
                            <div class="relative">
                                <select v-model="selectedEchoB" class="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-4 text-sm font-bold text-stone-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all shadow-sm">
                                    <option value="" disabled>Choose second part...</option>
                                    <option v-for="e in echoesList" :key="'B-'+e.id" :value="e" :disabled="selectedEchoA?.id === e.id">{{ e.name }} ({{ e.archetype }})</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4 mb-8">
                        <div class="space-y-2">
                            <label class="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 block ml-1">What should they discuss?</label>
                            <input v-model="interactionTopic" type="text" placeholder="e.g. feeling safe enough to rest, facing uncertainty..." class="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4 text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm">
                        </div>
                        <div class="flex flex-wrap gap-2 items-center">
                            <span class="text-[10px] font-bold tracking-widest uppercase text-stone-400 mr-2">Presets:</span>
                            <button v-for="preset in interactionPresets" :key="preset" @click="interactionTopic = preset"
                                :class="[interactionTopic === preset ? 'bg-orange-500 text-white shadow-md' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:border-orange-400 border border-stone-200 dark:border-stone-700 hover:shadow-sm']"
                                class="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all rounded-lg">
                                {{ preset }}
                            </button>
                        </div>
                    </div>

                    <button @click="runInteraction" :disabled="!selectedEchoA || !selectedEchoB || isInteracting"
                        class="w-full py-5 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-white dark:to-stone-100 text-white dark:text-stone-900 font-bold uppercase tracking-widest hover:from-orange-500 hover:to-rose-500 hover:text-white dark:hover:from-orange-500 dark:hover:to-rose-500 transition-all duration-500 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 rounded-2xl shadow-lg hover:shadow-orange-500/25">
                        <span v-if="!isInteracting" class="font-montserrat">Initiate Observation</span>
                        <i v-if="!isInteracting" class="fas fa-eye text-orange-400 group-hover:text-white transition-colors"></i>
                        <span v-else class="font-montserrat">Simulation Generating...</span>
                        <i v-if="isInteracting" class="fas fa-circle-notch fa-spin text-orange-400"></i>
                    </button>
                    
                    <!-- Simulating loader -->
                    <div v-if="isInteracting" class="mt-8 flex justify-center py-4">
                        <div class="flex gap-3">
                            <div class="w-3 h-3 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-full animate-bounce shadow-md" style="animation-delay: 0s"></div>
                            <div class="w-3 h-3 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-full animate-bounce shadow-md" style="animation-delay: 0.2s"></div>
                            <div class="w-3 h-3 bg-gradient-to-tr from-rose-400 to-rose-600 rounded-full animate-bounce shadow-md" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>

                    <!-- Transcript Result -->
                    <div v-if="displayedInteraction.length > 0" class="mt-10 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 p-8 shadow-2xl rounded-3xl overflow-hidden relative">
                        <div class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-500 to-rose-500"></div>
                        <div class="flex items-center justify-between mb-8 pb-4 border-b border-stone-100 dark:border-stone-800">
                            <h3 class="text-sm font-black uppercase tracking-widest text-stone-500"><i class="fas fa-satellite-dish mr-2 text-orange-500 animate-pulse"></i> Live Intercept Log</h3>
                            <button @click="displayedInteraction = []" class="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition-colors"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="space-y-6">
                            <!-- Progressively shown dialogue lines -->
                            <div v-for="(line, idx) in displayedInteraction" :key="idx" class="text-sm font-medium leading-relaxed animate-fade-in transition-all"
                                :class="[line.includes(selectedEchoA?.name) ? 'flex flex-col items-start pr-12' : (line.includes(selectedEchoB?.name) ? 'flex flex-col items-end pl-12' : 'text-stone-400 text-center text-xs italic opacity-70')]">
                                
                                <span v-if="line.includes(selectedEchoA?.name)" class="text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-1 px-2">{{ selectedEchoA?.name }}</span>
                                <span v-else-if="line.includes(selectedEchoB?.name)" class="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-1 px-2">{{ selectedEchoB?.name }}</span>
                                
                                <div :class="[line.includes(selectedEchoA?.name) ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800/30 text-stone-800 dark:text-stone-200' : (line.includes(selectedEchoB?.name) ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800/30 text-stone-800 dark:text-stone-200' : 'bg-transparent border-transparent')]"
                                    class="p-4 rounded-2xl border shadow-sm max-w-[85%]">
                                    {{ cleanLine(line) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-else-if="echoesList.length === 1 && !isLoadingEchoes" class="pt-16 mt-8 space-y-6 text-center animate-fade-in border-t border-stone-200 dark:border-stone-800">
                <p class="text-xs font-bold uppercase tracking-widest text-stone-400">Create at least 2 Echoes to unlock the Interaction Engine.</p>
            </div>

            <!-- CHAT MODAL -->
            <Transition name="fade">
                <div v-if="isChatOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/80 backdrop-blur-md">
                    <div class="bg-white dark:bg-stone-900 w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl rounded-[2rem] overflow-hidden relative border border-stone-200 dark:border-stone-700">
                        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-rose-500"></div>
                        
                        <div class="p-5 sm:p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-800/80 backdrop-blur-3xl shrink-0">
                            <div class="flex items-center gap-4">
                                <div :class="getArchetypeBadge(selectedChatEcho?.archetype)" class="w-12 h-12 flex items-center justify-center text-xl rounded-2xl shadow-sm border border-stone-100 dark:border-stone-600">
                                    {{ getArchetypeIcon(selectedChatEcho?.archetype) }}
                                </div>
                                <div>
                                    <h2 class="text-lg font-black text-stone-900 dark:text-white font-montserrat tracking-tight">{{ selectedChatEcho?.name || 'Echo' }}</h2>
                                    <p class="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest">
                                        {{ isChatTyping ? 'Thinking...' : 'Ready to listen' }}
                                    </p>
                                </div>
                            </div>
                            <button @click="closeChat" class="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors hover:bg-stone-200 dark:hover:bg-stone-700 rounded-full" aria-label="Close chat">
                                <i class="fas fa-times text-lg"></i>
                            </button>
                        </div>

                        <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-white dark:bg-stone-900/50" id="chat-container">
                            <div v-for="(msg, idx) in chatHistory" :key="idx" class="flex flex-col animate-fade-in" :class="[msg.role === 'user' ? 'items-end' : 'items-start']">
                                <span class="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1 px-2">
                                    {{ msg.role === 'user' ? 'You' : (selectedChatEcho?.name || 'Echo') }}
                                </span>
                                <div :class="[msg.role === 'user' ? 'bg-orange-500 text-white border-orange-600' : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200']"
                                    class="max-w-[85%] sm:max-w-[75%] p-4 text-sm font-medium leading-relaxed border shadow-sm"
                                    :style="msg.role === 'user' ? 'border-radius: 20px 20px 4px 20px' : 'border-radius: 20px 20px 20px 4px'">
                                    {{ msg.content }}
                                </div>
                            </div>

                            <div v-if="isChatTyping" class="flex flex-col items-start animate-fade-in">
                                <div class="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-5 rounded-2xl max-w-[85%] text-stone-400 flex items-center gap-3 shadow-sm" style="border-radius: 20px 20px 20px 4px">
                                    <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                                    <span class="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                                    <span class="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 sm:p-5 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 shrink-0">
                            <form @submit.prevent="sendChatMessage" class="relative max-w-2xl mx-auto">
                                <input v-model="chatInput" type="text" placeholder="Tell it what you feel right now..." :disabled="isChatTyping"
                                    class="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 pl-6 py-4 pr-32 rounded-2xl text-sm font-medium text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-inner transition-all disabled:opacity-50">
                                <button type="submit" :disabled="!chatInput.trim() || isChatTyping"
                                    class="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold tracking-widest uppercase text-[10px] hover:shadow-lg transition-all rounded-xl disabled:opacity-50 flex items-center justify-center">
                                    <i class="fas fa-paper-plane mr-1 sm:mr-0"></i><span class="hidden sm:inline-block ml-2">Send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Transition>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';

definePageMeta({
    layout: 'laboratory'
});

const authStore = useAuthStore();
const { $firestore } = useNuxtApp();

// State
const isLoadingEchoes = ref(true);
const echoesList = ref([]);

// Interaction State
const selectedEchoA = ref('');
const selectedEchoB = ref('');
const interactionTopic = ref('');
const isInteracting = ref(false);
const interactionResult = ref('');
const displayedInteraction = ref([]); // For progressive reveal

const interactionPresets = [
    "safety & risk", 
    "self-worth", 
    "productivity vs rest", 
    "moving forward", 
    "feeling seen & accepted", 
    "letting go of the past"
];

// Chat State
const isChatOpen = ref(false);
const selectedChatEcho = ref(null);
const chatHistory = ref([]);
const chatInput = ref('');
const isChatTyping = ref(false);

const archetypesList = [
    { id: "Inner Critic", icon: "⚡" },
    { id: "Anxious One", icon: "🌀" },
    { id: "Inner Child", icon: "🌱" },
    { id: "Perfectionist", icon: "✨" },
    { id: "Protector", icon: "🛡️" },
    { id: "Other", icon: "👤" }
];

const getArchetypeIcon = (archId) => {
    const found = archetypesList.find(a => a.id === archId);
    return found ? found.icon : "👤";
};

const getArchetypeBadge = (archId) => {
    switch (archId) {
        case "Inner Critic": return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-800";
        case "Anxious One": return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800";
        case "Inner Child": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
        case "Perfectionist": return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800";
        case "Protector": return "bg-stone-200 text-stone-800 dark:bg-stone-700 border-stone-300 dark:border-stone-600 dark:text-stone-300";
        default: return "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 border-stone-200 dark:border-stone-700";
    }
};

const getArchetypeGlow = (archId) => {
    switch (archId) {
        case "Inner Critic": return "bg-red-500";
        case "Anxious One": return "bg-indigo-500";
        case "Inner Child": return "bg-emerald-500";
        case "Perfectionist": return "bg-amber-500";
        case "Protector": return "bg-stone-500";
        default: return "bg-stone-400";
    }
};

const cleanLine = (line) => {
    return line.replace(/^[^:]+:\s*/, '').replace(/\*/g, '').trim();
};

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

const getMoodBadge = (echo) => {
    const mood = getEchoMood(echo);
    if (mood.includes('heard')) return 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400';
    if (mood.includes('born')) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    return 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400';
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

const confirmDelete = async (echo) => {
    if (confirm(`Are you sure you want to delete "${echo.name}"? This action is irreversible.`)) {
        const userId = authStore.user?.uid;
        if (!userId) return;
        try {
            const echoRef = doc($firestore, 'users', userId, 'echoes', echo.id);
            await deleteDoc(echoRef);
            
            // Clean up UI instantly
            echoesList.value = echoesList.value.filter(e => e.id !== echo.id);
            
            // NOTE: Firestore subcollection 'messages' drops orphan references or requires batch deletion
            // For MVP, top-level deletion makes it inaccessible successfully.
        } catch (e) {
            console.error("Delete failed", e);
        }
    }
};

// Chat Methods 
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
        localStorage.setItem('echoChat_' + echo.id, 'true'); // Visually updates mood locally 
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
    
    addDoc(messagesRef, { ...userMsg, createdAt: serverTimestamp() }).catch(e => console.error("Save error:", e));
    
    isChatTyping.value = true;
    
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
        
        if (!response.ok) throw new Error("API failed");
        
        const data = await response.json();
        const aiMsgContent = data.reply;
        
        const aiMsg = { role: 'assistant', content: aiMsgContent, createdAt: new Date() };
        chatHistory.value.push(aiMsg);
        
        addDoc(messagesRef, { ...aiMsg, createdAt: serverTimestamp() }).catch(e => console.error("Save error:", e));
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

// Force Interaction
const formattedDialogue = computed(() => {
    if (!interactionResult.value) return [];
    return interactionResult.value.split('\n').filter(line => line.trim().length > 0);
});

const runInteraction = async () => {
    if (!selectedEchoA.value || !selectedEchoB.value) return;
    isInteracting.value = true;
    interactionResult.value = '';
    displayedInteraction.value = [];
    
    const topic = interactionTopic.value.trim() || 'how they feel about each other right now';

    try {
        const response = await fetch('/api/ai/echo-interact', {
            method: 'POST',
            body: JSON.stringify({
                echoA: selectedEchoA.value,
                echoB: selectedEchoB.value,
                topic: topic
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) throw new Error("API failed");
        
        const data = await response.json();
        interactionResult.value = data.dialogue;

        // Progressive Reveal Logic
        const lines = data.dialogue.split('\n').filter(line => line.trim().length > 0);
        let currentLine = 0;
        
        const revealInterval = setInterval(() => {
            if (currentLine < lines.length) {
                displayedInteraction.value.push(lines[currentLine]);
                currentLine++;
            } else {
                clearInterval(revealInterval);
            }
        }, 1200); // 1.2s between lines to simulate typing/thinking

        // Save to Firestore
        const userId = authStore.user?.uid;
        if (userId) {
            const interactionsRef = collection($firestore, 'users', userId, 'echoes', selectedEchoA.value.id, 'interactions');
            await addDoc(interactionsRef, {
                partnerEchoId: selectedEchoB.value.id,
                partnerEchoName: selectedEchoB.value.name,
                topic: topic,
                dialogue: data.dialogue,
                createdAt: serverTimestamp()
            });
        }
    } catch (e) {
        console.error("Interaction failed:", e);
        displayedInteraction.value = ["Simulation failed to maintain quantum stability. Try again."];
    } finally {
        isInteracting.value = false;
    }
};


onMounted(() => {
    fetchEchoes();
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
