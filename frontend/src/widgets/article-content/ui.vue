<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/entities/Article/ArticleStore.ts'
import { marked } from 'marked'
import { computed } from 'vue'

const articleStore = useArticleStore()
const { article, loading, error } = storeToRefs(articleStore)

// Create a computed property for the rendered HTML
const renderedContent = computed(() => {
  if (article.value && article.value.content) {
    return marked(article.value.content)
  }
  return ''
})
</script>

<template>
  <div class="article">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <article v-else-if="article">
      <h1>{{ article.title }}</h1>
      <div v-html="renderedContent"></div>
    </article>
  </div>
</template>

<style scoped>
.article {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

/* Add some basic styling for Markdown content */
:deep(h2) {
  font-size: 1.8em;
  margin-top: 30px;
  margin-bottom: 15px;
}

:deep(h3) {
  font-size: 1.5em;
  margin-top: 25px;
  margin-bottom: 10px;
}

:deep(p) {
  margin-bottom: 15px;
  line-height: 1.6;
}

:deep(ul), :deep(ol) {
  margin-bottom: 15px;
  padding-left: 30px;
}

:deep(li) {
  margin-bottom: 5px;
}

:deep(code) {
  background-color: #f4f4f4;
  padding: 2px 4px;
  border-radius: 4px;
}

:deep(pre) {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

:deep(blockquote) {
  border-left: 4px solid #ccc;
  padding-left: 15px;
  margin-left: 0;
  font-style: italic;
}
</style>