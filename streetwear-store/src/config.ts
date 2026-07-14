// Configurações gerais da loja — troque pelos dados reais do cliente.
export const siteConfig = {
  storeName: 'CONCRETO',
  tagline: 'Streetwear, camisas de time e tênis selecionados.',
  whatsappNumber: '5519999999999', // formato: DDI+DDD+numero, sem espaços ou símbolos
  instagramHandle: '@concreto.store',
  instagramUrl: 'https://instagram.com/concreto.store',
  email: 'contato@concreto.com.br',
  address: 'Rua Exemplo, 123 — Limeira, SP',
  hours: 'Seg a Sáb, 10h às 19h',
}

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`
}
