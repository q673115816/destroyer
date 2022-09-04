import { WIDTH, HEIGHT, init } from './config'
const { canvas, ctx } = init('#ball')
const SIZE = 5
const balls: Ball[] = []

export default class Ball {
  x: number
  y: number
  private timer: number | null = null
  private state: boolean = false
  private size = SIZE
  private xv: number = Math.random() * 2 - 1
  private yv: number = Math.random() * 2 - 1
  constructor({ x, y }: { x: number; y: number }) {
    this.x = x
    this.y = y

    this.start()
  }

  init() {
    this.register()
    this.draw()
  }

  start() {
    this.x += this.xv
    this.y += this.yv
    if (this.x < 0 || this.x - this.size >= WIDTH) this.xv *= -1
    if (this.y < 0 || this.y - this.size >= HEIGHT) this.xv *= -1
    if (this.x < 0) this.x = -this.x
    if (this.y < 0) this.y = -this.y
    if (this.x - this.size >= WIDTH) this.x -= WIDTH - this.x + this.size
  }

  register() {
    document.addEventListener('keydown', (event) => {
      const { code } = event
      if (code === 'Space') this.state = true
    })
  }

  draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    balls.forEach(({ x, y }) => {
      ctx.arc(x, y, SIZE, 0, 2 * Math.PI)
    })
    ctx.fill()
    ctx.restore()
    this.timer = requestAnimationFrame(this.draw)
  }
}
