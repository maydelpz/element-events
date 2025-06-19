<script setup>
import Navbar from "../components/Navbar.vue";
import AddModal from "../components/AddModal.vue";
import DeleteButton from "../components/DeleteButton.vue";
import { ref, onMounted, computed } from "vue";

const compañías = ref([]);
const searchQuery = ref("");
const showModal = ref(false);
const newCompany = ref({ nombre: "" });

// Simular carga de compañías
const loadCompanies = async () => {
  compañías.value = [
    { id: "1", nombre: "Simulada S.A." },
    { id: "2", nombre: "EjemploCorp" },
  ];
};

// Simular eliminación
const deleteCompany = async (id) => {
  alert(`Compañía con ID ${id} eliminada (simulado)`);
  compañías.value = compañías.value.filter((c) => c.id !== id);
};

// Simular agregar
const submitCompany = async () => {
  const nombre = newCompany.value.nombre.trim();
  if (!nombre) {
    alert("El nombre de la compañía no puede estar vacío.");
    return;
  }

  alert(`Compañía "${nombre}" agregada (simulado)`);
  compañías.value.push({ id: Date.now().toString(), nombre });
  resetForm();
  showModal.value = false;
};

// Resetear formulario
const resetForm = () => {
  newCompany.value = { nombre: "" };
};

onMounted(loadCompanies);

const filteredCompanies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return query
    ? compañías.value.filter((c) => c.nombre.toLowerCase().includes(query))
    : compañías.value;
});
</script>


<template>
  <div class="min-h-screen bg-[#122C4F] flex flex-col">
    <Navbar />

    <div class="flex flex-col px-12 py-15 text-white">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <h1 class="text-4xl font-bold">Compañías</h1>

        <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div class="relative w-full md:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar compañía"
              class="w-full py-2 pl-4 pr-10 rounded-full bg-[#ffffffd5] text-gray-700 font-semibold placeholder-gray-500 outline-none"
            />
            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <i class="fa-solid fa-magnifying-glass"></i
            ></span>
          </div>

          <button
            @click="showModal = true"
            class="py-2 px-6 rounded-full bg-[#ffffffd5] text-gray-700 font-semibold hover:bg-gray-300 outline-none transition"
          >
            Agregar compañía
          </button>
        </div>
      </div>

      <div
        class="mt-6 bg-[#ffffffd5] rounded-xl overflow-hidden shadow-lg border border-white/10"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-black/10">
                <th class="py-4 px-6 text-left font-medium text-black">
                  Compañías
                </th>
                <th class="py-4 px-6 font-medium text-black">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="compañía in filteredCompanies"
                :key="compañía.id"
                class="hover:bg-white/5 transition-colors duration-150"
              >
                <td class="py-4 px-6 text-black">{{ compañía.nombre }}</td>
                <td class="py-4 px-6 text-center">
                  <DeleteButton
                    :entity-id="compañía.id"
                    :delete-function="deleteCompany"
                    entity-name="compañía"
                    success-message="La compañía ha sido eliminada"
                    @deleted="loadCompanies"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <AddModal v-model="showModal" title="Nueva compañía" @save="submitCompany">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-medium mb-2"
          >Nombre de la compañía</label
        >
        <input
          v-model="newCompany.nombre"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </AddModal>
  </div>
</template>
