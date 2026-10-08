import type { ChapterMeta } from '../../data/content'
import { SITE } from '../../data/content'

function RailButton({
  id,
  label,
  current,
  onJump,
}: {
  id: string
  label: string
  current: string
  onJump: (id: string) => void
}) {
  const active = current === id
  return (
    <button
      type="button"
      onClick={() => onJump(id)}
      aria-current={active ? 'true' : undefined}
      className={`min-h-11 min-w-8 shrink-0 px-1 text-[0.68rem] tracking-[0.18em] transition-colors ${
        active ? 'text-[#6d4e66]' : 'text-[rgba(109,78,102,0.38)] hover:text-[#c97b96]'
      }`}
    >
      {label}
    </button>
  )
}

export function ChapterRail({
  chapters,
  current,
  onJump,
}: {
  chapters: ChapterMeta[]
  current: string
  onJump: (id: string) => void
}) {
  const numbered = chapters.filter((chapter) => chapter.num)

  return (
    <>
      <nav
        aria-label="Chapters"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-0.5 overflow-x-auto bg-gradient-to-t from-[#fff7fb] via-[rgba(255,247,251,0.94)] to-transparent px-2 pt-6 pb-[max(0.4rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {numbered.map((chapter) => (
          <RailButton key={chapter.id} id={chapter.id} label={chapter.num} current={current} onJump={onJump} />
        ))}
        <RailButton id="finale" label="Fin" current={current} onJump={onJump} />
      </nav>

      <nav
        aria-label="Chapters"
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start md:flex"
      >
        {numbered.map((chapter) => (
          <RailButton key={chapter.id} id={chapter.id} label={chapter.num} current={current} onJump={onJump} />
        ))}
        <RailButton id="finale" label="Fin" current={current} onJump={onJump} />
        <p className="serif mt-4 max-w-[7rem] text-[0.95rem] italic leading-tight text-[#c97b96]">
          {SITE.monogram}
        </p>
      </nav>
    </>
  )
}
