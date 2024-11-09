<script setup lang="ts">
defineProps({
  // Пропсы могут быть добавлены для гибкости, например, для динамического изменения текста
  text: String
});
</script>

<template>
  <li class="text-xs md:text-base lg:text-lg xl:text-xl text-white font-light mb-2">
    {{ text }}
  </li>
</template>

<style scoped>
</style>
