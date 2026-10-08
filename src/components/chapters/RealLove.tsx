import { REAL_LOVE } from '../../data/content'
import { useInView } from '../../hooks/useInView'
import { Shy } from '../ui/Playful'
import { Reveal, Script } from '../ui/Script'

export function RealLove() {
  const { ref, seen } = useInView<HTMLElement>(0.25)

  return (
    <section id="chapter-reallove" data-chapter="reallove" className="chapter mood-warm" ref={ref}>
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="kicker">In Return</p>
        <h2 className="display">I Want to Make You Feel Loved</h2>
        <div className="mt-12">
          <Script lines={REAL_LOVE.intro} start={seen} />
        </div>
        <div className="mt-16 flex flex-col gap-8">
          {REAL_LOVE.whens.map((line) => (
            <Reveal key={line}>
              <p className="whisper">{line}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 flex flex-col gap-6">
          {REAL_LOVE.vows.map((line) => (
            <Reveal key={line}>
              <p className="display" style={{ fontSize: 'clamp(2.4rem, 7vw, 4.8rem)' }}>{line}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-7">
          {REAL_LOVE.real.map((line) => (
            <Reveal key={line}>
              <p className="body">{line}</p>
            </Reveal>
          ))}
        </div>
        <Shy
          hint="come closer"
          lines={['Closer.', "That's the look. I know that look.", "Hi. Don't look away."]}
        />
      </div>
    </section>
  )
}
