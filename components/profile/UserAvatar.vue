<template>
  <div class="relative group">
    <!-- Avatar with Image -->
    <div
      v-if="avatarUrl && !loading"
      class="rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-[#1A1F35] ring-[#0EA5E9]/30 transition-all duration-300"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <nuxt-img
        :src="avatarUrl"
        alt="Avatar"
        class="w-full h-full object-cover"
        :width="loading ? size * 1.5 : size"
        :height="loading ? size * 1.5 : size"
        loading="lazy"
        format="webp"
        quality="90"
      />
    </div>

    <!-- Loading State -->
    <div
      v-else-if="loading"
      class="rounded-full bg-gradient-to-r from-[#0EA5E9]/10 to-[#E879F9]/10 flex items-center justify-center ring-4 ring-offset-4 ring-offset-[#1A1F35] ring-[#0EA5E9]/30"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <i
        class="fas fa-spinner fa-spin text-[#0EA5E9]"
        :style="{ fontSize: Math.max(size * 0.5) + 'px' }"
      ></i>
    </div>

    <!-- Initial State -->
    <div
      v-else
      class="rounded-full bg-gradient-to-r from-[#0EA5E9]/10 to-[#E879F9]/10 flex items-center justify-center ring-4 ring-offset-4 ring-offset-[#1A1F35] ring-[#0EA5E9]/30"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <span class="text-5xl font-bold text-[#0EA5E9]">
        {{ userInitial }}
      </span>
    </div>

    <!-- Upload Overlay (Conditional) -->
    <label
      v-if="!noUpload"
      class="absolute inset-0 w-full h-full cursor-pointer"
    >
      <input
        type="file"
        @change="onFileChange"
        accept="image/*"
        class="hidden"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/80 to-[#E879F9]/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
      >
        <div class="text-white flex flex-col items-center gap-2">
          <i class="fas fa-camera text-2xl"></i>
          <span class="text-sm font-medium">Change Photo</span>
        </div>
      </div>
    </label>

    <!-- PRO Badge (Conditional) -->
    <div v-if="!noUpload" class="absolute -top-2 -right-2">
      <div class="relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] rounded-full blur opacity-75"
        ></div>
        <div
          class="relative px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-[#0EA5E9] to-[#E879F9] text-white shadow-lg border border-white/20"
        >
          PRO
        </div>
      </div>
    </div>
  </div>

  <Notification
    v-if="notificationMessage"
    :message="notificationMessage"
    :type="notificationType"
    @close="hideNotification"
    class="z-50"
  />
</template>

<script setup>
import { getAuth } from "firebase/auth";
import Notification from "~/components/base/Notification.vue";
import { updateUserAvatarUrl } from "~/api/firebase/userProfile";
import { useNotification } from "@/composables/useNotification";

const {
  notificationMessage,
  notificationType,
  showNotification,
  hideNotification,
} = useNotification();

const props = defineProps({
  avatarUrl: String,
  loading: Boolean,
  userInitial: String,
  size: {
    type: Number,
    default: 170, // Default size if not provided
  },
  noUpload: {
    type: Boolean,
    default: false, // Default to allowing upload
  },
});

const emit = defineEmits(["update:avatarUrl"]);

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
      showNotification("Аватар успешно обновлен!", "success");
      return result.data.url;
    } else {
      console.error("Avatar update failed:", message);
    }
  } catch (error) {
    console.error("Avatar upload error:", error.message);
    showNotification(
      "Ошибка обновления аватара. Пожалуйста, попробуйте еще раз.",
      "error"
    );
  }
};
</script>
