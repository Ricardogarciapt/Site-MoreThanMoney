"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import UserDropdown from "@/components/user-dropdown"
import LoginModal from "@/components/login-modal"
import { Menu, X, ChevronDown } from "lucide-react"
import { ShoppingCart } from "@/components/shopping-cart"
import { LanguageSelector } from "@/components/language-selector"

export default function Navbar() {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isScannerSubmenuOpen, setIsScannerSubmenuOpen] = useState(false)
  const [isCopytradingSubmenuOpen, setIsCopytradingSubmenuOpen] = useState(false)

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Educação JIFU", href: "/jifu-education" },
    {
      name: "Scanners",
      href: "/scanner",
      submenu: [
        { name: "Os nossos Scanners", href: "/scanner" },
        { name: "Scanner MTM", href: "/scanner-access" },
        { name: "MTM Gold Killer", href: "/scanner/mtm-gold-killer" },
      ],
    },
    {
      name: "Copytrading",
      href: "/copytrading",
      submenu: [
        { name: "Planos", href: "/copytrading" },
        { name: "Ideias de Trading", href: "/trading-ideas" },
        { name: "TAP2TRADE MTM (Preview)", href: "/tap-to-trade-preview" },
      ],
    },
    { name: "Automatização", href: "/automation" },
    { name: "Painel de Afiliados", href: "/affiliate-dashboard" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-gold-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-new.png"
                alt="MoreThanMoney Logo"
                width={150}
                height={50}
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) =>
              item.submenu ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.name === "Scanners") setIsScannerSubmenuOpen(true)
                    if (item.name === "Copytrading") setIsCopytradingSubmenuOpen(true)
                  }}
                  onMouseLeave={() => {
                    if (item.name === "Scanners") setIsScannerSubmenuOpen(false)
                    if (item.name === "Copytrading") setIsCopytradingSubmenuOpen(false)
                  }}
                >
                  <button
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center ${
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-gold-500 bg-gold-500/10"
                        : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {((item.name === "Scanners" && isScannerSubmenuOpen) ||
                    (item.name === "Copytrading" && isCopytradingSubmenuOpen)) && (
                    <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-black/90 border border-gold-500/30 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              pathname === subitem.href
                                ? "text-gold-500 bg-gold-500/10"
                                : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                            } ${subitem.restricted ? "flex items-center" : ""}`}
                          >
                            {subitem.name}
                            {subitem.restricted && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs bg-gold-500/20 text-gold-500 rounded-md">
                                Restrito
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-gold-500 bg-gold-500/10"
                      : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* Login/User Area */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Seletor de Idioma */}
            <div className="ml-2">
              <LanguageSelector />
            </div>

            {/* Carrinho de Compras */}
            <div className="ml-2">
              <ShoppingCart />
            </div>

            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <Link href="/member-area">
                <Button className="bg-gold-600 hover:bg-gold-700 text-black font-medium">Área de Membro</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gold-400 hover:text-gold-500 hover:bg-gold-500/10 focus:outline-none"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="p-2 md:p-4 space-y-1 sm:px-3 bg-black/90 border-b border-gold-500/30">
            {navigation.map((item) =>
              item.submenu ? (
                <div key={item.name} className="space-y-1">
                  <div
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-gold-500 bg-gold-500/10"
                        : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                    }`}
                  >
                    {item.name}
                  </div>
                  <div className="pl-4 space-y-1 border-l border-gold-500/30 ml-3">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          pathname === subitem.href
                            ? "text-gold-500 bg-gold-500/10"
                            : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                        } ${subitem.restricted ? "flex items-center" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subitem.name}
                        {subitem.restricted && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs bg-gold-500/20 text-gold-500 rounded-md">
                            Restrito
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? "text-gold-500 bg-gold-500/10"
                      : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}
            {isAuthenticated ? (
              <Link
                href="/member-area"
                className="block px-3 py-2 rounded-md text-base font-medium text-gold-400 hover:text-gold-500 hover:bg-gold-500/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Minha Conta
              </Link>
            ) : (
              <Link href="/member-area">
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full mt-2 bg-gold-600 hover:bg-gold-700 text-black font-medium"
                >
                  Área de Membro
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </nav>
  )
}
