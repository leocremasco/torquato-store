import type { MainCategory } from '../data/products'

interface Props {
  category: MainCategory
  className?: string
  index?: number
}

// Linhas de assinatura: silhuetas minimalistas desenhadas à mão (placeholder
// editorial). Substituir por fotografia real do produto na produção.
function Silhouette({ category }: { category: MainCategory }) {
  if (category === 'streetwear') {
    return (
      <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M65 50 L80 35 L120 35 L135 50 L160 65 L150 95 L135 88 L135 165 L65 165 L65 88 L50 95 L40 65 Z" />
        <path d="M80 35 C 85 50, 115 50, 120 35" />
      </svg>
    )
  }
  if (category === 'camisas') {
    return (
      <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M70 45 L95 35 L105 35 L130 45 L155 60 L143 88 L130 80 L130 165 L70 165 L70 80 L57 88 L45 60 Z" />
        <circle cx="100" cy="42" r="9" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M35 130 C 35 110, 50 105, 65 108 C 80 95, 100 90, 115 95 L 150 100 C 165 102, 170 115, 168 125 L 165 140 L 35 140 Z" />
      <path d="M35 140 L35 150 L168 150 L165 140" />
      <path d="M65 108 L70 122" />
    </svg>
  )
}

export default function ProductVisual({ category, className = '', index = 0 }: Props) {
  const tones = ['bg-smoke', 'bg-ink', 'bg-smoke']
  const tone = tones[index % tones.length]
  return (
    <div className={`relative overflow-hidden ${tone} ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)',
          color: '#f7f5f0',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-bone/25">
        <Silhouette category={category} />
      </div>
    </div>
  )
}
