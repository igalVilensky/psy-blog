<template>
    <div
        class="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-2 py-4 sm:px-4 sm:py-8 font-sans transition-colors duration-500 overflow-hidden select-none">

        <!-- Breadcrumbs -->
        <Breadcrumbs class="mb-8" />

        <!-- Start Screen -->
        <div v-if="gameState === 'start'" class="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up pt-10">
            <div class="space-y-4">

                <h1 class="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    Double
                    <span
                        class="block text-2xl sm:text-3xl font-medium text-indigo-500 dark:text-indigo-400 mt-2 tracking-normal">Найди
                        пару</span>
                </h1>
                <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Тренировка внимания. Найдите <strong>единственный</strong> общий символ на двух полях.
                </p>
            </div>

            <div
                class="bg-white dark:bg-slate-900/80 rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl text-left max-w-md mx-auto relative overflow-hidden group">
                <div
                    class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                </div>

                <div class="relative z-10 space-y-6">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <i class="fas fa-sliders-h text-indigo-500"></i>
                        Настройки
                    </h3>

                    <div class="space-y-4">
                        <!-- Mode Selection -->
                        <div class="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <button @click="settings.mode = 'endless'"
                                :class="['py-2 rounded-lg text-sm font-bold transition-all', settings.mode === 'endless' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700']">
                                <i class="fas fa-infinity mr-1"></i> Бесконечно
                            </button>
                            <button @click="settings.mode = 'timer'"
                                :class="['py-2 rounded-lg text-sm font-bold transition-all', settings.mode === 'timer' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700']">
                                <i class="fas fa-stopwatch mr-1"></i> 30 Секунд
                            </button>
                        </div>

                        <label
                            class="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 group/check">
                            <span class="text-slate-700 dark:text-slate-200 font-medium">Цветные фигуры</span>
                            <div class="relative flex items-center">
                                <input type="checkbox" v-model="settings.colored"
                                    class="w-6 h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-colors">
                            </div>
                        </label>

                        <label
                            class="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 group/check">
                            <div class="flex flex-col">
                                <span class="text-slate-700 dark:text-slate-200 font-medium">Вращение</span>
                                <span class="text-xs text-slate-500 dark:text-slate-400 mt-1">Фигуры могут быть
                                    перевернуты</span>
                            </div>
                            <div class="relative flex items-center">
                                <input type="checkbox" v-model="settings.rotated"
                                    class="w-6 h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-colors">
                            </div>
                        </label>

                        <!-- Sound Settings -->
                        <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <div class="flex flex-col">
                                <span class="text-slate-700 dark:text-slate-200 font-medium">Звук</span>
                                <span class="text-xs text-slate-500 dark:text-slate-400 mt-1">Эффекты при нажатии</span>
                            </div>
                            <button @click="settings.sound = !settings.sound"
                                class="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-indigo-500">
                                <i :class="['fas', settings.sound ? 'fa-volume-up' : 'fa-volume-mute']"></i>
                            </button>
                        </div>
                    </div>

                    <button @click="startGame"
                        class="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
                        <span>Начать</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Game Interface -->
        <div v-else-if="gameState === 'playing'" class="max-w-6xl mx-auto h-[90vh] flex flex-col">

            <!-- Header HUD -->
            <div
                class="flex-none flex justify-between items-center mb-4 bg-white dark:bg-slate-900/80 p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-white/5 backdrop-blur-md z-20">
                <div class="flex gap-6 sm:gap-12">
                    <div class="flex flex-col">
                        <span class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Счет</span>
                        <span class="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{{
                            animatedScore }}</span>
                    </div>
                    <div class="flex flex-col" v-if="settings.mode === 'endless'">
                        <span class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Уровень</span>
                        <span class="text-2xl font-black text-slate-700 dark:text-slate-200 font-mono">{{ level
                            }}</span>
                    </div>
                    <div class="flex flex-col" v-else>
                        <span class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Время</span>
                        <span
                            :class="['text-2xl font-black font-mono', timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-700 dark:text-slate-200']">
                            {{ timeLeft.toFixed(1) }}s
                        </span>
                    </div>
                </div>

                <div class="flex gap-6 sm:gap-12 text-right">
                    <button @click="endGame"
                        class="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Game Grids -->
            <div
                class="flex-grow flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center relative min-h-0">

                <!-- Feedback Overlay -->
                <div v-if="feedback" class="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                    <div
                        :class="['text-8xl font-black drop-shadow-2xl animate-scale-in', feedback === 'correct' ? 'text-green-500' : 'text-red-500']">
                        <i :class="['fas', feedback === 'correct' ? 'fa-check' : 'fa-times']"></i>
                    </div>
                </div>

                <!-- Left Canvas Container -->
                <div class="relative w-full aspect-square max-w-[50vh] max-h-[50vh] sm:max-w-none sm:h-full sm:flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden cursor-crosshair group active:scale-[0.99] transition-transform"
                    @click="handleCanvasClick($event, 'left')">
                    <canvas ref="canvasLeft" class="w-full h-full object-contain"></canvas>
                    <div
                        class="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500/10 rounded-3xl transition-colors pointer-events-none">
                    </div>
                </div>

                <!-- Divider -->
                <div class="flex-none text-slate-300 dark:text-slate-600 font-black text-2xl">
                    <i class="fas fa-times"></i>
                </div>

                <!-- Right Canvas Container -->
                <div class="relative w-full aspect-square max-w-[50vh] max-h-[50vh] sm:max-w-none sm:h-full sm:flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden cursor-crosshair group active:scale-[0.99] transition-transform"
                    @click="handleCanvasClick($event, 'right')">
                    <canvas ref="canvasRight" class="w-full h-full object-contain"></canvas>
                    <div
                        class="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500/10 rounded-3xl transition-colors pointer-events-none">
                    </div>
                </div>

            </div>

            <div class="flex-none h-8 text-center text-slate-400 text-sm mt-2 opacity-60">
                Ищите одинаковый символ на обоих полях
            </div>

            <!-- Game Controls (Skip/Hint) -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
                <!-- Hint Indicator (visible if hint active) -->
                <!-- Hint Indicator (visible if hint active) -->
                <div v-if="hintActive"
                    class="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-bold animate-pulse border border-yellow-500/30 flex items-center gap-2">
                    <i class="fas fa-lightbulb"></i>
                    <span>Подсказка: Найдите <b>{{ targetName }}</b>!</span>
                </div>

                <button @click="skipLevel"
                    class="p-4 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-indigo-500 hover:shadow-lg transition-all border border-slate-200 dark:border-white/10"
                    title="Пропустить уровень">
                    <i class="fas fa-forward"></i>
                </button>
            </div>
        </div>

        <!-- Ended Screen -->
        <div v-else-if="gameState === 'finished'"
            class="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up pt-20">
            <div
                class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
                <div
                    class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                </div>

                <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-8">Результаты</h2>

                <div class="grid grid-cols-2 gap-8 mb-8">
                    <div class="space-y-2">
                        <div class="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Счет
                        </div>
                        <div
                            class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 py-2">
                            {{ score }}</div>
                    </div>
                    <div class="space-y-2">
                        <div class="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                            {{ settings.mode === 'timer' ? 'Режим' : 'Уровень' }}
                        </div>
                        <div class="text-xl sm:text-3xl font-bold text-slate-700 dark:text-slate-200 py-4">
                            {{ settings.mode === 'timer' ? '30 Секунд' : maxLevel }}
                        </div>
                    </div>
                </div>

                <!-- Guest Login Prompt -->
                <div v-if="!isLoggedIn"
                    class="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5">
                    <p class="text-slate-600 dark:text-slate-300 mb-4 font-medium">
                        Хотите сохранить прогресс и соревноваться с другими?
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <button @click="navigateTo('/auth/login')"
                            class="px-6 py-2 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                            Войти
                        </button>
                        <button @click="navigateTo('/auth/register')"
                            class="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                            Регистрация
                        </button>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button @click="gameState = 'start'"
                        class="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Настройки
                    </button>
                    <button @click="startGame"
                        class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5">
                        Играть снова
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useNuxtApp } from '#app';

definePageMeta({
    layout: "laboratory",
});

import { Howl } from 'howler';
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

// --- Settings & State ---
const gameState = ref('start'); // 'start', 'playing', 'finished'
const settings = ref({
    colored: false,
    rotated: false,
    mode: 'endless', // 'endless' or 'timer'
    sound: true
});
const level = ref(1);
const score = ref(0);
const animatedScore = ref(0);
const maxLevel = ref(1);
const feedback = ref(null);
const timeLeft = ref(30);

// --- Game Data ---
const canvasLeft = ref(null);
const canvasRight = ref(null);
let ctxLeft = null;
let ctxRight = null;
let currentShapesLeft = [];
let currentShapesRight = [];
let targetShapeId = null;
let resizeObserver = null;
let timerInterval = null;
const isDark = ref(false);
const isLoggedIn = ref(false);
const consecutiveErrors = ref(0);
const hintActive = ref(false);
const targetName = ref('');

// --- Sounds ---
const sounds = {
    correct: null,
    wrong: null
};

// --- Complexity ---
const complexityCoef = computed(() => {
    let base = 1;
    if (settings.value.colored) base += 0.5;
    if (settings.value.rotated) base += 0.5;
    return base;
});

// --- SHAPES ---
// (Re-using shape functions from previous step, ensuring implementation is solid)
const drawCircle = (ctx, s) => { ctx.arc(0, 0, s / 2, 0, Math.PI * 2); };
const drawSquare = (ctx, s) => { ctx.rect(-s / 2, -s / 2, s, s); };
const drawTriangle = (ctx, s) => { ctx.moveTo(0, -s / 2); ctx.lineTo(s / 2, s / 2); ctx.lineTo(-s / 2, s / 2); ctx.closePath(); };
const drawStar = (ctx, s) => {
    const outer = s / 2; const inner = s / 4;
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * outer, -Math.sin((18 + i * 72) / 180 * Math.PI) * outer);
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * inner, -Math.sin((54 + i * 72) / 180 * Math.PI) * inner);
    }
    ctx.closePath();
};
const drawCross = (ctx, s) => { const w = s / 6; const l = s / 2; ctx.rect(-l, -w, s, w * 2); ctx.rect(-w, -l, w * 2, s); };
const drawDiamond = (ctx, s) => { ctx.moveTo(0, -s / 2); ctx.lineTo(s / 2, 0); ctx.lineTo(0, s / 2); ctx.lineTo(-s / 2, 0); ctx.closePath(); };
const drawPentagon = (ctx, s) => { for (let i = 0; i < 5; i++) { ctx.lineTo(s / 2 * Math.cos(i * 2 * Math.PI / 5 - Math.PI / 2), s / 2 * Math.sin(i * 2 * Math.PI / 5 - Math.PI / 2)); } ctx.closePath(); };
const drawHexagon = (ctx, s) => { for (let i = 0; i < 6; i++) { ctx.lineTo(s / 2 * Math.cos(i * 2 * Math.PI / 6), s / 2 * Math.sin(i * 2 * Math.PI / 6)); } ctx.closePath(); };
const drawRing = (ctx, s) => { ctx.arc(0, 0, s / 2, 0, Math.PI * 2); ctx.moveTo(s / 3, 0); ctx.arc(0, 0, s / 3, 0, Math.PI * 2, true); };
const drawHeart = (ctx, s) => {
    ctx.moveTo(0, s * 0.2);
    ctx.bezierCurveTo(0, -s * 0.2, -s * 0.5, -s * 0.2, -s * 0.5, s * 0.2);
    ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s * 0.8);
    ctx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.2);
    ctx.bezierCurveTo(s * 0.5, -s * 0.2, 0, -s * 0.2, 0, s * 0.2);
};
const drawArrow = (ctx, s) => { ctx.moveTo(-s / 2, 0); ctx.lineTo(s / 4, 0); ctx.lineTo(s / 4, -s / 4); ctx.lineTo(s / 2, 0); ctx.lineTo(s / 4, s / 4); ctx.lineTo(s / 4, 0); };
const drawPacman = (ctx, s) => { ctx.arc(0, 0, s / 2, 0.2 * Math.PI, 1.8 * Math.PI); ctx.lineTo(0, 0); ctx.closePath(); };
const drawCloud = (ctx, s) => { ctx.arc(-s / 4, 0, s / 4, 0, Math.PI * 2); ctx.arc(s / 4, 0, s / 4, 0, Math.PI * 2); ctx.arc(0, -s / 4, s / 3, 0, Math.PI * 2); };
const drawLightning = (ctx, s) => { ctx.moveTo(s / 10, -s / 2); ctx.lineTo(-s / 4, 0); ctx.lineTo(0, 0); ctx.lineTo(-s / 10, s / 2); ctx.lineTo(s / 4, 0); ctx.lineTo(0, 0); ctx.closePath(); };
const drawDrop = (ctx, s) => { ctx.arc(0, s / 4, s / 4, 0, Math.PI); ctx.lineTo(0, -s / 2); ctx.closePath(); };
const drawEye = (ctx, s) => { ctx.moveTo(-s / 2, 0); ctx.quadraticCurveTo(0, -s / 2, s / 2, 0); ctx.quadraticCurveTo(0, s / 2, -s / 2, 0); ctx.moveTo(0, 0); ctx.arc(0, 0, s / 6, 0, Math.PI * 2); };
const drawHourglass = (ctx, s) => { ctx.moveTo(-s / 4, -s / 2); ctx.lineTo(s / 4, -s / 2); ctx.lineTo(-s / 4, s / 2); ctx.lineTo(s / 4, s / 2); ctx.closePath(); };
const drawWave = (ctx, s) => { ctx.moveTo(-s / 2, 0); ctx.bezierCurveTo(-s / 4, -s / 2, 0, 0, s / 2, 0); ctx.rect(-s / 2, -s / 10, s, s / 5); };
const drawSpiral = (ctx, s) => { ctx.moveTo(0, 0); for (let i = 0; i < 30; i++) { const a = 0.5 * i; ctx.lineTo((1 + a) * Math.cos(a) * (s / 30), (1 + a) * Math.sin(a) * (s / 30)); } };
const drawBowtie = (ctx, s) => { ctx.moveTo(0, 0); ctx.lineTo(-s / 2, -s / 3); ctx.lineTo(-s / 2, s / 3); ctx.lineTo(0, 0); ctx.lineTo(s / 2, -s / 3); ctx.lineTo(s / 2, s / 3); ctx.closePath(); };
const drawFish = (ctx, s) => { ctx.moveTo(s / 3, 0); ctx.quadraticCurveTo(0, -s / 3, -s / 3, 0); ctx.quadraticCurveTo(0, s / 3, s / 3, 0); ctx.lineTo(s / 2, -s / 4); ctx.lineTo(s / 2, s / 4); ctx.lineTo(s / 3, 0); };
const drawTree = (ctx, s) => { ctx.moveTo(0, -s / 2); ctx.lineTo(s / 3, 0); ctx.lineTo(s / 6, 0); ctx.lineTo(s / 3, s / 3); ctx.lineTo(-s / 3, s / 3); ctx.lineTo(-s / 6, 0); ctx.lineTo(-s / 3, 0); ctx.closePath(); };
const drawSun = (ctx, s) => { ctx.arc(0, 0, s / 4, 0, Math.PI * 2); for (let i = 0; i < 8; i++) { ctx.moveTo(0, 0); ctx.lineTo(Math.cos(i * Math.PI / 4) * s / 2, Math.sin(i * Math.PI / 4) * s / 2); } };
const drawCrown = (ctx, s) => { ctx.moveTo(-s / 2, s / 4); ctx.lineTo(-s / 2, -s / 4); ctx.lineTo(-s / 6, 0); ctx.lineTo(0, -s / 2); ctx.lineTo(s / 6, 0); ctx.lineTo(s / 2, -s / 4); ctx.lineTo(s / 2, s / 4); ctx.closePath(); };
const drawAnchor = (ctx, s) => { ctx.moveTo(0, -s / 3); ctx.lineTo(0, s / 3); ctx.moveTo(-s / 3, 0); ctx.quadraticCurveTo(0, s / 2, s / 3, 0); ctx.moveTo(-s / 4, -s / 4); ctx.lineTo(s / 4, -s / 4); ctx.arc(0, -s / 3, s / 8, 0, Math.PI * 2); };
const drawNote = (ctx, s) => { ctx.ellipse(s / 4, s / 4, s / 6, s / 8, -0.5, 0, Math.PI * 2); ctx.moveTo(s / 4 + s / 8, s / 4); ctx.lineTo(s / 4 + s / 8, -s / 4); ctx.lineTo(s / 4 + s / 8 + s / 4, -s / 4 + s / 8); };
const drawEnvelope = (ctx, s) => { ctx.rect(-s / 2, -s / 3, s, s / 0.75); ctx.moveTo(-s / 2, -s / 3); ctx.lineTo(0, 0); ctx.lineTo(s / 2, -s / 3); };

const SHAPES = [
    { id: 1, name: 'Круг', draw: drawCircle },
    { id: 2, name: 'Квадрат', draw: drawSquare },
    { id: 3, name: 'Треугольник', draw: drawTriangle },
    { id: 4, name: 'Звезда', draw: drawStar },
    { id: 5, name: 'Крест', draw: drawCross },
    { id: 6, name: 'Ромб', draw: drawDiamond },
    { id: 7, name: 'Пентагон', draw: drawPentagon },
    { id: 8, name: 'Гексагон', draw: drawHexagon },
    { id: 9, name: 'Кольцо', draw: drawRing },
    { id: 10, name: 'Сердце', draw: drawHeart },
    { id: 11, name: 'Стрелка', draw: drawArrow },
    { id: 12, name: 'Пакман', draw: drawPacman },
    { id: 13, name: 'Облако', draw: drawCloud },
    { id: 14, name: 'Молния', draw: drawLightning },
    { id: 15, name: 'Капля', draw: drawDrop },
    { id: 16, name: 'Глаз', draw: drawEye },
    { id: 17, name: 'Песочные часы', draw: drawHourglass },
    { id: 18, name: 'Волна', draw: drawWave },
    { id: 19, name: 'Спираль', draw: drawSpiral },
    { id: 20, name: 'Бант', draw: drawBowtie },
    { id: 21, name: 'Рыба', draw: drawFish },
    { id: 22, name: 'Дерево', draw: drawTree },
    { id: 23, name: 'Солнце', draw: drawSun },
    { id: 24, name: 'Корона', draw: drawCrown },
    { id: 25, name: 'Якорь', draw: drawAnchor },
    { id: 26, name: 'Нота', draw: drawNote },
    { id: 27, name: 'Конверт', draw: drawEnvelope }
];

const COLORS = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#F472B6']; // Removed dark #1F2937

// --- LOGIC ---

const startGame = () => {
    score.value = 0;
    animatedScore.value = 0;
    level.value = 1;
    maxLevel.value = 1;
    gameState.value = 'playing';

    if (settings.value.mode === 'timer') {
        timeLeft.value = 30;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft.value -= 0.1;
            if (timeLeft.value <= 0) {
                timeLeft.value = 0;
                endGame();
            }
        }, 100);
    }

    // Init Sounds
    if (!sounds.correct) {
        sounds.correct = new Howl({ src: ['/sounds/selection-correct.mp3'], volume: 0.4 });
        sounds.wrong = new Howl({ src: ['/sounds/selection-wrong.mp3'], volume: 0.3 });
    }

    nextTick(() => {
        initCanvases();
        generateLevel();
        consecutiveErrors.value = 0;
        hintActive.value = false;
    });
};

const endGame = () => {
    if (timerInterval) clearInterval(timerInterval);
    gameState.value = 'finished';
    saveResults();
};

const initCanvases = () => {
    if (!canvasLeft.value || !canvasRight.value) return;

    // Check dark mode
    updateDarkMode();

    // Handle resizing
    if (resizeObserver) resizeObserver.disconnect();
    resizeObserver = new ResizeObserver(() => {
        setupCanvas(canvasLeft.value);
        setupCanvas(canvasRight.value);
        drawGrid(ctxLeft, currentShapesLeft);
        drawGrid(ctxRight, currentShapesRight);
    });
    resizeObserver.observe(canvasLeft.value.parentElement);

    setupCanvas(canvasLeft.value);
    setupCanvas(canvasRight.value);
    ctxLeft = canvasLeft.value.getContext('2d');
    ctxRight = canvasRight.value.getContext('2d');
};

const setupCanvas = (canvas) => {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
};

// --- CORE GENERATOR: GUARANTEED MATCH LOGIC ---
const generateLevel = () => {
    if (gameState.value !== 'playing') return;

    // Grid size logic
    const growth = Math.floor(level.value / 2);
    let numItems = 3 + growth;
    if (numItems > 30) numItems = 30; // Reasonable cap

    // 1. Pick Target
    const allShapeIds = SHAPES.map(s => s.id);
    const targetId = allShapeIds[Math.floor(Math.random() * allShapeIds.length)];
    const targetColor = settings.value.colored ? COLORS[Math.floor(Math.random() * COLORS.length)] : (isDark.value ? '#FFFFFF' : '#1F2937');

    // 2. Prepare Pool (excluding target)
    const pool = allShapeIds.filter(id => id !== targetId);
    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // 3. Simplified Disjoint Strategy
    // Just grab pool items sequentially. No complex logic needed.
    // Ensure we don't run out of items.
    // Half the pool for left, Half for right.
    const splitIndex = Math.floor(pool.length / 2);
    const leftPool = pool.slice(0, splitIndex);
    const rightPool = pool.slice(splitIndex);

    // If we need more items than available in split, we reuse within the side.
    const getSafeDistractors = (sourcePool, count) => {
        const res = [];
        for (let i = 0; i < count; i++) {
            const id = sourcePool[i % sourcePool.length];
            res.push({
                id: id,
                color: settings.value.colored ? COLORS[Math.floor(Math.random() * COLORS.length)] : (isDark.value ? '#FFFFFF' : '#1F2937'),
                rotation: settings.value.rotated ? Math.random() * 6.28 : 0
            });
        }
        return res;
    };

    const leftDistractors = getSafeDistractors(leftPool, numItems - 1);
    const rightDistractors = getSafeDistractors(rightPool, numItems - 1);

    // 4. Construct Grids
    // Add Target (can have different rotation if enabled)
    const targetLeft = {
        id: targetId,
        color: targetColor,
        rotation: settings.value.rotated ? Math.random() * 6.28 : 0,
        isTarget: true
    };
    const targetRight = {
        id: targetId,
        color: targetColor,
        rotation: settings.value.rotated ? Math.random() * 6.28 : 0,
        isTarget: true
    };

    const finalLeft = [targetLeft, ...leftDistractors].sort(() => Math.random() - 0.5);
    const finalRight = [targetRight, ...rightDistractors].sort(() => Math.random() - 0.5);

    targetShapeId = targetId;
    targetName.value = SHAPES.find(s => s.id === targetId)?.name || 'Unknown';
    console.log(`[DoubleGame] Level ${level.value}. Target: ${targetName.value} (ID: ${targetId}).`);

    // Layout & Draw
    currentShapesLeft = layoutGrid(finalLeft);
    currentShapesRight = layoutGrid(finalRight);

    // Self-Healing Check
    const leftValid = drawGrid(ctxLeft, currentShapesLeft);
    const rightValid = drawGrid(ctxRight, currentShapesRight);

    if (!leftValid || !rightValid) {
        console.warn('Self-Healing: Regenerating due to missing target');
        setTimeout(() => {
            generateLevel();
        }, 50);
    }
};

const layoutGrid = (items) => {
    const n = items.length;
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    return items.map((item, index) => ({
        ...item,
        gridX: index % cols,
        gridY: Math.floor(index / cols),
        rows, cols
    }));
};

const drawGrid = (ctx, items) => {
    if (!ctx) return;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (items.length === 0) return false;

    let targetDrawn = false;

    // Fix: Ensure color is correct for light/dark mode if not colored
    const defaultColor = isDark.value ? '#FFFFFF' : '#1F2937';

    const cols = items[0].cols;
    const rows = items[0].rows;
    const cellW = w / cols;
    const cellH = h / rows;
    const size = Math.min(cellW, cellH) * 0.6;
    const hitboxSize = Math.min(cellW, cellH) * 0.9; // Increased hitbox size for easier clicking

    items.forEach(item => {
        const cx = item.gridX * cellW + cellW / 2;
        const cy = item.gridY * cellH + cellH / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(item.rotation);

        ctx.beginPath();
        const drawColor = settings.value.colored ? item.color : defaultColor;
        ctx.strokeStyle = drawColor;
        ctx.fillStyle = drawColor;
        ctx.lineWidth = 3;

        const shapeDef = SHAPES.find(s => s.id === item.id);
        if (shapeDef) {
            try {
                // HINT LOGIC: Fade out non-targets if hint is active
                if (hintActive.value && !item.isTarget) {
                    ctx.globalAlpha = 0.1;
                } else {
                    ctx.globalAlpha = 1.0;
                }

                // Hint Effect Highlight
                if (item.isTarget && hintActive.value) {
                    ctx.save();
                    // Force bright glow for visibility, ignore item color for shadow
                    ctx.shadowColor = '#FCD34D';
                    ctx.shadowBlur = 40; // even stronger
                    ctx.globalAlpha = 1.0; // Ensure target is fully opaque
                    shapeDef.draw(ctx, size);
                    ctx.stroke();
                    ctx.restore();
                }

                shapeDef.draw(ctx, size);
                ctx.stroke();

                if (item.isTarget) targetDrawn = true;

                if (settings.value.colored) {
                    // If hint active, force full opacity for target, low for others
                    ctx.globalAlpha = (hintActive.value && !item.isTarget) ? 0.05 : 0.2;
                    if (hintActive.value && item.isTarget) ctx.globalAlpha = 0.4; // Brighter fill for target in hint mode
                    ctx.fill();
                }
            } catch (err) {
                console.error("Error drawing shape", item.id, err);
            } finally {
                ctx.globalAlpha = 1.0; // Reset alpha
            }
        }
        ctx.restore();
        item.hitbox = { x: cx - hitboxSize / 2, y: cy - hitboxSize / 2, w: hitboxSize, h: hitboxSize };
    });

    return targetDrawn;
};

const updateDarkMode = () => {
    if (import.meta.client) {
        isDark.value = document.documentElement.classList.contains('dark');
    }
};

onMounted(() => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateDarkMode();
                // Redraw if playing
                if (gameState.value === 'playing') {
                    drawGrid(ctxLeft, currentShapesLeft);
                    drawGrid(ctxRight, currentShapesRight);
                }
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
    updateDarkMode();

    // Check Auth
    const { $auth } = useNuxtApp();
    import('firebase/auth').then(({ onAuthStateChanged }) => {
        onAuthStateChanged($auth, (user) => {
            isLoggedIn.value = !!user;
        });
    });
});

const handleCanvasClick = (event, side) => {
    if (gameState.value !== 'playing' || feedback.value) return;

    const canvas = side === 'left' ? canvasLeft.value : canvasRight.value;
    const items = side === 'left' ? currentShapesLeft : currentShapesRight;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    const clickedItem = items.find(item => {
        const h = item.hitbox;
        return x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h;
    });

    if (clickedItem) {
        if (clickedItem.id === targetShapeId) {
            handleCorrect();
        } else {
            handleWrong();
        }
    }
};

const handleCorrect = () => {
    const gain = Math.floor(10 * complexityCoef.value * level.value);
    score.value += gain;
    level.value++;
    if (level.value > maxLevel.value) maxLevel.value = level.value;
    feedback.value = 'correct';
    if (settings.value.sound && sounds.correct) sounds.correct.play();
    animateValue(animatedScore, score.value, 500);

    setTimeout(() => {
        feedback.value = null;
        consecutiveErrors.value = 0;
        hintActive.value = false;
        generateLevel();
    }, 500);
};

const handleWrong = () => {
    const penalty = Math.floor((10 * complexityCoef.value * level.value) / 2);
    score.value = Math.max(0, score.value - penalty);
    // In endless mode, level down. In timer mode, maybe just penalty? 
    // Let's keep logic same for now.
    if (level.value > 1) level.value--;

    feedback.value = 'wrong';
    if (settings.value.sound && sounds.wrong) sounds.wrong.play();
    animateValue(animatedScore, score.value, 500);

    setTimeout(() => {
        feedback.value = null;
        consecutiveErrors.value++;
        if (consecutiveErrors.value >= 3) {
            hintActive.value = true;
            // Redraw to show hint
            drawGrid(ctxLeft, currentShapesLeft);
            drawGrid(ctxRight, currentShapesRight);
        }
    }, 500);
};

const skipLevel = () => {
    if (gameState.value !== 'playing') return;

    // Small penalty or no penalty? Let's just reset errors and regen.
    consecutiveErrors.value = 0;
    hintActive.value = false;
    generateLevel();
};

const animateValue = (refVal, end, duration) => {
    const start = refVal.value;
    const range = end - start;
    const startTime = performance.now();
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        refVal.value = Math.floor(start + range * progress);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
};

const saveResults = async () => {
    if (!isLoggedIn.value) return;

    try {
        const { $firestore, $auth } = useNuxtApp();
        const user = $auth.currentUser;
        if (!user) return;
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection($firestore, `users/${user.uid}/doubleGameResults`), {
            score: score.value,
            maxLevel: maxLevel.value,
            settings: settings.value,
            timestamp: serverTimestamp(),
            appName: 'Double'
        });
    } catch (e) {
        console.error('Error saving:', e);
    }
};

onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
    if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-scale-in {
    animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.5);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
