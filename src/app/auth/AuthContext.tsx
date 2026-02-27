import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "../../supabaseClient"
import { handleLogin, handleLogout, handleSignup } from "../../services/auth"

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!isMounted) return
        setUser(data.user ?? null)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    const {
      data: subscription,
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      isMounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { user } = await handleLogin(email, password)
    setUser(user ?? null)
  }

  const signup = async (email: string, password: string, name: string) => {
    const { user } = await handleSignup(email, password, name)
    setUser(user ?? null)
  }

  const logout = async () => {
    await handleLogout()
    setUser(null)
  }

  const value: AuthContextValue = {
    user,
    loading,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}

