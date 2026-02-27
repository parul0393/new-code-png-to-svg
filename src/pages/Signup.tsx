import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Footer } from "../app/components/Footer"
import { Header } from "../app/components/Header"
import { handleSignup } from "../services/auth"

export function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const passwordsMatch = password === confirmPassword

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false
    if (!password) return false
    if (!confirmPassword) return false
    if (!passwordsMatch) return false
    return true
  }, [confirmPassword, email, password, passwordsMatch])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || isBusy) return

    setIsBusy(true)
    setError(null)
    setSuccess(null)

    try {
      await handleSignup(email.trim(), password)
      setSuccess("Signup successful. You can now login.")
      navigate("/login")
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
                Create your account
              </h1>
              <p className="text-sm text-[var(--warm-brown)]/70 leading-relaxed">
                Sign Up with your email and password.
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

              <div className="space-y-2">
                <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[var(--warm-brown)]" style={{ fontWeight: 600 }}>
                  Confirm password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--warm-brown)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--warm-orange)]/40"
                />
                {!passwordsMatch && confirmPassword.length > 0 && (
                  <div className="text-sm text-red-600">Passwords do not match.</div>
                )}
              </div>

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
                {isBusy ? "Please wait..." : "Sign Up"}
              </button>

              <div className="pt-2 text-center">
                <span className="text-sm text-[var(--warm-brown)]/70">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-sm text-[var(--warm-orange)] hover:text-[var(--warm-brown)] transition-colors"
                  style={{ fontWeight: 700 }}
                >
                  Login
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