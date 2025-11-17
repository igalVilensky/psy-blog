<template>
  <div class="bio-section-container">
    <!-- Header with Progress -->
    <div class="section-header">
      <div class="header-title">
        <div class="title-icon-wrapper">
          <i class="fas fa-user-edit text-cyan-400"></i>
        </div>
        <h2 class="title-text">О себе</h2>
      </div>

      <div class="progress-wrapper">
        <span class="progress-label">Заполнено:</span>
        <div class="progress-bar-container">
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              :style="{ width: bioCompletionPercentage + '%' }"
            ></div>
          </div>
          <span class="progress-percentage"
            >{{ bioCompletionPercentage }}%</span
          >
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-content">
        <i class="fas fa-spinner fa-spin text-4xl text-cyan-400 mb-4"></i>
        <p class="text-slate-300">Загрузка данных...</p>
      </div>
    </div>

    <!-- Bio Content -->
    <div v-else class="bio-content">
      <!-- Info Cards Grid -->
      <div class="info-cards-grid">
        <BioInfoCard
          title="Профессия"
          :value="profession"
          iconClass="fas fa-briefcase"
        />
        <BioInfoCard
          title="Социальные сети"
          :value="socialMedia"
          iconClass="fas fa-share-alt"
          :isSocialMedia="true"
        />
        <BioInfoCard
          title="Возраст"
          :value="age"
          iconClass="fas fa-birthday-cake"
        />
        <BioInfoCard
          title="Пол"
          :value="gender"
          iconClass="fas fa-venus-mars"
        />
      </div>

      <!-- About Text Card -->
      <div class="about-card">
        <div class="about-header">
          <div class="about-icon-wrapper">
            <i class="fas fa-quote-right text-cyan-400"></i>
          </div>
          <p class="about-label">О себе</p>
        </div>
        <p v-if="aboutYourself" class="about-text">
          {{ aboutYourself }}
        </p>
        <p v-else class="about-placeholder">
          <i class="fas fa-pen text-slate-500 mr-2"></i>
          Расскажите о себе...
        </p>
      </div>

      <!-- CTA Button -->
      <div v-if="bioCompletionPercentage < 100" class="cta-container">
        <NuxtLink to="/profile/settings" class="cta-button">
          <span class="cta-gradient"></span>
          <span class="cta-content">
            <i class="fas fa-plus mr-2"></i>
            <span class="hidden sm:inline">Добавить информацию</span>
            <span class="sm:hidden">Добавить</span>
          </span>
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
  @apply p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/20 
         backdrop-blur-sm mb-8 hover:border-cyan-500/30 transition-all duration-300;
}

.section-header {
  @apply flex flex-col sm:flex-row items-start sm:items-center 
         justify-between gap-4 mb-8 pb-6 border-b border-cyan-500/10;
}

.header-title {
  @apply flex items-center gap-3;
}

.title-icon-wrapper {
  @apply w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
         flex items-center justify-center text-xl;
}

.title-text {
  @apply text-2xl font-bold text-white;
}

.progress-wrapper {
  @apply flex items-center gap-3 sm:gap-4;
}

.progress-label {
  @apply text-slate-400 text-sm whitespace-nowrap;
}

.progress-bar-container {
  @apply flex items-center gap-3;
}

.progress-bar-bg {
  @apply w-24 sm:w-32 bg-slate-800/50 rounded-full h-2.5 border border-slate-700/50 
         overflow-hidden;
}

.progress-bar-fill {
  @apply h-full rounded-full transition-all duration-500 ease-out
         bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
         shadow-lg shadow-cyan-500/50;
}

.progress-percentage {
  @apply text-cyan-400 text-sm font-bold whitespace-nowrap;
}

.loading-state {
  @apply flex items-center justify-center py-24;
}

.loading-content {
  @apply flex flex-col items-center text-center;
}

.bio-content {
  @apply space-y-6;
}

.info-cards-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4;
}

.about-card {
  @apply p-6 sm:p-8 rounded-xl bg-slate-800/30 border border-slate-700/50 
         hover:border-cyan-500/30 transition-all duration-300;
}

.about-header {
  @apply flex items-center gap-4 mb-4;
}

.about-icon-wrapper {
  @apply w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 
         flex items-center justify-center;
}

.about-label {
  @apply text-slate-400 font-medium;
}

.about-text {
  @apply text-white text-base leading-relaxed whitespace-pre-line;
}

.about-placeholder {
  @apply text-slate-500 text-sm italic flex items-center;
}

.cta-container {
  @apply flex justify-center sm:justify-start pt-2;
}

.cta-button {
  @apply relative inline-flex items-center justify-center 
         px-8 py-3 rounded-xl overflow-hidden 
         transition-all duration-300 hover:scale-105 
         hover:shadow-lg hover:shadow-cyan-500/25;
}

.cta-gradient {
  @apply absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500;
}

.cta-button:hover .cta-gradient {
  @apply scale-110;
}

.cta-content {
  @apply relative z-10 text-white font-medium flex items-center;
}

@media (max-width: 640px) {
  .bio-section-container {
    @apply p-4;
  }

  .section-header {
    @apply pb-4;
  }

  .title-icon-wrapper {
    @apply w-10 h-10;
  }

  .title-text {
    @apply text-xl;
  }

  .about-card {
    @apply p-4;
  }
}
</style>
