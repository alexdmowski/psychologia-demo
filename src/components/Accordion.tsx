import { useId, useRef, useState } from 'react'

import type { FaqItem } from '../content/types'

interface AccordionProps {
  items: FaqItem[]
  /** Nagłówek jakiego poziomu renderować dla pytań */
  headingLevel?: 'h2' | 'h3'
}

/**
 * Dostępny akordeon zgodny z wzorcem WAI-ARIA:
 * przyciski z aria-expanded/aria-controls, panele z role="region",
 * nawigacja strzałkami / Home / End między nagłówkami.
 */
export default function Accordion({ items, headingLevel: Heading = 'h3' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const triggers = triggersRef.current
    const count = items.length
    let target: number | null = null
    if (event.key === 'ArrowDown') target = (index + 1) % count
    else if (event.key === 'ArrowUp') target = (index - 1 + count) % count
    else if (event.key === 'Home') target = 0
    else if (event.key === 'End') target = count - 1
    if (target !== null) {
      event.preventDefault()
      triggers[target]?.focus()
    }
  }

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const headerId = `${baseId}-h-${index}`
        const panelId = `${baseId}-p-${index}`
        return (
          <div className="accordion__item" key={item.question}>
            <Heading style={{ margin: 0 }}>
              <button
                ref={(el) => {
                  triggersRef.current[index] = el
                }}
                type="button"
                className="accordion__trigger"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onKeyDown={(e) => onKeyDown(e, index)}
              >
                <span>{item.question}</span>
                <span className="acc-icon" aria-hidden="true">
                  +
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={headerId} className="accordion__panel" hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
