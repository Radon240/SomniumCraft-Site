import axios from 'axios';

interface Message {
    id: number;
    nickname: string;
    avatar: string;
    text: string;
    timestamp: string;
    status: string;
    messageType: string;
    error: string | null;
    replyTo: number | null;
    attachments: any[];
    reactions: string[];
    userColor: string;
}

export async function sendMessageToServer(message: Message): Promise<void> {
    try {
        const response = await axios.post<Message>('https://737dc8bd49e8d910.mokky.dev/message', message, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Сообщение успешно отправлено:', response.data);
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        throw error;
    }
}