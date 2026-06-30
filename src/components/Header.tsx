import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Search, MessageCircle, Menu, X } from 'lucide-react'
import { siteConfig, whatsappLink } from '../config'
import InstagramIcon from './InstagramIcon'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Streetwear', to: '/streetwear' },
  { label: 'Camisas de Time', to: '/camisas-de-time' },
  { label: 'Tênis & Calçados', to: '/tenis' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const solid = scrolled || !isHome || open

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-ink/95 backdrop-blur border-b border-smoke' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="font-display text-xl md:text-2xl tracking-wide text-paper">
          {siteConfig.storeName}
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-mono text-[11px] uppercase tracking-wider">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative pb-1 transition-colors ${
                  isActive ? 'text-paper' : 'text-concrete hover:text-paper'
                } after:absolute after:left-0 after:bottom-0 after:h-px after:bg-signal after:transition-all ${
                  isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 text-paper">
          <button aria-label="Pesquisar" className="hover:text-signal transition-colors">
            <Search size={18} />
          </button>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-signal transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={whatsappLink('Olá! Vim pelo site e gostaria de saber mais.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-signal transition-colors"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <button
          className="lg:hidden text-paper"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink border-t border-smoke px-5 py-6 flex flex-col gap-5 font-mono text-sm uppercase tracking-wider">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="text-paper/90 hover:text-signal">
              {item.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-5 pt-3 border-t border-smoke text-paper">
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} />
            </a>
            <a href={whatsappLink('Olá! Vim pelo site e gostaria de saber mais.')} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
