import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { romanticAudio } from '../../utils/audioEngine'

export function SoundDock({ onInteract }: { onInteract: () => void }) {
  const [, setTick] = useState(0)

  useEffect(() => romanticAudio.subscribe(() => setTick((value) => value + 1)), [])

  const muted = romanticAudio.isMuted()

  return (
    <div className="fixed right-3 top-3 z-[90] flex items-center gap-2 sm:right-5 sm:top-5">
      <input
        className="h-1 w-16 accent-[#e7a0b8] sm:w-24"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={romanticAudio.getVolume()}
        aria-label="Music volume"
        onChange={(event) => {
          onInteract()
          romanticAudio.setVolume(Number(event.target.value))
          if (romanticAudio.isMuted() && Number(event.target.value) > 0) romanticAudio.setMuted(false)
        }}
      />
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(201,123,150,0.35)] bg-white/80 text-[#6d4e66] backdrop-blur-md"
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        aria-pressed={muted}
        onClick={() => {
          onInteract()
          romanticAudio.toggleMuted()
        }}
      >
        {muted ? <VolumeX size={16} strokeWidth={1.5} /> : <Volume2 size={16} strokeWidth={1.5} />}
      </button>
    </div>
  )
}
