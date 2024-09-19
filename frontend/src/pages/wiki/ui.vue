<script setup lang="ts">
import WikiContent from "../../widgets/wiki-content/ui.vue"
</script>

<template>
    <div class="content">
      <WikiContent />
    </div>
</template>

<style scoped>

.content{
  position: relative;
  margin-top: 7rem;
  min-height: calc(100vh - 5rem);
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  flex-direction: row;
  background: var(--background-color);
}

</style>