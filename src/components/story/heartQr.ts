import { toDataURL } from 'qrcode'

function traceHeart(
  context: CanvasRenderingContext2D,
  cx: number,
  top: number,
  width: number,
  height: number,
) {
  const y = top
  context.beginPath()
  context.moveTo(cx, y + height * 0.3)
  context.bezierCurveTo(cx, y + height * 0.12, cx - width * 0.06, y, cx - width * 0.26, y + height * 0.02)
  context.bezierCurveTo(cx - width * 0.52, y + height * 0.05, cx - width * 0.52, y + height * 0.34, cx - width * 0.52, y + height * 0.36)
  context.bezierCurveTo(cx - width * 0.52, y + height * 0.58, cx - width * 0.28, y + height * 0.74, cx, y + height)
  context.bezierCurveTo(cx + width * 0.28, y + height * 0.74, cx + width * 0.52, y + height * 0.58, cx + width * 0.52, y + height * 0.36)
  context.bezierCurveTo(cx + width * 0.52, y + height * 0.34, cx + width * 0.52, y + height * 0.05, cx + width * 0.26, y + height * 0.02)
  context.bezierCurveTo(cx + width * 0.06, y, cx, y + height * 0.12, cx, y + height * 0.3)
  context.closePath()
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.arcTo(x + width, y, x + width, y + height, radius)
  context.arcTo(x + width, y + height, x, y + height, radius)
  context.arcTo(x, y + height, x, y, radius)
  context.arcTo(x, y, x + width, y, radius)
  context.closePath()
}

/** A shareable heart image. The code inside stays square so a phone can scan it. */
export async function renderHeartQr(url: string, size = 1400) {
  const qrSize = Math.round(size * 0.4)
  const qrUrl = await toDataURL(url, {
    width: qrSize,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: { dark: '#7a4e68ff', light: '#ffffffff' },
  })

  const qr = new Image()
  qr.src = qrUrl
  await qr.decode()

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = Math.round(size * 1.08)
  const context = canvas.getContext('2d')
  if (!context) return qrUrl

  const cx = canvas.width / 2
  const top = size * 0.04
  const heartWidth = size * 0.9
  const heartHeight = size * 0.98

  traceHeart(context, cx, top, heartWidth, heartHeight)
  const fill = context.createLinearGradient(cx, top, cx, top + heartHeight)
  fill.addColorStop(0, '#f7c5d8')
  fill.addColorStop(0.45, '#e7d0fb')
  fill.addColorStop(1, '#f8d3c4')
  context.fillStyle = fill
  context.fill()
  context.lineWidth = size * 0.012
  context.strokeStyle = 'rgba(255,255,255,0.85)'
  context.stroke()

  const plate = qrSize + size * 0.055
  const plateX = cx - plate / 2
  const plateY = top + heartHeight * 0.2
  roundRect(context, plateX, plateY, plate, plate, size * 0.035)
  context.fillStyle = '#ffffff'
  context.fill()

  context.drawImage(qr, cx - qrSize / 2, plateY + (plate - qrSize) / 2, qrSize, qrSize)

  context.fillStyle = '#7a4e68'
  context.textAlign = 'center'
  context.font = `500 ${Math.round(size * 0.042)}px Georgia, serif`
  context.fillText('For Raghav', cx, plateY + plate + size * 0.07)

  return canvas.toDataURL('image/png')
}
