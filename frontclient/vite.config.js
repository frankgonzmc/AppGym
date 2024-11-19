import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backendgym:5000', // Cambia esto si tu servidor Express está en otro lugar
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
