import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Required by shadcn/ui — do not delete or rename.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
