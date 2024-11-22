// src/stores/userStore.ts
import { defineStore } from 'pinia';

interface UserState {
    nickname: string;
    isLoggedIn: boolean;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        nickname: 'Radon24',
        isLoggedIn: true,
    }),
});
