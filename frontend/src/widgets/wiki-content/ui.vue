<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/entities/Article/ArticleStore.ts'
import Article from "@/widgets/article-content/ui.vue";
import ArticlesList from "@/widgets/article-by-category-list/ui.vue";

const route = useRoute()
const articleStore = useArticleStore()

watch(
    () => route.params.articleTitle,
    async (newArticleTitle) => {
      if (newArticleTitle) {
        await articleStore.fetchArticle(newArticleTitle as string)
      }
    },
    { immediate: true }
)
</script>

<template>
  <div class="flex gap-2">
    <ArticlesList/>
    <Article />
  </div>
</template>