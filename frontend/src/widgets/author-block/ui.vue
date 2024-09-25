<script lang="ts">
import { ref, computed } from 'vue';

export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    articleCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const formattedDate = computed(() => {
      const date = new Date(props.publicationDate);
      return date.toLocaleDateString();
    });

    const formattedTime = computed(() => {
      const date = new Date(props.publicationDate);
      return date.toLocaleTimeString();
    });

    return {
      formattedDate,
      formattedTime,
    };
  },
};
</script>

<template>
  <div class="author-card">
    <div class="author-info">
      <h3>{{ author.name }}</h3>
      <p>Дата публикации: {{ formattedDate }}</p>
      <p>Время публикации: {{ formattedTime }}</p>
      <p>Количество статей: {{ articleCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.author-card {
  padding: 16px;
  border-radius: 8px;
  width: 25%;

  background-color: var(--background-color);
}

.author-info h3 {
  margin: 0;
  font-size: 18px;
}

.author-info p {
  margin: 8px 0;
  font-size: 14px;
}
</style>