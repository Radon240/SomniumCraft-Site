import axios from 'axios';

export async function fetchMessages() {
    try {
        const response = await axios.get('https://737dc8bd49e8d910.mokky.dev/message');
        return response.data; // Предполагаем, что API возвращает массив новостей
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
        throw error; // Можно выбросить ошибку дальше, если необходимо
    }
}