import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ['**/*.MOV'],
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:3000', //proxy to connect to backend
        changeOrigin: true,
      }
    }
  }
})
