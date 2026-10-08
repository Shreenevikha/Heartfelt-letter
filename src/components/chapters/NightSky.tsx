import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SITE, SKY } from '../../data/content'

export function NightSky() {
  const [open, setOpen] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const visited = useRef(new Set<string>())
  const byId = useMemo(() => Object.fromEntries(SKY.stars.map((star) => [star.id, star])), [])
  const active = SKY.stars.find((star) => star.id === open)

  return (
    <section id="chapter-sky" data-chapter="sky" className="chapter mood-sky">
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p className="kicker">The Constellation</p>
        <h2 className="display">My Dreams Have You in Them</h2>
        <div className="sky-stage relative mx-auto mt-10 w-full max-w-4xl">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {SKY.path.slice(0, -1).map((id, index) => {
              const from = byId[id]
              const to = byId[SKY.path[index + 1]]
              if (!from || !to) return null
              return (
                <line
                  key={`${id}-${index}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(201,123,150,0.75)"
                  strokeWidth="0.28"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={connected ? 0 : 1}
                  style={{ transition: `stroke-dashoffset 1.2s ease ${index * 0.06}s` }}
                />
              )
            })}
          </svg>
          {SKY.stars.map((star) => (
            <button
              key={star.id}
              type="button"
              className={`sky-star ${open === star.id ? 'on' : ''}`}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              aria-pressed={open === star.id}
              aria-label={star.label}
              onClick={() => {
                visited.current.add(star.id)
                setOpen(star.id)
                if (SKY.stars.every((item) => visited.current.has(item.id))) setConnected(true)
              }}
            >
              <i />
              {open === star.id && <small>{star.label}</small>}
            </button>
          ))}
          {connected && (
            <motion.p
              className="serif pointer-events-none absolute top-1/2 left-1/2 w-48 -translate-x-1/2 -translate-y-1/2 text-center text-2xl italic text-[#6d4e66]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              {SITE.titlePairing}
            </motion.p>
          )}
        </div>
        <div className="min-h-24">
          {active && <p className="whisper mx-auto max-w-md">{active.line}</p>}
        </div>
        {!connected && open && (
          <button type="button" className="mt-2 min-h-11 text-[0.66rem] tracking-[0.32em] text-[rgba(201,123,150,0.8)] uppercase" onClick={() => setConnected(true)}>
            {SKY.connect}
          </button>
        )}
        <p className="body mx-auto mt-8 max-w-xl">{SKY.intro}</p>
        <p className="emphasis mt-4">{SKY.line}</p>
      </div>
    </section>
  )
}
