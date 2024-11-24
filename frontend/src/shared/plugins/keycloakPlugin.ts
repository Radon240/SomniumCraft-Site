import type { KeycloakInitOptions } from "keycloak-js"
import { type App } from "vue"
import useAuthStore from "@/entities/Auth/AuthStore.ts"
import { keycloakService } from "@/shared/service/keycloakService"

const keycloakPlugin = {
    install(app: App, options: { keycloakInitOptions: KeycloakInitOptions }) {
        keycloakService.init(options.keycloakInitOptions, useAuthStore())
    }
}

export default keycloakPlugin