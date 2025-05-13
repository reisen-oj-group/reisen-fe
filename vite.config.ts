import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { vitePluginFakeServer } from "vite-plugin-fake-server";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  const isBuild = command === 'build'
  return {
    plugins: [
      vue(),
      vueDevTools(),
      vitePluginFakeServer({
        include: 'mock',
        infixName: false,
        enableDev: true,
        enableProd: true
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
