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
  <div class="nav-tree-container bg-gray-900">
    <Tree
        :value="treeData"
        :expandedKeys="expandedKeys"
        selectionMode="single"
        @node-select="onNodeSelect"
        class="nav-tree text-gray-300"
        :pt="{
        root: { class: 'bg-transparent' },
        content: { class: 'hover:bg-gray-700 transition-colors duration-200 rounded' },
        node: { class: 'my-1' },
        label: { class: 'text-sm' },
        toggler: { class: 'w-6 h-6 text-gray-400 hover:text-white transition-colors duration-200' },
      }"
    >
      <template #default="slotProps">
        <router-link
            v-if="slotProps.node.data && slotProps.node.data.uri"
            :to="slotProps.node.data.uri"
            class="text-gray-300 hover:text-white transition-colors duration-200 no-underline"
        >
          {{ slotProps.node.label }}
        </router-link>
        <span
            v-else
            :class="{ 'font-bold text-gray-100': !slotProps.node.data || !slotProps.node.data.uri }"
        >
          {{ slotProps.node.label }}
        </span>
      </template>
    </Tree>
  </div>
</template>

<style scoped>
.nav-tree-container {
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

:deep(.p-tree) {
  border: none;
  background: transparent;
  padding: 0;
}

:deep(.p-treenode-content) {
  padding: 0.5rem;
  border-radius: 0.25rem;
}

:deep(.p-treenode-leaf > .p-treenode-content .p-tree-toggler) {
  visibility: hidden;
}

:deep(.p-treenode-content:focus) {
  box-shadow: none;
}

:deep(.p-treenode-content.p-highlight) {
  background: transparent;
  color: white;
}

:deep(.p-tree-container) {
  padding-bottom: 1rem;
}
</style>