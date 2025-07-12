import { AudioLocation, BirdSpecies } from "./types"

export const locations: AudioLocation[] = [
  {
    id: "centro-interpretacion",
    name: "Centro de Interpretación",
    description: "Centro educativo sobre la flora y fauna de Galápagos",
    audioDescription:
      "Bienvenido al Centro de Interpretación de la Isla Isabela. Este lugar te permitirá conocer la historia natural y cultural de las Islas Galápagos. Cuenta con exhibiciones interactivas, senderos accesibles y guías especializados.",
    coordinates: { x: 30, y: 40 },
    accessibility: ["Rampa de acceso", "Baños adaptados", "Guías especializados", "Señalización táctil"],
    type: "location",
  },
  {
    id: "playa-amor",
    name: "Playa del Amor",
    description: "Hermosa playa con arena blanca y aguas cristalinas",
    audioDescription:
      "Estás cerca de la Playa del Amor, una de las playas más hermosas de la Isla Isabela. Sus aguas cristalinas y arena blanca la convierten en un lugar perfecto para relajarse. Aquí podrás observar iguanas marinas, lobos marinos y diversas aves costeras.",
    coordinates: { x: 60, y: 70 },
    accessibility: ["Sendero adaptado", "Área de descanso", "Información en braille", "Guía audio disponible"],
    type: "location",
  },
  {
    id: "centro-crianza",
    name: "Centro de Crianza de Tortugas",
    description: "Centro dedicado a la conservación y reproducción de tortugas gigantes",
    audioDescription:
      "Te encuentras en el Centro de Crianza de Tortugas Gigantes, un lugar fundamental para la conservación de estas especies emblemáticas de Galápagos. Aquí podrás conocer sobre los programas de reproducción y conservación que han salvado a varias especies de la extinción.",
    coordinates: { x: 45, y: 55 },
    accessibility: ["Senderos pavimentados", "Información táctil", "Guías especializados", "Área de descanso"],
    type: "location",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export const birdSpecies: BirdSpecies[] = [
  {
    id: "flamenco-americano",
    name: "Flamenco Americano",
    scientificName: "Phoenicopterus ruber",
    description: "Ave emblemática de las lagunas saladas de Isabela",
    audioDescription:
      "El Flamenco Americano es una de las aves más espectaculares de Galápagos. Su distintivo color rosado proviene de los carotenoides en su dieta. Pueden medir hasta 1.5 metros de altura y se alimentan filtrando pequeños organismos del agua salada.",
    habitat: "Lagunas saladas, manglares",
    bestTime: "Todo el año, especialmente temprano en la mañana",
    image: "/images/flamenco-americano.png",
    sound: "Sonido característico: graznidos nasales y trompeteos",
  },
  {
    id: "pinzon-darwin",
    name: "Pinzón de Darwin",
    scientificName: "Geospiza fortis",
    description: "Pequeña ave fundamental para la teoría de la evolución",
    audioDescription:
      "Los Pinzones de Darwin son fundamentales para entender la evolución. Cada especie ha desarrollado un pico diferente según su alimentación. Esta especie tiene un pico mediano que le permite comer tanto semillas como insectos.",
    habitat: "Zonas áridas, bosques secos",
    bestTime: "Mañanas y tardes",
    image: "/placeholder.svg?height=300&width=400",
    sound: "Sonido característico: trinos melodiosos y llamadas cortas",
  },
  {
    id: "cormorant-no-volador",
    name: "Cormorán No Volador",
    scientificName: "Phalacrocorax harrisi",
    description: "Única ave marina que perdió la capacidad de volar",
    audioDescription:
      "El Cormorán No Volador es único en el mundo. Evolucionó perdiendo la capacidad de volar debido a la ausencia de depredadores terrestres. Sus alas se redujeron pero desarrolló extraordinarias habilidades de buceo para pescar.",
    habitat: "Costas rocosas, aguas poco profundas",
    bestTime: "Todo el día, especialmente durante la marea baja",
    image: "/placeholder.svg?height=300&width=400",
    sound: "Sonido característico: gruñidos guturales y silbidos",
  },
]
