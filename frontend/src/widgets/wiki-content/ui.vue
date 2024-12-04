<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/entities/Article/ArticleStore.ts'
import Article from "@/widgets/article-content/ui.vue";
import ArticleInfo from "@/widgets/article-info/ui.vue";

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
  <div class="flex flex-col md:flex-row gap-8">
    <ArticleInfo
        class="w-fit order-1"
        :articleId="articleStore.article?.id"
        :contributors="articleStore.article?.contributors"
        :lastEditDate="articleStore.article?.submittedTimestamp"
    />
    <Article class="w-full min-w-3/4 order-2" />
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .flex-col > * {
    width: 100%;
  }
}
</style>