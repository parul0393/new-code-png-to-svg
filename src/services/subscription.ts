import { supabase } from "../supabaseClient"

export type SubscriptionPlan = "free" | "pro" | "premium"
export type SubscriptionStatus = "active" | "expired" | "canceled"

export interface Subscription {
  id: string
  user_id: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  current_period_end: string | null
}

export async function getActiveSubscription(userId: string) {
  const { data, error } = await supabase
    .from("subscriptions")
    .select<"*", Subscription>("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("current_period_end", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

