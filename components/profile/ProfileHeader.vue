<template>
  <div
    class="min-h-[300px] bg-gradient-to-br from-[#1A1F35]/80 to-[#1E293B]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-12 mb-8 shadow-2xl relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div
      class="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"
    ></div>

    <div
      class="relative flex flex-col items-center lg:items-start lg:flex-row gap-8 lg:gap-12"
    >
      <!-- Avatar Section - Centered on mobile -->
      <div class="relative group">
        <UserAvatar
          :avatarUrl="avatarUrl"
          :loading="loading"
          :userInitial="userInitial"
          @update:avatarUrl="$emit('update:avatarUrl', $event)"
          @notify="$emit('notify', $event)"
          class="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-[#0EA5E9]/30 transition-all duration-300 group-hover:scale-105 shadow-xl"
        />
      </div>

      <!-- User Info & Actions -->
      <div
        class="flex-1 flex flex-col items-center lg:items-start space-y-6 lg:space-y-8 w-full"
      >
        <!-- User Details - Centered on mobile -->
        <div class="text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl font-bold text-white/90 mb-3">
            {{ displayName }}
          </h1>
          <p class="text-lg sm:text-xl text-slate-300 font-medium">
            {{ email }}
          </p>
        </div>

        <!-- Action Buttons - Full width on mobile -->
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto"
        >
          <!-- Personal Cabinet - Primary Button -->
          <Button
            to="/personal-cabinet"
            text="Личный кабинет"
            iconClass="fas fa-user-cog"
            gradientStart="#0EA5E9"
            gradientEnd="#E879F9"
            textColor="#0EA5E9"
            borderColor="#0EA5E9"
            customClass="flex-1 lg:flex-initial border-[#0EA5E9]/20"
          />

          <!-- Settings Button -->
          <Button
            to="/profile/settings"
            text="Настройки"
            iconClass="fas fa-cog"
            gradientStart="#0EA5E9"
            gradientEnd="#E879F9"
            textColor="#0EA5E9"
            borderColor="#0EA5E9"
            customClass="flex-1 lg:flex-initial border-[#0EA5E9]/20"
            :translateClass="'-translate-x-[101%]'"
          />

          <!-- Logout Button -->
          <Button
            text="Выйти"
            iconClass="fas fa-sign-out-alt"
            gradientStart="#E879F9"
            gradientEnd="#E11D48"
            textColor="#E11D48"
            borderColor="#E11D48"
            customClass="flex-1 lg:flex-initial border-[#E11D48]/20"
            :isLink="false"
            @click="$emit('logout')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserAvatar from "~/components/profile/UserAvatar.vue";
import Button from "~/components/base/Button.vue";

// Define props for the ProfileHeader component
defineProps({
  avatarUrl: {
    type: String,
    default: null,
    description: "URL of the user's avatar image",
  },
  loading: {
    type: Boolean,
    default: false,
    description: "Indicates if the avatar or user data is still loading",
  },
  displayName: {
    type: String,
    required: true,
    description: "User's display name to be shown in the header",
  },
  email: {
    type: String,
    required: true,
    description: "User's email address to be displayed",
  },
  userInitial: {
    type: String,
    default: "",
    description:
      "Initial letter of the user's display name for the avatar fallback",
  },
});

// Define emits for the component
defineEmits([
  "update:avatarUrl", // Emitted when the avatar URL is updated
  "logout", // Emitted when the logout button is clicked
  "notify",
]);
</script>
