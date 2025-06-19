<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

const userStore = useUserStore();
const router = useRouter();

const dropdownOpen = ref(false);

const logout = () => {
  userStore.logoutUser();
  router.push("/login");
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <div>
    <!-- Muestra el nombre del usuario -->
    <span @click="toggleDropdown" class="cursor-pointer">
      {{ userStore.userData?.email }}
    </span>

    <ul
      v-if="dropdownOpen"
      class="absolute right-[80px] mt-2 bg-white rounded-md"
    >
      <li>
        <button
          @click="logout"
          class="w-full text-black hover:bg-gray-300 rounded-md pl-6 pr-6 py-2"
        >
          Cerrar sesión
        </button>
      </li>
    </ul>
  </div>
</template>
