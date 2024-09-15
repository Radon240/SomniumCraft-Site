<script setup lang="ts">

import TopNavigationButton from "./TopNavigationButton.vue";
</script>

<template>
  <ul>
    <li><TopNavigationButton content="Главная" /></li>
    <li><TopNavigationButton content="Вики" /></li>
    <li><TopNavigationButton content="Карта" /></li>
    <li><TopNavigationButton content="Прочее"/></li>
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 1rem 1rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

li {
  margin: 0.5rem;
  flex: 1 1 auto;
  min-width: fit-content;
}
</style>