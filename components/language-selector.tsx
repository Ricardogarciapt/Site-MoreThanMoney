"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

const languages = [
  { code: "pt-PT", name: "Português (Portugal)" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("pt-PT")

  // Detectar idioma do navegador ao carregar
  useEffect(() => {
    const browserLang = navigator.language
    const supportedLang = languages.find(
      (lang) => browserLang.startsWith(lang.code) || (lang.code === "pt-PT" && browserLang.startsWith("pt")),
    )

    if (supportedLang) {
      setCurrentLanguage(supportedLang.code)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    setIsOpen(false)
    // Aqui você implementaria a lógica para mudar o idioma da aplicação
    // Por exemplo, usando i18n ou outra biblioteca de internacionalização
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-300 hover:text-gold-400 transition-colors"
        aria-label="Selecionar idioma"
      >
        <Globe className="h-5 w-5 mr-1" />
        <span className="text-sm hidden md:inline">{currentLanguage.split("-")[0].toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black/90 border border-gold-500/30 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  currentLanguage === language.code
                    ? "text-gold-500 bg-gold-500/10"
                    : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                }`}
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
