// Generowanie pliku .ics „Dodaj do kalendarza" — bez zewnętrznych bibliotek.

interface IcsEvent {
  title: string
  description: string
  location: string
  dateIso: string // RRRR-MM-DD
  time: string // GG:MM
  durationMinutes: number
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function toIcsStamp(date: Date): string {
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  )
}

export function buildIcs(event: IcsEvent): string {
  const [h, m] = event.time.split(':').map(Number)
  const [y, mo, d] = event.dateIso.split('-').map(Number)
  const start = new Date(y, mo - 1, d, h, m)
  const end = new Date(start.getTime() + event.durationMinutes * 60_000)
  const uid = `${event.dateIso}-${event.time.replace(':', '')}@aleksandranowicka.demo`

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aleksandra Nowicka Demo//PL',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toIcsStamp(new Date())}`,
    `DTSTART:${toIcsStamp(start)}`,
    `DTEND:${toIcsStamp(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadIcs(event: IcsEvent, filename: string): void {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
