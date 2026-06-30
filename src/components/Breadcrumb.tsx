import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex items-center flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider text-concrete">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={11} />}
          {item.to ? (
            <Link to={item.to} className="hover:text-paper transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-paper">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
