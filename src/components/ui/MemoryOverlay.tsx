import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { StoryMedia } from '../../data/media'

export interface OpenMemory {
  title: string
  date?: string
  text: string
  media: StoryMedia[]
}

export function MemoryOverlay({
  memory,
  onClose,
}: {
  memory: OpenMemory | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!memory) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [memory, onClose])

  if (!memory) return null

  return (
    <div className="memory-scrim" role="dialog" aria-modal="true" aria-label={memory.title} onClick={onClose}>
      <motion.article
        className="memory-sheet"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[0.62rem] tracking-[0.28em] text-[#c97b96] uppercase">Memory unlocked</p>
          <button type="button" className="min-h-11 px-2 text-[0.68rem] tracking-[0.22em] uppercase" onClick={onClose}>
            Close
          </button>
        </div>
        {memory.date && <p className="mt-6 text-[0.72rem] tracking-[0.22em] text-[#c97b96] uppercase">{memory.date}</p>}
        <h3 className="display mt-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)' }}>{memory.title}</h3>
        <p className="body mx-auto mt-6">{memory.text}</p>
        {memory.media.length > 0 && (
          <div className="mt-8 flex flex-col gap-5">
            {memory.media.map((item) =>
              item.kind === 'video' ? (
                <video key={item.src} className="developed max-h-[70vh] w-full bg-black object-contain" src={item.src} controls playsInline preload="metadata" />
              ) : (
                <img key={item.src} className="developed max-h-[70vh] w-full object-cover" src={item.src} alt={memory.title} loading="lazy" decoding="async" />
              ),
            )}
          </div>
        )}
      </motion.article>
    </div>
  )
}
