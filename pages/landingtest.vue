<template>
  <div class="mt-24 max-w-md mx-auto text-white">
    <h1 class="text-2xl font-bold text-center">User Authentication</h1>

    <!-- Registration Form -->
    <div class="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold mb-4">Register</h2>
      <form @submit.prevent="registerUser" class="space-y-4">
        <input
          v-model="user.name"
          placeholder="First Name"
          class="input"
          required
        />
        <input
          v-model="user.email"
          type="email"
          placeholder="Email"
          class="input"
          required
        />
        <input
          v-model="user.password"
          type="password"
          placeholder="Password"
          class="input"
          required
        />
        <button type="submit" class="btn">Register</button>
      </form>
      <p v-if="message" class="text-green-400 mt-2">{{ message }}</p>
      <p v-if="errorMessage" class="text-red-400 mt-2">{{ errorMessage }}</p>
    </div>

    <!-- Login Form -->
    <div class="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold mb-4">Login</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <input
          v-model="login.email"
          type="email"
          placeholder="Email"
          class="input"
          required
        />
        <input
          v-model="login.password"
          type="password"
          placeholder="Password"
          class="input"
          required
        />
        <button type="submit" class="btn">Login</button>
      </form>
      <p v-if="loginMessage" class="text-green-400 mt-2">{{ loginMessage }}</p>
      <p v-if="loginErrorMessage" class="text-red-400 mt-2">
        {{ loginErrorMessage }}
      </p>
    </div>

    <!-- Display User Details -->
    <div
      v-if="userData"
      class="mt-8 bg-gray-900 p-6 rounded-lg shadow-lg text-center"
    >
      <h2 class="text-xl font-bold">Welcome, {{ userData.first_name }}</h2>
      <p class="text-gray-300">Email: {{ userData.email }}</p>
      <button @click="logout" class="btn mt-4">Logout</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

// State Variables
const API_URL = "http://localhost:8055";
const user = reactive({ name: "", email: "", password: "" });
const message = ref("");
const errorMessage = ref("");
const login = reactive({ email: "", password: "" });
const loginMessage = ref("");
const loginErrorMessage = ref("");
const userData = ref(null); // Stores logged-in user data

// Register User
const registerUser = async () => {
  message.value = "";
  errorMessage.value = "";
  try {
    await axios.post(`${API_URL}/users`, {
      first_name: user.name,
      email: user.email,
      password: user.password,
    });
    message.value = "User registered successfully!";
    user.name = "";
    user.email = "";
    user.password = "";
  } catch (err) {
    errorMessage.value =
      err.response?.data?.errors?.[0]?.message || "Registration failed.";
    console.error("Error registering user:", err);
  }
};

// Login User
const loginUser = async () => {
  loginMessage.value = "";
  loginErrorMessage.value = "";
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: login.email,
      password: login.password,
    });

    // Store token
    const token = response.data.data.access_token;
    localStorage.setItem("directus_token", token);

    loginMessage.value = "Login successful!";
    login.email = "";
    login.password = "";

    // Fetch user details
    await fetchUserData();
  } catch (err) {
    loginErrorMessage.value =
      err.response?.data?.errors?.[0]?.message || "Login failed.";
    console.error("Error logging in:", err);
  }
};

// Fetch User Data
const fetchUserData = async () => {
  const token = localStorage.getItem("directus_token");
  if (!token) return;

  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    userData.value = response.data.data; // Store user info
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
};

// Logout User
const logout = () => {
  localStorage.removeItem("directus_token");
  userData.value = null;
  loginMessage.value = "Logged out successfully.";
};

// Auto-fetch user data on page load if already logged in
onMounted(fetchUserData);
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded-lg text-black;
}
.btn {
  @apply bg-blue-500 w-full p-2 text-white rounded-lg hover:bg-blue-600 transition;
}
</style>
