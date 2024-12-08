import { defineStore } from 'pinia';

// Создаем Pinia store для хранения данных чата
export const useChatStore = defineStore('chat', {
    state: () => ({
        replyTo: null as number | null, // Состояние для хранения id сообщения, на которое идет ответ
        messages: [] as Array<Message>, // Массив с сообщениями
    }),
    actions: {
        // Метод для установки сообщения, на которое идет ответ
        setReplyTo(messageId: number) {
            this.replyTo = messageId;
            console.log(this.replyTo);
        },
        // Метод для очистки поля ответа
        clearReplyTo() {
            this.replyTo = null;
        },
        // Добавление нового сообщения
        addMessage(message: Message) {
            this.messages.push(message);

        },
    },
});


