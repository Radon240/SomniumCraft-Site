<script setup lang="ts">
import {type NavTree} from "../../entities/nav-tree/model/types.ts";
import TreeNav from "./recursiveNav.vue";

const props = defineProps<{
  navTree: NavTree
}>();
</script>

<template>
  <div class="nav-container">
    <ul>
      <TreeNav
          v-for="node in props.navTree.rootNodes"
          :key="node.id"
          :node="node" />
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
}

.nav-container {
  margin: 20px;

  width: 25%;
  color: var(--white)
}
</style>
