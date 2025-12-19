import type { Metadata } from 'next'
import { Inter, Jacquard_24 } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jacquard = Jacquard_24({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-jacquard',
})

export const metadata: Metadata = {
  title: 'Maxwell\'s Demon',
  description: 'Web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jacquard.variable}`}>{children}</body>
    </html>
  )
}

