import { ref } from "vue";
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

import MainPage from "@/pages/main-page.vue";
import BlogPage from "@/features/chat/chat.vue";
import NewsPage from "@/features/news/news.vue";
import NotFound from "@/pages/404.vue";
import RulesPage from "@/pages/rules-page.vue";
import OtherPage from "@/pages/other/other-page.vue";
import WikiLayout from "@/pages/wiki/wiki-layout.vue";
import WikiPlaceholder from "@/widgets/wiki-placeholder/ui.vue";
import WikiArticlePage from "@/widgets/wiki-content/ui.vue";
import WikiArticleEditor from "@/widgets/article-editor/ui.vue"
import WikiReview from "@/widgets/wiki-review/ui.vue"
import PersonalAccountPage from "@/pages/personal-account-page.vue";
import {UserRole} from "@/entities/Auth/UserRole.ts";
import {keycloakService} from "@/shared/service/keycloakService.ts";
import useAuthStore from "@/entities/Auth/AuthStore.ts";

declare module "vue-router" {
    interface RouteMeta {
        allowedRoles?: UserRole[]
    }
}

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/main' },
    { path: '/main', name: 'MainPage', component: MainPage },
    { path: '/chat', name: 'BlogPage', component: BlogPage },
    { path: '/news', name: 'NewsPage', component: NewsPage },
    { path: '/rules', name: 'RulesPage', component: RulesPage },
    { path: '/other', name: 'OtherPage', component: OtherPage },
    { path: '/account', name: 'PersonalAccountPage', component: PersonalAccountPage, meta: { allowedRoles: [UserRole.USER]}},
    {
        path: '/wiki',
        component: WikiLayout,
        children: [
            {
                path: '',
                name: 'WikiHome',
                component: WikiPlaceholder
            },
            {
                path: '/articles/:articleTitle',
                name: 'Article',
                component: WikiArticlePage
            },
            {
                name: "articleEditor",
                path: "/articles/editor/:articleId?",
                component: WikiArticleEditor,
                props: true,
                meta: { allowedRoles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.USER] }
            },
        ]
    },
    {
        name: "review",
        path: "/review/:revisionId?",
        component: WikiReview,
        props: true,
        meta: { allowedRoles: [UserRole.ADMIN, UserRole.EDITOR] }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const currentPath = ref<string>(window.location.hash);

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
});


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // Вернуться к сохранённой позиции (например, при нажатии "назад")
            return savedPosition;
        } else {
            // Перейти к началу страницы
            return { top: 0, left: 0 };
        }
    },
});

router.beforeEach(async (to, from) => {
    if (!keycloakService.isInitialized()) {
        await new Promise<void>(resolve => {
            keycloakService.onKeycloakReady(() => resolve())
        })
    }
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    let hasAnyRole = to.meta.allowedRoles === undefined
    const requireAuthentication = to.meta.allowedRoles !== undefined

    if(requireAuthentication && !authStore.isAuthenticated) {
        await keycloakService.login({ redirectUri: `${window.location.origin}/${to.fullPath}` })
    }

    to.meta.allowedRoles?.forEach((role) => {
        if (authStore.hasRole(role)) {
            hasAnyRole = true
        }
    })

    if (!hasAnyRole)
        return { name: "MainPage" }
})

export default router;