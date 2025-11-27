<template>
    <div class="min-h-screen relative overflow-hidden p-4 sm:p-8">
        <div class="max-w-6xl mx-auto relative z-10 mt-4">
            <!-- Header -->
            <Breadcrumbs />
            <header class="mb-4 sm:mb-12 text-center">
                <h1
                    class="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 mb-4 font-montserrat">
                    Глубокий Разговор
                </h1>
                <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                    Инструмент для самопознания и поиска внутренних ответов. Выберите карту и позвольте ей направить
                    ваши мысли.
                </p>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <!-- Card Interaction Area -->
                <div class="flex flex-col items-center">
                    <!-- Controls -->
                    <div class="mb-8 flex space-x-4">
                        <button @click="shuffleCards"
                            class="group relative px-6 py-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border border-slate-200 dark:border-slate-700">
                            <div
                                class="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                            </div>
                            <span class="flex items-center space-x-2 text-slate-700 dark:text-slate-200 font-medium">
                                <i
                                    class="fas fa-random text-cyan-500 group-hover:rotate-180 transition-transform duration-500"></i>
                                <span>Перемешать колоду</span>
                            </span>
                        </button>
                    </div>

                    <!-- Card Stack -->
                    <div class="relative w-full max-w-sm h-[500px] perspective-1000">
                        <TransitionGroup name="card-stack">
                            <div v-for="(card, index) in visibleCards" :key="card.id"
                                class="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out cursor-pointer"
                                :style="{
                                    zIndex: visibleCards.length - index,
                                    transform: `translateY(${index * 8}px) scale(${1 - index * 0.05})`,
                                    opacity: 1 - index * 0.1
                                }" @click="handleCardClick(card.id)">
                                <!-- Card Container -->
                                <div class="relative w-full h-full transform-style-3d transition-transform duration-700"
                                    :class="{ 'rotate-y-180': card.id === activeCard?.id && isFlipped }">
                                    <!-- Front Face -->
                                    <div
                                        class="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                        <!-- Card Pattern/Design -->
                                        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
                                        </div>
                                        <div
                                            class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                            <div
                                                class="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-cyan-100 to-purple-100 dark:from-cyan-900/30 dark:to-purple-900/30 flex items-center justify-center">
                                                <i
                                                    class="fas fa-fingerprint text-4xl text-cyan-600 dark:text-cyan-400 opacity-80"></i>
                                            </div>
                                            <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Карта
                                                #{{ card.id }}</h3>
                                            <p class="text-slate-500 dark:text-slate-400">Нажмите, чтобы открыть</p>
                                        </div>
                                        <!-- Decorative borders -->
                                        <div
                                            class="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg">
                                        </div>
                                        <div
                                            class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500/30 rounded-tr-lg">
                                        </div>
                                        <div
                                            class="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-500/30 rounded-bl-lg">
                                        </div>
                                        <div
                                            class="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg">
                                        </div>
                                    </div>

                                    <!-- Back Face -->
                                    <div
                                        class="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                                        <div class="h-full overflow-y-auto custom-scrollbar p-6 relative">
                                            <div
                                                class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none">
                                            </div>

                                            <div class="relative z-10">
                                                <div class="flex items-center justify-between mb-6">
                                                    <span
                                                        class="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
                                                        Тема
                                                    </span>
                                                    <i class="fas fa-star text-amber-400 text-sm"></i>
                                                </div>

                                                <h2
                                                    class="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                                                    {{ card.title }}
                                                </h2>

                                                <div
                                                    class="w-full h-48 rounded-xl overflow-hidden mb-6 shadow-md relative group">
                                                    <img :src="card.image" :alt="card.title"
                                                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                                                    <div
                                                        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60">
                                                    </div>
                                                </div>

                                                <div class="space-y-6">
                                                    <div>
                                                        <h4
                                                            class="flex items-center space-x-2 text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3 uppercase tracking-wide">
                                                            <i class="fas fa-lightbulb"></i>
                                                            <span>Вопросы для размышления</span>
                                                        </h4>
                                                        <ul class="space-y-3">
                                                            <li v-for="(question, qIndex) in card.questions"
                                                                :key="qIndex"
                                                                class="flex items-start space-x-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                                                <span
                                                                    class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">
                                                                    {{ qIndex + 1 }}
                                                                </span>
                                                                <span class="text-sm leading-relaxed">{{ question
                                                                }}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>

                <!-- Reflection Area -->
                <div class="mt-12 lg:mt-0">
                    <div
                        class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden">
                        <div
                            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none">
                        </div>

                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                            <i class="fas fa-pen-fancy text-cyan-500 mr-3"></i>
                            Ваши инсайты
                        </h3>

                        <div v-if="!activeCard || !isFlipped"
                            class="text-center py-12 text-slate-500 dark:text-slate-400">
                            <i class="fas fa-wind text-4xl mb-4 opacity-50"></i>
                            <p>Выберите карту, чтобы начать размышление</p>
                        </div>

                        <div v-else class="space-y-6 animate-fade-in">
                            <div
                                class="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-800/30">
                                <p class="text-sm text-cyan-800 dark:text-cyan-200 font-medium mb-2">Текущий вопрос:</p>
                                <p class="text-lg text-slate-800 dark:text-slate-200 italic">"{{ activeCard.questions[0]
                                }}"</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Запишите свои мысли
                                </label>
                                <textarea v-model="reflectionText" rows="6"
                                    class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
                                    placeholder="Что приходит вам в голову? Не оценивайте, просто пишите..."></textarea>
                            </div>

                            <div class="flex justify-end">
                                <button @click="saveReflection" :disabled="isSaving"
                                    class="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span v-if="isSaving" class="flex items-center">
                                        <i class="fas fa-spinner fa-spin mr-2"></i> Сохранение...
                                    </span>
                                    <span v-else>Сохранить мысль</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType"
        @close="hideNotification" class="z-50" />

    <!-- Login Modal -->
    <BaseModal :is-open="showLoginModal" @close="showLoginModal = false">
        <template #header>
            <div class="text-center">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Требуется авторизация</h3>
            </div>
        </template>
        <template #content>
            <div class="text-center">
                <div class="mb-6 flex justify-center">
                    <div class="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-user-lock text-2xl text-cyan-600"></i>
                    </div>
                </div>
                <p class="text-slate-600 mb-6">
                    Чтобы сохранить свои инсайты и отслеживать прогресс, необходимо войти в аккаунт или
                    зарегистрироваться.
                </p>
                <div class="flex flex-col space-y-3">
                    <button @click="redirectToLogin"
                        class="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                        Войти / Регистрация
                    </button>
                    <button @click="showLoginModal = false"
                        class="w-full py-3 text-slate-500 hover:text-slate-700 font-medium transition-colors">
                        Продолжить без сохранения
                    </button>
                </div>
            </div>
        </template>
        <template #footer>
            <!-- Custom footer implemented in content for better layout -->
            <div class="hidden"></div>
        </template>
    </BaseModal>
    <!-- Insight Journal Section -->
    <div class="max-w-6xl mx-auto relative z-10 my-12 sm:my-0 px-4 sm:mb-12">
        <div class="flex items-center justify-center gap-3 mb-12">
            <div class="h-1 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
            <h2 class="text-3xl font-bold text-slate-800 dark:text-white text-center font-montserrat">
                Ваш Журнал Инсайтов
            </h2>
            <div class="h-1 w-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
        </div>

        <div v-if="!auth.user"
            class="text-center py-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800">
            <i class="fas fa-lock text-4xl text-slate-400 mb-4"></i>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-6">Войдите, чтобы видеть историю своих инсайтов</p>
            <button @click="redirectToLogin"
                class="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                Войти
            </button>
        </div>

        <div v-else>
            <!-- Analytics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                    class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i class="fas fa-book-open text-6xl text-cyan-500"></i>
                    </div>
                    <div class="relative z-10">
                        <p class="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                            Всего записей</p>
                        <h3 class="text-4xl font-bold text-slate-900 dark:text-white">{{ totalReflections }}</h3>
                    </div>
                </div>

                <div
                    class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i class="fas fa-calendar-alt text-6xl text-purple-500"></i>
                    </div>
                    <div class="relative z-10">
                        <p class="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                            Последняя запись</p>
                        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-2">{{ lastReflectionDate }}</h3>
                    </div>
                </div>

                <div
                    class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-pink-500/20 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i class="fas fa-heart text-6xl text-pink-500"></i>
                    </div>
                    <div class="relative z-10">
                        <p class="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                            Любимая тема</p>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-2 truncate">{{ topTheme }}</h3>
                    </div>
                </div>
            </div>

            <!-- History List -->
            <div class="space-y-6">
                <div v-if="loadingReflections" class="text-center py-12">
                    <i class="fas fa-spinner fa-spin text-3xl text-cyan-500"></i>
                    <p class="mt-4 text-slate-500">Загрузка истории...</p>
                </div>

                <div v-else-if="reflections.length === 0"
                    class="text-center py-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800">
                    <i class="fas fa-pen-alt text-4xl text-slate-300 mb-4"></i>
                    <p class="text-lg text-slate-600 dark:text-slate-400">У вас пока нет сохраненных инсайтов. Начните с
                        первой карты!</p>
                </div>

                <div v-else class="grid grid-cols-1 gap-6">
                    <div v-for="entry in reflections" :key="entry.id"
                        class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500">
                        </div>

                        <div class="flex flex-col md:flex-row md:items-start gap-6">
                            <div class="flex-shrink-0">
                                <div
                                    class="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
                                    🔮
                                </div>
                            </div>

                            <div class="flex-grow">
                                <div class="flex flex-wrap items-center gap-3 mb-2">
                                    <span
                                        class="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-1 rounded-md">
                                        {{ entry.cardTitle }}
                                    </span>
                                    <span class="text-xs text-slate-400">
                                        {{ new Date(entry.timestamp).toLocaleDateString() }}
                                    </span>
                                </div>

                                <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                    {{ entry.question }}
                                </h4>

                                <div class="prose dark:prose-invert max-w-none">
                                    <p class="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{{
                                        entry.reflection }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, watch, computed } from 'vue';
import { useAuthStore } from "~/stores/auth";
import { getFirestore } from "firebase/firestore";
import { saveReflectionEntry, getUserReflections } from "~/api/firebase/deepConversation";
import { useNotification } from "~/composables/useNotification";
import BaseModal from "~/components/base/BaseModal.vue";
import Notification from "~/components/base/Notification.vue";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
    layout: 'laboratory'
});

const auth = useAuthStore();
const db = getFirestore();

// Notification
const { notificationMessage, notificationType, notificationVisible, showNotification, hideNotification } = useNotification();

// Card Data
const allCards = ref([
    {
        id: 1,
        title: "Путешествие внутрь себя",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
        questions: ["Что я чувствую прямо сейчас?", "Какие мои скрытые желания?", "Что мне мешает быть счастливым?"]
    },
    {
        id: 2,
        title: "Связи и отношения",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600",
        questions: ["Какие отношения для меня важны?", "Что я могу улучшить в общении?", "Как я проявляю заботу о близких?"]
    },
    {
        id: 3,
        title: "Личный рост",
        image: "https://images.unsplash.com/photo-1499209974431-2761387a17a8?auto=format&fit=crop&q=80&w=600",
        questions: ["Чему я хочу научиться?", "Какие у меня есть страхи?", "Что делает меня сильным?"]
    },
    {
        id: 4,
        title: "Цели и мечты",
        image: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?auto=format&fit=crop&q=80&w=600",
        questions: ["Какие у меня долгосрочные цели?", "Как я могу приблизиться к своей мечте?", "Какие шаги я могу предпринять прямо сейчас?"]
    },
    {
        id: 5,
        title: "Здоровье и благополучие",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=600",
        questions: ["Что я могу сделать для улучшения своего здоровья?", "Как я могу заботиться о своем теле?", "Какие здоровые привычки мне стоит развивать?"]
    },
    {
        id: 6,
        title: "Творчество и вдохновение",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600",
        questions: ["Что меня вдохновляет?", "Как я могу развивать свое творчество?", "Что нового я могу создать?"]
    },
    {
        id: 7,
        title: "Прощение и отпускание",
        image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&q=80&w=600",
        questions: ["Кого или что мне нужно простить?", "Что я могу отпустить, чтобы двигаться дальше?", "Как я могу освободить себя от обид?"]
    },
    {
        id: 8,
        title: "Мудрость и самоосознание",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600",
        questions: ["Что мне важно понять о себе?", "Как я могу стать более осознанным?", "Какие уроки жизни я могу извлечь?"]
    },
    {
        id: 9,
        title: "День благодарности",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
        questions: ["За что я благодарен сегодня?", "Какие моменты наполняют меня радостью?", "Как я могу выразить благодарность людям в моей жизни?"]
    },
    {
        id: 10,
        title: "Окружение и энергия",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
        questions: ["Какое окружение поддерживает меня?", "Какие люди в моей жизни поднимают мой дух?", "Что я могу изменить в своем окружении для улучшения настроения?"]
    },
    {
        id: 11,
        title: "Управление временем",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600",
        questions: ["Как я могу эффективнее использовать свое время?", "Что для меня является приоритетом?", "Как я могу избежать прокрастинации?"]
    },
    {
        id: 12,
        title: "Позитивное мышление",
        image: "https://images.unsplash.com/photo-1499209974431-2761387a17a8?auto=format&fit=crop&q=80&w=600",
        questions: ["Какие мысли помогают мне оставаться позитивным?", "Что я могу сделать, чтобы настроиться на позитив?", "Как я могу изменить свой взгляд на сложные ситуации?"]
    },
    {
        id: 13,
        title: "Риски и изменения",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
        questions: ["Какие риски я готов взять на себя?", "Как я могу адаптироваться к изменениям?", "Что нового я могу попробовать в своей жизни?"]
    },
    {
        id: 14,
        title: "Прошлое и будущее",
        image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&q=80&w=600",
        questions: ["Что я могу извлечь из своего прошлого?", "Какие шаги мне нужно предпринять, чтобы изменить свое будущее?", "Что я хочу достичь в следующие пять лет?"]
    },
    {
        id: 15,
        title: "Финансовая осознанность",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=600",
        questions: ["Как я могу улучшить свою финансовую осознанность?", "Что мне нужно сделать, чтобы достичь финансовой независимости?", "Какие шаги я могу предпринять для улучшения финансового благополучия?"]
    }
]);

// State
const isFlipped = ref(false);
const activeCard = ref(null);
const visibleCards = ref([]);
const reflectionText = ref('');
const isSaving = ref(false);
const showLoginModal = ref(false);
const reflections = ref([]);
const loadingReflections = ref(false);

// Computed Analytics
const totalReflections = computed(() => reflections.value.length);

const lastReflectionDate = computed(() => {
    if (reflections.value.length === 0) return 'Нет записей';
    const last = reflections.value[reflections.value.length - 1]; // Assuming appended order, or we sort
    // Better to sort by timestamp desc to be sure
    const sorted = [...reflections.value].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return new Date(sorted[0].timestamp).toLocaleDateString();
});

const topTheme = computed(() => {
    if (reflections.value.length === 0) return 'Нет данных';
    const counts = {};
    reflections.value.forEach(r => {
        counts[r.cardTitle] = (counts[r.cardTitle] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
});

// Methods
const updateVisibleCards = () => {
    visibleCards.value = allCards.value.slice(0, 5);
};

const handleCardClick = (cardId) => {
    if (cardId === visibleCards.value[0]?.id) {
        isFlipped.value = !isFlipped.value;
        if (isFlipped.value) {
            // Reset reflection when opening new card
            reflectionText.value = '';
        }
    }
};

const shuffleCards = () => {
    isFlipped.value = false;

    // Simple shuffle animation logic
    const cards = [...allCards.value];
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // Small delay to allow flip back
    setTimeout(() => {
        allCards.value = cards;
        updateVisibleCards();
        activeCard.value = visibleCards.value[0];
        reflectionText.value = '';
    }, 300);
};

const fetchReflections = async () => {
    if (!auth.user) return;
    loadingReflections.value = true;
    try {
        const result = await getUserReflections(db, auth.user.uid);
        if (result.success) {
            // Sort by timestamp desc
            reflections.value = result.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }
    } catch (error) {
        console.error("Failed to fetch reflections:", error);
    } finally {
        loadingReflections.value = false;
    }
};

const saveReflection = async () => {
    if (!reflectionText.value.trim()) return;

    if (!auth.user) {
        showLoginModal.value = true;
        return;
    }

    isSaving.value = true;
    try {
        const result = await saveReflectionEntry(db, auth.user.uid, {
            cardId: activeCard.value.id,
            cardTitle: activeCard.value.title,
            question: activeCard.value.questions[0],
            reflection: reflectionText.value
        });

        if (result.success) {
            // Add new entry to local state immediately
            reflections.value.unshift(result.entry);
            // Reset the input
            reflectionText.value = '';
            // Show success notification
            showNotification('Инсайт успешно сохранен!', 'success');
        } else {
            showNotification('Не удалось сохранить инсайт', 'error');
        }
    } catch (error) {
        console.error("Failed to save:", error);
        showNotification('Произошла ошибка при сохранении', 'error');
    } finally {
        isSaving.value = false;
    }
};

const redirectToLogin = () => {
    navigateTo('/login');
};

// Lifecycle
onMounted(() => {
    updateVisibleCards();
    activeCard.value = visibleCards.value[0];
    if (auth.user) {
        fetchReflections();
    }
});

watch(() => auth.user, (newUser) => {
    if (newUser) {
        fetchReflections();
    } else {
        reflections.value = [];
    }
});

watch(visibleCards, (newCards) => {
    if (newCards.length > 0) {
        activeCard.value = newCards[0];
    }
});
</script>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}

.transform-style-3d {
    transform-style: preserve-3d;
}

.backface-hidden {
    backface-visibility: hidden;
}

.rotate-y-180 {
    transform: rotateY(180deg);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
}

/* Animations */
.card-stack-enter-active,
.card-stack-leave-active {
    transition: all 0.5s ease;
}

.card-stack-enter-from,
.card-stack-leave-to {
    opacity: 0;
    transform: translateX(30px) rotate(10deg);
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
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
</style>
