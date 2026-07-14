import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import FilterPanel from '../components/FilterPanel'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { products, categoryLabels, subCategoriesByMain, brands, type MainCategory } from '../data/products'

export default function CategoryPage({ mainCategory }: { mainCategory: MainCategory }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<Record<string, string[]>>({})
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const all = useMemo(
    () => products.filter((p) => p.mainCategory === mainCategory),
    [mainCategory]
  )

  const allSizes = useMemo(
    () => Array.from(new Set(all.flatMap((p) => p.sizes))).sort(),
    [all]
  )
  const allColors = useMemo(() => Array.from(new Set(all.flatMap((p) => p.colors))), [all])

  const filterGroups = [
    { label: 'Marca', options: brands },
    { label: 'Categoria', options: subCategoriesByMain[mainCategory] },
    { label: 'Tamanho', options: allSizes },
    { label: 'Cor', options: allColors },
  ]

  const toggleFilter = (group: string, value: string) => {
    setActive((prev) => {
      const current = prev[group] ?? []
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      return { ...prev, [group]: next }
    })
  }

  const filtered = all.filter((p) => {
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.brand.toLowerCase().includes(query.toLowerCase())) {
      return false
    }
    if (active['Marca']?.length && !active['Marca'].includes(p.brand)) return false
    if (active['Categoria']?.length && !active['Categoria'].includes(p.subCategory)) return false
    if (active['Tamanho']?.length && !p.sizes.some((s) => active['Tamanho'].includes(s))) return false
    if (active['Cor']?.length && !p.colors.some((c) => active['Cor'].includes(c))) return false
    return true
  })

  const activeCount = Object.values(active).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: categoryLabels[mainCategory] }]} />

        <div className="flex items-end justify-between flex-wrap gap-4 mt-5 mb-10">
          <h1 className="font-display text-4xl md:text-6xl uppercase text-paper">
            {categoryLabels[mainCategory]}
          </h1>
          <p className="font-mono text-xs uppercase tracking-wider text-concrete">
            {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}
          </p>
        </div>

        {/* Search + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-3 border border-smoke px-4 py-3 flex-1 focus-within:border-paper transition-colors">
            <Search size={16} className="text-concrete" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar produto ou marca..."
              className="bg-transparent outline-none text-sm text-paper placeholder:text-concrete w-full"
            />
          </div>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-smoke px-4 py-3 text-paper text-xs font-mono uppercase tracking-wider"
          >
            <SlidersHorizontal size={15} /> Filtros {activeCount > 0 && `(${activeCount})`}
          </button>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <FilterPanel
              groups={filterGroups}
              active={active}
              onToggle={toggleFilter}
              onClear={() => setActive({})}
            />
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-display text-2xl uppercase text-paper mb-2">Nenhum produto encontrado</p>
                <p className="text-concrete text-sm">Tente ajustar os filtros ou a pesquisa.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 6) * 60}>
                    <ProductCard product={p} index={i} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/80" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-ink border-l border-smoke p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="font-display text-xl uppercase text-paper">Filtros</p>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-paper">
                <X size={22} />
              </button>
            </div>
            <FilterPanel
              groups={filterGroups}
              active={active}
              onToggle={toggleFilter}
              onClear={() => setActive({})}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full bg-paper text-ink py-3 font-mono text-xs uppercase tracking-wider"
            >
              Ver {filtered.length} produtos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
