<script setup>
import { onMounted, ref } from 'vue';
import { getUUIDByNickname } from '@/shared/api/getUUIDByNickname';
import SkinViewer from "@/shared/components/3DSkin/SkinViewer.vue";
import {useUserStore} from "@/stores/userStore.ts";
// import * as skinview3d from "skinview3d";

// Создаём реактивные переменные
const nickname = ref(useUserStore().nickname);
const error = ref('');
const UUID = ref('');
const nameHistory = ref([]);  // Переменная для хранения истории имен
const is3D = ref(false); // Переключатель между 2D и 3D
const skinViewer = ref(null); // Храним объект SkinViewer



// Функция для переключения между 2D и 3D
const isVisible = ref(false);

// Функция для переключения видимости
const toggleVisibility = () => {
  is3D.value = !is3D.value;
  isVisible.value = !isVisible.value;
};

// Функция для получения UUID игрока
const fetchUUID = async () => {
  try {
    error.value = '';
    UUID.value = ''; // Сброс предыдущего значения UUID

    const uuid = await getUUIDByNickname(nickname.value); // Получаем UUID

    if (!uuid) {
      error.value = `Не удалось найти UUID для игрока ${nickname.value}`;
    } else {
      UUID.value = uuid; // Обновляем реактивную переменную UUID
    }
  } catch (err) {
    error.value = 'Произошла ошибка при получении UUID.';
    console.error(err);
  }
};

// Функция для получения истории имен игрока
// const fetchNameHistory = async () => {
//   try {
//     error.value = '';
//     // Получаем историю имен
//     nameHistory.value = await getNameHistory(nickname.value);  // Сохраняем в переменную nameHistory
//   } catch (err) {
//     error.value = 'Произошла ошибка при получении истории имен.';
//     console.error(err);
//   }
// };

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchUUID();
});
</script>
<template>
  <div class="content w-full min-h-[calc(100dvh-5rem)] h-auto mt-20 flex flex-col justify-start items-center">

    <div class="container flex w-full h-full items-start justify-start py-10 p-10 gap-5">

      <div class="view relative ">
        <div v-if="isVisible" class="skin bg-background-element/10 p-10 flex flex-col h-full">
          <SkinViewer :nick="nickname" class="cursor-move"/>
        </div>

        <!-- 2D версия скина -->
        <div
            v-else
            class="skin bg-background-element/10 p-10 flex h-full justify-center items-center"
        >
          <div class="h-[400px] w-[300px] flex justify-center items-center">
            <img
                :src="`https://vzge.me/full/800/${nickname}`"
                alt="Скин игрока"
                class="h-full w-auto"
            />
          </div>
        </div>
<!--        <button @click="toggleVisibility" class="bg-blue-500 text-white py-2 px-4 rounded w-full mt-10  ">-->
<!--          Переключить {{ is3D ? 'на 2D' : 'на 3D' }} вид-->
<!--        </button>-->

          <button @click="toggleVisibility" class="
                  bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff]
                  bg-[length:200%_auto] hover:bg-[position:right_center]
                  py-2 px-3
                  shadow-md hover:shadow-lg
                  rounded-2xl
                  transition-all duration-500 mt-5
                  absolute bottom-4 right-4
                   "
         type="button">
            {{ is3D ? '2D' : '3D' }}
          </button>

      </div>


      <div class="info py-5 w-3/5">
        <div class="nickname ">
          <span class="text-3xl md:text-3xl lg:text-3xl xl:text-4xl text-white font-semibold">{{nickname}}</span>
        </div>
        <div class="description text-xl md:text-xl lg:text-xl xl:text-xl text-white font-normal w-full py-5 flex flex-col justify-start items-start gap-10">
          <div class="UUID flex w-full gap-10">
            <span class="text-nowrap w-1/2">UUID игрока:</span>
            <span class="w-1/2 text-end text-xl md:text-xl lg:text-xl xl:text-xl text-white font-light text-wrap break-all">{{ UUID }}</span>
          </div>
          <div class="nameHistory">


          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  border: none;
  outline: none;
  text-decoration: none;
  list-style: none;
  text-transform: none;
}
.skin{
  box-shadow: 0px 0px 5px 0px rgba(74, 74, 74, 0.2);
  border-radius: 2rem;
}
.nickname{
  -webkit-box-shadow:0px 1px 0px  rgba(74, 74, 74, 0.2);
  -moz-box-shadow:0px 1px 0px rgba(74, 74, 74, 0.2);
  box-shadow:0px 1px 0px rgba(74, 74, 74, 0.2);
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;
    justify-content: start;
    align-items: center;
    text-align: center;
  }
  .UUID{
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
  .UUID span{
    width: 100%;
    text-align: center;
  }
}
</style>