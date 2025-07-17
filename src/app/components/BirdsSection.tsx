"use client"
import React from "react"
import { Volume2, Headphones, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { playAudio } from "../lib/utils"
import { Bird } from "../hooks/useGuide"
import { BirdSpecies } from "../types"
import { motion, AnimatePresence } from "framer-motion"


interface BirdsSectionProps {
    birdSpecies: BirdSpecies[]
    selectedBird: Bird | null
    handleBirdSelect: (bird: BirdSpecies) => void
    speakText: (text: string) => void
    getThemeClasses: () => any
    isDarkMode: boolean
}

export default function BirdsSection({
    birdSpecies,
    selectedBird,
    handleBirdSelect,
    speakText,
    getThemeClasses,
    isDarkMode,
}: BirdsSectionProps) {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-4">
                <h2 className={`${getThemeClasses().text} text-3xl font-bold mb-6`}>Aves de la Isla Isabela</h2>
                <p className={`${getThemeClasses().textSecondary} text-lg max-w-2xl mx-auto`}>
                    Descubre la increíble diversidad de aves que habitan en la Isla Isabela
                </p>
            </div>

            {/* Lista de aves */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {birdSpecies.map((bird) => (
                    <Card key={bird.id} className={`${getThemeClasses().card} ${getThemeClasses().cardHover}  transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
                        <div className="relative w-full aspect-[4/3]">
                            <img
                                src={bird.image || "/placeholder.svg"}
                                alt={bird.name}
                                className="object-contain w-full h-full"
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
                                    onClick={() => playAudio(bird.sound || "")}
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
                <motion.div
                    key={selectedBird.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                >

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
                                        onClick={() => speakText(selectedBird.audioDescription || "")}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        Escuchar descripción
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )
            }
        </div >
    )
}
