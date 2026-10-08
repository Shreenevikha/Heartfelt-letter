import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { GATE, SITE } from '../../data/content'
import { romanticAudio } from '../../utils/audioEngine'
import { renderHeartQr } from './heartQr'

function destination() {
  const configured = SITE.qrDestinationUrl.trim()
  if (!configured) {
    const url = new URL(window.location.href)
    url.searchParams.delete('gate')
    url.searchParams.set('enter', '1')
    url.hash = ''
    return url.toString()
  }
  try {
    const url = new URL(configured)
    if (!url.searchParams.has('enter')) url.searchParams.set('enter', '1')
    return url.toString()
  } catch {
    return configured
  }
}

export function QrGate({ onEnter }: { onEnter: () => void }) {
  const url = useMemo(() => destination(), [])
  const [image, setImage] = useState('')

  useEffect(() => {
    let alive = true
    void renderHeartQr(url, 1400).then((src) => {
      if (alive) setImage(src)
    })
    return () => {
      alive = false
    }
  }, [url])

  useEffect(() => {
    const id = window.setInterval(() => romanticAudio.playHeartbeat(), 1900)
    return () => clearInterval(id)
  }, [])

  const download = () => {
    if (!image) return
    const link = document.createElement('a')
    link.href = image
    link.download = 'for-raghav-heart-qr.png'
    link.click()
  }

  return (
    <div className="gate-screen">
      <div className="mx-auto flex min-h-svh w-full max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
        <motion.p
          className="kicker"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          For him
        </motion.p>
        <motion.h1
          className="display mt-3"
          style={{ fontSize: 'clamp(3.2rem, 12vw, 5.2rem)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          {GATE.name}
        </motion.h1>
        <motion.p
          className="whisper mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          {GATE.whisper}
        </motion.p>

        <motion.div
          className="mt-8 flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          <button type="button" className="heart-qr" onClick={onEnter} aria-label="Preview the story this heart opens">
            {image ? (
              <img src={image} alt="Heart shaped QR code for Raghav" />
            ) : (
              <span className="block aspect-[1/1.08] w-full rounded-full bg-white/50" />
            )}
          </button>
          <p className="mt-2 text-[0.72rem] tracking-[0.28em] uppercase text-[var(--rose)]">{GATE.scan}</p>
          <p className="whisper mx-auto mt-3 max-w-xs">Send him this heart. When he scans it, the story opens.</p>
          <button type="button" className="save-heart" onClick={download} disabled={!image}>
            Save heart QR
          </button>
          <p className="mt-6 text-lg italic text-[var(--rose)]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            {SITE.monogram}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
