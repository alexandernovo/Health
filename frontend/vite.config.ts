import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@dialogs': path.resolve(__dirname, './src/dialogs'),
      '@middleware': path.resolve(__dirname, './src/middleware'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@store': path.resolve(__dirname, './src/store'),
      '@reports': path.resolve(__dirname, './src/reports'),
      '@types': path.resolve(__dirname, './src/datatypes'),
    }
  }
})
