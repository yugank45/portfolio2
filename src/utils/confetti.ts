// Lightweight zero-dependency canvas confetti burst
export function triggerConfetti() {
  if (typeof window === 'undefined') return

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '99999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }

  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)

  const colors = ['#FF9900', '#818cf8', '#34d399', '#f43f5e', '#38bdf8', '#fbbf24']
  const particleCount = 70
  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    rotation: number
    vRot: number
    alpha: number
  }> = []

  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
    const speed = 4 + Math.random() * 8
    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 15,
      alpha: 1,
    })
  }

  let animationFrameId: number
  const startTime = Date.now()

  function update() {
    if (!ctx) return
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    const elapsed = Date.now() - startTime
    let stillAlive = false

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.2 // gravity
      p.vx *= 0.98 // drag
      p.rotation += p.vRot
      p.alpha = Math.max(0, 1 - elapsed / 1800)

      if (p.alpha > 0) {
        stillAlive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }
    }

    if (stillAlive && elapsed < 2000) {
      animationFrameId = requestAnimationFrame(update)
    } else {
      cancelAnimationFrame(animationFrameId)
      canvas.remove()
    }
  }

  animationFrameId = requestAnimationFrame(update)
}

