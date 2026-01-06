<template>
  <div class="relative group rounded-full" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- Avatar with Image -->
    <div v-if="avatarUrl && !loading" class="avatar-container">
      <nuxt-img :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover" :width="size" :height="size"
        loading="lazy" format="webp" quality="90" />
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="avatar-placeholder">
      <i class="fas fa-spinner fa-spin text-mindqlab-calm-accent"
        :style="{ fontSize: Math.max(size * 0.3) + 'px' }"></i>
    </div>

    <!-- Initial State -->
    <div v-else class="avatar-placeholder">
      <span class="font-bold text-mindqlab-calm-accent" :style="{ fontSize: Math.max(size * 0.4) + 'px' }">
        {{ userInitial }}
      </span>
    </div>

    <!-- Upload Overlay (Conditional) -->
    <label v-if="!noUpload" class="upload-overlay">
      <input type="file" @change="onFileChange"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml" class="hidden" />
      <div class="upload-overlay-content">
        <div class="upload-icon-wrapper">
          <i class="fas fa-camera text-2xl"></i>
          <span class="text-sm font-medium">Изменить фото</span>
        </div>
      </div>
    </label>
  </div>
</template>

<script setup>
import { getAuth } from "firebase/auth";
import { updateUserAvatarUrl } from "~/api/firebase/userProfile";

const props = defineProps({
  avatarUrl: String,
  loading: Boolean,
  userInitial: String,
  size: {
    type: Number,
    default: 170,
  },
  noUpload: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:avatarUrl", "notify"]);

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = await uploadAvatar(file);
    if (url) {
      emit("update:avatarUrl", url);
      console.log("Avatar uploaded successfully:", url);
    }
  }
};

const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=b19c8d945e3c37e4760b8ce4cf983904",
      { method: "POST", body: formData }
    );
    const result = await response.json();

    if (!result.success) throw new Error("Image upload failed");

    const { uid } = getAuth().currentUser;
    const { success, message } = await updateUserAvatarUrl(
      uid,
      result.data.url
    );

    if (success) {
      emit("notify", { message: "Аватар успешно обновлен!", type: "success" });
      return result.data.url;
    } else {
      console.error("Avatar update failed:", message);
      emit("notify", { message: `Ошибка: ${message}`, type: "error" });
    }
  } catch (error) {
    console.error("Avatar upload error:", error.message);
    emit("notify", {
      message: "Ошибка обновления аватара. Пожалуйста, попробуйте еще раз.",
      type: "error",
    });
  }
};
</script>

<style lang="postcss" scoped>
.avatar-container {
  @apply w-full h-full rounded-full overflow-hidden ring-4 ring-mindqlab-calm-accent/20 ring-offset-4 ring-offset-mindqlab-calm-bg dark:ring-offset-mindqlab-calm-dark-bg transition-all duration-500 group-hover:ring-mindqlab-calm-accent/40 group-hover:scale-105;
}

.avatar-placeholder {
  @apply w-full h-full rounded-full bg-stone-100 dark:bg-stone-800/30 flex items-center justify-center ring-4 ring-mindqlab-calm-accent/20 ring-offset-4 ring-offset-mindqlab-calm-bg dark:ring-offset-mindqlab-calm-dark-bg border border-stone-200 dark:border-stone-700/50 transition-all duration-500 group-hover:border-mindqlab-calm-accent/30;
}

.upload-overlay {
  @apply absolute inset-0 w-full h-full cursor-pointer rounded-full;
}

.upload-overlay-content {
  @apply absolute inset-0 bg-stone-900/60 dark:bg-stone-100/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm;
}

.upload-icon-wrapper {
  @apply text-white dark:text-stone-900 flex flex-col items-center gap-2 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0 capitalize;
}

.upload-icon-wrapper i {
  @apply text-xl opacity-80;
}

.upload-icon-wrapper span {
  @apply text-[10px] font-medium tracking-[0.2em] uppercase;
}
</style>
