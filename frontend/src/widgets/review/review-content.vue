<script setup lang="ts">
import { MdPreview } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import { AlertCircle } from 'lucide-vue-next'
import { onMounted, watch } from "vue"
import { useArticleStore } from '@/entities/Article/ArticleStore.ts'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  articleId?: string
  revisionId?: string
  hideCatalog?: boolean
  hideTitle?: boolean
  hideEdit?: boolean
  hideHistory?: boolean
}>()

const articleStore = useArticleStore()
const { article, loading, error } = storeToRefs(articleStore)

const loadArticle = async () => {
  await articleStore.fetchArticleByRevision(props.revisionId)
}

onMounted(loadArticle)

watch(() => [props.articleId, props.revisionId], loadArticle)

</script>

<template>
  <div class="bg-gray-900 rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <Skeleton v-if="loading" width="70%" height="2rem" class="mb-2" />
      <h1 v-else-if="article && !hideTitle" class="text-2xl font-bold mb-4 text-white">{{ article.title }}</h1>

      <div v-if="loading" class="space-y-4">
        <Skeleton v-for="i in 3" :key="i" width="100%" height="1.5rem" />
      </div>

      <div v-else-if="error" class="flex items-center p-4 bg-red-100 text-red-700 rounded-lg">
        <AlertCircle class="w-6 h-6 mr-2" />
        <span>{{ error }}</span>
      </div>
      <div v-else-if="article" class="markdown-content">
        <MdPreview
            :modelValue="article.content?.toString()"
            :id="article.id"
            theme="dark"
            previewTheme="github"
            language="en-US"
            style="background: transparent;"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>