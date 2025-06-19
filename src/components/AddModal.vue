<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
      <!-- Encabezado -->
      <div
        class="border-b border-gray-200 p-4 flex justify-between items-center"
      >
        <h2 class="text-xl text-gray-800">{{ title }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Slot para contenido personalizado -->
      <div class="p-6">
        <slot></slot>
      </div>

      <!-- Botones -->
      <div class="py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl">
        <button
          @click="save"
          class="w-full justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-[#9EC18C] text-base font-medium text-white hover:bg-[#91b180] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: "Nuevo registro",
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const close = () => {
  emit("update:modelValue", false);
};

const save = () => {
  emit("save");
};
</script>
