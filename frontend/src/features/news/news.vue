<template>
  <div class="newsSection flex flex-col items-end">
    <div class="newsBar text-white flex items-center bg-second-background text-[1.5rem]
     rounded-[30px] gap-4">
      <font-awesome-icon :icon="['fas', 'rotate-right']"  />

      <span>Новости</span>
    </div>
    <div class="news rounded-[30px] flex flex-col gap-[2vw] max-h-[90vh] overflow-y-auto">
            <NewsItem/>
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
