import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative assets make the build work both on a custom domain and under /<repo>/ on GitHub Pages.
  base: './',
})
