import { useEffect, useState } from 'react'

export function Atmosphere() {
  const [point, setPoint] = useState({ x: -400, y: -400 })
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const apply = () => setFine(media.matches)
    apply()
    media.addEventListener('change', apply)
    const move = (event: PointerEvent) => setPoint({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      media.removeEventListener('change', apply)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  const dust = [
    [8, 18], [22, 70], [40, 30], [63, 80], [78, 24], [90, 58],
    [15, 46], [52, 14], [33, 88], [84, 42], [48, 62], [70, 12],
  ]

  return (
    <>
      <div className="lens-flare" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      {fine && (
        <div className="cursor-glow" style={{ left: point.x, top: point.y }} aria-hidden="true" />
      )}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {dust.map(([left, top], index) => (
          <span
            key={index}
            className="absolute block h-[3px] w-[3px] rounded-full bg-[rgba(201,123,150,0.35)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `twinkle ${4 + (index % 5)}s ease-in-out ${index * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
}

export function PetalField({ mode }: { mode: 'off' | 'drift' | 'bloom' }) {
  if (mode === 'off') return null
  const count = mode === 'bloom' ? 28 : 12
  const petals = Array.from({ length: count }, (_, index) => {
    const left = (index * 37) % 100
    const delay = (index % 8) * 0.45
    const duration = mode === 'bloom' ? 7 + (index % 5) : 14 + (index % 6)
    const sway = `${(index % 2 === 0 ? -1 : 1) * (20 + (index % 5) * 8)}px`
    const color = index % 4 === 0 ? '#f4b8cb' : index % 4 === 1 ? '#e4d4f7' : index % 4 === 2 ? '#f8d7c8' : '#d7e7fb'
    return { left, delay, duration, sway, color, index }
  })

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.index}
          className="absolute -top-6 block"
          style={{
            left: `${petal.left}%`,
            width: petal.index % 2 === 0 ? 10 : 7,
            height: petal.index % 2 === 0 ? 16 : 12,
            borderRadius: '70% 20% 70% 20%',
            background: petal.color,
            opacity: 0.75,
            ['--sway' as string]: petal.sway,
            animation: `petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
