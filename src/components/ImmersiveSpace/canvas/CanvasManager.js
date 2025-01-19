export class CanvasManager {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.effects = new Set()
    this.isRunning = false
    this.options = {
      dpr: window.devicePixelRatio || 1,
      fps: 60,
      ...options
    }
    
    this.setupCanvas()
    this.bindEvents()
  }

  setupCanvas() {
    const { dpr } = this.options
    const rect = this.canvas.getBoundingClientRect()
    
    this.canvas.width = rect.width * dpr
    this.canvas.height = rect.height * dpr
    this.ctx.scale(dpr, dpr)
    
    // Set default styles
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
  }

  bindEvents() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    this.setupCanvas()
  }

  addEffect(effect) {
    this.effects.add(effect)
  }

  removeEffect(effect) {
    this.effects.delete(effect)
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.animate()
  }

  stop() {
    this.isRunning = false
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  clear() {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)
  }

  animate() {
    if (!this.isRunning) return

    this.clear()
    
    // Update and draw all effects
    for (const effect of this.effects) {
      if (effect.update) effect.update()
      if (effect.draw) effect.draw(this.ctx)
    }

    this.animationFrame = requestAnimationFrame(this.animate.bind(this))
  }

  destroy() {
    this.stop()
    window.removeEventListener('resize', this.handleResize)
    this.effects.clear()
  }
}
