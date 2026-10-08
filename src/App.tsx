import { Fragment, useCallback, useEffect, useState } from 'react'
import { Atmosphere, PetalField } from './components/effects/Atmosphere'
import { Adventures } from './components/chapters/Adventures'
import { AllOfYou } from './components/chapters/AllOfYou'
import { Beginning } from './components/chapters/Beginning'
import { Dreams } from './components/chapters/Dreams'
import { Finale } from './components/chapters/Finale'
import { Flowers } from './components/chapters/Flowers'
import { HisLove } from './components/chapters/HisLove'
import { Kanmani } from './components/chapters/Kanmani'
import { Midnight } from './components/chapters/Midnight'
import { NightSky } from './components/chapters/NightSky'
import { October2 } from './components/chapters/October2'
import { October3 } from './components/chapters/October3'
import { October7 } from './components/chapters/October7'
import { RealLove } from './components/chapters/RealLove'
import { Arrival } from './components/story/Arrival'
import { QrGate } from './components/story/QrGate'
import { ChapterRail } from './components/ui/ChapterRail'
import { MemoryOverlay, type OpenMemory } from './components/ui/MemoryOverlay'
import { SoundDock } from './components/ui/SoundDock'
import { CHAPTERS, audioMoodFor } from './data/content'
import { usePrefersReducedMotion } from './hooks/useInView'
import { romanticAudio } from './utils/audioEngine'

type Stage = 'gate' | 'arrival' | 'story'
type FinaleBeat = 'story' | 'hush' | 'close'

function renderChapter(id: string, onOpen: (memory: OpenMemory) => void) {
  switch (id) {
    case 'beginning':
      return <Beginning />
    case 'flowers':
      return <Flowers />
    case 'adventures':
      return <Adventures onOpen={onOpen} />
    case 'midnight':
      return <Midnight />
    case 'october2':
      return <October2 />
    case 'october3':
      return <October3 />
    case 'october7':
      return <October7 />
    case 'dreams':
      return <Dreams />
    case 'allofyou':
      return <AllOfYou />
    case 'kanmani':
      return <Kanmani />
    case 'hislove':
      return <HisLove />
    case 'reallove':
      return <RealLove />
    case 'sky':
      return <NightSky />
    default:
      return null
  }
}

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [stage, setStage] = useState<Stage>(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('gate') === '1') return 'gate'
    if (params.get('enter') === '1') return 'arrival'
    return 'gate'
  })
  const [current, setCurrent] = useState('beginning')
  const [veil, setVeil] = useState(false)
  const [memory, setMemory] = useState<OpenMemory | null>(null)
  const [audioOn, setAudioOn] = useState(false)
  const [finaleBeat, setFinaleBeat] = useState<FinaleBeat>('story')
  const [bloom, setBloom] = useState(false)
  const [progress, setProgress] = useState(0)

  const arm = useCallback(() => {
    romanticAudio.unlock()
    setAudioOn(true)
  }, [])

  const enter = useCallback(() => {
    arm()
    romanticAudio.setMood('pulse')
    setStage('arrival')
  }, [arm])

  const finishArrival = useCallback(() => {
    setStage('story')
    window.scrollTo(0, 0)
  }, [])

  const openMemory = useCallback((next: OpenMemory) => {
    arm()
    romanticAudio.playBell(494, 0.045, 1.15)
    setMemory(next)
  }, [arm])

  const closeMemory = useCallback(() => setMemory(null), [])

  const onBeat = useCallback((beat: FinaleBeat) => setFinaleBeat(beat), [])
  const onBloom = useCallback(() => setBloom(true), [])

  useEffect(() => {
    document.body.style.overflow = stage === 'story' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage])

  useEffect(() => {
    const onPointer = () => {
      arm()
      if (stage !== 'story' && !romanticAudio.isMuted()) romanticAudio.setMood('pulse')
    }
    window.addEventListener('pointerdown', onPointer, { once: true })
    return () => window.removeEventListener('pointerdown', onPointer)
  }, [arm, stage])

  useEffect(() => {
    if (!audioOn || stage !== 'story') return
    if (current === 'finale') {
      romanticAudio.setMood(finaleBeat === 'hush' ? 'hush' : 'finale')
      return
    }
    const meta = CHAPTERS.find((chapter) => chapter.id === current)
    romanticAudio.setMood(audioMoodFor(meta?.mood ?? 'memory'))
  }, [audioOn, current, finaleBeat, stage])

  useEffect(() => {
    if (stage !== 'story') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = visible?.target.getAttribute('data-chapter')
        if (id) setCurrent(id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-18% 0px -22% 0px' },
    )
    document.querySelectorAll('[data-chapter]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [stage])

  useEffect(() => {
    if (stage !== 'story') return
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? window.scrollY / height : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [stage])

  const jump = (id: string) => {
    const go = () => document.getElementById(`chapter-${id}`)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    if (reduced) {
      go()
      return
    }
    setVeil(true)
    window.setTimeout(() => {
      go()
      window.setTimeout(() => setVeil(false), 240)
    }, 480)
  }

  const petalMode = bloom ? 'bloom' : stage === 'story' && current === 'flowers' ? 'drift' : 'off'

  return (
    <div className="relative min-h-screen bg-transparent text-[#6d4e66]">
      <Atmosphere />
      <PetalField mode={petalMode} />
      <SoundDock onInteract={arm} />

      {stage === 'story' && (
        <>
          <div className="fixed top-0 right-0 left-0 z-50 h-px md:hidden" aria-hidden="true">
            <div className="h-full bg-[#e7a0b8]" style={{ width: `${progress * 100}%` }} />
          </div>
          <ChapterRail chapters={CHAPTERS} current={current} onJump={jump} />
          <main>
            <h1 className="sr-only">The Love We Became. Raghav and Kanmani.</h1>
            {CHAPTERS.map((chapter) => (
              <Fragment key={chapter.id}>{renderChapter(chapter.id, openMemory)}</Fragment>
            ))}
            <Finale onBeat={onBeat} onBloom={onBloom} />
          </main>
        </>
      )}

      {stage === 'gate' && <QrGate onEnter={enter} />}
      {stage === 'arrival' && <Arrival onDone={finishArrival} />}
      <MemoryOverlay memory={memory} onClose={closeMemory} />
      <div className="veil transition-opacity duration-500" style={{ opacity: veil ? 1 : 0 }} aria-hidden="true" />
    </div>
  )
}
