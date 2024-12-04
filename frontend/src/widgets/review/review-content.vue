<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/entities/Article/ArticleStore.ts'
import { MdCatalog, MdPreview } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import Skeleton from 'primevue/skeleton'
import { AlertCircle } from 'lucide-vue-next'

const props = defineProps<{
  articleId?: string
  revisionId?: string
  hideCatalog?: boolean
  hideTitle?: boolean
  hideEdit?: boolean
  hideHistory?: boolean
}>()

const popup = ref()
const articleData: Ref<GetArticleResponse | undefined> = ref()
const loading = ref(true)
const error = ref()

const loadArticle = async () => {
  articleData.value = undefined
  loading.value = true

  try {
    error.value = undefined
    if (!props.revisionId) {
      if (props.articleId == undefined) return
      articleData.value = (await wikiApi.api.getArticle(props.articleId)).data
    } else
      articleData.value = (await wikiApi.api.getArticleByRevision(props.revisionId)).data
  } catch (err) {
    console.log(err)
    error.value = err
  }
  loading.value = false
}

const id = "preview-only"
const scrollElement = document.documentElement

</script>

<template>
  <div class="bg-gray-900 rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <Skeleton v-if="loading" width="70%" height="2rem" class="mb-2" />
      <h1 v-else-if="article" class="text-2xl font-bold mb-4">{{ article.title }}</h1>

      <div v-if="loading" class="space-y-4">
        <Skeleton v-for="i in 3" :key="i" width="100%" height="1.5rem" />
      </div>

      <div v-else-if="error" class="flex items-center p-4 bg-red-100 text-red-700 rounded-lg">
        <AlertCircle class="w-6 h-6 mr-2" />
        <span>{{ error }}</span>
      </div>

      <div v-else-if="article" class="markdown-content">
        <MdPreview
            :modelValue="article.content"
            :id="article.id"
            theme="dark"
            previewTheme="default"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>