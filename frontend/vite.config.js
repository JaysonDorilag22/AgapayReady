import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false,
        ws: true,
        changeOrigin: true // Add this line to handle CORS properly
      },
    },
  },
  define: {
    'process.env': process.env
  }
})
