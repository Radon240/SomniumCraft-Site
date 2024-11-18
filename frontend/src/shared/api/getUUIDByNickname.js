export const getUUIDByNickname = async (nickname) => {
    const url = `/api/users/profiles/minecraft/${nickname}`; // Используем прокси-путь
    console.log(`Вызван fetchUUID для ника: ${nickname}`);

    try {
        const response = await fetch(url);

        // Проверяем успешный ли ответ от API
        if (!response.ok) {
            console.error(`Ошибка: не удалось получить данные для игрока ${nickname}. Статус: ${response.status}`);
            throw new Error('Player not found');
        }

        const data = await response.json();

        // Проверяем, что данные содержат UUID
        if (!data.id) {
            console.error(`Ошибка: данные для игрока ${nickname} не содержат UUID`);
            return null;
        }

        console.log(`UUID для игрока ${nickname}: ${data.id}`);
        return data.id; // Возвращаем UUID
    } catch (error) {
        console.error('Ошибка при получении UUID:', error.message);
        return null; // Если ошибка, возвращаем null
    }
};
