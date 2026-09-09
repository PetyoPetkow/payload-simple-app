import Link from 'next/link'
import { ComponentProps, FC } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const getPaginationItems = (current: number, total: number) => {
  const entries = new Set([1, total])

  if (current + 1 < total) entries.add(current + 1)
  if (current - 1 > 1) entries.add(current - 1)
  entries.add(current)

  const sorted = [...entries].sort((a, b) => a - b)

  const items: (number | null)[] = []

  items.push(sorted[0])

  for (let index = 1; index < sorted.length; index++) {
    const element = sorted[index]
    const prev = sorted[index - 1]

    if (element - 1 > prev) items.push(null)

    items.push(element)
  }

  return items
}

const Pagination: FC<PaginationProps> = ({ current, total, slug, className }) => {
  const items = getPaginationItems(current, total)

  return (
    <div className={'grid grid-cols-[1fr_auto_1fr] items-center text-xl w-[500px] ' + className}>
      {current === 1 ? (
        <div className="flex gap-2 items-center text-gray-400 opacity-50 select-none justify-self-start">
          <ChevronLeft /> <span>Previous</span>
        </div>
      ) : (
        <Link
          href={`${slug}?page=${current - 1}`}
          className="flex gap-2 items-center select-none justify-self-start"
        >
          <ChevronLeft />
          <span>Previous</span>
        </Link>
      )}
      <div className="flex gap-2">
        {items.map((item, i) => {
          if (item === null) {
            return (
              <span key={`ellipsis-${i}`} className="select-none">
                ...
              </span>
            )
          } else
            return (
              <Link
                key={item}
                href={`${slug}?page=${item}`}
                aria-current={current === item ? 'page' : undefined}
                className={'select-none ' + (current === item ? 'text-blue-400 font-bold' : '')}
              >
                {item}
              </Link>
            )
        })}
      </div>
      {current === total ? (
        <div className="flex gap-2 items-center text-gray-400 opacity-50 select-none justify-self-end">
          <span>Next</span> <ChevronRight />
        </div>
      ) : (
        <Link
          href={`${slug}?page=${current + 1}`}
          className="flex gap-2 items-center select-none justify-self-end"
        >
          <span>Next</span>
          <ChevronRight />
        </Link>
      )}
    </div>
  )
}

interface PaginationProps extends Pick<HTMLDivElement, 'className'> {
  current: number
  total: number
  slug: string
}

export default Pagination
