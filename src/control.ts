import { clamp } from "lodash";
import { Common, WIDTH, HEIGHT } from "./common";
type Code = "ArrowLeft" | "ArrowRight";

export default class Control extends Common {
  width = 150;
  height = 10;
  state: Record<Code, boolean> = {
    ArrowLeft: false,
    ArrowRight: false,
  };
  x = WIDTH / 2 - this.width / 2;
  y = HEIGHT - 100
  v = 5;
  constructor() {
    super("#control");
    this.init();
  }

  init() {
    this.register();
  }

  update() {
    if (this.state["ArrowLeft"]) this.x -= this.v;
    if (this.state["ArrowRight"]) this.x += this.v;
    this.x = clamp(this.x, -this.width / 2, WIDTH - this.width / 2);
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }

  register() {
    document.addEventListener("keydown", (event) => {
      const { code } = event;
      if (code in this.state) this.state[code as Code] = true;
    });

    document.addEventListener("keyup", (event) => {
      const { code } = event;
      if (code in this.state) this.state[code as Code] = false;
    });
  }
}
