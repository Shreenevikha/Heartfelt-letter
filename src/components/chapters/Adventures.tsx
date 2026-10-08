import { ADVENTURES } from '../../data/content'
import { albumMedia, matchingMedia } from '../../data/media'
import type { OpenMemory } from '../ui/MemoryOverlay'
import { FilmStrip, framesFrom } from '../ui/FilmStrip'
import { romanticAudio } from '../../utils/audioEngine'

export function Adventures({ onOpen }: { onOpen: (memory: OpenMemory) => void }) {
  const used = new Set<string>()
  const rows = ADVENTURES.map((memory) => {
    const media = matchingMedia(memory.album, memory.keywords)
    media.forEach((item) => used.add(item.src))
    return { memory, media }
  })
  const rest = albumMedia('adventures').filter((item) => !used.has(item.src))

  return (
    <section id="chapter-adventures" data-chapter="adventures" className="chapter mood-memory">
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="text-center">
          <p className="kicker">03 — All the Little Adventures</p>
          <h2 className="display">All the Places We Became Us</h2>
          <p className="whisper mx-auto mt-8 max-w-md">Touch a memory. It will open.</p>
        </div>
        <ol className="relative mx-auto mt-16 max-w-xl border-l border-[rgba(201,123,150,0.35)] pl-8">
          {rows.map(({ memory, media }, index) => (
            <li key={memory.id} className="relative pb-10">
              <span className="absolute top-3 -left-[39px] h-2.5 w-2.5 rounded-full bg-[#e7a0b8]" />
              <button
                type="button"
                className="w-full text-left"
                onClick={() => {
                  romanticAudio.playBell(494, 0.04, 1.1)
                  onOpen({ title: memory.title, date: memory.date, text: memory.text, media })
                }}
              >
                <span className="text-[0.62rem] tracking-[0.22em] text-[#c97b96] uppercase">
                  {String(index + 1).padStart(2, '0')}
                  {memory.date ? `  ·  ${memory.date}` : ''}
                </span>
                <span className="serif mt-2 block text-[clamp(1.8rem,4vw,2.6rem)] leading-none">{memory.title}</span>
                <span className="whisper mt-3 block text-left text-[1.25rem]">{memory.text}</span>
              </button>
            </li>
          ))}
        </ol>
        {rest.length > 0 && (
          <div className="full-bleed">
            <FilmStrip frames={framesFrom(rest)} label="The rest of the reel" />
          </div>
        )}
      </div>
    </section>
  )
}
