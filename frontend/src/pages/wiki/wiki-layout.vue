<script setup lang="ts">
import { RouterView } from 'vue-router'
import ArticlesList from '@/widgets/article-by-category-list/ui.vue'
</script>

<template>
  <div class="mt-16 flex justify-between">
    <aside class="min-w-64 shadow-2xl shadow-black m-10">
      <ArticlesList />
    </aside>
    <div class="flex-1 overflow-y-auto p-8">
      <RouterView />
    </div>
  </div>
</template>