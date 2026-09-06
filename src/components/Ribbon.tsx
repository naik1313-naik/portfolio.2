interface RibbonProps {
  items: string[]
  className?: string
}

export default function Ribbon({ items, className = '' }: RibbonProps) {
  const content = items.map((item) => (
    <span key={item} className="flex items-center whitespace-nowrap">
      <span className="px-6 font-display text-5xl font-bold uppercase leading-none tracking-tight text-outline md:text-6xl lg:text-7xl">
        {item}
      </span>
      <span className="text-2xl text-accent md:text-3xl">✦</span>
    </span>
  ))

  return (
    <div className={`marquee relative z-[2] border-y border-line py-8 md:py-10 ${className}`} aria-hidden="true">
      <div className="marquee-track">
        <div className="flex">{content}</div>
        <div className="flex" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  )
}