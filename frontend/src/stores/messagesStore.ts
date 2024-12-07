import { defineStore } from 'pinia';

// Интерфейс для описания сообщения
interface Message {
    id: number;
    nickname: string;
    avatarPath: string;
    text: string;
    replyTo: number;
    error: string;
    reactions: { emoji: string; user: string }[];
    color: string;
    attachments: string[];
    timestamp: string; // Ожидается формат ISO-8601

}

// Интерфейс состояния сообщений
interface MessagesState {
    messages: Message[]; // Массив сообщений
}

// Определение store для работы с сообщениями
export const useMessagesStore = defineStore('messages', {
    state: (): MessagesState => ({
        messages: [], // Изначально пустой массив сообщений
    }),
    actions: {
        // Добавление сообщения
        addMessage(messageItem: Message) {
            this.messages.push(messageItem);
        },
        // Удаление сообщения по ID
        removeMessage(id: number) {
            this.messages = this.messages.filter((message) => message.id !== id);
        },
        // Очистка всех сообщений
        clearMessages() {
            this.messages = [];
        },
        // Сортировка сообщений по временной метке
        sortMessages() {
            this.messages.sort(
                (a, b) =>
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
        },
        // Получение сообщения по ID
        getMessage(id: number) {
            return this.messages.find((message) => message.id === id);
        },
    },
    getters: {
        // Группировка сообщений по дате
        groupedMessagesByDate: (state) => {
            return state.messages.reduce((acc, message) => {
                const date = new Date(message.timestamp);
                const day = date.getDate().toString().padStart(2, '0'); // Извлекаем день, добавляем 0 перед однозначным числом
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Извлекаем месяц (добавляем 1, так как месяцы нумеруются с 0)
                const year = date.getFullYear(); // Извлекаем год
                const dateString = `${day}.${month}.${year}`;
                if (!acc[dateString]) {
                    acc[dateString] = [];
                }
                acc[dateString].push(message);
                return acc;
            }, {} as Record<string, Message[]>);
        }
        ,
    },
});
