export interface StoryMedia {
  src: string
  kind: 'image' | 'video'
  album: string
  name: string
  private: boolean
}

const PRIVATE_NAME = /(private|intimate|nsfw|explicit)/i
const VIDEO = /\.(mp4|webm|mov)$/i

const files = import.meta.glob('../assets/media/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF,mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function albumFrom(path: string) {
  const parts = path.replace(/\\/g, '/').split('/')
  const index = parts.lastIndexOf('media')
  return index >= 0 ? (parts[index + 1] ?? 'misc') : 'misc'
}

function nameFrom(path: string) {
  const clean = path.replace(/\\/g, '/').split('/').pop() ?? path
  return clean.replace(/\.[^.]+$/, '')
}

export const ALL_MEDIA: StoryMedia[] = Object.entries(files)
  .map(([path, src]) => {
    const album = albumFrom(path)
    const name = nameFrom(path)
    return {
      src,
      kind: VIDEO.test(path) ? 'video' as const : 'image' as const,
      album,
      name,
      private: album === 'private' || PRIVATE_NAME.test(name) || PRIVATE_NAME.test(path),
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export function albumMedia(album: string) {
  return ALL_MEDIA.filter((item) => !item.private && item.album === album)
}

export function privateMedia() {
  return ALL_MEDIA.filter((item) => item.private)
}

export function publicMedia() {
  return ALL_MEDIA.filter((item) => !item.private)
}

export function matchingMedia(album: string, keywords: string[] = []) {
  const pool = albumMedia(album)
  if (keywords.length === 0) return pool
  const keys = keywords.map((key) => key.toLowerCase())
  return pool.filter((item) => keys.some((key) => item.name.toLowerCase().includes(key)))
}
