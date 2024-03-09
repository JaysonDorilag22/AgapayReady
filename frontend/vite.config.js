import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const backendUrl = process.env.VITE_BACKEND_URL;

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "https://agapayready.onrender.com",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
