import type { AudioMood } from '../data/content'

type BedMood = Exclude<AudioMood, 'hush'>

interface MoodBed {
  chords: number[][]
  step: number
  filter: number
  gain: number
  bells: boolean
}

const BEDS: Record<BedMood, MoodBed> = {
  pulse: {
    chords: [[55, 82.41]],
    step: 7200,
    filter: 240,
    gain: 0.045,
    bells: false,
  },
  memory: {
    chords: [
      [220, 261.63, 329.63, 392],
      [196, 246.94, 293.66, 392],
      [174.61, 220, 261.63, 329.63],
      [164.81, 207.65, 246.94, 329.63],
    ],
    step: 4400,
    filter: 680,
    gain: 0.07,
    bells: true,
  },
  intimate: {
    chords: [
      [174.61, 220, 261.63, 329.63],
      [164.81, 196, 246.94, 311.13],
      [146.83, 174.61, 220, 261.63],
      [130.81, 164.81, 196, 246.94],
    ],
    step: 5400,
    filter: 480,
    gain: 0.055,
    bells: false,
  },
  warm: {
    chords: [
      [261.63, 329.63, 392, 493.88],
      [220, 277.18, 329.63, 440],
      [196, 246.94, 293.66, 392],
      [174.61, 220, 261.63, 349.23],
    ],
    step: 4800,
    filter: 860,
    gain: 0.06,
    bells: true,
  },
  finale: {
    chords: [
      [146.83, 174.61, 220, 293.66],
      [130.81, 164.81, 196, 261.63],
      [174.61, 220, 261.63, 329.63],
      [196, 246.94, 293.66, 369.99],
    ],
    step: 5800,
    filter: 560,
    gain: 0.055,
    bells: true,
  },
}

class RomanticAudioEngine {
  private ctx: AudioContext | null = null
  private playing = false
  private unlocked = false
  private muted = false
  private volume = 0.42
  private mood: AudioMood = 'pulse'
  private intervalId: number | null = null
  private chordIndex = 0
  private listeners = new Set<() => void>()

  subscribe(cb: () => void) {
    this.listeners.add(cb)
    return () => {
      this.listeners.delete(cb)
    }
  }

  private notify() {
    this.listeners.forEach((cb) => cb())
  }

  isUnlocked() {
    return this.unlocked
  }

  isPlaying() {
    return this.playing
  }

  isMuted() {
    return this.muted
  }

  getVolume() {
    return this.volume
  }

  getMood() {
    return this.mood
  }

  unlock() {
    this.unlocked = true
    this.getContext()
    this.notify()
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value))
    if (this.volume === 0) this.setMuted(true)
    this.notify()
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (muted) this.stop()
    else if (this.unlocked && this.mood !== 'hush') this.start()
    this.notify()
  }

  toggleMuted() {
    this.setMuted(!this.muted)
  }

  setMood(mood: AudioMood) {
    if (this.mood === mood && (mood === 'hush' || this.playing || !this.unlocked || this.muted)) {
      this.mood = mood
      this.notify()
      return
    }
    this.mood = mood
    this.chordIndex = 0
    if (!this.unlocked || this.muted) {
      this.notify()
      return
    }
    this.stop()
    if (mood !== 'hush') this.start()
  }

  start() {
    if (this.playing || this.muted || this.mood === 'hush') return
    try {
      this.getContext()
      this.playing = true
      this.notify()
      this.playCycle()
      const bed = BEDS[this.mood as BedMood]
      this.intervalId = window.setInterval(() => this.playCycle(), bed?.step ?? 4800)
    } catch {
      this.playing = false
      this.notify()
    }
  }

  stop() {
    this.playing = false
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.notify()
  }

  private playCycle() {
    if (!this.playing || this.mood === 'hush') return
    const bed = BEDS[this.mood as BedMood]
    if (!bed) return
    const chord = bed.chords[this.chordIndex % bed.chords.length]
    this.playChord(chord, bed)
    if (bed.bells) {
      chord.forEach((freq, index) => {
        window.setTimeout(() => {
          if (this.playing) this.playBell(freq * 2, 0.035, 1.6)
        }, index * 900)
      })
    }
    this.chordIndex += 1
  }

  private getContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  private playChord(frequencies: number[], bed: MoodBed) {
    if (this.muted || this.volume <= 0) return
    const ctx = this.getContext()
    const now = ctx.currentTime
    frequencies.forEach((freq) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(bed.filter, now)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      const level = (this.volume * bed.gain) / frequencies.length
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(Math.max(level, 0.0002), now + 1.4)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + bed.step / 1000 + 1.2)
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + bed.step / 1000 + 1.4)
    })
  }

  playBell(freq = 660, intensity = 0.06, decay = 1.4) {
    if (this.muted || this.volume <= 0 || !this.unlocked) return
    try {
      const ctx = this.getContext()
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(this.volume * intensity, now + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + decay + 0.05)
    } catch {
      /* autoplay or device limits */
    }
  }

  playHeartbeat() {
    if (this.muted || this.volume <= 0 || !this.unlocked) return
    try {
      const ctx = this.getContext()
      const now = ctx.currentTime
      const thump = (time: number, freq: number, level: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, time)
        osc.frequency.exponentialRampToValueAtTime(36, time + 0.18)
        gain.gain.setValueAtTime(0.0001, time)
        gain.gain.exponentialRampToValueAtTime(level * this.volume, time + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.32)
      }
      thump(now, 72, 0.28)
      thump(now + 0.2, 54, 0.18)
    } catch {
      /* ignore */
    }
  }
}

export const romanticAudio = new RomanticAudioEngine()
