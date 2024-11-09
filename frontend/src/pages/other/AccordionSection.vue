<template>
  <div :class="['bg-background-element', 'bg-opacity-80', 'p-5', 'w-full', 'itemAccordeon']">
    <button @click="toggleAccordion" class="w-full flex justify-between items-center py-5 text-slate-800">
      <span class="text-xs md:text-base lg:text-lg xl:text-3xl text-nowrap text-white">{{ title }}</span>
      <span class="transition-transform duration-300 text-white">
        <!-- Иконка для аккордеона, вниз -->
        <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="!isOpen" class="text-xs md:text-base lg:text-lg xl:text-3xl text-white "/>
        <!-- Иконка для аккордеона, вверх -->
        <font-awesome-icon :icon="['fas', 'chevron-down']" v-else class="fa-solid fa-chevron-up text-xs md:text-base lg:text-lg xl:text-3xl text-white "/>
      </span>
    </button>
    <div :style="{ maxHeight: isOpen ? height + 'px' : '0' }" class="overflow-hidden transition-all duration-300 ease-in-out" :id="`content-${index}`">
      <div class="p-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

const props = defineProps({
  title: String,  // Заголовок аккордеона
  index: Number,  // Индекс аккордеона
  height: Number, // Высота содержимого аккордеона
  isOpen: Boolean, // Состояние аккордеона (открыт/закрыт)
  updateHeights: Function // Функция для обновления высоты
});

const isOpen = ref(props.isOpen);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
  nextTick(() => props.updateHeights());
};

</script>

<style scoped>
.itemAccordeon {
  box-shadow: 0px 0px 5px 0px rgba(74, 74, 74, 0.2);
  border-radius: 30px;
}
</style>
