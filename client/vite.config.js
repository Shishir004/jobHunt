import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ['cookie'],
  },
  build: {
    commonjsOptions: {
      exclude: ['cookie'],
    },
  },
  ssr: {
    noExternal: ['cookie'],  // <== Add this line
  },
})
