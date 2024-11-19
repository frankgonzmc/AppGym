import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backendgym:5000', // Backend local
        changeOrigin: true,
        secure: false,
      },
    },
  },
});