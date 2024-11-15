<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { type NavTreeNode } from "@/entities/NavTree/model/types.ts";

const props = defineProps<{
  node: NavTreeNode
}>();

const router = useRouter();

const convertToPrimeVueTree = (node: NavTreeNode): any => {
  return {
    key: node.id,
    label: node.label,
    icon: node.uri ? 'pi pi-file' : 'pi pi-folder',
    data: { uri: node.uri?.toString() },
    children: node.children ? node.children.map(convertToPrimeVueTree) : undefined,
    selectable: !!node.uri,
  };
};

const treeData = computed(() => [convertToPrimeVueTree(props.node)]);

const expandedKeys = ref<{[key: string]: boolean}>({});

const onNodeSelect = (event: { node: any }) => {
  if (event.node.data && event.node.data.uri) {
    router.push(event.node.data.uri);
  }
};

onMounted(() => {
  const expandAll = (nodes: any[]) => {
    nodes.forEach(node => {
      expandedKeys.value[node.key] = true;
      if (node.children) {
        expandAll(node.children);
      }
    });
  };
  expandAll(treeData.value);
});
</script>

<template>
  <Tree
      :value="treeData"
      :expandedKeys="expandedKeys"
      selectionMode="single"
      @node-select="onNodeSelect"
      class="nav-tree bg-gray-900 text-gray-300 p-4"
      :pt="{
      root: { class: 'bg-transparent' },
      content: { class: 'hover:bg-gray-800 transition-colors duration-200 rounded' },
      node: { class: 'my-1' },
      label: { class: 'text-sm' },
      toggler: { class: 'w-6 h-6 text-gray-400 hover:text-white transition-colors duration-200' },
    }"
  >
    <template #default="slotProps">
      <router-link
          v-if="slotProps.node.data && slotProps.node.data.uri"
          :to="slotProps.node.data.uri"
          class="text-gray-400 hover:text-white transition-colors duration-200 no-underline hover:underline"
      >
        {{ slotProps.node.label }}
      </router-link>
      <span
          v-else
          :class="{ 'font-medium underline': !slotProps.node.data || !slotProps.node.data.uri }"
      >
        {{ slotProps.node.label }}
      </span>
    </template>
  </Tree>
</template>

<style>
.nav-tree .p-tree {
  @apply border-none bg-transparent;
}

.nav-tree .p-treenode-content {
  @apply p-2;
}

.nav-tree .p-treenode-leaf > .p-treenode-content .p-tree-toggler {
  @apply invisible;
}

.nav-tree .p-treenode-content:focus {
  @apply shadow-none;
}

.nav-tree .p-treenode-content.p-highlight {
  @apply bg-transparent text-white;
}
</style>