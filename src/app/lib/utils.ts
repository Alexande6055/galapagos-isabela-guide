import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const playAudio = (audioSrc: string) => {
  const audio = new Audio(audioSrc);
  audio.play();
};
