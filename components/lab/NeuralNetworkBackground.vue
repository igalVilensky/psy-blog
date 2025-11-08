<!-- components/lab/NeuralNetworkBackground.vue -->
<template>
  <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.1" />
        <stop offset="50%" stop-color="#a855f7" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.1" />
      </linearGradient>
    </defs>

    <!-- Animated neural connections -->
    <g v-for="(node, index) in nodes" :key="index">
      <circle
        :cx="node.x"
        :cy="node.y"
        r="1.5"
        fill="url(#neural-grad)"
        class="animate-pulse"
        :style="`animation-delay: ${index * 0.1}s;`"
      />

      <!-- Connections between nodes -->
      <line
        v-for="connection in node.connections"
        :key="connection"
        :x1="node.x"
        :y1="node.y"
        :x2="nodes[connection].x"
        :y2="nodes[connection].y"
        stroke="url(#neural-grad)"
        stroke-width="0.5"
        class="animate-pulse"
      />
    </g>
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";

const nodes = ref([]);

onMounted(() => {
  // Generate random neural network nodes
  const nodeCount = 30;
  const newNodes = [];

  for (let i = 0; i < nodeCount; i++) {
    const node = {
      x: Math.random() * 800,
      y: Math.random() * 500,
      connections: [],
    };

    // Create some random connections
    for (let j = 0; j < 3; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i) {
        node.connections.push(target);
      }
    }

    newNodes.push(node);
  }

  nodes.value = newNodes;
});
</script>
