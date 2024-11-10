<script setup lang="ts">
import { type NavTreeNode } from "@/entities/NavTree/model/types.ts";
import { useCategoryArticlesStore } from "@/entities/CategoryArticles";

const props = defineProps<{
  node: NavTreeNode
}>();

const categoryArticlesStore = useCategoryArticlesStore();
</script>

<template>
  <li class="py-2 w-fit">
    <div class="flex group">
      <router-link
          v-if="node.uri"
          :to="node.uri.toString()"
          class="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
      >
        {{ node.label }}
      </router-link>

      <span
          v-else
          class="text-white font-medium text-base"
      >
        {{ node.label }}
      </span>

      <!--      <span
          v-for="categoryArticles in categoryArticlesStore.loadCategoryArticles(node.label.toString())"
          class="ml-2 text-gray-500 text-sm"
      >
        {{ categoryArticles.toString() }}
      </span>-->
    </div>

    <ul
        v-if="node.children && node.children.length > 0"
        class="ml-2 mt-1 border-l border-gray-800"
    >
      <recursive-nav
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          class="pl-4"
      />
    </ul>
  </li>
</template>

<style scoped>
:deep(.router-link-active) {
  @apply text-white;
}
</style>