"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, LayoutDashboard, Shield } from "lucide-react"

export default function UserDropdown() {
  const { user, logout, isAdmin } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        variant="outline"
        className="border-gold-500 text-gold-400 hover:bg-gold-500/10 flex items-center gap-2"
      >
        <User size={16} />
        <span className="max-w-[100px] truncate">{user?.name || "Usuário"}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black border border-gold-500/30 overflow-hidden z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gold-500/20">
              <p className="text-sm font-medium text-gold-400">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || user?.username}</p>
            </div>

            <Link
              href="/member-area"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold-500/10 hover:text-gold-400 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={16} />
              Área de Membro
            </Link>

            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold-500/10 hover:text-gold-400 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} />
              Configurações
            </Link>

            {isAdmin && (
              <Link
                href="/admin-dashboard"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold-500/10 hover:text-gold-400 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Shield size={16} />
                Painel Admin
              </Link>
            )}

            <div className="border-t border-gold-500/20 mt-2 pt-2">
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
