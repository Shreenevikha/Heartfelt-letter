import { OCTOBER2 } from '../../data/content'
import { albumMedia, privateMedia } from '../../data/media'
import { useInView } from '../../hooks/useInView'
import { FilmStrip, framesFrom } from '../ui/FilmStrip'
import { PrivateAlbum } from '../ui/PrivateAlbum'
import { Script } from '../ui/Script'
import { Ticket } from '../ui/Ticket'

export function October2() {
  const opening = useInView<HTMLElement>(0.3)
  const closer = useInView<HTMLElement>(0.35)
  const media = albumMedia('october2')

  return (
    <>
      <section id="chapter-october2" data-chapter="october2" ref={opening.ref} className="chapter mood-intimate">
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <p className="kicker">05 — October 2</p>
          <h2 className="display">October 2, 2026</h2>
          <p className="subhead">The night everything felt closer</p>
          <div className="relative mt-10 overflow-hidden py-6">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 gap-3 opacity-40" aria-hidden="true">
              {Array.from({ length: 10 }, (_, index) => (
                <span key={index} className="h-16 w-24 shrink-0 rounded-md bg-[#f3e4fb]" />
              ))}
            </div>
            <Ticket film={OCTOBER2.film} date={OCTOBER2.date} />
          </div>
          {media.length > 0 && (
            <div className="full-bleed">
              <FilmStrip frames={framesFrom(media)} label="That night" />
            </div>
          )}
        </div>
      </section>
      <section data-chapter="october2" ref={closer.ref} className="chapter mood-intimate">
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <Script lines={OCTOBER2.lines} start={closer.seen} stagger={0.85} />
          <div className="mt-16">
            <Script lines={OCTOBER2.after} start={closer.seen} stagger={0.9} />
          </div>
          <PrivateAlbum items={privateMedia()} />
        </div>
      </section>
    </>
  )
}
