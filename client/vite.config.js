import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Empty module shim for 'cookie'
const emptyModule = () => ({
  name: 'empty-module',
  resolveId(id) {
    if (id === 'cookie') return id
    return null
  },
  load(id) {
    if (id === 'cookie') return 'export default {}'
    return null
  }
})

export default defineConfig({
  plugins: [react(), tailwindcss(), emptyModule()],
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
    noExternal: ['cookie'],
  },
})
