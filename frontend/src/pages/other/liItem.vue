<script setup lang="ts">
defineProps({
  // Пропсы могут быть добавлены для гибкости, например, для динамического изменения текста
  text: String
});
</script>

<template>
  <li class="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light mb-2">
    {{ text }}
  </li>
</template>

<style scoped>
</style>
