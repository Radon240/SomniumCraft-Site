<template>
  <div class="chatSection w-[40rem] flex flex-col items-center rounded-[2rem] max-h-[30vw] overflow-y-hidden  ml-[3rem] mt-[2rem] relative mb-10">
    <span class="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-semibold  py-2 bg-second-background w-full text-center ">Чат</span>
<!--
  <div ref="art" id="circles" class="absolute top-0 left-0 w-full h-full z-0"></div>

     Блок с сообщениями, который будет поверх фона
    <div class="messages-container z-10 w-[90%] h-full absolute top-0 left-0 mt-10 mb-[10%] mr-2 ml-2">
      Здесь отображаются сообщения

      <div  class="message p-2 mb-2 bg-gray-800 text-white rounded-lg">
        fsjsffsjksfjksf
      </div>
    </div>
    <div class="inputField w-full bg-white h-[10%] text-black px-5 py-2">
      <div class="relative w-95% mx-auto">
        <input
            class="focus:(ring-2) bg-transparent px3 py3 w-full outline-none overflow-hidden b b-gray b-opacity-30 transition rd-lg"
            data-test="chat-input"
            placeholder="Send your message..."
            type="text"
            v-model="chatMsg"
            @keyup.enter="onSend"
        />
        <button
            data-test="submit"
            class="absolute right-0 bottom-0 top-0 hover:c-blue c-gray py2 px3 hfull focus:ring outline-none rd-r-lg transition"
            type="submit"
            @click="onSend"
        >
          <font-awesome-icon :icon="['fas', 'arrow-up']" />
        </button>
      </div>
  </div>
-->
    <div class="  flex h-screen antialiasing text-gray-800 overflow-y-hidden bg-second-background w-full">

      <div class="  flex flex-col flex-auto bg-background/20"> <!--Окно сообщений -->
        <div class="  flex flex-col flex-auto flex-shrink-0 h-full ">
          <div class="messages  flex flex-col h-full overflow-x-auto mb-4">
            <div class="  flex flex-col h-full">

              <div class="  grid grid-cols-12 gap-y-2 " v-for="(messages, date) in groupedMessages">
                <div class="col-span-12 text-center py-2">
                  <span class="dateGroup text-sm text-white/40 block mt-4">
                    {{ date }}
                  </span>

                </div>
              <!--  <div class="col-start-1 col-end-8 p-3 rounded-lg ">

                  <div class="flex flex-row items-center">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      J
                    </div>
                    <div class="relative ml-3 text-sm bg-gray-700 py-2 px-4 shadow rounded-xl">
                      <div class="text-gray-200">Hey, how's it going?</div>
                    </div>
                  </div>
                </div>
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      Y
                    </div>
                    <div class="relative mr-3 text-sm bg-indigo-600 py-2 px-4 shadow rounded-xl">
                      <div class="text-white">I'm good, thanks! How about you?</div>
                      <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">Seen</div>
                    </div>
                  </div>
                </div>-->
                <Message v-for="message in messages"
                         :id="message.id"
                         :avatarPath="message.avatarPath"
                         :nickname="message.nickname"
                         :text="message.text"
                         :error="message.error"
                         :date="formatTimestampToDate(message.timestamp)"
                         :time="formatTimestampToTime(message.timestamp)"
                         :replyTo="message.replyTo"   />
                <!-- More messages here -->
              </div>

            </div>
          </div>
          <div v-if="authStore.isAuthenticated" class="flex flex-row items-center rounded-xl bg-gray-700 w-full px-4 h-auto py-2">
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <div v-if="replyToStore.replyTo != null" class="flex items-center repliedMessage text-sm text-white/60 mt-2 px-2 italic w-full mb-2">
                  <span class="font-semibold italic w-full">{{messageStore.getMessage(replyToStore.replyTo).text}}</span>
                  <button @click="replyToStore.setReplyTo(null)">
                    <font-awesome-icon :icon="['fas', 'xmark']" class="text-xl text-white" />
                  </button>

                </div>
                <input type="text"
                       placeholder="Введите сообщение"
                       class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 px-4 h-10 bg-gray-600 text-gray-200"
                v-model="chatMsg" />
<!--                <textarea-->
<!--                    placeholder="Введите сообщение"-->
<!--                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 px-4 bg-gray-600 text-gray-200 overflow-hidden py-2"-->
<!--                    v-model="chatMsg"-->
<!--                    @input="autoResize"-->
<!--                    ref="textarea"-->
<!--                ></textarea>-->
              </div>
            </div>
            <div class="ml-4">
              <button @click="sendMessage"
                      class="flex items-center py-3 justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 flex-shrink-0">
                <font-awesome-icon :icon="['fas', 'paper-plane']"  />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Message from '@/features/chat/message.vue';
import {fetchMessages} from "@/shared/api/fetchMessages.ts";
import {useMessagesStore} from "@/stores/messagesStore.ts";
import { nextTick } from 'vue';
import useAuthStore from "@/entities/Auth/AuthStore.ts";
import {sendMessageToServer} from "@/shared/api/sendMessage.ts";
import {useChatStore} from "@/features/chat/sendingMessage.ts";

const authStore = useAuthStore();
const replyToStore = useChatStore();
const chatMsg = ref('');
const replyTo = ref(null);

// Обработчик для получения данных от дочернего компонента
const handleReplyToMessage = (replyToMessage) => {
  replyTo.value = replyToMessage;
  console.log(replyTo.value)// Сохраняем значение в реактивную переменную
};

// Метод для отправки сообщения
async function sendMessage() {
  if (!chatMsg.value.trim()) {
    console.error("Сообщение не может быть пустым");
    return;
  }

  const message = {
    id: maxId + 1,
    nickname: authStore.username,
    avatar: 'src/resources/images/steve.png',
    text: chatMsg.value,
    timestamp: new Date().toISOString(), // Текущая дата/время в формате ISO
    status: 'delivered',
    messageType: 'text',
    error: null,
    replyTo: replyToStore.replyTo,
    attachments: [],
    reactions: ['👍', '❤️'],
    userColor: '#1E240',
  };
  console.log(JSON.stringify(message, null,2))
  try {
    // Отправляем сообщение
    await sendMessageToServer(message);

    // После отправки сообщения добавляем его в хранилище
    await loadMessages();
    await nextTick();  // Ждем, пока Vue завершит рендеринг
    groupByDate();
    await nextTick();
    scrollToBottom();

    // Прокручиваем к последнему сообщению
    await nextTick();  // Ждем, пока Vue завершит рендеринг
    scrollToBottom();
    chatMsg.value = '';
    replyToStore.setReplyTo(null);
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
  }

}



const messageStore = useMessagesStore();
const maxId = messageStore.messages.reduce((max, message) => {
  return message.id > max ? message.id : max;
}, 0);
async function loadMessages() {
  try {
    const fetchedMessages = await fetchMessages();
    messageStore.clearMessages(); // Очищаем сообщения перед загрузкой
    fetchedMessages.forEach((messageItem: any) => {
      messageStore.addMessage(messageItem); // Добавляем каждое сообщение в хранилище
    });
    messageStore.sortMessages(); // Сортируем сообщения
  } catch (error) {
    console.error("Ошибка при загрузке сообщений: ", error);
  }
}
const groupedMessages = ref<GroupedMessages>({});
function groupByDate() {
  groupedMessages.value = messageStore.groupedMessagesByDate;
}
// Создаем Реф для контейнера
const art = ref<HTMLElement | null>(null);

// Ограничение на количество кругов
const limit = 20;
function formatTimestampToDate(timestamp: string): string {
  const date = new Date(timestamp); // Преобразуем timestamp в объект Date
  const day = date.getDate().toString().padStart(2, '0'); // Извлекаем день, добавляем 0 перед однозначным числом
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Извлекаем месяц (добавляем 1, так как месяцы нумеруются с 0)
  const year = date.getFullYear(); // Извлекаем год

  return `${day}.${month}.${year}`; // Формируем строку в формате дд.мм.гггг
}
function formatTimestampToTime(timestamp: string): string {
  const date = new Date(timestamp); // Преобразуем timestamp в объект Date
  const hours = date.getHours().toString().padStart(2, '0'); // Извлекаем часы, добавляем 0 перед однозначным числом
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Извлекаем минуты, добавляем 0 перед однозначным числом
  return `${hours}:${minutes}`; // Формируем строку в формате часы:минуты
}
// Функция для генерации случайного числа
function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Максимальный размер круга
const maxCircleSize = 25; // Вы можете увеличить этот размер

// Функция для генерации случайной прозрачности
function randomOpacity(min: number = 0.01, max: number = 0.05): string {
  const alpha = (Math.random() * (max - min) + min).toFixed(2); // Случайная прозрачность в пределах от min до max
  return alpha;
}

// Пример фиксированного RGB-цвета для #191C25
const baseColorRgb = { r: 255, g: 255, b: 255 };

function randomCircle() {
  if (art.value) {
    // Очистим контейнер перед добавлением новых кругов
    art.value.innerHTML = '';

    const containerWidth = art.value.offsetWidth; // Ширина контейнера
    const containerHeight = art.value.offsetHeight; // Высота контейнера

    // Создаем и добавляем новые круги
    for (let i = 0; i < limit; i++) {
      let circle = document.createElement("div");
      circle.classList.add("circle");

      let zindex = randomNumber(0, limit);
      let size = randomNumber(15, maxCircleSize); // Ограничение размера круга

      // Генерируем случайные позиции внутри контейнера
      let top = randomNumber(10, containerHeight - size); // Ограничиваем по высоте
      let left = randomNumber(10, containerWidth - size); // Ограничиваем по ширине

      // Генерация случайной прозрачности
      let opacity = randomOpacity();

      // Формируем цвет с прозрачностью в формате rgba
      let colorWithOpacity = `rgba(${baseColorRgb.r}, ${baseColorRgb.g}, ${baseColorRgb.b}, ${opacity})`;

      circle.style.zIndex = zindex.toString();
      circle.style.width = size + "px";
      circle.style.height = size + "px";
      circle.style.top = top  + "px"; // Устанавливаем случайную позицию сверху
      circle.style.left = left + "px"; // Устанавливаем случайную позицию слева
      circle.style.backgroundColor = colorWithOpacity; // Применяем цвет с прозрачностью
      circle.style.position = "absolute";

      // Добавляем border-radius для кругов
      circle.style.borderRadius = '50%';

      // Добавляем плавные анимации
      circle.style.transition = 'all ease 0.5s';

      art.value.appendChild(circle);
    }
  }
}

// Прокрутка до последнего сообщения
function scrollToBottom() {
  const container = document.querySelector(".messages");
  if (container) {
    console.log("Прокрутка", container.scrollHeight);
    document.querySelector(".messages").scrollTop =  document.querySelector(".messages").scrollHeight;
  } else {
    console.error("Элемент .messages не найден");
  }
}
function autoResize(element) {
  element.style.height = 'auto';
  element.style.height = (element.scrollHeight) + 'px';
}
// Вызываем randomCircle после монтирования компонента
onMounted(async () => {
  randomCircle();
  await loadMessages();
  await nextTick();  // Ждем, пока Vue завершит рендеринг
  groupByDate();
  await nextTick();
  scrollToBottom();
});

// Динамическое обновление при изменении размеров контейнера
watch(() => art.value?.offsetWidth, () => {
  randomCircle();

});

</script>


<style scoped>
.repliedMessage{
  border-left: 1px solid;
}
#circles {

  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
}

.circle {
  box-shadow: 1px 3px 7px 0px rgba(0, 0, 0, 0.3);
  position: absolute;
}

.chatSection {
  max-height: 30vw;

  margin-left: 3rem;
  margin-top: 2rem;
}




</style>
