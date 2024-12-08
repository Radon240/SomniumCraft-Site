<script setup lang="ts">
import {computed, defineProps} from 'vue';
import useAuthStore from "@/entities/Auth/AuthStore.ts";
import {useMessagesStore} from "@/stores/messagesStore.ts";
import {useChatStore} from "@/features/chat/sendingMessage.ts";



// Определение пропсов
defineProps({
  id: {
    type: Number,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  avatarPath: {
    type: String,
    required: true,
    default: '/steve.png'
  },
  text: {
    type: String,
    required: true
  },
  error: {
    type: String,
    default: null, // Ошибка может быть null, если её нет
  },
  reactions: {
    type: Array as () => { emoji: string, user: string }[], // Уточняем структуру объектов в массиве
    default: () => [] // Если реакций нет, то передаем пустой массив
  },
  color: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  replyTo: {
    type: Number,
    required: false,
    default: null // добавьте дефолтное значение, если это необязательное поле
  },
});

const authStore = useAuthStore();

// Получаем nickname из store
const nicknameUser = computed(() => authStore.username);
// Функция для определения класса в зависимости от никнейма
const messageStyle = (nickname: string) => {
  if (!nicknameUser.value) {
    return 'col-start-1 col-end-8';  // Дефолтный стиль, если username не определен
  }
  // Приводим обе строки к одному регистру (например, к нижнему)
  return nickname.toLowerCase() === nicknameUser.value.toLowerCase()
      ? 'col-start-6 col-end-13'
      : 'col-start-1 col-end-8';
};
const messageStyleRow = (nickname: string) => {
  if (!nicknameUser.value) {
    return 'flex-row';  // Дефолтный стиль, если username не определен
  }
  // Приводим обе строки к одному регистру (например, к нижнему)
  return nickname.toLowerCase() === nicknameUser.value.toLowerCase()
      ? 'flex-row-reverse gap-3'
      : 'flex-row gap-3';
};
function stringToHexColor(str) {
  let hash = 0;
  // Получаем хэш строки
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 10) - hash); // Умножаем на 31
  }
  // Преобразуем хэш в HEX
  return "#" + ((hash >> 0) & 0xFFFFFF).toString(16).padStart(6, '0');
}
const userColorStyle = (nickname: string) => {
  let color = stringToHexColor(nickname);
  console.log()
  return 'text-[' + color + ']';
}
const messagesStore = useMessagesStore();

const repliedMessage = (replyTo: Number) => {
  return replyTo ? messagesStore.getMessage(replyTo) : null;
}
const replyToStore = useChatStore(); // Исправлено: вызов useChatStore()

const replyToMessage = (id: number) => {
  replyToStore.setReplyTo(id); // Теперь setReplyTo доступен
};

</script>

<template>
<!--  <div class="message flex items-start justify-start text-sm text-white gap-3 w-full">
    <img src="/steve.png" alt="A" class="rounded-[20%] h-10 w-10 " />
    <div class="messageInfo max-w-[80%] min-w-[50%]  bg-[#272B3A] rounded-xl shadow py-2 px-4 flex flex-col justify-start items-start">
      <span class="text-sm font-semibold text-indigo-600 ">Radon24</span>
      <div class="text-white text-sm  max-w-[100%] text-wrap break-word">Message content from user_10</div>
      <span class="time font-light text-white/50 w-full text-right pt-2">13:56</span>
    </div>
  </div>-->
  <div :class="messageStyle(nickname) + ' p-3 rounded-lg '"> <!-- Привязка класса с условием -->
    <div :class="messageStyleRow(nickname) + 'message flex items-start justify-start text-sm text-white gap-3 w-full'">
      <img
          :src="`https://mineskin.eu/helm/${nickname}`"
          alt="Skin"
          draggable="true"
          class="rounded-[20%] h-10 w-10 "
      />

      <div class="messageInfo max-w-[80%] min-w-[50%]  bg-[#272B3A] rounded-xl shadow py-2 px-4 flex flex-col justify-start items-start relative">
        <span class="text-sm font-semibold" :style="{ color: stringToHexColor(nickname) }">{{ nickname }}</span>
        <div v-if="repliedMessage(replyTo)" class="repliedMessage text-sm text-gray-400 mt-2 px-2 italic">
          Ответ на сообщение:
          <span class="font-semibold italic"  >{{ repliedMessage(replyTo)?.text }}</span>
        </div>

        <div class="text-white text-sm  max-w-[100%] text-wrap break-word">{{ text }}</div>
        <button @click="replyToMessage(id)" class="absolute right-0 mr-2">
          <font-awesome-icon :icon="['fas', 'reply']" class="text-white/60"/>
        </button>
        <span class="time font-light text-white/50 w-full text-right pt-2">{{time}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.repliedMessage{
  border-left: 1px solid;
}
</style>
