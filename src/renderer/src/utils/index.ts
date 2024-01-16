import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// console.log(window?.context?.locale)

const dateFormatter = new Intl.DateTimeFormat('en-us', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
