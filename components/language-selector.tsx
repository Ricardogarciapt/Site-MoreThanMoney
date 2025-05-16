"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "pt-PT", name: "Português (Portugal)", flag: "🇵🇹" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("pt-PT")

  // Detectar idioma do navegador na inicialização
  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language

      // Verificar se o idioma do navegador está entre os suportados
      const supportedLang = languages.find(
        (lang) => browserLang.startsWith(lang.code) || lang.code.startsWith(browserLang),
      )

      if (supportedLang) {
        setCurrentLanguage(supportedLang.code)
        document.documentElement.lang = supportedLang.code
      }
    }

    detectLanguage()
  }, [])

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode)
    document.documentElement.lang = langCode

    // Aqui você implementaria a lógica real de tradução
    // Por exemplo, carregar arquivos de tradução ou chamar uma API
    console.log(`Idioma alterado para: ${langCode}`)

    // Simular tradução (em produção, você usaria uma biblioteca como i18next)
    const event = new CustomEvent("languageChanged", { detail: { language: langCode } })
    document.dispatchEvent(event)
  }

  // Encontrar o idioma atual
  const current = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Alterar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={currentLanguage === language.code ? "bg-gray-800" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
