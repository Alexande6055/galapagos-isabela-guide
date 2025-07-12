import { AudioLocation, BirdSpecies } from "./types"

export const locations: AudioLocation[] = [
  {
    id: "centro-interpretacion",
    name: "Centro de Interpretación",
    description: "Centro educativo sobre la flora y fauna de Galápagos",
    audioDescription:
      "Bienvenido al Centro de Interpretación de la Isla Isabela. Aquí aprenderás sobre la historia natural y cultural de Galápagos a través de exhibiciones interactivas y accesibles. El centro cuenta con senderos adaptados, guías especializados y señalización táctil para facilitar la visita y el aprendizaje.",
    coordinates: { x: 30, y: 40 },
    accessibility: ["Rampa de acceso", "Baños adaptados", "Guías especializados", "Señalización táctil"],
    type: "location",
    image: "https://img.goraymi.com/2020/12/16/6dfb84125b8f21def3146f1bc4d75be8_xl.jpg"
  },
  {
    id: "playa-amor",
    name: "Playa del Amor",
    description: "Hermosa playa con arena blanca y aguas cristalinas",
    audioDescription:
      "Estás en Playa del Amor, una hermosa playa con arena blanca y aguas cristalinas. Este lugar es ideal para relajarse y escuchar el sonido del mar. Aquí podrás oír iguanas marinas, lobos marinos y diversas aves costeras. La playa cuenta con senderos adaptados y áreas de descanso, además de información accesible en braille.",
    coordinates: { x: 60, y: 70 },
    accessibility: ["Sendero adaptado", "Área de descanso", "Información en braille", "Guía audio disponible"],
    type: "location",
    image: "https://galapagosferry.com.ec/wp-content/uploads/2022/08/places-to-visit-playa-del-amor-01-1080x675.jpg"
  },
  {
    id: "centro-crianza",
    name: "Centro de Crianza de Tortugas",
    description: "Centro dedicado a la conservación y reproducción de tortugas gigantes en peligro de extinción en la isla Isabela.",
    audioDescription: `
      Estás en el Centro de Crianza de Tortugas Gigantes de la isla Isabela. Aquí se cuidan y reproducen 
      tortugas en peligro de extinción para ayudar a recuperar su población natural. Podrás escuchar a las
      tortugas en sus corrales y aprender sobre su alimentación y hábitat. El centro alberga más de 300 
      tortugas de diferentes edades y especies. Está ubicado a 1.5 kilómetros de Puerto Villamil y es 
      accesible por un sendero. Además, podrás percibir la diversidad del ecosistema seco que las rodea, 
      con plantas como manglares y el manzanillo, cuyas bayas solo ellas pueden digerir sin daño. Este 
      lugar es fundamental para la conservación de Galápagos.
     `

    ,
    coordinates: { x: 45, y: 55 },
    accessibility: ["Senderos pavimentados", "Información táctil", "Guías especializados", "Área de descanso"],
    type: "location",
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*yxja2p6I24KlO6Rc.jpg?height=200&width=300",
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
    sound: "/audios/flamingos.mp3",
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
    image: "https://picturebirdai.com/wiki-image/1080/153762861485654029.jpeg",
    sound: "/audios/pinzon.mp3",
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
    image: "https://www.metropolitan-touring.com/wp-content/uploads/2022/09/galapagos-flightless-cormorant.jpg",
    sound: "/audios/cormorant.mp3",
  },
]
