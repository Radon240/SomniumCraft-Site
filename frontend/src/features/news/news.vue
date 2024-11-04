<template>
  <div class="newsSection">
    <div class="newsBar">
      <font-awesome-icon :icon="['fas', 'rotate-right']" />
      <span>Новости</span>
    </div>
    <div class="news">
      <div v-for="newsItem in news" :key="newsItem.id" class="news-item">
        <img v-if="newsItem.img" :src="newsItem.img" alt="" class="news-image no-select" c />
        <div class="text">
          <div class="title">{{ newsItem.title }}</div>
          <div class="description">
            <p>{{ truncatedDescription(newsItem.description) }}</p>
          </div>
          <div class="date_and_time">
            <span class="date">{{ newsItem.date }}</span>
            <span class="time">{{ newsItem.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { fetchNews } from "@/shared/api/fetchNews.js";

export default {
  data() {
    return {
      news: [],
    };
  },
  async mounted() {
    await this.loadNews();
  },
  methods: {
    async loadNews() {
      try {
        this.news = await fetchNews(); // Предполагаем, что fetchNews возвращает массив новостей
        this.sortNews(); // Сортируем новости после загрузки
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    },
    truncatedDescription(description) {
      console.log('Описание:', description);
      console.log('Длина описания:', description.length);
      var size = 180;
      if (description && description.length > size) {
        return description.slice(0, size) + '...';
      }
      return description;
    },
    sortNews() {
      this.news.sort((a, b) => {
        const dateA = new Date(`${a.date.split('.').reverse().join('-')}T${a.time}`);
        const dateB = new Date(`${b.date.split('.').reverse().join('-')}T${b.time}`);
        return dateB - dateA;
      });
    },
  }
}
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  border: none;
  outline: none;
  text-decoration: none;
  list-style: none;
  text-transform: capitalize;
}

.newsSection {
  //width: 60%;
  width: 90rem;
  display: flex;
  flex-direction: column;
  padding: 4rem 2rem;
  align-items: end;

}

.newsBar {
  color: white;
  display: flex;
  align-items: center;
  background-color: #191C25;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 3rem;
  border-radius: 30px;
  padding: 0.5rem 2rem;
  gap: 2rem;
}

.news {
  width: 100%;
  padding: 0 1rem;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 30%; /* Устанавливаем максимальную высоту */
  overflow-y: auto; /* Добавляем прокрутку */


}






.news-item {
  display: flex;
  align-items: stretch;
  width: 100%;
  gap: 1rem;
  max-height: 30%; /* Фиксированная высота для новостей */
}

.news-image {
  width: 30%;
  height: auto;/* Фиксированная ширина для изображения */
  object-fit: cover; /* Обрезка изображения */
  border-radius: 30px;

}

.text {

  display: grid;
  grid-template-areas:
    "A A A A   A A A A   A A A A"
    "B B B B   B B B B   B B B B"
    "B B B B   B B B B   B B B B"
    "B B B B   B B B B   B B B B"
    "B B B B   B B B B   B B B B"
    "B B B B   B B B B   B B B B"
    "B B B B   B B B B   B B B B"
    "C C C C   C C C C   C C C C";
  padding: 1.5rem;
  height: auto;
  width: 100%;
  background-color: #191C25;
  border-radius: 30px;
}

.title {
  grid-area: A;
  font-size: 110%;
  color: rgba(255, 255, 255, 0.8);
}

.description {
  grid-area: B;
  color: rgba(255, 255, 255, 0.5);
  max-height: 15rem; /* Ограничиваем высоту для description */
  overflow: hidden; /* Скрываем переполнение */
}

.date_and_time{
  grid-area: C;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
