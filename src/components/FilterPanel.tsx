import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterGroup {
  label: string
  options: string[]
}

export default function FilterPanel({
  groups,
  active,
  onToggle,
  onClear,
}: {
  groups: FilterGroup[]
  active: Record<string, string[]>
  onToggle: (group: string, value: string) => void
  onClear: () => void
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map((g) => [g.label, true]))
  )

  const activeCount = Object.values(active).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-xs uppercase tracking-wider text-paper">Filtros</p>
        {activeCount > 0 && (
          <button onClick={onClear} className="font-mono text-xs uppercase tracking-wider text-signal hover:underline">
            Limpar ({activeCount})
          </button>
        )}
      </div>

      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.label} className="border-b border-smoke pb-5">
            <button
              className="w-full flex items-center justify-between text-sm text-paper mb-3"
              onClick={() => setOpenGroups((s) => ({ ...s, [group.label]: !s[group.label] }))}
            >
              {group.label}
              <ChevronDown
                size={15}
                className={`transition-transform text-concrete ${openGroups[group.label] ? 'rotate-180' : ''}`}
              />
            </button>
            {openGroups[group.label] && (
              <div className="flex flex-wrap gap-2">
                {group.options.map((opt) => {
                  const isActive = active[group.label]?.includes(opt)
                  return (
                    <button
                      key={opt}
                      onClick={() => onToggle(group.label, opt)}
                      className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                        isActive
                          ? 'bg-paper text-ink border-paper'
                          : 'border-smoke text-concrete hover:border-paper hover:text-paper'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
