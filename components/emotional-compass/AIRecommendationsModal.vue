<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-24 overflow-y-auto"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Modal -->
    <div
      class="relative w-full max-w-2xl bg-white dark:bg-[#1A1F35]/95 rounded-2xl border border-cyan-500/20 shadow-xl overflow-hidden"
    >
      <!-- Close button -->
      <button
        @click="onClose"
        class="absolute top-4 right-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-white transition-colors duration-200 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Header -->
      <div class="p-6 text-center bg-gradient-to-b from-cyan-500/10 to-transparent">
        <h2 class="text-2xl text-slate-900 dark:text-white/90 font-medium mb-3">
          Персональные рекомендации
        </h2>
        <p class="text-slate-600 dark:text-slate-300 text-lg">
          ИИ-анализ вашего состояния
        </p>
      </div>

      <!-- Content -->
      <div class="px-6 pb-6 min-h-[300px] flex flex-col">
        
        <!-- Guest Mode Teaser -->
        <div v-if="isGuest" class="flex-1 flex flex-col items-center justify-center text-center space-y-6">
             <div class="w-20 h-20 rounded-full bg-cyan-100 dark:bg-[#0EA5E9]/10 flex items-center justify-center mb-4 border border-cyan-500/30">
              <i class="fas fa-lock text-3xl text-cyan-600 dark:text-[#0EA5E9]"></i>
           </div>
           <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Доступно для пользователей</h3>
           <p class="text-slate-600 dark:text-slate-300 max-w-md">
             Хотите получить персональные рекомендации от ИИ на основе ваших записей? Войдите или создайте аккаунт, чтобы разблокировать эту функцию.
           </p>
           <div class="flex gap-4 mt-4">
              <Button
              text="Войти"
              iconClass="fas fa-sign-in-alt"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group border-[#0EA5E9]"
              :isLink="true"
              to="/login"
            />
            <Button
              text="Регистрация"
              iconClass="fas fa-user-plus"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group border-[#0EA5E9]"
              :isLink="true"
              to="/register"
            />
           </div>
        </div>

        <!-- Initial State: CTA (Logged in) -->
        <div v-else-if="status === 'idle'" class="flex-1 flex flex-col items-center justify-center text-center space-y-6">
           <div class="w-20 h-20 rounded-full bg-cyan-100 dark:bg-[#0EA5E9]/20 flex items-center justify-center animate-pulse">
              <i class="fas fa-magic text-3xl text-cyan-600 dark:text-[#0EA5E9]"></i>
           </div>
           <p class="text-slate-600 dark:text-slate-300 max-w-md">
             На основе ваших записей мы можем сгенерировать персональные советы и практики для улучшения вашего состояния.
           </p>
           <Button
              text="Получить рекомендации"
              iconClass="fas fa-sparkles"
              gradientStart="#8B5CF6"
              gradientEnd="#06B6D4"
              textColor="#FFFFFF"
              customClass="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group border-[#0EA5E9] hover:shadow-[0_0_20px_5px_rgba(14,165,233,0.3)]"
              :isLink="false"
              @click="getRecommendations"
            />
        </div>

        <!-- Loading State -->
        <div v-else-if="status === 'loading'" class="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div class="relative w-24 h-24">
                <div class="absolute inset-0 rounded-full border-t-2 border-[#0EA5E9] animate-spin"></div>
                <div class="absolute inset-2 rounded-full border-r-2 border-[#E879F9] animate-spin animation-delay-150"></div>
                <div class="absolute inset-4 rounded-full border-b-2 border-[#8B5CF6] animate-spin animation-delay-300"></div>
            </div>
            <p class="text-slate-600 dark:text-slate-300 animate-pulse">
              Анализирую вашу ситуацию...
            </p>
        </div>

        <!-- Success State -->
        <div v-else-if="status === 'success'" class="space-y-6">
            <!-- Emotion Summary (Compact) -->
             <div
              class="backdrop-blur-sm border border-cyan-500/20 bg-slate-50 dark:bg-[#1A1F35]/40 rounded-xl p-4 flex items-center justify-between"
            >
                <div class="flex items-center gap-3">
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ emotion }}</span>
                    <span class="text-xs text-slate-400">|</span>
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ subEmotion }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="flex">
                        <div
                        v-for="n in 10"
                        :key="n"
                        :class="[
                            'w-3 h-1 rounded-sm mr-0.5',
                            n <= intensity
                            ? 'bg-gradient-to-r from-[#0EA5E9] to-[#E879F9]'
                            : 'bg-cyan-200 dark:bg-[#0EA5E9]/30',
                        ]"
                        />
                    </div>
                    <span class="text-xs text-slate-500 dark:text-slate-400/70">{{ intensity }}/10</span>
                </div>
            </div>

            <!-- AI Content -->
            <div class="prose prose-invert max-w-none">
                <div class="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-[#1A1F35]/40 p-4 rounded-xl border border-cyan-500/10">
                    {{ recommendations }}
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="status === 'error'" class="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div class="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <i class="fas fa-exclamation-triangle text-2xl text-red-400"></i>
           </div>
           <p class="text-red-600 dark:text-red-300 max-w-md">
             {{ errorMessage || "Произошла ошибка при получении рекомендаций." }}
           </p>
           <Button
              text="Попробовать снова"
              iconClass="fas fa-redo"
              gradientStart="#EF4444"
              gradientEnd="#F87171"
              textColor="#FFFFFF"
              customClass="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all duration-300 ease-out rounded-lg group border-red-500"
              :isLink="false"
              @click="getRecommendations"
            />
        </div>

      </div>

      <!-- Footer -->
      <div class="p-6 flex justify-end gap-3 border-t border-cyan-500/20 bg-slate-50 dark:bg-[#1A1F35]/80">
        <Button
          text="Закрыть"
          iconClass="fas fa-times"
          textColor="#CBD5E1"
          customClass="px-4 py-2 text-sm font-medium border border-cyan-500/20 bg-white dark:bg-[#1A1F35]/40 hover:bg-slate-100 dark:hover:bg-[#1A1F35]/60 backdrop-blur-sm rounded-lg transition-colors text-slate-600 dark:text-slate-300"
          :isLink="false"
          @click="onClose"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Button from "~/components/base/Button.vue";
import { getAuth } from "firebase/auth";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  emotion: {
    type: String,
    required: true,
  },
  subEmotion: {
    type: String,
    required: true,
  },
  intensity: {
    type: Number,
    required: true,
  },
  journalEntry: {
    type: String,
    default: '',
  },
  perceptionEntry: {
    type: String,
    default: '',
  },
  copingEntry: {
    type: String,
    default: '',
  },
  actionEntry: {
    type: String,
    default: '',
  },
  selectedTags: {
    type: Array,
    default: () => [],
  },
  isGuest: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["close"]);

const status = ref('idle'); // idle, loading, success, error
const recommendations = ref('');
const errorMessage = ref('');

const onClose = () => {
  emit("close");
  // Reset state after a short delay to allow animation to finish if we had one
  setTimeout(() => {
      if (!props.isOpen) {
          status.value = 'idle';
          recommendations.value = '';
          errorMessage.value = '';
      }
  }, 300);
};

// Reset when modal opens
watch(() => props.isOpen, (newVal) => {
    if (newVal && status.value !== 'success') {
        status.value = 'idle';
    }
});

const getRecommendations = async () => {
  if (props.isGuest) return; // Should not happen due to UI, but safety check

  status.value = 'loading';
  errorMessage.value = '';

  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    const prompt = `
      Пользователь заполнил "Эмоциональный компас".
      Эмоция: ${props.emotion} (Подкатегория: ${props.subEmotion})
      Интенсивность: ${props.intensity}/10
      Ситуация: ${props.journalEntry}
      Мысли/Восприятие: ${props.perceptionEntry}
      Реакция тела/Копинг: ${props.copingEntry}
      Действия: ${props.actionEntry}
      Затронутые сферы: ${props.selectedTags.join(', ')}
      
      Проанализируй эту запись. Дай эмпатичную обратную связь и 3-5 конкретных, коротких рекомендаций, как экологично прожить эту эмоцию и улучшить состояние. Тон: поддерживающий, психологический, дружелюбный.
    `;

    const response = await fetch('/.netlify/functions/groqChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        user: user ? {
            uid: user.uid,
            displayName: user.displayName,
            // Add other user fields if available in your user object or context
        } : {},
        maxLines: 20,
        systemPrompt: "Ты — эмпатичный психологический помощник. Твоя цель — поддержать пользователя, валидировать его чувства и предложить конструктивные способы саморегуляции. Избегай клише. Будь краток и конкретен."
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }

    recommendations.value = data.reply;
    status.value = 'success';

  } catch (error) {
    console.error('Error getting recommendations:', error);
    errorMessage.value = 'Не удалось получить рекомендации. Пожалуйста, попробуйте позже.';
    status.value = 'error';
  }
};
</script>

<style scoped>
.animation-delay-150 {
  animation-delay: 150ms;
}
.animation-delay-300 {
  animation-delay: 300ms;
}
</style>
