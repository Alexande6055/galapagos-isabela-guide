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
    icon: '/images/tortoise.ico',
  },
  authors: [{ name: 'Alexander Tasinchano' }],
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
    type: 'website',
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
