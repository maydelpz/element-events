<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen bg-[#122C4F] flex flex-col">
    <Navbar />

    <div
      class="flex flex-1 justify-center items-center w-full gap-[350px] px-4"
    >
      <div
        class="max-w-[750px] text-white font-bold text-center flex flex-col justify-center"
      >
        <h1 class="text-4xl md:text-5xl mb-6">
          Bienvenido al Portal Corporativo
        </h1>
        <p class="text-lg md:text-xl">
          Accede de forma rápida y sencilla a las herramientas y recursos de tu
          área de trabajo.
        </p>
      </div>

      <img src="../assets/Homebg.png" alt="Home" class="w-auto max-h-[500px]" />
    </div>
  </div>
</template>
