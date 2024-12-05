// src/stores/newsStore.ts
import { defineStore } from 'pinia';

// Интерфейс для описания новости
interface News {
    id: number;
    title: string;
    description: string;
    img: string[];
    date: string;
    time: string;
}

// Интерфейс состояния новостей
interface NewsState {
    news: News[]; // Массив новостей
}

// Определение store для работы с новостями
export const useNewsStore = defineStore('news', {
    state: (): NewsState => ({
        news: [] // Изначально пустой массив новостей
    }),
    actions: {
        // Добавление новости
        addNews(newsItem: News) {
            this.news.push(newsItem);
        },
        // Удаление новости по ID
        removeNews(id: number) {
            this.news = this.news.filter(news => news.id !== id);
        },
        // Очистка всех новостей
        clearNews() {
            this.news = [];
        },
        // Сортировка новостей
        sortNews() {
            this.news.sort((a, b) => {
                const dateA = new Date(`${a.date.split(".").reverse().join("-")}T${a.time}`);
                const dateB = new Date(`${b.date.split(".").reverse().join("-")}T${b.time}`);
                return dateB.getTime() - dateA.getTime();
            });
        }
    }
});
