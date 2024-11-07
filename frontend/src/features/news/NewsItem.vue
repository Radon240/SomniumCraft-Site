<script setup lang="ts">
import { fetchNews } from "@/shared/api/fetchNews.js";
import { ref, onMounted } from "vue";

const news = ref([]);

// Асинхронная функция для загрузки новостей
async function loadNews() {
  try {
    news.value = await fetchNews(); // Предполагаем, что fetchNews возвращает массив новостей
    sortNews(); // Сортируем новости после загрузки
  } catch (error) {
    console.error("Ошибка при загрузке новостей:", error);
  }
}

// Метод для обрезки описания
function truncatedDescription(description: string): string {
  console.log("Описание:", description);
  console.log("Длина описания:", description.length);
  const size = 180;
  return description && description.length > size
      ? description.slice(0, size) + "..."
      : description;
}

// Метод для сортировки новостей
function sortNews() {
  news.value.sort((a, b) => {
    const dateA = new Date(`${a.date.split(".").reverse().join("-")}T${a.time}`);
    const dateB = new Date(`${b.date.split(".").reverse().join("-")}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });
}

// Загрузка новостей при монтировании компонента
onMounted(async () => {
  await loadNews();
});
</script>


<template>

  <div v-for="newsItem in news" :key="newsItem.id" class="news-item" :style="{ backgroundImage: `url(${newsItem.img[0]})` }">
              <div class="text">
                <div class="title">{{ newsItem.title }}</div>

                <div class="description">
                  <p>{{ newsItem.description }}</p>
                </div>
                <div class="date_and_time">
                  <span class="date">{{ newsItem.date }}</span>
                  <span class="time">{{ newsItem.time }}</span>
                </div>
              </div>
            </div>

</template>

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
 .news-item{
   display: flex;
   align-items: center;
   justify-content: end;
   flex-direction: column;
   width: 100%;
   gap: 1vw;
   border-radius: 30px;
   background-repeat: no-repeat;
   background-position: top;
   background-size: 100% auto;
   height: 50vh;
   padding-top: 5rem;
 }
.text {
  background-color: rgba(25, 28, 37, 0.80);
  backdrop-filter: blur(5px);
  margin-top: 20%;
  border-radius: 30px;
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

}

.title {
  grid-area: A;
  font-size: 110%;
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 0.1rem solid rgba(107, 128, 182, 0.12);
  margin-bottom: 1vw;
}

.description {
  grid-area: B;
  font-weight: lighter;
  color: rgba(255, 255, 255, 0.5);
  max-height: 15rem; /* Ограничиваем высоту для description */
  overflow: hidden; /* Скрываем переполнение */
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Ограничение в 4 строки */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /* Добавление многоточия */
}


.date_and_time{
  margin-top: 1vw;
  grid-area: C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.3);
}
</style>