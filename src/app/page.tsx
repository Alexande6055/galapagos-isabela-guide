"use client"
import Image from "next/image";
import { useGuide } from "./hooks/useGuide";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Play, Pause, RotateCcw, Volume2, VolumeX, MapPin, Info, Map, Headphones, Sun, Moon, Home } from "lucide-react"
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { useEffect } from "react";
import { playAudio } from "./lib/utils";

export default function HomeScreen() {
  const {
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
    isDarkMode
  } = useGuide()

  const themeClasses = getThemeClasses()

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "h":
        case "H":
          setCurrentSection("home")
          break
        case "i":
        case "I":
          setCurrentSection("info")
          break
        case "e":
        case "E":
          setCurrentSection("explore")
          speakText("Explorar lugares")
          break
        case " ":
          event.preventDefault()
          if (currentSection === "audio") {
            togglePlayPause()
          }
          break
        case "r":
        case "R":
          if (currentSection === "audio") {
            repeatAudio()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, selectedLocation, isPlaying])

  // Actualizar la función renderExplore para usar la imagen del mapa real
  const renderExplore = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Explorar Lugares</h2>

      <Card className={`${getThemeClasses().card} mb-6`}>
        <CardContent className="p-6">
          <div className="relative bg-slate-700 rounded-lg p-4 mb-6">
            <h3 className={`${getThemeClasses().text} text-lg mb-4 text-center`}>Mapa Oficial de la Isla Isabela</h3>
            <div className="relative w-full">
              <img
                src="/images/isabela-map.png"
                alt="Mapa detallado de la Isla Isabela mostrando volcanes, bahías, puntos de interés y actividades disponibles"
                className="w-full h-auto rounded-lg border-2 border-blue-500/50"
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
              {/* Overlay con puntos interactivos */}
              <div className="absolute inset-0">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white hover:bg-red-400 focus:ring-2 focus:ring-blue-400 focus:outline-none animate-pulse"
                    style={{
                      left: `${location.coordinates.x}%`,
                      top: `${location.coordinates.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => handleLocationSelect(location)}
                    onFocus={() => speakText(`Ubicación: ${location.name}`)}
                    aria-label={`Seleccionar ${location.name}`}
                  >
                    <span className="sr-only">{location.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm text-center mt-4">
              Mapa oficial de la Isla Isabela - Haz clic en los puntos rojos para explorar cada ubicación
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`${getThemeClasses().card} ${getThemeClasses().cardHover} transition-colors`}
          >
            <CardHeader>
              <CardTitle className={`${getThemeClasses().text} flex items-center gap-2`}>
                <MapPin className="h-5 w-5" />
                {location.name}
              </CardTitle>
              <CardDescription className={getThemeClasses().textSecondary}>{location.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {location.image && (
                <img
                  src={location.image || "/placeholder.svg"}
                  alt={`Vista del ${location.name}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
              <div>
                <h4 className={`${getThemeClasses().text} font-medium mb-2`}>Características de accesibilidad:</h4>
                <div className="flex flex-wrap gap-2">
                  {location.accessibility.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`${isDarkMode ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"}`}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleLocationSelect(location)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onFocus={() => speakText(`Botón escuchar descripción de ${location.name}`)}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Escuchar descripción
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  // Agregar nueva función para renderizar la sección de aves
  const renderBirds = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className={`${getThemeClasses().text} text-3xl font-bold mb-6`}>Aves de la Isla Isabela</h2>
        <p className={`${getThemeClasses().textSecondary} text-lg max-w-2xl mx-auto`}>
          Descubre la increíble diversidad de aves que habitan en la Isla Isabela
        </p>
      </div>

      {/* Ave del día - similar al diseño de Merlin */}
      <Card
        className={`${getThemeClasses().card} ${isDarkMode ? "bg-gradient-to-br from-slate-800 to-slate-900" : "bg-gradient-to-br from-white to-gray-50"} overflow-hidden`}
      >
        <div className="relative">
          <img
            src={birdSpecies[0].image || "/placeholder.svg"}
            alt={`${birdSpecies[0].name} - Ave del día`}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">AVE DEL DÍA</p>
                <h3 className={`${getThemeClasses().text} text-2xl font-bold`}>{birdSpecies[0].name}</h3>
                <p className="text-gray-300 italic">{birdSpecies[0].scientificName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBirdSelect(birdSpecies[0])}
                className={`${getThemeClasses().text} hover:bg-white/20`}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Sección de identificación de aves */}
      <Card className={getThemeClasses().card}>
        <CardHeader className="text-center">
          <CardTitle className={`${getThemeClasses().text} text-xl`}>IDENTIFICAR UN AVE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 hover:bg-slate-600 transition-colors cursor-pointer">
                <span className="text-white text-2xl">?</span>
              </div>
              <p className="text-gray-300 text-sm">Paso a paso</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2 hover:bg-green-700 transition-colors cursor-pointer">
                <Volume2 className="h-6 w-6 text-white" />
              </div>
              <p className="text-green-400 text-sm font-medium">Audio ID</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 hover:bg-slate-600 transition-colors cursor-pointer">
                <span className="text-white text-xl">📷</span>
              </div>
              <p className="text-gray-300 text-sm">Foto ID</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
              onClick={() => speakText("Función de grabaciones de audio disponible próximamente")}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Mis grabaciones de audio
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de aves */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {birdSpecies.map((bird) => (
          <Card key={bird.id} className={`${getThemeClasses().card} ${getThemeClasses().cardHover} transition-colors`}>
            <div className="relative">
              <img
                src={bird.image || "/placeholder.svg"}
                alt={bird.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h3 className={`${getThemeClasses().text} font-bold text-lg mb-1`}>{bird.name}</h3>
              <p className="text-gray-400 italic text-sm mb-2">{bird.scientificName}</p>
              <p className="text-gray-300 text-sm mb-3">{bird.description}</p>

              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-blue-400 text-xs font-medium">HÁBITAT:</span>
                  <p className="text-gray-300 text-xs">{bird.habitat}</p>
                </div>
                <div>
                  <span className="text-green-400 text-xs font-medium">MEJOR MOMENTO:</span>
                  <p className="text-gray-300 text-xs">{bird.bestTime}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleBirdSelect(bird)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onFocus={() => speakText(`Botón escuchar información de ${bird.name}`)}
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  Escuchar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                  onClick={() => playAudio(bird.sound)}
                >
                  🎵
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Información del ave seleccionada */}
      {selectedBird && (
        <Card className={getThemeClasses().card}>
          <CardHeader>
            <CardTitle className={`${getThemeClasses().text} flex items-center gap-2`}>
              <Headphones className="h-5 w-5" />
              {selectedBird.name}
            </CardTitle>
            <CardDescription className={getThemeClasses().textSecondary}>{selectedBird.scientificName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`${getThemeClasses().overlay} p-4 rounded-lg`}>
              <p className={`${getThemeClasses().text} leading-relaxed`}>{selectedBird.audioDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className={`${getThemeClasses().text} font-medium mb-2`}>Información adicional:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    <strong>Hábitat:</strong> {selectedBird.habitat}
                  </li>
                  <li>
                    <strong>Mejor momento para observar:</strong> {selectedBird.bestTime}
                  </li>
                  <li>
                    <strong>Sonido:</strong> {selectedBird.sound}
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => speakText(selectedBird.audioDescription)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Reproducir descripción
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className={`text-4xl md:text-6xl font-bold ${getThemeClasses().text} mb-4`}>Guía Turística Accesible</h1>
        <h2 className={`text-2xl md:text-3xl ${isDarkMode ? "text-blue-200" : "text-blue-600"} mb-8`}>Isla Isabela</h2>
        <p className={`text-lg ${getThemeClasses().textSecondary} max-w-2xl mx-auto`}>
          Descubre los lugares más hermosos de la Isla Isabela con nuestra guía completamente accesible
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        <Card className={`${getThemeClasses().card} ${getThemeClasses().cardHover} transition-colors`}>
          <CardHeader>
            <CardTitle className={`${getThemeClasses().text} flex items-center gap-2`}>
              <Volume2 className="h-5 w-5" />
              Iniciar Recorrido
            </CardTitle>
            <CardDescription className={getThemeClasses().textSecondary}>
              Comienza tu experiencia auditiva por la Isla Isabela
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setCurrentSection("explore")}
              className="w-full bg-blue-600 hover:bg-blue-700"
              onFocus={() => speakText("Botón iniciar recorrido")}
            >
              Comenzar Exploración
            </Button>
          </CardContent>
        </Card>
        <Card className={`${getThemeClasses().card} ${getThemeClasses().cardHover} transition-colors`}>
          <CardHeader>
            <CardTitle className={`${getThemeClasses().text} flex items-center gap-2`}>
              <Headphones className="h-5 w-5" />
              Explorar Aves
            </CardTitle>
            <CardDescription className={getThemeClasses().textSecondary}>
              Descubre la diversidad de aves en la Isla Isabela
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setCurrentSection("birds")}
              className="w-full bg-green-600 hover:bg-green-700"
              onFocus={() => speakText("Botón explorar aves")}
            >
              Ver Aves
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderInfo = () => (
    <div className="space-y-6">
      <h2 className={`${getThemeClasses().text} text-3xl font-bold mb-6`}>Información General</h2>
      <p className={`${getThemeClasses().textSecondary} text-lg max-w-2xl mx-auto`}>
        Galápagos es un archipiélago ubicado en el Pacífico Sur de Ecuador, conocido por su biodiversidad única y su
        papel en la teoría de la evolución.
      </p>
    </div>
  )

  const renderAudioTour = () => (
    <div className="space-y-6">
      <h2 className={`${getThemeClasses().text} text-3xl font-bold mb-6`}>Audio Tour</h2>
      <p className={`${getThemeClasses().textSecondary} text-lg max-w-2xl mx-auto`}>
        Disfruta de una guía auditiva de las Islas Galápagos.
      </p>
      {selectedLocation && (
        <div className="space-y-4">
          <div className={`${getThemeClasses().overlay} p-4 rounded-lg`}>
            <p className={`${getThemeClasses().text} leading-relaxed`}>{selectedLocation.audioDescription}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={togglePlayPause} className="bg-blue-600 hover:bg-blue-700">
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? "Detener" : "Reproducir"}
            </Button>
            <Button onClick={repeatAudio} className="bg-green-600 hover:bg-green-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Repetir
            </Button>
            <Button onClick={toggleMute} className="bg-red-600 hover:bg-red-700">
              {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
              {isMuted ? "Desactivar silencio" : "Activar silencio"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className={`min-h-screen ${getThemeClasses().background}`}>
      {/* Navigation */}
      <nav
        className={`${getThemeClasses().nav} backdrop-blur-sm border-b ${getThemeClasses().border} sticky top-0 z-50`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex gap-2 md:gap-4">
              <Button
                variant={currentSection === "home" ? "default" : "ghost"}
                onClick={() => setCurrentSection("home")}
                className={`${getThemeClasses().text} hover:bg-slate-700`}
                onFocus={() => speakText("Navegación: Inicio")}
              >
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Inicio</span>
              </Button>
              <Button
                variant={currentSection === "info" ? "default" : "ghost"}
                onClick={() => setCurrentSection("info")}
                className={`${getThemeClasses().text} hover:bg-slate-700`}
                onFocus={() => speakText("Navegación: Información")}
              >
                <Info className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Información</span>
              </Button>
              <Button
                variant={currentSection === "explore" ? "default" : "ghost"}
                onClick={() => setCurrentSection("explore")}
                className={`${getThemeClasses().text} hover:bg-slate-700`}
                onFocus={() => speakText("Navegación: Explorar")}
              >
                <Map className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Explorar</span>
              </Button>
              {selectedLocation && (
                <Button
                  variant={currentSection === "audio" ? "default" : "ghost"}
                  onClick={() => setCurrentSection("audio")}
                  className={`${getThemeClasses().text} hover:bg-slate-700`}
                  onFocus={() => speakText("Navegación: Audio Tour")}
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Audio Tour</span>
                </Button>
              )}
              {/* En la sección de navegación, agregar: */}
              <Button
                variant={currentSection === "birds" ? "default" : "ghost"}
                onClick={() => setCurrentSection("birds")}
                className={`${getThemeClasses().text} hover:bg-slate-700`}
                onFocus={() => speakText("Navegación: Aves")}
              >
                <span className="text-lg mr-2">🦅</span>
                <span className="hidden sm:inline">Aves</span>
              </Button>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className={`${getThemeClasses().text} hover:bg-slate-700 ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}
                onFocus={() => speakText("Botón cambiar tema")}
                aria-label={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden sm:inline ml-2">{isDarkMode ? "Claro" : "Oscuro"}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentSection === "home" && renderHome()}
        {currentSection === "info" && renderInfo()}
        {currentSection === "explore" && renderExplore()}
        {currentSection === "audio" && renderAudioTour()}
        {/* En el main content, agregar: */}
        {currentSection === "birds" && renderBirds()}
      </main>

      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {currentSection === "home" && "Página de inicio cargada"}
        {currentSection === "info" && "Página de información cargada"}
        {currentSection === "explore" && "Página de exploración cargada"}
        {currentSection === "audio" && "Modo audio tour activado"}
        {/* Actualizar los anuncios para lectores de pantalla: */}
        {currentSection === "birds" && "Página de aves cargada"}
      </div>
    </div>
  )
}
