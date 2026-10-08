import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { ScriptLine } from '../../data/content'

const CLASS_FOR = {
  whisper: 'whisper',
  body: 'body',
  emphasis: 'emphasis',
  title: 'script-title',
  hand: 'hand',
} as const

export function Script({
  lines,
  start = true,
  stagger = 0.7,
  view = false,
  className = '',
}: {
  lines: ScriptLine[]
  start?: boolean
  stagger?: number
  view?: boolean
  className?: string
}) {
  return (
    <div className={`mx-auto flex w-full max-w-xl flex-col items-center gap-7 text-center ${className}`}>
      {lines.map((line, index) => (
        <motion.p
          key={`${index}-${line.text.slice(0, 18)}`}
          className={CLASS_FOR[line.variant ?? 'body']}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={view ? undefined : start ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          whileInView={view ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          viewport={view ? { once: true, margin: '-8% 0px' } : undefined}
          transition={{ duration: 1.15, delay: 0.12 + index * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  )
}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
