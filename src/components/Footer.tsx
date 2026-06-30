import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { siteConfig, whatsappLink } from '../config'
import InstagramIcon from './InstagramIcon'

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-smoke pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <Link to="/" className="font-display text-2xl tracking-wide text-paper">
              {siteConfig.storeName}
            </Link>
            <p className="mt-4 text-sm text-concrete max-w-xs leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6 text-paper">
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
                <InstagramIcon size={18} />
              </a>
              <a href={whatsappLink('Olá! Vim pelo site e gostaria de saber mais.')} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="tag-sticker outline mb-4">Navegação</p>
            <ul className="space-y-2 text-sm text-concrete">
              <li><Link to="/" className="hover:text-paper">Home</Link></li>
              <li><Link to="/sobre" className="hover:text-paper">Sobre</Link></li>
              <li><Link to="/contato" className="hover:text-paper">Contato</Link></li>
            </ul>
          </div>

          <div>
            <p className="tag-sticker outline mb-4">Categorias</p>
            <ul className="space-y-2 text-sm text-concrete">
              <li><Link to="/streetwear" className="hover:text-paper">Streetwear</Link></li>
              <li><Link to="/camisas-de-time" className="hover:text-paper">Camisas de Time</Link></li>
              <li><Link to="/tenis" className="hover:text-paper">Tênis & Calçados</Link></li>
            </ul>
          </div>

          <div>
            <p className="tag-sticker outline mb-4">Contato</p>
            <ul className="space-y-2 text-sm text-concrete">
              <li>{siteConfig.address}</li>
              <li>{siteConfig.hours}</li>
              <li>{siteConfig.instagramHandle}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-smoke pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs text-concrete font-mono">
            © {new Date().getFullYear()} {siteConfig.storeName}. Todos os direitos reservados.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-0 border border-smoke focus-within:border-paper transition-colors"
          >
            <input
              type="email"
              required
              placeholder="seu e-mail para novidades"
              className="bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-concrete outline-none w-56"
            />
            <button className="px-4 py-2.5 bg-paper text-ink text-xs font-mono uppercase tracking-wider hover:bg-signal transition-colors">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}
