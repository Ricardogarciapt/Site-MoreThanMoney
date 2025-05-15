import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import HomeButton from "@/components/home-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MoreThanMoney",
  description: "Plataforma integrada de formação financeira e serviços de automatização",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <HomeButton />
        {children}
      </body>
    </html>
  )
}
