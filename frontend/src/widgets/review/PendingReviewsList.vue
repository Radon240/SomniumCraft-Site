<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import moment from 'moment'
import { wikiApi } from '@/shared/service/wikiApiService.ts'
import { type GetPendingRevisionsResponseElement } from '@/shared/api'

const props = defineProps<{
  selectedRevision?: string
}>()

const emit = defineEmits<{
  select: [id?: string]
}>()

const revisions: Ref<GetPendingRevisionsResponseElement[]> = ref([])
const loading = ref(false)

const select = (revision: string | undefined) => {
  emit("select", revision)
}

const load = async () => {
  loading.value = true
  try {
    revisions.value = (await wikiApi.api.getPendingRevisions()).data.data
    if (revisions.value.length > 0) {
      select(revisions.value[0].revisionId)
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(() => props.selectedRevision, () => {
  if (!props.selectedRevision?.trim()) {
    load()
  }
})

load()
</script>

<template>
  <div class="revision-list glass-effect w-fit">
    <div v-if="loading" class="space-y-2">
      <Skeleton v-for="i in 3" :key="i" height="5rem" />
    </div>
    <div v-else>
      <ul class="space-y-2">
        <li
            v-for="revision in revisions"
            :key="revision.revisionId"
            @click="select(revision.revisionId)"
            :class="[
            'p-4 gap-10 rounded border transition cursor-pointer hover:shadow',
            props.selectedRevision === revision.revisionId ? 'border-primary-500 bg-gray-900' : 'border-gray-200'
          ]"
        >
          <div class="font-semibold">
            {{ revision.articleIdTitle }}
            <Chip :label="`Rev. ${revision.revisionId}`" class="ml-2 text-sm bg-gray-100" />
          </div>
          <div class="text-sm">
            <div class="flex items-center gap-2">
              <i class="pi pi-user"></i> {{ revision.author.name }}
            </div>
            <div class="flex items-center gap-2">
              <i class="pi pi-calendar"></i> {{ moment(revision.timestamp).format("DD.MM.YYYY HH:mm") }}
            </div>
            <div class="flex items-center gap-2" v-if="revision.authorsNote" v-tooltip="revision.authorsNote">
              <i class="pi pi-info-circle"></i> Note
            </div>
          </div>
          <Button
              :label="'View Article'"
              icon="pi pi-external-link"
              link
              :to="{ name: 'review', params: { articleId: revision.articleId } }"
              target="_blank"
              class="mt-2 text-sm"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.revision-list {
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.revision-list ul {
  padding: 0;
  list-style: none;
}
</style>
