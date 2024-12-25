<template>
  <div>
    <h1>User Profile</h1>
    <p v-if="user">Hello, {{ user.displayName || "User" }}</p>
    <p v-else>Loading user data...</p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { getUserProfile } from "~/utils/firebase"; // Import getUserProfile function

const user = ref(null);
const router = useRouter();
const error = ref(null);

onMounted(async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      const userProfile = await getUserProfile(currentUser.uid); // Fetch user profile
      user.value = userProfile; // Set user data
    } catch (err) {
      error.value = "Failed to load user profile";
      console.error(err);
    }
  } else {
    router.push("/login"); // Redirect to login page if no user is authenticated
  }
});

const logoutUser = async () => {
  const auth = getAuth();
  await signOut(auth); // Log out the user
  router.push("/login"); // Redirect to login page after logout
};
</script>
