import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/components/shopping-cart"
import Analytics from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MoreThanMoney",
  description: "Plataforma integrada de formação financeira e serviços de automatização",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Analytics />
              <Navbar />
              {children}
              <Footer />
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
