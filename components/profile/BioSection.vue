<template>
  <div class="bio-section-container">
    <!-- Header with Progress -->
    <div class="section-header">
      <div class="header-title">
        <div class="title-icon-wrapper">
          <i class="fas fa-user text-mindqlab-calm-accent opacity-60"></i>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-3">
            <h2 class="title-text">Профиль пользователя</h2>
            <NuxtLink to="/profile/settings"
              class="text-stone-400 hover:text-mindqlab-calm-accent transition-colors text-xs" title="Редактировать">
              <i class="fas fa-pen"></i>
            </NuxtLink>
          </div>
          <p class="text-xs text-stone-400 dark:text-stone-500 font-light italic mt-1">Персональная информация и био</p>
        </div>
      </div>

      <div class="progress-wrapper">
        <div class="flex flex-col items-end gap-2">
          <div class="flex items-center gap-3">
            <span class="progress-label">Полнота профиля</span>
            <span class="progress-percentage">{{ bioCompletionPercentage }}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" :style="{ width: bioCompletionPercentage + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-content">
        <i class="fas fa-spinner fa-spin text-4xl text-cyan-600 dark:text-cyan-400 mb-4"></i>
        <p class="text-gray-700 dark:text-slate-300">Загрузка данных...</p>
      </div>
    </div>

    <!-- Bio Content -->
    <div v-else class="bio-content">
      <!-- Info Cards Grid -->
      <div class="info-cards-grid">
        <!-- Profession -->
        <BioInfoCard title="Профессия" :value="profession" iconClass="fas fa-briefcase" />

        <!-- Social Media -->
        <BioInfoCard title="Соц. сети" :value="socialMedia" iconClass="fas fa-at" :isSocialMedia="true" />

        <!-- Age -->
        <BioInfoCard title="Возраст" :value="age ? age + ' лет' : ''" iconClass="fas fa-calendar" />

        <!-- Gender -->
        <BioInfoCard title="Пол" :value="gender === 'male' ? 'Мужской' : gender === 'female' ? 'Женский' : ''"
          iconClass="fas fa-user-friends" />
      </div>

      <!-- About Text Card -->
      <div class="about-card">
        <div class="about-header">
          <div class="about-icon-wrapper">
            <i class="fas fa-feather text-mindqlab-calm-accent opacity-60"></i>
          </div>
          <p class="about-label">История жизни</p>
        </div>
        <p v-if="aboutYourself" class="about-text">
          {{ aboutYourself }}
        </p>
        <p v-else class="about-placeholder">
          Расскажите немного о себе, своих целях и устремлениях...
        </p>
      </div>

      <!-- CTA Button -->
      <div v-if="bioCompletionPercentage < 100" class="cta-container">
        <NuxtLink to="/profile/settings" class="cta-button">
          <i class="fas fa-plus mr-3 text-xs"></i>
          <span class="hidden sm:inline">Дополнить информацию</span>
          <span class="sm:hidden">Дополнить</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import BioInfoCard from "~/components/profile/BioInfoCard.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
    description: "Indicates if bio data is still loading",
  },
  profession: {
    type: String,
    default: "",
    description: "User's profession",
  },
  socialMedia: {
    type: [Array, String],
    default: () => [],
    description:
      "User's social media links as an array of { type, url } objects",
  },
  age: {
    type: String,
    default: "",
    description: "User's age",
  },
  gender: {
    type: String,
    default: "",
    description: "User's gender",
  },
  aboutYourself: {
    type: String,
    default: "",
    description: "User's about text",
  },
});

// Calculate bio completion percentage
const bioCompletionPercentage = computed(() => {
  const fields = [
    props.profession,
    Array.isArray(props.socialMedia) && props.socialMedia.length > 0
      ? props.socialMedia
      : "",
    props.age,
    props.gender,
    props.aboutYourself,
  ];
  const filledFields = fields.filter((field) => field).length;
  return Math.round((filledFields / fields.length) * 100);
});
</script>

<style scoped>
.bio-section-container {
  @apply p-8 sm:p-12 rounded-[3.5rem] bg-white dark:bg-stone-900/40 border border-stone-100 dark:border-stone-800/50 shadow-sm backdrop-blur-xl mb-12 transition-all duration-500;
}

.section-header {
  @apply flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-8 border-b border-stone-50 dark:border-stone-800/30;
}

.header-title {
  @apply flex items-center gap-5;
}

.title-icon-wrapper {
  @apply w-14 h-14 rounded-2xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center text-xl shadow-sm;
}

.title-text {
  @apply text-3xl font-light text-stone-900 dark:text-white uppercase tracking-tight;
}

.progress-wrapper {
  @apply w-full md:w-auto;
}

.progress-label {
  @apply text-stone-400 dark:text-stone-500 text-[10px] uppercase tracking-[0.2em] font-medium;
}

.progress-bar-container {
  @apply flex items-center;
}

.progress-bar-bg {
  @apply w-full md:w-48 bg-stone-100 dark:bg-stone-800/30 rounded-full h-1 overflow-hidden;
}

.progress-bar-fill {
  @apply h-full rounded-full transition-all duration-1000 ease-out bg-mindqlab-calm-accent shadow-sm;
}

.progress-percentage {
  @apply text-stone-900 dark:text-white text-sm font-medium tracking-tight;
}

.loading-state {
  @apply flex items-center justify-center py-24;
}

.loading-content {
  @apply flex flex-col items-center text-center;
}

.bio-content {
  @apply space-y-10;
}

.info-cards-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6;
}

.about-card {
  @apply p-8 sm:p-10 rounded-[2.5rem] bg-stone-50/50 dark:bg-stone-800/20 border border-stone-100/50 dark:border-stone-800/30 transition-all duration-500;
}

.about-header {
  @apply flex items-center gap-4 mb-8;
}

.about-icon-wrapper {
  @apply w-10 h-10 rounded-xl bg-white dark:bg-stone-800/50 flex items-center justify-center shadow-sm;
}

.about-label {
  @apply text-stone-400 dark:text-stone-500 text-[10px] uppercase tracking-[0.2em] font-medium;
}

.about-text {
  @apply text-stone-600 dark:text-stone-300 text-base md:text-lg font-light leading-relaxed italic whitespace-pre-line;
}

.about-placeholder {
  @apply text-stone-400 dark:text-stone-600 text-base font-light italic;
}

.cta-container {
  @apply flex justify-center sm:justify-start pt-4;
}

.cta-button {
  @apply px-10 py-5 rounded-full bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-stone-900 dark:text-white font-medium hover:border-mindqlab-calm-accent transition-all duration-300 shadow-sm flex items-center;
}

@media (max-width: 640px) {
  .bio-section-container {
    @apply p-6 rounded-[2.5rem];
  }

  .section-header {
    @apply mb-8 pb-6;
  }

  .title-icon-wrapper {
    @apply w-12 h-12;
  }

  .title-text {
    @apply text-2xl;
  }

  .about-card {
    @apply p-6 rounded-[2rem];
  }

  .cta-button {
    @apply w-full justify-center px-6 py-4;
  }
}
</style>
