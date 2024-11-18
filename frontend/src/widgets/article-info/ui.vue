<script setup lang="ts">
import { HistoryIcon, PencilIcon, ShareIcon } from 'lucide-vue-next'
import { computed } from 'vue'

interface Author {
  id: string;
  name: string;
}

const props = defineProps<{
  lastEditDate: string | null;
  contributors: Author[];
}>();

const formattedDate = computed(() => {
  if (!props.lastEditDate) return '';
  return new Date(props.lastEditDate).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(',', '');
});

const getAvatarUrl = (size: number, nickname: string) => `https://vzge.me/face/${size}/${encodeURIComponent(nickname)}`;
</script>

<template>
  <div class="bg-gray-900 border border-blue-500 rounded-lg p-6 w-full max-w-md max-h-fit">
    <div class="mb-6">
      <h2 class="text-white text-2xl font-bold mb-2">Дата создания</h2>
      <p class="text-gray-300 text-xl">{{ formattedDate }}</p>
    </div>

    <div class="mb-8">
      <h2 class="text-white text-2xl font-bold mb-4">Contributors</h2>
      <div class="flex flex-wrap gap-2">
        <div v-for="contributor in contributors" :key="contributor.id"
             class="w-12 h-12 rounded overflow-hidden">
          <img
              :src="getAvatarUrl(64, contributor.name)"
              :alt="contributor.name"
              class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-12 border-t border-gray-700 pt-6">
      <button class="text-white hover:text-blue-400 transition-colors">
        <HistoryIcon class="w-6 h-6" />
      </button>
      <button class="text-white hover:text-blue-400 transition-colors">
        <PencilIcon class="w-6 h-6" />
      </button>
      <button class="text-white hover:text-blue-400 transition-colors">
        <ShareIcon class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>