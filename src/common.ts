export const WIDTH = 900 / 2;
export const HEIGHT = 1600 / 2;

export class Common {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  constructor(id: string) {
    this.canvas = document.querySelector(id) as HTMLCanvasElement;
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }
}

export class Block extends Common {
  num = 45;
  gap = 2;
  size = (WIDTH - (this.num - 1) * this.gap) / this.num;
  constructor(id: string) {
    super(id);
  }
}
