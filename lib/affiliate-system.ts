"use client"

import { supabase } from "./supabase"

// Types
export interface Affiliate {
  id: string
  user_id: string
  affiliate_code: string
  created_at: string
  updated_at: string
}

export interface Commission {
  id: string
  affiliate_user_id: string
  customer_user_id: string
  product_name: string
  amount: number
  status: "pending" | "paid" | "cancelled"
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  username: string
  name: string
  email?: string
  package?: string
  role: string
  is_admin: boolean
}

// Check if user can be an affiliate
export async function canBeAffiliate(userId: string): Promise<boolean> {
  try {
    // Check if user exists and has a valid package
    const { data: user, error } = await supabase.from("users").select("id, package, role").eq("id", userId).single()

    if (error || !user) {
      return false
    }

    // Check if user already has an affiliate code
    const { data: existingAffiliate } = await supabase.from("affiliates").select("id").eq("user_id", userId).single()

    // User can be affiliate if they don't already have one and have a valid package
    return !existingAffiliate && (user.package !== null || user.role === "VIP")
  } catch (error) {
    console.error("Error checking affiliate eligibility:", error)
    return false
  }
}

// Generate unique affiliate code
export async function generateAffiliateCode(): Promise<string> {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  let isUnique = false

  while (!isUnique) {
    code = ""
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    // Check if code already exists
    const { data } = await supabase.from("affiliates").select("id").eq("affiliate_code", code).single()

    isUnique = !data
  }

  return code
}

// Create new affiliate
export async function createAffiliate(
  userId: string,
): Promise<{ success: boolean; affiliate?: Affiliate; error?: string }> {
  try {
    // Check if user can be affiliate
    const canCreate = await canBeAffiliate(userId)
    if (!canCreate) {
      return { success: false, error: "User cannot be an affiliate" }
    }

    // Generate unique code
    const affiliateCode = await generateAffiliateCode()

    // Create affiliate record
    const { data, error } = await supabase
      .from("affiliates")
      .insert({
        user_id: userId,
        affiliate_code: affiliateCode,
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, affiliate: data }
  } catch (error) {
    return { success: false, error: "Failed to create affiliate" }
  }
}

// Get affiliate by user ID
export async function getAffiliateByUserId(userId: string): Promise<Affiliate | null> {
  try {
    const { data, error } = await supabase.from("affiliates").select("*").eq("user_id", userId).single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.error("Error getting affiliate:", error)
    return null
  }
}

// Get affiliate by code
export async function getAffiliateByCode(code: string): Promise<Affiliate | null> {
  try {
    const { data, error } = await supabase.from("affiliates").select("*").eq("affiliate_code", code).single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.error("Error getting affiliate by code:", error)
    return null
  }
}

// Get affiliate commissions
export async function getAffiliateCommissions(affiliateUserId: string): Promise<Commission[]> {
  try {
    const { data, error } = await supabase
      .from("commission_history")
      .select(`
        *,
        customer:customer_user_id(username, name, email)
      `)
      .eq("affiliate_user_id", affiliateUserId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error getting commissions:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error getting affiliate commissions:", error)
    return []
  }
}

// Create commission
export async function createCommission(
  affiliateUserId: string,
  customerUserId: string,
  productName: string,
  amount: number,
): Promise<{ success: boolean; commission?: Commission; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("commission_history")
      .insert({
        affiliate_user_id: affiliateUserId,
        customer_user_id: customerUserId,
        product_name: productName,
        amount: amount,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, commission: data }
  } catch (error) {
    return { success: false, error: "Failed to create commission" }
  }
}

// Update commission status
export async function updateCommissionStatus(
  commissionId: string,
  status: "pending" | "paid" | "cancelled",
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("commission_history").update({ status }).eq("id", commissionId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update commission status" }
  }
}

// Get all affiliates (admin function)
export async function getAllAffiliates(): Promise<(Affiliate & { user: User })[]> {
  try {
    const { data, error } = await supabase
      .from("affiliates")
      .select(`
        *,
        user:user_id(id, username, name, email, package, role, is_admin)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error getting all affiliates:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error getting all affiliates:", error)
    return []
  }
}

// Calculate total commissions for affiliate
export async function getTotalCommissions(affiliateUserId: string): Promise<{
  total: number
  pending: number
  paid: number
  cancelled: number
}> {
  try {
    const commissions = await getAffiliateCommissions(affiliateUserId)

    const totals = commissions.reduce(
      (acc, commission) => {
        acc.total += commission.amount
        acc[commission.status] += commission.amount
        return acc
      },
      { total: 0, pending: 0, paid: 0, cancelled: 0 },
    )

    return totals
  } catch (error) {
    console.error("Error calculating total commissions:", error)
    return { total: 0, pending: 0, paid: 0, cancelled: 0 }
  }
}

// Track affiliate referral (when someone uses affiliate code)
export async function trackAffiliateReferral(
  affiliateCode: string,
  customerUserId: string,
  productName: string,
  amount: number,
  commissionRate = 0.1, // 10% default commission
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get affiliate by code
    const affiliate = await getAffiliateByCode(affiliateCode)
    if (!affiliate) {
      return { success: false, error: "Invalid affiliate code" }
    }

    // Calculate commission amount
    const commissionAmount = amount * commissionRate

    // Create commission record
    const result = await createCommission(affiliate.user_id, customerUserId, productName, commissionAmount)

    return result
  } catch (error) {
    return { success: false, error: "Failed to track affiliate referral" }
  }
}

// Get affiliate stats
export async function getAffiliateStats(affiliateUserId: string): Promise<{
  totalReferrals: number
  totalCommissions: number
  pendingCommissions: number
  paidCommissions: number
  conversionRate: number
}> {
  try {
    const commissions = await getAffiliateCommissions(affiliateUserId)

    const stats = {
      totalReferrals: commissions.length,
      totalCommissions: commissions.reduce((sum, c) => sum + c.amount, 0),
      pendingCommissions: commissions.filter((c) => c.status === "pending").reduce((sum, c) => sum + c.amount, 0),
      paidCommissions: commissions.filter((c) => c.status === "paid").reduce((sum, c) => sum + c.amount, 0),
      conversionRate:
        commissions.length > 0 ? (commissions.filter((c) => c.status === "paid").length / commissions.length) * 100 : 0,
    }

    return stats
  } catch (error) {
    console.error("Error getting affiliate stats:", error)
    return {
      totalReferrals: 0,
      totalCommissions: 0,
      pendingCommissions: 0,
      paidCommissions: 0,
      conversionRate: 0,
    }
  }
}
