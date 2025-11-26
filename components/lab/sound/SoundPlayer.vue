<template>
    <div class="invisible-player">
        <div v-if="isClient" :id="elementId"></div>
    </div>
</template>

<style scoped>
.invisible-player {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
}
</style>

<script setup>
import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue';

const props = defineProps({
    videoId: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        default: 50
    },
    isPlaying: {
        type: Boolean,
        default: false
    },
    loop: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['ready', 'state-change', 'error']);

const elementId = ref(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);
const isClient = ref(false);

let player = null;
let isReady = false;

const loadYoutubeAPI = () => {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve();
        } else {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                resolve();
            };
        }
    });
};

const initPlayer = () => {
    // Ensure element exists
    if (!document.getElementById(elementId.value)) {
        console.warn('YouTube Player element not found:', elementId.value);
        return;
    }

    // Prevent double initialization
    if (player) return;

    try {
        player = new window.YT.Player(elementId.value, {
            height: '100%',
            width: '100%',
            videoId: props.videoId,
            playerVars: {
                'playsinline': 1,
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'loop': props.loop ? 1 : 0,
                'playlist': props.loop ? props.videoId : undefined
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    } catch (e) {
        console.error('Error initializing YouTube player:', e);
    }
};

const onPlayerReady = (event) => {
    isReady = true;
    if (player && typeof player.setVolume === 'function') {
        player.setVolume(props.volume);
        if (props.isPlaying) {
            player.playVideo();
        }
    }
    emit('ready');
};

const onPlayerStateChange = (event) => {
    emit('state-change', event.data);
};

const onPlayerError = (event) => {
    console.error('YouTube Player Error:', event.data);
    emit('error', event.data);
};

// Watchers
watch(() => props.isPlaying, (newVal) => {
    if (!isReady || !player || typeof player.playVideo !== 'function') return;
    if (newVal) {
        player.playVideo();
    } else {
        player.pauseVideo();
    }
});

watch(() => props.volume, (newVal) => {
    if (!isReady || !player || typeof player.setVolume !== 'function') return;
    player.setVolume(newVal);
});

watch(() => props.videoId, (newVal) => {
    if (!isReady || !player || typeof player.loadVideoById !== 'function') return;
    player.loadVideoById(newVal);
});

onMounted(() => {
    isClient.value = true;
    // Wait for DOM update so v-if="isClient" renders the div
    nextTick(() => {
        loadYoutubeAPI().then(initPlayer);
    });
});

onUnmounted(() => {
    if (player && typeof player.destroy === 'function') {
        player.destroy();
    }
    player = null;
    isReady = false;
});
</script>
