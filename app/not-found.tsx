import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
        <p className="text-gray-300 mb-8">A página que procura não existe ou foi movida.</p>
        <Link href="/" passHref>
          <Button className="bg-gold-500 hover:bg-gold-600 text-black">Voltar à página inicial</Button>
        </Link>
      </div>
    </div>
  )
}
