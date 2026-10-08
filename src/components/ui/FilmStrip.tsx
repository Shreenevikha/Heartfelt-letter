import { useRef } from 'react'
import type { StoryMedia } from '../../data/media'
import { useInView } from '../../hooks/useInView'

export interface FilmFrameData {
  media: StoryMedia | null
  note?: string
  polaroid?: boolean
}

export function framesFrom(media: StoryMedia[], notes: string[] = []): FilmFrameData[] {
  if (media.length === 0) {
    return notes.map((note) => ({ media: null, note, polaroid: false }))
  }
  return media.map((item, index) => ({
    media: item,
    note: notes[index],
    polaroid: index % 2 === 1,
  }))
}

export function FilmStrip({ frames, label = 'Drag the reel' }: { frames: FilmFrameData[]; label?: string }) {
  const scroller = useRef<HTMLDivElement | null>(null)
  const { ref, seen } = useInView<HTMLDivElement>(0.2)

  if (frames.length === 0) return null

  return (
    <div ref={ref} className="mt-12">
      <p className="mb-4 text-center text-[0.62rem] tracking-[0.28em] text-[#c97b96] uppercase">
        {label}
      </p>
      <div
        ref={scroller}
        className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-[10vw] pb-4 active:cursor-grabbing"
        tabIndex={0}
        aria-label="Film strip"
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' || !scroller.current) return
          const startX = event.clientX
          const startLeft = scroller.current.scrollLeft
          const node = scroller.current
          const move = (next: PointerEvent) => {
            node.scrollLeft = startLeft - (next.clientX - startX)
          }
          const up = () => {
            window.removeEventListener('pointermove', move)
            window.removeEventListener('pointerup', up)
          }
          window.addEventListener('pointermove', move)
          window.addEventListener('pointerup', up)
        }}
      >
        {frames.map((frame, index) => (
          <figure
            key={`${frame.note ?? 'frame'}-${index}`}
            className={`film-cell ${frame.polaroid ? 'polaroid' : ''}`}
          >
            <div className={`film-frame ${seen ? 'developed' : ''}`}>
              {frame.media?.kind === 'video' ? (
                <video src={frame.media.src} controls playsInline preload="metadata" />
              ) : frame.media ? (
                <img
                  src={frame.media.src}
                  alt={frame.note || frame.media.name}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  onMouseMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect()
                    const x = (event.clientX - bounds.left) / bounds.width - 0.5
                    const y = (event.clientY - bounds.top) / bounds.height - 0.5
                    event.currentTarget.style.transform = `scale(1.12) translate(${x * -16}px, ${y * -12}px)`
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'scale(1.08)'
                  }}
                />
              ) : (
                <div className="grid h-full place-items-center px-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e7a0b8]" />
                </div>
              )}
              <div className="shade" />
            </div>
            {frame.note && <figcaption className="film-note note">{frame.note}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  )
}
