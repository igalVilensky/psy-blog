<!-- components/FloatingButton.vue -->
<template>
  <div class="floating-button-container" :style="containerStyles"
    :class="[containerClass, { 'menu-active': showMenu }]">
    <!-- Main floating button -->
    <button :type="type" :class="[
      'floating-button',
      sizeClass,
      colorClass,
      { 'shadow-lg hover:shadow-xl': shadow, 'rounded-full': round },
      buttonClass,
      { 'pulse-animation': pulseAnimation },
    ]" :disabled="disabled" @click="handleClick" :aria-label="ariaLabel || tooltipText"
      :aria-expanded="showMenu ? 'true' : 'false'" v-tooltip="tooltipText && useDirective
        ? {
          content: tooltipText,
          trigger: tooltipTrigger,
          placement: tooltipPosition,
        }
        : null
        ">
      <!-- Icon slot -->
      <slot name="icon">
        <svg v-if="icon" :class="[
          iconClass,
          { 'transform rotate-45': showMenu && icon === 'plus' },
        ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          aria-hidden="true">
          <path :d="iconPaths[icon] || iconPaths.plus" />
        </svg>
      </slot>

      <!-- Default content -->
      <slot></slot>

      <!-- Custom tooltip implementation -->
      <span v-if="tooltipText && !useDirective" class="floating-tooltip" :class="tooltipPosition" role="tooltip">
        {{ tooltipText }}
      </span>
    </button>

    <!-- Menu -->
    <transition :name="menuTransition" @before-enter="beforeMenuEnter" @after-leave="afterMenuLeave">
      <div v-if="showMenu && menuItems.length" ref="menuRef" class="floating-menu"
        :class="[menuPositionClass, { 'z-50': showMenu }]" role="menu" aria-orientation="vertical">
        <button v-for="(item, index) in menuItems" :key="index" class="menu-item" @click="handleMenuItemClick(item)"
          role="menuitem" :tabindex="showMenu ? 0 : -1" :disabled="item.disabled">
          <component :is="item.icon" v-if="item.icon" class="menu-item-icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </button>
      </div>
    </transition>

    <!-- Backdrop for mobile -->
    <transition name="fade">
      <div v-if="showMenu && menuItems.length && showBackdrop" class="fixed inset-0 bg-black bg-opacity-25"
        @click="showMenu = false"></div>
    </transition>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";

// Props
const props = defineProps({
  position: {
    type: String,
    default: "bottom-right",
    validator: (value) =>
      ["bottom-right", "bottom-left", "top-right", "top-left"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["xs", "sm", "md", "lg", "xl"].includes(value),
  },
  color: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light",
        "custom",
      ].includes(value),
  },
  customColor: {
    type: String,
    default: "", // For hex or custom color values
  },
  icon: {
    type: String,
    default: "plus",
  },
  round: {
    type: Boolean,
    default: true,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tooltipText: {
    type: String,
    default: "",
  },
  tooltipTrigger: {
    type: String,
    default: "hover",
    validator: (value) => ["hover", "click", "focus"].includes(value),
  },
  tooltipPosition: {
    type: String,
    default: "left",
    validator: (value) => ["top", "bottom", "left", "right"].includes(value),
  },
  menuItems: {
    type: Array,
    default: () => [],
  },
  menuPosition: {
    type: String,
    default: "top", // Always open upward
    validator: (value) => ["auto", "top", "bottom"].includes(value),
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "button",
  },
  buttonClass: {
    type: [String, Array, Object],
    default: "",
  },
  containerClass: {
    type: [String, Array, Object],
    default: "",
  },
  ariaLabel: {
    type: String,
    default: "",
  },
  pulseAnimation: {
    type: Boolean,
    default: false,
  },
  showBackdrop: {
    type: Boolean,
    default: false,
  },
  useDirective: {
    type: Boolean,
    default: false, // Whether to use v-tooltip directive from a library
  },
  mobileBreakpoint: {
    type: Number,
    default: 640, // sm breakpoint
  },
});

// Emits
const emit = defineEmits([
  "click",
  "menu-open",
  "menu-close",
  "menu-item-click",
]);

// Refs
const showMenu = ref(false);
const menuRef = ref(null);
const isMobile = ref(false);

// Computed properties
const sizeClass = computed(
  () =>
  ({
    xs: "h-8 w-8 text-xs",
    sm: "h-10 w-10 text-sm",
    md: "h-12 w-12",
    lg: "h-16 w-16 text-lg",
    xl: "h-20 w-20 text-xl",
  }[props.size])
);

const colorClass = computed(() => {
  if (props.color === "custom" && props.customColor) {
    return ""; // Will use inline style for custom colors
  }

  return {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400",
    info: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400",
    dark: "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-700",
    light: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300",
  }[props.color];
});

const iconClass = computed(
  () =>
  ({
    xs: "h-4 w-4",
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
    xl: "h-8 w-8",
  }[props.size])
);

const containerStyles = computed(() => {
  const styles = {};

  // Position the container
  const [vertical, horizontal] = props.position.split("-");
  styles[vertical] = "1.5rem";
  styles[horizontal] = "1.5rem";

  // Add custom color if specified
  if (props.color === "custom" && props.customColor) {
    styles.backgroundColor = props.customColor;
    styles.color = getContrastColor(props.customColor);
  }

  return styles;
});

const menuPositionClass = computed(() => {
  // Always position menu above the button (top)
  return "bottom-full mb-2 origin-bottom";
});

const menuTransition = computed(() => {
  return "menu-scale";
});

// Methods
function handleClick(event) {
  if (props.menuItems.length) {
    toggleMenu();
  }
  emit("click", event);
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
  if (showMenu.value) {
    emit("menu-open");
    nextTick(() => {
      document.addEventListener("keydown", handleEscKey);
      if (props.closeOnClickOutside) {
        document.addEventListener("click", handleClickOutside);
      }
    });
  } else {
    emit("menu-close");
    document.removeEventListener("keydown", handleEscKey);
    document.removeEventListener("click", handleClickOutside);
  }
}

function handleMenuItemClick(item) {
  if (item.disabled) return;

  if (typeof item.action === "function") {
    item.action();
  }

  emit("menu-item-click", item);

  // Close the menu after item click unless specified otherwise
  if (item.closeMenuOnClick !== false) {
    showMenu.value = false;
  }
}

function handleEscKey(event) {
  if (props.closeOnEsc && event.key === "Escape" && showMenu.value) {
    showMenu.value = false;
  }
}

function handleClickOutside(event) {
  const container = document.querySelector(".floating-button-container");
  if (container && !container.contains(event.target) && showMenu.value) {
    showMenu.value = false;
  }
}

function beforeMenuEnter(el) {
  el.style.opacity = 0;
  el.style.transform = "scale(0.9)";
}

function afterMenuLeave() {
  document.removeEventListener("keydown", handleEscKey);
  document.removeEventListener("click", handleClickOutside);
}

function checkMobileView() {
  isMobile.value = window.innerWidth < props.mobileBreakpoint;
}

// Optional: Utility function to determine text color based on background
function getContrastColor(hexColor) {
  // Simple contrast checker
  if (!hexColor) return "white";

  // Convert hex to RGB
  let r, g, b;
  if (hexColor.length === 7) {
    r = parseInt(hexColor.substr(1, 2), 16);
    g = parseInt(hexColor.substr(3, 2), 16);
    b = parseInt(hexColor.substr(5, 2), 16);
  } else if (hexColor.length === 4) {
    r = parseInt(hexColor.substr(1, 1) + hexColor.substr(1, 1), 16);
    g = parseInt(hexColor.substr(2, 1) + hexColor.substr(2, 1), 16);
    b = parseInt(hexColor.substr(3, 1) + hexColor.substr(3, 1), 16);
  } else {
    return "white";
  }

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
}

// Additional icon paths
const iconPaths = {
  plus: "M12 5v14m-7-7h14",
  minus: "M5 12h14",
  help: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  menu: "M4 6h16M4 12h16M4 18h16",
  settings:
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  share:
    "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
  close: "M6 18L18 6M6 6l12 12",
};

// Lifecycle hooks
onMounted(() => {
  checkMobileView();
  window.addEventListener("resize", checkMobileView);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEscKey);
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", checkMobileView);
});

// Watch for clicks outside to close menu
watch(showMenu, (newVal) => {
  if (!newVal) {
    document.removeEventListener("keydown", handleEscKey);
    document.removeEventListener("click", handleClickOutside);
  }
});
</script>

<style scoped>
.floating-button-container {
  position: fixed;
  z-index: 40;
  transition: transform 0.3s ease;
}

.floating-button-container.menu-active {
  z-index: 50;
}

.floating-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateZ(0);

  /* Focus state */
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
}

/* Ripple effect */
.floating-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transform: scale(0);
  border-radius: 50%;
  transition: opacity 0.5s, transform 0.5s;
}

.floating-button:active::after {
  opacity: 1;
  transform: scale(2);
  transition: opacity 0s, transform 0s;
}

.floating-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
}

.floating-button svg {
  transition: transform 0.3s ease;
}

.pulse-animation {
  animation: pulse 2s infinite;
}

.floating-tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 50;
}

/* Tooltip positions */
.floating-tooltip.top {
  bottom: calc(100% + 0.75rem);
  left: 50%;
  transform: translateX(-50%) translateY(5px);
}

.floating-tooltip.bottom {
  top: calc(100% + 0.75rem);
  left: 50%;
  transform: translateX(-50%) translateY(-5px);
}

.floating-tooltip.left {
  right: calc(100% + 0.75rem);
  top: 50%;
  transform: translateY(-50%) translateX(5px);
}

.floating-tooltip.right {
  left: calc(100% + 0.75rem);
  top: 50%;
  transform: translateY(-50%) translateX(-5px);
}

/* Show tooltip on hover */
.floating-button:hover .floating-tooltip,
.floating-button:focus .floating-tooltip {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.floating-button:hover .floating-tooltip.left,
.floating-button:focus .floating-tooltip.left {
  transform: translateY(-50%) translateX(0);
}

.floating-button:hover .floating-tooltip.right,
.floating-button:focus .floating-tooltip.right {
  transform: translateY(-50%) translateX(0);
}

/* Menu styling */
.floating-menu {
  position: absolute;
  min-width: 180px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 0;
  overflow: hidden;
  transform-origin: bottom center;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.menu-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  transition: background-color 0.2s;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
}

.menu-item:hover,
.menu-item:focus {
  background-color: #f3f4f6;
  color: #000;
}

.menu-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: transparent;
}

.menu-item-icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
}

/* Menu transition animations */
.menu-scale-enter-active,
.menu-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-scale-enter-from,
.menu-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Pulse animation */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
  }
}

/* For Safari mobile support */
@supports (-webkit-touch-callout: none) {
  .floating-button:active::after {
    opacity: 1;
    transform: scale(2);
  }
}

/* Adjust for small screens */
@media (max-width: 640px) {
  .floating-menu {
    min-width: 220px;
    max-width: 90vw;
  }

  .menu-item {
    padding: 0.75rem 1rem;
  }
}
</style>
