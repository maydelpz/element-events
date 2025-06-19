<script setup>
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>

<template>
  <div>
    <nav v-if="!userStore.loadingSession"></nav>
    <div v-else class="home-page"></div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.home-page {
  background: #122c4f;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
