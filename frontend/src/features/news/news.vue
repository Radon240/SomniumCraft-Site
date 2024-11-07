<template>
  <div class="newsSection">
    <div class="newsBar">
      <font-awesome-icon :icon="['fas', 'rotate-right']" />

      <span>Новости</span>
    </div>
    <div class="news">

            <NewsItem/>

<!--      <div v-for="newsItem in news" :key="newsItem.id" class="news-item">-->
<!--        <img v-if="newsItem.img" :src="newsItem.img[0]" alt="" class="news-image no-select"  />-->
<!--        <div class="text">-->
<!--          <div class="title">{{ newsItem.title }}</div>-->
<!--          <div class="description">-->
<!--            <p>{{ newsItem.description }}</p>-->
<!--          </div>-->
<!--          <div class="date_and_time">-->
<!--            <span class="date">{{ newsItem.date }}</span>-->
<!--            <span class="time">{{ newsItem.time }}</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>


<script>
import {defineComponent} from "vue";
import NewsItem from "@/features/news/NewsItem.vue";

export default defineComponent({
  components: {NewsItem}
})


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
  width: 60rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  align-items: end;

}

.newsBar {
  color: white;
  display: flex;
  align-items: center;
  background-color: rgba(var(--second-background-color),1);
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  gap: 1rem;
}

.news {
  width: 100%;
  padding-right: 1rem;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  max-height: 60vw; /* Устанавливаем максимальную высоту */
  overflow-y: auto; /* Добавляем прокрутку */


}

</style>
