import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import ProductVisual from './ProductVisual'

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link to={`/produto/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <ProductVisual category={product.mainCategory} className="w-full h-full" index={index} />
        </div>
        {product.tag && (
          <span className="absolute top-3 left-3 tag-sticker">
            {product.tag === 'novo' ? 'Novo' : 'Mais vendido'}
          </span>
        )}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-paper text-ink text-center py-3 font-mono text-[11px] uppercase tracking-wider">
          Ver produto
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-concrete">{product.brand}</p>
          <h3 className="text-sm md:text-base text-paper leading-snug mt-0.5">{product.name}</h3>
        </div>
        <p className="font-mono text-sm text-paper whitespace-nowrap">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p>
      </div>
    </Link>
  )
}
