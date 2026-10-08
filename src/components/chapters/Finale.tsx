import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FINALE, FLOATING, SITE } from '../../data/content'
import { publicMedia } from '../../data/media'
import { useInView } from '../../hooks/useInView'
import { Reveal, Script } from '../ui/Script'
import { romanticAudio } from '../../utils/audioEngine'

const SPOTS = [
  { left: '4%', top: '8%' },
  { left: '72%', top: '10%' },
  { left: '8%', top: '78%' },
  { left: '80%', top: '72%' },
  { left: '18%', top: '18%' },
  { left: '60%', top: '84%' },
  { left: '86%', top: '40%' },
  { left: '12%', top: '46%' },
  { left: '68%', top: '28%' },
  { left: '40%', top: '8%' },
  { left: '28%', top: '88%' },
  { left: '88%', top: '16%' },
]

export function Finale({
  onBeat,
  onBloom,
}: {
  onBeat: (beat: 'story' | 'hush' | 'close') => void
  onBloom: () => void
}) {
  const before = useInView<HTMLElement>(0.3)
  const hush = useInView<HTMLElement>(0.55)
  const sky = useInView<HTMLElement>(0.35)
  const signature = useInView<HTMLElement>(0.4)
  const [ready, setReady] = useState(false)
  const [kiss, setKiss] = useState<'sealed' | 'kiss' | 'after'>('sealed')
  const photos = publicMedia().filter((item) => item.kind === 'image').slice(0, 5)

  useEffect(() => {
    if (!hush.seen) return
    onBeat('hush')
    romanticAudio.playHeartbeat()
    const timer = window.setTimeout(() => setReady(true), 1700)
    return () => clearTimeout(timer)
  }, [hush.seen, onBeat])

  useEffect(() => {
    if (sky.seen) onBeat('close')
  }, [onBeat, sky.seen])

  useEffect(() => {
    if (signature.seen) onBloom()
  }, [onBloom, signature.seen])

  useEffect(() => {
    if (kiss !== 'kiss') return
    const timer = window.setTimeout(() => setKiss('after'), 4200)
    return () => clearTimeout(timer)
  }, [kiss])

  return (
    <>
      <section id="chapter-finale" data-chapter="finale" ref={before.ref} className="chapter mood-finale">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <p className="kicker">The last chapter</p>
          <Script lines={FINALE.before} start={before.seen} stagger={0.9} />
        </div>
      </section>

      <section data-chapter="finale" ref={hush.ref} className="chapter mood-hush">
        <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center text-center">
          {ready && (
            <>
              <motion.p className="hand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
                {FINALE.name}
              </motion.p>
              <motion.h2
                className="display mt-8"
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 1.3, duration: 1.6 }}
              >
                {FINALE.love}
              </motion.h2>
              <div className="mt-12">
                <Script lines={FINALE.because} stagger={0.8} />
              </div>
            </>
          )}
        </div>
      </section>

      <section data-chapter="finale" className="chapter mood-finale">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <div className="flex flex-col gap-8">
            {FINALE.whens.map((line) => (
              <Reveal key={line}>
                <p className="whisper">{line}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <p className="body mx-auto max-w-xl">{FINALE.special}</p>
          </Reveal>
          <Reveal className="mt-14">
            <p className="display" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.8rem)' }}>{FINALE.made}</p>
          </Reveal>
          <Reveal className="mt-8">
            <p className="display" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.8rem)' }}>{FINALE.want}</p>
          </Reveal>
        </div>
      </section>

      <section data-chapter="finale" ref={sky.ref} className="chapter mood-sky overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {FLOATING.map((word, index) => (
            <span
              key={word}
              className="float-memory"
              style={{ ...SPOTS[index % SPOTS.length], animationDelay: `${index * 0.6}s`, fontSize: index % 2 ? '1.4rem' : '1.8rem' }}
            >
              {word}
            </span>
          ))}
          {photos.map((photo, index) => (
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              loading="lazy"
              className="float-photo"
              style={{ left: `${12 + index * 16}%`, top: `${20 + (index % 3) * 22}%`, animationDelay: `${index}s` }}
            />
          ))}
        </div>
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <Script lines={FINALE.skyLead} start={sky.seen} />
          <div className="mt-14 flex flex-col gap-6">
            {FINALE.live.map((line) => (
              <Reveal key={line}>
                <p className="emphasis">{line}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <Script lines={FINALE.closing} stagger={0.75} />
          </div>
          <Reveal className="mt-12">
            <p className="display">{FINALE.every}</p>
          </Reveal>
        </div>
      </section>

      <section data-chapter="finale" ref={signature.ref} className="chapter mood-finale">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <motion.p className="hand" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }}>
            {FINALE.signoff}
          </motion.p>
          <motion.h2
            className="hand mt-4"
            style={{ fontSize: 'clamp(3.4rem, 10vw, 7rem)' }}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.6 }}
          >
            {FINALE.signature}
          </motion.h2>
          <p className="serif mt-6 text-2xl italic text-[#c97b96]">{SITE.monogram}</p>
          <p className="whisper mt-8">{FINALE.endnote[0]}</p>
          <p className="whisper mt-2">{FINALE.endnote[1]}</p>

          <div className="mt-20">
            <p className="text-[0.68rem] tracking-[0.34em] text-[rgba(201,123,150,0.75)] uppercase">{FINALE.more}</p>
            {kiss === 'sealed' && (
              <button
                type="button"
                className="mx-auto mt-8 grid h-16 w-16 place-items-center"
                aria-label="There is one more thing"
                onClick={() => setKiss('kiss')}
              >
                <svg width="28" height="26" viewBox="0 0 28 26" aria-hidden="true">
                  <path
                    d="M14 24s-9.2-5.6-12-10.4C.2 9.6 1.6 5.2 5.8 4.6 8.2 4.2 10.4 5.4 14 9c3.6-3.6 5.8-4.8 8.2-4.4 4.2.6 5.6 5 3.8 9C23.2 18.4 14 24 14 24z"
                    fill="#e7a0b8"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(163,59,69,0.85))' }}
                  />
                </svg>
              </button>
            )}
            {kiss !== 'sealed' && (
              <div>
                <p className="emphasis mt-8">{FINALE.kiss}</p>
                <div className="kiss-stage" aria-hidden="true">
                  <span className="kiss-light left" />
                  <span className="kiss-light right" />
                  <span className="kiss-bloom" />
                </div>
                {kiss === 'after' && <p className="whisper mt-4">{FINALE.look}</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

