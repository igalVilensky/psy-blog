<template>
  <div>
    <h1>User Profile</h1>

    <!-- Show loading state or user data -->
    <p v-if="isLoading">Loading user data...</p>
    <p v-else-if="user">Hello, {{ user.displayName || "User" }}</p>
    <p v-else>User is not authenticated.</p>

    <!-- Logout button -->
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "#app"; // Nuxt's router for navigation
definePageMeta({
  middleware: "auth", // This ensures only authenticated users can access this page
});
// Reactive references
const user = ref(null);
const isLoading = ref(true);
const router = useRouter();

onMounted(() => {
  const auth = getAuth();

  // Get the currently logged-in user
  user.value = auth.currentUser;

  // If the user is available, stop loading
  if (user.value) {
    isLoading.value = false;
  } else {
    // Handle the case where no user is logged in (should be redirected by middleware)
    isLoading.value = false;
  }
});

const logoutUser = async () => {
  const auth = getAuth();

  try {
    await signOut(auth); // Log out the user
    router.push("/login"); // Redirect to login page
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};
</script>
