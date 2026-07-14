import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Lock, LayoutDashboard, Package, FileText, Save } from 'lucide-react'
import { products as seedProducts, type Product, type MainCategory } from '../data/products'

const STORAGE_KEY = 'admin_demo_products_v1'
const TEXT_KEY = 'admin_demo_texts_v1'

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* noop */
  }
  return seedProducts
}

function emptyProduct(): Product {
  return {
    id: `new-${Date.now()}`,
    name: '',
    brand: '',
    price: 0,
    mainCategory: 'streetwear',
    subCategory: '',
    sizes: [],
    colors: [],
    description: '',
    inStock: true,
  }
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState('')
  const [tab, setTab] = useState<'produtos' | 'textos'>('produtos')
  const [list, setList] = useState<Product[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [heroTitle, setHeroTitle] = useState('Vista atitude. Vista autenticidade.')
  const [heroSubtitle, setHeroSubtitle] = useState(
    'As melhores peças streetwear, camisas de time e tênis selecionados para quem vive o estilo.'
  )
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setList(loadProducts())
    try {
      const raw = localStorage.getItem(TEXT_KEY)
      if (raw) {
        const t = JSON.parse(raw)
        setHeroTitle(t.heroTitle ?? heroTitle)
        setHeroSubtitle(t.heroSubtitle ?? heroSubtitle)
      }
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const persist = (next: Product[]) => {
    setList(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const saveTexts = () => {
    localStorage.setItem(TEXT_KEY, JSON.stringify({ heroTitle, heroSubtitle }))
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  if (!authed) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center px-5">
        <div className="max-w-sm w-full">
          <div className="flex items-center gap-2 mb-6 text-signal">
            <Lock size={18} />
            <p className="font-mono text-xs uppercase tracking-wider">Área restrita</p>
          </div>
          <h1 className="font-display text-3xl uppercase text-paper mb-6">Painel admin</h1>
          <p className="text-concrete text-sm mb-6 leading-relaxed">
            Esta é uma demonstração local do painel administrativo. Senha de demo:{' '}
            <span className="text-paper font-mono">demo123</span>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (pass === 'demo123') setAuthed(true)
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Senha"
              className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm transition-colors"
            />
            <button className="w-full bg-paper text-ink py-3 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors">
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 md:pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center gap-2 mb-2 text-signal">
          <LayoutDashboard size={16} />
          <p className="font-mono text-xs uppercase tracking-wider">Demonstração local</p>
        </div>
        <h1 className="font-display text-3xl md:text-5xl uppercase text-paper mb-2">Painel administrativo</h1>
        <p className="text-concrete text-sm mb-10 max-w-xl">
          Tudo aqui é salvo apenas no seu navegador (localStorage), para fins de demonstração ao cliente. Na
          versão de produção, isso será conectado a um banco de dados real (Supabase) com upload de imagens.
        </p>

        <div className="flex gap-2 mb-10 border-b border-smoke">
          <button
            onClick={() => setTab('produtos')}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider border-b-2 transition-colors ${
              tab === 'produtos' ? 'border-signal text-paper' : 'border-transparent text-concrete hover:text-paper'
            }`}
          >
            <Package size={14} /> Produtos
          </button>
          <button
            onClick={() => setTab('textos')}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider border-b-2 transition-colors ${
              tab === 'textos' ? 'border-signal text-paper' : 'border-transparent text-concrete hover:text-paper'
            }`}
          >
            <FileText size={14} /> Textos institucionais
          </button>
        </div>

        {tab === 'produtos' && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setEditing(emptyProduct())}
                className="inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors"
              >
                <Plus size={15} /> Novo produto
              </button>
            </div>

            <div className="border border-smoke overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-smoke text-left font-mono text-[11px] uppercase tracking-wider text-concrete">
                    <th className="p-4">Produto</th>
                    <th className="p-4">Categoria</th>
                    <th className="p-4">Preço</th>
                    <th className="p-4">Etiqueta</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <tr key={p.id} className="border-b border-smoke last:border-0">
                      <td className="p-4 text-paper">
                        {p.name}
                        <span className="block text-concrete text-xs font-mono">{p.brand}</span>
                      </td>
                      <td className="p-4 text-concrete">{p.subCategory}</td>
                      <td className="p-4 font-mono text-paper">R$ {p.price.toFixed(2).replace('.', ',')}</td>
                      <td className="p-4">
                        {p.tag ? (
                          <span className="tag-sticker">{p.tag === 'novo' ? 'Novo' : 'Mais vendido'}</span>
                        ) : (
                          <span className="text-concrete text-xs">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setEditing(p)} className="p-2 hover:text-signal text-paper">
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => persist(list.filter((x) => x.id !== p.id))}
                            className="p-2 hover:text-signal text-paper"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'textos' && (
          <div className="max-w-xl space-y-6">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-paper block mb-2">
                Título do banner principal
              </label>
              <input
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-paper block mb-2">
                Subtítulo do banner principal
              </label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm resize-none"
              />
            </div>
            <button
              onClick={saveTexts}
              className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors"
            >
              <Save size={15} /> {saved ? 'Salvo!' : 'Salvar textos'}
            </button>
            <p className="text-concrete text-xs leading-relaxed pt-4 border-t border-smoke">
              Nota de demonstração: nesta versão estática, o conteúdo da Home ainda não lê esses textos
              automaticamente. Na versão de produção (Next.js + Supabase), o painel atualizará o site em
              tempo real.
            </p>
          </div>
        )}
      </div>

      {editing && (
        <ProductFormModal
          product={editing}
          onClose={() => setEditing(null)}
          onSave={(p) => {
            const exists = list.some((x) => x.id === p.id)
            const next = exists ? list.map((x) => (x.id === p.id ? p : x)) : [p, ...list]
            persist(next)
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}

function ProductFormModal({
  product,
  onClose,
  onSave,
}: {
  product: Product
  onClose: () => void
  onSave: (p: Product) => void
}) {
  const [form, setForm] = useState<Product>(product)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-ink/85" onClick={onClose} />
      <div className="relative bg-ink border border-smoke max-w-lg w-full max-h-[85vh] overflow-y-auto p-7">
        <h2 className="font-display text-2xl uppercase text-paper mb-6">
          {product.name ? 'Editar produto' : 'Novo produto'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(form)
          }}
          className="space-y-4"
        >
          <input
            required
            placeholder="Nome do produto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
          />
          <input
            required
            placeholder="Marca"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              type="number"
              step="0.01"
              placeholder="Preço"
              value={form.price || ''}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
              className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
            />
            <select
              value={form.mainCategory}
              onChange={(e) => setForm({ ...form, mainCategory: e.target.value as MainCategory })}
              className="w-full bg-ink border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
            >
              <option value="streetwear">Streetwear</option>
              <option value="camisas">Camisas de Time</option>
              <option value="tenis">Tênis & Calçados</option>
            </select>
          </div>
          <input
            placeholder="Subcategoria (ex: Moletons, Retrô, Running)"
            value={form.subCategory}
            onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
            className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
          />
          <input
            placeholder="Tamanhos, separados por vírgula (P, M, G)"
            value={form.sizes.join(', ')}
            onChange={(e) => setForm({ ...form, sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
          />
          <input
            placeholder="Cores, separadas por vírgula"
            value={form.colors.join(', ')}
            onChange={(e) => setForm({ ...form, colors: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
          />
          <textarea
            rows={3}
            placeholder="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm resize-none"
          />
          <select
            value={form.tag ?? ''}
            onChange={(e) => setForm({ ...form, tag: (e.target.value || undefined) as Product['tag'] })}
            className="w-full bg-ink border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm"
          >
            <option value="">Sem etiqueta</option>
            <option value="novo">Novo</option>
            <option value="mais-vendido">Mais vendido</option>
          </select>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-smoke text-paper py-3 font-mono text-xs uppercase tracking-wider hover:border-paper transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-paper text-ink py-3 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
