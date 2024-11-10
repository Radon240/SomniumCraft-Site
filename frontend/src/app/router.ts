import { computed, ref } from "vue";
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import MainPage from "@/pages/main-page.vue";
import BlogPage from "@/features/blog/blog.vue";
import NewsPage from "@/features/news/news.vue";
import WikiPage from "@/pages/wiki/ui.vue";
import NotFound from "@/pages/404.vue";
import RulesPage from "@/pages/rules-page.vue";
import OtherPage from "@/pages/other/other-page.vue";

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/main' },
    { path: '/main', name: 'MainPage', component: MainPage },
    { path: '/wiki', name: 'WikiPage', component: WikiPage },
    { path: '/blog', name: 'BlogPage', component: BlogPage },
    { path: '/news', name: 'NewsPage', component: NewsPage },
    { path: '/rules', name: 'RulesPage', component: RulesPage },
    { path: '/other', name: 'OtherPage', component: OtherPage },
    {
        path: '/articles/:articleTitle',
        name: 'Article',
        component: WikiPage,
        props: true
    },
    {
        path: '/categories/:id',
        name: 'Category',
        component: WikiPage,
        props: true
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const currentPath = ref<string>(window.location.hash);

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
});

const currentView = computed((): typeof NotFound => {
    return routes[!(!currentPath.value.slice(1) && !'/')] || NotFound;
});

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;