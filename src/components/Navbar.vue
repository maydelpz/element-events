<template>
  <nav class="bg-[#ffffffd5] p-3 mx-12 my-5 rounded-full">
    <div class="flex items-center">
      <ul class="flex justify-center flex-grow space-x-8">
        <li>
          <a href="/" class="text-black text-base hover:underline">Inicio</a>
        </li>
        <DropdownButton
          buttonText="Panel de registros"
          :menuItems="registerItems"
          buttonClasses="text-black text-base hover:underline flex items-center"
        />
      </ul>
      <ProfileButton />
    </div>
  </nav>
</template>

<script setup>
import DropdownButton from "./DropdownButton.vue";

const registerItems = [
  {
    text: "Registrar Compañía",
    href: "/registercompany",
    icon: "fas fa-building",
  },
  {
    text: "Registrar Empresa",
    href: "/registerenterprise",
    icon: "fas fa-briefcase",
  },
];
</script>
