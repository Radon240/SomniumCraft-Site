<script setup lang="ts">
import { type NavTree } from "@/entities/NavTree/model/types.ts";
import TreeNav from "./recursiveNav.vue";

const props = defineProps<{
  navTree: NavTree
}>();
</script>

<template>
  <nav class="m-4 w-fit">
    <ul>
      <TreeNav
          v-for="node in navTree.rootNodes"
          :key="node.id"
          :node="node"
      />
    </ul>
  </nav>
</template>