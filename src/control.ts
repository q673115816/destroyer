import { clamp } from 'lodash'
import { WIDTH, HEIGHT, init } from './config'

type Code = 'ArrowLeft' | 'ArrowRight'

export default class Control {
  private SIZE = 150
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  state: Record<Code, boolean> = {
    ArrowLeft: false,
    ArrowRight: false,
  }
  x = WIDTH / 2 - this.SIZE / 2
  v = 2
  constructor() {
    const { canvas, ctx } = init('#control')
    this.canvas = canvas
    this.ctx = ctx
    this.init()
  }

  init() {
    this.register()
    this.draw()
  }

  update() {
    if (this.state['ArrowLeft']) this.x -= this.v
    if (this.state['ArrowRight']) this.x += this.v
    this.x = clamp(this.x, 0, WIDTH - this.SIZE)
  }

  draw() {
    this.update()
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT)
    this.ctx.beginPath()
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.x, HEIGHT - 100, this.SIZE, 10)
    this.ctx.restore()
    requestAnimationFrame(this.draw)
  }

  register() {
    document.addEventListener('keydown', (event) => {
      const { code } = event
      if (code in this.state) this.state[code as Code] = true
    })

    document.addEventListener('keyup', (event) => {
      const { code } = event
      if (code in this.state) this.state[code as Code] = false
    })
  }
}
