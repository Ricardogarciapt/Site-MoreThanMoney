// Simple password hashing utility
export async function hashPassword(password: string): Promise<string> {
  // Use Web Crypto API for hashing
  const encoder = new TextEncoder()
  const data = encoder.encode(password + "salt-morethanmoney-2024")
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password)
  return hashedPassword === hash
}
