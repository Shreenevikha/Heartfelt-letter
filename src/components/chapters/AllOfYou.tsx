import { ALL_OF_YOU } from '../../data/content'
import { Reveal } from '../ui/Script'

export function AllOfYou() {
  return (
    <section id="chapter-allofyou" data-chapter="allofyou" className="chapter mood-memory">
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="kicker">09 — All of You</p>
        <h2 className="display">I Love Everything About You</h2>
        <Reveal className="mt-14">
          <p className="whisper">I love your name.</p>
          <p className="script-title mt-4">{ALL_OF_YOU.name}</p>
        </Reveal>
        <div className="mt-16 flex flex-col gap-8">
          {ALL_OF_YOU.features.map((line) => (
            <Reveal key={line}>
              <p className="emphasis">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20">
          <p className="body mx-auto max-w-xl">{ALL_OF_YOU.handsome}</p>
        </Reveal>
        <Reveal className="mt-10">
          <p className="body mx-auto max-w-xl">{ALL_OF_YOU.seen}</p>
        </Reveal>
        <Reveal className="mt-14">
          <p className="whisper mx-auto max-w-xl">{ALL_OF_YOU.deeper}</p>
        </Reveal>
        <div className="mt-20 flex flex-col gap-12 text-left">
          {ALL_OF_YOU.qualities.map((quality) => (
            <Reveal key={quality.word}>
              <p className="script-title">{quality.word}</p>
              <p className="whisper mt-3 text-left">{quality.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
