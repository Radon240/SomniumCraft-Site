<script setup lang="ts">

import BaseLayout from "../layouts/BaseLayout.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
</script>

<template>
  <BaseLayout>
    <template #header>
      <Header class="header" />
    </template>

    <template #default>

    </template>

    <template #footer>
      <Footer class="footer"/>
    </template>
  </BaseLayout>
</template>

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: initial;
  font-size: 1rem;
  height: 3rem;
  top: 0;
  position: sticky;
  background: var(--background-color);
}
.footer{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  height: 2rem;
  background: var(--background-color);
  bottom: 0;
}
</style>