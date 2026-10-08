import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

const BlushContext = createContext<() => void>(() => {})

export function BlushProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false)

  const poke = useCallback(() => {
    setOn(true)
    window.setTimeout(() => setOn(false), 1500)
  }, [])

  return (
    <BlushContext.Provider value={poke}>
      {children}
      <div className={`cheeks ${on ? 'on' : ''}`} aria-hidden="true">
        <span />
        <span />
      </div>
    </BlushContext.Provider>
  )
}

export function useBlush() {
  return useContext(BlushContext)
}

export function Shy({
  hint,
  lines,
  className = '',
}: {
  hint: string
  lines: string[]
  className?: string
}) {
  const poke = useBlush()
  const [step, setStep] = useState(0)

  return (
    <div className={`shy ${className}`}>
      <button
        type="button"
        className="shy-btn"
        onClick={() => {
          poke()
          setStep((value) => Math.min(value + 1, lines.length))
        }}
      >
        {hint}
      </button>
      {step > 0 && <p className="note shy-line">{lines[step - 1]}</p>}
    </div>
  )
}

export function ShyText({
  text,
  secret,
  className = '',
}: {
  text: string
  secret: string
  className?: string
}) {
  const poke = useBlush()
  const [open, setOpen] = useState(false)

  return (
    <div className="shy">
      <button
        type="button"
        className={`shy-inline ${className}`}
        onClick={() => {
          poke()
          setOpen(true)
        }}
      >
        {text}
      </button>
      {open && <p className="note shy-line">{secret}</p>}
    </div>
  )
}

const HONEST = [
  { id: 'miss', label: 'I missed you', reply: 'Good. I wrote this missing you back.' },
  { id: 'blush', label: "I'm blushing", reply: 'Then stay right there. I like that color on you.' },
  { id: 'both', label: 'Both', reply: "That's the one I hoped you'd pick. Don't hide your face." },
]

export function Honest() {
  const poke = useBlush()
  const [picked, setPicked] = useState<string | null>(null)
  const answer = HONEST.find((item) => item.id === picked)

  return (
    <div className="shy">
      <p className="whisper">Be honest with me.</p>
      <div className="choice-row">
        {HONEST.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`choice ${picked === item.id ? 'on' : ''}`}
            aria-pressed={picked === item.id}
            onClick={() => {
              poke()
              setPicked(item.id)
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {answer && <p className="note shy-line">{answer.reply}</p>}
    </div>
  )
}
