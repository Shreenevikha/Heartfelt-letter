import { useRef, useState } from 'react'
import type { StoryMedia } from '../../data/media'
import { SITE } from '../../data/content'
import { FilmStrip, framesFrom } from './FilmStrip'

export function PrivateAlbum({ items }: { items: StoryMedia[] }) {
  const [open, setOpen] = useState(() => {
    try {
      return sessionStorage.getItem('tlwb-private') === '1'
    } catch {
      return false
    }
  })
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const [hold, setHold] = useState(0)
  const frame = useRef<number | null>(null)

  if (items.length === 0) return null

  const unlock = () => {
    try {
      sessionStorage.setItem('tlwb-private', '1')
    } catch {
      /* private mode */
    }
    setOpen(true)
    setWrong(false)
  }

  const startHold = () => {
    const began = performance.now()
    const step = (now: number) => {
      const next = Math.min(1, (now - began) / 1700)
      setHold(next)
      if (next >= 1) {
        unlock()
        return
      }
      frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
  }

  const stopHold = () => {
    if (frame.current) cancelAnimationFrame(frame.current)
    setHold(0)
  }

  if (open) {
    return (
      <div className="mt-16">
        <p className="whisper">Only for you.</p>
        <FilmStrip frames={framesFrom(items, ['between us'])} label="Held close" />
      </div>
    )
  }

  const preview = items.find((item) => item.kind === 'image')

  return (
    <div className="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
      <p className="whisper">A few photographs stay between us.</p>
      <p className="mt-3 text-[0.72rem] tracking-[0.16em] text-[rgba(109,78,102,0.55)] uppercase">
        Hold the seal, or speak the word only we would use.
      </p>
      <div className="relative mt-8 h-40 w-40 overflow-hidden">
        {preview && (
          <img
            src={preview.src}
            alt=""
            className="h-full w-full scale-110 object-cover blur-2xl"
            draggable={false}
          />
        )}
        <div className="absolute inset-0 bg-[rgba(255,247,251,0.35)]" />
        <button
          type="button"
          className="seal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ touchAction: 'none' }}
          aria-label="Hold to open the private photographs"
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
        />
        <svg className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="92" height="92" viewBox="0 0 92 92" aria-hidden="true">
          <circle cx="46" cy="46" r="40" fill="none" stroke="rgba(201,123,150,0.85)" strokeWidth="1" strokeDasharray={`${hold * 251} 251`} transform="rotate(-90 46 46)" />
        </svg>
      </div>
      <form
        className="mt-8 flex flex-col items-center gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          if (value.trim().toLowerCase() === SITE.privatePasscode.trim().toLowerCase()) unlock()
          else setWrong(true)
        }}
      >
        <label className="text-[0.62rem] tracking-[0.32em] uppercase text-[rgba(201,123,150,0.7)]" htmlFor="private-word">
          A private word
        </label>
        <input
          id="private-word"
          className="passcode"
          type="password"
          autoComplete="off"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setWrong(false)
          }}
        />
        <button type="submit" className="min-h-11 text-[0.66rem] tracking-[0.28em] uppercase">
          Open
        </button>
        {wrong && <p className="text-sm text-[#c97b96]">That isn’t the one.</p>}
      </form>
    </div>
  )
}
