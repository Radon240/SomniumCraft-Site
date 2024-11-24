import { defineStore } from 'pinia'
import {wikiApi} from "@/shared/service/wikiApiService.ts";
import {GetArticleResponseAuthor, GetArticleResponseCategory, ReviewStatus} from "@/shared/api";

interface Article {
    id: string;
    title: string;
    content: string | null;
    contributors: GetArticleResponseAuthor[];
    /** @format uuid */
    revisionId: string | null;
    reviewStatus: ReviewStatus;
    /** @format date-time */
    submittedTimestamp: string | null;
    /** @format date-time */
    reviewTimestamp: string | null;
    categories: GetArticleResponseCategory[];
}

export const useArticleStore = defineStore('article', {
    state: () => ({
        article: null as Article | null,
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchArticle(articleTitle: string) {
            this.loading = true
            this.error = null
            try {
                const response = await wikiApi.api.getArticle(articleTitle)
                this.article = response.data
            } catch (err) {
                this.error = 'Failed to load article'
                console.error(err)
            } finally {
                this.loading = false
            }
        },
    },
})