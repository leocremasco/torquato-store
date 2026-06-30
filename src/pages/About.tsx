import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import ProductVisual from '../components/ProductVisual'
import { siteConfig } from '../config'

const values = [
  { title: 'Autenticidade', desc: 'Cada peça é escolhida a dedo, sem espaço para o genérico.' },
  { title: 'Qualidade', desc: 'Trabalhamos só com marcas e materiais que passam no nosso teste de uso real.' },
  { title: 'Atendimento próximo', desc: 'Conversa direta, sem robôs de atendimento — gente falando com gente.' },
  { title: 'Comunidade', desc: 'Construímos a marca junto com quem veste ela todos os dias.' },
]

export default function About() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Sobre' }]} />

        <Reveal>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-paper mt-5 mb-10 max-w-2xl">
            Streetwear não é roupa. É posicionamento.
          </h1>
        </Reveal>
      </div>

      <Reveal>
        <div className="relative h-[50vh] min-h-[320px] my-12">
          <ProductVisual category="camisas" className="w-full h-full" />
        </div>
      </Reveal>

      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-signal mb-3">Nossa história</p>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-concrete leading-relaxed mb-6">
            A {siteConfig.storeName} nasceu da vontade de reunir, num só lugar, o que tem de melhor entre
            streetwear, camisas de time e tênis — sem aquele ar de loja genérica. Começamos pequenos,
            selecionando peça por peça, e seguimos com o mesmo critério até hoje: só entra no catálogo o que a
            gente mesmo usaria.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="text-concrete leading-relaxed mb-16">
            Hoje atendemos clientes que entendem moda como identidade — e que não abrem mão de qualidade,
            autenticidade e atendimento de verdade.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <Reveal>
            <div className="border border-smoke p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-signal mb-3">Missão</p>
              <p className="text-paper leading-relaxed">
                Conectar pessoas a peças que representem sua identidade, com curadoria honesta e atendimento
                próximo.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="border border-smoke p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-signal mb-3">Visão</p>
              <p className="text-paper leading-relaxed">
                Ser referência regional em streetwear e moda esportiva, reconhecida pela curadoria e pela
                experiência de compra.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl uppercase text-paper mb-10">Valores</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="border-t-2 border-signal pt-4">
                <h3 className="font-display text-xl uppercase text-paper mb-2">{v.title}</h3>
                <p className="text-concrete text-sm leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
