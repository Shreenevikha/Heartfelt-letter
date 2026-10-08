import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { OCTOBER3 } from '../../data/content'
import { albumMedia } from '../../data/media'
import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'
import { FilmStrip, framesFrom } from '../ui/FilmStrip'
import { Script } from '../ui/Script'
import { romanticAudio } from '../../utils/audioEngine'

export function October3() {
  const { ref, seen } = useInView<HTMLElement>(0.45)
  const reduced = usePrefersReducedMotion()
  const [second, setSecond] = useState(50)
  const [spoken, setSpoken] = useState(false)
  const media = albumMedia('october3')
  const midnight = second >= 60

  useEffect(() => {
    if (!seen) return
    if (reduced) {
      const timer = window.setTimeout(() => setSecond(60), 400)
      return () => clearTimeout(timer)
    }
    let value = 50
    const timer = window.setInterval(() => {
      value += 1
      setSecond(value)
      if (value >= 60) clearInterval(timer)
    }, 780)
    return () => clearInterval(timer)
  }, [reduced, seen])

  useEffect(() => {
    if (!midnight) return
    romanticAudio.playHeartbeat()
    const timer = window.setTimeout(() => setSpoken(true), reduced ? 200 : 1500)
    return () => clearTimeout(timer)
  }, [midnight, reduced])

  const label = midnight ? '12:00 AM' : `11:59:${String(second).padStart(2, '0')} PM`

  return (
    <>
      <section id="chapter-october3" data-chapter="october3" ref={ref} className="chapter mood-hush">
        <div className="relative z-10 text-center">
          <p className="kicker">October 3</p>
          <p className="clock mt-8">{label}</p>
          <p className="mt-4 text-[0.66rem] tracking-[0.28em] text-[rgba(109,78,102,0.55)] uppercase">
            {midnight ? 'October 3' : 'October 2'}
          </p>
        </div>
      </section>
      {spoken && (
        <section data-chapter="october3" className="chapter mood-intimate">
          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <motion.p className="whisper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
              {OCTOBER3.lead}
            </motion.p>
            <motion.p className="script-title mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }}>
              {OCTOBER3.proposal}
            </motion.p>
            <div className="mt-14">
              <Script lines={OCTOBER3.lines} stagger={0.8} />
            </div>
            <motion.p
              className="display mt-16"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
            >
              {OCTOBER3.vow}
            </motion.p>
            {media.length > 0 && (
              <div className="full-bleed">
                <FilmStrip frames={framesFrom(media)} label="After midnight" />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
