import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@resources': fileURLToPath(new URL('./src/resources', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.mojang.com', // Целевой сервер
        changeOrigin: true, // Меняет Origin заголовок на целевой
        rewrite: (path) => path.replace(/^\/api/, ''), // Убираем /api из пути
      },

    }
  }
})
