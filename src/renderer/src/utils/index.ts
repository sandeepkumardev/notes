import clsx, { ClassValue } from 'clsx'
import { truncate } from 'lodash'
import { twMerge } from 'tailwind-merge'

const dateFormatter = new Intl.DateTimeFormat(window?.context?.locale, {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export const truncateTitle = (title: string | undefined) =>
  truncate(title, {
    length: 38,
    separator: ' '
  })
