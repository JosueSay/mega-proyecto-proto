import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

const outDir = isGitHubActions
  ? 'dist'
  : '/mnt/c/Users/josue/OneDrive/Learning/UVG/2026/Proyecto Graduación/fase2/investigacion/cuarta-etapa/presentacion/prototipos'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
