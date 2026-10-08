import { motion } from 'framer-motion'
import { SITE } from '../../data/content'

export function Ticket({
  film,
  date,
  time,
}: {
  film: string
  date?: string
  time?: string
}) {
  return (
    <motion.div
      className="ticket"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ticket-main">
        <span className="admit">Admit one</span>
        <strong>{film}</strong>
        {date && <span className="meta">{date}</span>}
        {time && <span className="meta">{time}</span>}
      </div>
      <div className="ticket-stub">{SITE.monogram}</div>
    </motion.div>
  )
}
