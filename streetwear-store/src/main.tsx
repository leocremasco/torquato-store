import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// HashRouter é usado de propósito: o GitHub Pages não suporta rotas internas
// (ex: /produto/123) sem configuração de servidor. Com Hash (#/produto/123)
// tudo funciona perfeitamente, inclusive ao recarregar a página ou compartilhar links.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
