export enum Status {
  null,
  wall,
  block,
}

interface Layout {
  [key: number]: string;
}

const layout: Layout = {
  0: `00000000000000000000000000000000000000002000000000000000000000000000020000000000000022000000000220000000222000000222220000000000220000000000022000022002200002200002220000002200000000000002202200000022022000000002200020000000000000000222000000000222000000000022200000000000000000222200000002002220000002220222000000000000002000220000220000022000222000002200000000000220000022000000000002200000000000222000000000200000000000000000000200000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000100000000000010000000000000000000100000000000100100000000010000000000000000000101111000000111100000000010000000000000101101110000000111010000000000010001000000011000011000000000000110000000000011111000000000000011100000000000011000001111110000000000000000110110000000000101100000000010000000000000011000011000000000100111000000011000000000000000000001100000001100001100000101110000000000000000000010000000000000000000100010000000000000000000000000000000000000000000001000000000000010000000000000000000000000000000000000000000001000000000000100000000000000000000000000000001000000000000110000000000000100000000000000001000000000000010000000000000100111000000000001111100000000010111111000111111100000000111111111100000001111000000000000100000000000000011000000000000111100000000000110000000000000111100000000000100110000000001111000000000000110100000000001100001110000001001100000000001100001110000001000000011100011000110000000110000000011000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002222222222222222222222222222222`,
  1: "000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111200000000000000000000000000000000000000000000200000000000000000000000000000000000000000000200000000000000000000000000000000000000000000200000000000000000000000000000000000000000000200000000000000000000000000000000000000000000200000000000000000000000000000000000000000000200000000000000000000000000000000000000000000111111111111111",
};

export default layout;