import { FLOWERS } from '../../data/content'
import { albumMedia, matchingMedia } from '../../data/media'
import { useInView } from '../../hooks/useInView'
import { FilmStrip, framesFrom } from '../ui/FilmStrip'
import { Shy } from '../ui/Playful'
import { Reveal, Script } from '../ui/Script'

function PressedBloom({ tone }: { tone: string }) {
  return (
    <div className="relative mx-auto h-36 w-36" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <span
          key={index}
          className="absolute top-1/2 left-1/2 h-16 w-8 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), ${tone})`,
            transform: `translate(-50%, -90%) rotate(${index * 60}deg)`,
            transformOrigin: '50% 100%',
            opacity: 0.85,
          }}
        />
      ))}
      <span className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4b8cb]" />
    </div>
  )
}

export function Flowers() {
  const intro = useInView<HTMLElement>(0.35)
  const used = new Set(FLOWERS.moments.flatMap((moment) => matchingMedia('flowers', moment.keywords).map((item) => item.src)))
  const rest = albumMedia('flowers').filter((item) => !used.has(item.src))

  return (
    <>
      <section id="chapter-flowers" data-chapter="flowers" ref={intro.ref} className="chapter mood-memory">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <p className="kicker">The Flowers</p>
          <h2 className="display">You Kept Bringing Me Flowers</h2>
          <div className="mt-12">
            <Script lines={FLOWERS.intro} start={intro.seen} />
          </div>
        </div>
      </section>

      {FLOWERS.moments.map((moment) => {
        const media = matchingMedia('flowers', moment.keywords)
        return (
          <section key={moment.id} data-chapter="flowers" className="chapter mood-memory">
            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              {media[0]?.kind === 'image' ? (
                <img
                  src={media[0].src}
                  alt={moment.title}
                  loading="lazy"
                  decoding="async"
                  className="mb-10 aspect-[4/5] w-[min(78vw,340px)] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                />
              ) : (
                <div className="mb-10">
                  <PressedBloom tone={moment.tone} />
                </div>
              )}
              <Script lines={moment.lines} view stagger={0.6} />
              {media.length > 1 && (
                <div className="full-bleed w-full">
                  <FilmStrip frames={framesFrom(media.slice(1))} label="That day" />
                </div>
              )}
            </div>
          </section>
        )
      })}

      <section data-chapter="flowers" className="chapter mood-memory">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <Script lines={FLOWERS.after} stagger={0.9} />
          {rest.length > 0 && (
            <div className="full-bleed">
              <FilmStrip frames={framesFrom(rest)} label="And the others" />
            </div>
          )}
          <Reveal className="mt-16">
            <p className="note text-3xl text-[#c97b96]">quietly, in my heart</p>
          </Reveal>
          <Shy
            hint="touch this one"
            lines={['I kept every flower. Even the ones that wilted.', 'Please don’t stop bringing them. I won’t stop blushing.']}
          />
        </div>
      </section>
    </>
  )
}
