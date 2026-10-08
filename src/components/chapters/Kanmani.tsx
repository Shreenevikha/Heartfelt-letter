import { motion } from 'framer-motion'
import { KANMANI, SITE } from '../../data/content'
import { useInView } from '../../hooks/useInView'
import { Script } from '../ui/Script'

export function Kanmani() {
  const { ref, seen } = useInView<HTMLElement>(0.35)

  return (
    <section id="chapter-kanmani" data-chapter="kanmani" ref={ref} className="chapter mood-memory">
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="kicker">10 — A Name That Became Ours</p>
        <Script lines={KANMANI.lines} start={seen} stagger={0.95} />
        <motion.h2
          className="hand mt-16"
          style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', color: '#c97b96' }}
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={seen ? { opacity: 1, filter: 'blur(0px)' } : undefined}
          transition={{ delay: 3.4, duration: 1.8 }}
        >
          {KANMANI.title}
        </motion.h2>
        <p className="mt-8 text-[0.95rem] italic text-[#c97b96]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
          {SITE.monogram}
        </p>
      </div>
    </section>
  )
}
