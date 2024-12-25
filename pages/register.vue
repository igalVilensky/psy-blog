<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-semibold mb-6 text-center">Register</h1>

      <!-- Registration form -->
      <form @submit.prevent="registerUser">
        <!-- Email input with Tailwind styling -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            autocomplete="email"
            required
            class="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Password input with Tailwind styling -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            autocomplete="new-password"
            required
            class="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Confirm Password input with Tailwind styling -->
        <div class="mb-4">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            class="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Error message -->
        <div v-if="error" class="text-sm text-red-500 mb-4">{{ error }}</div>

        <!-- Submit button -->
        <div>
          <button
            type="submit"
            class="w-full py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-4 text-center text-sm">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:text-blue-700"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();

const registerUser = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  const auth = getAuth();
  error.value = ""; // Reset error message

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/login"); // Redirect to login page after successful registration
  } catch (err) {
    error.value = err.message; // Show error message
  }
};
</script>
