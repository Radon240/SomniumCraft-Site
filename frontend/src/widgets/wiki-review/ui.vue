<script setup lang="ts">
import { type Ref, ref } from "vue"
import PendingReviewsList from "@/widgets/review/PendingReviewsList.vue"
import ReviewContent from "@/widgets/review/review-content.vue"
import ArticleDiff from "@/widgets/article-diff/ui.vue"
import router from "@/app/router.ts"
import SendReviewModal from "@/widgets/review/SendReviewModal.vue";

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
  router.replace({ name: "review" })
}
</script>

<template>
  <div class="py-24 flex">
    <div>
      <h2 class="m-0">Pending revisions</h2>
      <Divider class="mb-5" />
      <PendingReviewsList ref="pendingReviewsList" :selected-revision="revisionId" @select="onRevisionSelected" />
    </div>
    <div class="flex-grow ml-5">
      <h2 class="m-0">Revision review</h2>
      <SelectButton
          v-model="selectedPreviewOption"
          :options="previewOptions"
          option-label="label"
      />
      <Button label="Leave Review" @click="dialogVisible = true"></Button>
      <Divider class="mb-5" />
      <div v-if="revisionId" class="container flex flex-column justify-content-center">
        <div v-if="revisionId != ' '" class="w-full flex-col">
          <ArticleDiff v-if="selectedPreviewOption.mode === PreviewMode.DIFF" :new-revision-id="revisionId" />
          <ReviewContent
              v-else
              :revision-id="revisionId"
              hide-catalog
              hide-edit
              hide-history
          />
        </div>
      </div>
    </div>
  </div>
  <SendReviewModal v-model:dialog-visible="dialogVisible" :revisionId="revisionId" @review-sent="onReviewSent" />
</template>

<style scoped>
.flex {
  display: flex;
}
.flex-grow {
  flex-grow: 1;
}
.ml-5 {
  margin-left: 1.25rem;
}
</style>
