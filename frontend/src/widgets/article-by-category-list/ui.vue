<script setup lang="ts">

import NavTreeComponent from "../nav-tree/ui.vue"
import {useNavTreeStore} from "../../entities/NavTree";

const navTreeStore = useNavTreeStore()
navTreeStore.loadNavTree()
</script>

<template>
  <div>
    <NavTreeComponent :navTree="navTreeStore.navTree" />
  </div>
</template>

<style scoped>

</style>