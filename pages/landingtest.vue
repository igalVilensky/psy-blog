<template>
  <div class="mt-24 text-white">
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="post in posts.data" :key="post.id">
        {{ post.title }}
      </li>
    </ul>

    <!-- User Registration Form -->
    <div class="mt-8">
      <h2 class="text-lg font-bold">Register New User</h2>
      <form @submit.prevent="registerUser" class="mt-4">
        <div class="mb-2">
          <input
            v-model="user.name"
            placeholder="First Name"
            class="p-2 text-black w-full"
            required
          />
        </div>
        <!-- <div class="mb-2">
          <input
            v-model="user.last_name"
            placeholder="Last Name"
            class="p-2 text-black w-full"
            required
          />
        </div>
        <div class="mb-2">
          <input
            v-model="user.email"
            type="email"
            placeholder="Email"
            class="p-2 text-black w-full"
            required
          />
        </div>
        <div class="mb-2">
          <input
            v-model="user.password"
            type="password"
            placeholder="Password"
            class="p-2 text-black w-full"
            required
          />
        </div> -->
        <button type="submit" class="bg-blue-500 px-4 py-2 text-white rounded">
          Register
        </button>
      </form>

      <p v-if="message" class="mt-2 text-green-400">{{ message }}</p>
      <p v-if="errorMessage" class="mt-2 text-red-400">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

// Fetch blog posts data
const { data: posts, error } = await useFetch(
  "http://localhost:8055/items/posts"
);

console.log(posts.value);
if (error.value) {
  console.error("Error fetching posts:", error.value);
}

// Define the reactive user object
const user = reactive({
  name: "",
  // last_name: "",
  // email: "",
  // password: "",
});

// State for messages
const message = ref("");
const errorMessage = ref("");

// User registration function
const registerUser = async () => {
  message.value = "";
  errorMessage.value = "";

  try {
    // Send a POST request to Directus API to create a new user with the token
    const response = await axios.post(
      "http://localhost:8055/items/users",
      {
        name: user.name,
        // last_name: user.last_name,
        // email: user.email,
        // password: user.password,
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyMWM5MmM5LWZmN2MtNDc0OS04M2U1LWY5MTFiZTNlMThhNyIsInJvbGUiOiI4M2I5MWFmZS0wNmVmLTRhMjYtOGQ0Ny0xNmM2YzlhMzg3N2IiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc0MDY3Nzg2MCwiZXhwIjoxNzQwNjc4NzYwLCJpc3MiOiJkaXJlY3R1cyJ9.8yC00nmA2Bm3Hyq7sEeKprvYcTmusZXgc8OOuPrzZrg",
          "Content-Type": "application/json",
        },
      }
    );

    message.value = "User registered successfully!";
    user.name = "";
    // user.last_name = "";
    // user.email = "";
    // user.password = "";
  } catch (err) {
    errorMessage.value = "Failed to register user.";
    console.error("Error registering user:", err);
  }
};
</script>
