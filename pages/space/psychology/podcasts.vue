<template>
    <div
        class="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-black transition-colors duration-500">
        <div class="max-w-7xl mx-auto px-6 py-8 space-y-12">
            <Breadcrumbs />

            <!-- Header Section -->
            <div class="space-y-6">
                <h1
                    class="text-4xl sm:text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                    Вдохновляющие<br /><span class="text-purple-600 dark:text-purple-400">Подкасты</span>
                </h1>
                <p class="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl leading-relaxed">
                    Психологические беседы для личностного роста и саморазвития. Глубокие смыслы в удобном формате.
                </p>
            </div>

            <!-- Category Navigation (Editorial Style) -->
            <nav class="space-y-4" aria-label="Категории подкастов">
                <div class="flex flex-wrap gap-2">
                    <button v-for="category in categories" :key="category" @click="selectCategory(category)"
                        class="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border"
                        :class="[
                            selectedCategory === category
                                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white shadow-xl'
                                : 'bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                        ]">
                        {{ category }}
                        <span v-if="getCategoryCount(category)" class="ml-2 opacity-50">{{ getCategoryCount(category)
                            }}</span>
                    </button>
                </div>
            </nav>

            <!-- Podcasts Grid -->
            <div v-if="loading" class="flex justify-center items-center py-20">
                <div
                    class="w-12 h-12 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-purple-500 animate-spin">
                </div>
            </div>

            <div v-else class="grid md:grid-cols-2 gap-8">
                <article v-for="podcast in filteredPodcasts" :key="podcast.id"
                    class="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/5">
                    <div class="flex flex-col h-full">
                        <div class="p-8 flex gap-6">
                            <!-- Podcast Avatar -->
                            <div
                                class="relative w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                <img :src="podcast.image" :alt="podcast.title" class="w-full h-full object-cover" />
                                <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors">
                                </div>
                            </div>

                            <!-- Title Content -->
                            <div class="flex-1 space-y-3">
                                <div class="flex items-center gap-3">
                                    <span
                                        class="px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                                        {{ podcast.category }}
                                    </span>
                                    <span class="text-[8px] font-black uppercase tracking-widest text-zinc-400">
                                        <i class="far fa-clock mr-1"></i> 15 МИН
                                    </span>
                                </div>
                                <h3
                                    class="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {{ podcast.title }}
                                </h3>
                            </div>
                        </div>

                        <!-- Modern Audio Player Placeholder/Wrapper -->
                        <div class="px-8 pb-6">
                            <div
                                class="w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 transition-colors">
                                <iframe width="100%" height="120" scrolling="no" frameborder="no" allow="autoplay"
                                    :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(podcast.soundcloudUrl)}&color=%23a855f7&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`"></iframe>
                            </div>
                        </div>

                        <!-- Action Bar -->
                        <div
                            class="mt-auto px-8 py-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/30">
                            <div class="flex gap-4">
                                <button
                                    class="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <i class="fas fa-share-alt"></i>
                                </button>
                                <button class="text-zinc-400 hover:text-rose-500 transition-colors">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                            <button @click="toggleShowNotes(podcast.id)"
                                class="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 hover:text-purple-600 transition-colors"
                                :class="{ 'text-purple-600': showNotesPodcastId === podcast.id }">
                                {{ showNotesPodcastId === podcast.id ? 'Скрыть детали' : 'Подробнее' }}
                                <i class="fas fa-chevron-down transition-transform duration-300"
                                    :class="{ 'rotate-180': showNotesPodcastId === podcast.id }"></i>
                            </button>
                        </div>

                        <!-- Expandable Notes -->
                        <transition name="fade">
                            <div v-if="showNotesPodcastId === podcast.id"
                                class="px-8 py-6 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-medium leading-relaxed">
                                {{ podcast.description }}
                            </div>
                        </transition>
                    </div>
                </article>
            </div>

            <!-- Subscription Terminal -->
            <div
                class="bg-zinc-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center space-y-8 border border-zinc-800 shadow-2xl">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none">
                </div>

                <div class="relative z-10 max-w-2xl mx-auto space-y-6">
                    <div
                        class="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto border border-zinc-700 shadow-xl">
                        <i class="fas fa-podcast text-3xl text-purple-400"></i>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                        Эфир продолжается
                    </h2>
                    <p class="text-zinc-500 text-lg font-medium leading-relaxed">
                        Подпишитесь на уведомления, чтобы первыми узнавать о новых глубинных исследованиях человеческой
                        психики.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <input type="email" v-model="email" placeholder="YOUR@EMAIL.COM"
                            class="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-purple-500 transition-colors" />
                        <button @click="subscribeEmail"
                            class="px-10 py-4 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-black/40">
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
        description: "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
        category: "Личностный рост",
        image: "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
        soundcloudUrl: "https://api.soundcloud.com/tracks/1301040925",
    },
    {
        id: 2,
        title: "Эмоции и чувства: Часть 2",
        description: "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
        category: "Личностный рост",
        image: "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
        soundcloudUrl: "https://api.soundcloud.com/tracks/1300415452",
    },
    {
        id: 3,
        title: "Эмоции и чувства: Часть 3",
        description: "Разбираем эмоции и чувства: как они влияют на нас, помогают или мешают, и что с этим делать.",
        category: "Личностный рост",
        image: "https://cdn.pixabay.com/photo/2016/07/16/01/35/smilies-1520867_640.jpg",
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
