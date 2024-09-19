<script lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const compiledMarkdown = computed(() => {
      return marked(props.content);
    });

    return {
      compiledMarkdown,
    };
  },
};
</script>

<template>
  <div class="article">
    <h1>{{ title }}</h1>
    <div class="article-content" v-html="compiledMarkdown"></div>
  </div>
</template>

<style scoped>
.article {
  border: 1px solid #ddd;
  padding: 16px;
  background-color: var(--background-color);
  border-radius: 8px;
}

.article h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.article-content {
  line-height: 1.6;
}

.article-content h2, h3 {
  margin-top: 16px;
}

.article-content p {
  margin: 8px 0;
}
</style>