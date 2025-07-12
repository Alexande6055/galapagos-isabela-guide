import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Guía Turística Inclusiva de Isabela, Galápagos',
  description: 'Explora Isabela, Galápagos, con nuestra guía turística inclusiva, diseñada para personas no videntes. Información accesible, rutas, actividades y más.',
  keywords: [
    'Guía turística',
    'Isabela',
    'Galápagos',
    'turismo inclusivo',
    'accesibilidad',
    'personas no videntes',
    'Ecuador',
    'viajes',
    'turismo accesible'
  ],
  icons: {
    icon: '/favicon.ico',
  },
  authors: [{ name: 'Alexander Tasinchano Tite', url: 'https://portafolio-web-sable-eight.vercel.app/' }, { name: 'Alexander Tasinchano Tite', url: 'https://www.linkedin.com/in/alexander-tasinchano-tite-b75088274/' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Guía Inclusiva de Isabela, Galápagos',
    description: 'Guía de turismo accesible en Isabela, Galápagos, pensada para personas no videntes y todos los viajeros.',
    url: 'https://isabelaturismoaccesible.pages.dev',
    siteName: 'Guía Isabela Galápagos',
    images: [
      {
        url: '/images/turismo.png',
        width: 1200,
        height: 630,
        alt: 'Vista panorámica de Isabela, Galápagos',
      },
    ],
    locale: 'es_EC',
    type: 'article',
    publishedTime: '2025-07-11T12:00:00Z',
    modifiedTime: '2025-07-12T15:30:00Z',
    tags: ['Guía turística', 'Isabela', 'turismo inclusivo'],
    authors: ['https://portafolio-web-sable-eight.vercel.app/', 'https://www.linkedin.com/in/alexander-tasinchano-tite-b75088274/'],
  },
  other: {
    'google-site-verification': 'vHIzuFR42_8-BkNGQSs0buGLpfEmZKxiuaPRV2YPXss',
  },
  metadataBase: new URL('https://isabelaturismoaccesible.pages.dev'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
