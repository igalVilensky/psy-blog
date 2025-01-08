<template>
  <div class="relative group">
    <div
      v-if="avatarUrl && !loading"
      class="w-24 h-24 rounded-full overflow-hidden ring-2 ring-offset-2 ring-gray-100"
    >
      <!-- Replace <img> with <nuxt-img> -->
      <nuxt-img
        :src="avatarUrl"
        alt="Avatar"
        class="w-full h-full object-cover"
        width="96"
        height="96"
        loading="lazy"
        format="webp"
        quality="80"
      />
    </div>

    <div
      v-else-if="loading"
      class="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center ring-2 ring-offset-2 ring-gray-100"
    >
      <i class="fas fa-spinner fa-spin fa-2x text-indigo-600"></i>
    </div>

    <div
      v-else
      class="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center ring-2 ring-offset-2 ring-gray-100"
    >
      <span class="text-3xl font-semibold text-indigo-600">
        {{ userInitial }}
      </span>
    </div>

    <label class="absolute inset-0 w-24 h-24 cursor-pointer">
      <input
        type="file"
        @change="onFileChange"
        accept="image/*"
        class="hidden"
      />
      <div
        class="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <i class="fas fa-camera text-white text-xl"></i>
      </div>
    </label>
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
