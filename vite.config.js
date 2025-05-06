import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite.config.js
  base:'/brightspace',
  server: {
    proxy: {
      '/api': {
        target: 'https://web.ics.purdue.edu',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/~omihalic/brightspace-app'),
      },
    },
  },


})

