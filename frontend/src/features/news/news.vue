<template>
  <div class="newsSection flex flex-col items-end">
    <div class="newsBar text-white flex items-center bg-second-background text-[1.5rem]
     rounded-[30px] gap-4">
      <font-awesome-icon
          :icon="['fas', 'rotate-right']"
          @click="updateChats"
          class="cursor-pointer updateNews"
          :class="{
          'animate-rotate': isSpinning, // Применение анимации вращения
        }"
      />


      <span>Новости</span>
    </div>
    <div class="news rounded-[30px] flex flex-col gap-[2vw] max-h-[90vh] overflow-y-auto">
      <!-- Используем v-for для отображения новостей -->
      <NewsItem/>
    </div>
  </div>
</template>


<script setup lang="ts">
import NewsItem from "@/features/news/NewsItem.vue";
import { fetchNews } from "@/shared/api/fetchNews.js";
import { useNewsStore } from "@/stores/newsStore.js";
import { ref } from "vue";

// Состояние для анимации
const isSpinning = ref(false);

// Использование newsStore
const newsStore = useNewsStore();

// Загрузка новостей
async function loadNews() {
  try {
    const fetchedNews = await fetchNews(); // Предполагаем, что fetchNews возвращает массив новостей
    newsStore.clearNews(); // Очищаем старые данные
    fetchedNews.forEach((newsItem: any) => newsStore.addNews(newsItem)); // Добавляем новости в store
    newsStore.sortNews(); // Сортируем новости
  } catch (error) {
    console.error("Ошибка при загрузке новостей:", error);
  }
}

// Обновление новостей с анимацией
const updateChats = async () => {
  if (isSpinning.value) return; // Если анимация уже идет, не запускаем снова
  isSpinning.value = true; // Начинаем анимацию
  console.log("Началось вращение");

  const startTime = Date.now(); // Время начала загрузки

  try {
    await loadNews(); // Загружаем новости и ждем, пока процесс не завершится
  } catch (error) {
    console.error("Ошибка при обновлении новостей:", error);
  }

  const elapsedTime = Date.now() - startTime; // Время, прошедшее с начала загрузки

  if (elapsedTime < 1000) {
    // Если время выполнения меньше 2 секунд, устанавливаем тайм-аут
    setTimeout(() => {
      isSpinning.value = false; // Останавливаем анимацию после тайм-аута
      console.log('Закончилось вращение (через тайм-аут)');
    }, 1000 - elapsedTime); // Тайм-аут до 2 секунд
  } else {
    // Если загрузка заняла больше 2 секунд, останавливаем сразу
    isSpinning.value = false;
    console.log('Закончилось вращение');
  }
};
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
.updateNews {
  transition: transform 1s;
}

.animate-rotate {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.newsSection {
  padding: 2rem 1rem;
  //width: 60%;
  width: 60rem;

}

.newsBar {
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;

}

.news {
  width: 100%;
  padding-right: 1rem;
}
@media (max-width: 1024px) {
    .newsSection {
      padding-top: 2rem;
      padding-bottom: 2rem;
      flex-wrap: wrap;
      align-items: start;
      width: 100%;
    }

  .newsBar {
    width: 100%;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;

  }
  .news{
    display: flex;
    padding-top: 0;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: start;
    justify-content: space-between;
    height: 50vh;
    width: 100vw;
    gap: 1rem;
    overflow: auto;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
  }

}
</style>
