import { DREAMS } from '../../data/content'
import { useInView } from '../../hooks/useInView'
import { Reveal, Script } from '../ui/Script'

export function Dreams() {
  const { ref, seen } = useInView<HTMLElement>(0.3)

  return (
    <section id="chapter-dreams" data-chapter="dreams" ref={ref} className="chapter mood-memory">
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="kicker">08 — What I Want with You</p>
        <h2 className="display">I Don't Just Want Moments with You</h2>
        <div className="mt-12">
          <Script lines={DREAMS.intro} start={seen} />
        </div>
        <div className="mt-16 flex flex-col gap-10">
          {DREAMS.wants.map((line) => (
            <Reveal key={line}>
              <p className="emphasis">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20">
          <p className="body mx-auto max-w-xl">{DREAMS.old}</p>
        </Reveal>
        <div className="mt-16">
          <Script lines={DREAMS.someday} stagger={0.75} />
        </div>
      </div>
    </section>
  )
}
