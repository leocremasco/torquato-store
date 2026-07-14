import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Reveal from '../components/Reveal'
import ProductVisual from '../components/ProductVisual'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { whatsappLink } from '../config'

const highlights = [
  {
    key: 'streetwear' as const,
    title: 'Streetwear',
    desc: 'Moletons, jaquetas e peças autorais para construir seu estilo do dia a dia.',
    to: '/streetwear',
  },
  {
    key: 'camisas' as const,
    title: 'Camisas de Time',
    desc: 'Clubes brasileiros, europeus, seleções e retrôs selecionados para torcedores exigentes.',
    to: '/camisas-de-time',
  },
  {
    key: 'tenis' as const,
    title: 'Tênis & Calçados',
    desc: 'Lifestyle, running, basquete e skate — modelos premium para todo passo.',
    to: '/tenis',
  },
]

const tickerWords = ['ATITUDE', 'AUTENTICIDADE', 'STREETWEAR', 'CULTURA', 'ESTILO', 'EXCLUSIVIDADE']

export default function Home() {
  const destaque = products.filter((p) => p.tag).slice(0, 8)

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <ProductVisual category="streetwear" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 md:pb-28 w-full">
          <Reveal>
            <p className="tag-sticker mb-6">Coleção Atual</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[13vw] md:text-[7vw] leading-[0.92] text-paper uppercase">
              Vista atitude.
              <br />
              Vista <span className="text-stroke">autenticidade.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 max-w-md text-concrete text-sm md:text-base leading-relaxed">
              As melhores peças streetwear, camisas de time e tênis selecionados para quem vive o estilo.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/streetwear"
                className="inline-flex items-center gap-2 bg-paper text-ink px-7 py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors"
              >
                Ver coleção <ArrowRight size={15} />
              </Link>
              <a
                href={whatsappLink('Olá! Vim pelo site e gostaria de saber mais.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-paper text-paper px-7 py-3.5 font-mono text-xs uppercase tracking-wider hover:bg-paper hover:text-ink transition-colors"
              >
                Fale conosco
              </a>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-6 right-6 md:right-8 z-10 text-paper/60 animate-bounce">
          <ArrowDown size={20} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-paper text-ink py-3 overflow-hidden border-y border-smoke">
        <div className="marquee-track">
          {[...tickerWords, ...tickerWords].map((w, i) => (
            <span key={i} className="font-display text-xl md:text-2xl uppercase px-6 whitespace-nowrap">
              {w} <span className="text-signal">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* DESTAQUES */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-signal mb-3">Explore</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl md:text-6xl uppercase text-paper mb-14">Categorias</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <Reveal key={h.key} delay={i * 120}>
              <Link to={h.to} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.07]">
                    <ProductVisual category={h.key} className="w-full h-full" index={i} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl md:text-3xl uppercase text-paper">{h.title}</h3>
                    <p className="text-concrete text-sm mt-2 mb-4 max-w-[26ch]">{h.desc}</p>
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper border-b border-signal pb-1 group-hover:gap-3 transition-all">
                      Explorar <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MAIS VENDIDOS / NOVOS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24 md:pb-32">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-wider text-signal mb-3">Selecionados</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-paper">Em destaque</h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
          {destaque.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 90}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA FAIXA */}
      <section className="bg-paper text-ink py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-6">
              Não achou o que procurava?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-concrete max-w-lg mx-auto mb-8">
              Fale direto com a gente pelo WhatsApp. Te ajudamos a encontrar a peça certa.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <a
              href={whatsappLink('Olá! Não encontrei o que procurava no site, podem me ajudar?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-wider hover:bg-signal hover:text-ink transition-colors"
            >
              Falar no WhatsApp <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
