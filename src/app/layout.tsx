import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'

const josefinSans = Josefin_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-josefin-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PropCarer',
  description: 'Property management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={josefinSans.variable}>{children}</body>
    </html>
  )
}
