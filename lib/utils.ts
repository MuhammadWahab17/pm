import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the Sunday of the current week
 */
export function getCurrentWeekSunday(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, etc.
  const daysUntilSunday = dayOfWeek === 0 ? 0 : -dayOfWeek
  const sunday = new Date(today)
  sunday.setDate(today.getDate() + daysUntilSunday)
  sunday.setHours(0, 0, 0, 0)
  return sunday
}

/**
 * Get the Saturday of the current week
 */
export function getCurrentWeekSaturday(): Date {
  const sunday = getCurrentWeekSunday()
  const saturday = new Date(sunday)
  saturday.setDate(sunday.getDate() + 6)
  saturday.setHours(23, 59, 59, 999)
  return saturday
}
