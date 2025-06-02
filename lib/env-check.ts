export function checkEnvironmentVariables() {
  const requiredVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }

  const missing: string[] = []
  const present: string[] = []

  Object.entries(requiredVars).forEach(([key, value]) => {
    if (!value) {
      missing.push(key)
    } else {
      present.push(key)
    }
  })

  return {
    allPresent: missing.length === 0,
    missing,
    present,
    details: requiredVars,
  }
}

export function logEnvironmentStatus() {
  const status = checkEnvironmentVariables()

  console.log("🔧 Environment Variables Status:")
  console.log("✅ Present:", status.present)
  if (status.missing.length > 0) {
    console.log("❌ Missing:", status.missing)
  }
  console.log("📋 Details:", status.details)

  return status
}
