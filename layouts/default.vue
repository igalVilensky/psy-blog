<template>
  <div class="overflow-hidden">
    <div ref="topBar" class="top-bar">
      <TopBar />
    </div>

    <main ref="mainContent" :style="{ height: `${mainHeight}px` }">
      <NuxtPage />
    </main>

    <div ref="footer" class="footer">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import TopBar from "@/components/ui/TopBar.vue";
import Footer from "@/components/ui/Footer.vue";

const topBarHeight = ref(0);
const footerHeight = ref(0);
const mainHeight = ref(window.innerHeight);

const updateHeights = () => {
  const topBar = document.querySelector(".top-bar");
  const footer = document.querySelector(".footer");

  topBarHeight.value = topBar.offsetHeight;
  footerHeight.value = footer.offsetHeight;
  mainHeight.value =
    window.innerHeight - (topBarHeight.value + footerHeight.value);
};

onMounted(() => {
  updateHeights();
  window.addEventListener("resize", updateHeights);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateHeights);
});
</script>
