<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import ArticlesList from '@/widgets/article-by-category-list/ui.vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="flex relative min-h-screen pt-24">
    <button
        @click="toggleSidebar"
        class="fixed bottom-4 right-4 z-50 p-3 rounded-full text-white shadow-lg hover:bg-gray-700 transition-colors duration-200 md:hidden"
    >
      <Bars3Icon v-if="!isSidebarOpen" class="h-6 w-6" />
      <XMarkIcon v-else class="h-6 w-6" />
    </button>

    <aside
        :class="[
        'fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out z-30',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
        class="w-64 shadow-2xl shadow-black md:shadow-none"
    >
      <div class="h-full overflow-y-auto rounded-2xl ml-5">
        <ArticlesList />
      </div>
    </aside>

    <main
        :class="[
        'transition-all duration-200 ease-in-out',
        isSidebarOpen ? 'md:ml-64' : ''
      ]"
        class="flex-1 min-h-screen px-4 md:px-8"
    >
      <RouterView />
    </main>

    <div
        v-if="isSidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
    ></div>
  </div>
</template>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>