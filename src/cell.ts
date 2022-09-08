import { Block, WIDTH, HEIGHT } from "./common";
import layout from "./layout";
import Destroyer from "./main";

export default class Cells extends Block {
  index: number;
  layout: string[] = [];
  constructor(main: Destroyer) {
    super("#cell");
    this.index = main.index;
    this.layout = [...layout[this.index]];
    this.init();
  }

  init() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.ctx.fillStyle = "#f00";
    for (let i = 0; i < this.layout.length; i++) {
      if (this.layout[i] !== "2") continue;
      this.ctx.beginPath();
      this.ctx.rect(
        (i % 45) * (this.size + this.gap),
        ((i / 45) | 0) * (this.size + this.gap),
        this.size,
        this.size
      );
      this.ctx.fill();
    }
    this.ctx.restore();
  }
}
