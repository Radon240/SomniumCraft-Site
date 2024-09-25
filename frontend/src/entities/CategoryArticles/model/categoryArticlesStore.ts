import {defineStore} from "pinia";

import {GetCategoryArticlesResponseElement} from "..//..//..//shared/api";
import {CategoryArticlesElement, CategoryArticles} from "./types.ts";
import {wikiApi} from "../../../shared/api/wikiApiService.ts";



const mapGetCategoryArticlesElementResponseToCategoryArticlesElement = (categoriesArticle: GetCategoryArticlesResponseElement): CategoryArticlesElement => {
    return{
        id: categoriesArticle.id,
        title: categoriesArticle.title
    }
}

export const useCategoryArticlesStore = defineStore("categoryArticles", {
    state: () => ({
        categoryArticles: {data: []} as CategoryArticles
    }),
    actions: {
        async loadCategoryArticles(id: string){
            try{
                const result = (await wikiApi.api.getCategoryArticles(id)).data

                const categoryArticles: Array<CategoryArticlesElement>= []
                result.data.forEach(x =>
                    categoryArticles.push(mapGetCategoryArticlesElementResponseToCategoryArticlesElement(x))
                )
                this.categoryArticles = {data: categoryArticles}
            }catch (error){
                return error
            }
        }
    }
})

