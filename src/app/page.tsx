"use client"
import { useGuide } from "./hooks/useGuide";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Play, Pause, RotateCcw, Volume2, VolumeX, MapPin, Info, Map, Headphones, Sun, Moon, Home } from "lucide-react"
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import BirdsSection from "./components/BirdsSection";
import { useEffect } from "react";

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

  const renderExplore = () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">Explorar Lugares</h2>

      <Card className={`${getThemeClasses().card} mb-8 shadow-xl border border-blue-600/40 hover:shadow-2xl transition-shadow`}>
        <CardContent className="p-6">
          <div className="relative bg-slate-800 rounded-2xl p-6 mb-8 shadow-lg border border-blue-500/70">
            <h3 className={`${getThemeClasses().text} text-xl font-semibold mb-6 text-center tracking-wide`}>
              Mapa Oficial de la Isla Isabela
            </h3>
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg border-4 border-blue-600/60">
              <img
                src="/images/isabela-map.png"
                alt="Mapa detallado de la Isla Isabela mostrando volcanes, bahías, puntos de interés y actividades disponibles"
                className="w-full h-auto object-contain"
                style={{ maxHeight: "520px" }}
              />
              <div className="absolute inset-0">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    className="absolute w-5 h-5 bg-red-600 rounded-full border-2 border-white hover:bg-red-500 focus:ring-4 focus:ring-red-400 focus:outline-none animate-pulse"
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
            <p className="text-blue-200 text-center mt-6 italic tracking-wide select-none">
              Mapa oficial de la Isla Isabela - Haz clic en los puntos rojos para explorar cada ubicación
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`${getThemeClasses().card} ${getThemeClasses().cardHover} transition-transform duration-300 hover:scale-[1.03] shadow-lg`}
          >
            <CardHeader>
              <CardTitle className={`${getThemeClasses().text} flex items-center gap-3 font-semibold text-lg`}>
                <MapPin className="h-6 w-6 text-blue-500" />
                {location.name}
              </CardTitle>
              <CardDescription className={`${getThemeClasses().textSecondary} text-sm font-light`}>
                {location.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {location.image && (
                <img
                  src={location.image || "/placeholder.svg"}
                  alt={`Vista del ${location.name}`}
                  className="w-full h-40 object-cover rounded-xl shadow-md border border-gray-600"
                />
              )}
              <div>
                <h4 className={`${getThemeClasses().text} font-semibold mb-3`}>Características de accesibilidad:</h4>
                <div className="flex flex-wrap gap-3">
                  {location.accessibility.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`${isDarkMode ? "bg-blue-900/70 text-blue-300" : "bg-blue-200 text-blue-900"} px-3 py-1 rounded-full font-medium text-sm`}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleLocationSelect(location)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md transition-all"
                  onFocus={() => speakText(`Botón escuchar descripción de ${location.name}`)}
                >
                  <Volume2 className="h-5 w-5 mr-3" />
                  Escuchar descripción
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="space-y-10">
      <div className="text-center space-y-6">
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-tight ${getThemeClasses().text} drop-shadow-lg`}>
          Guía Turística Accesible
        </h1>
        <h2 className={`text-3xl md:text-4xl font-semibold ${isDarkMode ? "text-blue-300" : "text-blue-700"} tracking-wide`}>
          Isla Isabela
        </h2>
        <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${getThemeClasses().textSecondary} tracking-wide`}>
          Descubre los lugares más hermosos de la Isla Isabela con nuestra guía completamente accesible
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className={`${getThemeClasses().card} ${getThemeClasses().cardHover} transition-transform hover:scale-[1.05] shadow-lg`}>
          <CardHeader>
            <CardTitle className={`${getThemeClasses().text} flex items-center gap-3 font-semibold text-xl`}>
              <Volume2 className="h-6 w-6" />
              Iniciar Recorrido
            </CardTitle>
            <CardDescription className={`${getThemeClasses().textSecondary} text-base font-light`}>
              Comienza tu experiencia auditiva por la Isla Isabela
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setCurrentSection("explore")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg text-lg font-semibold py-3"
              onFocus={() => speakText("Botón iniciar recorrido")}
            >
              Comenzar Exploración
            </Button>
          </CardContent>
        </Card>
        <Card className={`${getThemeClasses().card} ${getThemeClasses().cardHover} transition-transform hover:scale-[1.05] shadow-lg`}>
          <CardHeader>
            <CardTitle className={`${getThemeClasses().text} flex items-center gap-3 font-semibold text-xl`}>
              <Headphones className="h-6 w-6" />
              Explorar Aves
            </CardTitle>
            <CardDescription className={`${getThemeClasses().textSecondary} text-base font-light`}>
              Descubre la diversidad de aves en la Isla Isabela
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setCurrentSection("birds")}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg text-lg font-semibold py-3"
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
    <div className="space-y-10 max-w-4xl mx-auto">
      <h2 className={`${getThemeClasses().text} text-4xl font-extrabold mb-8 tracking-wide drop-shadow-md`}>Información General</h2>
      <div className={`${getThemeClasses().textSecondary} text-lg leading-relaxed space-y-6`}>
        <p>
          Las Islas Galápagos, ubicadas en el Océano Pacífico a unos 1000 km de la costa de Ecuador, son un archipiélago reconocido mundialmente por su biodiversidad única y su importancia en el desarrollo de la teoría de la evolución de Charles Darwin.
        </p>
        <p>
          Isla Isabela es la más grande del archipiélago y ofrece una combinación excepcional de ecosistemas, incluyendo volcanes activos, playas vírgenes y una increíble variedad de flora y fauna. Esta isla es hogar de especies emblemáticas como la tortuga gigante, pingüinos de Galápagos y una gran diversidad de aves endémicas.
        </p>
        <p>
          Nuestra guía turística inclusiva está especialmente diseñada para personas no videntes y con otras discapacidades visuales, proporcionando descripciones auditivas detalladas, navegación por teclado y contenido accesible para que todos puedan disfrutar y conocer la riqueza natural y cultural de Isla Isabela.
        </p>
        <p>
          Te invitamos a explorar sus paisajes, aprender sobre su historia, y descubrir los secretos de este paraíso ecológico, con la tranquilidad de contar con una experiencia accesible y enriquecedora.
        </p>
      </div>
    </div>
  )

  const renderAudioTour = () => (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h2 className={`${getThemeClasses().text} text-4xl font-extrabold mb-8 tracking-wide drop-shadow-md`}>Audio Tour</h2>
      <p className={`${getThemeClasses().textSecondary} text-lg leading-relaxed mb-6`}>
        Disfruta de una guía auditiva de las Islas Galápagos.
      </p>
      {selectedLocation && (
        <div className="space-y-6">
          <div className={`${getThemeClasses().overlay} p-6 rounded-2xl shadow-lg border border-blue-500`}>
            <p className={`${getThemeClasses().text} text-lg leading-relaxed`}>{selectedLocation.audioDescription}</p>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={togglePlayPause} className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md px-6 py-3 text-lg font-semibold">
              {isPlaying ? <Pause className="h-5 w-5 mr-3" /> : <Play className="h-5 w-5 mr-3" />}
              {isPlaying ? "Detener" : "Reproducir"}
            </Button>
            <Button onClick={repeatAudio} className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md px-6 py-3 text-lg font-semibold">
              <RotateCcw className="h-5 w-5 mr-3" />
              Repetir
            </Button>
            <Button onClick={toggleMute} className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-md px-6 py-3 text-lg font-semibold">
              {isMuted ? <VolumeX className="h-5 w-5 mr-3" /> : <Volume2 className="h-5 w-5 mr-3" />}
              {isMuted ? "Desactivar silencio" : "Activar silencio"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
  useEffect(() => {
    if (currentSection === "info") {
      const infoText = `
        Las Islas Galápagos, ubicadas en el Océano Pacífico a unos 1000 km de la costa de Ecuador, 
        son un archipiélago reconocido mundialmente por su biodiversidad única y su importancia en 
        el desarrollo de la teoría de la evolución de Charles Darwin. Isla Isabela es la más grande 
        del archipiélago y ofrece una combinación excepcional de ecosistemas, incluyendo volcanes 
        activos, playas vírgenes y una increíble variedad de flora y fauna. Esta isla es hogar de 
        especies emblemáticas como la tortuga gigante, pingüinos de Galápagos y una gran diversidad 
        de aves endémicas. Nuestra guía turística inclusiva está especialmente diseñada para personas 
        no videntes y con otras discapacidades visuales, proporcionando descripciones auditivas detalladas, 
        navegación por teclado y contenido accesible para que todos puedan disfrutar y conocer la riqueza 
        natural y cultural de Isla Isabela. Te invitamos a explorar sus paisajes, aprender sobre su historia, 
        y descubrir los secretos de este paraíso ecológico, con la tranquilidad de contar con una experiencia 
        accesible y enriquecedora.
      `
      speakText(infoText.trim())
    }
  }, [currentSection])

  return (
    <div className={`min-h-screen ${getThemeClasses().background} transition-colors duration-500`}>
      {/* Navigation */}
      <nav
        className={`${getThemeClasses().nav} backdrop-blur-lg border-b border-blue-600/40 sticky top-0 z-50 shadow-md`}
      >
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-center">
            <div className="flex gap-4 md:gap-6">
              <Button
                variant={currentSection === "home" ? "default" : "ghost"}
                onClick={() => setCurrentSection("home")}
                className={`${getThemeClasses().text} hover:bg-blue-700 rounded-lg shadow-lg transition`}
                onFocus={() => speakText("Navegación: Inicio")}
              >
                <Home className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline font-semibold">Inicio</span>
              </Button>
              <Button
                variant={currentSection === "info" ? "default" : "ghost"}
                onClick={() => setCurrentSection("info")}
                className={`${getThemeClasses().text} hover:bg-blue-700 rounded-lg shadow-lg transition`}
                onFocus={() => speakText("Navegación: Información")}
              >
                <Info className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline font-semibold">Información</span>
              </Button>
              <Button
                variant={currentSection === "explore" ? "default" : "ghost"}
                onClick={() => setCurrentSection("explore")}
                className={`${getThemeClasses().text} hover:bg-blue-700 rounded-lg shadow-lg transition`}
                onFocus={() => speakText("Navegación: Explorar")}
              >
                <Map className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline font-semibold">Explorar</span>
              </Button>
              {selectedLocation && (
                <Button
                  variant={currentSection === "audio" ? "default" : "ghost"}
                  onClick={() => setCurrentSection("audio")}
                  className={`${getThemeClasses().text} hover:bg-blue-700 rounded-lg shadow-lg transition`}
                  onFocus={() => speakText("Navegación: Audio Tour")}
                >
                  <Headphones className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline font-semibold">Audio Tour</span>
                </Button>
              )}
              <Button
                variant={currentSection === "birds" ? "default" : "ghost"}
                onClick={() => setCurrentSection("birds")}
                className={`${getThemeClasses().text} hover:bg-blue-700 rounded-lg shadow-lg transition`}
                onFocus={() => speakText("Navegación: Aves")}
              >
                <span className="text-lg mr-2">🦅</span>
                <span className="hidden sm:inline font-semibold">Aves</span>
              </Button>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                aria-label="Cambiar tema claro/oscuro"
                className={`${getThemeClasses().text} hover:bg-blue-700 rounded-lg shadow-lg transition flex items-center justify-center`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-6 py-10">
        {currentSection === "home" && renderHome()}
        {currentSection === "info" && renderInfo()}
        {currentSection === "explore" && renderExplore()}
        {currentSection === "audio" && renderAudioTour()}
        {currentSection === "birds" &&
          <BirdsSection
            birdSpecies={birdSpecies}
            selectedBird={selectedBird}
            handleBirdSelect={handleBirdSelect}
            speakText={speakText}
            getThemeClasses={getThemeClasses}
            isDarkMode={isDarkMode}
          />}
      </main>
    </div>
  )
}
