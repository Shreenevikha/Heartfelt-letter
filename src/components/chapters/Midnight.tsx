import { MIDNIGHT } from '../../data/content'
import { albumMedia } from '../../data/media'
import { useInView } from '../../hooks/useInView'
import { FilmStrip, framesFrom } from '../ui/FilmStrip'
import { Script } from '../ui/Script'
import { Ticket } from '../ui/Ticket'

export function Midnight() {
  const { ref, seen } = useInView<HTMLElement>(0.3)
  const media = albumMedia('midnight')

  return (
    <section id="chapter-midnight" data-chapter="midnight" ref={ref} className="chapter mood-cinema">
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="letterbox">
          <div className="bar" />
          <div className="screen text-center">
            <p className="kicker">04 — A Midnight Screening</p>
            <p className="clock">{MIDNIGHT.clock}</p>
            <h2 className="display mt-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}>Midnight with Raghav</h2>
            <Ticket film={MIDNIGHT.film} time="12:00 AM" />
          </div>
          <div className="bar" />
        </div>
        <div className="mt-16">
          <Script lines={MIDNIGHT.lines} start={seen} stagger={0.75} />
        </div>
        <div className="mt-16">
          <Script lines={MIDNIGHT.after} start={seen} stagger={0.8} />
        </div>
        {media.length > 0 && (
          <div className="full-bleed">
            <FilmStrip frames={framesFrom(media, ['that midnight'])} label="The midnight reel" />
          </div>
        )}
      </div>
    </section>
  )
}
