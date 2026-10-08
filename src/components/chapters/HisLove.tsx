import { HIS_LOVE } from '../../data/content'
import { useInView } from '../../hooks/useInView'
import { Reveal, Script } from '../ui/Script'

export function HisLove() {
  const { ref, seen } = useInView<HTMLElement>(0.2)

  return (
    <section id="chapter-hislove" data-chapter="hislove" ref={ref} className="chapter mood-intimate">
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="kicker">11 — What You Told Me</p>
        <h2 className="display">The Love You Gave Me</h2>
        <div className="mt-16 flex flex-col gap-14">
          {HIS_LOVE.fragments.map((line) => (
            <Reveal key={line}>
              <p className="text-[0.7rem] tracking-[0.28em] text-[#c97b96] uppercase">You said</p>
              <p className="emphasis mt-3">“{line}”</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-20">
          <Script lines={HIS_LOVE.after} start={seen} />
        </div>
      </div>
    </section>
  )
}
