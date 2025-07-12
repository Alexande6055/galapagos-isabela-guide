import { useState, useRef } from "react"
import { AudioLocation, BirdSpecies } from "../types"
import { locations, birdSpecies } from "../data"
export interface Bird {
  id: string
  name: string
  scientificName: string
  description: string
  habitat: string
  bestTime: string
  image?: string
  sound?: string
  audioDescription: string
}
export const useGuide = () => {
  const [currentSection, setCurrentSection] = useState<"home" | "info" | "explore" | "audio" | "birds">("home")
  const [selectedLocation, setSelectedLocation] = useState<AudioLocation | null>(null)
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [autoDescriptionEnabled, setAutoDescriptionEnabled] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Cambiar el modo oscuro a false por defecto
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Función para leer texto con Web Speech API
  const speakText = (text: string) => {
    if ("speechSynthesis" in window && autoDescriptionEnabled) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
  }

  const handleLocationSelect = (location: AudioLocation) => {
    setSelectedLocation(location)
    setCurrentSection("audio")
    speakText(`Seleccionaste ${location.name}. ${location.audioDescription}`)
  }

  const handleBirdSelect = (bird: BirdSpecies) => {
    setSelectedBird(bird)
    speakText(`Ave seleccionada: ${bird.name}. ${bird.audioDescription}`)
  }

  const togglePlayPause = () => {
    if (selectedLocation) {
      if (isPlaying) {
        stopSpeaking()
        setIsPlaying(false)
      } else {
        speakText(selectedLocation.audioDescription)
        setIsPlaying(true)
      }
    }
  }

  const repeatAudio = () => {
    if (selectedLocation) {
      stopSpeaking()
      setTimeout(() => {
        speakText(selectedLocation.audioDescription)
        setIsPlaying(true)
      }, 100)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      stopSpeaking()
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    speakText(isDarkMode ? "Cambiando a tema claro" : "Cambiando a tema oscuro")
  }
  const getThemeClasses = () => {
    if (isDarkMode) {
      return {
        background: "bg-gradient-to-br from-[#004D40] via-[#002F2F] to-[#001A1A]",
        nav: "bg-[#002F2F]/80 border-[#004D40]",
        card: "bg-[#002F2F]/90 border-[#004D40] shadow-md rounded-lg",
        cardHover: "hover:bg-[#004D40]/90",
        text: "text-[#E0F2F1]",
        textSecondary: "text-[#4DB6AC]",
        textMuted: "text-[#80CBC4]",
        border: "border-[#004D40]",
        button: "bg-[#4DB6AC] hover:bg-[#00796B]",
        overlay: "bg-[#002F2F]/50",
      }
    } else {
      return {
        background: "bg-gradient-to-br from-[#E3F2FD] via-[#FFFFFF] to-[#F1F8E9]",
        nav: "bg-white/90 border-[#B0BEC5]",
        card: "bg-white/90 border-[#B0BEC5] shadow-md rounded-lg",
        cardHover: "hover:bg-[#E0F7FA]",
        text: "text-[#1A237E]",
        textSecondary: "text-[#5C6BC0]",
        textMuted: "text-[#90A4AE]",
        border: "border-[#B0BEC5]",
        button: "bg-[#26A69A] hover:bg-[#00796B]",
        overlay: "bg-[#B2DFDB]/50",
      }
    }
  }


  return {
    currentSection,
    setCurrentSection,
    selectedLocation,
    selectedBird,
    isPlaying,
    isMuted,
    autoDescriptionEnabled,
    locations,
    birdSpecies,
    handleLocationSelect,
    handleBirdSelect,
    togglePlayPause,
    repeatAudio,
    toggleMute,
    toggleTheme,
    getThemeClasses,
    speakText,
    stopSpeaking,
    isDarkMode,
  }
}
