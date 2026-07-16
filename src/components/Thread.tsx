/** Sygnatura wizualna marki: „nić rozmowy" — delikatna miedziana linia. */
export default function Thread({ className }: { className?: string }) {
  return (
    <svg
      className={`thread ${className ?? ''}`}
      viewBox="0 0 560 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M4 96 C 90 40, 150 108, 236 68 S 380 10, 452 54 c 36 22, 72 18, 104 -6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="4" cy="96" r="5" fill="currentColor" />
      <circle cx="556" cy="48" r="5" fill="currentColor" />
    </svg>
  )
}
