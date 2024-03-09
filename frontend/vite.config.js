import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Proxy for development
        secure: false,
        changeOrigin: true, // Necessary for the correct handling of the 'Host' header
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix
      },
    },
  },
  plugins: [react()],
});
