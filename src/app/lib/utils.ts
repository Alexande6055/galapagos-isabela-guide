import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let currentAudio: HTMLAudioElement | null = null

export const playAudio = (url: string) => {
  if (!url) return

  // Detener cualquier voz hablada en curso
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel()
  }

  // Detener audio actual si existe
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
  }

  // Crear nuevo audio y reproducir
  currentAudio = new Audio(url)
  currentAudio.play()

  // Limpiar cuando termine
  currentAudio.onended = () => {
    currentAudio = null
  }
}
