<script setup lang="ts">
import { ref } from "vue"
import { maxLength, required } from "@vuelidate/validators"
import { wikiApi } from "@/shared/service/wikiApiService.ts"
import { useVuelidate } from "@vuelidate/core"
import { ReviewStatus } from "@/shared/api/index.ts"

interface LabledReviewStatus {
  label: String,
  status: ReviewStatus
}

const props = defineProps<{
  revisionId: string
}>()

const emit = defineEmits<{
  reviewSent: []
}>()

const dialogVisible = defineModel<boolean>("dialogVisible", {default: false})
const message = ref("")

const reviewOptions: Array<LabledReviewStatus> = [
  { label: "Remove", status: ReviewStatus.Removed },
  { label: "Reject", status: ReviewStatus.Rejected },
  { label: "Accept", status: ReviewStatus.Accepted }
]
const selectedOption = ref<LabledReviewStatus>(reviewOptions[0])

const rules = {
  message: { required, maxLength: maxLength(1024) },
}
const vuelidate = useVuelidate(rules, { message: message })
vuelidate.value.$touch()

const sendReview = async () => {
  try {
    const result = (await wikiApi.api.reviewArticleRevision(props.revisionId, {
      status: selectedOption.value.status,
      review: message.value
    })).data
    dialogVisible.value = false
    onReviewSent()
  } catch (e) {
  }
}

const onReviewSent = () => {
  emit("reviewSent")
}

</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    maximizable
    header="Review article revision"
    :position="'top'"
    class="w-full md:w-30rem"
  >
    <FloatLabel class="mt-5">
      <Select
        id="dropdown"
        v-model="selectedOption"
        option-label="label"
        :options="reviewOptions"
        placeholder="Select a Status"
        class="w-full md:w-14rem"
      />
      <label for="dropdown">Reviews status</label>
    </FloatLabel>
    <FloatLabel class="mt-5">
      <Textarea
        id="message"
        v-model="message"
        rows="5"
        cols="30"
        class="w-full h-8rem"
        :class="{ 'p-invalid': vuelidate.message.$errors[0] }"
      />
      <label for="message">Message</label>
      <Tag v-for="error in vuelidate.message.$errors" :key="error.$uid" severity="danger">
        {{ error.$message }}
      </Tag>
    </FloatLabel>
    <div class="flex justify-content-end gap-2 w-full mt-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="dialogVisible = false"
      />
      <Button
        type="button"
        label="Submit"
        :disabled="vuelidate.$error"
        @click="sendReview()"
      />
    </div>
  </Dialog>
</template>

<style scoped>

</style>