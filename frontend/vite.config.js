import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
