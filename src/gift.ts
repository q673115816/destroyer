import { Block, WIDTH, HEIGHT } from "./common";

export default class Gifts extends Block {
list: Gift[] = []
  constructor() {
    super("#gift");
    this.init();
  }

  init() {
  }
}

class Gift {
    constructor() {

    }
}