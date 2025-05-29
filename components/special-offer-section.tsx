"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  Star,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SpecialOfferSection() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 24 * 60 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGetOffer = () => {
    router.push("/jifu-education");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl overflow-y-auto max-h-[90vh] shadow-2xl"
      >
        {/* Botão de fechar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-50 text-red-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Conteúdo do modal */}
        <section className="py-10 px-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)] pointer-events-none z-0" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 mb-4">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-semibold">
                  OFERTA POR TEMPO LIMITADO
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
                🔥 OFERTA ESPECIAL 🔥
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Compre um Pack de Educação JIFU e receba acesso completo ao
                ecossistema MoreThanMoney
              </p>

              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-red-400 font-semibold mb-2">
                  Esta oferta expira em:
                </div>
                <div className="text-4xl font-bold text-red-400">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            {/* Main Offer Card */}
            <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gold-500 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-500/10 pointer-events-none" />
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Pack Completo de Educação Financeira
                </CardTitle>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-gray-400 line-through text-xl">
                      €1,299
                    </div>
                    <div className="text-sm text-gray-500">Valor Normal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gold-400">€299</div>
                    <div className="text-sm text-gold-300">Oferta Especial</div>
                  </div>
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full">
                    <div className="font-bold text-lg">77% OFF</div>
                    <div className="text-sm">Economia €1,000</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* 4 Items */}
                  {[
                    {
                      icon: <Users className="w-8 h-8 text-white" />,
                      title: "Pack Educação JIFU",
                      desc: "Acesso completo à plataforma educacional",
                      value: "€299",
                      color: "from-blue-400 to-blue-600",
                    },
                    {
                      icon: <TrendingUp className="w-8 h-8 text-black" />,
                      title: "Scanner MTM V3.4",
                      desc: "Licença vitalícia do scanner profissional",
                      value: "€1,000",
                      color: "from-gold-400 to-gold-600",
                    },
                    {
                      icon: <Star className="w-8 h-8 text-white" />,
                      title: "Bootcamp MTM",
                      desc: "Formação completa com acesso vitalício",
                      value: "€200",
                      color: "from-purple-400 to-purple-600",
                    },
                    {
                      icon: <Zap className="w-8 h-8 text-white" />,
                      title: "Mentoria VIP",
                      desc: "3 meses de acompanhamento direto",
                      value: "€297",
                      color: "from-green-400 to-green-600",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="text-center p-6 bg-black/30 rounded-lg border border-gold-500/30"
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        {item.icon}
                      </div>
                      <h4 className="font-semibold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                      <div className="text-gold-400 font-semibold mt-2">
                        Valor: {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    [
                      "Acesso vitalício ao Scanner MTM",
                      "Formação completa no Bootcamp",
                      "3 meses de mentoria personalizada",
                      "Acesso ao canal VIP de sinais",
                    ],
                    [
                      "Suporte técnico prioritário",
                      "Comunidade exclusiva de traders",
                      "Atualizações gratuitas vitalícias",
                      "Garantia de 30 dias",
                    ],
                  ].map((col, idx) => (
                    <div key={idx} className="space-y-3">
                      {col.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 font-semibold">
                        73 pessoas compraram hoje
                      </span>
                    </div>
                    <div className="text-gray-400">|</div>
                    <div className="text-orange-400 font-semibold">
                      ⚡ Apenas 8 vagas restantes
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Button
                    onClick={handleGetOffer}
                    className="w-full md:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-bold py-4 px-12 text-xl transform transition-transform duration-300 hover:scale-105"
                  >
                    🚀 QUERO APROVEITAR ESTA OFERTA AGORA
                  </Button>
                  <div className="text-gray-400 text-sm mt-3">
                    💳 Pagamento seguro | 🛡️ Garantia de 30 dias | ⚡ Acesso
                    imediato
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Urgency Footer */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-3">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold">
                  ⚠️ Esta oferta expira em {formatTime(timeLeft)} - Não perca!
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
