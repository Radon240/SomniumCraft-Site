<script setup lang="ts">

</script>

<template>
  <header>
    <slot name="header" />
  </header>
  <div class="container">
    <slot />
  </div>
  <footer>
    <slot name="footer" />
  </footer>
</template>

<style scoped>
.container{
  min-height: calc(100vh - 5rem);
}
  header{
  }
</style>