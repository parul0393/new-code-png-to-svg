import { supabase } from "../supabaseClient"
import { getActiveSubscription } from "./subscription"

const FREE_CONVERSION_LIMIT = 10

export interface UsageInfo {
  user_id: string
  conversion_count: number
  updated_at: string | null
}

export interface ConversionCheckResult {
  allowed: boolean
  remaining?: number | "unlimited"
  reason?: string
}

export async function getUsage(userId: string) {
  const { data, error } = await supabase
    .from("usage_tracking")
    .select<"*", UsageInfo>("*")
    .eq("user_id", userId)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function canConvertAndTrack(userId: string): Promise<ConversionCheckResult> {
  let subscription: Awaited<ReturnType<typeof getActiveSubscription>> = null
  try {
    subscription = await getActiveSubscription(userId)
  } catch {
    // If subscriptions table/policies aren't ready, treat as no subscription
    subscription = null
  }
  const hasUnlimited =
    subscription && subscription.status === "active" && subscription.plan !== "free"

  if (hasUnlimited) {
    await upsertUsage(userId)
    return { allowed: true, remaining: "unlimited" }
  }

  const existing = await getUsage(userId)
  const currentCount = existing?.conversion_count ?? 0

  if (currentCount >= FREE_CONVERSION_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      reason: "You have reached the free limit of 10 conversions. Please upgrade your plan.",
    }
  }

  const newCount = currentCount + 1
  await upsertUsage(userId, newCount)

  return {
    allowed: true,
    remaining: FREE_CONVERSION_LIMIT - newCount,
  }
}

async function upsertUsage(userId: string, newCount?: number) {
  const fields: Partial<UsageInfo> = {
    user_id: userId,
    updated_at: new Date().toISOString(),
  }

  if (typeof newCount === "number") {
    fields.conversion_count = newCount
  }

  const { error } = await supabase
    .from("usage_tracking")
    .upsert(fields, { onConflict: "user_id" })

  if (error) {
    throw new Error(error.message)
  }
}

