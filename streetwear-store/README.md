# CONCRETO — Vitrine Streetwear

Vitrine digital premium para mostrar o catálogo da loja (streetwear, camisas de
time e tênis) e direcionar o cliente para WhatsApp/Instagram. Construído como
demo estática para aprovação do cliente antes de virar produto em produção.

**Stack:** React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + lucide-react + React Router.

> ⚠️ Esta versão é uma **vitrine de demonstração estática**, pensada para rodar
> 100% no GitHub Pages. O painel `/admin` é funcional só localmente (salva no
> `localStorage` do seu navegador) — ainda não há banco de dados real. Veja a
> seção "Caminho para produção" no fim deste arquivo.

---

## Rodando localmente

\`\`\`bash
npm install
npm run dev
\`\`\`

Abra http://localhost:5173

---

## Publicando no GitHub Pages (passo a passo)

### 1. Crie o repositório no GitHub
Crie um repositório novo, por exemplo: \`loja-streetwear\`.

### 2. Ajuste o "base" no vite.config.ts
Abra \`vite.config.ts\` e troque a linha \`base\` para o nome EXATO do seu
repositório, com barra no início e no fim:

\`\`\`ts
base: '/loja-streetwear/',
\`\`\`

Se for publicar em \`usuario.github.io\` (repositório raiz, sem subpasta), use:

\`\`\`ts
base: '/',
\`\`\`

### 3. Suba o código

\`\`\`bash
git init
git add .
git commit -m "Primeira versão da vitrine"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/loja-streetwear.git
git push -u origin main
\`\`\`

### 4. Ative o GitHub Pages via Actions
No repositório, vá em Settings -> Pages. Em "Build and deployment -> Source",
selecione "GitHub Actions".

Esse repositório já vem com o workflow \`.github/workflows/deploy.yml\`, que
builda e publica automaticamente toda vez que você der push na branch main.
Depois do primeiro push, acompanhe em "Actions" até o workflow terminar.

### 5. Acesse o site
O endereço será:

\`\`\`
https://SEU-USUARIO.github.io/loja-streetwear/
\`\`\`

Esse é o link que você manda para o cliente aprovar.

---

## Estrutura de páginas

- \`/\` — Home (hero, marquee, destaques, produtos selecionados)
- \`/streetwear\`, \`/camisas-de-time\`, \`/tenis\` — catálogos com filtro e busca
- \`/produto/:id\` — página de produto com galeria, tamanhos, WhatsApp/Instagram
- \`/sobre\` — história, missão, visão, valores
- \`/contato\` — formulário, mapa, horário, redes
- \`/admin\` — painel de demonstração (CRUD de produtos local, senha demo123)

Produtos, marcas e categorias ficam em \`src/data/products.ts\` — edite esse
arquivo para trocar o catálogo de exemplo pelos produtos reais do cliente.
Dados da loja (nome, WhatsApp, Instagram, endereço) ficam em \`src/config.ts\`.

As imagens de produto atualmente são placeholders ilustrados (silhuetas) —
veja \`src/components/ProductVisual.tsx\`. Troque por fotos reais assim que o
cliente fornecer o material fotográfico.

---

## Caminho para produção

Quando o cliente aprovar o layout, a evolução natural é:

1. Migrar para Next.js (mantendo os mesmos componentes/visual).
2. Conectar Supabase (Postgres + Storage) para produtos, categorias, marcas,
   imagens e banners reais — substituindo o localStorage do /admin.
3. Implementar autenticação real no painel admin.
4. Deploy em Vercel (suporta rotas dinâmicas e API routes que o GitHub Pages
   não suporta).
5. Quando fizer sentido, adicionar carrinho, login de cliente, pagamento e
   controle de estoque — a estrutura de dados já foi pensada para isso.
