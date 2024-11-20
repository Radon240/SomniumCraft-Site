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
  <div class="flex flex-col md:flex-row py-24 w-screen min-h-screen">
    <button
        @click="toggleSidebar"
        class="md:hidden fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-lg transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        aria-label="Toggle sidebar"
    >
      <Bars3Icon v-if="!isSidebarOpen" class="w-6 h-6" />
      <XMarkIcon v-else class="w-6 h-6" />
    </button>

    <aside :class="[
      'bg-gray-900 h-full rounded-xl w-64 overflow-y-auto transition-all duration-300 ease-in-out text-white',
      'fixed transform md:relative md:translate-x-0 z-40',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]">
      <div class="text-xl">
        <ArticlesList />
      </div>
    </aside>

    <div class="flex-grow md:w-1/2 px-4 md:px-8 overflow-y-auto">
      <RouterView />
    </div>

    <div
        v-if="isSidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
    ></div>

  </div>
</template>

<style scoped>
aside {
  max-height: calc(100vh - 96px);
  overflow-y: auto;
}
</style>