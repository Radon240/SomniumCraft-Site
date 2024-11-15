<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import ListItem from "@/pages/other/liItem.vue";
import AccordionItem from "@/pages/other/AccordionSection.vue";

// Массив для управления состоянием каждого элемента аккордеона
const accordionOpen = ref([false, false, false]);

// Ссылки для хранения высоты контента
const accordionHeights = ref<number[]>([0, 0, 0]);

function toggleAccordion(index: number) {
  // Переключаем состояние текущего аккордеона
  accordionOpen.value[index] = !accordionOpen.value[index];
  nextTick(() => updateHeights());
}

// Функция для обновления высоты каждого блока аккордеона
function updateHeights() {
  accordionHeights.value = accordionHeights.value.map((_, i) => {
    const content = document.querySelector(`#content-${i}`);
    return content ? content.scrollHeight : 0;
  });
}

onMounted(() => updateHeights());
</script>

<template>
  <div class=" mt-20 p-10 w-full h-auto flex justify-center items-start w-full relative">
    <div class="description container h-full p-5 flex flex-col gap-5">
      <AccordionItem
          :title="'Описание сервера'"
          :index="0"
          :height="accordionHeights[0]"
          :isOpen="accordionOpen[0]"
          :updateHeights="updateHeights"
      >
        <div class="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light">
          Тут будет описание сервера когда-нибудь.
        </div>
      </AccordionItem>

      <AccordionItem
          :title="'FAQ'"
          :index="1"
          :height="accordionHeights[1]"
          :isOpen="accordionOpen[1]"
          :updateHeights="updateHeights"
      >
        <ul>
          <ListItem text="Как зарегистрироваться на сервере?" />
          <ListItem text="Как зарегистрироваться на сервере?" />
          <ListItem text="Как зарегистрироваться на сервере?" />
          <!-- Добавьте другие вопросы здесь -->
        </ul>
      </AccordionItem>

      <AccordionItem
          :title="'Контакты'"
          :index="2"
          :height="accordionHeights[2]"
          :isOpen="accordionOpen[2]"
          :updateHeights="updateHeights"
      >
        <p class="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light w-full ">Телефон: +7 (123) 456-78-90</p>
        <p class="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light ">Email: support@server.ru</p>
        <p class="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light ">Адрес: Москва, ул. Примерная, д. 10</p>
        <p class="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light ">Часы работы: Пн-Пт 10:00 - 19:00</p>
      </AccordionItem>

    </div>
  </div>
</template>

<style scoped>
.description {
  background-color: rgba(var(--second-background-color), 0.8);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  box-shadow: 0px 0px 5px 0px rgba(74, 74, 74, 0.2);
}
</style>
