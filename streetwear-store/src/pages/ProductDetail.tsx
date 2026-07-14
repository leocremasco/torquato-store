import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MessageCircle, Check } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import ProductVisual from '../components/ProductVisual'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { products, categoryLabels } from '../data/products'
import { siteConfig, whatsappLink } from '../config'
import InstagramIcon from '../components/InstagramIcon'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="font-display text-3xl uppercase text-paper mb-4">Produto não encontrado</p>
        <Link to="/" className="font-mono text-xs uppercase tracking-wider text-signal underline">
          Voltar para a home
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.mainCategory === product.mainCategory && p.id !== product.id)
    .slice(0, 4)

  const message = `Olá! Tenho interesse no produto "${product.name}" (${product.brand})${
    selectedSize ? ` no tamanho ${selectedSize}` : ''
  }. Ainda está disponível?`

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: categoryLabels[product.mainCategory], to: `/${product.mainCategory === 'camisas' ? 'camisas-de-time' : product.mainCategory}` },
            { label: product.name },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          {/* Galeria */}
          <div>
            <div className="aspect-square overflow-hidden mb-3">
              <ProductVisual category={product.mainCategory} className="w-full h-full" index={activeImage} />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden border transition-colors ${
                    activeImage === i ? 'border-paper' : 'border-smoke'
                  }`}
                >
                  <ProductVisual category={product.mainCategory} className="w-full h-full" index={i} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <Reveal>
            <div>
              {product.tag && (
                <span className="tag-sticker mb-4 inline-flex">
                  {product.tag === 'novo' ? 'Novo' : 'Mais vendido'}
                </span>
              )}
              <p className="font-mono text-xs uppercase tracking-wider text-concrete mb-2">{product.brand}</p>
              <h1 className="font-display text-3xl md:text-4xl uppercase text-paper mb-4">{product.name}</h1>
              <p className="font-mono text-2xl text-paper mb-6">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-concrete text-sm leading-relaxed mb-8 max-w-md">{product.description}</p>

              <div className="mb-8">
                <p className="font-mono text-xs uppercase tracking-wider text-paper mb-3">Tamanho</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 px-3 py-2.5 text-sm font-mono border transition-colors ${
                        selectedSize === size
                          ? 'bg-paper text-ink border-paper'
                          : 'border-smoke text-paper hover:border-paper'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="font-mono text-xs uppercase tracking-wider text-paper mb-3">Cor</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span key={c} className="px-3 py-1.5 text-xs font-mono border border-smoke text-concrete">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-paper mb-8">
                <Check size={16} className="text-signal" />
                {product.inStock ? 'Disponível em estoque' : 'Sob encomenda'}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-paper text-ink px-6 py-4 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors"
                >
                  <MessageCircle size={16} /> Chamar no WhatsApp
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-paper text-paper px-6 py-4 font-mono text-xs uppercase tracking-wider hover:bg-paper hover:text-ink transition-colors"
                >
                  <InstagramIcon size={16} /> Enviar no Instagram
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-smoke grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-mono text-[11px] uppercase text-concrete mb-1">Categoria</p>
                  <p className="text-paper">{product.subCategory}</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase text-concrete mb-1">Marca</p>
                  <p className="text-paper">{product.brand}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl uppercase text-paper mb-10">Você também pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
