import { AuthProvider } from "@/contexts/auth-context"
import Breadcrumbs from "@/components/breadcrumbs"
import TelegramIdeasWidget from "@/components/telegram-ideas-widget"

export default function AutomationIdeasPage() {
  return (
    <AuthProvider>
      <Breadcrumbs />
      <main className="min-h-screen bg-black text-white">
        <TelegramIdeasWidget />
      </main>
    </AuthProvider>
  )
}
