export interface WikiConfig {
    apiUrl: string,
}

export const wikiConfig: WikiConfig = {
    apiUrl: import.meta.env.VITE_API_URL ?? `http://${window.location.hostname}`,
}