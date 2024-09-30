import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/forgot-password': {
        target: 'http://localhost:5000/api', // Cambia esto por el puerto en el que corre tu servidor Express
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
