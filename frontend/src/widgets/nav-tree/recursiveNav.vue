<script setup lang="ts">
import {type NavTreeNode } from "../../entities/nav-tree/model/types.ts";
import {useCategoryArticlesStore} from "../../entities/CategoryArticles";

const props = defineProps<{
  node: NavTreeNode
}>();

const categoryArticlesStore = useCategoryArticlesStore()

</script>

<template>
  <li class="nav-item">
    <router-link v-if="node.uri" :to="node.uri.toString()" class="nav-link">
      {{ node.label }}
    </router-link>

    <span v-else class="nav-label">{{ node.label }}</span>

    <span v-for="categoryArticles in categoryArticlesStore.loadCategoryArticles(node.label.toString())">
      {{categoryArticles.toString()}}
    </span>

    <ul v-if="node.children && node.children.length > 0" class="nav-sublist">
      <recursive-nav
          v-for="child in node.children"
          :key="child.id"
          :node="child"
      />
    </ul>
  </li>
</template>

<style scoped>

.nav-item {
  list-style-type: none;
  text-decoration: none;
  margin: 8px 0;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  padding: 4px 0;
  display: block;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.nav-label {
  font-weight: bold;
  color: #333;
}

.nav-sublist {
  padding-left: 16px;
  margin-top: 8px;
  border-left: 1px solid #ddd;
}
</style>
