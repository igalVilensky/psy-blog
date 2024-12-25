<template>
  <div>
    <h1>Firebase Initialization Test</h1>
    <p v-if="firebaseApp">Firebase App Initialized: {{ firebaseApp.name }}</p>
    <p v-if="auth">Firebase Auth Initialized</p>
    <p v-if="firestore">Firestore Initialized</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Inject Firebase services using the `useNuxtApp` function
const { $auth: auth, $firestore: firestore } = useNuxtApp();

// Create reactive references for Firebase services
const firebaseApp = ref(null);

// Using the injected auth service to get the Firebase app
onMounted(() => {
  firebaseApp.value = auth.app;
});
</script>
