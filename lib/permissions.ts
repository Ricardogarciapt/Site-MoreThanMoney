/**
 * Permissões centralizadas por pack/role de membro.
 *
 * Packs de acesso:
 *   member_skool   — Skool stream + site MoreThanMoney
 *   member_iqonic  — Todos os streams + app + scanners + trading ideas premium
 *   member_app     — Só app-mobile (sem LMS/streams)
 *
 * Roles legacy continuam a funcionar como antes.
 */

// Roles com acesso a conteúdo premium (scanners VIP, trading ideas VIP, Telegram VIP)
const VIP_ROLES = [
  "member_iqonic",
  "Membro VIP",
  "Distribuidor",
  "Educador",
  "Liderança",
  "Rising Star",
  "Silver Manager",
  "Gold Manager",
  "Platinum Manager",
  "Elite",
  "Director",
  "Diamond",
  "Presidential",
]

// Roles com acesso a streams / bootcamp / cursos
const STREAM_ROLES = [
  "member_iqonic",
  "member_skool",
  "Pro Trader",
  "VIP Trader",
  "Membro VIP",
  "Distribuidor",
  "Educador",
  "Liderança",
  "Rising Star",
  "Silver Manager",
  "Gold Manager",
  "Platinum Manager",
  "Elite",
  "Director",
  "Diamond",
  "Presidential",
]

// Roles com acesso ao copytrading
const COPYTRADING_ROLES = [
  "member_iqonic",
  "member_skool",
  "Pro Trader",
  "VIP Trader",
  "Membro VIP",
  "Liderança",
  "Rising Star",
  "Silver Manager",
  "Gold Manager",
  "Platinum Manager",
  "Elite",
  "Director",
  "Diamond",
  "Presidential",
]

interface UserLike {
  role?: string
  package?: string
  isAdmin?: boolean
}

function getEffectiveRole(user: UserLike | null): string {
  return user?.role || user?.package || ""
}

/** Acesso a conteúdo VIP premium (scanners avançados, ideas VIP, Telegram VIP) */
export function canAccessVIPContent(user: UserLike | null, isAuthenticated: boolean): boolean {
  if (!isAuthenticated || !user) return false
  if (user.isAdmin) return true
  const role = getEffectiveRole(user)
  return VIP_ROLES.includes(role)
}

/** Acesso a streams / bootcamp / cursos de vídeo */
export function canAccessStreams(user: UserLike | null, isAuthenticated: boolean): boolean {
  if (!isAuthenticated || !user) return false
  if (user.isAdmin) return true
  const role = getEffectiveRole(user)
  return STREAM_ROLES.includes(role)
}

/** Acesso a copytrading */
export function canAccessCopytrading(user: UserLike | null, isAuthenticated: boolean): boolean {
  if (!isAuthenticated || !user) return false
  if (user.isAdmin) return true
  const role = getEffectiveRole(user)
  return COPYTRADING_ROLES.includes(role)
}

/** Acesso apenas à app-mobile (member_app não acede ao site) */
export function isAppOnlyMember(user: UserLike | null): boolean {
  return getEffectiveRole(user) === "member_app"
}

/** Label amigável para o pack */
export function getPackLabel(user: UserLike | null): string {
  const role = getEffectiveRole(user)
  const labels: Record<string, string> = {
    member_skool: "Skool Member",
    member_iqonic: "Member IQonic",
    member_app: "Member APP",
  }
  return labels[role] || role || "Membro"
}

/** Mensagem de upgrade personalizada por pack */
export function getUpgradeMessage(feature: "streams" | "vip" | "copytrading"): string {
  const messages: Record<string, string> = {
    streams: "Precisas do pack Skool Member ou IQonic para aceder aos streams e cursos.",
    vip: "Precisas do pack Member IQonic para aceder a conteúdo premium e análises VIP.",
    copytrading: "Precisas do pack Skool Member ou IQonic para aceder ao copytrading.",
  }
  return messages[feature]
}
