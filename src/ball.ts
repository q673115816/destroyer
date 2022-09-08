import { Common, WIDTH, HEIGHT } from "./common";
import Destroyer from "./main";
import Walls from "./wall";
export default class Balls extends Common {
  balls: Set<Ball> = new Set();
  constructor(private main: Destroyer) {
    super("#ball");
  }

  update() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.ctx.fillStyle = "#fff";
    for (const ball of this.balls) {
      const { x, y, size, isOut } = ball;
      if (isOut) {
        this.balls.delete(ball);
        continue;
      }
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, 2 * Math.PI);
      this.ctx.fill();
      ball.crash(this.main.control);
      ball.location(this.main.wall)

      ball.update();
    }
    this.ctx.restore();
  }

  add(
    ball: Ball = new Ball({
      x: this.main.control.x + this.main.control.width / 2,
      y: this.main.control.y,
    })
  ) {
    this.balls.add(ball);
  }

  three() {
    const temp: Ball[] = [];
    for (const ball of this.balls) {
      const { x, y } = ball;
      temp.push(ball);
      for (let i = 0; i < 3; i++) {
        temp.push(new Ball({ x, y }));
      }
    }
    this.balls = new Set(temp);
  }

  get() {
    return this.balls;
  }
}

class Ball {
  x: number;
  y: number;
  size = 5;
  v = 5;
  private xv: number;
  private yv: number;
  isOut: Boolean = false;
  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
    this.xv = Math.random() * this.v - this.v / 2;
    this.yv = -Math.sqrt(25 - this.xv * this.xv);
  }

  update() {
    this.x += this.xv;
    this.y += this.yv;
    if (!this.check()) return;
  }

  crash({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): boolean {
    if (
      y < this.y + this.size &&
      y + height > this.y &&
      x < this.x + this.size &&
      x + width > this.x
    ) {
      if (this.y + this.size > y) {
        this.y -= this.y + this.size - y;
      }
      const ratio = (this.x - x - width / 2) / (width / 2);
      this.xv = ((ratio * this.v) / 10) * 9;
      this.yv = -Math.sqrt(this.v ** 2 - this.xv ** 2);
    }
    return false;
  }

  location(block: Walls) {
    this.x
  }

  redirect() {
    this.xv *= -1;
    this.yv *= -1;
  }

  check(): boolean {
    if (this.y - this.size >= HEIGHT) {
      this.isOut = true;
      return false;
    }
    if (this.x < 0 || this.x - this.size >= WIDTH) this.xv *= -1;
    if (this.y < 0) this.yv *= -1;
    if (this.x < 0) this.x = -this.x;
    if (this.y < 0) this.y = -this.y;
    return true;
  }
}
