<template>
  <button
    @click="handleClick"
    class="bg-[#9e2f2faf] hover:bg-[#9e2f2fc2] text-white px-6 py-1 rounded-full"
    :title="`Eliminar ${entityName}`"
  >
    <i class="fa-regular fa-trash-can"></i>
  </button>
</template>

<script setup>
import {
  confirmDelete,
  showError,
  showSuccess,
} from "../services/AlertService";

const props = defineProps({
  entityName: {
    type: String,
    default: "registro",
  },
  deleteFunction: {
    type: Function,
    required: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "El elemento ha sido eliminado",
  },
});

const emit = defineEmits(["deleted"]);

const handleClick = async () => {
  const result = await confirmDelete(props.entityName);

  if (result.isConfirmed) {
    try {
      await props.deleteFunction(props.entityId);
      await showSuccess(props.successMessage);
      emit("deleted");
    } catch (error) {
      showError(error.message);
    }
  }
};
</script>
