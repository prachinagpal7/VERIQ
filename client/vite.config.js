import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})

//first, we Installed tailwindcss and @tailwindcss/vite via npm in our project, then we are just trying to @tailwindcss/vite plugin to our vite configuration