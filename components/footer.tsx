import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, Lock, MapPin, FileText } from "lucide-react"

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
                <Link href="/admin-login" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Painel de Admin
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
                <a href="mailto:info@morethanmoney.pt" className="text-gray-400 hover:text-gold-400 transition-colors">
                  info@morethanmoney.pt
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-400" />
                <a href="tel:+351912666699" className="text-gray-400 hover:text-gold-400 transition-colors">
                  +351 912 666 699
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span className="text-gray-400">Portugal</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gold-400" />
                <span className="text-gray-400">NIF: PT241991439</span>
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
        {/* <div className="flex justify-center mt-8">
          <Link href="/admin-dashboard" className="text-xs text-gray-600 hover:text-gold-400 transition-colors">
            Acesso Administrativo
          </Link>
        </div> */}

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 MoreThanMoney. Todos os direitos reservados. MoreThanMoneyTM é uma marca registrada.
            </p>
            <Link
              href="/admin-login"
              className="text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1 text-sm"
            >
              <Lock className="h-3 w-3" /> Painel de Admin
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/admin-login"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gold-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Painel de Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
