<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useHead, useRoute } from "#imports";

const route = useRoute();

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://www.mindqlab.com${route.path || "/"}`,
    },
  ],
});
</script>
