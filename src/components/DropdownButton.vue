<template>
  <div class="relative group" ref="dropdownRef">
    <!-- Botón principal -->
    <button
      class="text-black text-base flex items-center focus:outline-none"
      :class="buttonClasses"
      @click="toggleDropdown"
    >
      {{ buttonText }}
      <svg
        class="w-4 h-4 ml-1 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Menú desplegable -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isOpen"
        class="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
        :class="menuClasses"
      >
        <a
          v-for="(item, index) in menuItems"
          :key="index"
          :href="item.href"
          class="block px-4 py-2 text-sm hover:bg-gray-300"
          :class="itemClasses"
        >
          <i v-if="item.icon" :class="item.icon + ' mr-2'"></i>
          {{ item.text }}
        </a>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Dropdown",
  },
  buttonClasses: {
    type: String,
    default: "text-black hover:underline",
  },
  menuItems: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) => typeof item.text === "string" && typeof item.href === "string"
      );
    },
  },
  menuClasses: {
    type: String,
    default: "",
  },
  itemClasses: {
    type: String,
    default: "text-gray-700",
  },
});

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
