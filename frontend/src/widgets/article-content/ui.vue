<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/entities/Article/ArticleStore.ts'
import { MdCatalog, MdPreview } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'

const articleStore = useArticleStore()
const { article, loading, error } = storeToRefs(articleStore)
</script>

<template>
  <Card>
    <template #title>
      <Skeleton v-if="loading" width="70%" height="2rem" class="mb-2" />
      <h1 v-else-if="article">{{ article.title }}</h1>
    </template>
    <template #content>
      <div v-if="loading" class="space-y-4">
        <Skeleton width="100%" height="2.5rem" />
      </div>
      <div v-else-if="error" class="text-red-500">
        {{ error }}
      </div>
      <div v-else-if="article" class="flex justify-center">
        <MdPreview
            v-model="article.content"
            :id="article.id"
            theme="dark"
            previewTheme="default"
        />
        <MdCatalog
            :editor="article.id"
            v-model="article.content"
            scrollElement="scrollElement"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.article {
  @apply max-w-3xl mx-auto p-5;
}

h1 {
  @apply text-4xl mb-5;
}

:deep(h2) {
  @apply text-2xl mt-8 mb-4;
}

:deep(h3) {
  @apply text-xl mt-6 mb-3;
}

:deep(p) {
  @apply mb-4 leading-relaxed;
}

:deep(ul), :deep(ol) {
  @apply mb-4 pl-8;
}

:deep(li) {
  @apply mb-1;
}

:deep(code) {
  @apply bg-gray-100 px-1 py-0.5 rounded;
}

:deep(pre) {
  @apply bg-gray-100 p-4 rounded overflow-x-auto;
}

:deep(blockquote) {
  @apply border-l-4 border-gray-300 pl-4 ml-0 italic;
}
</style>