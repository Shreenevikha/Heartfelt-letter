import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ARRIVAL } from '../../data/content'
import { romanticAudio } from '../../utils/audioEngine'
import { usePrefersReducedMotion } from '../../hooks/useInView'

type Phase = 'black' | 'light' | 'stars' | 'title' | 'names' | 'line' | 'done'

const STARS = Array.from({ length: 80 }, (_, index) => ({
  id: index,
  left: (index * 47) % 100,
  top: (index * 29 + (index % 5) * 7) % 100,
  size: (index % 5) * 0.38 + 0.55,
  delay: (index % 9) * 0.12,
}))

export function Arrival({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState<Phase>('black')

  useEffect(() => {
    if (reduced) {
      const done = window.setTimeout(onDone, 900)
      return () => clearTimeout(done)
    }
    const timers = [
      window.setTimeout(() => romanticAudio.playHeartbeat(), 500),
      window.setTimeout(() => romanticAudio.playHeartbeat(), 1900),
      window.setTimeout(() => setPhase('light'), 2700),
      window.setTimeout(() => setPhase('stars'), 3600),
      window.setTimeout(() => setPhase('title'), 5000),
      window.setTimeout(() => setPhase('names'), 6800),
      window.setTimeout(() => setPhase('line'), 8400),
      window.setTimeout(() => {
        setPhase('done')
        onDone()
      }, 10800),
    ]
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [onDone, reduced])

  const showStars = phase === 'stars' || phase === 'title' || phase === 'names' || phase === 'line'
  const showTitle = phase === 'title' || phase === 'names' || phase === 'line'
  const showNames = phase === 'names' || phase === 'line'
  const showLine = phase === 'line'

  return (
    <div className="gate-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {(phase === 'light' || showStars) && (
          <motion.span
            key="dot"
            className="absolute h-2 w-2 rounded-full bg-[#f4b8cb] shadow-[0_0_18px_rgba(244,184,203,0.9)]"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: showStars ? 18 : 1, opacity: showStars ? 0 : 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
      {showStars &&
        STARS.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-[#c9a4de]"
            style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 0.9, 0.35], scale: 1 }}
            transition={{ duration: 1.8, delay: star.delay }}
          />
        ))}
      <div className="relative z-10 px-6 text-center">
        {showTitle && (
          <motion.h1 className="display" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            {ARRIVAL.title}
          </motion.h1>
        )}
        {showNames && (
          <motion.p className="whisper mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3 }}>
            {ARRIVAL.pairing}
          </motion.p>
        )}
        {showLine && (
          <motion.p className="body mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
            {ARRIVAL.line}
          </motion.p>
        )}
        {reduced && <p className="display mt-0">{ARRIVAL.title}</p>}
      </div>
    </div>
  )
}
