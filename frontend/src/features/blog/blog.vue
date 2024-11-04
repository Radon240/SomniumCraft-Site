<template>
  <div class="blogSection">
    <h2>Блог</h2>
    <div v-for="post in blogPosts" :key="post.id" class="blog-post">
      <h3>{{ post.author }}</h3>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogPosts: [
        { id: 1, author: 'Ник 1', content: 'Содержание поста 1' },
        { id: 2, author: 'Ник 2', content: 'Содержание поста 2' },
        // Добавьте остальные посты
      ]
    }
  }
}
</script>
