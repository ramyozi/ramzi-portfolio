import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Removes emoji and variation selectors from CMS-authored text. */
export function stripEmoji(text?: string | null): string {
  if (!text) return ''

  return text
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{20E3}\u{200D}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
