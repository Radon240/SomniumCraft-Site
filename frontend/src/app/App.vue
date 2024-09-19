<script setup lang="ts">

import Header from "..//widgets/header/ui.vue"
import Footer from "..//widgets/footer/ui.vue"

</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the app takes at least the full viewport height */
}

</style>
