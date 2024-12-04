<script setup lang="ts">

import { type Ref, ref } from "vue"
import PendingReviewsList from "@/widgets/review/PendingReviewsList.vue"
import ArticleContent from "@/widgets/article-content/ui.vue"
import router from "@/app/router.ts"

enum PreviewMode {
  PREVIEW = "preview",
  DIFF = "diff"
}

interface PreviewOption {
  label: String,
  mode: PreviewMode
}

const props = defineProps<{
  revisionId?: string
}>()

const pendingReviewsList = ref<InstanceType<typeof PendingReviewsList> | null>(null)

const previewOptions: Array<PreviewOption> = [
  { label: "Normal view", mode: PreviewMode.PREVIEW },
  { label: "Diff view", mode: PreviewMode.DIFF }
]
const selectedPreviewOption: Ref<PreviewOption> = ref(previewOptions[0])
const dialogVisible = ref(false)
const onRevisionSelected = (value: any) => {
  router.replace({ name: "review", params: { revisionId: value } })
}
const onReviewSent = () => {
  router.replace( { name: "review" })
}

</script>

<template>
  <div class="py-24">
    <PendingReviewsList ref="pendingReviewsList" :selected-revision="revisionId" @select="onRevisionSelected" />
    <h2 class="m-0">Revision review</h2>
    <Divider class="mb-5" />
    <div class="flex-container w-full">
      <div v-if="revisionId" class="container flex flex-column justify-content-center">
<!--        <div class="flex justify-content-between mb-3">
          <SelectButton
              v-model="selectedPreviewOption"
              :options="previewOptions"
              option-label="label"
          />
          <Button label="Leave Review" @click="dialogVisible = true"></Button>
        </div>-->
        <div v-if="revisionId != ''" class="w-full">
          <ArticleDiff v-if="selectedPreviewOption.mode === PreviewMode.DIFF" :new-revision-id="revisionId" />
          <ArticleContent
              v-else
              :revision-id="revisionId"
              hide-catalog
              hide-edit
              hide-history
          />
        </div>
      </div>
    </div>
    <!--  <SendReviewModal v-model:dialog-visible="dialogVisible" :revision-id="revisionId" @review-sent="onReviewSent" />-->
  </div>
  </template>

<style scoped>
</style>