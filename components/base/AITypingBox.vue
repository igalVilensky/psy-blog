<!-- components/AITypingBox.vue -->
<template>
  <div v-if="isVisible" class="ai-typing-box">
    <button
      @click="closeBox"
      class="close-button"
      aria-label="Close typing box"
    >
      <i class="fas fa-times"></i>
    </button>
    <div class="typing-container">
      <slot :is-thinking="isThinking" :displayed-text="displayedText">
        <span v-if="isThinking" class="thinking-dots">...</span>
        <span v-else class="typed-text">{{ displayedText }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  text: { type: String, default: "" },
  isVisible: { type: Boolean, default: false },
  delay: { type: Number, default: 3000 },
  typingSpeed: { type: Number, default: 30 },
  thinkingDuration: { type: Number, default: 1500 },
});

const emit = defineEmits(["update:isVisible"]);

const isThinking = ref(true);
const displayedText = ref("");

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        isThinking.value = false;
        typeText();
      }, props.thinkingDuration);
    } else {
      isThinking.value = true;
      displayedText.value = "";
    }
  }
);

onMounted(() => {
  if (props.delay && !props.isVisible) {
    setTimeout(() => {
      emit("update:isVisible", true);
    }, props.delay);
  }
});

const typeText = () => {
  if (!props.text) return;
  let index = 0;
  const interval = setInterval(() => {
    if (index < props.text.length) {
      displayedText.value = props.text.slice(0, index + 1);
      index++;
    } else {
      clearInterval(interval);
    }
  }, props.typingSpeed);
};

const closeBox = () => {
  emit("update:isVisible", false);
};
</script>

<style scoped>
.ai-typing-box {
  position: fixed;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 60;
  height: auto;
  @media (min-width: 640px) {
    top: 5rem;
    left: 2rem;
    transform: none;
    width: 400px;
    height: auto;
  }
}

.typing-container {
  font-size: 1.125rem;
  color: #ffffff;
  font-family: inherit;
}

.thinking-dots {
  display: inline-block;
  width: 1em;
  text-align: left;
  animation: dots 1.5s infinite;
}

.typed-text {
  white-space: pre-wrap; /* Preserve newlines and wrapping */
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.close-button:hover {
  opacity: 1;
}

@keyframes dots {
  0% {
    content: ".";
  }
  33% {
    content: "..";
  }
  66% {
    content: "...";
  }
  100% {
    content: ".";
  }
}

.thinking-dots::after {
  content: "...";
  animation: dots 1.5s infinite;
}
</style>
