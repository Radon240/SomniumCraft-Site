<script setup lang="ts">
const props = defineProps<{
    href?: string
    content: string
  }>()

</script>

<template>
  <a @href="href">{{content}}</a>
</template>

<style scoped>
a {
  display: block;
  color: white;
  text-align: center;
  padding: 0.5rem 0.5rem;
  text-decoration: none;
  transition: padding-bottom 0.5s;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    padding: 0.5rem 0.5rem;
    border-radius: 20px;
    transition: background-color 0.5s;
    background-color: lightgray;
  }
}
</style>