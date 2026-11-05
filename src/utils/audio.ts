// Lightweight Web Audio API sound synthesizer
// Generates subtle UI feedback without any external audio asset dependencies.

class SoundFX {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    // Lazy initialize on first interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public playCoin() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const now = this.ctx.currentTime

      osc.frequency.setValueAtTime(987.77, now) // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08) // E6

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.35)
    } catch {
      // Audio not permitted, ignore gracefully
    }
  }

  public playPop() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      const now = this.ctx.currentTime

      osc.frequency.setValueAtTime(350, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.12)
    } catch {
      // Ignore
    }
  }

  public playSuccess() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        const start = now + idx * 0.07

        osc.frequency.setValueAtTime(freq, start)
        gain.gain.setValueAtTime(0.06, start)
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(start)
        osc.stop(start + 0.25)
      })
    } catch {
      // Ignore
    }
  }

  public playError() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      const now = this.ctx.currentTime

      osc.frequency.setValueAtTime(180, now)
      osc.frequency.setValueAtTime(140, now + 0.08)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.25)
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundFX()

