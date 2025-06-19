<script setup>
import Navbar from "../components/Navbar.vue";
import AddModal from "../components/AddModal.vue";
import DeleteButton from "../components/DeleteButton.vue";
import { ref, onMounted, computed } from "vue";

const empresas = ref([]);
const searchQuery = ref("");
const showModal = ref(false);
const newEmpresa = ref({ nombre: "" });

// Simular carga de empresas
const loadEmpresas = async () => {
  empresas.value = [
    { id: "1", nombre: "Empresa Uno" },
    { id: "2", nombre: "Empresa Dos" },
  ];
};

// Simular eliminación
const deleteEmpresa = async (id) => {
  alert(`Empresa con ID ${id} eliminada (simulado)`);
  empresas.value = empresas.value.filter((e) => e.id !== id);
};

// Simular registro de nueva empresa
const submitEmpresa = async () => {
  const nombre = newEmpresa.value.nombre.trim();
  if (!nombre) {
    alert("El nombre de la empresa no puede estar vacío.");
    return;
  }

  alert(`Empresa "${nombre}" registrada (simulado)`);
  empresas.value.push({ id: Date.now().toString(), nombre });
  resetForm();
  showModal.value = false;
};

// Limpiar formulario
const resetForm = () => {
  newEmpresa.value = { nombre: "" };
};

onMounted(loadEmpresas);

const filteredEmpresas = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return query
    ? empresas.value.filter((e) => e.nombre.toLowerCase().includes(query))
    : empresas.value;
});
</script>

<template>
  <div class="min-h-screen bg-[#122C4F] flex flex-col">
    <Navbar />

    <div class="flex flex-col px-12 py-15 text-white">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <h1 class="text-4xl font-bold">Empresas</h1>

        <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div class="relative w-full md:w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar empresa"
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
            Agregar empresa
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
                  Empresas
                </th>
                <th class="py-4 px-6 font-medium text-black">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="empresa in filteredEmpresas"
                :key="empresa.id"
                class="hover:bg-white/5 transition-colors duration-150"
              >
                <td class="py-4 px-6 text-black">{{ empresa.nombre }}</td>
                <td class="py-4 px-6 text-center">
                  <DeleteButton
                    :entity-id="empresa.id"
                    :delete-function="deleteEmpresa"
                    entity-name="empresa"
                    success-message="Empresa eliminada"
                    @deleted="loadEmpresas"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <AddModal v-model="showModal" title="Nueva empresa" @save="submitEmpresa">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-medium mb-2"
          >Nombre de la empresa</label
        >
        <input
          v-model="newEmpresa.nombre"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          required
        />
      </div>
    </AddModal>
  </div>
</template>
