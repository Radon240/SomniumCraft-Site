<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core"
import {computed, onBeforeMount, onUnmounted, Ref, ref} from "vue";
import {CreateArticleRequest, EditArticleRequest, GetCategoriesResponseElement} from "@/shared/api";
import useArticleEditorStore from "@/entities/Article/ArticleEditorStore.ts"
import {wikiApi} from "@/shared/service/wikiApiService.ts";
import {maxLength, required} from "@vuelidate/validators";

const props = defineProps<{
  articleId?: string
}>()

const isNewArticle = computed(() => (props.articleId == null))
const title = ref("")
const note = ref("")
const content = ref("")
const categories: Ref<GetCategoriesResponseElement[]> = ref([])
const selectedCategories: Ref<string[]> = ref([])
const loadingArticle = ref(false)
const loadingCategories = ref(false)
const editorStore = useArticleEditorStore()

const rules = {
  title: { required, maxLength: maxLength(128) },
  note: { required },
  content: { required }
}
const vuelidate = useVuelidate(rules, { title: title, note: note, content: content })

const loadCategories = async () => {
  if (loadingCategories.value) return
  loadingCategories.value = true

  try {
    categories.value = (await wikiApi.api.getCategories()).data.data
    if (isNewArticle.value)
      selectedCategories.value = editorStore.categories
    selectedCategories.value = selectedCategories.value.filter(x => categories.value.some(e => e.id === x))
    loadingCategories.value = false
  } catch (error) {
    console.log(error)
  }
}

const loadArticle = async () => {
  if (loadingArticle.value) return
  loadingArticle.value = true

  if (!isNewArticle.value) {
    try {
      const result = (await wikiApi.api.getArticle(props.articleId!!)).data
      title.value = result.title
      if (result.content != null)
        content.value = result.content!
      selectedCategories.value = result.categories.map(x => x.id)
      loadingArticle.value = false
    } catch (e: any) {
    }
  } else {
    title.value = editorStore.title
    content.value = editorStore.content
    loadingArticle.value = false
  }
}

const saveDraft = (notify: boolean = true) => {
  if (isNewArticle.value) {
    editorStore.title = title.value
    editorStore.note = note.value
    editorStore.content = content.value
    editorStore.categories = selectedCategories.value
    if (notify) {
    }
  }
}

const submit = async () => {
  const request = async (data: CreateArticleRequest | EditArticleRequest) => {
    if (isNewArticle.value) return wikiApi.api.createArticle(data as CreateArticleRequest)
    else return wikiApi.api.editArticle(props.articleId!, data as EditArticleRequest)
  }

  const requestData: CreateArticleRequest | EditArticleRequest = isNewArticle.value ? {
    title: title.value,
    content: content.value,
    authorsNote: note.value,
    categoryIds: selectedCategories.value
  } : {
    content: content.value,
    authorsNote: note.value,
    categoryIds: selectedCategories.value
  }

  const successSummary = isNewArticle.value ? "Article submitted" : "Revision submitted"

  try {
    const result = (await request(requestData)).data
    if (isNewArticle.value) {
      title.value = ""
      note.value = ""
      content.value = ""
      categories.value = []
      saveDraft()
    }
  } catch (e: any) {
    if (e.isAxiosError) {
      if (e.response?.data?.detail != undefined) {
      }
    } else {
      console.log(e)
    }
  }
}

let draftTimer: number | undefined

onBeforeMount(async () => {
  await Promise.all([loadCategories(), loadArticle()])
  if (isNewArticle.value) {
    draftTimer = setInterval(() => {
      saveDraft(false)
    }, 30 * 1000)
  }
  vuelidate.value.$touch()
})


onUnmounted(() => {
  if (draftTimer !== undefined)
    clearInterval(draftTimer)
})
</script>

<template>
  <div class="container flex-1 w-full">
    <h1 v-if="isNewArticle" class="m-0">Create Article</h1>
    <h1 v-else class="m-0">Edit Article</h1>
    <Divider class="mb-5" />
    <div class="flex justify-content-between w-full mb-5">
      <div>
        <FloatLabel class="w-full md:20rem">
          <Skeleton v-if="loadingArticle" class="h-full w-full md:w-20rem fadein animation-duration-2000" />
          <InputText
              id="title"
              v-model="title"
              :invalid="vuelidate.title.$error"
              :disabled="!isNewArticle || loadingArticle"
              class="w-full md:w-20rem" />
          <label for="title">Title</label>
        </FloatLabel>
        <Tag v-for="error in vuelidate.title.$errors" :key="error.$uid" severity="danger">
          {{ error.$message }}
        </Tag>
      </div>
      <Button
          severity="primary"
          :disabled="vuelidate.$error || loadingArticle || loadingCategories"
          label="Submit"
          class="hidden md:inline-flex align-self-start"
          @click="submit"
      />
    </div>
    <FloatLabel class="mb-5">
      <MultiSelect
          id="categories"
          v-model="selectedCategories"
          :loading="loadingCategories"
          :options="categories"
          display="chip"
          filter
          option-value="id"
          option-label="name"
          placeholder="Select Categories"
          class="w-full"
      />
      <label for="categories">Categories</label>
    </FloatLabel>
    <FloatLabel class="w-full md:20rem mb-5">
      <Skeleton v-if="loadingArticle" class="h-full w-full md:w-20rem fadein animation-duration-2000" />
      <InputText
          id="note"
          v-model="note"
          :disabled="loadingArticle"
          class="w-full" />
      <label for="note">Note</label>
    </FloatLabel>
    <div class="w-full h-full mb-5">
      <MdEditor
          v-model="content"
          language="en-US"
          preview-theme='github'
          :preview="true"
          :disabled="loadingArticle"
          :toolbars-exclude="isNewArticle ? ['github'] : ['github', 'save']"
          class="w-full h-full"
          :on-save="saveDraft"
          no-upload-img
      />
      <Tag v-for="error in vuelidate.content.$errors" :key="error.$uid" severity="danger">
        {{ error.$message }}
      </Tag>
    </div>
    <div class="mb-5">
      <Button
          severity="primary"
          :disabled="vuelidate.$error || loadingArticle || loadingCategories"
          label="Submit"
          class="md:hidden w-full"
          @click="submit"
      />
    </div>
  </div>
</template>

<style scoped>

</style>