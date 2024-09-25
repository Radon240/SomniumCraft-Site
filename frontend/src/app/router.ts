import {computed, ref} from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import WikiPage from "..//pages/wiki/ui.vue"

const routes= [
    //{ path: '/', name: 'MainPage', component: MainPage },
    { path: '/', name: 'wiki', component: WikiPage },
    { path: '/resources', name: 'Resources'}
]

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
})

const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || NotFound
})

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;