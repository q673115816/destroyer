import { Block, WIDTH, HEIGHT, Rect } from "./common";
import layout from "./layout";
import Destroyer from "./main";

export default class Cells extends Block {
  index: number;
  layout: string[] = [];
  list: Map<number, Rect> = new Map();
  constructor(main: Destroyer) {
    super("#cell");
    this.index = main.index;
    this.layout = [...layout[this.index]];
    this.init();
  }

  init() {
    this.create();
    this.update();
  }

  create() {
    for (let i = 0; i < this.layout.length; i++) {
      if (this.layout[i] !== "2") continue;
      this.list.set(
        i,
        new Rect({
          color: "#f00",
          x: (i % 45) * (this.size + this.gap),
          y: ((i / 45) | 0) * (this.size + this.gap),
          size: this.size,
        })
      );
    }
  }

  update() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (const [index, { x, y, size, color }] of this.list) {
      this.ctx.beginPath();
      this.ctx.rect(x, y, size, size);
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
    this.ctx.restore();
  }
}
