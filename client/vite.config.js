import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your backend URL if different
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ['cookie'],  // <- Prevent Vite from pre-bundling 'cookie'
  },
  build: {
    commonjsOptions: {
      exclude: ['cookie'], // <- Prevent Vite from bundling 'cookie' in production build
    },
  },
})
