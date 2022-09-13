import { clamp } from "lodash";
import { concatAll, fromEvent, takeUntil, map } from "rxjs";
import { Common, WIDTH, HEIGHT } from "./common";
import Destroyer from './main'
type Code = "ArrowLeft" | "ArrowRight";

export default class Control extends Common {
  width = 80;
  height = 10;
  state: Record<Code, boolean> = {
    ArrowLeft: false,
    ArrowRight: false,
  };
  x = WIDTH / 2 - this.width / 2;
  y = HEIGHT - 200;
  v = 5;
  constructor(private main: Destroyer) {
    super("#control");
    this.init();
  }

  init() {
    this.register();
    this.registerMause();
    this.registerTouch();
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
      if (code === "Space") {
        this.main.balls.add()
      }
    });

    document.addEventListener("keyup", (event) => {
      const { code } = event;
      if (code in this.state) this.state[code as Code] = false;
    });
  }

  registerMause() {
    const mouseDown$ = fromEvent<MouseEvent>(
      document.querySelector("#control") as HTMLCanvasElement,
      "mousedown"
    );
    const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
    const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");

    mouseDown$
      .pipe(
        // filter((e) => {
        //   return e.target === el;
        // }),
        map((e) => {
          return {
            x: this.x,
            startX: e.clientX,
          };
        }),
        map(({ x, startX }) =>
          mouseMove$.pipe(
            takeUntil(mouseUp$),
            map(({ clientX }) => ({
              x,
              left: clientX - startX,
            }))
          )
        ),
        concatAll()
      )
      .subscribe({
        next: (data) => {
          this.x = data.x + data.left;
        },
      });
  }

  registerTouch() {
    const touchStart$ = fromEvent<TouchEvent>(
      document.querySelector("#control") as HTMLCanvasElement,
      "touchstart"
    );
    const touchMove$ = fromEvent<TouchEvent>(document, "touchmove");
    const touchEnd$ = fromEvent<TouchEvent>(document, "touchend");
    touchStart$
      .pipe(
        map(({ changedTouches }) => {
          return {
            x: this.x,
            startX: changedTouches[0].clientX,
          };
        }),
        map(({ x, startX }) =>
          touchMove$.pipe(
            takeUntil(touchEnd$),
            map(({ changedTouches }) => ({
              x,
              left: changedTouches[0].clientX - startX,
            }))
          )
        ),
        concatAll()
      )
      .subscribe({
        next: (data) => {
          this.x = data.x + data.left;
        },
      });
  }
}
