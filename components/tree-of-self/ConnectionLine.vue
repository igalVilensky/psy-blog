<template>
  <g>
    <path
      :d="conn.path"
      stroke-width="1.5"
      class="path-line"
      :class="[
        { 'active-path': conn.active },
        getConnectionColumnClass(conn.from, conn.to),
        conn.active ? getActiveStrokeClass(conn.from, conn.to) : '',
      ]"
      :stroke-dasharray="conn.active ? '5,5' : '2,5'"
    />
    <circle
      v-if="conn.active"
      :class="getConnectionParticleClass(conn.columnType || conn.category)"
      r="2"
      opacity="0.8"
    >
      <animateMotion
        :path="conn.path"
        dur="2s"
        repeatCount="indefinite"
        rotate="auto"
      />
    </circle>
    <circle
      v-if="conn.active"
      :class="getConnectionParticleClass(conn.columnType || conn.category)"
      r="2"
      opacity="0.8"
    >
      <animateMotion
        :path="conn.path"
        dur="2.5s"
        repeatCount="indefinite"
        rotate="auto"
      />
    </circle>
    <circle
      v-if="conn.active"
      :class="getConnectionParticleClass(conn.columnType || conn.category)"
      r="2"
      opacity="0.8"
    >
      <animateMotion
        :path="conn.path"
        dur="3s"
        repeatCount="indefinite"
        rotate="auto"
      />
    </circle>
  </g>
</template>

<script setup>
import { defineProps } from "vue";

// Define props
defineProps({
  conn: {
    type: Object,
    required: true,
  },
  getConnectionColumnClass: {
    type: Function,
    required: true,
  },
  getActiveStrokeClass: {
    type: Function,
    required: true,
  },
  getConnectionParticleClass: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
.path-line {
  stroke: rgba(255, 255, 255, 0.15);
}
.path-left {
  stroke: rgba(59, 130, 246, 0.3);
}
.path-right {
  stroke: rgba(234, 179, 8, 0.3);
}
.path-center {
  stroke: rgba(34, 197, 94, 0.3);
}
.path-neutral {
  stroke: rgba(255, 255, 255, 0.15);
}
.active-path {
  stroke-dasharray: 5, 5;
  stroke-width: 2;
  stroke-opacity: 0.6;
}
</style>
