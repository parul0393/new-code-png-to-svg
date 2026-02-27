import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from "../app/components/Footer"
import { Header } from "../app/components/Header"
import { handleForgotPassword, handleLogin } from "../services/auth"

type Mode = "login" | "forgot"

export function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>("login")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false
    if (mode === "forgot") return true
    return password.length > 0
  }, [email, mode, password])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || isBusy) return

    setIsBusy(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === "forgot") {
        await handleForgotPassword(email.trim())
        setSuccess("Password reset link sent. Check your email inbox.")
        return
      }

      await handleLogin(email.trim(), password)
      navigate("/")
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.")
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full px-6 py-12 md:py-16 bg-gradient-to-b from-[var(--warm-cream)] to-white">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-[var(--warm-brown)]/10 shadow-sm p-8">
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl text-[var(--warm-dark)]" style={{ fontWeight: 700 }}>
                {mode === "login" ? "Welcome back" : "Reset your password"}
              </h1>
              <p className="text-sm text-[var(--warm-brown)]/70 leading-relaxed">
                {mode === "login"
                  ? "Login with your email and password."
                  : "Enter your email and we’ll send you a reset link."}
              </p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40"
                />
              </div>

              {mode === "login" && (
                <div className="space-y-2">
                  <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit || isBusy}
                className="w-full py-3.5 px-8 rounded-full bg-[var(--warm-orange)] text-white hover:bg-[var(--warm-brown)] transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontWeight: 600 }}
              >
                {isBusy
                  ? "Please wait..."
                  : mode === "login"
                    ? "Login"
                    : "Send reset link"}
              </button>

              <div className="flex items-center justify-between pt-2">
                {mode === "login" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot")
                      setError(null)
                      setSuccess(null)
                    }}
                    className="text-sm text-[var(--warm-orange)] hover:text-[var(--warm-brown)] transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    Forgot password?
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login")
                      setError(null)
                      setSuccess(null)
                    }}
                    className="text-sm text-[var(--warm-orange)] hover:text-[var(--warm-brown)] transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    Back to login
                  </button>
                )}

                <Link
                  to="/signup"
                  className="text-sm text-[var(--warm-brown)] hover:text-[var(--warm-orange)] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}