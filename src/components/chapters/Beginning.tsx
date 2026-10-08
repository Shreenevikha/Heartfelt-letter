import { BEGINNING } from '../../data/content'
import { albumMedia } from '../../data/media'
import { useInView } from '../../hooks/useInView'
import { FilmStrip, framesFrom } from '../ui/FilmStrip'
import { Shy } from '../ui/Playful'
import { Script } from '../ui/Script'

export function Beginning() {
  const { ref, seen } = useInView<HTMLElement>(0.3)
  const frames = framesFrom(albumMedia('beginning'), BEGINNING.notes)

  return (
    <section id="chapter-beginning" data-chapter="beginning" ref={ref} className="chapter mood-memory">
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p className="kicker">The Unexpected Beginning</p>
        <h2 className="display">The Day You Found Me</h2>
        <p className="whisper mx-auto mt-8 max-w-xl">{BEGINNING.epigraph}</p>
        <div className="mt-14">
          <Script lines={BEGINNING.lines} start={seen} stagger={0.85} />
        </div>
        <Shy
          hint="psst. tap this."
          lines={[
            'I still get shy about the first time you looked at me.',
            'If you are smiling already, this is going to be a problem.',
          ]}
        />
        <div className="full-bleed">
          <FilmStrip frames={frames} />
        </div>
      </div>
    </section>
  )
}
