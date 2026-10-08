import { motion } from 'framer-motion'
import { OCTOBER7 } from '../../data/content'
import { albumMedia } from '../../data/media'
import { useInView } from '../../hooks/useInView'
import { FilmStrip, framesFrom } from '../ui/FilmStrip'
import { Script } from '../ui/Script'
import { Ticket } from '../ui/Ticket'

export function October7() {
  const { ref, seen } = useInView<HTMLElement>(0.25)
  const media = albumMedia('october7')

  return (
    <>
      <section id="chapter-october7" data-chapter="october7" ref={ref} className="chapter mood-warm">
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <p className="kicker">07 — October 7</p>
          <h2 className="display">October 7, 2026</h2>
          <p className="subhead">The night we chose each other again</p>
          <Ticket film={OCTOBER7.film} date="October 7, 2026" />
          <p className="whisper mt-6">{OCTOBER7.with}</p>
          {media.length > 0 && (
            <div className="full-bleed">
              <FilmStrip frames={framesFrom(media)} label="That evening" />
            </div>
          )}
          <div className="mt-16">
            <Script lines={OCTOBER7.lines} start={seen} />
          </div>
        </div>
      </section>

      <section data-chapter="october7" className="chapter mood-warm">
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
          <div className="mb-14 flex w-full max-w-md items-center justify-between" aria-hidden="true">
            <motion.span className="orb" initial={{ x: -30, opacity: 0.3 }} whileInView={{ x: 36, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2.2 }} />
            <svg className="h-16 flex-1" viewBox="0 0 320 64" fill="none">
              <motion.path
                d="M4 32 H90 L120 12 L150 52 L180 32 H316"
                stroke="rgba(201,123,150,0.75)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4 }}
              />
            </svg>
            <motion.span className="orb" initial={{ x: 30, opacity: 0.3 }} whileInView={{ x: -36, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2.2 }} />
          </div>
          <Script lines={OCTOBER7.opened} stagger={0.7} />
          <div className="mt-16">
            <Script lines={OCTOBER7.stayed} stagger={0.65} />
          </div>
        </div>
      </section>

      <section data-chapter="october7" className="chapter mood-warm">
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative mb-12 h-40 w-full" aria-hidden="true">
            {[[22, 40], [30, 62], [18, 70], [70, 36], [78, 58], [84, 48]].map(([x, y], index) => (
              <motion.span
                key={index}
                className="absolute h-1.5 w-1.5 rounded-full bg-[#c9a4de]"
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ opacity: 0.4 }}
                whileInView={{ left: `${46 + (index % 3) * 3}%`, top: `${48 + (index % 2) * 6}%`, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, delay: index * 0.05 }}
              />
            ))}
          </div>
          <Script lines={OCTOBER7.close} stagger={0.8} />
          <motion.div
            className="mt-16 w-full py-10"
            initial={{ background: 'rgba(255,255,255,0)' }}
            whileInView={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7), transparent 68%)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8 }}
          >
            <h3 className="display">{OCTOBER7.vow}</h3>
            <p className="whisper mx-auto mt-8 max-w-md">{OCTOBER7.last}</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
