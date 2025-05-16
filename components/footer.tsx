import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold-500/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Informações */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/logo-new.png" alt="MoreThanMoney Logo" width={150} height={50} className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm">
              Plataforma integrada de formação financeira e serviços de automatização com inteligência artificial.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-gold-400 transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-gold-400 transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-gold-400 transition-colors" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-gray-400 hover:text-gold-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/scanner" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Scanner MTM
                </Link>
              </li>
              <li>
                <Link href="/copytrading" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Copytrading
                </Link>
              </li>
              <li>
                <Link href="/jifu-education" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Educação JIFU
                </Link>
              </li>
              <li>
                <Link href="/automation" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Automatização
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-white font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/member-area" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Área de Membros
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Registrar
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-gold-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-400" />
                <a href="mailto:info@morethanmoney.com" className="text-gray-400 hover:text-gold-400 transition-colors">
                  info@morethanmoney.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-400" />
                <a href="tel:+351123456789" className="text-gray-400 hover:text-gold-400 transition-colors">
                  +351 123 456 789
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="bg-gray-800 border border-gray-700 rounded-l-md px-3 py-2 text-sm w-full focus:outline-none focus:border-gold-500"
                />
                <button className="bg-gold-600 hover:bg-gold-700 text-black px-3 py-2 rounded-r-md text-sm">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Acesso Admin (discreto) */}
        <div className="flex justify-center mt-8">
          <Link href="/admin-dashboard" className="text-xs text-gray-600 hover:text-gold-400 transition-colors">
            Acesso Administrativo
          </Link>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 MoreThanMoney. Todos os direitos reservados. MoreThanMoneyTM é uma marca registrada.
          </p>
        </div>
      </div>
    </footer>
  )
}
