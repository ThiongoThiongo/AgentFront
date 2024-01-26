import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    
      port:3004,
      proxy:{
        '/api': {
          target:'https://instacartbackend.onrender.com',
          changeOrigin:true
        }
    
    }
  }
})