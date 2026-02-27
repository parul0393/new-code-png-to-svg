import { supabase } from "../supabaseClient"

export async function handleSignup(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function handleLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function handleForgotPassword(email: string, redirectTo?: string) {
  const fallbackRedirect =
    typeof window !== "undefined" ? `${window.location.origin}/login` : undefined

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo ?? fallbackRedirect,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function handleGoogleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function handleLogout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}
