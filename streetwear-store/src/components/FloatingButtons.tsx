import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { whatsappLink } from '../config'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-6 right-5 md:right-8 z-40 flex flex-col items-end gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
          className="w-11 h-11 flex items-center justify-center bg-smoke text-paper border border-concrete/40 hover:bg-paper hover:text-ink transition-colors"
        >
          <ArrowUp size={18} />
        </button>
      )}
      <a
        href={whatsappLink('Olá! Vim pelo site e gostaria de saber mais.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="w-14 h-14 flex items-center justify-center bg-signal text-ink rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  )
}
