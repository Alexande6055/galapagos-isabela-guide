import { useState, useRef, useEffect } from "react"
import { AudioLocation, BirdSpecies } from "../types"
import { locations, birdSpecies } from "../data"

export const useGuide = () => {
  const [currentSection, setCurrentSection] = useState<"home" | "info" | "explore" | "audio" | "birds">("home")
  const [selectedLocation, setSelectedLocation] = useState<AudioLocation | null>(null)
  const [selectedBird, setSelectedBird] = useState<BirdSpecies | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [autoDescriptionEnabled, setAutoDescriptionEnabled] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)

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

  // Función para detener la síntesis de voz
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
        background: "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
        nav: "bg-slate-800/80",
        card: "bg-slate-800/50 border-slate-700",
        cardHover: "hover:bg-slate-700/50",
        text: "text-white",
        textSecondary: "text-gray-300",
        textMuted: "text-gray-400",
        border: "border-slate-700",
        button: "bg-blue-600 hover:bg-blue-700",
        overlay: "bg-slate-700/50",
      }
    } else {
      return {
        background: "bg-gradient-to-br from-blue-50 via-white to-blue-100",
        nav: "bg-white/90 border-gray-200",
        card: "bg-white/80 border-gray-200 shadow-lg",
        cardHover: "hover:bg-gray-50",
        text: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        border: "border-gray-200",
        button: "bg-blue-500 hover:bg-blue-600",
        overlay: "bg-gray-100/50",
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
    speakText: (text: string) => {
      if ("speechSynthesis" in window && autoDescriptionEnabled) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "es-ES"
        utterance.rate = 0.8
        window.speechSynthesis.speak(utterance)
      }
    },
    stopSpeaking: () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    },
    isDarkMode
  }
}
