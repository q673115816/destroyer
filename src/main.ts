import "./style.css";
import Control from "./control";
import Balls from "./ball";
import Wall from "./wall";
import Gift from "./gift";
import Cells from "./cell";

export default class Destroyer {
  index = 0;
  wall = new Wall(this);
  gift = new Gift();
  cells = new Cells(this);
  balls = new Balls(this);
  control = new Control(this);
  constructor() {
    this.init();
    this.update();
  }

  init() {
    this.balls.add();
  }

  update() {
    this.balls.update()
    this.control.update()
    requestAnimationFrame(this.update.bind(this));
  }
}

const destroyer = new Destroyer();
document.querySelector("#add")!.addEventListener("click", () => {
  destroyer.balls.three();
});
document.querySelector("#all")!.addEventListener("click", () => {
  console.log(destroyer.balls.balls);
});
