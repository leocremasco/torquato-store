import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// IMPORTANTE: ao criar o repositório no GitHub, troque "base" abaixo para
// "/NOME-DO-SEU-REPOSITORIO/" (com as barras), exatamente o nome do repo.
// Ex: repo "loja-streetwear" -> base: '/loja-streetwear/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/streetwear-store/',
})
