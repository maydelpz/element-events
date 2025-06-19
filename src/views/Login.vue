<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const email = ref("mayde@gmail.com");
const password = ref("123123");

const handleSubmit = async () => {
  if (!email.value || password.value.length <= 5) {
    return alert(
      "Todos los campos son obligatorios y la contraseña debe tener más de 5 caracteres"
    );
  }
  await userStore.loginUser(email.value, password.value);
};
</script>

<template>
  <div class="flex items-center justify-center min-h-[90vh] px-4">
    <div
      class="flex flex-col md:flex-row-reverse w-full max-w-[950px] bg-[#f7f7f7] border border-gray-200 rounded-lg shadow-md overflow-hidden"
    >
      <!-- Imagen -->
      <div class="w-full md:w-200">
        <img
          src="../assets/Loginbg.png"
          alt="Imagen de fondo"
          class="object-cover w-full h-full md:rounded-r-md"
        />
      </div>

      <!-- Formulario -->
      <div class="flex flex-col justify-center w-full md:w-1/2 p-6 md:p-8">
        <div class="text-center mb-12">
          <p class="text-4xl font-bold text-[#415672] mb-2">¡Bienvenido!</p>
          <p class="text-sm text-[#415672]">
            Inicia sesión para continuar con el sistema.
          </p>
        </div>

        <h5 class="text-lg font-bold mb-8">Inicia sesión</h5>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <input
              type="email"
              v-model.trim="email"
              placeholder="Email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-full outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              v-model.trim="password"
              placeholder="Contraseña"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-full outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 bg-[#415672] text-white rounded-full transition hover:bg-[#3f4f68]"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="text-center mt-4 text-sm text-gray-500">
    <p>© {{ new Date().getFullYear() }} IBS Consultores</p>
  </div>
</template>
