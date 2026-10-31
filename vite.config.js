import { fileURLToPath, URL } from 'node:url'
const API_URL = import.meta.env.VITE_API_URL

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/jele.front/',

  plugins: [
    vue(),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    allowedHosts: true,
    proxy: {
      '/api': API_URL,
    },
  },

  preview: {
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      '/api': API_URL,
    },
  },
})