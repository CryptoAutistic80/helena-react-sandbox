import {
  CanvasTexture,
  Color,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector2,
} from 'three'

const FALLBACK_TEXTURE_URL = new URL(
  '../../../assets/landscape-fallback.svg',
  import.meta.url,
).href

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a: number, b: number, t: number) {
  return a + t * (b - a)
}

type GradientGrid = Vector2[][]

function buildGradientGrid(columns: number, rows: number) {
  const gradients: GradientGrid = []
  for (let y = 0; y <= rows; y += 1) {
    const row: Vector2[] = []
    for (let x = 0; x <= columns; x += 1) {
      const angle = Math.random() * Math.PI * 2
      row.push(new Vector2(Math.cos(angle), Math.sin(angle)))
    }
    gradients.push(row)
  }
  return gradients
}

function perlin(x: number, y: number, gradients: GradientGrid) {
  const x0 = Math.floor(x)
  const x1 = x0 + 1
  const y0 = Math.floor(y)
  const y1 = y0 + 1

  const sx = fade(x - x0)
  const sy = fade(y - y0)

  const n00 = gradients[y0][x0].dot(new Vector2(x - x0, y - y0))
  const n10 = gradients[y0][x1].dot(new Vector2(x - x1, y - y0))
  const ix0 = lerp(n00, n10, sx)

  const n01 = gradients[y1][x0].dot(new Vector2(x - x0, y - y1))
  const n11 = gradients[y1][x1].dot(new Vector2(x - x1, y - y1))
  const ix1 = lerp(n01, n11, sx)

  return lerp(ix0, ix1, sy)
}

async function loadFallbackTexture(): Promise<Texture> {
  const loader = new TextureLoader()
  return new Promise((resolve, reject) => {
    loader.load(
      FALLBACK_TEXTURE_URL,
      (texture) => {
        texture.colorSpace = SRGBColorSpace
        resolve(texture)
      },
      undefined,
      (event) => reject(event),
    )
  })
}

export async function createLandscapeTexture(
  width = 1024,
  height = 512,
): Promise<Texture> {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Canvas context unavailable')
    }

    const skyGradient = context.createLinearGradient(0, 0, 0, height)
    skyGradient.addColorStop(0, '#081627')
    skyGradient.addColorStop(0.55, '#10243c')
    skyGradient.addColorStop(1, '#17324a')
    context.fillStyle = skyGradient
    context.fillRect(0, 0, width, height)

    context.fillStyle = '#61dafb44'
    context.beginPath()
    context.ellipse(width * 0.5, height * 0.28, width * 0.22, height * 0.12, 0, 0, Math.PI * 2)
    context.fill()

    const layers = 3
    const baseAmplitude = height * 0.28
    for (let layer = 0; layer < layers; layer += 1) {
      const gridSize = 8 + layer * 2
      const gradients = buildGradientGrid(gridSize, gridSize)
      const points: number[] = []
      for (let x = 0; x <= width; x += 1) {
        const nx = (x / width) * (gridSize - 1)
        const ny = layer * 0.6 + 2
        const noise = perlin(nx, ny, gradients)
        const elevation = noise * 0.5 + 0.5
        const layerOffset = layer * height * 0.08
        const y = height * 0.6 + layerOffset - elevation * (baseAmplitude - layerOffset)
        points.push(y)
      }

      context.beginPath()
      context.moveTo(0, height)
      for (let x = 0; x <= width; x += 1) {
        const y = points[x]
        context.lineTo(x, y)
      }
      context.lineTo(width, height)
      context.closePath()

      const shade = new Color('#101a28')
      shade.lerp(new Color('#1f2f42'), layer / layers)
      context.fillStyle = shade.getStyle()
      context.fill()

      context.globalAlpha = 0.08
      context.strokeStyle = '#61dafb'
      context.lineWidth = 1
      context.stroke()
      context.globalAlpha = 1
    }

    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
    texture.flipY = false
    return texture
  } catch (error) {
    console.error('[createLandscapeTexture] Falling back to static asset', error)
    return loadFallbackTexture()
  }
}
