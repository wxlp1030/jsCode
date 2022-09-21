import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  dev: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 配置访问的服务器地址
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true 
      },
    }
  }
})
