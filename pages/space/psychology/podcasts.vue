<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs />

            <!-- Header Section -->
            <div class="mb-12">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h1
                            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Вдохновляющие Подкасты
                        </h1>
                        <p class="text-slate-600 dark:text-cyan-300/70 text-lg leading-relaxed max-w-2xl">
                            Психологические беседы для личностного роста и саморазвития
                        </p>
                    </div>
                </div>
            </div>

            <!-- Category Navigation -->
            <nav class="mb-12" aria-label="Категории подкастов">
                <!-- Mobile Dropdown -->
                <div class="block md:hidden relative">
                    <button type="button" @click="isOpen = !isOpen"
                        class="w-full px-4 py-3 bg-white dark:bg-slate-800/50 rounded-xl text-slate-900 dark:text-white flex items-center justify-between border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                        <span class="font-medium">{{ selectedCategory || "Все категории" }}</span>
                        <i class="fas fa-chevron-down transition-transform duration-300 text-cyan-500"
                            :class="{ 'rotate-180': isOpen }"></i>
                    </button>

                    <transition enter-active-class="transition duration-200 ease-out"
                        enter-from-class="transform scale-y-0 opacity-0"
                        enter-to-class="transform scale-y-100 opacity-100"
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="transform scale-y-100 opacity-100"
                        leave-to-class="transform scale-y-0 opacity-0">
                        <div v-if="isOpen"
                            class="absolute top-full left-0 right-0 z-20 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 origin-top">
                            <div class="py-2">
                                <button v-for="category in categories" :key="category" @click="selectCategory(category)"
                                    class="w-full px-4 py-3 text-left text-sm font-medium transition-all duration-300"
                                    :class="[
                                        selectedCategory === category
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-l-2 border-cyan-500'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50',
                                    ]">
                                    <span class="flex items-center justify-between">
                                        {{ category }}
                                        <span v-if="getCategoryCount(category)"
                                            class="ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                                            {{ getCategoryCount(category) }}
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>

                <!-- Desktop Tabs -->
                <div class="hidden md:block">
                    <div class="flex flex-wrap gap-2">
                        <button v-for="category in categories" :key="category" @click="selectCategory(category)"
                            class="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
                            :class="[
                                selectedCategory === category
                                    ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/25'
                                    : 'bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400',
                            ]">
                            {{ category }}
                            <span v-if="getCategoryCount(category)" class="ml-2 text-xs px-2 py-0.5 rounded-full"
                                :class="[
                                    selectedCategory === category
                                        ? 'bg-white/20 text-white'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
                                ]">
                                {{ getCategoryCount(category) }}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <!-- Podcasts Grid -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <div class="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
            </div>

            <div v-else class="grid md:grid-cols-2 gap-6 md:gap-8">
                <article v-for="(podcast, index) in filteredPodcasts" :key="podcast.id"
                    class="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">

                    <!-- Glow Effect -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    </div>

                    <div class="flex flex-col h-full relative z-10">
                        <!-- Header with Image & Meta -->
                        <div class="flex p-5 gap-5">
                            <!-- Image -->
                            <div
                                class="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md group-hover:shadow-cyan-500/20 transition-all duration-500">
                                <img :src="podcast.image" :alt="podcast.title"
                                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy" />
                                <div
                                    class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300">
                                </div>
                            </div>

                            <!-- Title & Category -->
                            <div class="flex-1 min-w-0 flex flex-col justify-center">
                                <div class="flex items-center gap-2 mb-2">
                                    <span
                                        class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 group-hover:border-cyan-500/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                                        {{ podcast.category }}
                                    </span>
                                    <span class="text-[10px] text-slate-400 flex items-center">
                                        <i class="far fa-clock mr-1"></i> 15 мин
                                    </span>
                                </div>
                                <h3
                                    class="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 transition-all duration-300">
                                    {{ podcast.title }}
                                </h3>
                            </div>
                        </div>

                        <!-- Player Section -->
                        <div class="px-5 pb-4">
                            <div
                                class="w-full rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 group-hover:border-cyan-500/20 transition-colors duration-300">
                                <iframe width="100%" height="80" scrolling="no" frameborder="no" allow="autoplay"
                                    :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(podcast.soundcloudUrl)}&color=%2306b6d4&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`"
                                    class="rounded"></iframe>
                            </div>
                        </div>

                        <!-- Footer Actions -->
                        <div
                            class="mt-auto px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                            <div class="flex items-center gap-4">
                                <button
                                    class="text-slate-400 hover:text-cyan-500 transition-colors duration-300 flex items-center gap-1.5 text-xs font-medium group/btn">
                                    <i
                                        class="fas fa-share-alt group-hover/btn:rotate-12 transition-transform duration-300"></i>
                                    <span>Поделиться</span>
                                </button>
                                <button
                                    class="text-slate-400 hover:text-pink-500 transition-colors duration-300 flex items-center gap-1.5 text-xs font-medium group/btn">
                                    <i
                                        class="far fa-heart group-hover/btn:scale-110 transition-transform duration-300"></i>
                                    <span>В избранное</span>
                                </button>
                            </div>

                            <button @click="toggleShowNotes(podcast.id)"
                                class="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1">
                                <i class="fas fa-chevron-down transition-transform duration-300"
                                    :class="{ 'rotate-180': showNotesPodcastId === podcast.id }"></i>
                            </button>
                        </div>

                        <!-- Show Notes Expandable -->
                        <transition enter-active-class="transition duration-300 ease-out"
                            enter-from-class="transform scale-y-0 opacity-0 origin-top"
                            enter-to-class="transform scale-y-100 opacity-100 origin-top"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="transform scale-y-100 opacity-100 origin-top"
                            leave-to-class="transform scale-y-0 opacity-0 origin-top">
                            <div v-if="showNotesPodcastId === podcast.id"
                                class="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/50 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {{ podcast.description }}
                            </div>
                        </transition>
                    </div>
                </article>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && filteredPodcasts.length === 0"
                class="text-center py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div
                    class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6 group">
                    <i
                        class="fas fa-podcast text-4xl text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 transition-colors duration-300"></i>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Подкасты не найдены
                </h3>
                <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    В данной категории пока нет выпусков. Попробуйте выбрать другую тему или загляните позже.
                </p>
            </div>

            <!-- Subscribe Section -->
            <div class="mt-16 relative overflow-hidden rounded-3xl">
                <!-- Background with gradient and noise -->
                <div class="absolute inset-0 bg-slate-900 dark:bg-black"></div>
                <div class="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-900/50 to-purple-900/20">
                </div>
                <div class="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

                <!-- Decorative elements -->
                <div
                    class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
                </div>
                <div
                    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent">
                </div>

                <div class="relative z-10 px-6 py-16 sm:px-12 text-center">
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 mb-8 backdrop-blur-sm">
                        <i class="fas fa-bell text-2xl text-cyan-400"></i>
                    </div>

                    <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                        Не пропускайте новые выпуски
                    </h2>
                    <p class="text-slate-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                        Подпишитесь на уведомления о свежих эпизодах и получайте эксклюзивные материалы, доступные
                        только подписчикам.
                    </p>

                    <div class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                        <div class="flex-1 relative group">
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            </div>
                            <input type="email" v-model="email" placeholder="Ваш email"
                                class="relative w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm" />
                        </div>
                        <button @click="subscribeEmail"
                            class="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-cyan-50 transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]">
                            Подписаться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getFirestore } from "firebase/firestore";
import { subscribeUser } from "@/api/firebase/contact";
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

definePageMeta({
    layout: "laboratory",
});

const db = getFirestore();
const email = ref("");
const selectedCategory = ref("Все");
const isOpen = ref(false);
const loading = ref(false);
const showNotesPodcastId = ref(null);

const categories = [
    "Все",
    "Личностный рост",
    "Отношения",
    "Карьера",
    "Психология",
];

const podcasts = [
    {
        id: 1,
        title: "Эмоции и чувства: Часть 1",
        description:
            "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
        category: "Личностный рост",
        image:
            "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
        soundcloudUrl: "https://api.soundcloud.com/tracks/1301040925",
    },
    {
        id: 2,
        title: "Эмоции и чувства: Часть 2",
        description:
            "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
        category: "Личностный рост",
        image:
            "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
        soundcloudUrl: "https://api.soundcloud.com/tracks/1300415452",
    },
    {
        id: 3,
        title: "Эмоции и чувства: Часть 3",
        description:
            "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
        category: "Личностный рост",
        image:
            "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
        soundcloudUrl: "https://api.soundcloud.com/tracks/1303757872",
    },
];

const selectCategory = (category) => {
    selectedCategory.value = category;
    isOpen.value = false;
};

const filteredPodcasts = computed(() => {
    return selectedCategory.value === "Все"
        ? podcasts
        : podcasts.filter((p) => p.category === selectedCategory.value);
});

const getCategoryCount = (category) => {
    if (category === "Все") return podcasts.length;
    return podcasts.filter((p) => p.category === category).length;
};

const subscribeEmail = async () => {
    if (!validateEmail(email.value)) {
        alert("Пожалуйста, введите корректный email");
        return;
    }

    const result = await subscribeUser(db, email.value);
    if (result.success) {
        alert(result.message);
        email.value = "";
    } else {
        alert(result.message);
    }
};

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

const toggleShowNotes = (podcastId) => {
    showNotesPodcastId.value =
        showNotesPodcastId.value === podcastId ? null : podcastId;
};
</script>

