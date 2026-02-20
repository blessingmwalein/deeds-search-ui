import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono, Playfair_Display, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Deeds Registry - Zimbabwe Digital Property Deed Access',
  description: 'Secure digital access to Zimbabwe property title deed information. Search, view, and manage deed records with tiered access for the public, legal practitioners, and financial institutions.',
  keywords: ['property deeds', 'title search', 'land administration', 'deed records', 'property search', 'Zimbabwe', 'deeds registry'],
}

export const viewport: Viewport = {
  themeColor: '#1B5E20',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${playfairDisplay.variable} ${dmSerifDisplay.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
