import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSemaforoColor(score: number): 'verde' | 'ambar' | 'rojo' {
  if (score <= 30) return 'verde'
  if (score <= 60) return 'ambar'
  return 'rojo'
}

export function getSemaforoLabel(score: number): string {
  if (score <= 30) return 'Verde'
  if (score <= 60) return 'Ámbar'
  return 'Rojo'
}

export function getSemaforoHex(score: number): string {
  if (score <= 30) return '#107C41'
  if (score <= 60) return '#D46B08'
  return '#C03A2B'
}

export function formatScore(score: number): string {
  return score.toFixed(0)
}
