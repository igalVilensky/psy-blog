<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 font-sans transition-colors duration-500">
        <div class="max-w-4xl mx-auto">

            <!-- Start Screen -->
            <div v-if="gameState === 'start'" class="text-center space-y-8 animate-fade-in-up">
                <div class="space-y-4">
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white mb-4 shadow-lg shadow-pink-500/30">
                        <i class="fas fa-bullseye text-3xl"></i>
                    </div>
                    <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Target Tracking
                    </h1>
                    <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Тренировка фокуса внимания и точности реакции. Следите за движущимся объектом и попадайте в
                        цель!
                    </p>
                </div>

                <div
                    class="bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-sm text-left max-w-2xl mx-auto">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Как играть:</h3>
                    <ul class="space-y-3 mb-8 text-slate-700 dark:text-slate-300">
                        <li class="flex items-start gap-3">
                            <i class="fas fa-check-circle text-pink-500 mt-1"></i>
                            <span>Мяч будет двигаться по экрану в различных направлениях.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-check-circle text-pink-500 mt-1"></i>
                            <span>Кликните или коснитесь мяча, чтобы попасть в цель.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-check-circle text-pink-500 mt-1"></i>
                            <span>Чем быстрее ваша реакция, тем выше балл.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <i class="fas fa-check-circle text-pink-500 mt-1"></i>
                            <span>Старайтесь попасть в как можно больше целей!</span>
                        </li>
                    </ul>

                    <div class="grid sm:grid-cols-1 gap-4 mt-8">
                        <button v-for="level in difficulties" :key="level.id" @click="startGame(level.id)"
                            class="group relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-pink-500 dark:hover:border-pink-500 transition-all text-left">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div :class="['font-bold text-lg mb-1', level.color]">{{ level.label }}</div>
                                    <div class="text-sm text-slate-600 dark:text-slate-400">{{ level.sub }}</div>
                                </div>
                                <i
                                    class="fas fa-arrow-right text-slate-300 group-hover:text-pink-500 transition-colors"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Game Running State -->
            <div v-else-if="gameState === 'running'" class="relative">
                <!-- Stats Header -->
                <div class="mb-6 flex justify-between items-center text-slate-600 dark:text-slate-400 font-medium">
                    <span>Цель {{ currentTarget + 1 }} из {{ totalTargets }}</span>
                    <div class="flex gap-6">
                        <span class="text-pink-600 dark:text-pink-400">Попадания: {{ hits }}</span>
                        <span class="text-red-500">Промахи: {{ misses }}</span>
                    </div>
                </div>

                <!-- Game Area -->
                <div ref="gameArea" @click="handleClick" @touchstart.prevent="handleTouch"
                    class="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden cursor-crosshair"
                    :style="{ height: gameAreaHeight + 'px' }">
                    <!-- Moving Target -->
                    <div v-if="targetVisible"
                        class="absolute rounded-full shadow-lg transition-all duration-100 cursor-pointer" :class="[
                            feedback === 'hit' ? 'animate-hit' : '',
                            feedback === 'miss' ? 'animate-miss' : ''
                        ]" :style="{
                left: targetPosition.x + 'px',
                top: targetPosition.y + 'px',
                width: targetSize + 'px',
                height: targetSize + 'px',
                background: 'radial-gradient(circle at 30% 30%, #ec4899, #be185d)',
                transform: `translate(-50%, -50%) scale(${feedback === 'hit' ? 0 : 1})`
            }">
                        <div class="absolute inset-0 rounded-full bg-white/30 blur-sm"></div>
                    </div>

                    <!-- Feedback Messages -->
                    <div v-if="feedback"
                        class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div v-if="feedback === 'hit'" class="text-6xl animate-scale-in">
                            <i class="fas fa-check-circle text-emerald-500 drop-shadow-lg"></i>
                        </div>
                        <div v-if="feedback === 'miss'" class="text-6xl animate-shake">
                            <i class="fas fa-times-circle text-red-500 drop-shadow-lg"></i>
                        </div>
                    </div>

                    <!-- Click effect -->
                    <div v-for="effect in clickEffects" :key="effect.id"
                        class="absolute pointer-events-none animate-click-effect" :style="{
                            left: effect.x + 'px',
                            top: effect.y + 'px'
                        }">
                        <div class="w-8 h-8 rounded-full border-4 border-pink-500/50 -translate-x-1/2 -translate-y-1/2">
                        </div>
                    </div>
                </div>

                <!-- Instructions -->
                <div class="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                    <i class="fas fa-mouse-pointer mr-2"></i>
                    Кликните по движущемуся мячу
                </div>
            </div>

            <!-- Results State -->
            <div v-else-if="gameState === 'finished'" class="text-center space-y-8 animate-fade-in-up">
                <div
                    class="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-2xl max-w-xl mx-auto">
                    <div
                        class="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30">
                        <i class="fas fa-trophy text-4xl text-white"></i>
                    </div>

                    <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Результат</h2>
                    <div class="text-5xl font-black text-pink-600 dark:text-pink-400 mb-6">
                        {{ accuracy }}%
                    </div>

                    <p class="text-slate-600 dark:text-slate-400 mb-8">
                        Вы попали в {{ hits }} из {{ totalTargets }} целей.
                    </p>

                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
                            <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Попадания</div>
                            <div class="text-3xl font-black text-emerald-600 dark:text-emerald-400">{{ hits }}</div>
                        </div>
                        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
                            <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Промахи</div>
                            <div class="text-3xl font-black text-red-500">{{ misses }}</div>
                        </div>
                        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 col-span-2">
                            <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Среднее время реакции</div>
                            <div class="text-3xl font-black text-slate-900 dark:text-white">{{ avgReactionTime }}мс
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button @click="gameState = 'start'"
                            class="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                            Меню
                        </button>
                        <button @click="startGame()"
                            class="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold hover:shadow-lg hover:shadow-pink-500/25 transition transform hover:-translate-y-1">
                            Повторить
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

definePageMeta({
    layout: "laboratory",
});

// GAME CONFIG
const LEVELS = {
    easy: { targets: 20, speed: 1.5, size: 60 },
    medium: { targets: 30, speed: 2.5, size: 45 },
    hard: { targets: 40, speed: 3.5, size: 35 }
};

const difficulties = [
    { id: 'easy', label: 'Легкий уровень', sub: 'Медленное движение, большая цель', color: 'text-emerald-500' },
    { id: 'medium', label: 'Средний уровень', sub: 'Умеренная скорость, средняя цель', color: 'text-yellow-500' },
    { id: 'hard', label: 'Сложный уровень', sub: 'Быстрое движение, маленькая цель', color: 'text-red-500' }
];

const gameState = ref('start');
const currentTarget = ref(0);
const totalTargets = ref(20);
const hits = ref(0);
const misses = ref(0);
const feedback = ref(null);
const targetVisible = ref(false);
const selectedDifficulty = ref('easy');
const rawData = ref([]);

const gameArea = ref(null);
const gameAreaHeight = ref(500);
const targetPosition = ref({ x: 0, y: 0 });
const targetSize = ref(60);
const targetVelocity = ref({ x: 0, y: 0 });
const animationFrameId = ref(null);
const targetStartTime = ref(0);
const clickEffects = ref([]);

const startGame = (difficulty = 'easy') => {
    selectedDifficulty.value = difficulty;
    hits.value = 0;
    misses.value = 0;
    currentTarget.value = 0;
    totalTargets.value = LEVELS[difficulty].targets;
    targetSize.value = LEVELS[difficulty].size;
    gameState.value = 'running';
    feedback.value = null;
    rawData.value = [];
    clickEffects.value = [];

    // Start first target after a brief delay
    setTimeout(() => {
        spawnTarget();
    }, 500);
};

const spawnTarget = () => {
    if (!gameArea.value) return;

    const rect = gameArea.value.getBoundingClientRect();
    const padding = targetSize.value;

    // Random starting position
    targetPosition.value = {
        x: padding + Math.random() * (rect.width - padding * 2),
        y: padding + Math.random() * (rect.height - padding * 2)
    };

    // Random velocity
    const speed = LEVELS[selectedDifficulty.value].speed;
    const angle = Math.random() * Math.PI * 2;
    targetVelocity.value = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    };

    targetVisible.value = true;
    targetStartTime.value = performance.now();

    // Start animation loop
    animateTarget();
};

const animateTarget = () => {
    if (!gameArea.value || !targetVisible.value) return;

    const rect = gameArea.value.getBoundingClientRect();
    const padding = targetSize.value / 2;

    // Update position
    targetPosition.value.x += targetVelocity.value.x;
    targetPosition.value.y += targetVelocity.value.y;

    // Bounce off walls
    if (targetPosition.value.x <= padding || targetPosition.value.x >= rect.width - padding) {
        targetVelocity.value.x *= -1;
        targetPosition.value.x = Math.max(padding, Math.min(rect.width - padding, targetPosition.value.x));
    }
    if (targetPosition.value.y <= padding || targetPosition.value.y >= rect.height - padding) {
        targetVelocity.value.y *= -1;
        targetPosition.value.y = Math.max(padding, Math.min(rect.height - padding, targetPosition.value.y));
    }

    animationFrameId.value = requestAnimationFrame(animateTarget);
};

const handleClick = (event) => {
    if (!targetVisible.value || feedback.value) return;

    const rect = gameArea.value.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    checkHit(clickX, clickY);
};

const handleTouch = (event) => {
    if (!targetVisible.value || feedback.value) return;

    const rect = gameArea.value.getBoundingClientRect();
    const touch = event.touches[0];
    const clickX = touch.clientX - rect.left;
    const clickY = touch.clientY - rect.top;

    checkHit(clickX, clickY);
};

const checkHit = (clickX, clickY) => {
    // Add click effect
    const effectId = Date.now() + Math.random();
    clickEffects.value.push({ id: effectId, x: clickX, y: clickY });
    setTimeout(() => {
        clickEffects.value = clickEffects.value.filter(e => e.id !== effectId);
    }, 500);

    const distance = Math.sqrt(
        Math.pow(clickX - targetPosition.value.x, 2) +
        Math.pow(clickY - targetPosition.value.y, 2)
    );

    const reactionTime = performance.now() - targetStartTime.value;
    const isHit = distance <= targetSize.value / 2;

    if (isHit) {
        hits.value++;
        feedback.value = 'hit';
    } else {
        misses.value++;
        feedback.value = 'miss';
    }

    // Record data
    rawData.value.push({
        targetNumber: currentTarget.value + 1,
        targetPosition: { ...targetPosition.value },
        clickPosition: { x: clickX, y: clickY },
        hit: isHit,
        reactionTime: Math.round(reactionTime),
        timestamp: Date.now()
    });

    // Stop animation
    if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
    }
    targetVisible.value = false;

    // Next target or finish
    setTimeout(() => {
        feedback.value = null;
        currentTarget.value++;

        if (currentTarget.value < totalTargets.value) {
            spawnTarget();
        } else {
            finishGame();
        }
    }, 800);
};

const finishGame = async () => {
    gameState.value = 'finished';
    await saveResults();
};

const saveResults = async () => {
    try {
        const { $firestore, $auth } = useNuxtApp();
        const user = $auth.currentUser;

        if (!user) {
            console.error('User not authenticated - cannot save results');
            return;
        }

        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

        const difficultyMap = { 'easy': 1, 'medium': 3, 'hard': 5 };

        // Calculate average reaction time (only for hits)
        const hitData = rawData.value.filter(d => d.hit);
        const avgRT = hitData.length > 0
            ? Math.round(hitData.reduce((acc, curr) => acc + curr.reactionTime, 0) / hitData.length)
            : 0;

        const sessionData = {
            sessionId: `tt-${Date.now()}`,
            createdAt: serverTimestamp(),
            totalTargets: totalTargets.value,
            hits: hits.value,
            misses: misses.value,
            accuracy: accuracy.value,
            avgReactionTime: avgRT,
            difficultyLevel: difficultyMap[selectedDifficulty.value] || 1,
            rawData: rawData.value
        };

        const docRef = await addDoc(collection($firestore, `users/${user.uid}/targetTrackingResults`), sessionData);
        console.log('Results saved successfully to', docRef.path);
    } catch (e) {
        console.error('Error saving results:', e);
    }
};

const accuracy = computed(() => {
    if (totalTargets.value === 0) return 0;
    return Math.round((hits.value / totalTargets.value) * 100);
});

const avgReactionTime = computed(() => {
    const hitData = rawData.value.filter(d => d.hit);
    if (hitData.length === 0) return 0;
    return Math.round(hitData.reduce((acc, curr) => acc + curr.reactionTime, 0) / hitData.length);
});

onMounted(() => {
    // Set game area height based on viewport
    const updateHeight = () => {
        gameAreaHeight.value = Math.min(600, window.innerHeight * 0.6);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
});

onUnmounted(() => {
    if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
    }
});

</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-hit {
    animation: hitEffect 0.4s ease-out forwards;
}

@keyframes hitEffect {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    50% {
        transform: translate(-50%, -50%) scale(1.3);
        opacity: 0.8;
    }

    100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
}

.animate-miss {
    animation: missEffect 0.3s ease-out;
}

@keyframes missEffect {

    0%,
    100% {
        transform: translate(-50%, -50%) scale(1);
    }

    25% {
        transform: translate(-50%, -50%) scale(0.9);
    }

    75% {
        transform: translate(-50%, -50%) scale(1.1);
    }
}

.animate-scale-in {
    animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleIn {
    from {
        transform: scale(0);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-shake {
    animation: shake 0.3s ease-in-out;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-10px);
    }

    75% {
        transform: translateX(10px);
    }
}

.animate-click-effect {
    animation: clickEffect 0.5s ease-out forwards;
}

@keyframes clickEffect {
    from {
        transform: scale(0);
        opacity: 1;
    }

    to {
        transform: scale(3);
        opacity: 0;
    }
}
</style>

