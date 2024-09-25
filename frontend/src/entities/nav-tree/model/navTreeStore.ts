import {defineStore} from "pinia";

import {wikiApi} from "../../../shared/api/wikiApiService.ts";
import {GetCategoriesTreeResponseElement, GetNavigationsTreeResponseElement} from "../../../shared/api";
import {NavTree, NavTreeNode} from "./types.ts";

const mapGetNavigationsTreeResponseElementToTreeNode = (navigation: GetNavigationsTreeResponseElement): NavTreeNode => {
    return {
        label: navigation.name,
        icon: navigation.icon ?? undefined,
        uri: navigation.uri ?? undefined,
        children: navigation.children.map(x => mapGetNavigationsTreeResponseElementToTreeNode(x))
    }
}

const mapGetCategoriesTreeResponseElementToTreeNode = (category: GetCategoriesTreeResponseElement): NavTreeNode => {
    return {
        label: category.name,
        uri: `/categories/${category.id}`,
        children: category.children.map(x => mapGetCategoriesTreeResponseElementToTreeNode(x))
    }
}

export type NavTreeStoreReturnType = ReturnType<typeof useNavTreeStore>

export const useNavTreeStore = defineStore("navTree", {
    state: () => ({
        navTree: {rootNodes:[]} as NavTree,
        categoriesTree: {rootNodes:[]} as NavTree
    }),
    actions: {
        async loadNavTree() {
            try {
                const result = (await wikiApi.api.getNavigationsTree()).data

                const navTreeNodes: Array<NavTreeNode>= []
                result.data.forEach( x =>
                    navTreeNodes.push(mapGetNavigationsTreeResponseElementToTreeNode(x))
                )
                this.navTree = {rootNodes:navTreeNodes}
            } catch (error) {
                return error
            }
        },
        async loadCategoriesTree(){
            try{
                const result = (await wikiApi.api.getCategoriesTree()).data

                const treeNodes: Array<NavTreeNode>= []
                result.data.forEach( x =>
                    treeNodes.push(mapGetCategoriesTreeResponseElementToTreeNode(x))
                )
                this.categoriesTree = {rootNodes:treeNodes}
            }catch (error){
                return error
            }
        }
    }
})

