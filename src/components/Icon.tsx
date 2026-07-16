import type { JSX } from 'react'

export type IconName =
  | 'leaf'
  | 'compass'
  | 'building'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'clock'
  | 'check'
  | 'calendar'
  | 'video'
  | 'chat'
  | 'search'
  | 'download'
  | 'users'
  | 'spark'
  | 'shield'
  | 'file'
  | 'heart'
  | 'target'

const paths: Record<IconName, JSX.Element> = {
  leaf: (
    <>
      <path d="M6 15c0-6 4-10 12-11-1 8-5 12-11 12" />
      <path d="M6 20c2-6 6-10 11-12" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="12" height="18" rx="1" />
      <path d="M16 9h4v12H4" />
      <path d="M8 7h1m3 0h1M8 11h1m3 0h1M8 15h1m3 0h1" />
    </>
  ),
  phone: <path d="M5 4h4l1.5 4L8 10a12 12 0 0 0 6 6l2-2.5 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4m8-4v4M3 10h18" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </>
  ),
  chat: <path d="M21 12a8 8 0 0 1-8 8H4l2.5-3A8 8 0 1 1 21 12Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </>
  ),
  download: <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6" />
      <path d="M16 5a3.5 3.5 0 0 1 0 7m2 8c0-2.6-1.2-4.6-3-5.6" />
    </>
  ),
  spark: <path d="M12 3v4m0 10v4m9-9h-4M7 12H3m14.4-6.4-2.8 2.8M9.4 14.6l-2.8 2.8m0-10.8 2.8 2.8m5.2 5.2 2.8 2.8" />,
  shield: <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-3 9 2.2 2.2L15 10.5" />,
  file: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.8-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.2-7.5 10-7.5 10Z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
}

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
