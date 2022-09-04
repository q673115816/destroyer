import { WIDTH, HEIGHT, init } from './config'
const SIZE = 5
const balls: Ball[] = []

class BallList {
  list: Ball[] = []
  private timer: number | null = null
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  constructor() {
    const { canvas, ctx } = init('#ball')
    this.canvas = canvas
    this.ctx = ctx
    this.draw()
  }

  draw() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT)
    this.ctx.beginPath()
    this.ctx.fillStyle = '#fff'
    this.list.forEach(({ x, y }) => {
      this.ctx.arc(x, y, SIZE, 0, 2 * Math.PI)
    })
    this.ctx.fill()
    this.ctx.restore()
    this.timer = requestAnimationFrame(this.draw)
  }
}

export default class Ball {
  x: number
  y: number
  private size = SIZE
  private xv: number = Math.random() * 2 - 1
  private yv: number = Math.random() * 2 - 1
  constructor({ x, y }: { x: number; y: number }) {
    this.x = x
    this.y = y

    this.start()
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
}
