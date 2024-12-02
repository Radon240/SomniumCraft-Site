import { Api } from "../api/index.ts"
import useAuthStore from "@/entities/Auth/AuthStore.ts"
import { HttpStatusCode } from "axios"
import { keycloakService } from "@/shared/service/keycloakService.ts"
import { wikiConfig } from "@/shared/config/wikiApiConfig.ts"

export const wikiApi = new Api({
    baseURL: wikiConfig.apiUrl
})

wikiApi.instance.interceptors.request.use((config) => {
        const authStore = useAuthStore()
        if (authStore.isAuthenticated) {
            config.headers.Authorization = `Bearer ${authStore.accessToken as string}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

wikiApi.instance.interceptors.response.use((response) => response,
    async function(error) {
        const originalRequest = error?.config
        const status = error?.response?.status

        if ((status === HttpStatusCode.Unauthorized || status === HttpStatusCode.NotFound) && !originalRequest?.retry) {
            originalRequest.retry = true
            await keycloakService.refreshToken()
            originalRequest.headers.Authorization = `Bearer ${useAuthStore().accessToken as string}`
            return wikiApi.instance(originalRequest)
        }
        return Promise.reject(error)
    }
)
