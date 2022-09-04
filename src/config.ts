export const WIDTH = 900 / 2
export const HEIGHT = 1600 / 2

export const init = (id) => {
  const canvas = document.querySelector(id) as HTMLCanvasElement
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  return {
    canvas,
    ctx,
  }
}
