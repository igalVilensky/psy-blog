<!-- components/community/CreatePostModal.vue -->
<template>
  <Transition name="modal">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <!-- Header -->
        <div
          class="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10"
        >
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <i class="fas fa-pen-fancy text-orange-400"></i>
            Создать пост
          </h3>
          <button
            @click="closeModal"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Заголовок <span class="text-red-400">*</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="Введите заголовок поста..."
              maxlength="100"
              class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            />
            <div class="text-xs text-slate-500 mt-1 text-right">
              {{ formData.title.length }}/100
            </div>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Категория <span class="text-red-400">*</span>
            </label>
            <select
              v-model="formData.category"
              class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              required
            >
              <option
                v-for="cat in categories"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
          </div>

          <!-- Content -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Содержание <span class="text-red-400">*</span>
            </label>
            <textarea
              v-model="formData.content"
              rows="8"
              placeholder="Поделитесь своими мыслями, опытом или вопросом..."
              maxlength="2000"
              class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
              required
            ></textarea>
            <div class="text-xs text-slate-500 mt-1 text-right">
              {{ formData.content.length }}/2000
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Теги
            </label>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="(tag, index) in formData.tags"
                :key="index"
                class="px-3 py-1 bg-slate-100 dark:bg-slate-700/50 rounded-full text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2"
              >
                #{{ tag }}
                <button
                  type="button"
                  @click="removeTag(index)"
                  class="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="newTag"
                type="text"
                placeholder="Добавить тег..."
                maxlength="20"
                class="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                @keydown.enter.prevent="addTag"
              />
              <button
                type="button"
                @click="addTag"
                class="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-lg transition-colors"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="text-xs text-slate-500 mt-1">
              Максимум 5 тегов
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3"
          >
            <i class="fas fa-exclamation-circle text-red-400 mt-0.5"></i>
            <p class="text-red-300 text-sm">{{ errorMessage }}</p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
              :disabled="submitting"
            >
              Отмена
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              :disabled="submitting || !isFormValid"
            >
              <i
                class="fas"
                :class="submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'"
              ></i>
              {{ submitting ? 'Публикация...' : 'Опубликовать' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCommunity } from '~/composables/useCommunity';
import { useNotification } from '~/composables/useNotification';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'post-created']);

const { createPost } = useCommunity();
const { showNotification } = useNotification();

const formData = ref({
  title: '',
  category: 'Обсуждение',
  content: '',
  tags: []
});

const newTag = ref('');
const submitting = ref(false);
const errorMessage = ref('');

const categories = [
  'Эмоциональный интеллект',
  'Личность',
  'Обсуждение',
  'Креативность',
  'Медитация',
  'Осознанность',
  'Личностный рост',
  'Архетипы'
];

const isFormValid = computed(() => {
  return (
    formData.value.title.trim().length > 0 &&
    formData.value.content.trim().length > 0 &&
    formData.value.category
  );
});

const addTag = () => {
  const tag = newTag.value.trim().toLowerCase();
  
  if (!tag) return;
  
  if (formData.value.tags.length >= 5) {
    errorMessage.value = 'Максимум 5 тегов';
    setTimeout(() => errorMessage.value = '', 3000);
    return;
  }
  
  if (formData.value.tags.includes(tag)) {
    errorMessage.value = 'Этот тег уже добавлен';
    setTimeout(() => errorMessage.value = '', 3000);
    return;
  }
  
  formData.value.tags.push(tag);
  newTag.value = '';
  errorMessage.value = '';
};

const removeTag = (index) => {
  formData.value.tags.splice(index, 1);
};

const handleSubmit = async () => {
  if (!isFormValid.value || submitting.value) return;

  submitting.value = true;
  errorMessage.value = '';

  try {
    const post = await createPost({
      title: formData.value.title.trim(),
      content: formData.value.content.trim(),
      category: formData.value.category,
      tags: formData.value.tags
    });

    showNotification('Пост успешно опубликован!', 'success');
    emit('post-created', post);
    resetForm();
    closeModal(); // Close modal after successful creation
  } catch (error) {
    console.error('Error creating post:', error);
    errorMessage.value = error.message || 'Не удалось создать пост. Попробуйте снова.';
  } finally {
    submitting.value = false;
  }
};

const closeModal = () => {
  if (!submitting.value) {
    emit('update:modelValue', false);
  }
};

const resetForm = () => {
  formData.value = {
    title: '',
    category: 'Обсуждение',
    content: '',
    tags: []
  };
  newTag.value = '';
  errorMessage.value = '';
};

</script>

<style scoped>
/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
