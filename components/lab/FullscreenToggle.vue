<template>
    <button @click="toggle"
        class="fullscreen-toggle flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group"
        :title="isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'">
        <i class="fas text-cyan-600 dark:text-cyan-400 text-sm transition-transform duration-300 group-hover:scale-110"
            :class="isFullscreen ? 'fa-compress' : 'fa-expand'"></i>
        <span class="sr-only">{{ isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран' }}</span>
    </button>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();
</script>

<style scoped>
.fullscreen-toggle {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}
</style>
