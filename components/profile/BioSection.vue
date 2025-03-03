<template>
  <div
    class="bg-gradient-to-b from-[#1A1F35]/60 to-[#1E293B]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 shadow-2xl"
  >
    <!-- Title and Progress Bar -->
    <div
      class="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8 mb-8"
    >
      <h2 class="text-2xl font-bold text-white/90 flex-shrink-0">
        <i class="fas fa-user-edit text-[#0EA5E9] mr-3"></i>О себе
      </h2>
      <div class="w-full sm:w-auto flex items-center gap-4 sm:gap-4">
        <span class="text-slate-400 text-sm whitespace-nowrap">Заполнено:</span>
        <div class="w-24 sm:w-32 bg-[#1A1F35]/40 rounded-full h-2 flex-grow">
          <div
            class="bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] h-2 rounded-full transition-all duration-500"
            :style="{ width: bioCompletionPercentage + '%' }"
          ></div>
        </div>
        <span class="text-slate-300 text-sm font-medium whitespace-nowrap">
          {{ bioCompletionPercentage }}%
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center h-64">
      <i class="fas fa-spinner fa-spin text-4xl text-[#0EA5E9] mb-4"></i>
      <p class="text-slate-300">Загрузка данных...</p>
    </div>

    <!-- Bio Data -->
    <div v-else class="space-y-8">
      <!-- Info Cards Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
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

      <!-- About Text -->
      <div class="bg-[#1A1F35]/40 p-6 sm:p-8 rounded-2xl border border-white/5">
        <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center"
          >
            <i class="fas fa-quote-right text-[#0EA5E9] text-lg sm:text-xl"></i>
          </div>
          <p class="text-slate-400 font-medium text-base sm:text-lg">О себе</p>
        </div>
        <p
          v-if="aboutYourself"
          class="text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-line"
        >
          {{ aboutYourself }}
        </p>
        <p v-else class="text-slate-400 text-sm">Расскажите о себе...</p>
      </div>

      <!-- CTA to Fill Missing Data -->
      <div v-if="bioCompletionPercentage < 100" class="text-center">
        <NuxtLink
          to="/profile/settings"
          class="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 overflow-hidden font-medium transition-all duration-300 ease-out rounded-xl backdrop-blur-sm border border-[#0EA5E9]/20 hover:shadow-lg"
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] group-hover:translate-x-0 ease"
          >
            <i class="fas fa-plus"></i>
          </span>
          <span
            class="absolute flex items-center justify-center w-full h-full text-[#0EA5E9] transition-all duration-300 transform group-hover:translate-x-full ease"
          >
            <i class="fas fa-plus mr-2"></i>Добавить информацию
          </span>
          <span class="relative invisible">Добавить информацию</span>
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
  return (filledFields / fields.length) * 100;
});
</script>
