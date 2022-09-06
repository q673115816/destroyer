import "./style.css";
import Control from "./control";
import Balls from "./ball";
import Wall from "./wall";
import Cells from "./cell";

class Destroyer {
  wall = new Wall();
  cells = new Cells();
  balls = new Balls();
  control = new Control();
  constructor() {
    this.init();
    this.update();
  }

  init() {
    this.balls.add();
    this.balls.add();
    this.balls.add();
    this.balls.add();
  }

  update() {
    this.balls.update({wall: this.wall, control: this.control})
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
