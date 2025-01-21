import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port  = process.env.PORT || 3000

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    open:true,
    host: '0.0.0.0',
    port:port,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
      },
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      }
    }
  }
})
